"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ShinyText from "@/components/ui/ShinyText";

const IMAGES_TO_PRELOAD = [
  "/logo/logo.png",
  "/wedding/1_1.png",
  "/wedding/1_2.png",
  "/wedding/1_3.png",
  "/wedding/1_4.png",
  "/wedding/1_5.png",
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
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLightMode(document.documentElement.classList.contains("light"));
    }
  }, []);

  // Preload logic
  useEffect(() => {
    let loadedCount = 0;
    const totalCount = imagesToPreload.length;

    if (totalCount === 0) {
      setProgress(100);
      return;
    }

    const handleLoad = () => {
      loadedCount++;
      setProgress((loadedCount / totalCount) * 100);
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleLoad;
      img.onerror = handleLoad;
    });

    // Fallback timer to ensure preloader never gets stuck
    const fallback = setTimeout(() => {
      setProgress(100);
    }, 600);

    return () => clearTimeout(fallback);
  }, [imagesToPreload]);

  // Smooth progress animation & completion trigger
  useEffect(() => {
    const startTime = Date.now();
    const minDuration = 450; // Snappy 450ms minimum duration for ultra fast load
    let animationFrameId: number;

    const tick = () => {
      const elapsedTime = Date.now() - startTime;

      setAnimatedProgress((prev) => {
        const target = progress;
        const diff = target - prev;
        const step = Math.max(diff * 0.2, 1);
        const nextValue = Math.min(prev + step, target);

        if (nextValue >= 99.5 && elapsedTime >= minDuration) {
          setIsFadingOut(true);
          return 100;
        }

        return nextValue;
      });

      if (!isFadingOut) {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    animationFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrameId);
  }, [progress, isFadingOut]);

  // Call onComplete after fade out transition completes
  useEffect(() => {
    if (isFadingOut) {
      const timer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isFadingOut, onComplete]);

  return (
    <motion.div
      id="preloader"
      initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      animate={
        isFadingOut
          ? { opacity: 0, scale: 1.03, filter: "blur(10px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        backgroundColor: isLightMode ? "#fdfcf9" : "#0d0907",
      }}
    >
      {/* Background ambient spotlight glow */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,rgba(197,168,128,0.12)_0%,transparent_60%] pointer-events-none" />

      {/* Brand Logo with Metallic Shine */}
      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.96, filter: "blur(4px)" }}
          animate={
            isFadingOut
              ? { opacity: 0, y: -28, scale: 0.94, filter: "blur(10px)" }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <ShinyText
            imageSrc="/logo/logo.png"
            imageWidth={300}
            imageHeight={82}
            speed={2}
            color={isLightMode ? "rgba(14, 18, 26, 0.25)" : "rgba(244, 241, 235, 0.25)"}
            shineColor={isLightMode ? "var(--foreground)" : "var(--gold)"}
            spread={120}
            alt="Msfilms Logo"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
