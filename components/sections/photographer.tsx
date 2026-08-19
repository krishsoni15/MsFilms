"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutPhotographer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Animate text column items
      gsap.fromTo(
        ".reveal-text-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate portraits
      gsap.fromTo(
        ".reveal-image-item",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-[#030c16] border-t border-foreground/5 relative overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center max-w-7xl mx-auto">
        
        {/* Left Column — Editorial Text & Philosophy */}
        <div className="lg:col-span-6 lg:pr-6 order-2 lg:order-1">
          <p className="reveal-text-item text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4 opacity-0">
            The Creative
          </p>

          <ScrollReveal
            baseOpacity={0.05}
            preset="slide"
            yOffset={18}
            textClassName="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-4 text-foreground font-normal"
            rotationEnd="bottom center+=20%"
            wordAnimationEnd="bottom center+=45%"
          >
            Meet Madhav Soni
          </ScrollReveal>

          <p className="reveal-text-item text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-8 font-sans opacity-0">
            Founder & Lead Visualist
          </p>

          <div className="reveal-text-item space-y-5 font-sans text-sm md:text-base text-foreground/60 leading-relaxed max-w-lg mb-10 opacity-0">
            <p>
              Driven by a deep passion for visual storytelling and a meticulous eye for cinematic detail, Madhav founded Msfilms to capture life&apos;s raw, unscripted emotions. He believes that the best photographs are not just staged poses, but the silent, candid moments that tell the true story of how it felt.
            </p>
            <p>
              For Madhav, photography and filmmaking are not just professions — they are a lifelong dedication to preserving the moments that shape our lives. With a keen artistic eye, he captures the subtle details, the quiet glances, and the raw emotions of your most meaningful days, translating them into timeless visual legacies.
            </p>
          </div>

          <div className="reveal-text-item opacity-0">
              <Link
                href="#contact"
                className="relative inline-flex items-center gap-3 text-[12px] tracking-[0.25em] uppercase border border-gold/40 px-9 py-4 text-foreground hover:text-[#061a2b] overflow-hidden group transition-colors duration-500 hover:border-gold"
              >
                <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] pointer-events-none" />
                <span className="relative z-10 flex items-center gap-3">
                  Let&apos;s Capture Your Story
                  <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </Link>
          </div>
        </div>

        {/* Right Column — Editorial Dual Photo Layout */}
        <div className="lg:col-span-6 relative order-1 lg:order-2">
          <div className="reveal-image-item relative aspect-[4/5] w-full max-w-lg overflow-hidden group shadow-2xl rounded-2xl border border-gold/15 ml-auto opacity-0">
            <div className="absolute inset-0">
              <Image
                src="/me/imgi_36_625043456_18087932393515848_4263036374454868947_n.jpg"
                alt="Madhav Soni — Founder & Lead Photographer of Msfilms"
                fill
                className="object-cover grayscale transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute inset-2 border border-gold/10 pointer-events-none z-20" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>

          {/* Overlapping secondary image — parallax floating */}
          <div className="reveal-image-item hidden sm:block absolute -bottom-10 -left-4 lg:-left-8 w-[48%] aspect-[3/4] overflow-hidden shadow-2xl border border-gold/15 rounded-2xl group/sub opacity-0">
            <Image
              src="/me/imgi_85_622505371_18140539135468400_2765037163092247242_n.jpg"
              alt="Madhav Soni in action behind the lens"
              fill
              className="object-cover transition-transform duration-[1.8s] ease-out group-hover/sub:scale-110"
              sizes="30vw"
            />
            <div className="absolute inset-2 border border-gold/10 pointer-events-none z-20" />
            <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase text-white/80 z-20">
              Madhav Soni
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutPhotographer;
