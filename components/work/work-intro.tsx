"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";
import DomeGallery from "@/components/ui/DomeGallery";
import PageFlip from "@/components/ui/page-flip";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const DOME_IMAGES = [
  "/wedding/1_1.png",
  "/wedding/1_2.png",
  "/wedding/1_3.png",
  "/wedding/1_4.png",
  "/wedding/1_5.png",
  "/wedding/bg1.png",
  "/real-estate/img_1.jpg",
  "/real-estate/img_2.jpg",
  "/real-estate/img_3.jpg",
  "/real-estate/img_4.jpg",
  "/real-estate/img_5.jpg",
  "/drone/imgi_11_6.jpg",
  "/drone/imgi_10_3.jpg",
  "/drone/imgi_12_9.jpg",
  "/drone/imgi_2_1.jpg",
  "/drone/imgi_4_7.jpg",
];

export function WorkIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleLeftRef = useRef<HTMLSpanElement>(null);
  const titleRightRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const domeContainerRef = useRef<HTMLDivElement>(null);
  const bookWrapperRef = useRef<HTMLDivElement>(null);

  const [activeSheetIndex, setActiveSheetIndex] = useState(-1);

  const handleExploreClick = () => {
    const container = containerRef.current;
    if (!container) return;

    const ST = ScrollTrigger.getById("work-intro-trigger");
    let targetScroll = 0;
    if (ST) {
      targetScroll = ST.start + (ST.end - ST.start) * 0.25;
    } else {
      const rect = container.getBoundingClientRect();
      targetScroll = window.scrollY + rect.top + window.innerHeight * 0.8;
    }

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalSheets = 5;
    const totalStates = totalSheets + 1;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "work-intro-trigger",
          trigger: container,
          start: "top top",
          end: "+=460%",
          pin: true,
          scrub: 0.7,
          refreshPriority: 5,
          onUpdate: (self) => {
            const progress = self.progress;
            // Phase 2: Page flip state when book is centered (progress 0.12 to 0.90)
            if (progress >= 0.12 && progress <= 0.90) {
              const relProgress = (progress - 0.12) / (0.90 - 0.12);
              const rawIdx = Math.floor(relProgress * totalStates) - 1;
              const clampedIdx = Math.min(Math.max(rawIdx, -1), totalSheets - 1);
              setActiveSheetIndex(clampedIdx);
            } else if (progress < 0.12) {
              setActiveSheetIndex(-1);
            } else if (progress > 0.90) {
              setActiveSheetIndex(totalSheets - 1);
            }
          },
        },
      });

      // ─── Phase 1: "OUR WORK" splits left & right, center space opens ───
      tl.to(
        titleLeftRef.current,
        {
          xPercent: -65,
          opacity: 0.15,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        titleRightRef.current,
        {
          xPercent: 65,
          opacity: 0.15,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        [subtitleRef.current, categoriesRef.current, scrollIndicatorRef.current],
        {
          opacity: 0,
          y: -30,
          ease: "power2.out",
        },
        0
      );

      tl.to(
        domeContainerRef.current,
        {
          opacity: 0.5,
          scale: 1.04,
          ease: "power2.out",
        },
        0
      );

      // ─── Phase 2: Book smoothly reveals and stays locked in center ───
      tl.fromTo(
        bookWrapperRef.current,
        {
          yPercent: 0,
          opacity: 0,
          scale: 0.92,
        },
        {
          yPercent: 0,
          opacity: 1,
          scale: 1.0,
          ease: "power2.out",
          duration: 0.15,
        },
        0.02
      );
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="work"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center bg-background"
    >
      {/* 3D Dome Gallery Background */}
      <div
        ref={domeContainerRef}
        className="absolute inset-0 w-full h-full z-0 work-bg-dome"
        style={{ willChange: "transform, opacity" }}
      >
        <DomeGallery
          images={DOME_IMAGES}
          fit={0.85}
          fitBasis="auto"
          minRadius={650}
          maxRadius={1300}
          overlayBlurColor="var(--background)"
          grayscale={true}
          segments={28}
          openedImageWidth="360px"
          openedImageHeight="480px"
          imageBorderRadius="16px"
          openedImageBorderRadius="22px"
        />
      </div>

      {/* Background Ambiance Image */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 w-full h-full opacity-0 scale-100 pointer-events-none select-none transition-transform duration-300"
        style={{ willChange: "transform, opacity" }}
      >
        <Image
          src="/wedding/DSC00085.JPG"
          alt="Cinematic intro wedding"
          fill
          className="object-cover object-center grayscale opacity-70"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background" />
      </div>

      {/* Editorial Title & Intro Overlay */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 max-w-5xl pointer-events-none">
        {/* Supporting text */}
        <div
          ref={categoriesRef}
          className="text-[10px] sm:text-xs tracking-[0.3em] font-sans font-medium text-gold/80 mb-6 uppercase"
        >
          WEDDINGS / EVENTS / REAL ESTATE / DRONE
        </div>

        {/* Large Editorial Headline — Splits Left & Right on Scroll */}
        <h1 className="font-serif text-[11vw] sm:text-[9vw] leading-[0.95] text-foreground tracking-tight uppercase flex items-center justify-center gap-[4vw] overflow-visible select-none mb-6">
          <span ref={titleLeftRef} className="inline-block origin-right will-change-transform">
            OUR
          </span>
          <span ref={titleRightRef} className="inline-block origin-left will-change-transform">
            WORK
          </span>
        </h1>

        {/* Emotional Tagline */}
        <div
          ref={subtitleRef}
          className="font-laluxes-serif text-2xl sm:text-3xl lg:text-4xl text-foreground/90 italic tracking-wider font-light"
        >
          &ldquo;We capture what you felt.&rdquo;
        </div>

        {/* Interactive Badge with BorderGlow */}
        <div className="mt-6 pointer-events-auto">
          <BorderGlow
            edgeSensitivity={25}
            glowColor="35 85 75"
            backgroundColor="transparent"
            borderRadius={9999}
            glowRadius={40}
            glowIntensity={0.5}
            coneSpread={30}
            animated={true}
            colors={["#ffffff", "#cba358", "#ffffff"]}
            fillOpacity={0}
            style={{ borderColor: "transparent" }}
          >
            <button
              onClick={handleExploreClick}
              className="relative cursor-pointer text-[11px] tracking-[0.22em] uppercase flex items-center gap-3 rounded-full border border-gold/40 hover:border-gold text-gold hover:text-white px-7 py-3 transition-all duration-300 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 focus:outline-none group"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(197, 168, 128, 0.18) 0%, rgba(197, 168, 128, 0.04) 100%)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse group-hover:scale-125 transition-transform duration-300" />
              <span className="font-sans font-semibold text-gold group-hover:text-white transition-colors duration-300">
                EXPLORE OUR WORK
              </span>
              <ArrowUpRight size={14} className="text-gold group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </BorderGlow>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/35 z-20 font-sans text-[9px] tracking-[0.25em] pointer-events-none"
      >
        <span className="uppercase">SCROLL TO ENTER</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white/30 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce-slow" />
        </div>
      </div>

      {/* ─── 3D Interactive Lookbook Rising from Bottom into Pinned Center ─── */}
      <div
        ref={bookWrapperRef}
        className="absolute inset-0 z-30 w-full h-full flex flex-col justify-center items-center px-4 pointer-events-auto"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          <PageFlip
            width={920}
            height={580}
            className="mx-auto"
            activeSheetIndex={activeSheetIndex}
          >
            {/* Page 1: Front Cover */}
            <div className="w-full h-full bg-neutral-950 flex flex-col justify-between p-8 md:p-14 border border-gold/10 relative">
              <div className="absolute inset-[15px] border border-gold/10 pointer-events-none rounded-lg" />
              <div className="text-[10px] tracking-[0.35em] uppercase text-gold/60 font-sans font-semibold">
                Fine Art Portfolio
              </div>
              <div className="my-auto space-y-4">
                <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground font-light tracking-wide uppercase leading-none">
                  Ms Films
                </h3>
                <p className="font-serif text-sm md:text-base italic text-gold/80 leading-relaxed font-light">
                  Selected Works & Stories in Motion
                </p>
                <div className="pt-2">
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-2 border border-gold/40 hover:border-gold text-gold hover:text-gold/90 px-4 py-2 text-[9px] tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 rounded bg-gold/10 hover:bg-gold/20"
                  >
                    <span>Explore Full Portfolio</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 font-sans">
                  Saskatoon, Saskatchewan
                </span>
                <span className="text-[9px] tracking-[0.15em] uppercase text-gold/60 font-sans font-medium animate-pulse">
                  Scroll or Click Page to Flip →
                </span>
              </div>
            </div>

            {/* Page 2: Table of Contents & Intro */}
            <div className="w-full h-full bg-[#131313] flex flex-col justify-between p-8 md:p-12 relative">
              <div className="absolute inset-[10px] border border-white/5 pointer-events-none rounded" />
              <div>
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-2 block">
                  01 / Introduction
                </span>
                <h4 className="font-display text-2xl text-foreground font-light uppercase tracking-wide mb-4">
                  Our Philosophy
                </h4>
                <p className="font-serif text-xs md:text-sm text-foreground/75 italic leading-relaxed mb-4">
                  &ldquo;We believe that every story has a soul, and every milestone deserves to be framed with elegance. From the intimate glances of a wedding to the sweeping vistas of high-end real estate, our lens is dedicated to capturing the raw, authentic emotions of your narrative.&rdquo;
                </p>
              </div>
              <div className="border-t border-white/5 pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-foreground/40 font-mono block">
                    Chapters & Collections
                  </span>
                  <Link
                    href="/work"
                    className="text-[9px] tracking-[0.15em] uppercase text-gold hover:underline font-sans font-medium flex items-center gap-1"
                  >
                    <span>All Work</span>
                    <ArrowUpRight size={10} />
                  </Link>
                </div>
                <div className="space-y-2 font-sans text-[10px] uppercase tracking-wider text-foreground/70">
                  <Link
                    href="/work/wedding"
                    className="flex justify-between items-center hover:text-gold transition-colors p-1 rounded hover:bg-white/5"
                  >
                    <span>I. Wedding Stories</span>
                    <span className="text-gold/85 flex items-center gap-1">
                      <span>Explore</span> <ArrowUpRight size={10} />
                    </span>
                  </Link>
                  <Link
                    href="/work/real-estate"
                    className="flex justify-between items-center hover:text-gold transition-colors p-1 rounded hover:bg-white/5"
                  >
                    <span>II. Infinite Landscapes</span>
                    <span className="text-gold/85 flex items-center gap-1">
                      <span>Explore</span> <ArrowUpRight size={10} />
                    </span>
                  </Link>
                  <Link
                    href="/work/drone"
                    className="flex justify-between items-center hover:text-gold transition-colors p-1 rounded hover:bg-white/5"
                  >
                    <span>III. Aerial Horizons</span>
                    <span className="text-gold/85 flex items-center gap-1">
                      <span>Explore</span> <ArrowUpRight size={10} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Page 3: Wedding 1 */}
            <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
              <img src="/wedding/imgi_7_3.jpg" alt="Wedding Portrait" className="w-full h-full object-cover brightness-[0.7]" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left z-10 space-y-1">
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter I</span>
                <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">The Golden Hour</h4>
                <p className="text-[10px] text-white/60 font-sans tracking-wide">Saskatoon Wedding Session</p>
                <div className="pt-2">
                  <Link
                    href="/work/wedding"
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-gold font-sans font-semibold hover:underline bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-gold/30"
                  >
                    <span>Explore Wedding Work</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Page 4: Wedding 2 */}
            <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
              <img src="/wedding/imgi_6_4.jpg" alt="Wedding Bridal Close-up" className="w-full h-full object-cover brightness-[0.7]" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left z-10 space-y-1">
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter I</span>
                <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Intimate Whispers</h4>
                <p className="text-[10px] text-white/60 font-sans tracking-wide">Selected Bridal Portraiture</p>
                <div className="pt-2">
                  <Link
                    href="/work/wedding"
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-gold font-sans font-semibold hover:underline bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-gold/30"
                  >
                    <span>More Weddings</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Page 5: Landscape 1 */}
            <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
              <img src="/landscape/imgi_8_8.jpg" alt="Mist Mountain" className="w-full h-full object-cover brightness-[0.7]" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left z-10 space-y-1">
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter II</span>
                <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Mist Mountain</h4>
                <p className="text-[10px] text-white/60 font-sans tracking-wide">Banff Fine Art Study</p>
                <div className="pt-2">
                  <Link
                    href="/work/real-estate"
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-gold font-sans font-semibold hover:underline bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-gold/30"
                  >
                    <span>Explore Real Estate & Landscapes</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Page 6: Landscape 2 */}
            <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
              <img src="/landscape/imgi_7_4.jpg" alt="Silent Forest" className="w-full h-full object-cover brightness-[0.7]" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left z-10 space-y-1">
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter II</span>
                <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Silent Forest</h4>
                <p className="text-[10px] text-white/60 font-sans tracking-wide">Saskatchewan Wilderness Study</p>
                <div className="pt-2">
                  <Link
                    href="/work/real-estate"
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-gold font-sans font-semibold hover:underline bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-gold/30"
                  >
                    <span>More Landscapes</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Page 7: Drone 1 */}
            <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
              <img src="/drone/imgi_10_3.jpg" alt="Aerial Coast" className="w-full h-full object-cover brightness-[0.7]" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left z-10 space-y-1">
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter III</span>
                <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">High Coastlines</h4>
                <p className="text-[10px] text-white/60 font-sans tracking-wide">Cinematic Flight Capture</p>
                <div className="pt-2">
                  <Link
                    href="/work/drone"
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-gold font-sans font-semibold hover:underline bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-gold/30"
                  >
                    <span>Explore Aerial & Drone Work</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Page 8: Drone 2 */}
            <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
              <img src="/drone/imgi_12_9.jpg" alt="Drone Overhead Path" className="w-full h-full object-cover brightness-[0.7]" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left z-10 space-y-1">
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter III</span>
                <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Symmetry from Above</h4>
                <p className="text-[10px] text-white/60 font-sans tracking-wide">Overhead Composition Study</p>
                <div className="pt-2">
                  <Link
                    href="/work/drone"
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-gold font-sans font-semibold hover:underline bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-gold/30"
                  >
                    <span>More Drone Work</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Page 9: Real Estate / Sunset Peak */}
            <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
              <img src="/landscape/imgi_10_6.jpg" alt="Sunset Peak" className="w-full h-full object-cover brightness-[0.7]" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-left z-10 space-y-1">
                <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter IV</span>
                <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Sunset Peaks</h4>
                <p className="text-[10px] text-white/60 font-sans tracking-wide">Banff National Park Study</p>
                <div className="pt-2">
                  <Link
                    href="/work/events"
                    className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase text-gold font-sans font-semibold hover:underline bg-black/40 backdrop-blur-md px-3 py-1.5 rounded border border-gold/30"
                  >
                    <span>Explore Events & Stories</span>
                    <ArrowUpRight size={11} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Page 10: Back Cover */}
            <div className="w-full h-full bg-neutral-950 flex flex-col justify-between p-8 md:p-14 border border-gold/10 relative">
              <div className="absolute inset-[15px] border border-gold/10 pointer-events-none rounded-lg" />
              <div className="text-[9px] tracking-[0.3em] uppercase text-gold/60 font-sans font-semibold text-left">
                The End
              </div>
              <div className="my-auto text-center space-y-6 z-10">
                <h3 className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-wide leading-tight">
                  Let&apos;s Frame <br /> Your Story
                </h3>
                <p className="font-serif text-xs md:text-sm italic text-foreground/60 leading-relaxed font-light">
                  Available for bookings across Canada.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href="#contact"
                    className="inline-block border border-gold/40 hover:border-gold hover:text-gold text-foreground/80 px-6 py-2.5 text-[9px] tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 rounded-sm bg-gold/5 cursor-pointer"
                  >
                    Inquire Now
                  </a>
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-1 border border-white/20 hover:border-gold text-foreground/80 hover:text-gold px-6 py-2.5 text-[9px] tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 rounded-sm bg-white/5"
                  >
                    <span>Full Portfolio</span>
                    <ArrowUpRight size={12} />
                  </Link>
                </div>
              </div>
              <div className="text-center text-[9px] tracking-[0.2em] uppercase text-foreground/30 font-sans">
                © {new Date().getFullYear()} MS FILMS
              </div>
            </div>
          </PageFlip>
        </div>
      </div>
    </div>
  );
}

export default WorkIntro;

