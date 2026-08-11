"use client";

import Image from "next/image";
import { cinematicBreakImage, cinematicQuote } from "@/lib/data";
import { TextReveal } from "@/components/text-reveal";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function CinematicBreak() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[60vh] md:h-[75vh] overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.2]">
        <Image
          src={cinematicBreakImage}
          alt="Cinematic landscape — golden light"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-black/40" />

      {/* Editorial Quote Overlay */}
      <div className="relative z-10 text-center px-8 max-w-3xl">
        <TextReveal
          as="p"
          className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl italic text-white/90 leading-[1.3] tracking-tight"
          delay={0.2}
          staggerDelay={0.06}
        >
          {cinematicQuote}
        </TextReveal>
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: 40, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="h-px bg-gold mx-auto mt-8"
        />
      </div>
    </section>
  );
}
