import { useState } from "react";
import { FigmaIcon, Copy01Icon, File01Icon, Tick01Icon } from "hugeicons-react";
import { BorderBeam } from "border-beam";
import { motion, AnimatePresence } from "framer-motion";

type PillProps = {
  label: string;
  shortLabel?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  isCopied?: boolean;
};

function Pill({ label, shortLabel, icon, onClick, href, isCopied }: PillProps) {
  const [isHovered, setIsHovered] = useState(false);

  const base =
    "relative h-[34px] sm:h-[36px] py-[3px] sm:py-[4px] px-[8px] xs:px-[10px] sm:px-[14px] rounded-full shrink-0 " +
    "bg-[#F4F4F4] transition-all duration-200 flex items-center gap-[4px] sm:gap-[6px] " +
    "hover:bg-[#ebebeb] cursor-pointer select-none active:scale-95";

  const labelClass =
    "font-medium leading-[20px] not-italic text-[#707070] text-[12px] sm:text-[14px] tracking-[0.2px] " +
    "whitespace-nowrap";

  const content = (
    <div
      className={base}
      data-name="PopperAnchor"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative shrink-0 size-[14px] flex items-center justify-center">
        {icon}
      </span>
      <span className={labelClass}>
        {isCopied ? "Copied!" : (
          <>
            <span className="inline sm:hidden">{shortLabel || label}</span>
            <span className="hidden sm:inline">{label}</span>
          </>
        )}
      </span>
    </div>
  );

  if (href) {
    return (
      <BorderBeam
        size="sm"
        colorVariant="sunset"
        theme="light"
        borderRadius={999}
        duration={1.0}
        brightness={1.85}
        saturation={1.6}
        strength={1.0}
        active={isHovered}
        className="rounded-full overflow-visible"
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5100]/50"
        >
          {content}
        </a>
      </BorderBeam>
    );
  }

  return (
    <BorderBeam
      size="sm"
      colorVariant="sunset"
      theme="light"
      borderRadius={999}
      duration={1.0}
      brightness={1.85}
      saturation={1.6}
      strength={1.0}
      active={isHovered}
      className="rounded-full overflow-visible"
    >
      <button
        type="button"
        onClick={onClick}
        className="block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5100]/50"
      >
        {content}
      </button>
    </BorderBeam>
  );
}

export default function NavbarV2() {
  const [copied, setCopied] = useState(false);
  const [showCaseTooltip, setShowCaseTooltip] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("turashahsan8@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav
      className="w-full flex items-center justify-between gap-3 sm:gap-6"
      data-name="default-version-2"
      aria-label="Main Navigation"
    >
      {/* Left: Brand Monogram + Navigation Links */}
      <div className="flex items-center gap-3 xs:gap-4 sm:gap-6 md:gap-8 min-w-0">
        <a
          href="#"
          className="font-bold text-[24px] sm:text-[29px] text-black text-center tracking-[-1.1755px] leading-none shrink-0 transition-opacity hover:opacity-80"
          style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
        >
          <span>2x</span>
          <span className="text-[#ff5100]">.</span>
        </a>

        <div
          className="flex font-medium gap-2.5 xs:gap-3.5 sm:gap-5 items-center leading-normal not-italic text-[13px] xs:text-[14px] sm:text-[16px] md:text-[18px] tracking-[-0.4px] sm:tracking-[-0.5516px] whitespace-nowrap"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <a
            href="#playground"
            className="text-black transition-colors hover:text-[#ff5100]"
          >
            Playground
          </a>

          {/* Case Story with animated tooltip */}
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onMouseEnter={() => setShowCaseTooltip(true)}
              onMouseLeave={() => setShowCaseTooltip(false)}
              onClick={() => setShowCaseTooltip((prev) => !prev)}
              className="text-[#999] hover:text-[#555] cursor-pointer transition-colors select-none font-medium"
            >
              Case Story
            </button>

            <AnimatePresence>
              {showCaseTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] text-white text-[11.5px] sm:text-[12px] font-medium px-3.5 py-1.5 rounded-xl shadow-xl whitespace-nowrap pointer-events-none flex items-center gap-1.5 border border-white/10"
                >
                  <span className="text-[#ff5100]">✨</span>
                  <span>My business story is coming soon. Stay tuned</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-b-[6px] border-b-[#1a1a1a]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right: Action Pills (View Design, Copy mail, Resume) */}
      <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
        <Pill
          label="View Design"
          shortLabel="Design"
          icon={<FigmaIcon size={14} strokeWidth={1.75} color="#707070" />}
          href="https://www.figma.com/proto/UIakmdXF7sal4uNvHR9whI/Turash-Ahsan-%E2%9C%A7-Design-File?page-id=134%3A14390&node-id=180-3183&viewport=60%2C222%2C0.04&t=30tNU6cmMi4KHq28-1&scaling=min-zoom&content-scaling=fixed"
        />
        <Pill
          label="Copy mail"
          shortLabel="Mail"
          icon={
            copied ? (
              <Tick01Icon size={14} strokeWidth={2.2} color="#16a34a" />
            ) : (
              <Copy01Icon size={14} strokeWidth={1.75} color="#707070" />
            )
          }
          onClick={handleCopyEmail}
          isCopied={copied}
        />
        <Pill
          label="Resume"
          shortLabel="CV"
          icon={<File01Icon size={14} strokeWidth={1.75} color="#707070" />}
          href="/Turash_Ahsan_resume.pdf"
        />
      </div>
    </nav>
  );
}
