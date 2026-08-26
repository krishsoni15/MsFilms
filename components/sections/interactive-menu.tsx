"use client";

import InfiniteMenu from "@/components/ui/InfiniteMenu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";

export function InteractiveMenu() {
  const menuItems = [
    {
      image: "/wedding/imgi_7_3.jpg",
      link: "https://www.instagram.com/msfilms._/",
      title: "Wedding Story",
      description: "Preserving Saskatchewan wedding milestones.",
    },
    {
      image: "/landscape/imgi_8_8.jpg",
      link: "https://www.instagram.com/msfilms._/",
      title: "Banff Vistas",
      description: "Misty forests and alpine lake horizons.",
    },
    {
      image: "/drone/imgi_10_3.jpg",
      link: "https://www.instagram.com/msfilms._/",
      title: "Aerial View",
      description: "Cinematic drone perspectives from above.",
    },
    {
      image: "/wedding/imgi_6_4.jpg",
      link: "https://www.instagram.com/msfilms._/",
      title: "Selected Frame",
      description: "Timeless candid romance and portraits.",
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-[#020912] border-t border-white/[0.03] overflow-hidden">
      <div className="mb-16 md:mb-20 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
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
            WebGL Sphere Grid.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Click and drag to rotate the WebGL grid. Release to snap onto a category, and click the arrow button to explore our visual stories.
        </p>
      </div>

      {/* InfiniteMenu viewport */}
      <div className="w-full h-[600px] relative overflow-hidden bg-black/20">
        <InfiniteMenu items={menuItems} scale={1.0} />
      </div>
    </section>
  );
}

export default InteractiveMenu;
