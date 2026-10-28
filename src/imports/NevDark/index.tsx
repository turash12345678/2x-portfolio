function NavLinks() {
  return (
    <div
      className="flex items-center gap-2.5 sm:gap-[16px] shrink-0"
      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
    >
      <a href="#playground" className="text-black hover:text-[#ff5100] transition-colors text-[13.5px] sm:text-[18.388px] tracking-[-0.5516px] leading-none shrink-0 whitespace-nowrap">Playground</a>
      <p className="text-[#b3b3b3] text-[13.5px] sm:text-[18.388px] tracking-[-0.5516px] leading-none shrink-0 whitespace-nowrap cursor-default">Case Story</p>
    </div>
  );
}

function Logo() {
  return (
    <a
      href="#"
      className="font-bold text-[22px] sm:text-[29.388px] text-black text-center tracking-[-1.1755px] leading-none shrink-0"
      style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
    >
      2x<span className="text-[#ff5100]">.</span>
    </a>
  );
}

function LeftGroup() {
  return (
    <div className="flex flex-1 gap-3 sm:gap-6 md:gap-[48px] lg:gap-[80px] items-center min-w-0">
      <Logo />
      <NavLinks />
    </div>
  );
}

function ContactButton() {
  return (
    <div className="flex flex-col gap-[3px] items-start p-[2px] rounded-[16px] shrink-0">
      <a
        href="mailto:turashahsan8@gmail.com"
        className="bg-[#1a1a1a] hover:bg-black active:scale-95 transition-all flex items-center justify-center px-3 sm:px-[16px] py-1.5 sm:py-[8px] rounded-[9999px] shrink-0 shadow-sm"
      >
        <span
          className="text-white text-[13px] sm:text-[18.388px] tracking-[-0.5516px] leading-none whitespace-nowrap font-medium"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Contact
        </span>
      </a>
    </div>
  );
}

export default function NevDark() {
  return (
    <div
      className="flex items-center justify-between px-3.5 sm:pl-[24px] sm:pr-[8px] py-[6px] sm:py-[8px] rounded-[32px] w-full"
      data-name="nev - dark"
    >
      <LeftGroup />
      <ContactButton />
    </div>
  );
}
