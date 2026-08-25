"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

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

      // Animate portraits entrance
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

      // Parallax scroll glide effect on the floating secondary image
      gsap.fromTo(
        ".floating-portrait",
        { y: 35 },
        {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          }
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
            Madhav Soni
          </ScrollReveal>

          <p className="reveal-text-item text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-8 font-sans opacity-0">
            Founder & Lead Visualist
          </p>

          <div className="reveal-text-item space-y-5 font-sans text-sm md:text-base text-foreground/60 leading-relaxed max-w-lg mb-8 opacity-0">
            <p className="font-serif italic text-lg text-gold/90">
              &ldquo;Hey, I&apos;m Madhav, the visualist behind the lens.&rdquo;
            </p>
            <p>
              Welcome to Msfilms! Driven by a passion for raw emotions and cinematic precision, I specialize in capturing Saskatoon&apos;s most beautiful wedding days and milestone celebrations.
            </p>
            <p>
              I believe the best visual stories are told through quiet, candid moments. By blending artistic direction with a relaxed, comfortable atmosphere, my goal is to help you feel naturally confident in front of the lens while we preserve the memories that shape your life.
            </p>
          </div>

          {/* Key highlights (Why Msfilms?) */}
          <div className="reveal-text-item mb-10 opacity-0 font-sans max-w-lg">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold/80 font-semibold mb-4">
              Why Collaborate With Us?
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
                <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span className="text-[10px] md:text-[11px] text-white/80 tracking-[0.15em] uppercase font-semibold">6+ Years of Industry Experience</span>
              </div>
              <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
                <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span className="text-[10px] md:text-[11px] text-white/80 tracking-[0.15em] uppercase font-semibold">Cinema & Photography Combined</span>
              </div>
              <div className="flex items-center gap-3.5 bg-white/[0.02] border border-white/[0.05] rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
                <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span className="text-[10px] md:text-[11px] text-white/80 tracking-[0.15em] uppercase font-semibold">Collaborative, Client-Focused Process</span>
              </div>
            </div>
          </div>

          <div className="reveal-text-item opacity-0 relative inline-block">
            <BorderGlow
              edgeSensitivity={20}
              glowColor="35 85 75"
              backgroundColor="transparent"
              borderRadius={9999}
              glowRadius={30}
              glowIntensity={0.3}
              coneSpread={25}
              animated={false}
              colors={["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={0}
              style={{
                borderColor: "transparent",
              }}
            >
              <Link
                href="#contact"
                className="relative text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full px-7 py-3.5 text-white/80 border border-white/10 hover:border-gold/30 hover:text-white transition-all duration-300 font-sans focus:outline-none"
                style={{
                  background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.01) 100%)",
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
                  style={{
                    background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.2) 0%, rgba(197, 168, 128, 0.05) 100%)",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2.5">
                  Connect With Me
                  <ArrowRight size={13} className="transform group-hover:translate-x-1 transition-transform duration-300 text-current" />
                </span>
              </Link>
            </BorderGlow>
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
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.4s] ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
            <div className="absolute inset-2 border border-gold/10 pointer-events-none z-20" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </div>

          {/* Overlapping secondary image — parallax floating */}
          <div className="reveal-image-item hidden sm:block absolute -bottom-10 -left-4 lg:-left-8 w-[48%] aspect-[3/4] shadow-2xl border border-gold/15 rounded-2xl group/sub opacity-0 overflow-visible">
            <div className="floating-portrait w-full h-full relative rounded-[inherit] overflow-hidden">
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

      </div>
    </section>
  );
}

export default AboutPhotographer;
