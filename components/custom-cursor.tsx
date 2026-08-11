"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 450, damping: 30, mass: 0.2 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkScreen = () => {
      // Disable custom cursor on mobile, tablet, foldable screens (<1024px), touch devices, and no-hover pointers
      const isSmallScreen = window.innerWidth < 1024;
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      const noHover = window.matchMedia("(hover: none)").matches;
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      setIsDisabled(isSmallScreen || isTouch || noHover || prefersReduced);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDisabled) return;
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setIsVisible(true);

    const target = e.target as HTMLElement | null;
    if (target) {
      const textElem = target.closest("[data-cursor-text]") as HTMLElement | null;
      if (textElem) {
        const text = textElem.getAttribute("data-cursor-text");
        setCursorText(text);
        setIsHovering(true);
        return;
      }

      setCursorText(null);

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovering(!!isInteractive);
    }
  }, [isDisabled, mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
    setCursorText(null);
  }, []);

  useEffect(() => {
    if (isDisabled) return;

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isDisabled, handleMouseMove, handleMouseLeave]);

  if (isDisabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9998] pointer-events-none hidden lg:block"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <motion.div
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="relative flex items-center justify-center"
      >
        {/* Dynamic Cursor Outer Ring — morphs into dark "VIEW STORY" badge when cursorText is present */}
        <motion.div
          animate={{
            width: cursorText ? 90 : isHovering ? 44 : 24,
            height: cursorText ? 90 : isHovering ? 44 : 24,
            backgroundColor: cursorText ? "rgba(18, 18, 18, 0.92)" : "rgba(0, 0, 0, 0)",
            borderColor: cursorText
              ? "rgba(196, 163, 90, 0.7)"
              : isHovering
              ? "rgba(196, 163, 90, 0.8)"
              : "rgba(255, 255, 255, 0.4)",
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="rounded-full border flex items-center justify-center text-center backdrop-blur-md shadow-2xl overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {cursorText ? (
              <motion.span
                key="text"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                className="text-[9px] tracking-[0.25em] font-sans uppercase font-medium leading-tight text-white px-2 select-none"
              >
                {cursorText.split(" ").map((word, i) => (
                  <span key={i} className="block">
                    {word}
                  </span>
                ))}
              </motion.span>
            ) : null}
          </AnimatePresence>
        </motion.div>

        {/* Inner Dot — hidden when text badge is active */}
        {!cursorText && (
          <motion.div
            animate={{
              scale: isHovering ? 0.5 : 1,
              backgroundColor: isHovering ? "#C4A35A" : "#FFFFFF",
            }}
            transition={{ duration: 0.2 }}
            className="absolute w-1.5 h-1.5 rounded-full"
          />
        )}
      </motion.div>
    </motion.div>
  );
}
