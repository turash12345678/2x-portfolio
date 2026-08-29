import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TweetEntry } from "@/types/tweet";

interface TweetLightboxModalProps {
  isOpen: boolean;
  currentIndex: number;
  tweets: TweetEntry[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function TweetLightboxModal({
  isOpen,
  currentIndex,
  tweets,
  onClose,
  onNavigate,
}: TweetLightboxModalProps) {
  const currentTweet = tweets[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < tweets.length - 1) onNavigate(currentIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, tweets.length, onClose, onNavigate]);

  if (!isOpen || !currentTweet) return null;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < tweets.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        key="tweet-modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-[110] w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-md"
          title="Close (Esc)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Previous Arrow */}
        {hasPrev && (
          <button
            onClick={() => onNavigate(currentIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors flex items-center justify-center backdrop-blur-md"
            title="Previous (Left Arrow)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Next Arrow */}
        {hasNext && (
          <button
            onClick={() => onNavigate(currentIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-[110] w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors flex items-center justify-center backdrop-blur-md"
            title="Next (Right Arrow)"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Lightbox Card Container */}
        <motion.div
          key={currentTweet.id || currentIndex}
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative max-w-[900px] w-full max-h-[85vh] bg-[#141416] border border-white/10 rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        >
          {/* Image Canvas View */}
          <div className="flex-1 bg-black/60 flex items-center justify-center min-h-[300px] max-h-[70vh] md:max-h-[85vh] p-4 overflow-hidden">
            <img
              src={currentTweet.image}
              alt={currentTweet.title || "Tweet detail"}
              className="w-full h-full object-contain max-h-full rounded-[16px]"
            />
          </div>

          {/* Details Sidebar */}
          <div className="w-full md:w-[340px] p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#191a1d] text-white">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-mono text-white/50">
                  {currentIndex + 1} / {tweets.length}
                </span>
              </div>

              {currentTweet.title && (
                <h2 className="text-[20px] font-bold text-white tracking-[-0.02em] leading-snug">
                  {currentTweet.title}
                </h2>
              )}

              {currentTweet.caption && (
                <p className="text-[14px] text-white/70 leading-relaxed font-normal">
                  {currentTweet.caption}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 pt-6 border-t border-white/10 mt-6">
              {/* Engagement metrics */}
              <div className="flex items-center justify-between text-[13px] text-white/60">
                <div className="flex items-center gap-4">
                  {currentTweet.likes !== undefined && (
                    <span className="flex items-center gap-1.5 font-medium text-white/90">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      {currentTweet.likes} Likes
                    </span>
                  )}
                  {currentTweet.retweets !== undefined && (
                    <span className="flex items-center gap-1.5 font-medium text-white/90">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
                      </svg>
                      {currentTweet.retweets} Shares
                    </span>
                  )}
                </div>
              </div>

              {/* Backlink button if present */}
              {currentTweet.backlink && (
                <a
                  href={currentTweet.backlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-[12px] bg-white text-black font-semibold text-[13px] hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  <span>View Original Post</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
