import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { animate, stagger } from "animejs";
import DotGrid from "@/components/DotGrid/DotGrid";
import VideoCard from "@/components/VideoCard/VideoCard";
import VideoLightboxModal from "@/components/VideoLightbox/VideoLightboxModal";
import Component from "@/imports/Component1/index";
import Component1_1 from "@/imports/Component1-1/index";
import Dashboard, { type SiteContent } from "@/pages/Dashboard";
import { getCachedContent, fetchGlobalContent, saveGlobalContent } from "@/services/db";
import svgPaths from "@/imports/Desktop3/svg-kyk0s1v2sg";
import imgAvatar from "@/imports/Desktop3/72045e7df721190a6b214bc6d3bf1f20b56300de.png";
import imgVideoThumb from "@/imports/Desktop3/749cd5750ae3155ad330123057def42bde6aceee.png";
import imgVideoThumb2 from "@/imports/Desktop3/9404713afb5bab1fa0aba27e8f5b6f787f9f0da9.png";

const ACCESS_KEY = "200836";

const VIDEO_IMAGES = [imgVideoThumb, imgVideoThumb, imgVideoThumb, imgVideoThumb2];

function parseBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold text-[#1a1a1a]">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

type Tab = "shorts" | "tweets";

function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16.2 16.2" fill="none">
      <path d={svgPaths.p33ab300} stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16.2 16.2" fill="none">
      <path d={svgPaths.p2719280} stroke="#666" strokeWidth="1.5" strokeLinejoin="round" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}
function WhatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16.2 16.2" fill="none">
      <path d={svgPaths.p24d3c580} fill="#666" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16.2 16.2" fill="none">
      <path d={svgPaths.paaa1480} stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p1df18d80} stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p15ecbbc0} stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16.2 16.2" fill="none">
      <path d={svgPaths.p22826680} stroke="#666" strokeWidth="1.5" />
      <path d={svgPaths.p2efeb870} stroke="#666" strokeWidth="1.5" />
      <path d={svgPaths.p8f88d00} stroke="#666" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export default function App() {
  // Synchronous state initialization from local cache for instant render on reload
  const [content, setContent] = useState<SiteContent>(getCachedContent);
  const [page, setPage] = useState<"home" | "dashboard">("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("shorts");
  const [scrolled, setScrolled] = useState(false);
  const [filterTooltip, setFilterTooltip] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lenis Smooth Scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // Anime.js smooth text reveal animation on load
  useEffect(() => {
    if (page !== "home") return;
    try {
      animate(".anime-reveal", {
        translateY: [28, 0],
        opacity: [0, 1],
        ease: "outExpo",
        duration: 1100,
        delay: stagger(130, { start: 150 }),
      });
    } catch (err) {
      console.warn("Anime.js reveal error:", err);
    }
  }, [page]);

  useEffect(() => {
    fetchGlobalContent().then((data) => {
      if (data) setContent(data);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSaveContent = async (updated: SiteContent) => {
    setContent(updated);
    await saveGlobalContent(updated);
  };

  const handlePinSubmit = () => {
    if (pin === ACCESS_KEY) {
      setIsAuthenticated(true);
      setShowPinModal(false);
      setPin("");
      setPage("dashboard");
    } else {
      setPinError(true);
      setPin("");
      setTimeout(() => setPinError(false), 600);
    }
  };

  // Sort videos: Pinned shorts first, then order of addition (recent first)
  const displayVideos = [...content.videos].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  if (page === "dashboard") {
    return (
      <Dashboard
        content={content}
        onSave={handleSaveContent}
        onExit={() => setPage("home")}
      />
    );
  }

  return (
    <div className="min-h-full bg-[#fefefe]" style={{ fontFamily: "Inter, sans-serif" }}>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
        <Component1_1 />
      </div>

      {/* Desktop nav */}
      <div className="hidden md:block">
        <AnimatePresence mode="sync">
          {!scrolled ? (
            <motion.div
              key="nav-top"
              initial={{ opacity: 0, y: -24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ type: "spring", stiffness: 420, damping: 38 }}
              className="fixed top-0 left-0 right-0 z-50"
            >
              <Component property1="nev - dark" className="w-full h-[56px] relative top-[14px]" />
            </motion.div>
          ) : (
            <motion.div
              key="nav-pill"
              initial={{ opacity: 0, y: 48, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 48, x: "-50%" }}
              transition={{ type: "spring", stiffness: 380, damping: 34, mass: 0.85 }}
              className="fixed bottom-6 left-1/2 z-50"
            >
              <Component property1="nev (Scroll down)" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hero */}
      <section className="relative pt-[64px] flex items-center justify-center overflow-hidden min-h-[520px] md:min-h-[680px]">
        <div className="absolute inset-0">
          <DotGrid
            dotSize={4} gap={10} baseColor="#fbfbfb" activeColor="#a29eb3"
            proximity={150} speedTrigger={170} shockRadius={500}
            shockStrength={3} maxSpeed={2500} resistance={1550} returnDuration={1.8}
          />
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 65% at 50% 50%, rgba(254,254,254,0.82) 0%, rgba(254,254,254,0.55) 40%, rgba(254,254,254,0.15) 70%, rgba(254,254,254,0) 100%)" }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-[42px] pb-[42px] md:pt-20 md:pb-20 w-full max-w-[640px] mx-auto gap-x-[28px] gap-y-[23px] md:gap-10">

          {/* Avatar — click to open PIN modal */}
          <div className="flex flex-col items-center gap-[10px] anime-reveal">
            <div className="relative">
              <button
                onClick={() => { setShowPinModal(true); setPinError(false); setPin(""); }}
                className="block rounded-[12px] md:rounded-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff5100]/50"
                title="Admin access"
              >
                <div className="size-[68px] md:size-[80px] rounded-[12px] md:rounded-[14px] border-2 border-[#f0f1f3] overflow-hidden bg-[#f5f5f5] shadow-sm">
                  <img src={imgAvatar} alt={content.name} className="w-full h-full object-cover" />
                </div>
              </button>
              <div className="absolute top-[8px] right-[-4px] rotate-[-17deg] opacity-60 pointer-events-none">
                <svg width="4" height="4" viewBox="0 0 3 3" fill="none">
                  <path d={svgPaths.p33e55500} fill="#FF5100" />
                </svg>
              </div>
              <div className="absolute top-[-2px] right-[-10px] rotate-[-17deg] opacity-33 pointer-events-none">
                <svg width="2.5" height="2.5" viewBox="0 0 2 2" fill="none">
                  <path d={svgPaths.p3252c080} fill="#FF5100" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col items-center gap-x-[8px] gap-y-[4px]">
              <h1 className="font-semibold text-[28px] md:text-[32px] text-black tracking-[-0.02em] leading-tight">
                {content.name}
              </h1>
              <p className="text-[14px] text-[#b3b3b3] tracking-[-0.03em]">
                {content.jobTitle}
              </p>
            </div>
          </div>

          {/* Bio — Anime.js text reveal */}
          <div className="flex flex-col gap-2 text-[#808080] text-[13px] md:text-[16px] tracking-[-0.01em] leading-[1.8] anime-reveal">
            <p>{parseBold(content.bio1)}</p>
            <p>{parseBold(content.bio2)}</p>
          </div>

          {/* Social links — Anime.js reveal */}
          <div className="flex flex-col items-center gap-3 anime-reveal">
            <div className="flex items-center gap-[10px]">
              <a href="#" className="text-[#666] hover:text-[#1a1a1a] transition-colors p-2"><TwitterIcon /></a>
              <a href="#" className="text-[#666] hover:text-[#1a1a1a] transition-colors p-2"><FacebookIcon /></a>
              <a href="#" className="text-[#666] hover:text-[#1a1a1a] transition-colors p-2"><WhatsappIcon /></a>
              <a href="#" className="text-[#666] hover:text-[#1a1a1a] transition-colors p-2"><InstagramIcon /></a>
              <a href="#" className="text-[#666] hover:text-[#1a1a1a] transition-colors p-2"><LinkedinIcon /></a>
            </div>
            <p className="text-[12px] text-[#999] tracking-[-0.03em]">Follow me</p>
          </div>
        </div>
      </section>

      {/* Cards section */}
      <section className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-11 pb-16 md:pb-24">
        <div className="flex items-center justify-between mb-5 md:mb-7 anime-reveal">
          <div className="bg-[rgba(132,132,132,0.08)] p-1 rounded-full flex items-center gap-0.5">
            <button
              onClick={() => setActiveTab("shorts")}
              className={`px-3.5 py-[5px] rounded-full text-[14px] font-medium tracking-[0.2px] transition-all duration-150 leading-5 capitalize ${
                activeTab === "shorts" ? "bg-[#1a1a1a] text-white shadow-sm" : "text-[#707070] hover:text-black"
              }`}
            >
              Shorts
            </button>
            <button
              disabled
              title="Tweets UI under development"
              className="px-3.5 py-[5px] rounded-full text-[14px] font-medium tracking-[0.2px] leading-5 text-[#b0b0b0] opacity-50 cursor-not-allowed"
            >
              Tweets (Soon)
            </button>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setFilterTooltip(true)}
            onMouseLeave={() => setFilterTooltip(false)}
          >
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[#666] hover:bg-[#f0f0f0] transition-colors">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M1 6H9" stroke="#666" strokeWidth="2" />
                <path d={svgPaths.pc375a00} stroke="#666" strokeWidth="2" strokeLinecap="round" />
                <path d="M19 14H11" stroke="#666" strokeWidth="2" />
                <path d={svgPaths.p2ed18300} stroke="#666" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[15px] text-[#666] tracking-[0.2px]">Filter</span>
            </button>
            <div
              className={`absolute right-0 top-[calc(100%+8px)] transition-all duration-200 pointer-events-none ${
                filterTooltip ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
              }`}
            >
              <div className="bg-[#1a1a1a] text-white rounded-[12px] px-4 py-2.5 whitespace-nowrap shadow-lg">
                <p className="text-[13px] tracking-[-0.02em]" style={{ fontWeight: 400 }}>
                  Not a lot of stuff to filter here 😁
                </p>
              </div>
              <div className="absolute right-4 bottom-full w-0 h-0" style={{ borderLeft: "6px solid transparent", borderRight: "6px solid transparent", borderBottom: "6px solid #1a1a1a" }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {displayVideos.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <VideoCard
                title={v.title}
                status={v.status}
                image={v.thumbnail || VIDEO_IMAGES[i % VIDEO_IMAGES.length]}
                backlink={v.backlink || undefined}
                streamUrl={v.streamUrl || v.localVideoUrl || undefined}
                loadable={isAuthenticated}
                onExpand={() => setLightboxIndex(i)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pop-up Video Lightbox Modal with side navigation arrows */}
      <VideoLightboxModal
        isOpen={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        videos={displayVideos}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      {/* PIN Modal */}
      <AnimatePresence>
        {showPinModal && (
          <motion.div
            key="pin-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-5"
            style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)" }}
            onClick={(e) => { if (e.target === e.currentTarget) { setShowPinModal(false); setPin(""); } }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={pinError ? { x: [0, -10, 10, -10, 10, 0] } : { opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={pinError ? { duration: 0.38 } : { type: "spring", stiffness: 400, damping: 30 }}
              className="bg-white rounded-[24px] p-8 w-full max-w-[360px] flex flex-col items-center gap-6 shadow-2xl"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {/* Lock icon */}
              <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center transition-colors ${pinError ? "bg-red-50" : "bg-[#f5f5f5]"}`}>
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="3" y="10" width="16" height="11" rx="3" stroke={pinError ? "#ef4444" : "#1a1a1a"} strokeWidth="1.6" />
                  <path d="M7 10V7a4 4 0 0 1 8 0v3" stroke={pinError ? "#ef4444" : "#1a1a1a"} strokeWidth="1.6" strokeLinecap="round" />
                  <circle cx="11" cy="15.5" r="1.5" fill={pinError ? "#ef4444" : "#1a1a1a"} />
                </svg>
              </div>

              <div className="flex flex-col items-center gap-1.5 text-center">
                <h3 className="font-bold text-[18px] text-[#1a1a1a] tracking-[-0.02em]">Admin Access</h3>
                <p className="text-[13px] text-[#888] tracking-[-0.01em]">Enter key to open Content Studio</p>
              </div>

              <div className="w-full flex flex-col gap-2">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                  onKeyDown={(e) => { if (e.key === "Enter") handlePinSubmit(); }}
                  placeholder="Enter access PIN"
                  className={`w-full text-center text-[18px] font-mono tracking-[0.3em] px-4 py-3 rounded-[12px] bg-[#f5f5f5] border outline-none transition-colors ${
                    pinError ? "border-red-400 bg-red-50/50" : "border-[#e0e0e0] focus:border-[#1a1a1a]"
                  }`}
                  autoFocus
                />
                {pinError && (
                  <p className="text-[12px] text-red-500 text-center font-medium tracking-[-0.01em]">
                    Incorrect PIN
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 w-full">
                <button
                  onClick={() => { setShowPinModal(false); setPin(""); setPinError(false); }}
                  className="flex-1 py-2.5 rounded-[12px] text-[13px] text-[#666] bg-[#f0f0f0] hover:bg-[#e4e4e4] transition-colors font-medium tracking-[-0.01em]"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePinSubmit}
                  className="flex-1 py-2.5 rounded-[12px] text-[13px] text-white bg-[#1a1a1a] hover:bg-[#333] transition-colors font-medium tracking-[-0.01em]"
                >
                  Unlock
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
