"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface TestimonialItem {
  id: string | number;
  quote: string;
  name: string;
  event: string;
  rating?: number;
  isReal?: boolean;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote: "Hey! We just sat down and watched the highlight video! It turned out awesome! Super well done!",
    name: "Ryan & Kelsey",
    event: "Wedding Highlight Film",
    rating: 5,
    isReal: true,
  },
  {
    id: 2,
    quote: "Video is great man. You captured a lot of great moments. I love how the moments you caught of me, Morgan and my friends being silly. Morgan loves the close ups of the items she made for the wedding.",
    name: "Austin & Morgan",
    event: "Wedding Cinematic Feature",
    rating: 5,
    isReal: true,
  },
  {
    id: 3,
    quote: "Madhav bhai video looks Amazing ❤️ You are really good at your stuff ❤️ 🙏",
    name: "KM Realtor",
    event: "Brand Showcase Video",
    rating: 5,
    isReal: true,
  },
  {
    id: 4,
    quote: "The cinematography was absolute cinema! Our family keeps watching the teaser on repeat. Truly the best decision we made for our wedding.",
    name: "Rohan & Pooja",
    event: "Wedding Film Teaser",
    rating: 5,
  },
  {
    id: 5,
    quote: "The editing, the music selection, the sound design—everything was perfect. You brought our special day back to life.",
    name: "Jessica & David",
    event: "Wedding Feature",
    rating: 5,
  },
  {
    id: 6,
    quote: "Absolutely breathtaking films. They managed to capture the quiet, intimate moments just as beautifully as the grand highlights.",
    name: "Sarah & Marcus",
    event: "Wedding Cinematic Teaser",
    rating: 5,
    isReal: true,
  },
];

const CLONED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

