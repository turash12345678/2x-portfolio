import { FigmaIcon, Copy01Icon, File01Icon } from "hugeicons-react";

type PillProps = {
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

function Pill({ label, icon, onClick, href }: PillProps) {
  const base =
    "content-stretch flex gap-[4px] items-center px-[8px] py-[4px] rounded-full shrink-0 " +
    "bg-[rgba(132,132,132,0.08)] transition-colors hover:bg-[rgba(132,132,132,0.16)]";

  const labelClass =
    "font-medium leading-[20px] not-italic text-[#707070] text-[14px] tracking-[0.2px] " +
    "whitespace-nowrap [word-break:break-word]";

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        data-name="PopperAnchor"
      >
        <span className="relative shrink-0 size-[14px] flex items-center justify-center">
          {icon}
        </span>
        <span className={labelClass}>{label}</span>
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={base} data-name="PopperAnchor">
      <span className="relative shrink-0 size-[14px] flex items-center justify-center">
        {icon}
      </span>
      <span className={labelClass}>{label}</span>
    </button>
  );
}

export default function NavbarV2() {
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

      {/* Right: 3 pill buttons */}
      <div className="flex flex-row items-center self-stretch">
        <div className="content-stretch flex gap-[12px] h-full items-center justify-end relative shrink-0">
          <Pill
            label="View Design"
            icon={<FigmaIcon size={14} strokeWidth={1.75} color="#707070" />}
            href="https://www.figma.com/@turashahsan"
          />
          <Pill
            label="Copy mail"
            icon={<Copy01Icon size={14} strokeWidth={1.75} color="#707070" />}
            onClick={() => {
              navigator.clipboard.writeText("turash@turashahsan.com");
            }}
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
