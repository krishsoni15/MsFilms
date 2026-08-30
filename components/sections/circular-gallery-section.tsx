"use client";

import CircularGallery from "@/components/ui/circular-gallery";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function CircularGallerySection() {
  const galleryItems = [
    { image: "/landscape/imgi_2_1.jpg", text: "Valley Horizon" },
    { image: "/landscape/imgi_8_8.jpg", text: "Mist Mountain" },
    { image: "/landscape/imgi_7_4.jpg", text: "Silent Forest" },
    { image: "/landscape/imgi_5_10.jpg", text: "Alpine Lake" },
    { image: "/landscape/imgi_10_6.jpg", text: "Sunset Peak" },
    { image: "/wedding/imgi_6_4.jpg", text: "Wedding Story" },
    { image: "/wedding/imgi_7_3.jpg", text: "Forest Kiss" },
    { image: "/drone/imgi_10_3.jpg", text: "Aerial Horizon" },
  ];

  return (
    <section className="py-24 md:py-36 bg-background border-t border-border overflow-hidden">
      <div className="mb-12 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            Curated Showcases
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
            Immersive Visual Ring.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Click and drag the circular gallery or use arrow keys to browse our recent photography snapshots in a fully interactive 3D space.
        </p>
      </div>

      <div className="w-full relative h-[450px] md:h-[600px] select-none">
        {/* Glow behind the gallery */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none z-0" />
        
        <div className="relative z-10 w-full h-full">
          <CircularGallery
            items={galleryItems}
            bend={2.5}
            textColor="#c5a880"
            borderRadius={0.03}
            scrollEase={0.03}
            scrollSpeed={1.8}
            font="bold 16px Instrument Serif"
          />
        </div>
      </div>
    </section>
  );
}