export const TestimonialCard = ({ item, className }: { item: TestimonialItem; className?: string }) => {
  return (
    <div className={cn("w-[290px] sm:w-[350px] md:w-[420px] bg-gradient-to-br from-background-alt/80 to-background-alt/40 border border-border/40 backdrop-blur-md p-6 md:p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-gold/30 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(197,168,128,0.05),inset_0_1px_1px_rgba(255,255,255,0.05)] group shrink-0 select-none", className)}>
      <div>
        {/* Card Header: Rating Stars & Quote Icon */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {[...Array(item.rating || 5)].map((_, i) => (
              <svg
                key={i}
                className="w-3.5 h-3.5 fill-gold stroke-gold filter drop-shadow-[0_0_3px_rgba(197,168,128,0.4)]"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-gold/25 font-display text-4xl select-none leading-none pointer-events-none transition-colors duration-300 group-hover:text-gold/45">&ldquo;</span>
        </div>

        {/* Card Body: Quote text */}
        <p className="font-serif text-[15px] sm:text-base md:text-lg text-foreground/80 leading-relaxed italic mb-6">
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>

      {/* Card Footer: Client Info */}
      <div className="border-t border-border/30 pt-4 flex items-center justify-between">
        <div>
          <h5 className="font-sans text-xs tracking-wider uppercase text-foreground/90 font-bold group-hover:text-foreground transition-colors duration-300">
            {item.name}
          </h5>
          <span className="font-sans text-[9px] tracking-widest uppercase text-gold/80 block mt-0.5">
            {item.event}
          </span>
        </div>
        {item.isReal && (
          <span className="text-[8px] tracking-widest uppercase px-2 py-0.5 rounded-full border border-gold/20 text-gold/80 bg-gold/5 font-mono select-none">
            Verified
          </span>
        )}
      </div>
    </div>
  );
};

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const isInteractingRef = useRef(false);
  const scrollAnimRef = useRef<number | null>(null);

  // Position the track to the middle set of elements on mount
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Use a tiny timeout to ensure layout width and metrics are calculated
    const timer = setTimeout(() => {
      const cardWidth = container.clientWidth < 640 ? 314 : container.clientWidth < 768 ? 374 : 444;
      container.scrollLeft = cardWidth * TESTIMONIALS.length;
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Recalculate scroll alignment on window resize to prevent alignment drift
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleResize = () => {
      const cardWidth = container.clientWidth < 640 ? 314 : container.clientWidth < 768 ? 374 : 444;
      container.scrollLeft = cardWidth * TESTIMONIALS.length;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Continuous Autoplay scroll animation
  useEffect(() => {
    let animationFrameId: number;
    const container = scrollRef.current;
    if (!container) return;

    const animate = () => {
      if (!isHovered && !isInteractingRef.current) {
        container.scrollLeft += 0.8; // scroll speed in pixels per frame
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (scrollAnimRef.current) {
        cancelAnimationFrame(scrollAnimRef.current);
      }
    };
  }, [isHovered]);

  // Infinite wrapping bounds checking
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cardWidth = container.clientWidth < 640 ? 314 : container.clientWidth < 768 ? 374 : 444;
    const totalWidth = TESTIMONIALS.length * cardWidth;
    const currentScroll = container.scrollLeft;

    // Wrap around boundaries:
    // Left boundary: we scrolled into Set 1, jump forward to Set 2
    if (currentScroll < totalWidth - container.clientWidth / 2) {
      container.scrollLeft = currentScroll + totalWidth;
    }
    // Right boundary: we scrolled into Set 3, jump backward to Set 2
    else if (currentScroll > totalWidth * 2 - container.clientWidth / 2) {
      container.scrollLeft = currentScroll - totalWidth;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    isInteractingRef.current = true;
    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const container = scrollRef.current;
    if (!container) return;
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    isInteractingRef.current = false;
  };

  const handleTouchStart = () => {
    isInteractingRef.current = true;
  };

  const handleTouchEnd = () => {
    isInteractingRef.current = false;
  };

  // Programmatic smooth scroll to prevent conflicts with native smooth-scroll rendering engine
  const animateScrollTo = (targetScrollLeft: number, duration: number = 400) => {
    const container = scrollRef.current;
    if (!container) return;

    const start = container.scrollLeft;
    const change = targetScrollLeft - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentScroll = start + change * ease;
      
      const cardWidth = container.clientWidth < 640 ? 314 : container.clientWidth < 768 ? 374 : 444;
      const totalWidth = TESTIMONIALS.length * cardWidth;
      
      let wrappedScroll = currentScroll;
      if (currentScroll < totalWidth - container.clientWidth / 2) {
        wrappedScroll = currentScroll + totalWidth;
      } else if (currentScroll > totalWidth * 2 - container.clientWidth / 2) {
        wrappedScroll = currentScroll - totalWidth;
      }
      
      container.scrollLeft = wrappedScroll;

      if (progress < 1) {
        scrollAnimRef.current = requestAnimationFrame(animate);
      } else {
        isInteractingRef.current = false;
      }
    };

    if (scrollAnimRef.current) {
      cancelAnimationFrame(scrollAnimRef.current);
    }
    scrollAnimRef.current = requestAnimationFrame(animate);
  };

  const handlePrev = () => {
    const container = scrollRef.current;
    if (!container) return;
    isInteractingRef.current = true;
    const cardWidth = container.clientWidth < 640 ? 314 : container.clientWidth < 768 ? 374 : 444;
    animateScrollTo(container.scrollLeft - cardWidth);
  };

  const handleNext = () => {
    const container = scrollRef.current;
    if (!container) return;
    isInteractingRef.current = true;
    const cardWidth = container.clientWidth < 640 ? 314 : container.clientWidth < 768 ? 374 : 444;
    animateScrollTo(container.scrollLeft + cardWidth);
  };

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-background border-t border-foreground/5 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gold/5 blur-[100px] pointer-events-none select-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gold/5 blur-[100px] pointer-events-none select-none" />

      {/* Styled custom mask styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scroll-mask {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `,
        }}
      />

      <div className="px-5 md:px-10 lg:px-16 mb-12 md:mb-16 flex items-end justify-between">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-4">
            Client Stories
          </AnimatedText>
          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            baseRotation={2}
            blurStrength={8}
            textClassName="font-display text-3xl md:text-4xl font-normal leading-[1.2]"
            rotationEnd="bottom center+=20%"
            wordAnimationEnd="bottom center+=45%"
          >
            Kind Words
          </ScrollReveal>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3 select-none">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-border bg-foreground/[0.02] flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold/45 hover:bg-gold/5 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonials"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-border bg-foreground/[0.02] flex items-center justify-center text-foreground/70 hover:text-gold hover:border-gold/45 hover:bg-gold/5 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Next testimonials"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Horizontally Scrollable & Draggable Track */}
      <div 
        className="w-full overflow-hidden scroll-mask relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "flex overflow-x-auto scrollbar-none py-4 px-5 md:px-10 lg:px-16 select-none",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
          style={{ scrollBehavior: isDragging ? "auto" : "smooth" }}
        >
          {CLONED_TESTIMONIALS.map((item, index) => (
            <div key={`${item.id}-${index}`} className="pr-6 shrink-0">
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
