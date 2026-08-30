"use client";

import InfiniteMenu from "@/components/ui/InfiniteMenu";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";

export function InteractiveMenu() {
  const menuItems = [
    {
      image: "/review/image.png",
      link: "https://www.instagram.com/msfilms._/",
      title: "Client Review",
      description: "“Hey! We just sat down and watched the highlight video! It turned out awesome! Super well done!” — Verified Client",
    },
    {
      image: "/review/image_copy.png",
      link: "https://www.instagram.com/msfilms._/",
      title: "Client Review",
      description: "“Madhav bhai video looks Amazing! You are really good at your stuff.” — Verified Client",
    },
    {
      image: "/landscape/imgi_8_8.jpg",
      link: "https://www.instagram.com/msfilms._/",
      title: "The Andersons",
      description: "“The photos are absolute works of art. The way they work with natural light and landscapes to create timeless frames is truly spectacular.” — Family Session",
    },
    {
      image: "/drone/imgi_10_3.jpg",
      link: "https://www.instagram.com/msfilms._/",
      title: "Chloe & Ryan",
      description: "“We were blown away by the drone perspectives and candid storytelling. They made us feel so comfortable, and the results speak for themselves.” — Anniversary Session",
    },
  ];

  return (
    <section className="py-24 md:py-36 bg-background border-t border-border overflow-hidden">
      <div className="mb-16 md:mb-20 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            Kind Words
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
            Testimonials.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Click and drag to rotate the 3D showcase. Release to focus on a client's story and read their experience.
        </p>
      </div>

      {/* InfiniteMenu viewport */}
      <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] relative overflow-hidden bg-background border-y border-border">
        <InfiniteMenu items={menuItems} scale={1.0} />
      </div>
    </section>
  );
}

export default InteractiveMenu;
