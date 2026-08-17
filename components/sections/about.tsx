"use client";

import Link from "next/link";
import { ScrollExpand } from "@/components/ui/scroll-expand";
import { siteData } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function AboutStudio() {
  return (
    <section id="about" className="relative w-full bg-[#020912] z-15">
      <ScrollExpand
        src="/drone/imgi_6_2.jpg"
        alt="Saskatoon Wedding Cinema — Msfilms Studio"
        title="MSFILMS STUDIO"
        scrollHint="SCROLL TO DISCOVER"
        useWindowScroll={true}
        startWidth={50}
        startHeight={65}
        startRadius={16}
        endRadius={0}
        mediaZoom={1.22}
        scrollDistance={1.2}
        holdDistance={0.35}
        overlayScrim={0.88}
      >
        <div className="max-w-4xl mx-auto px-6 text-center text-white flex flex-col items-center justify-center h-full">
          <span className="text-[10px] tracking-[0.25em] uppercase text-gold mb-3 font-semibold">
            The Studio
          </span>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight mb-6 max-w-2xl font-normal text-white">
            Crafting Memories That Last a Lifetime
          </h2>
          <p className="font-sans text-xs md:text-sm text-white/70 max-w-xl leading-relaxed mb-8">
            {siteData.aboutText}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl text-left border-t border-white/10 pt-6 mb-10 font-sans">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center text-[10px] text-gold font-bold bg-gold/5 flex-shrink-0">✓</span>
              <span className="text-[10px] md:text-xs text-white/80 font-medium">Cinematic Storytelling</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center text-[10px] text-gold font-bold bg-gold/5 flex-shrink-0">✓</span>
              <span className="text-[10px] md:text-xs text-white/80 font-medium">State-of-the-Art 4K Gear</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center text-[10px] text-gold font-bold bg-gold/5 flex-shrink-0">✓</span>
              <span className="text-[10px] md:text-xs text-white/80 font-medium">Aerial Drone Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center text-[10px] text-gold font-bold bg-gold/5 flex-shrink-0">✓</span>
              <span className="text-[10px] md:text-xs text-white/80 font-medium">Client-Centric Vibe</span>
            </div>
          </div>

          <Link
            href="#work"
            className="relative inline-flex items-center gap-3 text-[12px] tracking-[0.25em] uppercase border border-gold/50 px-9 py-4 text-white overflow-hidden group transition-colors duration-500 hover:border-gold"
          >
            <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left pointer-events-none" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-[#061a2b] transition-colors duration-500">
              Explore Our Work
              <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </ScrollExpand>
    </section>
  );
}

export default AboutStudio;
