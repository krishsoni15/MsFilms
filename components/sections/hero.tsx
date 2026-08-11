"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroData, siteData } from "@/lib/data";
import { Magnetic } from "@/components/ui/magnetic";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-10%"]);

  useEffect(() => {
    // Trigger loading sequence after a brief pause
    const timer = setTimeout(() => setIsLoaded(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const headlineWords = heroData.headline.split("\n").map(line => line.split(" "));

  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
      {/* ── Loading Overlay (signature logo + horizontal blinds wipe) ── */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="absolute inset-0 z-50 flex flex-col justify-center items-center pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {/* Signature Logo reveal in center */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-10"
            >
              <Image
                src={siteData.logo}
                alt={siteData.name}
                width={200}
                height={60}
                priority
                className="h-14 sm:h-16 md:h-20 w-auto object-contain brightness-100 drop-shadow-2xl"
              />
            </motion.div>

            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 w-full bg-[#111111]"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5 + i * 0.08,
                  ease: [0.76, 0, 0.24, 1],
                }}
                style={{ transformOrigin: i % 2 === 0 ? "top" : "bottom" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Background — Video or Image with parallax ── */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: isLoaded ? 1 : 1.15 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 z-0"
      >
        {heroData.videoSrc ? (
          <video
            src={heroData.videoSrc}
            poster={heroData.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={heroData.videoPoster}
            alt="Cinematic wedding moment"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
          />
        )}
        {/* Cinematic dark gradient overlay for crystal clear high-contrast white text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/45" />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 h-full flex flex-col justify-between px-5 md:px-10 lg:px-16 text-white"
      >
        {/* Top Row — Eyebrow */}
        <div className="pt-28 md:pt-32 flex justify-between items-start">
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-white/50 font-sans"
          >
            {heroData.eyebrow}
          </motion.p>
        </div>

        {/* Center — Headline with staggered word reveals */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl -mt-12">
          <div className="mb-8">
            {headlineWords.map((line, lineIdx) => (
              <span key={lineIdx} className="block overflow-hidden pb-2">
                {line.map((word, wordIdx) => {
                  const globalIdx = lineIdx * 3 + wordIdx;
                  return (
                    <motion.span
                      key={wordIdx}
                      initial={{ y: "120%", opacity: 0 }}
                      animate={isLoaded ? { y: "0%", opacity: 1 } : {}}
                      transition={{
                        duration: 1,
                        delay: 0.8 + globalIdx * 0.1,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`inline-block mr-[0.25em] font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[1.05] tracking-tight ${
                        lineIdx === 1 ? "italic text-white/80" : ""
                      }`}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="font-sans text-sm md:text-base text-white/60 max-w-md mb-12 leading-relaxed"
          >
            {heroData.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 font-sans text-[11px] tracking-[0.2em] uppercase"
          >
            <Magnetic strength={0.3}>
              <Link
                href="#work"
                className="relative border border-white/30 px-8 py-4 text-center overflow-hidden group block transition-colors duration-500 hover:text-black"
              >
                <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left" />
                <span className="relative z-10">View Our Work</span>
              </Link>
            </Magnetic>

            <Magnetic strength={0.3}>
              <Link
                href="#contact"
                className="px-8 py-4 text-center text-white/60 hover:text-white transition-colors duration-500 flex items-center gap-2 group block"
              >
                Start a Conversation
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Bottom — Scroll indicator with growing line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2 }}
          className="pb-10 self-center flex flex-col items-center gap-3"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-sans">Scroll</span>
          <motion.div
            className="w-px bg-white/30 origin-top"
            initial={{ height: 0 }}
            animate={isLoaded ? { height: 40 } : {}}
            transition={{ duration: 1.5, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
