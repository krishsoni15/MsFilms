"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Film, Star } from "lucide-react";

interface CountUpProps {
  to: number;
  duration?: number;
  decimals?: number;
}

function CountUp({ to, duration = 1.4, decimals = 0 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = startValue + easeProgress * (to - startValue);
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, to, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
    </span>
  );
}

export function TrustStats() {
  const stats = [
    {
      icon: Award,
      value: 6,
      decimals: 0,
      suffix: "+",
      unit: "Years",
      label: "Experience",
      description: "Refining our craft in cinematic storytelling and photography.",
    },
    {
      icon: Film,
      value: 50,
      decimals: 0,
      suffix: "+",
      unit: "Projects",
      label: "Delivered",
      description: "Preserving Saskatoon's most beautiful milestone stories.",
    },
    {
      icon: Star,
      value: 5.0,
      decimals: 1,
      suffix: "",
      unit: "Rating",
      label: "Client Feedback",
      description: "Highly recommended for trusted, professional production.",
    },
  ];



  return (
    <section className="relative w-full bg-background overflow-hidden z-10">
      {/* ── Background Aura Glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-gold/5 blur-[120px] pointer-events-none dark:mix-blend-screen mix-blend-normal animate-pulse" />

      {/* Main Stats Row (Full-width Horizontal Glass Bar) */}
      <div className="relative w-full border-t border-b border-border bg-foreground/[0.01] backdrop-blur-md py-12 md:py-16 shadow-[0_12px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.8)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/[0.01] to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 items-center md:divide-x divide-border">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center justify-start md:justify-center gap-6 px-4 md:px-8 py-2"
            >
              {/* Gold Rimmed Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold group-hover:text-white group-hover:border-gold/50 group-hover:bg-gold/10 shadow-[0_0_15px_rgba(197,168,128,0.06)] transition-all duration-300">
                <stat.icon size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Text Blocks */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl md:text-4xl font-normal text-white tracking-tight">
                    <CountUp to={stat.value} decimals={stat.decimals} />
                    {stat.suffix}
                  </span>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold/80 font-bold">
                    {stat.unit}
                  </span>
                </div>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/70 font-semibold mt-0.5">
                  {stat.label}
                </span>
                <span className="text-[10px] text-white/40 font-sans mt-0.5 max-w-[220px] leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  {stat.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStats;
