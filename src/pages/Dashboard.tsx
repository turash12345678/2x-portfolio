import { useState, useRef } from "react";

export interface VideoEntry {
  title: string;
  status: string;
  backlink?: string;
  streamUrl?: string;
  localVideoUrl?: string;
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
    { title: "Client testimonial video", status: "Boosted?", backlink: "", streamUrl: "" },
    { title: "Product launch highlight reel", status: "Elevated?", backlink: "", streamUrl: "" },
    { title: "Behind-the-scenes documentary", status: "Captured?", backlink: "", streamUrl: "" },
    { title: "Event recap video", status: "Showcased?", backlink: "", streamUrl: "" },
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
  const [cardTab, setCardTab] = useState<CardTab>("shorts");

  const videoFileRefs = useRef<(HTMLInputElement | null)[]>([]);
  const tweetFileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const set = <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaveState("idle");
  };

  const setVideo = (i: number, key: keyof VideoEntry, value: string) => {
    setDraft((d) => {
      const videos = [...d.videos];
      videos[i] = { ...videos[i], [key]: value };
      return { ...d, videos };
    });
    setSaveState("idle");
  };

  const addVideo = () => {
    setDraft((d) => ({
      ...d,
      videos: [
        ...d.videos,
        { title: "New Short Video", status: "New?", backlink: "", streamUrl: "" },
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

  const handleVideoFileLoad = (i: number, file: File) => {
    const url = URL.createObjectURL(file);
    setVideo(i, "localVideoUrl", url);
  };

  const setTweet = (i: number, key: keyof TweetEntry, value: string) => {
    setDraft((d) => {
      const tweets = [...d.tweets];
      tweets[i] = { ...tweets[i], [key]: value };
      return { ...d, tweets };
    });
    setSaveState("idle");
  };

  const handleSave = () => {
    onSave(draft);
    setSaveState("saved");
    setTimeout(() => setSaveState("idle"), 3000);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-20 border-b border-[#e8e8e8] px-6 py-3.5 flex items-center justify-between"
        style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-[10px] bg-[#1a1a1a] flex items-center justify-center shrink-0">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1" y="1" width="5.5" height="5.5" rx="1.2" fill="white" />
              <rect x="8.5" y="1" width="5.5" height="5.5" rx="1.2" fill="white" />
              <rect x="1" y="8.5" width="5.5" height="5.5" rx="1.2" fill="white" />
              <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1.2" fill="white" opacity="0.4" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-semibold text-[#1a1a1a] leading-tight tracking-[-0.03em]">
              Content Studio
            </p>
            <p className="text-[11px] text-[#aaa] leading-tight tracking-[-0.01em]">
              2x portfolio · admin studio
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {saveState === "saved" && (
            <span className="text-[13px] text-[#16a34a] tracking-[-0.02em] flex items-center gap-1.5 font-medium">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5l3.5 3.5 5.5-6" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Saved
            </span>
          )}
          <button
            onClick={handleSave}
            className="bg-[#1a1a1a] text-white text-[13px] font-medium px-4 py-2 rounded-full tracking-[-0.02em] hover:bg-[#333] transition-colors shadow-sm"
          >
            Save changes
          </button>
          <button
            onClick={onExit}
            className="text-[13px] text-[#666] px-3 py-2 rounded-full hover:bg-[#ebebeb] transition-colors tracking-[-0.02em]"
          >
            ← Exit
          </button>
        </div>
      </header>

      <main className="max-w-[680px] mx-auto px-5 py-10 flex flex-col gap-6">

        {/* Profile */}
        <Section label="Profile" icon={
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="4.5" r="2.5" stroke="#888" strokeWidth="1.3" />
            <path d="M1.5 12c0-2.485 2.462-4.5 5.5-4.5s5.5 2.015 5.5 4.5" stroke="#888" strokeWidth="1.3" strokeLinecap="round" />
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
              /* Shorts — Title, Status tag, HLS stream URL, Manual upload, Backlink */
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between pb-1">
                  <p className="text-[12px] font-semibold text-[#666]">
                    Shorts Collection ({draft.videos.length} videos)
                  </p>
                  <button
                    onClick={addVideo}
                    className="text-[12px] font-bold text-[#3b82f6] hover:underline flex items-center gap-1"
                  >
                    + Add New Short
                  </button>
                </div>

                {draft.videos.map((v, i) => (
                  <div key={i} className="border border-[#ebebeb] rounded-[14px] p-4 flex flex-col gap-4 bg-[#fafafa]">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold text-[#888] uppercase tracking-[0.07em]">
                        Short #{i + 1}
                      </p>
                      <div className="flex items-center gap-3">
                        {v.backlink && (
                          <a
                            href={v.backlink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-[#3b82f6] flex items-center gap-1 hover:underline tracking-[-0.01em]"
                          >
                            Preview Post ↗
                          </a>
                        )}
                        <button
                          onClick={() => removeVideo(i)}
                          className="text-[11px] text-red-500 hover:underline font-medium"
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
                        label="HLS Stream Link (.m3u8)"
                        hint="Mux / Cloudflare Stream playlist URL"
                        value={v.streamUrl || ""}
                        onChange={(val) => setVideo(i, "streamUrl", val)}
                        placeholder="https://stream.mux.com/YOUR_PLAYBACK_ID.m3u8"
                      />

                      {/* Manual Upload from Computer */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[12px] text-[#999] tracking-[-0.01em]">Or Manual Computer Upload (MP4/WebM)</label>
                        {v.localVideoUrl ? (
                          <div className="relative rounded-[8px] overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
                            <video
                              src={v.localVideoUrl}
                              className="w-full h-full object-cover"
                              controls
                              playsInline
                            />
                            <button
                              onClick={() => setVideo(i, "localVideoUrl", "")}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                            >
                              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M2 2l6 6M8 2l-6 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => videoFileRefs.current[i]?.click()}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-[8px] border-2 border-dashed border-[#ddd] text-[13px] text-[#888] hover:border-[#bbb] hover:text-[#333] transition-colors bg-white"
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path d="M7 1v8M4 6l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M1 11h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                            </svg>
                            Upload MP4 video from Computer
                          </button>
                        )}
                        <input
                          ref={(el) => { videoFileRefs.current[i] = el; }}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handleVideoFileLoad(i, f);
                            e.target.value = "";
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Tweets section */
              <div className="flex flex-col gap-3">
                {draft.tweets.map((t, i) => (
                  <div key={i} className="border border-[#ebebeb] rounded-[12px] p-4 flex flex-col gap-4 bg-[#fafafa]">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-semibold text-[#bbb] uppercase tracking-[0.07em]">
                        Tweet #{i + 1}
                      </p>
                      {t.backlink && (
                        <a
                          href={t.backlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#3b82f6] flex items-center gap-1 hover:underline tracking-[-0.01em]"
                        >
                          Preview post ↗
                        </a>
                      )}
                    </div>

                    <Field label="Title" value={t.title} onChange={(val) => setTweet(i, "title", val)} />
                    <Field label="Status tag" value={t.status} onChange={(val) => setTweet(i, "status", val)} />

                    <Field
                      label="Post backlink"
                      value={t.backlink}
                      onChange={(val) => setTweet(i, "backlink", val)}
                      placeholder="https://x.com/yourpost"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-[12px] text-[#ccc] tracking-[-0.01em] pb-4">
          Changes save locally and update the live Shorts grid in real-time.
        </p>
      </main>
    </div>
  );
}

function Section({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-[18px] border border-[#ebebeb] overflow-hidden shadow-sm">
      <div className="px-5 py-3.5 border-b border-[#f5f5f5] flex items-center gap-2">
        {icon}
        <h2 className="text-[13px] font-semibold text-[#1a1a1a] tracking-[-0.02em]">{label}</h2>
      </div>
      <div className="px-5 py-4 flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  hint,
  placeholder,
  value,
  onChange,
  multiline,
}: {
  label: string;
  hint?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  const cls =
    "w-full text-[#1a1a1a] text-[14px] tracking-[-0.02em] leading-relaxed bg-[#f0f0f0] rounded-[8px] px-3 py-2.5 outline-none focus:ring-1 focus:ring-[#1a1a1a]/30 transition-shadow placeholder:text-[#bbb]";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-2">
        <label className="text-[12px] text-[#999] tracking-[-0.01em]">{label}</label>
        {hint && <span className="text-[11px] text-[#c8c8c8] tracking-[-0.01em]">{hint}</span>}
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
          rows={3}
          style={{ fontFamily: "Inter, sans-serif", resize: "vertical" }}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      )}
    </div>
  );
}
