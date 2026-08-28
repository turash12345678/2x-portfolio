function NavLinks() {
  return (
    <div
      className="flex items-center gap-[16px] shrink-0"
      style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
    >
      <p className="text-black text-[18.388px] tracking-[-0.5516px] leading-none shrink-0 whitespace-nowrap">Playground</p>
      <p className="text-[#b3b3b3] text-[18.388px] tracking-[-0.5516px] leading-none shrink-0 whitespace-nowrap">Case Story</p>
    </div>
  );
}

function Logo() {
  return (
    <p
      className="font-bold text-[29.388px] text-black text-center tracking-[-1.1755px] leading-none shrink-0 w-[46px]"
      style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
    >
      2x<span className="text-[#ff5100]">.</span>
    </p>
  );
}

function LeftGroup() {
  return (
    <div className="flex flex-1 gap-[80px] items-center min-w-0">
      <Logo />
      <NavLinks />
    </div>
  );
}

function ContactButton() {
  return (
    <div className="flex flex-col gap-[3px] items-start p-[2px] rounded-[16px] shrink-0">
      <div className="bg-[#1a1a1a] flex items-center justify-center px-[16px] py-[8px] rounded-[9999px] shrink-0">
        <p
          className="text-white text-[18.388px] tracking-[-0.5516px] leading-none whitespace-nowrap"
          style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
        >
          Contact
        </p>
      </div>
    </div>
  );
}

export default function NevDark() {
  return (
    <div
      className="flex items-center justify-between pl-[24px] pr-[8px] py-[8px] rounded-[32px] w-full"
      data-name="nev - dark"
    >
      <LeftGroup />
      <ContactButton />
    </div>
  );
}
