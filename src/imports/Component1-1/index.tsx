import { useState } from "react";

export default function Component1_1({
  className,
  onNavigateCaseStory,
}: {
  className?: string;
  onNavigateCaseStory?: () => void;
}) {
  return (
    <div className={className || "bg-[#262729] h-[56px] relative rounded-[32px] w-full"}>
      <div className="flex flex-row items-center h-full w-full">
        <div className="flex items-center justify-between pl-[24px] pr-[8px] py-[8px] h-full w-full">
          <div className="flex flex-1 gap-[80px] items-center min-w-0">
            <p
              className="font-bold text-[29.388px] text-center text-white tracking-[-1.1755px] leading-none shrink-0 w-[46px]"
              style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
            >
              <span>2x</span>
              <span className="text-[#ff5100]">.</span>
            </p>
            <div
              className="flex gap-[16px] items-center shrink-0 text-[18.388px] tracking-[-0.5516px] whitespace-nowrap"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              <p className="shrink-0 text-white">Playground</p>

              {/* Case Story button */}
              <button
                type="button"
                onClick={onNavigateCaseStory}
                className="shrink-0 text-white hover:text-[#ff5100] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Case Story</span>
                <span className="text-[11px] font-mono bg-[#26c163]/20 text-[#26c163] px-2 py-0.5 rounded-full font-bold">
                  New
                </span>
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[3px] items-start p-[2px] rounded-[16px] shrink-0">
            <div className="bg-white flex items-center justify-center px-[16px] py-[8px] rounded-[9999px] shrink-0">
              <p
                className="shrink-0 text-[#1a1a1a] text-[18.388px] tracking-[-0.5516px] whitespace-nowrap"
                style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
              >
                Contact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
