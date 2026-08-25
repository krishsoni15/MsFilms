"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import BorderGlow from "@/components/ui/border-glow";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020912] flex flex-col items-center justify-center relative px-6 select-none overflow-hidden">
      {/* Cinematic grid backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.01)_0%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.003)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" />

      {/* Viewfinder corner lines */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t border-l border-white/10 pointer-events-none" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t border-r border-white/10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b border-l border-white/10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b border-r border-white/10 pointer-events-none" />

      {/* Main Content Layout */}
      <div className="flex flex-col items-center text-center z-10 max-w-md">
        {/* Sharp, Premium 404 Heading on Top */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <h1 className="text-[clamp(6rem,16vw,11rem)] font-sans font-black tracking-tight select-none leading-none bg-gradient-to-b from-[#ffffff] via-[#c5a880] to-[#8a7250] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(197,168,128,0.22)]">
            404
          </h1>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 mb-8"
        >
          <h2 className="font-laluxes-serif text-3xl sm:text-4xl text-foreground tracking-wide font-normal">
            Lost in Transition
          </h2>
          <div className="w-10 h-[1px] bg-gold/30" />
          <p className="font-sans text-[12px] sm:text-[13px] text-foreground/45 leading-relaxed tracking-wide max-w-[320px]">
            The cinematic story or media file you are looking for has drifted out of frame.
          </p>
        </motion.div>

        {/* Compact CTA with Interactive Glow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href="/">
            <BorderGlow
              edgeSensitivity={15}
              glowColor="35 85 75"
              backgroundColor="rgba(255, 255, 255, 0.02)"
              borderRadius={9999}
              glowRadius={25}
              glowIntensity={0.3}
              coneSpread={20}
              colors={["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={0.03}
              className="px-6 py-2.5 border border-white/10 rounded-full flex items-center justify-center cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:border-white/20 active:scale-95 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-[9px] tracking-[0.2em] font-sans font-semibold uppercase text-white/80 hover:text-white">
                <ArrowLeft className="w-3 h-3" />
                <span>Return to Studio</span>
              </div>
            </BorderGlow>
          </Link>
        </motion.div>
      </div>

      {/* Atmospheric grain/vignette overlay */}
      <div className="film-grain-overlay opacity-[0.035]" />
    </div>
  );
}
