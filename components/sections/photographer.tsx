"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";
import { Aurora } from "@/components/ui/aurora";
import { useTheme } from "@/components/theme-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutPhotographer() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. Text items stagger reveal
      gsap.fromTo(
        ".reveal-text-item",
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Portraits entrance reveal
      gsap.fromTo(
        ".reveal-image-item",
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      // 3. Viewport Scroll Zoom-In & Zoom-Out Timeline (Zooms IN as section enters view, zooms OUT as section leaves view)
      const zoomTl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        }
      });

      zoomTl
        .fromTo(
          ".image-collage-container",
          { scale: 0.88, opacity: 0.85 },
          { scale: 1.05, opacity: 1, ease: "power1.out" }
        )
        .to(
          ".image-collage-container",
          { scale: 0.88, opacity: 0.85, ease: "power1.in" }
        );

      // 4. Parallax shift on main portrait
      gsap.fromTo(
        ".main-parallax-wrapper",
        { yPercent: 6, scale: 0.96 },
        {
          yPercent: -4,
          scale: 1.02,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 5. Parallax shift on secondary bottom-left portrait
      gsap.fromTo(
        ".secondary-parallax-wrapper",
        { yPercent: 14 },
        {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 6. Parallax shift on tertiary bottom-right portrait
      gsap.fromTo(
        ".tertiary-parallax-wrapper",
        { yPercent: -10 },
        {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );

      // 7. Top-Right Sun Rays subtle ambient drift
      gsap.fromTo(
        ".sun-rays-beam",
        { opacity: 0.12, rotate: 0 },
        {
          opacity: 0.28,
          rotate: 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
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
      className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-background-alt border-t border-foreground/5 relative overflow-hidden"
    >
      {/* ── Top-Right Golden Sun Rays & Volumetric Light Beams (Ultra-Subtle & Soft Ambient Glow) ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden select-none">
        {/* Soft Sun Core Glow on Top Right */}
        <div className="absolute -top-36 -right-36 w-[650px] h-[650px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,225,160,0.30)_0%,rgba(203,163,88,0.14)_35%,rgba(197,168,128,0.03)_65%,transparent_85%)] blur-3xl animate-pulse" style={{ animationDuration: "8s" }} />

        {/* Soft Volumetric Rays (Heavy Blur for Ultra-Smooth Blend) */}
        <div 
          className="sun-rays-beam absolute -top-24 -right-24 w-[1200px] h-[1200px] opacity-20 mix-blend-screen pointer-events-none origin-top-right blur-xl"
          style={{
            background: `conic-gradient(from 200deg at 100% 0%, 
              transparent 0deg, 
              rgba(255,230,160,0.18) 15deg, 
              transparent 28deg, 
              rgba(255,245,200,0.25) 45deg, 
              transparent 60deg, 
              rgba(203,163,88,0.15) 75deg, 
              transparent 95deg)`,
          }}
        />

        {/* Soft Ambient Gold Wash Seamlessly Fading to Transparent */}
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_100%_0%,rgba(255,215,130,0.10)_0%,rgba(197,168,128,0.02)_40%,transparent_75%)]" />
      </div>

      {/* ── Aurora WebGL Background ── */}
      <div className="absolute inset-0 pointer-events-none opacity-75 z-0 select-none bg-[radial-gradient(circle_at_85%_25%,rgba(203,163,88,0.08)_0%,transparent_60%)]">
        <Aurora
          colorStops={theme === "light" ? ["var(--gold-light)", "var(--gold)", "var(--background-alt)"] : ["var(--accent)", "var(--gold)", "var(--gold-light)"]}
          blend={isMobile ? 0.6 : 0.75}
          amplitude={isMobile ? 0.8 : 1.2}
          speed={0.6}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center max-w-7xl mx-auto relative z-10">

        {/* Left Column — Editorial Text & Philosophy */}
        <div className="lg:col-span-6 lg:pr-6 order-2 lg:order-1 photographer-text-column">
          <div className="reveal-text-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-4 shadow-sm">
            <Sparkles size={12} className="text-gold animate-pulse" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold font-sans">
              The Visualist
            </span>
          </div>

          <ScrollReveal
            baseOpacity={0.05}
            preset="blur"
            blurStrength={6}
            textClassName="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-4 text-foreground font-normal"
            rotationEnd="bottom center+=20%"
            wordAnimationEnd="bottom center+=45%"
          >
            Madhav Soni
          </ScrollReveal>

          <p className="reveal-text-item text-[10px] tracking-[0.2em] uppercase text-foreground/40 mb-8 font-sans font-medium">
            Founder &amp; Lead Visualist · Based in Saskatoon · Serving All Canada
          </p>

          <div className="reveal-text-item space-y-5 font-sans text-sm md:text-base text-foreground/70 leading-relaxed max-w-lg mb-8">
            <p className="font-serif italic text-lg text-gold/90">
              &ldquo;Hey, I&apos;m Madhav, the visualist behind the lens.&rdquo;
            </p>
            <p>
              Welcome to MS Films! Driven by a passion for raw emotions and cinematic precision, I specialize in capturing Saskatoon&apos;s and Canada&apos;s most meaningful wedding celebrations and commercial productions.
            </p>
            <p>
              I believe the best visual stories are told through quiet, candid moments. By blending artistic direction with a relaxed, comfortable atmosphere, my goal is to help you feel naturally confident in front of the lens while we preserve the memories that shape your life.
            </p>
          </div>

          {/* Key highlights */}
          <div className="reveal-text-item mb-10 font-sans max-w-lg">
            <p className="text-[11px] tracking-[0.2em] uppercase text-gold/80 font-semibold mb-4">
              Why Work With Madhav?
            </p>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3.5 bg-foreground/[0.02] border border-border rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
                <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span className="text-[10px] md:text-[11px] text-foreground/80 tracking-[0.15em] uppercase font-semibold">6+ Years of Industry Experience</span>
              </div>
              <div className="flex items-center gap-3.5 bg-foreground/[0.02] border border-border rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
                <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span className="text-[10px] md:text-[11px] text-foreground/80 tracking-[0.15em] uppercase font-semibold">Cinema &amp; Photography Combined</span>
              </div>
              <div className="flex items-center gap-3.5 bg-foreground/[0.02] border border-border rounded-xl p-3.5 pr-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 group">
                <div className="w-6 h-6 rounded-full border border-gold/45 flex items-center justify-center text-gold bg-gold/5 flex-shrink-0 shadow-[0_0_10px_rgba(197,168,128,0.1)] transition-transform duration-300 group-hover:scale-105">
                  <Check size={11} strokeWidth={3.5} />
                </div>
                <span className="text-[10px] md:text-[11px] text-foreground/80 tracking-[0.15em] uppercase font-semibold">Collaborative, Client-Focused Process</span>
              </div>
            </div>
          </div>

          <div className="reveal-text-item relative inline-block">
            <BorderGlow
              edgeSensitivity={20}
              glowColor="35 85 75"
              backgroundColor="transparent"
              borderRadius={9999}
              glowRadius={30}
              glowIntensity={0.3}
              coneSpread={25}
              animated={false}
              colors={["var(--gold)", "var(--gold-light)", "var(--white)"]}
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

        {/* Right Column — Editorial Dual Photo Layout with Scroll Zoom Magnification */}
        <div className="lg:col-span-6 relative order-1 lg:order-2 image-collage-container origin-center">
          {/* Main Portrait */}
          <div className="reveal-image-item relative aspect-[4/5] w-full max-w-lg overflow-hidden group shadow-2xl rounded-2xl ml-auto main-parallax-wrapper">
            <BorderGlow
              borderRadius={16}
              backgroundColor="transparent"
              glowColor="35 85 75"
              glowRadius={45}
              glowIntensity={1.5}
              edgeSensitivity={20}
              coneSpread={25}
              colors={["var(--gold)", "var(--gold-light)", "var(--white)"]}
              fillOpacity={0.08}
              className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
              style={{
                borderRadius: "16px",
                borderColor: "rgba(197, 168, 128, 0.2)",
                boxShadow: "none",
              }}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <Image
                  src="/me/imgi_36_625043456_18087932393515848_4263036374454868947_n.jpg"
                  alt="Madhav Soni — Founder & Lead Photographer of MS Films"
                  fill
                  priority={true}
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.4s] ease-out group-hover:scale-108"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-2 border border-gold/15 pointer-events-none z-20 rounded-lg" />
                <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md border border-gold/30 px-3 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase text-white/90 font-sans z-20 shadow-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span>Madhav Soni · Lead Visualist</span>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Overlapping secondary image — parallax floating on bottom-left */}
          <div className="reveal-image-item hidden sm:block absolute -bottom-8 -left-6 lg:-left-12 w-[44%] aspect-[3/4] shadow-2xl rounded-2xl group/sub overflow-visible z-20 secondary-parallax-wrapper">
            <div className="floating-portrait w-full h-full relative rounded-[inherit] overflow-hidden">
              <BorderGlow
                borderRadius={16}
                backgroundColor="transparent"
                glowColor="35 85 75"
                glowRadius={45}
                glowIntensity={1.5}
                edgeSensitivity={20}
                coneSpread={25}
                colors={["var(--gold)", "var(--gold-light)", "var(--white)"]}
                fillOpacity={0.08}
                className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
                style={{
                  borderRadius: "16px",
                  borderColor: "rgba(197, 168, 128, 0.2)",
                  boxShadow: "none",
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <Image
                    src="/me/imgi_85_622505371_18140539135468400_2765037163092247242_n.jpg"
                    alt="Madhav Soni on location behind the lens"
                    fill
                    className="object-cover transition-transform duration-[1.8s] ease-out group-hover/sub:scale-110"
                    sizes="30vw"
                  />
                  <div className="absolute inset-2 border border-gold/15 pointer-events-none z-20 rounded-lg" />
                  <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md border border-gold/30 px-3 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase text-white/90 font-sans z-20 shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span>On Location Cinema</span>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </div>

          {/* Overlapping third image — parallax floating on bottom-right */}
          <div className="reveal-image-item hidden sm:block absolute -bottom-12 -right-6 lg:-right-10 w-[45%] aspect-[16/10] shadow-2xl rounded-2xl group/sub2 overflow-visible z-20 tertiary-parallax-wrapper">
            <div className="floating-portrait-delayed w-full h-full relative rounded-[inherit] overflow-hidden">
              <BorderGlow
                borderRadius={16}
                backgroundColor="transparent"
                glowColor="35 85 75"
                glowRadius={45}
                glowIntensity={1.5}
                edgeSensitivity={20}
                coneSpread={25}
                colors={["var(--gold)", "var(--gold-light)", "var(--white)"]}
                fillOpacity={0.08}
                className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
                style={{
                  borderRadius: "16px",
                  borderColor: "rgba(197, 168, 128, 0.2)",
                  boxShadow: "none",
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-2xl">
                  <Image
                    src="/me/013A5316.jpg"
                    alt="Madhav Soni — Media Production"
                    fill
                    className="object-cover transition-transform duration-[1.8s] ease-out group-hover/sub2:scale-110"
                    sizes="25vw"
                  />
                  <div className="absolute inset-2 border border-gold/15 pointer-events-none z-20 rounded-lg" />
                  <div className="absolute bottom-3 left-3 bg-black/65 backdrop-blur-md border border-gold/30 px-3 py-1.5 rounded-full text-[9px] tracking-[0.2em] uppercase text-white/90 font-sans z-20 shadow-lg flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span>Canada-Wide Media</span>
                  </div>
                </div>
              </BorderGlow>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutPhotographer;
