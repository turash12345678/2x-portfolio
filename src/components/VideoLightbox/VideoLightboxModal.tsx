import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hls from "hls.js";
import type { VideoEntry } from "@/pages/Dashboard";

interface VideoLightboxModalProps {
  isOpen: boolean;
  currentIndex: number;
  videos: VideoEntry[];
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

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

export default function VideoLightboxModal({
  isOpen,
  currentIndex,
  videos,
  onClose,
  onNavigate,
}: VideoLightboxModalProps) {
  const currentVideo = videos[currentIndex];
  const { hlsUrl, playbackId } = resolveHlsUrl(currentVideo?.streamUrl || currentVideo?.localVideoUrl);
  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // HLS stream binding initialization
  useEffect(() => {
    if (!isOpen || !hlsUrl) return;
    const video = videoRef.current;
    if (!video) return;

    if (hlsUrl.includes(".m3u8") || hlsUrl.includes("stream.mux.com")) {
      if (Hls.isSupported()) {
        const hls = new Hls({ autoStartLoad: true, enableWorker: true });
        hls.loadSource(hlsUrl);
        hls.attachMedia(video);
        return () => hls.destroy();
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = hlsUrl;
      }
    } else {
      video.src = hlsUrl;
    }
  }, [isOpen, hlsUrl, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, videos.length]);

  if (!isOpen || !currentVideo) return null;

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + videos.length) % videos.length;
    onNavigate(prevIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % videos.length;
    onNavigate(nextIdx);
  };

  const togglePlay = () => {
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

  const posterImage = playbackId
    ? `https://image.mux.com/${playbackId}/thumbnail.jpg?time=1&width=1280`
    : "";

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
        onClick={onClose}
      >
        {/* Close Button (Top Right) */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/10"
          title="Close (Esc)"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Previous Arrow Button (Left) */}
        {videos.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/15 active:scale-95"
            title="Previous Short (Left Arrow)"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next Arrow Button (Right) */}
        {videos.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl border border-white/15 active:scale-95"
            title="Next Short (Right Arrow)"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        {/* Main Lightbox Pop-up Player Container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.93, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative w-full max-w-4xl max-h-[85vh] bg-[#0c0c0e] rounded-[24px] overflow-hidden shadow-2xl border border-white/10 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar inside Lightbox */}
          <div className="px-6 py-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-30 flex items-center justify-between pointer-events-none">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-white text-[16px] font-semibold tracking-[-0.02em]">
                {currentVideo.title}
              </h3>
              <p className="text-[#a0a0a0] text-[13px] tracking-[-0.01em]">
                {currentVideo.status}
              </p>
            </div>
            {currentVideo.backlink && (
              <a
                href={currentVideo.backlink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="pointer-events-auto text-white/70 hover:text-white p-2 transition-colors flex items-center gap-1 text-[13px]"
              >
                <span>View Original</span>
                <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
                  <path d="M3 12L12 3M12 3H6M12 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>

          {/* Video Display Area */}
          <div
            className="relative w-full flex-1 bg-black flex items-center justify-center cursor-pointer overflow-hidden"
            style={{ minHeight: "360px", maxHeight: "80vh", aspectRatio: "16/9" }}
            onClick={togglePlay}
          >
            {hlsUrl ? (
              <video
                ref={videoRef}
                className="w-full h-full object-contain"
                autoPlay
                playsInline
                loop={true}
                muted={muted}
                controls={false}
              />
            ) : (
              <img src={posterImage} alt={currentVideo.title} className="w-full h-full object-contain" />
            )}

            {/* Sound Toggle Button inside Pop-up */}
            <button
              onClick={toggleMute}
              className="absolute bottom-5 right-5 z-40 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg border border-white/10"
              title={muted ? "Unmute sound" : "Mute sound"}
            >
              {muted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
