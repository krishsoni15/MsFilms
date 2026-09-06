"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const CircularGallery = dynamic(
  () => import("@/components/ui/CircularGallery"),
  { ssr: false }
);

export function CircularShowcase() {
  const items = [
    { image: "/wedding/bg1.png", text: "Golden Hour Vows" },
    { image: "/wedding/1_1.png", text: "Unscripted Emotion" },
    { image: "/wedding/1_2.png", text: "Bridal Portraiture" },
    { image: "/real-estate/img_1.jpg", text: "Greenbryre Estate" },
    { image: "/wedding/1_3.png", text: "Sunset Exchange" },
    { image: "/drone/imgi_10_3.jpg", text: "Aerial Riverbank" },
    { image: "/wedding/1_4.png", text: "Quiet Romance" },
    { image: "/real-estate/img_3.jpg", text: "Architectural Villa" },
    { image: "/wedding/1_5.png", text: "Ceremony Confetti" },
    { image: "/drone/imgi_12_9.jpg", text: "Boreal Canopy" },
    { image: "/wedding/imgi_6_4.jpg", text: "First Look Study" },
    { image: "/wedding/imgi_7_3.jpg", text: "Waskesiu Sunset" }
  ];

  return (
    <section className="py-20 md:py-32 bg-background border-t border-border/40 overflow-hidden">
      <div className="mb-12 md:mb-16 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-3">
            3D WebGL Exhibition
          </AnimatedText>
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            baseRotation={2}
            blurStrength={8}
            textClassName="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2]"
            rotationEnd="bottom center+=20%"
            wordAnimationEnd="bottom center+=45%"
          >
            Curved Horizon Gallery.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Click and drag left or right to rotate the 3D curved gallery reel. Scroll or use arrow keys to navigate through our finest wedding frames.
        </p>
      </div>

      {/* Circular Gallery Viewport */}
      <div className="w-full h-[580px] md:h-[650px] relative overflow-hidden">
        <CircularGallery
          items={items}
          bend={3}
          textColor="#d4af37"
          borderRadius={0.05}
          scrollSpeed={2.5}
          scrollEase={0.03}
          autoScroll={true}
          autoScrollSpeed={0.35}
          autoScrollDirection="right"
          fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@600&display=swap"
          font="bold 28px Outfit"
        />
      </div>
    </section>
  );
}

export default CircularShowcase;
