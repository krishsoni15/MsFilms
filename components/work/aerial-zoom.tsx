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

interface AerialZoomProps {
  data: WorkCategoryData;
}

export function AerialZoom({ data }: AerialZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    const frame = imageFrameRef.current;
    const img = imageRef.current;
    if (!container || !pin || !frame || !img) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=140%",
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // Scale the main image down (pull back)
      tl.fromTo(
        img,
        { scale: 1.5 },
        { scale: 1.0, ease: "power2.inOut" },
        0
      );

      // Frame contraction (from full-bleed to framed bounds)
      tl.fromTo(
        frame,
        {
          padding: "0vw",
          borderRadius: "0px",
          width: "100%",
          height: "100%",
        },
        {
          padding: "4vw",
          borderRadius: "8px",
          width: "90%",
          height: "85%",
          ease: "power2.inOut",
        },
        0
      );

      // Fade in the GPS Coordinates HUD overlay late in the pull-back
      tl.fromTo(
        hudRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 0.75, scale: 1, ease: "power1.out" },
        0.5
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const featuredImage = data.images[0] || data.featuredImage;
  const gridImages = data.images.slice(1);

  return (
    <div ref={containerRef} className="relative w-full select-none">
      {/* Pinned Zoom Screen */}
      <div ref={pinRef} className="w-full h-screen relative flex items-center justify-center overflow-hidden">
        
        {/* Cinematic Backdrop glow */}
        <div className="absolute w-[80vw] h-[80vw] rounded-full bg-cyan-900/5 blur-[150px] pointer-events-none" />

        {/* Framing Box */}
        <div
          ref={imageFrameRef}
          className="relative overflow-hidden bg-black/40 border border-white/[0.06] flex items-center justify-center shadow-2xl transition-all duration-300"
        >
          {/* Zoom Image */}
          <div ref={imageRef} className="absolute inset-0 w-full h-full">
            <Image
              src={featuredImage.url}
              alt={featuredImage.alt}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* GPS HUD Details (revealed after zoom out) */}
          <div
            ref={hudRef}
            className="absolute inset-x-8 bottom-8 sm:bottom-12 flex justify-between items-end pointer-events-none z-20 text-[8px] sm:text-[10px] tracking-[0.25em] font-mono text-[#e5d5be] uppercase"
          >
            <div className="flex flex-col gap-1">
              <span>LAT: 51.0447&deg; N</span>
              <span>LON: 114.0719&deg; W</span>
            </div>
            <div className="flex flex-col gap-1 text-right">
              <span>ELEV: 400 FT AGL</span>
              <span>CAM: 4K 60FPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Supporting Drone Landscapes Grid */}
      <div
        ref={gridRef}
        className="relative max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 z-20 bg-transparent"
      >
        {gridImages.map((img, idx) => (
          <div
            key={idx}
            className="chroma-card group shadow-lg cursor-pointer aspect-[16/10]"
          >
            <div className="chroma-card-inner w-full h-full relative">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 ease-out z-10 pointer-events-none">
                <span className="text-[8px] tracking-[0.2em] text-[#e5d5be] uppercase font-bold">
                  {img.title ? "AERIAL LANDSCAPE" : "DRONE PERSPECTIVE"}
                </span>
                <h4 className="font-serif text-base text-[#f4f1eb] font-normal leading-tight mt-0.5">
                  {img.title || "The Horizon"}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
