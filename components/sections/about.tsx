"use client";

import Link from "next/link";
import { ScrollExpand } from "@/components/ui/scroll-expand";
import { siteData } from "@/lib/data";
import { ArrowRight, Check } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";
import { useState, useEffect } from "react";

export function AboutStudio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="about" className="relative w-full bg-background">
      <section
        className="relative w-full overflow-hidden shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.15),0_-15px_30px_-10px_rgba(197,168,128,0.02)] dark:shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.9),0_-15px_30px_-10px_rgba(197,168,128,0.06)] border-t border-border"
      >
      <ScrollExpand
        src="/mp4/DJI_0094_optimized.mp4"
        mediaType="video"
        poster="/drone/imgi_6_2.jpg"
        alt="Saskatoon Wedding Cinema — Msfilms Studio"
        title="MSFILMS"
        scrollHint="SCROLL TO DISCOVER"
        useWindowScroll={true}
        maskType="feathered-circle"
        startRadiusVmax={isMobile ? 10 : 6}
        endRadiusVmax={isMobile ? 85 : 75}
        featherVmax={isMobile ? 8 : 10}
        showArrows={false}
        mediaZoom={1.22}
        scrollDistance={2.0}
        holdDistance={0.5}
        smoothing={1.2}
        overlayScrim={0.88}
      >
        <div className="max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center justify-center h-full">
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold mb-3 font-semibold">
            The Studio
          </span>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-4 sm:mb-6 max-w-2xl font-normal text-white">
            Crafting Memories That Last a Lifetime
          </h2>
          <p className="font-sans text-[11px] sm:text-xs md:text-sm text-white/70 max-w-xl leading-relaxed mb-6 sm:mb-8">
            {siteData.aboutText}
          </p>

          <div className="hidden sm:grid grid-cols-3 gap-5 max-w-3xl w-full text-left border-t border-white/10 pt-8 mb-10 font-sans">
            <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
              <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                <Check size={11} strokeWidth={3.5} />
              </div>
              <span className="text-[10px] md:text-[11px] text-white/80 tracking-[0.15em] uppercase font-semibold">Cinematic Storytelling</span>
            </div>
            <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
              <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                <Check size={11} strokeWidth={3.5} />
              </div>
              <span className="text-[10px] md:text-[11px] text-white/80 tracking-[0.15em] uppercase font-semibold">Aerial Drone Coverage</span>
            </div>
            <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
              <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                <Check size={11} strokeWidth={3.5} />
              </div>
              <span className="text-[10px] md:text-[11px] text-white/80 tracking-[0.15em] uppercase font-semibold">Client-Centric Vibe</span>
            </div>
          </div>

          <div className="relative shrink-0">
            <BorderGlow
              edgeSensitivity={20}
              glowColor="35 85 75"
              backgroundColor="transparent"
              borderRadius={9999}
              glowRadius={30}
              glowIntensity={0.3}
              coneSpread={25}
              animated={false}
              colors={["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={0}
              style={{
                borderColor: "transparent",
              }}
            >
              <Link
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  const targetEl = document.getElementById("work");
                  if (targetEl) {
                    const offset = targetEl.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                      top: offset,
                      behavior: "smooth",
                    });
                    window.history.pushState(null, "", "#work");
                  }
                }}
                className="relative text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full px-7 py-3.5 text-white/80 border border-white/10 hover:border-gold/30 hover:text-white transition-all duration-300 font-sans focus:outline-none"
                style={{
                  background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.01) 100%)",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                  style={{
                    background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.2) 0%, rgba(197, 168, 128, 0.05) 100%)",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2.5">
                  Explore Our Work
                  <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform duration-300 text-current" />
                </span>
              </Link>
            </BorderGlow>
          </div>
        </div>
      </ScrollExpand>
      </section>
    </div>
  );
}

export default AboutStudio;
