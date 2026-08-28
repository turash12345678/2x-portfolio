function NavLinks() {
  return (
    <div className="flex items-center gap-4" style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}>
      <p className="text-white text-[18px] tracking-[-0.03em] leading-none shrink-0">Playground</p>
      <p className="text-[#b3b3b3] text-[18px] tracking-[-0.03em] leading-none shrink-0">Case Story</p>
    </div>
  );
}

function Logo() {
  return (
    <p
      className="text-white text-[29px] tracking-[-0.04em] leading-none shrink-0 font-bold"
      style={{ fontFamily: "'Inclusive Sans', sans-serif" }}
    >
      2x<span className="text-[#ff5100]">.</span>
    </p>
  );
}

function LeftGroup() {
  return (
    <div className="flex items-center gap-[80px] flex-1 min-w-0">
      <Logo />
      <NavLinks />
    </div>
  );
}

function ContactButton() {
  return (
    <div className="shrink-0 p-[2px] rounded-[16px]">
      <button
        className="bg-white flex items-center justify-center px-4 py-2 rounded-full"
        style={{ fontFamily: "Inter, sans-serif", fontWeight: 500 }}
      >
        <span className="text-[#1a1a1a] text-[18px] tracking-[-0.03em] leading-none whitespace-nowrap">
          Contact
        </span>
      </button>
    </div>
  );
}

export default function NevScrollDown() {
  return (
    <div
      className="flex items-center justify-between pl-6 pr-2 py-2 rounded-[32px] w-full"
      data-name="nev (Scroll down)"
    >
      <LeftGroup />
      <ContactButton />
    </div>
  );
}
