"use client";

import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { PenLine, Clock, ArrowRight } from "lucide-react";

export function Blog() {
  return (
    <section
      id="blog"
      className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-background border-t border-border overflow-hidden"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <AnimatedText
          as="p"
          className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-6"
        >
          Blog &amp; Stories
        </AnimatedText>

        {/* Heading */}
        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          textClassName="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2]"
          rotationEnd="bottom center+=20%"
          wordAnimationEnd="bottom center+=45%"
        >
          Behind the Lens.
        </ScrollReveal>

        {/* Under Construction Card */}
        <div className="mt-16 md:mt-20 relative mx-auto max-w-lg">
          {/* Decorative border */}
          <div className="absolute inset-0 rounded-2xl border border-gold/10 pointer-events-none" />
          <div className="absolute inset-[6px] rounded-xl border border-foreground/[0.04] pointer-events-none" />

          <div className="relative rounded-2xl bg-foreground/[0.02] shadow-[0_8px_40px_rgba(0,0,0,0.3)] backdrop-blur-sm px-8 py-14 md:px-12 md:py-18 flex flex-col items-center gap-6">
            {/* Icon */}
            <div className="w-14 h-14 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center">
              <PenLine size={22} strokeWidth={1.5} className="text-gold/80" />
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/15 bg-gold/[0.04]">
              <Clock size={12} strokeWidth={1.5} className="text-gold/70" />
              <span className="text-[9px] tracking-[0.2em] uppercase text-gold/80 font-sans font-semibold">
                Under Construction
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display text-xl md:text-2xl text-foreground/90 font-light tracking-wide">
              Coming Soon
            </h3>

            {/* Description */}
            <p className="font-sans text-xs md:text-sm text-foreground/45 max-w-sm leading-relaxed text-center">
              Stories from the field, creative process breakdowns, behind-the-scenes glimpses, and photography tips — all crafted with the same care we bring to every frame.
            </p>

            {/* Divider */}
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            {/* CTA hint */}
            <div className="flex items-center gap-2 text-foreground/30 group cursor-default">
              <span className="text-[10px] tracking-[0.15em] uppercase font-sans">
                Stay Tuned
              </span>
              <ArrowRight size={12} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
