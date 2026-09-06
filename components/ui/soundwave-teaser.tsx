"use client";

import { motion } from "framer-motion";

interface SoundwaveTeaserProps {
  isPlaying?: boolean;
  className?: string;
  barCount?: number;
}

export function SoundwaveTeaser({
  isPlaying = true,
  className = "",
  barCount = 5,
}: SoundwaveTeaserProps) {
  const bars = Array.from({ length: barCount });

  return (
    <div className={`flex items-end gap-[3px] h-4 ${className}`} aria-hidden="true">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-[2.5px] bg-gold rounded-full inline-block origin-bottom"
          animate={
            isPlaying
              ? {
                  scaleY: [0.25, 0.9, 0.4, 1.0, 0.3, 0.75][i % 6],
                  height: ["20%", "90%", "45%", "100%", "30%", "80%"],
                }
              : { height: "25%" }
          }
          transition={{
            duration: 0.8 + (i % 3) * 0.25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}
