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

interface CinematicSequenceProps {
  data: WorkCategoryData;
}

export function CinematicSequence({ data }: CinematicSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Create a master timeline tied to the scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=150%",
          pin: pin,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      // We have 4 cards that will scatter out from the center stack.
      // Card 0: Top-Left
      // Card 1: Top-Right
      // Card 2: Bottom-Left
      // Card 3: Bottom-Right
      // Card 4: Center (Focal Card)

      const targets = [
        { x: "-32%", y: "-25%", rotate: -8, scale: 0.9 }, // Top-Left
        { x: "34%", y: "-35%", rotate: 6, scale: 0.95 },  // Top-Right
        { x: "-36%", y: "30%", rotate: -4, scale: 1.0 },   // Bottom-Left
        { x: "32%", y: "25%", rotate: 5, scale: 0.9 },    // Bottom-Right
        { x: "0%", y: "0%", rotate: 0, scale: 1.15 },     // Center Focal
      ];

      cards.forEach((card, index) => {
        const target = targets[index] || { x: "0%", y: "0%", rotate: 0, scale: 1 };
        
        // Initial setup for the stack
        gsap.set(card, {
          xPercent: 0,
          yPercent: 0,
          rotation: index * 2 - 4, // slight variation in rotation for stack look
          scale: 0.85,
          zIndex: index + 10,
        });

        // Animate out to spread configuration
        tl.to(
          card,
          {
            xPercent: parseFloat(target.x),
            yPercent: parseFloat(target.y),
            rotation: target.rotate,
            scale: target.scale,
            ease: "power1.inOut",
          },
          0 // start all animations together at time 0
        );

        // Animate the image titles overlay fading in
        const caption = card.querySelector(".card-caption");
        if (caption) {
          gsap.set(caption, { opacity: 0 });
          tl.to(
            caption,
            {
              opacity: 1,
              duration: 0.3,
              ease: "none",
            },
            0.6 // fade in late in the scroll sequence
          );
        }
      });

      // Fade out the whole set at the very end of scroll to blend into transition
      tl.to(pin, {
        opacity: 0.1,
        scale: 0.95,
        filter: "blur(5px)",
        ease: "none",
      }, 0.9);

    }, container);

    return () => ctx.revert();
  }, [data]);

  // Use the first 5 images of the category
  const displayImages = data.images.slice(0, 5);

  return (
    <div ref={containerRef} className="relative w-full h-[180vh] -mt-10 select-none">
      {/* Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden"
      >
        {/* Cinematic Backdrop glow */}
        <div className="absolute w-[60vw] h-[60vw] rounded-full bg-gold/5 blur-[120px] pointer-events-none" />

        {/* Stack Container */}
        <div className="relative w-full max-w-lg h-[50vh] flex items-center justify-center">
          {displayImages.map((img, index) => {
            const isPortrait = img.orientation === "portrait";
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) cardsRef.current[index] = el;
                }}
                className={`absolute rounded-md overflow-hidden bg-slate-900 border border-white/10 shadow-2xl transition-shadow duration-500 hover:shadow-gold/10 group cursor-pointer ${
                  isPortrait
                    ? "w-[240px] sm:w-[280px] aspect-[3/4]"
                    : "w-[300px] sm:w-[380px] aspect-[4/3]"
                }`}
              >
                {/* Image */}
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={img.url}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 300px, 400px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Dark vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-300" />
                </div>

                {/* Caption Details overlay */}
                <div className="card-caption absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col justify-end pointer-events-none">
                  <span className="text-[8px] tracking-[0.2em] text-[#c5a880] uppercase font-bold">
                    {img.title ? "MOMENT" : "WEDDING"}
                  </span>
                  <h4 className="font-serif text-base sm:text-lg text-[#f4f1eb] font-normal mt-0.5">
                    {img.title || "The Unscripted"}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
