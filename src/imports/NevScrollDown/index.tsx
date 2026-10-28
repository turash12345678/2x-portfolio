function NavLinks() {
  return (
    <div className="flex items-center gap-2.5 sm:gap-4 shrink-0" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
      <a href="#playground" className="text-white hover:text-[#ff5100] transition-colors text-[13.5px] sm:text-[18px] tracking-[-0.03em] leading-none shrink-0 whitespace-nowrap">Playground</a>
      <p className="text-[#b3b3b3] text-[13.5px] sm:text-[18px] tracking-[-0.03em] leading-none shrink-0 whitespace-nowrap cursor-default">Case Story</p>
    </div>
  );
}

function Logo() {
  return (
    <a
      href="#"
      className="text-white text-[22px] sm:text-[29px] tracking-[-0.04em] leading-none shrink-0 font-bold"
      style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
    >
      2x<span className="text-[#ff5100]">.</span>
    </a>
  );
}

function LeftGroup() {
  return (
    <div className="flex items-center gap-3 sm:gap-6 md:gap-[48px] lg:gap-[80px] flex-1 min-w-0">
      <Logo />
      <NavLinks />
    </div>
  );
}

function ContactButton() {
  return (
    <div className="shrink-0 p-[2px] rounded-[16px]">
      <a
        href="mailto:turashahsan8@gmail.com"
        className="bg-white hover:bg-[#f0f0f0] active:scale-95 transition-all flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
      >
        <span className="text-[#1a1a1a] text-[13px] sm:text-[18px] tracking-[-0.03em] leading-none whitespace-nowrap font-medium">
          Contact
        </span>
      </a>
    </div>
  );
}

export default function NevScrollDown() {
  return (
    <div
      className="flex items-center justify-between px-3 sm:pl-6 sm:pr-2 py-1.5 sm:py-2 rounded-[32px] w-full"
      data-name="nev (Scroll down)"
    >
      <LeftGroup />
      <ContactButton />
    </div>
  );
}
