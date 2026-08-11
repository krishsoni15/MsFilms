"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { aboutImage, aboutSecondaryImage, siteData } from "@/lib/data";
import { TextReveal } from "@/components/text-reveal";
import { AnimatedText } from "@/components/animated-text";
import { Magnetic } from "@/components/ui/magnetic";
import { motion, useScroll, useTransform } from "framer-motion";

export function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const secondaryY = useTransform(scrollYProgress, [0, 1], ["30px", "-60px"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-background relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center max-w-7xl mx-auto">
        {/* Left Column — Editorial Dual Photo Layout */}
        <div className="lg:col-span-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-[4/5] w-full max-w-lg overflow-hidden group shadow-2xl rounded-sm"
          >
            <motion.div style={{ scale: imageScale }} className="absolute inset-0">
              <Image
                src={aboutImage}
                alt="Behind the lens — Msfilms photographer capturing an intimate moment"
                fill
                priority
                className="object-cover transition-transform duration-[1.8s] ease-out group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
          </motion.div>

          {/* Overlapping secondary image — parallax floating */}
          <motion.div
            style={{ y: secondaryY }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block absolute -bottom-10 -right-4 lg:-right-8 w-[48%] aspect-[3/4] overflow-hidden shadow-2xl border-4 border-background group/sub"
          >
            <Image
              src={aboutSecondaryImage}
              alt="Emotional detail shot"
              fill
              className="object-cover transition-transform duration-[1.8s] ease-out group-hover/sub:scale-110"
              sizes="30vw"
            />
            <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-3 py-1.5 text-[9px] tracking-[0.2em] uppercase text-white/80">
              Saskatoon Studio
            </div>
          </motion.div>
        </div>

        {/* Right Column — Editorial Text & Philosophy */}
        <div className="lg:col-span-6 lg:pl-6">
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-4">
            {siteData.aboutHeadline}
          </AnimatedText>

          <TextReveal as="h2" delay={0.1} className="font-display text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-8 text-foreground">
            {"Crafting Memories That Last a Lifetime"}
          </TextReveal>

          <AnimatedText as="div" delay={0.3} className="space-y-5 font-sans text-sm md:text-base text-foreground/60 leading-relaxed max-w-lg mb-10">
            <p>{siteData.aboutText}</p>
          </AnimatedText>

          <AnimatedText as="div" delay={0.5}>
            <Magnetic strength={0.25}>
              <Link
                href="#contact"
                className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase border border-foreground/20 px-8 py-4 text-foreground hover:bg-foreground hover:text-background transition-all duration-500 group"
              >
                Learn Our Process
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>
            </Magnetic>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
