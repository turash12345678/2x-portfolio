import { useState } from "react";
import { FigmaIcon, Copy01Icon, File01Icon, Tick01Icon } from "hugeicons-react";
import { BorderBeam } from "border-beam";

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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("turash@turashahsan.com");
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
          <span
            className="relative shrink-0 text-[#999] cursor-default"
            title="My business story is coming soon. Stay tuned ✦"
          >
            Case Story
          </span>
        </div>
      </div>

      {/* Right: 3 pill buttons with 100% opacity #F4F4F4, 35px height, border-beam hover & copy checkmark */}
      <div className="flex flex-row items-center self-stretch">
        <div className="content-stretch flex gap-[12px] h-full items-center justify-end relative shrink-0">
          <Pill
            label="View Design"
            icon={<FigmaIcon size={14} strokeWidth={1.75} color="#707070" />}
            href="https://www.figma.com/@turashahsan"
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
            href="/resume.pdf"
          />
        </div>
      </div>
    </div>
  );
}
