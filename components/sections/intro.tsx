"use client";

import Image from "next/image";
import { visualIntroImage } from "@/lib/data";
import { TextReveal } from "@/components/text-reveal";
import { AnimatedText } from "@/components/animated-text";
import { motion } from "framer-motion";
import BorderGlow from "@/components/ui/border-glow";

export function BrandStatement() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-10 lg:px-16 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-7xl">
        {/* Text — Left */}
        <div className="lg:col-span-5">
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-8">
            The Way We See It
          </AnimatedText>

          <TextReveal
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] text-foreground mb-4"
            delay={0.1}
          >
            {"We don't just photograph\nwhat happened."}
          </TextReveal>

          {/* Gold divider */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gold my-6"
          />

          <TextReveal
            as="h2"
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.15] text-foreground/60 italic mb-10"
            delay={0.3}
          >
            {"We preserve\nhow it felt."}
          </TextReveal>

          <AnimatedText as="p" delay={0.4} className="font-sans text-sm md:text-base text-foreground/50 max-w-md leading-relaxed">
            Every photograph we create is rooted in real emotion — the nervous laughter, the quiet glance, the hand you reached for without thinking.
          </AnimatedText>
        </div>

        {/* Image — Right */}
        <div className="lg:col-span-6 lg:col-start-7">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden group rounded-2xl"
          >
            <BorderGlow
              borderRadius={16}
              backgroundColor="transparent"
              glowColor="35 85 75"
              glowRadius={45}
              glowIntensity={1.5}
              edgeSensitivity={20}
              coneSpread={25}
              colors={["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={0.08}
              className="absolute inset-0 w-full h-full z-10 pointer-events-auto"
              style={{
                borderRadius: "16px",
                borderColor: "rgba(197, 168, 128, 0.2)",
                boxShadow: "none",
              }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={visualIntroImage}
                  alt="Intimate wedding moment captured between poses"
                  fill
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                {/* Fine inside border */}
                <div className="absolute inset-2 border border-gold/10 pointer-events-none z-20 rounded-lg" />
              </div>
            </BorderGlow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
