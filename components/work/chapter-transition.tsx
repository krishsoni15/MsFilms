"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ChapterTransitionProps {
  nextChapterNum: string;
  nextChapterTitle: string;
}

export function ChapterTransition({
  nextChapterNum,
  nextChapterTitle,
}: ChapterTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Background numeral: scales down slightly, fades in, and moves up
      tl.fromTo(
        bgTextRef.current,
        { scale: 1.2, opacity: 0, y: 100 },
        { scale: 1, opacity: 0.04, y: -50, ease: "none" },
        0
      );

      // Label "UP NEXT": fades in and slides up
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 30 },
        { opacity: 0.5, y: 0, ease: "none" },
        0.1
      );

      // Heading "CHAPTER 02 — EVENTS": slides in and fades
      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50, filter: "blur(4px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", ease: "none" },
        0.2
      );

      // Horizontal progress line expansion
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none" },
        0.15
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[80vh] flex flex-col justify-center items-center bg-[#020912] overflow-hidden select-none z-20 border-t border-b border-white/[0.02]"
    >
      {/* Massive Background Numeral */}
      <div
        ref={bgTextRef}
        className="absolute font-serif text-[45vw] font-bold leading-none text-white opacity-0 select-none pointer-events-none will-change-transform z-0"
      >
        {nextChapterNum}
      </div>

      {/* Grid Overlay inside transition */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-10 opacity-20" />

      {/* Content Stack */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        <div
          ref={labelRef}
          className="font-sans text-[10px] sm:text-xs tracking-[0.4em] font-semibold text-white/50 uppercase mb-4"
        >
          UP NEXT / THE SEGMENT
        </div>

        <h3
          ref={titleRef}
          className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f4f1eb] tracking-tight uppercase mb-8"
        >
          Ch. {nextChapterNum} &mdash; {nextChapterTitle}
        </h3>

        {/* Minimal Animated Divider */}
        <div className="w-24 sm:w-36 h-[1.5px] bg-[#c5a880]/30 relative overflow-hidden">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-[#c5a880] origin-center transform will-change-transform"
          />
        </div>
      </div>
    </div>
  );
}
