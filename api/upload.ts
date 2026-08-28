import type { VercelRequest, VercelResponse } from "@vercel/node";
import { put } from "@vercel/blob";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-filename");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const filename = (req.headers["x-filename"] as string) || `video-${Date.now()}.mp4`;
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (token) {
      const blob = await put(filename, req, {
        access: "public",
        token,
      });
      return res.status(200).json({ url: blob.url });
    }

    return res.status(400).json({
      error: "Vercel Blob storage token not configured. Please paste an HLS .m3u8 link from Mux or Cloudflare Stream.",
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: err.message || "Upload failed" });
  }
}
