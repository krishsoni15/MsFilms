"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatedText } from "@/components/animated-text";
import { motion, AnimatePresence } from "framer-motion";

// ─────────────────────────────────────────────────
// Replace these with REAL testimonials before publishing.
// ─────────────────────────────────────────────────
const testimonials = [
  {
    quote: "They captured moments we didn't even know were happening. Every single photograph feels like a memory we'll hold forever.",
    name: "[Client Name]",
    event: "[Event Type]",
    isPlaceholder: true,
  },
  {
    quote: "Working with Msfilms felt personal and professional from the very first conversation. The final images exceeded everything we imagined.",
    name: "[Client Name]",
    event: "[Event Type]",
    isPlaceholder: true,
  },
  {
    quote: "Our wedding film brought us to tears. They captured the energy, the emotion, and the love in a way we never thought possible.",
    name: "[Client Name]",
    event: "[Event Type]",
    isPlaceholder: true,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <section
      className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-foreground text-background relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Large gold quotation mark */}
      <div className="absolute top-16 left-8 md:left-16 text-gold/10 font-display text-[200px] md:text-[300px] leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatedText as="div" className="mb-16 md:mb-20">
          <p className="text-[10px] tracking-[0.25em] uppercase text-background/30 mb-4">Kind Words</p>
          <h2 className="font-display text-3xl md:text-4xl text-background/90">
            Real stories from <em className="text-background/50 italic">real clients.</em>
          </h2>
        </AnimatedText>

        {/* Testimonial carousel with crossfade */}
        <div className="relative min-h-[200px] md:min-h-[240px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-relaxed text-background/70 italic mb-10">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm text-background/50 uppercase tracking-wider">{t.name}</p>
                <p className="text-[10px] text-background/25 uppercase tracking-widest mt-1">{t.event}</p>
              </div>
              {/* Placeholder notice — only visible to dev/owner */}
              {t.isPlaceholder && (
                <p className="text-[8px] text-background/8 mt-6 uppercase tracking-widest select-none">
                  placeholder — replace before publishing
                </p>
              )}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center gap-3 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-500 rounded-full ${
                i === current
                  ? "w-8 h-2 bg-gold"
                  : "w-2 h-2 bg-background/20 hover:bg-background/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
          <span className="ml-4 text-[10px] tracking-[0.15em] text-background/20 font-sans">
            {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
