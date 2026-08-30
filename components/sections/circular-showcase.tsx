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
    { image: "/landscape/imgi_8_8.jpg", text: "Serene Valley" },
    { image: "/wedding/imgi_3_5.png", text: "Ethereal Veil" },
    { image: "/drone/imgi_10_3.jpg", text: "Aerial Symmetry" },
    { image: "/me/013A5316.jpg", text: "Portrait Study" },
    { image: "/landscape/imgi_7_4.jpg", text: "Mountain Pass" },
    { image: "/wedding/imgi_7_3.jpg", text: "Golden Hour Waltz" },
    { image: "/drone/imgi_12_9.jpg", text: "Coastal Sinuosity" },
    { image: "/me/imgi_36_625043456_18087932393515848_4263036374454868947_n.jpg", text: "Monochromatic Study" }
  ];

  return (
    <section className="py-24 md:py-36 bg-background border-t border-border overflow-hidden">
      <div className="mb-16 md:mb-20 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            WebGL Showcase
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
            Curved Horizon.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Click and drag to rotate the curved gallery track. Use mouse wheel or keyboard arrow keys to scroll through our cinematic collections.
        </p>
      </div>

      {/* Circular Gallery Viewport */}
      <div className="w-full h-[600px] relative overflow-hidden">
        <CircularGallery
          items={items}
          bend={3.5}
          textColor="#d4af37"
          borderRadius={0.04}
          scrollEase={0.03}
          fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@600&display=swap"
          font="bold 28px Outfit"
          autoplay={true}
          autoplaySpeed={0.5}
          autoplayDirection="left"
        />
      </div>
    </section>
  );
}

export default CircularShowcase;
