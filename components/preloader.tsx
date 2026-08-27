"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

const IMAGES_TO_PRELOAD = [
  "/logo/logo.png",
  "/wedding/1 (1).png",
  "/wedding/1 (2).png",
  "/wedding/1 (3).png",
  "/wedding/1 (4).png",
  "/wedding/1 (5).png",
  "/wedding/imgi_2_2.png",
  "/me/imgi_36_625043456_18087932393515848_4263036374454868947_n.jpg",
];

export function Preloader({
  onComplete,
  imagesToPreload = IMAGES_TO_PRELOAD,
}: {
  onComplete: () => void;
  imagesToPreload?: string[];
}) {
  const [progress, setProgress] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Custom states for the mask reveal transitions
  const [startMask, setStartMask] = useState(false);
  const [logoFadeOut, setLogoFadeOut] = useState(false);
  const [maxRadius, setMaxRadius] = useState(1200);

  // Measure screen diagonal to calculate exact radius needed to cover the viewport
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const diag = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
        setMaxRadius(diag / 2 + 100); // add safety padding
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  // Lock scrolling when mounting
  useEffect(() => {
    document.documentElement.classList.add("preloader-active");
    return () => {
      document.documentElement.classList.remove("preloader-active");
    };
  }, []);

  // Preload logic
  useEffect(() => {
    let loadedCount = 0;
    const totalCount = imagesToPreload.length;

    if (totalCount === 0) {
      setProgress(100);
      return;
    }

    const handleImageLoad = () => {
      loadedCount++;
      setProgress((loadedCount / totalCount) * 100);
    };

    const handleImageError = () => {
      // Treat errors as loaded to prevent getting stuck
      loadedCount++;
      setProgress((loadedCount / totalCount) * 100);
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
    });
  }, [imagesToPreload]);

  // Smooth progress animation & minimum duration enforcement (400ms)
  useEffect(() => {
    const startTime = Date.now();
    const minDuration = 400; // Snappy 400ms minimum duration so loading feels fast
    let animationFrameId: number;

    const tick = () => {
      const elapsedTime = Date.now() - startTime;

      setAnimatedProgress((prev) => {
        const target = progress;
        const diff = target - prev;

        // Easing interpolation
        let step = diff * 0.16;
        if (step > 0 && step < 0.8) step = 0.8;

        const nextValue = Math.min(prev + step, target);

        if (nextValue >= 99.9 && elapsedTime >= minDuration) {
          setIsReady(true);
          return 100;
        }

        return nextValue;
      });

      if (!isReady) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [progress, isReady]);

  // Complete preloading transition: logo fades out first, then mask expands
  useEffect(() => {
    if (isReady) {
      // Step 1: Fade out the logo text quickly
      const logoTimer = setTimeout(() => {
        setLogoFadeOut(true);
      }, 100);

      // Step 2: Trigger mask expansion snappy reveal
      const maskTimer = setTimeout(() => {
        setStartMask(true);
      }, 350);

      // Step 3: Complete transition and unmount
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 1100); // 350ms delay + 750ms mask expansion animation duration

      return () => {
        clearTimeout(logoTimer);
        clearTimeout(maskTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isReady, onComplete]);

  return (
    <motion.div
      id="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden pointer-events-none"
    >
      {/* SVG Mask Background - creates a feathered circular camera iris cutout reveal */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <svg className="w-full h-full" width="100%" height="100%">
          <defs>
            {/* Soft feather filter for the circle edge */}
            <filter id="mask-feather-blur">
              <feGaussianBlur stdDeviation="40" />
            </filter>
            <mask id="preloader-reveal-mask">
              {/* White area represents visible background */}
              <rect width="100%" height="100%" fill="white" />
              {/* Black circle cutout with standard blur filter for premium feathered edge */}
              <motion.circle
                cx="50%"
                cy="50%"
                initial={{ r: 0 }}
                animate={startMask ? { r: maxRadius } : { r: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                fill="black"
                filter="url(#mask-feather-blur)"
              />
            </mask>
          </defs>
          {/* Black background rect that gets masked and fades out gently for ultimate smoothness */}
          <motion.rect
            width="100%"
            height="100%"
            fill="#020912"
            mask="url(#preloader-reveal-mask)"
            animate={startMask ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Shiny Logo - Silver-metallic base with White shine sweep */}
      <motion.div
        animate={logoFadeOut ? { opacity: 0, scale: 0.94, filter: "blur(12px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <ShinyText
          imageSrc="/logo/logo.png"
          imageWidth={320}
          imageHeight={88}
          speed={2.2}
          color="rgba(255, 255, 255, 0.22)" // Sleek silver-metallic base logo
          shineColor="#ffffff" // Brilliant pure white shine sweep
          spread={100}
          alt="Msfilms Logo"
        />
      </motion.div>

      {/* Subtle Atmospheric Light Effect */}
      <motion.div
        animate={logoFadeOut ? { opacity: 0 } : { opacity: 1 }}
        className="absolute inset-0 bg-radial-[circle_at_center,rgba(255,255,255,0.01)_0%,transparent_60%] pointer-events-none"
      />
    </motion.div>
  );
}



