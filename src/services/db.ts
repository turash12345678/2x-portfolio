import { defaultContent, type SiteContent } from "@/pages/Dashboard";

const LOCAL_STORAGE_KEY = "ta-portfolio-content";
const API_ENDPOINT = "/api/content";

/**
 * Synchronous local cache loader.
 * Guarantees zero flash of default content on reload.
 */
export function getCachedContent(): SiteContent {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") {
        return {
          ...defaultContent,
          ...parsed,
          videos: Array.isArray(parsed.videos) ? parsed.videos : defaultContent.videos,
          tweets: Array.isArray(parsed.tweets) ? parsed.tweets : defaultContent.tweets,
        };
      }
    }
  } catch {}
  return defaultContent;
}

/**
 * Fetch portfolio content globally.
 * Tries cloud API first, falls back to local storage or defaults.
 */
export async function fetchGlobalContent(): Promise<SiteContent> {
  try {
    const res = await fetch(API_ENDPOINT, { method: "GET" });
    if (res.ok) {
      const data = await res.json();
      if (data && typeof data === "object" && Object.keys(data).length > 0) {
        const merged: SiteContent = {
          ...defaultContent,
          ...data,
          videos: Array.isArray(data.videos) ? data.videos : defaultContent.videos,
          tweets: Array.isArray(data.tweets) ? data.tweets : defaultContent.tweets,
        };
        // Sync to local cache
        try { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged)); } catch {}
        return merged;
      }
    }
  } catch (err) {
    console.warn("Global fetch offline, reading local fallback:", err);
  }

  return getCachedContent();
}

/**
 * Save portfolio content globally.
 * Sends data to cloud API, updates local cache.
 */
export async function saveGlobalContent(content: SiteContent): Promise<boolean> {
  // Always update local cache immediately
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));
  } catch {}

  try {
    const res = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to sync globally to cloud:", err);
    return false;
  }
}
