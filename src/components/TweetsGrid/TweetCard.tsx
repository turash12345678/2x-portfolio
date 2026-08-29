import { useState } from "react";
import { motion } from "framer-motion";
import type { TweetEntry } from "@/types/tweet";

interface TweetCardProps {
  tweet: TweetEntry;
  onExpand: () => void;
}

export default function TweetCard({ tweet, onExpand }: TweetCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const fallbackColor = tweet.placeholderColor || "#1f1f23";
  const rawImage = tweet.image;
  const initialImage = rawImage && !rawImage.startsWith("blob:")
    ? rawImage
    : "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop";

  const [imgSrc, setImgSrc] = useState(initialImage);

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
      {/* Aspect Ratio Container (Zero CLS Layout Shift) */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: tweet.aspectRatio ? `${tweet.aspectRatio}` : "1",
          backgroundColor: fallbackColor,
        }}
      >
        {/* Layer 1: Skeleton Loading State */}
        {!isLoaded && (
          <div
            className="absolute inset-0 animate-pulse transition-opacity duration-300"
            style={{ backgroundColor: fallbackColor }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>
        )}

        {/* Layer 2: Image */}
        <img
          src={imgSrc}
          alt="Pinterest Pin"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setImgSrc("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop");
            setIsLoaded(true);
          }}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />

        {/* Minimal Hover Expand Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
