import { useState, useRef, useEffect } from "react";
import Hls from "hls.js";

export interface VideoCardData {
  title: string;
  status: string;
  image: string;
  hasWatchAgain?: boolean;
  time?: string;
  loadable?: boolean;
  backlink?: string;
  streamUrl?: string; // Support for HLS .m3u8 URLs from Mux/Cloudflare
}

function ShareIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
      <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z" />
    </svg>
  );
}

const REPLAY_PATH =
  "M10.1142 2.02289C5.64574 2.02289 2.02284 5.64377 2.02284 10.1142C2.02284 14.5847 5.64574 18.2056 10.1142 18.2056C13.9636 18.2056 17.187 15.5152 18.0053 11.9146L19.9775 12.3596C18.956 16.8604 14.9285 20.2284 10.1142 20.2284C4.52812 20.2284 0 15.6973 0 10.1142C0 4.53121 4.52812 4.95543e-05 10.1142 4.95543e-05C13.4236 4.95543e-05 16.3607 1.58798 18.2055 4.04573V1.51718H20.2284V7.58569H14.1599V5.56285H16.8057C15.3483 3.42876 12.8946 2.02289 10.1142 2.02289Z";

function ReplayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d={REPLAY_PATH} fill="white" />
    </svg>
  );
}

export default function VideoCard({
  title,
  status,
  image,
  hasWatchAgain,
  time,
  loadable = false,
  backlink,
  streamUrl,
}: VideoCardData) {
  const [videoUrl, setVideoUrl] = useState<string | null>(streamUrl || null);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeStr, setTimeStr] = useState("0:00 / 0:00");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  // HLS stream binding initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (videoUrl.includes(".m3u8")) {
      if (Hls.isSupported()) {
        const hls = new Hls({ autoStartLoad: true });
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
      }
    }
  }, [videoUrl]);

  const pickVideo = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (videoUrl && !streamUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(URL.createObjectURL(f));
    setEnded(false);
    setProgress(0);
    e.target.value = "";
  };

  const handleMeta = () => {
    const v = videoRef.current;
    if (!v) return;
    setTimeStr(`0:00 / ${fmt(v.duration)}`);
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
    setTimeStr(`${fmt(v.currentTime)} / ${fmt(v.duration)}`);
  };

  const handleEnded = () => {
    setPlaying(false);
    setEnded(true);
    setProgress(100);
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().then(() => { setPlaying(true); setEnded(false); }).catch(() => {});
    }
  };

  const replay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    v.play().then(() => { setPlaying(true); setEnded(false); }).catch(() => {});
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
  };

  const hasVideo = !!videoUrl;
  const showWatchAgain = (!hasVideo && hasWatchAgain) || ended;

  const handleThumbnailClick = () => {
    if (hasVideo) return;
    if (loadable) { pickVideo(); return; }
    if (backlink) window.open(backlink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#f4f4f4] rounded-[20px] overflow-hidden p-[10px] flex flex-col gap-3 transition-transform hover:-translate-y-0.5">

      {/* Title + status */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <p
            className="text-[#0e141a] text-[15px] leading-6 tracking-[-0.02em] truncate"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {title}
          </p>
          <p
            className="text-[#888] text-[14px] leading-5 tracking-[-0.02em] truncate"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {status}
          </p>
        </div>
        <div className="flex items-center gap-1 mt-0.5 shrink-0">
          {backlink && (
            <a
              href={backlink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="opacity-50 hover:opacity-100 transition-opacity p-1 text-[#3b82f6]"
              title="View original post"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 11L11 2M11 2H6M11 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          )}
          <button className="opacity-70 hover:opacity-100 transition-opacity p-1 -mr-1 text-[#5E718D]">
            <ShareIcon />
          </button>
        </div>
      </div>

      {/* Thumbnail / Video */}
      <div
        className={`relative rounded-[16px] overflow-hidden group ${hasVideo || loadable ? "cursor-pointer" : "cursor-default"}`}
        style={{ aspectRatio: "16/9" }}
        onClick={hasVideo ? togglePlay : handleThumbnailClick}
      >
        <div className="absolute inset-0 bg-black" />

        <img
          src={image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hasVideo ? "opacity-0" : "opacity-100"}`}
        />

        {hasVideo && (
          <video
            ref={videoRef}
            src={videoUrl.includes(".m3u8") ? undefined : videoUrl}
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedMetadata={handleMeta}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            playsInline
          />
        )}

        {/* Load hint — owner only */}
        {loadable && !hasVideo && !hasWatchAgain && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-[rgba(14,20,26,0.75)] rounded-full px-5 h-10 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1v8M4 6l3 3 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1 11h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span className="text-white text-[14px] font-medium" style={{ fontFamily: "Inter, sans-serif" }}>
                Load video
              </span>
            </div>
          </div>
        )}

        {showWatchAgain && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <button
              className="bg-[rgba(14,20,26,0.75)] rounded-full px-5 h-10 flex items-center"
              onClick={ended ? replay : (e) => { e.stopPropagation(); if (loadable) pickVideo(); }}
            >
              <span className="text-white text-[15px] font-bold tracking-[-0.02em]" style={{ fontFamily: "Inter, sans-serif" }}>
                Watch again
              </span>
            </button>
          </div>
        )}

        {(hasVideo || hasWatchAgain) && (
          <div
            className={`absolute bottom-0 left-0 right-0 transition-opacity duration-200 ${hasVideo ? "opacity-0 group-hover:opacity-100" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="px-3 pb-3 pt-8"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.77) 100%)" }}
            >
              <div
                className="w-full h-[2px] bg-white/30 rounded-full mb-2.5 cursor-pointer"
                onClick={hasVideo ? seek : undefined}
              >
                <div
                  className="h-full bg-white rounded-full transition-[width] duration-100"
                  style={{ width: `${hasVideo ? progress : 100}%` }}
                />
              </div>
              {(hasVideo || time) && (
                <div className="flex items-center justify-between">
                  <button className="w-9 h-9 flex items-center justify-center" onClick={hasVideo ? replay : undefined}>
                    <ReplayIcon />
                  </button>
                  <span className="text-white text-sm tracking-[-0.02em]" style={{ fontFamily: "Inter, sans-serif" }}>
                    {hasVideo ? timeStr : time}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}
