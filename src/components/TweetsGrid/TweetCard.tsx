import { useState } from "react";
import { motion } from "framer-motion";
import type { TweetEntry } from "@/types/tweet";

interface TweetCardProps {
  tweet: TweetEntry;
  onExpand: () => void;
}

export default function TweetCard({ tweet, onExpand }: TweetCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fallbackColor = tweet.placeholderColor || "#1f1f23";
  const rawImage = tweet.image;
  const displayImage = rawImage && !rawImage.startsWith("blob:")
    ? rawImage
    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative rounded-[20px] overflow-hidden bg-[#f4f4f6] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 mb-4 md:mb-5 break-inside-avoid"
      onClick={onExpand}
    >
      {/* 
        PRE-ALLOCATED ASPECT-RATIO WRAPPER (PINTEREST MEMORY RULE)
        Locks container geometry BEFORE image downloading to eliminate Layout Shift (CLS)
      */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: tweet.aspectRatio ? `${tweet.aspectRatio}` : "1",
          backgroundColor: fallbackColor,
        }}
      >
        {/* Layer 1: Dominant Color / Skeleton Loading State */}
        {!isLoaded && !hasError && (
          <div
            className="absolute inset-0 animate-pulse transition-opacity duration-300"
            style={{ backgroundColor: fallbackColor }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
        )}

        {/* Layer 2: 2x High-Density Image Asset */}
        <img
          src={displayImage}
          alt={tweet.title || "Tweet item"}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />

        {/* Hover Overlay Matrix */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
          <div className="flex justify-end">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            {tweet.title && (
              <h3 className="font-semibold text-[15px] leading-snug text-white tracking-[-0.01em] line-clamp-2">
                {tweet.title}
              </h3>
            )}
            {tweet.caption && (
              <p className="text-[12px] text-white/80 line-clamp-2 font-normal leading-relaxed">
                {tweet.caption}
              </p>
            )}

            {/* Interaction Metrics */}
            <div className="flex items-center gap-4 pt-1 text-[11px] text-white/70 font-medium">
              {tweet.likes !== undefined && (
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {tweet.likes}
                </span>
              )}
              {tweet.retweets !== undefined && (
                <span className="flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
                  </svg>
                  {tweet.retweets}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
