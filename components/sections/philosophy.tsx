"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function Philosophy() {
  return (
    <section className="py-32 md:py-48 px-5 md:px-10 lg:px-16 bg-background-alt border-y border-gold/10 relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[500px] max-h-[500px] rounded-full blur-[100px]" 
          style={{
            background: "radial-gradient(circle, rgba(203,163,88,0.08) 0%, transparent 70%)"
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-6 block">
          Our Philosophy
        </span>
        <div className="h-[1px] w-12 bg-gold/30 mx-auto mb-10" />

        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={2}
          blurStrength={10}
          containerClassName="text-center"
          textClassName="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-normal leading-[1.4] tracking-tight italic"
          rotationEnd="bottom center+=10%"
          wordAnimationEnd="bottom center+=30%"
        >
          When does a man die? When he is hit by a bullet? No! When he suffers a disease?
          No! When he ate a soup made out of a poisonous mushroom?
          No! A man dies when he is forgotten!
        </ScrollReveal>

        <div className="h-[1px] w-12 bg-gold/30 mx-auto mt-10 mb-6" />
        <span className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 font-sans block">
          — Dr. Hiriluk
        </span>
      </div>
    </section>
  );
}
export default Philosophy;
