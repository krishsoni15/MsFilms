"use client";

import React from "react";
import LenticularCarousel, { LenticularItem } from "@/components/ui/LenticularCarousel";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";

export function LenticularSlider() {
  const mode = "hologram";
  const slicesCount = 28;
  const lenticularAngle = 16;

  const items: LenticularItem[] = [
    {
      id: "wedding-story",
      image: "/wedding/imgi_3_5.png",
      subtitle: "REAL LOVE STORIES",
      title: "Wedding Day Moments",
    },
    {
      id: "horizons",
      image: "/landscape/imgi_8_8.jpg",
      subtitle: "NATURAL ENVIRONMENT",
      title: "Landscape Sceneries",
    },
    {
      id: "drone-view",
      image: "/drone/imgi_10_3.jpg",
      subtitle: "AERIAL PERSPECTIVES",
      title: "Dronography Symmetry",
    },
    {
      id: "character-light",
      image: "/me/013A5316.jpg",
      subtitle: "PORTRAIT STUDIES",
      title: "Character & Light",
    },
  ];

  return (
    <section className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-[#020912] border-t border-white/[0.03] overflow-hidden">
      <div className="mb-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            Interactive Showcase
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
            Lenticular Prints.
          </ScrollReveal>
        </div>
        
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans md:text-right">
          Hover and tilt your mouse over the active card to reveal the hidden image. Drag or click the arrows to browse.
        </p>
      </div>

      {/* Main Viewport & Carousel */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
        <LenticularCarousel
          items={items}
          mode={mode}
          slicesCount={slicesCount}
          lenticularAngle={lenticularAngle}
          cardWidth={285}
          cardHeight={420}
          autoplay={false}
          className="w-full"
        />
      </div>
    </section>
  );
}

export default LenticularSlider;
