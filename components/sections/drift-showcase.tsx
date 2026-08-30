"use client";

import React from "react";
import dynamic from "next/dynamic";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const DriftWall = dynamic(
  () => import("@/components/ui/DriftWall"),
  { ssr: false }
);

export function DriftShowcase() {
  const items = [
    { image: "/landscape/imgi_8_8.jpg", title: "Serene Valley" },
    { image: "/wedding/imgi_3_5.png", title: "Ethereal Veil" },
    { image: "/drone/imgi_10_3.jpg", title: "Aerial Symmetry" },
    { image: "/me/013A5316.jpg", title: "Portrait Study" },
    { image: "/landscape/imgi_7_4.jpg", title: "Mountain Pass" },
    { image: "/wedding/imgi_7_3.jpg", title: "Golden Hour Waltz" },
    { image: "/drone/imgi_12_9.jpg", title: "Coastal Sinuosity" },
    { image: "/me/imgi_36_625043456_18087932393515848_4263036374454868947_n.jpg", title: "Monochromatic Study" },
    { image: "/drone/imgi_11_6.jpg", title: "Forest Grid" },
    { image: "/landscape/imgi_3_5.jpg", title: "Mountain Peak" },
    { image: "/wedding/imgi_6_4.jpg", title: "Wedding Ring" },
    { image: "/me/imgi_85_622505371_18140539135468400_2765037163092247242_n.jpg", title: "Candid Portrait" },
    { image: "/drone/imgi_7_5.jpg", title: "Shoreline Wave" },
    { image: "/landscape/imgi_2_1.jpg", title: "River Flow" },
    { image: "/wedding/imgi_2_2.png", title: "Wedding Couple" }
  ];

  return (
    <section className="py-24 md:py-36 bg-background border-t border-border overflow-hidden">
      <div className="mb-16 md:mb-20 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            WebGL Wall
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
            Infinite Drift.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Hover your mouse to control the 3D perspective pitch. Focus on any individual photo card to lift it from the background and restore its full color spectrum.
        </p>
      </div>

      {/* Drift Wall Viewport */}
      <div className="w-full h-[600px] relative overflow-hidden">
        <DriftWall
          items={items}
          rows={5}
          tileWidth={280}
          tileHeight={180}
          gap={24}
          radius={12}
          tilt={12}
          turn={-14}
          perspective={1200}
          depth={100}
          speed={40}
          direction="left"
          variance={0.4}
          parallax={0.6}
          lift={50}
          fade={0.6}
          dim={0.45}
          overlayColor="var(--background)"
        />
      </div>
    </section>
  );
}

export default DriftShowcase;
