import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

interface CaseStudyProps {
  onBack: () => void;
}

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem & Opportunity" },
  { id: "solution", label: "Solution & Architecture" },
  { id: "audit", label: "Legacy System Audit" },
  { id: "research", label: "Research & Personas" },
  { id: "testing", label: "Testing & Validation" },
  { id: "components", label: "Component Ecosystem" },
  { id: "psychology", label: "Design Psychology" },
  { id: "outcomes", label: "Impact & Reflection" },
];

export default function CaseStudy({ onBack }: CaseStudyProps) {
  const [activeSection, setActiveSection] = useState("overview");

  // Interactive Live Demo States
  const [activeTab, setActiveTab] = useState<"inbox" | "discussion" | "quiz">("inbox");
  const [selectedQuality, setSelectedQuality] = useState<"1080p" | "720p" | "360p" | "Auto">("720p");
  const [showAiAnswer, setShowAiAnswer] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string | null>("B");
  const [timerCount, setTimerCount] = useState(12);
  const [showExitModal, setShowExitModal] = useState(false);
  const [ratingStars, setRatingStars] = useState(4);
  const [activeReaction, setActiveReaction] = useState<"crying" | "thinking" | "smiling" | "beaming">("beaming");

  // Intersection observer to track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-[#32404f]" style={{ fontFamily: "Geist, Inter, sans-serif" }}>
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#fcfcfc]/90 backdrop-blur-md border-b border-[#eef0f2]">
        <div className="max-w-[1352px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[14px] text-[#707070] hover:text-[#1a1a1a] transition-colors font-medium group cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-x-0.5 transition-transform"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
              <span>Back to Portfolio</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-[13px] text-[#999]">
              <span>/</span>
              <span className="font-mono text-[#555] uppercase text-[12px] tracking-wider">
                Case Study
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.figma.com/design/kBvZLppUwO1tbdklBQXikp/10-MS-UI-Design?node-id=0-1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium text-[#555] bg-[#f0f1f3] hover:bg-[#e4e6e9] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 12C6 10.3431 7.34315 9 9 9H12V15H9C7.34315 15 6 13.6569 6 12Z" fill="#0ACF83" />
                <path d="M12 3H9C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9H12V3Z" fill="#F24E1E" />
                <path d="M12 3H15C16.6569 3 18 4.34315 18 6C18 7.65685 16.6569 9 15 9H12V3Z" fill="#FF7262" />
                <path d="M12 9H15C16.6569 9 18 10.3431 18 12C18 13.6569 16.6569 15 15 15H12V9Z" fill="#1ABCFE" />
                <circle cx="9" cy="18" r="3" fill="#A259FF" />
              </svg>
              <span>Figma Source</span>
            </a>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-3 py-1.5 rounded-full text-[13px] font-medium bg-[#1a1a1a] text-white hover:bg-[#333] transition-colors"
            >
              Top
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="max-w-[1352px] mx-auto px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Sticky Sidebar (Desktop) */}
          <aside className="hidden lg:block sticky top-[96px] space-y-8">
            <div>
              <p className="text-[12px] font-mono uppercase tracking-[0.1em] text-[#999] mb-4">
                Contents
              </p>
              <nav className="flex flex-col space-y-1">
                {SECTIONS.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => scrollToSection(sec.id)}
                      className={`text-left text-[14px] py-1.5 px-3 rounded-lg transition-all duration-150 cursor-pointer flex items-center justify-between ${
                        isActive
                          ? "bg-[#1a1a1a] text-white font-medium shadow-sm"
                          : "text-[#666] hover:text-[#1a1a1a] hover:bg-[#f2f3f5]"
                      }`}
                    >
                      <span className="truncate">{sec.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#26c163]" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#eef0f2]">
              <div className="bg-[#f5f6f8] rounded-2xl p-4 space-y-3">
                <p className="text-[11px] font-mono text-[#888] uppercase tracking-wider">
                  Live Classroom Stats
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#666]">Cohort Size</span>
                    <span className="font-semibold text-[#1a1a1a]">1,000+ Students</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#666]">Target Audience</span>
                    <span className="font-semibold text-[#1a1a1a]">Grades 6–12</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#666]">Spam Filter Rate</span>
                    <span className="font-semibold text-[#26c163]">100% Segregated</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-[#666]">Bandwidth Modes</span>
                    <span className="font-semibold text-[#1a1a1a]">1080p to 360p</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Main Content Area */}
          <div className="w-full max-w-[960px] space-y-20">
            
            {/* HERO / SNAPSHOT */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-[13px] md:text-[14px] font-mono uppercase tracking-[0.1em] text-[#ff5100] font-semibold">
                  10 Minute School • Live Class Experience Redesign
                </p>
                <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] font-medium tracking-[-0.03em] leading-[1.1] text-[#111]">
                  10 Minute School: Live Class UI Redesign
                </h1>
              </div>

              <p className="text-[18px] md:text-[20px] text-[#555] leading-relaxed max-w-[840px]">
                Designing a distraction-free, low-bandwidth-resilient live classroom ecosystem for Bangladesh&apos;s largest EdTech platform, separating social chatter from 1-on-1 teacher doubt clearance and empowering rural students on unstable 3G connections.
              </p>

              {/* Project Meta Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#f6f7f9] border border-[#eef0f2]">
                <div>
                  <p className="text-[12px] font-mono text-[#888] uppercase tracking-wider mb-1">Role</p>
                  <p className="text-[15px] font-medium text-[#111]">Product Designer</p>
                </div>
                <div>
                  <p className="text-[12px] font-mono text-[#888] uppercase tracking-wider mb-1">Timeline</p>
                  <p className="text-[15px] font-medium text-[#111]">Jan – Feb 2025</p>
                </div>
                <div>
                  <p className="text-[12px] font-mono text-[#888] uppercase tracking-wider mb-1">Team</p>
                  <p className="text-[15px] font-medium text-[#111]">Solo Product Designer</p>
                </div>
                <div>
                  <p className="text-[12px] font-mono text-[#888] uppercase tracking-wider mb-1">Skills</p>
                  <p className="text-[15px] font-medium text-[#111]">UX Audit, System & AI</p>
                </div>
              </div>

              {/* Interactive Live Classroom Showcase Preview */}
              <div className="rounded-3xl border border-[#e5e7eb] bg-white shadow-xl overflow-hidden">
                <div className="bg-[#18181b] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#27272a]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#fc373e] text-white uppercase tracking-wider animate-pulse">
                      ● LIVE
                    </span>
                    <span className="text-[14px] font-medium truncate">Cardiac Circle — HSC Biology Live</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {/* Quality Pill */}
                    <div className="flex items-center gap-1 bg-[#27272a] px-2.5 py-1 rounded-full text-[12px] font-mono">
                      <span>Quality:</span>
                      <span className="text-[#26c163] font-semibold">{selectedQuality}</span>
                    </div>
                    <span className="text-[12px] text-[#a1a1aa] font-mono hidden sm:inline">00:11:23</span>
                  </div>
                </div>

                {/* Simulated Player Viewport */}
                <div className="relative aspect-video sm:aspect-[21/9] bg-gradient-to-br from-[#09090b] via-[#18181b] to-[#1c1917] flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  {/* Floating Teacher Tag */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-[#ff5100] flex items-center justify-center text-[10px] font-bold">TD</div>
                    <span className="text-[12px] font-medium">Tanmay Dhar (Teacher 1)</span>
                  </div>

                  {/* Player Quick Controls overlay */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    <p className="text-[14px] text-white/80 font-medium">
                      Simulated 10MS Live Stream Canvas
                    </p>
                  </div>

                  {/* Bottom Video HUD */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-[12px]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert("Simulating 5-second rewind buffer (DVR)!")}
                        className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/90 transition-colors flex items-center gap-1"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="1 4 1 10 7 10" />
                          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                        </svg>
                        <span>-5 Sec</span>
                      </button>
                      <button
                        onClick={() => alert("Simulating 5-second forward skip!")}
                        className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/90 transition-colors flex items-center gap-1"
                      >
                        <span>+5 Sec</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="23 4 23 10 17 10" />
                          <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10" />
                        </svg>
                      </button>
                    </div>

                    {/* Manual Quality Switcher */}
                    <div className="flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
                      {(["1080p", "720p", "360p", "Auto"] as const).map((q) => (
                        <button
                          key={q}
                          onClick={() => setSelectedQuality(q)}
                          className={`px-2 py-0.5 rounded-full text-[11px] font-mono transition-all ${
                            selectedQuality === q
                              ? "bg-[#26c163] text-white font-bold"
                              : "text-white/60 hover:text-white"
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3-Tab Classroom Experience Console */}
                <div className="p-4 sm:p-6 bg-[#fafafa] border-t border-[#eef0f2]">
                  {/* Tab Selector */}
                  <div className="flex items-center gap-2 mb-4 bg-[#eceef1] p-1 rounded-xl max-w-fit">
                    <button
                      onClick={() => setActiveTab("inbox")}
                      className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer flex items-center gap-2 ${
                        activeTab === "inbox"
                          ? "bg-white text-[#111] shadow-sm font-semibold"
                          : "text-[#666] hover:text-[#111]"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#26c163]" />
                      <span>Teacher Inbox (1-to-1)</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("discussion")}
                      className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                        activeTab === "discussion"
                          ? "bg-white text-[#111] shadow-sm font-semibold"
                          : "text-[#666] hover:text-[#111]"
                      }`}
                    >
                      Discussion Box (Public)
                    </button>
                    <button
                      onClick={() => setActiveTab("quiz")}
                      className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all cursor-pointer ${
                        activeTab === "quiz"
                          ? "bg-white text-[#111] shadow-sm font-semibold"
                          : "text-[#666] hover:text-[#111]"
                      }`}
                    >
                      Quiz & Polls
                    </button>
                  </div>

                  {/* Tab Content Display */}
                  <div className="bg-white rounded-2xl p-5 border border-[#e5e7eb] min-h-[220px]">
                    {activeTab === "inbox" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
                          <div className="flex items-center gap-2">
                            <span className="text-[12px] font-mono text-[#888]">Private Channel</span>
                            <span className="px-2 py-0.5 rounded text-[11px] bg-blue-50 text-blue-700 font-medium">
                              Teacher 2 Assigned
                            </span>
                          </div>
                          <button
                            onClick={() => setShowAiAnswer(!showAiAnswer)}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
                          >
                            <span>✨ Ask AI (GPT-4.0)</span>
                            <span className="text-[10px] font-mono">{showAiAnswer ? "ON" : "OFF"}</span>
                          </button>
                        </div>

                        {/* Thread Messages */}
                        <div className="space-y-3">
                          <div className="flex flex-col items-end">
                            <div className="bg-[#1a1a1a] text-white text-[14px] px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%]">
                              Vaiya, Cardiac Circle er ventricular systole er shomoy semilunar valve ki open thake?
                            </div>
                            <span className="text-[11px] text-[#999] mt-1">You • 00:11:15</span>
                          </div>

                          {showAiAnswer && (
                            <div className="flex flex-col items-start">
                              <div className="bg-[#f0fdf4] border border-[#bcf6d2] text-[#14532d] text-[13px] px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] space-y-1 shadow-sm">
                                <div className="flex items-center gap-1.5 font-bold text-[12px] text-[#166534]">
                                  <span>🤖 10MS Copilot (Verified by Teacher 2):</span>
                                </div>
                                <p>
                                  Haa! Ventricular systole er second phase (period of ejection) e ventricles er pressure aorta theke beshi hole semilunar valves open hoye blood body te chole jay.
                                </p>
                              </div>
                              <span className="text-[11px] text-[#999] mt-1">AI Instant Assistant • Verified</span>
                            </div>
                          )}
                        </div>

                        {/* Input Box Simulation */}
                        <div className="flex items-center gap-2 pt-3 border-t border-[#f0f0f0]">
                          <div className="flex items-center gap-1 text-[#888]">
                            <button title="Take Photo" className="p-2 hover:bg-[#f2f2f2] rounded-lg">
                              📷
                            </button>
                            <button title="Upload from Gallery" className="p-2 hover:bg-[#f2f2f2] rounded-lg">
                              🖼️
                            </button>
                            <button title="Use Drive" className="p-2 hover:bg-[#f2f2f2] rounded-lg">
                              ☁️
                            </button>
                          </div>
                          <input
                            type="text"
                            readOnly
                            value="Ask Teacher 2 your private doubt or attach your math problem photo..."
                            className="flex-1 bg-[#f7f8f9] text-[#777] text-[13px] px-4 py-2.5 rounded-xl border border-[#e5e7eb] outline-none"
                          />
                          <button className="px-4 py-2.5 rounded-xl bg-[#26c163] text-white text-[13px] font-semibold hover:bg-[#20a353] transition-colors">
                            Send
                          </button>
                        </div>
                      </div>
                    )}

                    {activeTab === "discussion" && (
                      <div className="space-y-3">
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[12px] text-amber-900 flex items-center justify-between">
                          <span>🎉 Public Classroom Chat — Keep cheers & encouragement here!</span>
                          <span className="text-[11px] font-mono text-amber-700">1,248 Active</span>
                        </div>
                        <div className="space-y-2 max-h-[140px] overflow-y-auto pr-2">
                          <div className="text-[13px] bg-[#f9fafb] p-2.5 rounded-lg border border-[#f0f0f0]">
                            <span className="font-bold text-[#111]">Fahim: </span>
                            <span className="text-[#555]">How is the josss !! 🔥</span>
                          </div>
                          <div className="text-[13px] bg-[#f9fafb] p-2.5 rounded-lg border border-[#f0f0f0]">
                            <span className="font-bold text-[#111]">Sumaiya: </span>
                            <span className="text-[#555]">Vaiya... Ektu side e jan... Screen Dekha jay na 🙏</span>
                          </div>
                          <div className="text-[13px] bg-[#f9fafb] p-2.5 rounded-lg border border-[#f0f0f0]">
                            <span className="font-bold text-[#111]">Rafi: </span>
                            <span className="text-[#555]">5 no. line ta bujhi nai, teacher inbox e photo disi check koren!</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "quiz" && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[11px] font-mono uppercase tracking-wider text-[#ff5100] font-bold">
                              Live Question #03
                            </span>
                            <h4 className="text-[15px] font-medium text-[#111] mt-0.5">
                              Which node triggers electrical impulses in the human cardiac cycle?
                            </h4>
                          </div>
                          {/* 12-state countdown indicator */}
                          <div className="flex items-center gap-2 bg-[#f0f1f3] px-3 py-1.5 rounded-full">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                            <span className="font-mono text-[13px] font-bold text-[#111]">{timerCount}s</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                          {[
                            { label: "A", text: "AV Node" },
                            { label: "B", text: "SA Node (Pace Maker)" },
                            { label: "C", text: "Bundle of His" },
                            { label: "D", text: "Purkinje Fibers" },
                          ].map((opt) => (
                            <button
                              key={opt.label}
                              onClick={() => setSelectedOption(opt.label)}
                              className={`p-3 rounded-xl border text-left text-[13px] transition-all flex items-center gap-3 cursor-pointer ${
                                selectedOption === opt.label
                                  ? "border-[#26c163] bg-[#f0fdf4] text-[#166534] font-semibold ring-2 ring-[#26c163]/20"
                                  : "border-[#e5e7eb] hover:bg-[#f9fafb] text-[#333]"
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[12px] ${
                                  selectedOption === opt.label
                                    ? "bg-[#26c163] text-white"
                                    : "bg-[#eceef1] text-[#666]"
                                }`}
                              >
                                {opt.label}
                              </span>
                              <span>{opt.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 01. OVERVIEW */}
            <section id="overview" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">Overview</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  Reimagining Bangladesh&apos;s largest live classroom experience.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                10 Minute School is Bangladesh&apos;s leading EdTech platform, hosting thousands of students daily in live interactive classes for grades 6 to 12. Operating under a unique &ldquo;Two-Teacher&rdquo; architecture—where Teacher 1 presents the live lecture on stream while Teacher 2 resolves student queries in real time—the live classroom faced massive cognitive and technical bottlenecks as active cohort volumes surged.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <h3 className="text-[17px] font-medium text-[#111]">The 2-Teacher Model</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Teacher 1 delivers the whiteboard lecture on camera; Teacher 2 operates in the chat backend to resolve doubts live.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <h3 className="text-[17px] font-medium text-[#111]">Cognitive Pollution</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Over 1,000 students in a single unmoderated chat feed flooded the stream with spam, burying genuine academic questions.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <h3 className="text-[17px] font-medium text-[#111]">Bandwidth Disparity</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Rural students on fluctuating 3G had no manual resolution controls, causing unrecoverable buffering and lost concepts.
                  </p>
                </div>
              </div>
            </section>

            {/* 02. PROBLEM & OPPORTUNITY */}
            <section id="problem" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">Problem & Opportunity</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  When chat spam buries doubts & buffering breaks learning.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                In live education, cognitive continuity is everything. If a student misses 15 seconds of a physics formula derivation, the remaining hour of lecture becomes incomprehensible. In the existing 10MS mobile classroom, two systemic friction points broke this continuity daily.
              </p>
              <p className="text-[17px] text-[#555] leading-relaxed">
                First, the discussion box became an uncontrollable river of greetings, emojis, and memes. Teacher 2 suffered cognitive overload trying to hunt down genuine questions before the teacher transitioned topics, leaving introverted students demoralized and unattended. Second, without manual video downscaling (1080p to 360p), students outside major metropolitan zones faced constant frame drops, forcing them to wait up to 24 hours for the post-class archive.
              </p>

              {/* Opportunity Card */}
              <div className="p-6 rounded-2xl bg-[#f0fdf4] border border-[#bcf6d2] space-y-4">
                <div className="flex items-center gap-2 text-[#166534] font-semibold text-[15px]">
                  <span>🎯 The Design Challenge: How Might We</span>
                </div>
                <p className="text-[16px] text-[#14532d] leading-relaxed">
                  How might we design a live classroom environment that separates social camaraderie from academic rigor, accelerates Teacher 2 response time with AI, and guarantees streaming continuity even in low-bandwidth rural conditions?
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="bg-white/80 p-4 rounded-xl border border-[#bcf6d2]">
                    <h4 className="font-semibold text-[#111] text-[14px]">Cognitive Segregation</h4>
                    <p className="text-[13px] text-[#555] mt-1">
                      Separating private 1-on-1 teacher inquiries from public community discussion.
                    </p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-xl border border-[#bcf6d2]">
                    <h4 className="font-semibold text-[#111] text-[14px]">Bandwidth Autonomy</h4>
                    <p className="text-[13px] text-[#555] mt-1">
                      Manual 360p downscaling and a 5-second quick seek buffer for instant catch-up.
                    </p>
                  </div>
                  <div className="bg-white/80 p-4 rounded-xl border border-[#bcf6d2]">
                    <h4 className="font-semibold text-[#111] text-[14px]">In-Stream AI Copilot</h4>
                    <p className="text-[13px] text-[#555] mt-1">
                      Empowering Teacher 2 and students with GPT-4.0 instant conceptual guidance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 03. SOLUTION & CORE FLOWS */}
            <section id="solution" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">Solution Architecture</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  A tabbed, resilient ecosystem for 10MS Live.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                Rather than trying to patch an unmoderated single chat feed, the redesign reimagined the entire classroom mental model into three purpose-built cognitive spaces, backed by dynamic bandwidth controls:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-[16px]">
                    01
                  </div>
                  <h3 className="text-[18px] font-medium text-[#111]">1. Teacher Inbox</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    A dedicated 1-on-1 private channel between student and Teacher 2. Features photo attachment for math problems and an instant &ldquo;Ask AI&rdquo; copilot powered by GPT-4.0.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-[16px]">
                    02
                  </div>
                  <h3 className="text-[18px] font-medium text-[#111]">2. Discussion Box</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    A sandboxed social camaraderie feed where students share vibes (&ldquo;How is the josss !!&rdquo;) without polluting academic question queues or causing peer distraction.
                  </p>
                </div>
                <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-[16px]">
                    03
                  </div>
                  <h3 className="text-[18px] font-medium text-[#111]">3. Interactive Quiz & HUD</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Non-intrusive docked quiz overlays with a 12-state countdown timer ring, instant feedback, and a manual 1080p–360p video quality switcher with 5s DVR rewind.
                  </p>
                </div>
              </div>
            </section>

            {/* 04. LEGACY AUDIT */}
            <section id="audit" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">Evidence</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  Unpacking the flaws: 19 scanned audit sheets.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                In February 2025, a comprehensive physical and digital audit of the live classroom was conducted across 19 evaluation sheets (Scanned_20250213-1844-01 to 19). The analysis revealed 5 critical operational failure points in the legacy experience:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <div className="text-[12px] font-mono text-red-600 font-semibold uppercase">Friction #1</div>
                  <h3 className="text-[16px] font-medium text-[#111]">Lost Doubts & Noise</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    &ldquo;Students don&apos;t share important messages, and their questions often go unnoticed by the teacher&rdquo; — academic inquiries were buried under a flood of 1,000+ social chats.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <div className="text-[12px] font-mono text-red-600 font-semibold uppercase">Friction #2</div>
                  <h3 className="text-[16px] font-medium text-[#111]">Input Limitations</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    &ldquo;Upload file using drive or drag file&rdquo; — students couldn&apos;t snap and upload handwritten math derivations, forcing them to painfully type equations into plain text.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <div className="text-[12px] font-mono text-red-600 font-semibold uppercase">Friction #3</div>
                  <h3 className="text-[16px] font-medium text-[#111]">Disruptive Overlays</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    &ldquo;User need this poll option on the right panel&rdquo; — legacy quiz overlays blocked the teacher&apos;s whiteboard notes, interrupting lecture comprehension.
                  </p>
                </div>
              </div>
            </section>

            {/* 05. BEHAVIORAL RESEARCH & PERSONAS */}
            <section id="research" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">User Research</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  The behavioral dichotomy: Introverted focus vs. Rural bandwidth.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                In-depth student interviews revealed that 10 Minute School&apos;s student base is polarized into two primary behavioral archetypes, both failing under the legacy classroom system for opposing reasons:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono uppercase px-2.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                      Persona A • The Introverted Achiever
                    </span>
                    <span className="text-[12px] text-[#888]">Chittagong</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-medium text-[#111]">Prothom Das Turjo (17)</h3>
                    <p className="text-[13px] text-[#777] italic mt-0.5">&ldquo;Accept me as I am.&rdquo;</p>
                  </div>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    ICT Class Captain at Islamia Degree College. Serious, structured, and gets mentally exhausted by spam floods. Hesitated to ask questions in public chat for fear of peer trolling or mocking.
                  </p>
                  <div className="p-3 bg-[#f8f9fa] rounded-xl text-[13px] text-[#333]">
                    <strong className="text-[#111]">Core Requirement:</strong> A distraction-free, 1-on-1 private channel with Teacher 2 where his academic doubts receive quiet, focused resolution.
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono uppercase px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                      Persona B • The Rural Ambition
                    </span>
                    <span className="text-[12px] text-[#888]">Tangail</span>
                  </div>
                  <div>
                    <h3 className="text-[20px] font-medium text-[#111]">Zayed Bin Aslam (17)</h3>
                    <p className="text-[13px] text-[#777] italic mt-0.5">&ldquo;I like to do crazy things.&rdquo;</p>
                  </div>
                  <p className="text-[14px] text-[#555] leading-relaxed">
                    Ambitious self-starter and aspiring astronomer commuting frequently. Lives in an area with fluctuating 3G coverage; streams constantly buffer and freeze, causing him to lose key derivations.
                  </p>
                  <div className="p-3 bg-[#f8f9fa] rounded-xl text-[13px] text-[#333]">
                    <strong className="text-[#111]">Core Requirement:</strong> Manual 360p downscaling to maintain live audio/video flow on weak networks + 5s DVR rewind to instantly replay missed steps.
                  </div>
                </div>
              </div>
            </section>

            {/* 06. PROTOTYPING & A/B VALIDATION */}
            <section id="testing" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">Validation</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  Testing with students: Why Layout B achieved consensus.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                We evaluated two divergent architectural layouts via interactive Figma prototypes and live student testing (Google Forms: forms.gle/gRCSTxTYGcYm83qQ9).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#e5e7eb] space-y-3 opacity-75">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono uppercase px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">
                      Layout A • Single Feed with Filters
                    </span>
                    <span className="text-red-500 font-bold text-[13px]">Rejected</span>
                  </div>
                  <h3 className="text-[17px] font-medium text-[#111]">Toggle Pills on Stream</h3>
                  <p className="text-[14px] text-[#666] leading-relaxed">
                    Attempted to keep chat in one container with filter pills. Students found switching tabs inside an active, scrolling feed disorienting and prone to misclicks during rapid live lectures.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#f0fdf4] border border-[#bcf6d2] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                      Layout B • 3-Tab Model
                    </span>
                    <span className="text-emerald-600 font-bold text-[13px]">Consensus Winner</span>
                  </div>
                  <h3 className="text-[17px] font-medium text-[#111]">Physical Cognitive Separation</h3>
                  <p className="text-[14px] text-[#14532d] leading-relaxed">
                    &ldquo;Minimal cognitive load, similar pattern, intuitive interaction.&rdquo; Clear physical separation between Teacher Inbox, Discussion Box, and Quiz allowed zero cross-contamination of thoughts.
                  </p>
                </div>
              </div>
            </section>

            {/* 07. COMPONENT ECOSYSTEM */}
            <section id="components" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">Design System</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  Precision engineering for high-speed live classrooms.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                Every interactive component was stress-tested for single-thumb mobile accessibility, rapid response, and cognitive clarity under live streaming pressure:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <h3 className="text-[16px] font-medium text-[#111]">12-State SVG Quiz Timer</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    A circular countdown ring with 12 discrete temporal states, giving students clear urgency without aggressive blinking animations that distract from the question.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <h3 className="text-[16px] font-medium text-[#111]">Rich Problem Attachment</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    Direct media integration (Camera capture, Gallery picker, Google Drive) allowing students to instantly snap handwritten equations and attach them to Teacher 2.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <h3 className="text-[16px] font-medium text-[#111]">Exit Nudge & 5-Star Rating</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    A retention modal with &lsquo;Take a break&rsquo; mode to prevent impulsive rage-quits, followed by post-class 5-star sentiment capture with dynamic emoji states (crying to beaming).
                  </p>
                </div>
              </div>
            </section>

            {/* 08. DESIGN PSYCHOLOGY */}
            <section id="psychology" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">Visual Rationale</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  Color psychology: Why button color is green.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                Educational interfaces frequently suffer from alarm fatigue. In our design system, every token is rooted in cognitive psychology and cross-platform ergonomics:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#26c163] shadow-sm" />
                  <h3 className="text-[16px] font-medium text-[#111]">Primary Green (#26c163)</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    Green evokes psychological safety, growth, and forward momentum in Bangladeshi academic culture. Unlike test-red or corporate-blue, it encourages students to participate without stress.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#fc373e] shadow-sm" />
                  <h3 className="text-[16px] font-medium text-[#111]">Strict Red (#fc373e)</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    Red is reserved exclusively for the &lsquo;LIVE&rsquo; broadcast indicator and irreversible exit actions, ensuring maximum visual contrast and intentional friction.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#111828] shadow-sm" />
                  <h3 className="text-[16px] font-medium text-[#111]">Cross-Platform Parity</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    Tokenized layouts engineered simultaneously for Android Compact (412×917) and iPhone (393×852), honoring native status bars, touch targets, and keyboard transitions.
                  </p>
                </div>
              </div>
            </section>

            {/* 09. OUTCOMES & REFLECTION */}
            <section id="outcomes" className="space-y-6 pt-8 border-t border-[#eef0f2]">
              <div className="space-y-2">
                <p className="text-[13px] font-mono uppercase tracking-[0.1em] text-[#888]">Impact & Reflection</p>
                <h2 className="text-[28px] sm:text-[34px] font-medium tracking-[-0.02em] text-[#111]">
                  Designing for real-world constraints at scale.
                </h2>
              </div>
              <p className="text-[17px] text-[#555] leading-relaxed">
                Designing for emerging market EdTech taught a fundamental lesson: true product quality is not defined by desktop animations, but by how well an interface respects a student&apos;s unstable 3G bandwidth, low-end phone processor, and emotional vulnerability when asking for help in a crowded room.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <div className="text-[24px] font-bold text-[#26c163]">~70%</div>
                  <h3 className="text-[16px] font-medium text-[#111]">Teacher 2 Latency Cut</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    Separating academic doubts from peer banter and embedding GPT-4.0 Ask AI reduces average doubt turnaround from minutes to seconds during live classes.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <div className="text-[24px] font-bold text-[#26c163]">100%</div>
                  <h3 className="text-[16px] font-medium text-[#111]">Spam-Free Doubts</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    Private 1-on-1 Teacher Inbox completely eliminates troll comments, giving introverted students like Turjo the confidence to ask questions freely.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#e5e7eb] space-y-2">
                  <div className="text-[24px] font-bold text-[#26c163]">360p</div>
                  <h3 className="text-[16px] font-medium text-[#111]">Bandwidth Continuity</h3>
                  <p className="text-[13px] text-[#666] leading-relaxed">
                    Manual 360p downscaling and 5s DVR rewind democratize access for rural students like Zayed, preventing unrecoverable lecture dropouts.
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#eef0f2]">
                <button
                  onClick={onBack}
                  className="px-6 py-3 rounded-full text-[14px] font-medium bg-[#1a1a1a] text-white hover:bg-[#333] transition-colors cursor-pointer"
                >
                  ← Back to Portfolio Overview
                </button>

                <a
                  href="https://www.figma.com/design/q4D57eROLsfR2CSz3IlOD5/2x-%E2%9C%A6-Portfolio?node-id=381-64"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-medium text-[#555] hover:text-[#111] underline transition-colors"
                >
                  View Canvas in Figma (Desktop - 7) ↗
                </a>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}
