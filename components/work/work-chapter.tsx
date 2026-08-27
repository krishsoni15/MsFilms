"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorkCategoryData } from "@/lib/work-data";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkChapterProps {
  data: WorkCategoryData;
  children: React.ReactNode;
}

export function WorkChapter({ data, children }: WorkChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Fade and slide up the metadata table
      gsap.fromTo(
        metaRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: metaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Fade and slide up the title, headline, description
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={`chapter-${data.id}`}
      className={`w-full min-h-screen relative py-20 sm:py-28 md:py-36 px-6 sm:px-12 lg:px-20 ${data.theme.bg} ${data.theme.text} transition-colors duration-500 overflow-hidden flex flex-col z-30`}
    >
      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:6rem_auto] pointer-events-none opacity-20" />

      {/* Editorial Chapter Header Block */}
      <div
        ref={headerRef}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 md:mb-28 z-10"
      >
        {/* Left Column: Numeral & Metadata Table */}
        <div ref={metaRef} className="lg:col-span-4 flex flex-col justify-start">
          {/* Chapter badge */}
          <div className="flex items-center gap-4 mb-8">
            <span
              className="font-serif text-5xl md:text-6xl font-light italic"
              style={{ color: data.theme.accent }}
            >
              Ch. {data.number}
            </span>
            <div className="h-[1px] flex-1" style={{ backgroundColor: `${data.theme.accent}33` }} />
          </div>

          {/* Metadata Grid Table */}
          <div className="space-y-4 font-sans text-xs tracking-wider border-t border-b py-6" style={{ borderColor: `${data.theme.accent}22` }}>
            <div className="flex justify-between items-start gap-4">
              <span className="opacity-40 uppercase font-semibold shrink-0">LOCATION</span>
              <span className="text-right font-medium">{data.metadata.location}</span>
            </div>
            <div className="flex justify-between items-start gap-4 border-t pt-4" style={{ borderColor: `${data.theme.accent}11` }}>
              <span className="opacity-40 uppercase font-semibold shrink-0">YEAR</span>
              <span className="text-right font-medium">{data.metadata.year}</span>
            </div>
            <div className="flex justify-between items-start gap-4 border-t pt-4" style={{ borderColor: `${data.theme.accent}11` }}>
              <span className="opacity-40 uppercase font-semibold shrink-0">SERVICES</span>
              <span className="text-right font-medium max-w-[200px]">
                {data.metadata.services.join(" / ")}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Headline, and Description */}
        <div ref={contentRef} className="lg:col-span-8 flex flex-col justify-center">
          <span
            className="font-sans text-[10px] sm:text-xs tracking-[0.35em] uppercase font-bold mb-3"
            style={{ color: data.theme.accent }}
          >
            CHAPTER {data.number} / {data.title}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight tracking-tight uppercase mb-6 max-w-3xl">
            {data.headline}
          </h2>
          <p className="font-sans text-sm sm:text-base leading-relaxed opacity-70 max-w-2xl font-light">
            {data.description}
          </p>
        </div>
      </div>

      {/* Chapter Children (Visualization Showcase) */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 z-10">
        {children}
      </div>
    </section>
  );
}
