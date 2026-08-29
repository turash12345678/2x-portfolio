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
        style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(14px)" }}
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

        {/* Counter Badge */}
        <div className="absolute top-5 left-5 z-[110] bg-white/10 text-white/70 text-[13px] font-mono px-3 py-1 rounded-full backdrop-blur-md">
          {currentIndex + 1} / {tweets.length}
        </div>

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

        {/* Clean Lightbox Image Display */}
        <motion.div
          key={currentTweet.id || currentIndex}
          initial={{ opacity: 0, scale: 0.94, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 10 }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
          className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center overflow-hidden"
        >
          <img
            src={currentTweet.image}
            alt="Pinterest Lightbox View"
            className="w-full h-full object-contain max-h-[85vh] rounded-[20px] shadow-2xl"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
