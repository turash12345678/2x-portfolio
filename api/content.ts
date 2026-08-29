import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@libsql/client";

const DEFAULT_TURSO_URL = "libsql://2x-2xturash.aws-ap-south-1.turso.io";
const DEFAULT_TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODc5ODA0NDAsImlkIjoiMDFhMDRiZWQtZjgwMS03ZGYxLWJlMmMtZDA4MTc0ZDZhNWI4Iiwia2lkIjoiMkRPRGxsR243ejZvUGdfNGlFZ0xzU3pQWWFaXy04SG52WHRqaFZHS2plNCIsInJpZCI6IjAzZmZjNzgzLWY1YTUtNGE0Yi05Y2YzLTMzN2Y3ZDIyYzZiOSJ9.UIPsJcNuDFiPTJ4qjOz6QWdLsUKG5_0nhTBP8Bw_31e-YrWxy2NsVDoAwB6qeJzvX0kV4Yz3rpAkEgpuCRloDQ";

let inMemoryStore: any = null;

function getTursoClient() {
  const url = process.env.TURSO_DATABASE_URL || DEFAULT_TURSO_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN || DEFAULT_TURSO_TOKEN;
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
        return res.status(200).json({ success: true, provider: "turso", timestamp: Date.now() });
      } catch (err: any) {
        console.error("Turso save error:", err);
        return res.status(500).json({ error: err.message || "Turso save error" });
      }
    }

    return res.status(200).json({ success: true, provider: "memory", timestamp: Date.now() });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
