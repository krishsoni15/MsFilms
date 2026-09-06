"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";
import PageFlip from "@/components/ui/page-flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function WorkGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSheetIndex, setActiveSheetIndex] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Total pages = 10 -> 5 sheets (0, 1, 2, 3, 4). Cover state is -1.
    const totalSheets = 5;
    const totalStates = totalSheets + 1;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: isMobile ? "+=130%" : "+=220%",
        pin: true,
        scrub: 0.5,
        refreshPriority: 4,
        onUpdate: (self) => {
          const rawIdx = Math.floor(self.progress * totalStates) - 1;
          const clampedIdx = Math.min(Math.max(rawIdx, -1), totalSheets - 1);
          setActiveSheetIndex(clampedIdx);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-12 md:py-24 px-3 sm:px-8 lg:px-16 bg-background border-t border-border overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="mb-6 md:mb-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 w-full">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-2 sm:mb-3">
            Creative Portfolio
          </AnimatedText>
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            baseRotation={2}
            blurStrength={8}
            textClassName="font-display text-2xl sm:text-4xl lg:text-5xl font-normal leading-[1.2]"
            rotationEnd="bottom center+=20%"
            wordAnimationEnd="bottom center+=45%"
          >
            A mosaic of captured moments.
          </ScrollReveal>
        </div>
        <p className="text-[11px] sm:text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Scroll down to watch our digital lookbook flip through selected fine-art portfolio chapters page by page.
        </p>
      </div>

      {/* Interactive PageFlip Book Wrapper */}
      <div className="max-w-7xl mx-auto w-full relative flex justify-center py-1 sm:py-2">
        <PageFlip width={950} height={600} className="mx-auto" activeSheetIndex={activeSheetIndex}>
          {/* Page 1: Front Cover */}
          <div className="w-full h-full bg-neutral-950 flex flex-col justify-between p-3 sm:p-8 md:p-14 border border-gold/10 relative overflow-hidden">
            <div className="absolute inset-[4px] sm:inset-[15px] border border-gold/10 pointer-events-none rounded-lg" />
            <div className="text-[6.5px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.35em] uppercase text-gold/60 font-sans font-semibold">
              Fine Art Portfolio
            </div>
            <div className="my-auto space-y-1 sm:space-y-4 z-10">
              <h3 className="font-display text-lg sm:text-4xl md:text-5xl lg:text-6xl text-foreground font-light tracking-wide uppercase leading-none">
                Ms Films
              </h3>
              <p className="font-serif text-[8.5px] sm:text-sm md:text-base italic text-gold/80 leading-tight sm:leading-relaxed font-light">
                Selected Works &amp; Stories in Motion
              </p>
            </div>
            <div className="flex flex-col gap-0.5 sm:gap-2 z-10">
              <span className="text-[6.5px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.2em] uppercase text-foreground/30 font-sans">
                Saskatoon, Saskatchewan
              </span>
              <span className="text-[6.5px] sm:text-[9px] tracking-[0.1em] sm:tracking-[0.15em] uppercase text-gold/60 font-sans font-medium animate-pulse">
                Tap Page to Open &rarr;
              </span>
            </div>
          </div>

          {/* Page 2: Table of Contents & Intro */}
          <div className="w-full h-full bg-[#131313] flex flex-col justify-between p-3 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-[4px] sm:inset-[10px] border border-white/5 pointer-events-none rounded" />
            <div className="z-10">
              <span className="text-[6.5px] sm:text-[8px] tracking-[0.2em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-0.5 sm:mb-2 block">
                01 / Introduction
              </span>
              <h4 className="font-display text-xs sm:text-xl md:text-2xl text-foreground font-light uppercase tracking-wide mb-1 sm:mb-6">
                Our Philosophy
              </h4>
              <p className="font-serif text-[8px] sm:text-xs md:text-sm text-foreground/75 italic leading-tight sm:leading-relaxed mb-2 sm:mb-6">
                &ldquo;Every story has a soul, and every milestone deserves elegance. We frame authentic emotions into timeless art.&rdquo;
              </p>
            </div>
            <div className="border-t border-white/10 pt-1.5 sm:pt-4 z-10">
              <span className="text-[6.5px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.25em] uppercase text-foreground/40 font-mono block mb-0.5 sm:mb-1">
                Chapters
              </span>
              <div className="space-y-0.5 sm:space-y-1 font-sans text-[7.5px] sm:text-[10px] uppercase tracking-wider text-foreground/70">
                <div className="flex justify-between"><span>I. Weddings</span><span className="text-gold/85">Pg 3</span></div>
                <div className="flex justify-between"><span>II. Landscapes</span><span className="text-gold/85">Pg 5</span></div>
                <div className="flex justify-between"><span>III. Aerial Drone</span><span className="text-gold/85">Pg 7</span></div>
              </div>
            </div>
          </div>

          {/* Page 3: Wedding 1 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/wedding/imgi_7_3.jpg" alt="Wedding Portrait" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 sm:bottom-6 left-2.5 sm:left-6 right-2.5 sm:right-6 text-left z-10">
              <span className="text-[6px] sm:text-[8px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-0.5 block">Chapter I</span>
              <h4 className="font-display text-[10px] sm:text-lg md:text-xl text-white uppercase tracking-wider leading-tight">The Golden Hour</h4>
              <p className="text-[7px] sm:text-[10px] text-white/60 font-sans tracking-wide mt-0.5">Saskatoon Wedding Session</p>
            </div>
          </div>

          {/* Page 4: Wedding 2 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/wedding/imgi_6_4.jpg" alt="Wedding Bridal Close-up" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 sm:bottom-6 left-2.5 sm:left-6 right-2.5 sm:right-6 text-left z-10">
              <span className="text-[6px] sm:text-[8px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-0.5 block">Chapter I</span>
              <h4 className="font-display text-[10px] sm:text-lg md:text-xl text-white uppercase tracking-wider leading-tight">Intimate Whispers</h4>
              <p className="text-[7px] sm:text-[10px] text-white/60 font-sans tracking-wide mt-0.5">Selected Bridal Portraiture</p>
            </div>
          </div>

          {/* Page 5: Landscape 1 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/landscape/imgi_8_8.jpg" alt="Mist Mountain" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 sm:bottom-6 left-2.5 sm:left-6 right-2.5 sm:right-6 text-left z-10">
              <span className="text-[6px] sm:text-[8px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-0.5 block">Chapter II</span>
              <h4 className="font-display text-[10px] sm:text-lg md:text-xl text-white uppercase tracking-wider leading-tight">Mist Mountain</h4>
              <p className="text-[7px] sm:text-[10px] text-white/60 font-sans tracking-wide mt-0.5">Banff Fine Art Study</p>
            </div>
          </div>

          {/* Page 6: Landscape 2 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/landscape/imgi_7_4.jpg" alt="Silent Forest" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 sm:bottom-6 left-2.5 sm:left-6 right-2.5 sm:right-6 text-left z-10">
              <span className="text-[6px] sm:text-[8px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-0.5 block">Chapter II</span>
              <h4 className="font-display text-[10px] sm:text-lg md:text-xl text-white uppercase tracking-wider leading-tight">Silent Forest</h4>
              <p className="text-[7px] sm:text-[10px] text-white/60 font-sans tracking-wide mt-0.5">Saskatchewan Wilderness Study</p>
            </div>
          </div>

          {/* Page 7: Drone 1 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/drone/imgi_10_3.jpg" alt="Aerial Coast" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 sm:bottom-6 left-2.5 sm:left-6 right-2.5 sm:right-6 text-left z-10">
              <span className="text-[6px] sm:text-[8px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-0.5 block">Chapter III</span>
              <h4 className="font-display text-[10px] sm:text-lg md:text-xl text-white uppercase tracking-wider leading-tight">High Coastlines</h4>
              <p className="text-[7px] sm:text-[10px] text-white/60 font-sans tracking-wide mt-0.5">Cinematic Flight Capture</p>
            </div>
          </div>

          {/* Page 8: Drone 2 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/drone/imgi_12_9.jpg" alt="Drone Overhead Path" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 sm:bottom-6 left-2.5 sm:left-6 right-2.5 sm:right-6 text-left z-10">
              <span className="text-[6px] sm:text-[8px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-0.5 block">Chapter III</span>
              <h4 className="font-display text-[10px] sm:text-lg md:text-xl text-white uppercase tracking-wider leading-tight">Symmetry from Above</h4>
              <p className="text-[7px] sm:text-[10px] text-white/60 font-sans tracking-wide mt-0.5">Overhead Composition Study</p>
            </div>
          </div>

          {/* Page 9: Real Estate / Sunset Peak */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/landscape/imgi_10_6.jpg" alt="Sunset Peak" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 sm:bottom-6 left-2.5 sm:left-6 right-2.5 sm:right-6 text-left z-10">
              <span className="text-[6px] sm:text-[8px] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-0.5 block">Chapter IV</span>
              <h4 className="font-display text-[10px] sm:text-lg md:text-xl text-white uppercase tracking-wider leading-tight">Sunset Peaks</h4>
              <p className="text-[7px] sm:text-[10px] text-white/60 font-sans tracking-wide mt-0.5">Banff National Park Study</p>
            </div>
          </div>

          {/* Page 10: Back Cover */}
          <div className="w-full h-full bg-neutral-950 flex flex-col justify-between p-3 sm:p-8 md:p-14 border border-gold/10 relative overflow-hidden">
            <div className="absolute inset-[4px] sm:inset-[15px] border border-gold/10 pointer-events-none rounded-lg" />
            <div className="text-[6.5px] sm:text-[9px] tracking-[0.18em] sm:tracking-[0.3em] uppercase text-gold/60 font-sans font-semibold text-left">
              The End
            </div>
            <div className="my-auto text-center space-y-1.5 sm:space-y-6 z-10">
              <h3 className="font-display text-xs sm:text-2xl md:text-3xl text-foreground uppercase tracking-wide leading-tight">
                Let&apos;s Frame <br /> Your Story
              </h3>
              <p className="font-serif text-[8.5px] sm:text-xs md:text-sm italic text-foreground/60 leading-relaxed font-light">
                Available across Canada.
              </p>
              <div className="pt-0.5 sm:pt-1">
                <a
                  href="#contact"
                  className="inline-block border border-gold/40 hover:border-gold hover:text-gold text-foreground/80 px-2.5 py-1 sm:px-6 sm:py-2.5 text-[6.5px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 rounded-sm bg-gold/5 cursor-pointer"
                >
                  Inquire Now
                </a>
              </div>
            </div>
            <div className="text-center text-[6.5px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] uppercase text-foreground/30 font-sans">
              © {new Date().getFullYear()} MS FILMS
            </div>
          </div>
        </PageFlip>
      </div>
    </section>
  );
}

export default WorkGallery;
