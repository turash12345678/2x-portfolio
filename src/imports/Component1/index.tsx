import { useState } from "react";

type ComponentProps = {
  className?: string;
  property1?: "nev (Scroll down)" | "nev - dark";
};

export default function Component({ className, property1 = "nev - dark" }: ComponentProps) {
  const isNevDark = property1 === "nev - dark";
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={
        className ||
        `h-[56px] relative rounded-[32px] ${isNevDark ? "w-full" : "bg-[#262729] w-[500px]"}`
      }
    >
      <div className="flex flex-row items-center h-full w-full">
        <div className="flex items-center justify-between pl-[24px] pr-[8px] py-[8px] h-full w-full">
          <div className="flex flex-1 gap-[80px] items-center min-w-0">
            <p
              className={`font-bold text-[29.388px] text-center tracking-[-1.1755px] leading-none shrink-0 w-[46px] ${
                isNevDark ? "text-black" : "text-white"
              }`}
              style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
            >
              <span>2x</span>
              <span className="text-[#ff5100]">.</span>
            </p>
            <div
              className="flex gap-[16px] items-center shrink-0 text-[18.388px] tracking-[-0.5516px] whitespace-nowrap"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              <p className={`shrink-0 ${isNevDark ? "text-black" : "text-white"}`}>Playground</p>

              {/* Case Story with tooltip */}
              <div
                className="relative shrink-0"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <p className="shrink-0 text-[#b3b3b3] cursor-default">Case Story</p>

                {/* Tooltip — opens downward for top nav, upward for bottom pill */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 transition-all duration-200 pointer-events-none ${
                    isNevDark ? "top-[calc(100%+10px)]" : "bottom-[calc(100%+10px)]"
                  } ${showTooltip ? "opacity-100 translate-y-0" : isNevDark ? "opacity-0 -translate-y-1" : "opacity-0 translate-y-1"}`}
                >
                  <div className="bg-[#1a1a1a] text-white rounded-[12px] px-4 py-2.5 whitespace-nowrap shadow-lg">
                    <p className="text-[13px] tracking-[-0.02em] leading-snug" style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
                      My business story is coming soon.{" "}
                      <span className="text-[#b3b3b3]">Stay tuned</span> ✦
                    </p>
                  </div>
                  {/* Caret — points up when below nav, points down when above pill */}
                  {isNevDark ? (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0" style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "6px solid #1a1a1a" }} />
                  ) : (
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0" style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderTop: "6px solid #1a1a1a" }} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[3px] items-start p-[2px] rounded-[16px] shrink-0">
            <div
              className={`flex items-center justify-center px-[16px] py-[8px] rounded-[9999px] shrink-0 ${
                isNevDark ? "bg-[#1a1a1a]" : "bg-white"
              }`}
            >
              <p
                className={`shrink-0 text-[18.388px] tracking-[-0.5516px] whitespace-nowrap ${
                  isNevDark ? "text-white" : "text-[#1a1a1a]"
                }`}
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
