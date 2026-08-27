"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorkCategoryData } from "@/lib/work-data";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScatteredGalleryProps {
  data: WorkCategoryData;
}

export function ScatteredGallery({ data }: ScatteredGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = itemsRef.current.filter(Boolean);
    if (items.length === 0) return;

    const ctx = gsap.context(() => {
      items.forEach((item, index) => {
        // Assign different parallax scroll rates (some scroll faster, some slower)
        const speeds = [-60, 40, -100, 60, -40, 80, -20];
        const yOffset = speeds[index % speeds.length];

        gsap.fromTo(
          item,
          { y: 0 },
          {
            y: yOffset,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, [data]);

  // Position coordinates and sizes for our scattered layout
  // Using absolute positions (top, left/right, width) to create an asymmetric editorial feel
  const layoutConfigs = [
    { left: "5%", top: "0%", width: "w-[42%] md:w-[35%]", aspect: "aspect-[3/4]", type: "portrait" },
    { right: "8%", top: "8%", width: "w-[48%] md:w-[42%]", aspect: "aspect-[4/3]", type: "landscape" },
    { left: "15%", top: "32%", width: "w-[50%] md:w-[44%]", aspect: "aspect-[16/9]", type: "landscape" },
    { right: "12%", top: "45%", width: "w-[38%] md:w-[30%]", aspect: "aspect-[3/4]", type: "portrait" },
    { left: "8%", top: "65%", width: "w-[45%] md:w-[38%]", aspect: "aspect-[4/3]", type: "landscape" },
    { right: "6%", top: "78%", width: "w-[40%] md:w-[32%]", aspect: "aspect-[1/1]", type: "square" },
    { left: "22%", top: "90%", width: "w-[55%] md:w-[48%]", aspect: "aspect-[16/9]", type: "landscape" }
  ];

  const displayImages = data.images.slice(0, layoutConfigs.length);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[140vh] md:min-h-[180vh] py-10 md:py-20 select-none"
    >
      {/* Scattered Layout Grid */}
      <div className="relative w-full h-full min-h-[120vh] md:min-h-[160vh]">
        {displayImages.map((img, index) => {
          const config = layoutConfigs[index];
          const style: React.CSSProperties = {
            position: "absolute",
            top: config.top,
            ...(config.left ? { left: config.left } : { right: config.right })
          };

          return (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el;
              }}
              style={style}
              className={`chroma-card group shadow-xl cursor-pointer ${config.width} ${config.aspect}`}
            >
              <div className="chroma-card-inner w-full h-full relative">
                {/* Image element */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 35vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                  />
                  {/* Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                </div>

                {/* Minimal Caption on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out z-10 pointer-events-none">
                  <span className="text-[7px] sm:text-[9px] tracking-[0.2em] text-[#e5d5be] uppercase font-bold">
                    {img.title ? "MOMENT" : "EVENT"}
                  </span>
                  <h4 className="font-serif text-sm sm:text-base text-[#f4f1eb] font-normal leading-tight mt-0.5">
                    {img.title || "The Atmos"}
                  </h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
