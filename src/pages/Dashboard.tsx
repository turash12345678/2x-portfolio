import { useState, useRef } from "react";
import { DEMO_TWEETS, type TweetEntry } from "@/types/tweet";

export interface VideoEntry {
  title: string;
  status: string;
  backlink?: string;
  streamUrl?: string;
  localVideoUrl?: string;
  isPinned?: boolean;
}

export type { TweetEntry };

export interface SiteContent {
  name: string;
  jobTitle: string;
  bio1: string;
  bio2: string;
  videos: VideoEntry[];
  tweets: TweetEntry[];
}

export const defaultContent: SiteContent = {
  name: "Turash Ahsan",
  jobTitle: "Product Designer",
  bio1: "I love to help entrepreneurs improve their businesses through design. Delivered over 2+ years to grow brands like **Ahsania**, **bd Stationery** and 10 others+",
  bio2: 'I believe — "Good Design always should be Intentional."',
  videos: [
    { title: "Client testimonial video", status: "Boosted?", backlink: "", streamUrl: "", isPinned: false },
    { title: "Product launch highlight reel", status: "Elevated?", backlink: "", streamUrl: "", isPinned: false },
    { title: "Behind-the-scenes documentary", status: "Captured?", backlink: "", streamUrl: "", isPinned: false },
    { title: "Event recap video", status: "Showcased?", backlink: "", streamUrl: "", isPinned: false },
  ],
  tweets: DEMO_TWEETS,
};

interface Props {
  content: SiteContent;
  onSave: (c: SiteContent) => void;
  onExit: () => void;
}

type CardTab = "shorts" | "tweets";

