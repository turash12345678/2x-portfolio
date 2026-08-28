import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@libsql/client";

// Global in-memory cache fallback for instant response
let inMemoryStore: any = null;

function getTursoClient() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;
  if (!url) return null;
  return createClient({ url, authToken });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const client = getTursoClient();

  if (req.method === "GET") {
    if (client) {
      try {
        await client.execute(
          "CREATE TABLE IF NOT EXISTS portfolio_content (id TEXT PRIMARY KEY, data TEXT)"
        );
        const result = await client.execute({
          sql: "SELECT data FROM portfolio_content WHERE id = ?",
          args: ["main"],
        });
        if (result.rows.length > 0 && typeof result.rows[0].data === "string") {
          const content = JSON.parse(result.rows[0].data);
          return res.status(200).json(content);
        }
      } catch (err) {
        console.error("Turso query error:", err);
      }
    }
    return res.status(200).json(inMemoryStore || {});
  }

  if (req.method === "POST") {
    const content = req.body;
    if (!content || typeof content !== "object") {
      return res.status(400).json({ error: "Invalid payload" });
    }

    inMemoryStore = content;

    if (client) {
      try {
        await client.execute(
          "CREATE TABLE IF NOT EXISTS portfolio_content (id TEXT PRIMARY KEY, data TEXT)"
        );
        await client.execute({
          sql: "INSERT INTO portfolio_content (id, data) VALUES (?, ?) ON CONFLICT(id) DO UPDATE SET data = excluded.data",
          args: ["main", JSON.stringify(content)],
        });
      } catch (err) {
        console.error("Turso save error:", err);
      }
    }

    return res.status(200).json({ success: true, timestamp: Date.now() });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
