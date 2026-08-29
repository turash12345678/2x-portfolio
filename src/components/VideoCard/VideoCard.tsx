import { useState, useRef, useEffect } from "react";
import Hls from "hls.js";

export interface VideoCardData {
  title: string;
  status: string;
  image: string;
  loadable?: boolean;
  backlink?: string;
  streamUrl?: string; // Support for HLS .m3u8 URLs or Mux links
}

/**
 * Auto-converts Mux player links (e.g. player.mux.com/PLAYBACK_ID)
 * into direct HLS playlist streams (https://stream.mux.com/PLAYBACK_ID.m3u8).
 */
function resolveHlsUrl(url: string | null | undefined): { hlsUrl: string | null; playbackId: string | null } {
  if (!url) return { hlsUrl: null, playbackId: null };
  const trimmed = url.trim();

  if (trimmed.includes("mux.com")) {
    const parts = trimmed.split("/");
    const lastPart = parts[parts.length - 1].split("?")[0].split(".")[0];
    if (lastPart) {
      return {
        hlsUrl: `https://stream.mux.com/${lastPart}.m3u8`,
        playbackId: lastPart,
      };
    }
  }

  return { hlsUrl: trimmed, playbackId: null };
}

export default function VideoCard({
  title,
  status,
  image,
  loadable = false,
  backlink,
  streamUrl,
}: VideoCardData) {
  const { hlsUrl, playbackId } = resolveHlsUrl(streamUrl);
  const [videoUrl, setVideoUrl] = useState<string | null>(hlsUrl);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setVideoUrl(hlsUrl);
  }, [streamUrl]);

  // HLS stream binding initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (videoUrl.includes(".m3u8") || videoUrl.includes("stream.mux.com")) {
      if (Hls.isSupported()) {
        const hls = new Hls({ autoStartLoad: true, enableWorker: true });
        hls.loadSource(videoUrl);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
      }
    } else {
      video.src = videoUrl;
    }
  }, [videoUrl]);

  const pickVideo = () => fileRef.current?.click();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (videoUrl && !streamUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(URL.createObjectURL(f));
    e.target.value = "";
  };

  const handleMeta = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
    } else {
      v.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMuted((prev) => !prev);
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (backlink) {
      window.open(backlink, "_blank", "noopener,noreferrer");
    } else if (navigator.share) {
      navigator.share({ title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  const hasVideo = !!videoUrl;

  // Use Mux poster thumbnail if available
  const posterImage = playbackId
    ? `https://image.mux.com/${playbackId}/thumbnail.jpg?time=1&width=1280`
    : image;

  const handleThumbnailClick = () => {
    if (hasVideo) return;
    if (loadable) { pickVideo(); return; }
    if (backlink) window.open(backlink, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-[#f4f4f4] rounded-[20px] overflow-hidden p-[10px] flex flex-col gap-3 transition-transform hover:-translate-y-0.5">

      {/* Title + Status + Clean Single Action Icon */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <p
            className="text-[#0e141a] text-[15px] leading-6 tracking-[-0.02em] truncate font-medium"
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

        {/* Single Clean Neutral Action Icon (No Blue Background, No Duplicate Icon) */}
        <div className="flex items-center gap-1 mt-0.5 shrink-0">
          <button
            onClick={handleShare}
            className="text-[#707070] hover:text-black transition-colors p-1 text-right"
            title={backlink ? "Open post" : "Share"}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path
                d="M3 12L12 3M12 3H6M12 3V9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Frame */}
      <div
        className={`relative rounded-[16px] overflow-hidden group ${hasVideo || loadable ? "cursor-pointer" : "cursor-default"}`}
        style={{ aspectRatio: "16/9" }}
        onClick={hasVideo ? togglePlay : handleThumbnailClick}
      >
        <div className="absolute inset-0 bg-black" />

        <img
          src={posterImage}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hasVideo ? "opacity-0" : "opacity-100"}`}
        />

        {hasVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedMetadata={handleMeta}
            playsInline
            loop={true}
            muted={muted}
            controls={false}
          />
        )}

        {/* Sound Toggle Control (Mute / Unmute Button) */}
        {hasVideo && (
          <button
            onClick={toggleMute}
            className="absolute bottom-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md"
            title={muted ? "Unmute sound" : "Mute sound"}
          >
            {muted ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        )}

        {/* Load hint — owner only */}
        {loadable && !hasVideo && (
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

        <input ref={fileRef} type="file" accept="video/*" className="hidden" onChange={handleFile} />
      </div>
    </div>
  );
}
