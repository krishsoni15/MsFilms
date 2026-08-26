"use client";

import { motion } from "framer-motion";
import { Award, Film, Star, ShieldCheck, Flame, Compass, Focus } from "lucide-react";

export function TrustStats() {
  const stats = [
    {
      icon: Award,
      value: "6+",
      unit: "Years",
      label: "Experience",
      description: "Refining our craft in cinematic storytelling.",
    },
    {
      icon: Film,
      value: "20+",
      unit: "Projects",
      label: "Delivered",
      description: "Preserving wedding days and milestone films.",
    },
    {
      icon: Star,
      value: "5.0",
      unit: "Rating",
      label: "Client Feedback",
      description: "Trusted, recommended, and 100% rated.",
    },
  ];

  const credentials = [
    { icon: Focus, label: "4K HDR CINEMATOGRAPHY" },
    { icon: Flame, label: "ACES COLOR WORKFLOW" },
    { icon: ShieldCheck, label: "FAA DRONE CERTIFIED" },
    { icon: Compass, label: "SASKATOON CREATIVE GUILD" },
  ];

  return (
    <section className="relative w-full py-16 bg-[#020912] border-t border-b border-white/[0.03] overflow-hidden z-10">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[90%] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-16 relative z-10">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center divide-y md:divide-y-0 md:divide-x divide-white/[0.05] mb-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6 py-6 md:py-2 md:px-8 first:pt-0 last:pb-0 md:first:pl-0 md:last:pr-0"
            >
              {/* Gold Rimmed Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gold/20 bg-gold/5 flex items-center justify-center text-gold shadow-[0_0_15px_rgba(197,168,128,0.08)]">
                <stat.icon size={20} strokeWidth={1.5} />
              </div>

              {/* Text Blocks */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display text-3xl md:text-4xl font-normal text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold/80 font-semibold">
                    {stat.unit}
                  </span>
                </div>
                <span className="text-[11px] tracking-[0.2em] uppercase text-white/70 font-semibold mt-1">
                  {stat.label}
                </span>
                <span className="text-[10px] text-white/40 font-sans mt-0.5 max-w-[200px] leading-relaxed">
                  {stat.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials / Brands Horizontal Bar */}
        <div className="border-t border-white/[0.04] pt-8 overflow-hidden">
          <div className="flex items-center justify-center flex-wrap gap-x-12 gap-y-4 md:gap-x-16">
            {credentials.map((cred, i) => (
              <motion.div
                key={cred.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                whileHover={{ opacity: 0.8 }}
                className="flex items-center gap-2.5 text-white cursor-default transition-opacity duration-300"
              >
                <cred.icon size={13} strokeWidth={2} className="text-gold" />
                <span className="text-[9px] tracking-[0.25em] uppercase font-sans font-semibold">
                  {cred.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustStats;
