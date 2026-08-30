"use client";

import React from "react";
import GradientCarousel, { GradientCarouselItem } from "@/components/ui/GradientCarousel";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";
import { useTheme } from "@/components/theme-provider";

export function GradientSlider() {
  const { theme } = useTheme();
  const bgStop = theme === "light" ? "#f5f2eb" : "#020912";

  const items: GradientCarouselItem[] = [
    {
      id: 1,
      image: "/wedding/imgi_7_3.jpg",
      title: "Wedding Day Milestones",
      subtitle: "REAL LOVE STORIES",
      description: "Preserving raw emotion, candid laughs, and timeless vows under Saskatchewan skies.",
      gradientColors: theme === "light" ? ["#ebdcd0", bgStop] : ["#2d2417", bgStop],
    },
    {
      id: 2,
      image: "/landscape/imgi_8_8.jpg",
      title: "Banff Mountain Horizons",
      subtitle: "NATURAL FRONTIERS",
      description: "Misty forests, deep alpine lakes, and dramatic ridgelines in the Canadian Rockies.",
      gradientColors: theme === "light" ? ["#c0e0e6", bgStop] : ["#142a2d", bgStop],
    },
    {
      id: 3,
      image: "/drone/imgi_10_3.jpg",
      title: "Aerial Symmetries",
      subtitle: "PERSPECTIVES FROM ABOVE",
      description: "Cinematic drone compositions capturing geographic textures from a higher perspective.",
      gradientColors: theme === "light" ? ["#c6d9eb", bgStop] : ["#112535", bgStop],
    },
    {
      id: 4,
      image: "/wedding/imgi_6_4.jpg",
      title: "Candid Fine Art Portraits",
      subtitle: "CHARACTER & LIGHT",
      description: "Intimate portrait compositions focusing on natural lighting and genuine emotion.",
      gradientColors: theme === "light" ? ["#e0cad2", bgStop] : ["#331b25", bgStop],
    },
    {
      id: 5,
      image: "/landscape/imgi_7_4.jpg",
      title: "Prairie Forest Woodlands",
      subtitle: "LOCAL NATURE",
      description: "Golden light filtering through local forests and rivers in the heart of Saskatchewan.",
      gradientColors: theme === "light" ? ["#cfdec9", bgStop] : ["#212b1c", bgStop],
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-background border-t border-border overflow-hidden">
      <div className="mb-16 md:mb-20 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            Visual Journal
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
            Cinematic Highlights.
          </ScrollReveal>
        </div>

        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans md:text-right">
          Swipe or scroll through the visual chapters. Watch the ambient background glow transition to match each story.
        </p>
      </div>

      {/* Gradient Carousel */}
      <div className="w-full relative">
        <GradientCarousel items={items} />
      </div>
    </section>
  );
}

export default GradientSlider;
