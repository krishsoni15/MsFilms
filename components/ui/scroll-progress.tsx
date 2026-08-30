"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out the scroll progress for a high-end feel on the circular path
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Toggle button visibility based on vertical scroll distance (show after scrolling 150px)
  useMotionValueEvent(scrollY, "change", (latestY) => {
    setIsVisible(latestY > 150);
  });

  // Premium scroll to top using Lenis instance with fallback to standard scroll
  const handleScrollToTop = () => {
    if (typeof window !== "undefined") {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={handleScrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="scroll-to-top-btn fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[80] group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-background/85 border border-border backdrop-blur-md cursor-pointer select-none outline-none shadow-xl hover:border-gold/30 transition-colors duration-500"
          title="Scroll to top"
          data-cursor-text="TO TOP"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Circular progress SVG */}
          <svg className="absolute inset-0 w-full h-full p-[3px]" viewBox="0 0 52 52">
            {/* Background track circle */}
            <circle
              cx="26"
              cy="26"
              r="23"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-foreground/5"
            />
            {/* Foreground progress circle */}
            <motion.circle
              cx="26"
              cy="26"
              r="23"
              fill="transparent"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
              className="origin-center -rotate-90"
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>

          {/* Sliding chevron animation for premium micro-interaction */}
          <div className="relative overflow-hidden h-4 w-4 flex flex-col items-center justify-center pointer-events-none">
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-5">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground/80"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </span>
            <span className="absolute transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-5 group-hover:translate-y-0">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gold"
              >
                <path d="m18 15-6-6-6 6" />
              </svg>
            </span>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

