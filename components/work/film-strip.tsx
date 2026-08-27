"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workCategories } from "@/lib/work-data";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function HorizontalFilmStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Gather 8 beautiful images across all categories
  const filmImages = [
    workCategories[0].images[0].url, // Weddings 1
    workCategories[0].images[1].url, // Weddings 2
    workCategories[1].images[0].url, // Events 1
    workCategories[1].images[1].url, // Events 2
    workCategories[2].images[0].url, // Real Estate 1
    workCategories[2].images[1].url, // Real Estate 2
    workCategories[3].images[0].url, // Drone 1
    workCategories[3].images[1].url, // Drone 2
  ];

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!container || !pin || !track) return;

    const ctx = gsap.context(() => {
      const getScrollAmount = () => {
        const trackWidth = track.offsetWidth;
        const windowWidth = window.innerWidth;
        return -(trackWidth - windowWidth);
      };

      gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${track.offsetWidth - window.innerWidth}`,
          pin: pin,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-[#02050a] z-30 select-none">
      {/* Pinned Viewport */}
      <div ref={pinRef} className="w-full h-screen flex items-center justify-start overflow-hidden">
        
        {/* Horizontal Film Strip Track */}
        <div ref={trackRef} className="flex items-center h-[55vh] sm:h-[65vh] bg-[#090b0e] py-6 px-12 shrink-0 border-t border-b border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
          
          {/* Top Sprocket Holes Line */}
          <div className="absolute top-1.5 left-0 right-0 h-4 flex justify-around pointer-events-none opacity-60">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="w-3.5 h-3 bg-[#02050a] rounded-[2px]" />
            ))}
          </div>

          {/* Kodak/Fujifilm Edge Markings & Metadata */}
          <div className="absolute top-7 left-12 right-12 flex justify-between pointer-events-none font-sans text-[8px] tracking-[0.25em] text-[#c5a880]/40 uppercase">
            <span>KODAK PORTRA 400</span>
            <span>SAFETY FILM</span>
            <span>MSFILMS CO</span>
            <span>2026</span>
          </div>

          {/* Cells Container */}
          <div className="flex gap-10 items-center">
            {filmImages.map((src, idx) => (
              <div key={idx} className="flex items-center shrink-0">
                
                {/* Single Film Frame Cell */}
                <div className="relative w-[320px] sm:w-[420px] aspect-[3/2] bg-[#0c0f13] p-[6px] sm:p-2 border border-white/10 shadow-2xl flex items-center justify-center">
                  <div className="relative w-full h-full overflow-hidden bg-black">
                    <Image
                      src={src}
                      alt={`Film frame cell ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 320px, 420px"
                      className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                    />
                    
                    {/* Retro Grain and Lens Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/5 pointer-events-none" />
                  </div>
                  
                  {/* Subtle Frame Number indicator */}
                  <span className="absolute bottom-[-18px] right-2 font-mono text-[9px] text-[#c5a880]/50 tracking-wider">
                    {idx + 1}A
                  </span>
                </div>

                {/* Vertical frame border divider between cells */}
                <div className="h-[40vh] w-[1px] bg-white/[0.04] mx-5 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Bottom Edge Markings */}
          <div className="absolute bottom-7 left-12 right-12 flex justify-between pointer-events-none font-sans text-[8px] tracking-[0.25em] text-[#c5a880]/40 uppercase">
            <span>ISO 400</span>
            <span>FRAME DETECTED</span>
            <span>MSFILMS PRO</span>
            <span>BARCODE 00{filmImages.length}</span>
          </div>

          {/* Bottom Sprocket Holes Line */}
          <div className="absolute bottom-1.5 left-0 right-0 h-4 flex justify-around pointer-events-none opacity-60">
            {Array.from({ length: 80 }).map((_, i) => (
              <div key={i} className="w-3.5 h-3 bg-[#02050a] rounded-[2px]" />
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
export default HorizontalFilmStrip;
