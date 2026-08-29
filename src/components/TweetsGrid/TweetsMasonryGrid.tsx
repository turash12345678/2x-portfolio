import { useMemo } from "react";
import TweetCard from "./TweetCard";
import type { TweetEntry } from "@/types/tweet";

interface TweetsMasonryGridProps {
  tweets: TweetEntry[];
  onSelectTweet: (index: number) => void;
}

export default function TweetsMasonryGrid({ tweets, onSelectTweet }: TweetsMasonryGridProps) {
  // Sort pinned tweets first, then by date/order
  const sortedTweets = useMemo(() => {
    return [...tweets].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [tweets]);

  if (!tweets || tweets.length === 0) {
    return (
      <div className="min-h-[300px] w-full rounded-[24px] border border-dashed border-[#e5e5e5] bg-[#fafafa]/50 flex items-center justify-center p-8">
        <p className="text-[14px] text-[#888] font-medium">No tweets or pins found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Responsive Pinterest Masonry Columns Matrix */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-5 [column-fill:_balance]">
        {sortedTweets.map((tweet, index) => (
          <TweetCard
            key={tweet.id || index}
            tweet={tweet}
            onExpand={() => onSelectTweet(index)}
          />
        ))}
      </div>
    </div>
  );
}
