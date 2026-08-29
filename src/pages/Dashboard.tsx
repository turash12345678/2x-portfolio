import { useState, useRef } from "react";

export interface VideoEntry {
  title: string;
  status: string;
  backlink?: string;
  streamUrl?: string;
  localVideoUrl?: string;
  isPinned?: boolean;
}

export interface TweetEntry {
  title: string;
  status: string;
  backlink: string;
}

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
  tweets: [
    { title: "Tweet post #1", status: "Viral?", backlink: "" },
    { title: "Tweet post #2", status: "Trending?", backlink: "" },
    { title: "Tweet post #3", status: "Shared?", backlink: "" },
  ],
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
  const [cardTab, setCardTab] = useState<CardTab>("shorts");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const videoFileRefs = useRef<(HTMLInputElement | null)[]>([]);

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
        ...d.videos, // Recently added short goes first at position 1
      ],
    }));
    setSaveState("idle");
  };

  const removeVideo = (index: number) => {
    setDraft((d) => ({
      ...d,
      videos: d.videos.filter((_, i) => i !== index),
    }));
    setSaveState("idle");
  };

  const handleVideoFileLoad = async (i: number, file: File) => {
    setUploadingIndex(i);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setVideo(i, "streamUrl", data.url);
          setUploadingIndex(null);
          return;
        }
      }
    } catch (err) {
      console.warn("Cloud upload unavailable, reading local blob:", err);
    }

    const localUrl = URL.createObjectURL(file);
    setVideo(i, "localVideoUrl", localUrl);
    setUploadingIndex(null);
  };

  const handleSave = () => {
    onSave(draft);
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f6] text-[#1a1a1a] flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#e5e5e7] px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center font-bold text-[13px]">
            2x
          </div>
          <div>
            <h1 className="text-[14px] font-bold text-[#1a1a1a] tracking-[-0.01em]">Content Studio</h1>
            <p className="text-[11px] text-[#888] font-medium tracking-[-0.01em]">Turso Database Edge Sync Active</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveState === "saved" && (
            <span className="text-[12px] font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ Saved & Live Globally
            </span>
          )}

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white font-semibold text-[13px] hover:bg-[#333] transition-colors shadow-xs"
          >
            Save changes
          </button>

          <button
            onClick={onExit}
            className="px-3.5 py-2 rounded-lg bg-[#f0f0f2] text-[#555] font-semibold text-[13px] hover:bg-[#e4e4e6] transition-colors"
          >
            Exit
          </button>
        </div>
      </header>

      {/* Main Studio Body */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-8 flex flex-col gap-6">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-[18px] p-5 text-white shadow-md flex items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div>
              <h2 className="text-[14px] font-bold tracking-tight">Turso Cloud Sync Connected</h2>
              <p className="text-[12px] text-blue-100 leading-relaxed mt-0.5">
                Changes saved here update instantly across all visitors, computers, and mobile browsers worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <Section label="Profile Details" icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="5" r="3" stroke="#888" strokeWidth="1.3" />
            <path d="M2 12c0-2.5 2.2-4 5-4s5 1.5 5 4" stroke="#888" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        }>
          <Field label="Display Name" value={draft.name} onChange={(v) => set("name", v)} />
          <Field label="Job Title" value={draft.jobTitle} onChange={(v) => set("jobTitle", v)} />
        </Section>

        {/* Bio */}
        <Section label="Bio" icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 3h10M2 6h10M2 9h6" stroke="#888" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        }>
          <Field label="Paragraph 1" hint="Wrap words in **bold** for emphasis" value={draft.bio1} onChange={(v) => set("bio1", v)} multiline />
          <Field label="Paragraph 2" value={draft.bio2} onChange={(v) => set("bio2", v)} multiline />
        </Section>

        {/* Video Cards Studio — Shorts / Tweets */}
        <div className="bg-white rounded-[18px] border border-[#ebebeb] overflow-hidden shadow-sm">
          {/* Section header with tab switcher */}
          <div className="px-5 py-3.5 border-b border-[#f5f5f5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <rect x="1" y="2.5" width="12" height="9" rx="1.5" stroke="#888" strokeWidth="1.3" />
                <path d="M5.5 5l3.5 2-3.5 2V5z" fill="#888" />
              </svg>
              <h2 className="text-[13px] font-semibold text-[#1a1a1a] tracking-[-0.02em]">Shorts & Content Manager</h2>
            </div>
            {/* Tab pills */}
            <div className="flex gap-0.5 bg-[#f5f5f5] p-0.5 rounded-full">
              {(["shorts", "tweets"] as CardTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setCardTab(tab)}
                  className={`px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-150 tracking-[-0.01em] capitalize ${
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

          <div className="px-5 py-4">
            {cardTab === "shorts" ? (
              /* Shorts — Title, Status tag, HLS stream URL, Drag & Drop Reordering, Pin Option */
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between pb-1">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-[12px] font-semibold text-[#666]">
                      Shorts Collection ({draft.videos.length} videos)
                    </p>
                    <p className="text-[11px] text-[#999]">
                      💡 Drag cards or use ▲ ▼ arrows to reorder them as you like
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
                    className={`border rounded-[14px] p-4 flex flex-col gap-4 transition-all ${
                      draggedIndex === i ? "opacity-40 scale-[0.99] border-blue-400 bg-blue-50/30" : ""
                    } ${v.isPinned ? "border-amber-300 bg-amber-50/20 shadow-xs" : "border-[#ebebeb] bg-[#fafafa]"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {/* Drag Handle Icon */}
                        <div
                          className="cursor-grab active:cursor-grabbing p-1 text-[#aaa] hover:text-[#555] transition-colors"
                          title="Drag to reorder"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                            <circle cx="5" cy="4" r="1.5" />
                            <circle cx="11" cy="4" r="1.5" />
                            <circle cx="5" cy="8" r="1.5" />
                            <circle cx="11" cy="8" r="1.5" />
                            <circle cx="5" cy="12" r="1.5" />
                            <circle cx="11" cy="12" r="1.5" />
                          </svg>
                        </div>

                        {/* Quick Up/Down Move Buttons */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            disabled={i === 0}
                            onClick={() => moveVideo(i, i - 1)}
                            className="text-[#999] hover:text-black disabled:opacity-20 transition-colors p-0.5"
                            title="Move up"
                          >
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                              <path d="M2 8l4-4 4 4" />
                            </svg>
                          </button>
                          <button
                            disabled={i === draft.videos.length - 1}
                            onClick={() => moveVideo(i, i + 1)}
                            className="text-[#999] hover:text-black disabled:opacity-20 transition-colors p-0.5"
                            title="Move down"
                          >
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                              <path d="M2 4l4 4 4-4" />
                            </svg>
                          </button>
                        </div>

                        <p className="text-[11px] font-bold text-[#888] uppercase tracking-[0.07em]">
                          Short #{i + 1}
                        </p>

                        {v.isPinned && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full border border-amber-200">
                            📌 Pinned to top
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Pin Option */}
                        <button
                          onClick={() => togglePinVideo(i)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all flex items-center gap-1 border ${
                            v.isPinned
                              ? "bg-amber-100 text-amber-800 border-amber-300 shadow-xs"
                              : "bg-white text-[#666] border-[#d8d8d8] hover:bg-[#f0f0f0]"
                          }`}
                          title={v.isPinned ? "Unpin from top" : "Pin short to top"}
                        >
                          📌 {v.isPinned ? "Pinned" : "Pin"}
                        </button>
                        <button
                          onClick={() => removeVideo(i)}
                          className="text-[11px] text-red-500 hover:underline font-medium px-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Field label="Title" value={v.title} onChange={(val) => setVideo(i, "title", val)} placeholder="Short Video Title" />
                      <Field label="Status tag" value={v.status} onChange={(val) => setVideo(i, "status", val)} placeholder="Boosted? / Elevated?" />
                    </div>

                    {/* Backlink */}
                    <Field
                      label="Post Backlink URL"
                      hint="Direct link to social media post on X, Instagram, TikTok"
                      value={v.backlink || ""}
                      onChange={(val) => setVideo(i, "backlink", val)}
                      placeholder="https://x.com/yourpost"
                    />

                    {/* Dual Video Source: HLS Stream URL or Manual Upload */}
                    <div className="border-t border-[#eee] pt-3 flex flex-col gap-3">
                      <Field
                        label="HLS Stream Link (.m3u8 / Mux Video Link)"
                        hint="Paste Mux link (player.mux.com/YOUR_ID) or HLS URL"
                        value={v.streamUrl || ""}
                        onChange={(val) => setVideo(i, "streamUrl", val)}
                        placeholder="https://player.mux.com/YOUR_PLAYBACK_ID"
                      />

                      {/* Manual Upload from Computer */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] font-semibold text-[#666]">
                          Or Choose Local Video File (.mp4)
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            ref={(el) => { videoFileRefs.current[i] = el; }}
                            type="file"
                            accept="video/*"
                            className="hidden"
                            onChange={(e) => {
                              const f = e.target.files?.[0];
                              if (f) handleVideoFileLoad(i, f);
                            }}
                          />
                          <button
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
              /* Tweets Placeholders */
              <div className="flex flex-col gap-4">
                <p className="text-[12px] text-[#888]">Tweets UI is under active development.</p>
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
    <div className="flex flex-col gap-1 flex-1">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-[12px] font-medium text-[#555] tracking-[-0.01em]">{label}</label>
        {hint && <span className="text-[11px] text-[#a0a0a0] font-normal">{hint}</span>}
      </div>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-[13px] text-[#1a1a1a] px-3.5 py-2.5 rounded-[10px] bg-[#f7f7f8] border border-[#e5e5e7] focus:border-[#1a1a1a] focus:bg-white outline-none transition-colors leading-relaxed resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-[13px] text-[#1a1a1a] px-3.5 py-2 rounded-[10px] bg-[#f7f7f8] border border-[#e5e5e7] focus:border-[#1a1a1a] focus:bg-white outline-none transition-colors"
        />
      )}
    </div>
  );
}
