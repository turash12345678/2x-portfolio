import { useState } from "react";
import { FigmaIcon, Copy01Icon, File01Icon, Tick01Icon } from "hugeicons-react";
import { BorderBeam } from "border-beam";
import { motion, AnimatePresence } from "framer-motion";

type PillProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
  isCopied?: boolean;
};

function Pill({ label, icon, onClick, href, isCopied }: PillProps) {
  const [isHovered, setIsHovered] = useState(false);

  const base =
    "relative h-[35px] pt-[4px] pb-[4px] px-[12px] rounded-full shrink-0 " +
    "bg-[#F4F4F4] transition-all duration-200 flex items-center gap-[6px] " +
    "hover:bg-[#ebebeb] cursor-pointer select-none";

  const labelClass =
    "font-medium leading-[20px] not-italic text-[#707070] text-[14px] tracking-[0.2px] " +
    "whitespace-nowrap [word-break:break-word]";

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
      <span className={labelClass}>{isCopied ? "Copied!" : label}</span>
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
          className="block rounded-full"
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
      <button type="button" onClick={onClick} className="block rounded-full">
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
    <div
      className="content-stretch flex items-center justify-between relative w-full h-[35px]"
      data-name="default-version-2"
    >
      {/* Left: logo + nav links */}
      <div className="content-stretch flex gap-[32px] items-center relative shrink-0">
        <p
          className="font-bold text-[29.388px] text-black text-center tracking-[-1.1755px] leading-none shrink-0 w-[46px]"
          style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
        >
          <span>2x</span>
          <span className="text-[#ff5100]">.</span>
        </p>

        <div
          className="content-stretch flex font-medium gap-[16px] items-center leading-normal not-italic relative shrink-0 text-[18.388px] tracking-[-0.5516px] whitespace-nowrap"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <a
            href="#playground"
            className="relative shrink-0 text-black transition-colors hover:text-[#ff5100]"
          >
            Playground
          </a>

          {/* Case Story with instant animated tooltip */}
          <div className="relative inline-flex items-center">
            <button
              type="button"
              onMouseEnter={() => setShowCaseTooltip(true)}
              onMouseLeave={() => setShowCaseTooltip(false)}
              onClick={() => setShowCaseTooltip((prev) => !prev)}
              className="relative shrink-0 text-[#999] hover:text-[#666] cursor-pointer transition-colors select-none font-medium text-[18.388px] tracking-[-0.5516px]"
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
                  className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a] text-white text-[12px] font-medium px-3.5 py-1.5 rounded-xl shadow-xl whitespace-nowrap pointer-events-none flex items-center gap-1.5"
                >
                  <span className="text-[#ff5100]">✦</span>
                  <span>My business story is coming soon. Stay tuned</span>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-b-[6px] border-b-[#1a1a1a]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right: 3 pill buttons with 100% opacity #F4F4F4, 35px height, border-beam hover & copy checkmark */}
      <div className="flex flex-row items-center self-stretch">
        <div className="content-stretch flex gap-[12px] h-full items-center justify-end relative shrink-0">
          <Pill
            label="View Design"
            icon={<FigmaIcon size={14} strokeWidth={1.75} color="#707070" />}
            href="https://www.figma.com/proto/UIakmdXF7sal4uNvHR9whI/Turash-Ahsan-%E2%9C%A7-Design-File?page-id=134%3A14390&node-id=180-3183&viewport=60%2C222%2C0.04&t=30tNU6cmMi4KHq28-1&scaling=min-zoom&content-scaling=fixed"
          />
          <Pill
            label="Copy mail"
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
            icon={<File01Icon size={14} strokeWidth={1.75} color="#707070" />}
            href="/Turash_Ahsan_resume.pdf"
          />
        </div>
      </div>
    </div>
  );
}
