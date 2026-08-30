"use client";

import Masonry from "@/components/ui/Masonry";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";

export function WorkGallery() {
  const galleryItems = [
    {
      id: "g1",
      img: "/wedding/imgi_7_3.jpg",
      url: "https://www.instagram.com/msfilms._/",
      height: 700,
    },
    {
      id: "g2",
      img: "/landscape/imgi_8_8.jpg",
      url: "https://www.instagram.com/msfilms._/",
      height: 580,
    },
    {
      id: "g3",
      img: "/drone/imgi_10_3.jpg",
      url: "https://www.instagram.com/msfilms._/",
      height: 480,
    },
    {
      id: "g4",
      img: "/wedding/imgi_6_4.jpg",
      url: "https://www.instagram.com/msfilms._/",
      height: 640,
    },
    {
      id: "g5",
      img: "/landscape/imgi_7_4.jpg",
      url: "https://www.instagram.com/msfilms._/",
      height: 520,
    },
    {
      id: "g6",
      img: "/drone/imgi_12_9.jpg",
      url: "https://www.instagram.com/msfilms._/",
      height: 680,
    },
    {
      id: "g7",
      img: "/wedding/imgi_4_7 (1).jpg",
      url: "https://www.instagram.com/msfilms._/",
      height: 560,
    },
    {
      id: "g8",
      img: "/landscape/imgi_10_6.jpg",
      url: "https://www.instagram.com/msfilms._/",
      height: 600,
    },
  ];

  return (
    <section className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-background border-t border-border">
      <div className="mb-16 md:mb-20 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            Creative Portfolio
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
            A mosaic of captured moments.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Click on any image to explore our full social journal and behind-the-scenes stories on Instagram.
        </p>
      </div>

      {/* Masonry Grid wrapper */}
      <div className="max-w-7xl mx-auto w-full relative min-h-[500px]">
        <Masonry
          items={galleryItems}
          ease="power3.out"
          duration={0.7}
          stagger={0.04}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.97}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </div>
    </section>
  );
}

export default WorkGallery;
