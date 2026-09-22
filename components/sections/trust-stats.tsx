"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
      {/* ── Main Stats Row with Seamless Top & Bottom Feathered Blending ── */}
      <div className="relative w-full py-16 md:py-24 overflow-hidden">
        {/* Background Image Layer with Soft Feathered Fade into Top & Bottom Sections */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, transparent 100%)",
          }}
        >
          <Image
            src="/images/trust-stats-bg.png"
            alt="MS Films Cinematic Heritage"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Subtle center vignette to gently lift the text while keeping photo props vibrant */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-transparent" />
        </div>

        {/* Soft, Fading Gold Horizon Accents */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />

        {/* Content Container - Centered in open space between left polaroids and right camera */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 items-center justify-items-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group flex items-center gap-4 md:gap-5 py-2 w-full max-w-[280px] md:max-w-none justify-start md:justify-center"
            >
              {/* Luxury Gold Icon Frame */}
              <div className="flex-shrink-0 w-13 h-13 md:w-14 md:h-14 rounded-full border border-gold/45 bg-gold/15 flex items-center justify-center text-gold group-hover:text-white group-hover:border-gold/75 group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(197,168,128,0.45)] shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-all duration-300 backdrop-blur-sm">
                <stat.icon size={22} strokeWidth={1.5} className="group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Direct Text Blocks */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white tracking-tight drop-shadow-[0_2px_14px_rgba(0,0,0,0.98)]">
                    <CountUp to={stat.value} decimals={stat.decimals} />
                    <span className="text-gold font-light">{stat.suffix}</span>
                  </span>
                  <span className="font-sans text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-gold font-bold drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
                    {stat.unit}
                  </span>
                </div>
                <span className="text-xs uppercase tracking-[0.22em] text-white font-semibold mt-1 font-sans drop-shadow-[0_1px_8px_rgba(0,0,0,0.98)]">
                  {stat.label}
                </span>
                <span className="text-[11px] text-white/85 font-sans mt-0.5 leading-relaxed max-w-[210px] drop-shadow-[0_1px_8px_rgba(0,0,0,0.98)] group-hover:text-white transition-colors duration-300">
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
