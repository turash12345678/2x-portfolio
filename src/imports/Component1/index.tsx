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
        `h-[52px] sm:h-[56px] relative rounded-[32px] transition-all ${
          isNevDark
            ? "w-full"
            : "bg-[#262729]/95 backdrop-blur-md w-full max-w-[500px] mx-auto shadow-2xl border border-white/10 pointer-events-auto"
        }`
      }
    >
      <div className="flex flex-row items-center h-full w-full">
        <div className="flex items-center justify-between px-3.5 sm:pl-[24px] sm:pr-[8px] py-[6px] sm:py-[8px] h-full w-full gap-2">
          <div className="flex flex-1 gap-3 sm:gap-6 md:gap-[48px] lg:gap-[80px] items-center min-w-0">
            <a
              href="#"
              className={`font-bold text-[22px] sm:text-[29.388px] text-center tracking-[-1.1755px] leading-none shrink-0 ${
                isNevDark ? "text-black" : "text-white"
              }`}
              style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
            >
              <span>2x</span>
              <span className="text-[#ff5100]">.</span>
            </a>
            <div
              className="flex gap-2.5 sm:gap-[16px] items-center shrink-0 text-[13.5px] sm:text-[18.388px] tracking-[-0.5516px] whitespace-nowrap"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              <a
                href="#playground"
                className={`shrink-0 transition-colors ${
                  isNevDark ? "text-black hover:text-[#ff5100]" : "text-white hover:text-[#ff5100]"
                }`}
              >
                Playground
              </a>

              {/* Case Story with tooltip */}
              <div
                className="relative shrink-0"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <button
                  type="button"
                  onClick={() => setShowTooltip((prev) => !prev)}
                  className="shrink-0 text-[#b3b3b3] hover:text-[#888] cursor-pointer transition-colors"
                >
                  Case Story
                </button>

                {/* Tooltip — opens downward for top nav, upward for bottom pill */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 transition-all duration-200 z-50 ${
                    isNevDark ? "top-[calc(100%+10px)]" : "bottom-[calc(100%+10px)]"
                  } ${
                    showTooltip
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : isNevDark
                      ? "opacity-0 -translate-y-1 pointer-events-none"
                      : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="bg-[#1a1a1a] text-white rounded-[12px] px-3.5 py-2 sm:px-4 sm:py-2.5 whitespace-nowrap shadow-xl border border-white/10">
                    <p
                      className="text-[12px] sm:text-[13px] tracking-[-0.02em] leading-snug"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                    >
                      My business story is coming soon.{" "}
                      <span className="text-[#b3b3b3]">Stay tuned</span> ✨
                    </p>
                  </div>
                  {/* Caret — points up when below nav, points down when above pill */}
                  {isNevDark ? (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0"
                      style={{
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderBottom: "6px solid #1a1a1a",
                      }}
                    />
                  ) : (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                      style={{
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "6px solid #1a1a1a",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center shrink-0">
            <a
              href="mailto:turashahsan8@gmail.com"
              className={`flex items-center justify-center px-3 sm:px-[16px] py-1.5 sm:py-[8px] rounded-[9999px] shrink-0 transition-all active:scale-95 shadow-sm ${
                isNevDark ? "bg-[#1a1a1a] hover:bg-black" : "bg-white hover:bg-[#f0f0f0]"
              }`}
            >
              <p
                className={`shrink-0 text-[13px] sm:text-[18.388px] tracking-[-0.5516px] whitespace-nowrap font-medium ${
                  isNevDark ? "text-white" : "text-[#1a1a1a]"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Contact
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
