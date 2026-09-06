"use client";

import Link from "next/link";
import { ScrollExpand } from "@/components/ui/scroll-expand";
import { ArrowRight, Check, Sparkles, Film, Camera, ShieldCheck } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";
import { useState, useEffect } from "react";

export function AboutSection() {
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
    <div id="about" className="relative w-full bg-background overflow-hidden">
      <section
        className="relative w-full overflow-hidden shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.15),0_-15px_30px_-10px_rgba(197,168,128,0.02)] dark:shadow-[0_-30px_60px_-15px_rgba(0,0,0,0.9),0_-15px_30px_-10px_rgba(197,168,128,0.06)] border-t border-border/40"
      >
        <ScrollExpand
          src="/mp4/DJI_0094_optimized.mp4"
          mediaType="video"
          poster="/drone/imgi_6_2.jpg"
          alt="Saskatoon & Canada Wide Media Services — MS Films"
          title="MSFILMS"
          scrollHint="SCROLL TO DISCOVER"
          useWindowScroll={true}
          maskType="inset"
          startWidth={isMobile ? 88 : 65}
          startHeight={isMobile ? 65 : 70}
          startRadius={24}
          endRadius={0}
          showArrows={false}
          mediaZoom={1.15}
          scrollDistance={1.8}
          holdDistance={0.4}
          smoothing={1.0}
          overlayScrim={0.82}
        >
          <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center text-white flex flex-col items-center justify-center h-full py-12 md:py-16 relative z-10">
            {/* Gold Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 mb-4 sm:mb-6 shadow-md backdrop-blur-md">
              <Sparkles size={12} className="text-gold animate-pulse" />
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold font-bold font-sans">
                Our Creative Vision
              </span>
            </div>

            {/* Editorial Headline */}
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 max-w-3xl font-normal text-white uppercase tracking-tight">
              Crafting Memories That <br className="hidden sm:inline" />
              <span className="italic font-light text-gold">Last a Lifetime</span>
            </h2>

            {/* Elevated Glassmorphic Quote Box */}
            <div className="relative max-w-2xl mx-auto bg-black/65 backdrop-blur-xl border border-gold/30 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background border border-gold/40 px-3.5 py-0.5 rounded-full text-[8.5px] font-sans font-bold uppercase tracking-[0.25em] text-gold shadow-md">
                Based in Saskatoon · Serving All of Canada
              </div>
              <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-light mb-4 pt-1">
                <span className="text-gold font-serif text-lg mr-1">&ldquo;</span>
                MS Films is a Saskatoon-based professional media team providing luxury photography, cinematic videography, and aerial drone productions across all of Canada. Combining a keen eye for detail with technical mastery, we craft visually stunning films and imagery cherished for a lifetime.
                <span className="text-gold font-serif text-lg ml-1">&rdquo;</span>
              </p>
              <div className="flex items-center justify-center gap-2 text-[9px] font-sans tracking-[0.2em] uppercase text-gold/80 font-semibold pt-1 border-t border-white/10">
                <ShieldCheck size={13} className="text-gold" />
                <span>Uncompromised Artistry &amp; Canada-Wide Travel</span>
              </div>
            </div>

            {/* 3 Interactive Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-5 max-w-3xl w-full text-left mb-10 font-sans">
              <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md border border-gold/25 rounded-xl p-3.5 shadow-lg hover:border-gold/60 hover:bg-black/70 transition-all duration-300 group cursor-default">
                <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center text-gold bg-gold/10 shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Film size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-white font-bold tracking-wider uppercase">Cinematic Storytelling</span>
                  <span className="text-[8.5px] text-white/60 tracking-wide uppercase font-sans">4K Emotion &amp; Audio</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md border border-gold/25 rounded-xl p-3.5 shadow-lg hover:border-gold/60 hover:bg-black/70 transition-all duration-300 group cursor-default">
                <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center text-gold bg-gold/10 shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Camera size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-white font-bold tracking-wider uppercase">Aerial Drone Coverage</span>
                  <span className="text-[8.5px] text-white/60 tracking-wide uppercase font-sans">FAA/Transport Certified</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/50 backdrop-blur-md border border-gold/25 rounded-xl p-3.5 shadow-lg hover:border-gold/60 hover:bg-black/70 transition-all duration-300 group cursor-default">
                <div className="w-8 h-8 rounded-full border border-gold/60 flex items-center justify-center text-gold bg-gold/10 shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Check size={14} strokeWidth={3} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] md:text-[11px] text-white font-bold tracking-wider uppercase">Client-Centric Vibe</span>
                  <span className="text-[8.5px] text-white/60 tracking-wide uppercase font-sans">Tailored Experience</span>
                </div>
              </div>
            </div>

            {/* Call To Action Button */}
            <div className="relative shrink-0">
              <BorderGlow
                edgeSensitivity={20}
                glowColor="35 85 75"
                backgroundColor="transparent"
                borderRadius={9999}
                glowRadius={30}
                glowIntensity={0.4}
                coneSpread={25}
                animated={true}
                colors={["var(--gold)", "var(--gold-light)", "#ffffff"]}
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
                  className="relative text-[11px] tracking-[0.22em] uppercase flex items-center gap-3 rounded-full px-8 py-3.5 text-white font-bold border border-gold/40 hover:border-gold hover:text-gold transition-all duration-300 font-sans focus:outline-none shadow-xl bg-gold/15 hover:bg-gold/25 backdrop-blur-md group"
                >
                  <span className="relative z-10 flex items-center gap-2.5">
                    Explore Our Work
                    <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300 text-gold" />
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

export default AboutSection;
