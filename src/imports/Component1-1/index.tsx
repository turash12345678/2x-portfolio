import { useState } from "react";

export default function Component1_1({ className }: { className?: string }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className={
        className ||
        "bg-[#262729]/95 backdrop-blur-md h-[52px] sm:h-[56px] relative rounded-[32px] w-full max-w-[480px] mx-auto shadow-2xl border border-white/10 pointer-events-auto"
      }
    >
      <div className="flex flex-row items-center h-full w-full">
        <div className="flex items-center justify-between px-3 xs:px-4 sm:pl-[24px] sm:pr-[8px] py-[6px] sm:py-[8px] h-full w-full gap-2">
          <div className="flex flex-1 gap-3 xs:gap-5 sm:gap-[32px] md:gap-[50px] items-center min-w-0">
            <a
              href="#"
              className="font-bold text-[22px] sm:text-[29.388px] text-center text-white tracking-[-1.1755px] leading-none shrink-0"
              style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
            >
              <span>2x</span>
              <span className="text-[#ff5100]">.</span>
            </a>

            <div
              className="flex gap-2.5 xs:gap-3.5 sm:gap-[16px] items-center shrink-0 text-[13.5px] xs:text-[15px] sm:text-[18.388px] tracking-[-0.4px] sm:tracking-[-0.5516px] whitespace-nowrap"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
            >
              <a
                href="#playground"
                className="shrink-0 text-white hover:text-[#ff5100] transition-colors"
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
                  className="shrink-0 text-[#b3b3b3] hover:text-white cursor-pointer transition-colors text-[13.5px] xs:text-[15px] sm:text-[18.388px] tracking-[-0.4px] sm:tracking-[-0.5516px]"
                >
                  Case Story
                </button>

                {/* Tooltip — opens upward */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+10px)] transition-all duration-200 z-50 ${
                    showTooltip ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="bg-[#1a1a1a] text-white rounded-[12px] px-3.5 py-2 xs:px-4 xs:py-2.5 whitespace-nowrap shadow-xl border border-white/10">
                    <p
                      className="text-[11.5px] xs:text-[13px] tracking-[-0.02em] leading-snug"
                      style={{ fontFamily: "Inter, sans-serif", fontWeight: 400 }}
                    >
                      My business story is coming soon.{" "}
                      <span className="text-[#b3b3b3]">Stay tuned</span> ✨
                    </p>
                  </div>
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                    style={{
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "6px solid #1a1a1a",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center shrink-0">
            <a
              href="mailto:turashahsan8@gmail.com"
              className="bg-white hover:bg-[#f0f0f0] active:scale-95 transition-all flex items-center justify-center px-3 xs:px-3.5 sm:px-[16px] py-1.5 sm:py-[8px] rounded-[9999px] shrink-0 shadow-sm"
            >
              <span
                className="shrink-0 text-[#1a1a1a] text-[13px] xs:text-[14px] sm:text-[18.388px] tracking-[-0.4px] sm:tracking-[-0.5516px] whitespace-nowrap font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Contact
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
