"use client";

import { useState } from "react";
import Image from "next/image";
import { services } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

export function Services() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Smooth spring-based cursor follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const activeImage = services.find(s => s.id === hoveredId)?.image;

  return (
    <section id="services" className="py-24 md:py-32 px-5 md:px-10 lg:px-16 bg-background border-t border-foreground/5">
      <div className="mb-12 md:mb-16">
        <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-4">What We Do</AnimatedText>
        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          textClassName="font-display text-3xl md:text-4xl font-normal leading-[1.2]"
          rotationEnd="bottom center+=20%"
          wordAnimationEnd="bottom center+=45%"
        >
          Services
        </ScrollReveal>
      </div>

      {/* Under Construction / Coming Soon Banner */}
      <div className="max-w-4xl mb-12 p-6 md:p-8 rounded-2xl border border-gold/20 bg-foreground/[0.02] backdrop-blur-md relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center text-gold shrink-0">
            <span className="font-mono text-xs font-bold">✦</span>
          </div>
          <div className="text-left">
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold font-bold font-sans">
              Services & Pricing
            </span>
            <h4 className="font-serif text-xl md:text-2xl text-foreground font-normal uppercase mt-0.5">
              Detailed Packages Under Construction — Coming Soon
            </h4>
          </div>
        </div>
        <span className="text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border border-gold/30 text-gold font-mono font-semibold bg-gold/5 shrink-0">
          Under Construction
        </span>
      </div>

      <div
        className="max-w-4xl relative"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mouseX.set(e.clientX - rect.left + 80);
          mouseY.set(e.clientY - rect.top - 150);
        }}
      >
        {services.map((service, i) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="group border-b border-foreground/10 first:border-t"
            onMouseEnter={() => setHoveredId(service.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <a
              href="#contact"
              className="flex items-center justify-between py-6 md:py-7 cursor-pointer relative overflow-hidden block"
            >
              {/* Hover background sweep */}
              <motion.div
                className="absolute inset-0 bg-foreground/[0.02]"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />

              {/* Gold underline sweep on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-gold"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredId === service.id ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              />

              <div className="flex items-center gap-6 md:gap-10 relative z-10">
                <span className="text-[10px] tracking-[0.2em] text-gold/70 font-sans w-5 transition-colors duration-300">{service.id}</span>
                <h3 className="font-serif text-xl md:text-2xl lg:text-3xl group-hover:translate-x-3 transition-transform duration-500 ease-out uppercase tracking-wide">
                  {service.title}
                </h3>
              </div>
              <motion.span
                className="text-foreground/20 text-lg relative z-10"
                animate={{ x: hoveredId === service.id ? 4 : 0, opacity: hoveredId === service.id ? 1 : 0.4 }}
                transition={{ duration: 0.3 }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        ))}

        {/* Floating image near cursor — desktop only */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 2 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block absolute w-[280px] aspect-[3/4] pointer-events-none z-20 overflow-hidden rounded-sm shadow-2xl border border-white/20"
              style={{
                left: springX,
                top: springY,
              }}
            >
              <Image
                src={activeImage}
                alt="Service preview"
                fill
                className="object-cover"
                sizes="280px"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