export default function Dashboard({ content, onSave, onExit }: Props) {
  const [draft, setDraft] = useState<SiteContent>(() => ({
    ...defaultContent,
    ...content,
    videos: content.videos ?? defaultContent.videos,
    tweets: content.tweets ?? defaultContent.tweets,
  }));
  const [saveState, setSaveState] = useState<"idle" | "saved">("idle");
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [isBulkProcessing, setIsBulkProcessing] = useState(false);
  const [bulkStatusText, setBulkStatusText] = useState("");
  const [bulkUrls, setBulkUrls] = useState("");

  const [cardTab, setCardTab] = useState<CardTab>("shorts");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const videoFileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const bulkFileRef = useRef<HTMLInputElement | null>(null);

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaveState("idle");
  };

  const setVideo = (i: number, key: keyof VideoEntry, value: any) => {
    setDraft((d) => {
      const videos = [...d.videos];
      videos[i] = { ...videos[i], [key]: value };
      return { ...d, videos };
    });
    setSaveState("idle");
  };

  const togglePinVideo = (i: number) => {
    setDraft((d) => {
      const videos = [...d.videos];
      videos[i] = { ...videos[i], isPinned: !videos[i].isPinned };
      return { ...d, videos };
    });
    setSaveState("idle");
  };

  const moveVideo = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= draft.videos.length) return;
    setDraft((d) => {
      const videos = [...d.videos];
      const [item] = videos.splice(fromIndex, 1);
      videos.splice(toIndex, 0, item);
      return { ...d, videos };
    });
    setSaveState("idle");
  };

  const handleDragStart = (i: number) => {
    setDraggedIndex(i);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (toIndex: number) => {
    if (draggedIndex === null || draggedIndex === toIndex) return;
    moveVideo(draggedIndex, toIndex);
    setDraggedIndex(null);
  };

  const addVideo = () => {
    setDraft((d) => ({
      ...d,
      videos: [
        { title: "New Short Video", status: "New?", backlink: "", streamUrl: "", isPinned: false },
        ...d.videos,
      ],
    }));
    setSaveState("idle");
  };

  const removeVideo = (i: number) => {
    setDraft((d) => ({ ...d, videos: d.videos.filter((_, idx) => idx !== i) }));
    setSaveState("idle");
  };

  const handleVideoFileUpload = async (i: number, file: File) => {
    setUploadingIndex(i);
    try {
      const filename = `short-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          "x-filename": filename,
        },
        body: file,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Upload failed");
      }

      const data = await res.json();
      setVideo(i, "streamUrl", data.url);
      setVideo(i, "localVideoUrl", undefined);
    } catch (err: any) {
      console.warn("Cloud upload unavailable, storing blob locally:", err);
      const localUrl = URL.createObjectURL(file);
      setVideo(i, "localVideoUrl", localUrl);
      setVideo(i, "streamUrl", undefined);
    } finally {
      setUploadingIndex(null);
    }
  };

  // --- BULK TWEETS / PINS IMPORTER ENGINE ---

  // Measures image width & height to calculate aspect ratio (W / H)
  const measureAspect = (url: string): Promise<number> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        if (img.width && img.height) {
          resolve(Number((img.width / img.height).toFixed(3)));
        } else {
          resolve(1.0);
        }
      };
      img.onerror = () => resolve(1.0);
      img.src = url;
    });
  };

  // Convert File to permanent Base64 Data URL
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Handle Multiple File Selection from Computer (e.g., 20, 50, 100 images at once)
  const handleBulkFilesSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsBulkProcessing(true);
    setBulkStatusText(`Processing 0 / ${files.length} images...`);

    const newItems: TweetEntry[] = [];

    for (let idx = 0; idx < files.length; idx++) {
      const file = files[idx];
      setBulkStatusText(`Processing ${idx + 1} / ${files.length}: ${file.name}`);
      try {
        const base64Url = await fileToBase64(file);
        const aspect = await measureAspect(base64Url);
        newItems.push({
          id: `pin-${Date.now()}-${idx}`,
          image: base64Url,
          aspectRatio: aspect,
          placeholderColor: "#1f1f23",
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Error reading file:", file.name, err);
      }
    }

    setDraft((d) => ({
      ...d,
      tweets: [...newItems, ...d.tweets],
    }));

    setIsBulkProcessing(false);
    setBulkStatusText(`✓ Successfully imported ${newItems.length} images!`);
    setSaveState("idle");
    setTimeout(() => setBulkStatusText(""), 4000);

    // Reset file input
    if (bulkFileRef.current) bulkFileRef.current.value = "";
  };

  // Handle Bulk URL Textarea Import (one link per line)
  const handleBulkUrlsImport = async () => {
    const lines = bulkUrls
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("http://") || l.startsWith("https://"));

    if (lines.length === 0) return;

    setIsBulkProcessing(true);
    setBulkStatusText(`Importing ${lines.length} URLs...`);

    const newItems: TweetEntry[] = [];

    for (let idx = 0; idx < lines.length; idx++) {
      const url = lines[idx];
      const aspect = await measureAspect(url);
      newItems.push({
        id: `pin-url-${Date.now()}-${idx}`,
        image: url,
        aspectRatio: aspect,
        placeholderColor: "#1f1f23",
        createdAt: new Date().toISOString(),
      });
    }

    setDraft((d) => ({
      ...d,
      tweets: [...newItems, ...d.tweets],
    }));

    setBulkUrls("");
    setIsBulkProcessing(false);
    setBulkStatusText(`✓ Successfully imported ${newItems.length} image URLs!`);
    setSaveState("idle");
    setTimeout(() => setBulkStatusText(""), 4000);
  };

  const removeTweet = (i: number) => {
    setDraft((d) => ({ ...d, tweets: d.tweets.filter((_, idx) => idx !== i) }));
    setSaveState("idle");
  };

  const clearAllTweets = () => {
    if (window.confirm("Are you sure you want to clear all images from the Tweets grid?")) {
      setDraft((d) => ({ ...d, tweets: [] }));
      setSaveState("idle");
    }
  };

  const resetToDefaultDemoTweets = () => {
    setDraft((d) => ({ ...d, tweets: DEMO_TWEETS }));
    setSaveState("idle");
  };

  const handleSave = async () => {
    onSave(draft);
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#1a1a1a]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#eaeaea] px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] text-[#666] hover:text-[#1a1a1a] hover:bg-[#f0f0f0] transition-colors font-medium"
          >
            ← Exit Studio
          </button>
          <span className="text-[#ddd]">|</span>
          <h1 className="text-[14px] font-semibold text-[#1a1a1a] tracking-[-0.01em]">
            Content Studio & Portfolio Settings
          </h1>
        </div>

        <button
          onClick={handleSave}
          className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all shadow-sm ${
            saveState === "saved"
              ? "bg-[#22c55e] text-white"
              : "bg-[#1a1a1a] text-white hover:bg-[#333]"
          }`}
        >
          {saveState === "saved" ? "✓ Saved & Synced!" : "Save Changes"}
        </button>
      </header>

      {/* Main Form */}
      <main className="max-w-[920px] mx-auto px-5 py-8 flex flex-col gap-8">
        {/* Profile Info */}
        <Section
          label="Profile & Bio Settings"
          icon={
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zM2 14a6 6 0 0112 0H2z" fill="#1a1a1a" />
            </svg>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Display Name" value={draft.name} onChange={(v) => set("name", v)} />
            <Field label="Job Title" value={draft.jobTitle} onChange={(v) => set("jobTitle", v)} />
          </div>
          <Field label="Paragraph 1" hint="Wrap words in **bold** for emphasis" value={draft.bio1} onChange={(v) => set("bio1", v)} multiline />
          <Field label="Paragraph 2" value={draft.bio2} onChange={(v) => set("bio2", v)} multiline />
        </Section>

        {/* Video Cards & Tweets Manager */}
        <div className="bg-white rounded-[18px] border border-[#ebebeb] overflow-hidden shadow-sm">
          {/* Section header with tab switcher */}
          <div className="px-5 py-3.5 border-b border-[#f5f5f5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="#888" strokeWidth="1.3" />
                <path d="M5.5 5l3.5 2-3.5 2V5z" fill="#888" />
              </svg>
              <h2 className="text-[13px] font-semibold text-[#1a1a1a] tracking-[-0.02em]">Shorts & Tweets Studio</h2>
            </div>
            {/* Tab pills */}
            <div className="flex gap-0.5 bg-[#f5f5f5] p-0.5 rounded-full">
              {(["shorts", "tweets"] as CardTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCardTab(tab)}
                  className={`px-3.5 py-1 rounded-full text-[12px] font-medium transition-all duration-150 tracking-[-0.01em] capitalize ${
                    cardTab === tab
                      ? "bg-white text-[#1a1a1a] shadow-sm font-semibold"
                      : "text-[#999] hover:text-[#666]"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="px-5 py-5">
            {cardTab === "shorts" ? (
              /* Shorts Studio */
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[12px] font-semibold text-[#666]">
                      Shorts Collection ({draft.videos.length} videos)
                    </p>
                    <p className="text-[11px] text-[#999]">
                      💡 Drag cards or use ▲ ▼ arrows to reorder them
                    </p>
                  </div>
                  <button
                    onClick={addVideo}
                    className="text-[12px] font-bold text-[#3b82f6] hover:underline flex items-center gap-1 shrink-0"
                  >
                    + Add New Short
                  </button>
                </div>

                {draft.videos.map((v, i) => (
                  <div
                    key={i}
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={handleDragOver}
                    onDrop={() => handleDrop(i)}
                    className={`border rounded-[14px] p-4 flex flex-col gap-3 transition-colors ${
                      v.isPinned ? "border-[#ff5100]/40 bg-[#fffbf9]" : "border-[#e0e0e0] bg-[#fafafa]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="cursor-grab active:cursor-grabbing text-[#bbb] hover:text-[#666] text-[16px] select-none pr-1">
                          ⋮⋮
                        </span>
                        <span className="text-[12px] font-mono text-[#aaa]">#{i + 1}</span>
                        {v.isPinned && (
                          <span className="bg-[#ff5100]/10 text-[#ff5100] border border-[#ff5100]/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                            📌 Pinned Short
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => moveVideo(i, i - 1)}
                          disabled={i === 0}
                          className="px-2 py-0.5 text-[11px] font-medium bg-[#f0f0f0] text-[#666] rounded hover:bg-[#e0e0e0] disabled:opacity-30"
                        >
                          ▲ Up
                        </button>
                        <button
                          onClick={() => moveVideo(i, i + 1)}
                          disabled={i === draft.videos.length - 1}
                          className="px-2 py-0.5 text-[11px] font-medium bg-[#f0f0f0] text-[#666] rounded hover:bg-[#e0e0e0] disabled:opacity-30"
                        >
                          ▼ Down
                        </button>
                        <button
                          onClick={() => togglePinVideo(i)}
                          className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-colors ${
                            v.isPinned
                              ? "bg-[#ff5100] text-white"
                              : "bg-[#f0f0f0] text-[#666] hover:bg-[#e0e0e0]"
                          }`}
                        >
                          {v.isPinned ? "Unpin" : "Pin Short"}
                        </button>
                        <button
                          onClick={() => removeVideo(i)}
                          className="text-[12px] text-red-500 hover:text-red-700 font-medium ml-2"
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Field
                        label="Title"
                        value={v.title}
                        onChange={(val) => setVideo(i, "title", val)}
                      />
                      <Field
                        label="Status Badge"
                        value={v.status}
                        onChange={(val) => setVideo(i, "status", val)}
                      />
                    </div>

                    <Field
                      label="Backlink URL"
                      value={v.backlink || ""}
                      onChange={(val) => setVideo(i, "backlink", val)}
                      placeholder="https://..."
                    />

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold text-[#666]">
                        Video Source (HLS .m3u8 link OR Direct MP4 upload)
                      </label>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          value={v.streamUrl || ""}
                          onChange={(e) => setVideo(i, "streamUrl", e.target.value)}
                          placeholder="Paste HLS Stream URL (e.g., https://.../manifest.m3u8)"
                          className="w-full text-[13px] px-3.5 py-2 rounded-lg bg-white border border-[#e0e0e0] focus:border-[#1a1a1a] outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            accept="video/mp4,video/*"
                            ref={(el) => (videoFileRefs.current[i] = el)}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleVideoFileUpload(i, file);
                            }}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => videoFileRefs.current[i]?.click()}
                            disabled={uploadingIndex === i}
                            className="px-3.5 py-1.5 rounded-lg bg-[#eef2ff] text-[#4f46e5] text-[12px] font-semibold hover:bg-[#e0e7ff] transition-colors border border-[#c7d2fe]"
                          >
                            {uploadingIndex === i ? "Uploading to Cloud..." : "📁 Pick MP4 from Computer"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* BULK IMAGE IMPORTER — PURE PINTEREST GRID MANAGER */
              <div className="flex flex-col gap-6">
                {/* Importer Controls Box */}
                <div className="bg-[#fcfcfd] border border-[#e2e4e9] rounded-[16px] p-5 flex flex-col gap-4 shadow-xs">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[14px] font-bold text-[#1a1a1a] tracking-[-0.01em]">
                      🖼️ Bulk Image Importer
                    </h3>
                    <p className="text-[12px] text-[#666] leading-relaxed">
                      Select multiple image files at once from your computer or paste image links in bulk. Aspect ratios & 2x previews calculate automatically!
                    </p>
                  </div>

                  {/* Bulk Input Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Method 1: Bulk Computer File Picker */}
                    <div className="flex flex-col gap-2 p-4 rounded-[12px] bg-white border border-[#e5e5e5]">
                      <span className="text-[12px] font-semibold text-[#1a1a1a]">
                        📁 Select Multiple Files from PC
                      </span>
                      <p className="text-[11px] text-[#888]">
                        Hold Shift/Ctrl to select 10, 20, or 50+ images at once.
                      </p>

                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        ref={bulkFileRef}
                        onChange={handleBulkFilesSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => bulkFileRef.current?.click()}
                        disabled={isBulkProcessing}
                        className="mt-1 w-full py-2.5 rounded-lg bg-[#ff5100] hover:bg-[#e04700] text-white text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
                      >
                        <span>📁 Choose Multiple Files</span>
                      </button>
                    </div>

                    {/* Method 2: Bulk Image Links Paste */}
                    <div className="flex flex-col gap-2 p-4 rounded-[12px] bg-white border border-[#e5e5e5]">
                      <span className="text-[12px] font-semibold text-[#1a1a1a]">
                        📋 Paste Multiple Image URLs
                      </span>
                      <textarea
                        rows={2}
                        value={bulkUrls}
                        onChange={(e) => setBulkUrls(e.target.value)}
                        placeholder="Paste image links here (one URL per line)..."
                        className="text-[12px] font-mono px-3 py-1.5 rounded-lg border border-[#e0e0e0] focus:border-[#1a1a1a] outline-none resize-none"
                      />
                      <button
                        type="button"
                        onClick={handleBulkUrlsImport}
                        disabled={isBulkProcessing || !bulkUrls.trim()}
                        className="w-full py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#333] disabled:opacity-40 text-white text-[12px] font-semibold transition-colors flex items-center justify-center gap-1"
                      >
                        Import Links
                      </button>
                    </div>
                  </div>

                  {/* Status Banner */}
                  {bulkStatusText && (
                    <div className="p-3 rounded-lg bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-[12px] font-medium animate-fade-in flex items-center gap-2">
                      <span className="animate-spin">⏳</span>
                      <span>{bulkStatusText}</span>
                    </div>
                  )}
                </div>

                {/* Grid Management Header */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[13px] font-bold text-[#1a1a1a]">
                    Image Gallery ({draft.tweets.length} items total)
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetToDefaultDemoTweets}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-[#666] hover:bg-[#f0f0f0] transition-colors border border-[#e0e0e0]"
                    >
                      Reset to 12 Demo Pins
                    </button>
                    <button
                      type="button"
                      onClick={clearAllTweets}
                      className="px-3 py-1.5 rounded-lg text-[12px] font-medium text-red-600 hover:bg-red-50 transition-colors border border-red-200"
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Thumbnail Grid Matrix for quick inspection & deletion */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {draft.tweets.map((t, idx) => (
                    <div
                      key={t.id || idx}
                      className="group relative rounded-xl overflow-hidden bg-[#eee] border border-[#e5e5e5] shadow-xs"
                      style={{ aspectRatio: t.aspectRatio ? `${t.aspectRatio}` : "1" }}
                    >
                      <img
                        src={t.image}
                        alt="Pin preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeTweet(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700"
                        title="Remove Image"
                      >
                        ✕
                      </button>
                      <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-mono px-1.5 py-0.5 rounded backdrop-blur-xs">
                        {t.aspectRatio ? `${t.aspectRatio} W/H` : "1:1"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[18px] border border-[#ebebeb] p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-2 pb-2 border-b border-[#f5f5f5]">
        {icon}
        <h2 className="text-[13px] font-semibold text-[#1a1a1a] tracking-[-0.02em]">{label}</h2>
      </div>
      <div className="flex flex-col gap-3.5">{children}</div>
    </div>
  );
}

function Field({
  label, hint, value, onChange, placeholder, multiline = false,
}: {
  label: string; hint?: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-semibold text-[#666]">{label}</label>
        {hint && <span className="text-[11px] text-[#aaa]">{hint}</span>}
      </div>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-[13px] px-3.5 py-2.5 rounded-lg bg-white border border-[#e0e0e0] focus:border-[#1a1a1a] outline-none transition-colors leading-relaxed"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="text-[13px] px-3.5 py-2 rounded-lg bg-white border border-[#e0e0e0] focus:border-[#1a1a1a] outline-none transition-colors"
        />
      )}
    </div>
  );
}
