"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";

// Helper to find containing blocks that could interfere with absolute positioning coordinates
const getContainingBlock = (element: HTMLElement | null): HTMLElement | null => {
  let node = element?.parentElement;
  while (node && node !== document.documentElement) {
    const style = getComputedStyle(node);
    if (
      style.transform !== "none" ||
      style.perspective !== "none" ||
      style.filter !== "none" ||
      style.willChange.includes("transform") ||
      style.willChange.includes("perspective") ||
      style.willChange.includes("filter") ||
      /paint|layout|strict|content/.test(style.contain)
    ) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

const getContainingBlockOffset = (block: HTMLElement | null) => {
  if (!block) return { x: 0, y: 0 };
  const rect = block.getBoundingClientRect();
  return { x: rect.left + block.clientLeft, y: rect.top + block.clientTop };
};

export function CustomCursor() {
  const targetSelector = "a, button, [data-cursor-text], [data-cursor], .cursor-pointer, input, select, textarea";
  const hideDefaultCursor = true;
  const cursorColor = "rgba(255, 255, 255, 0.65)";
  const cursorColorOnTarget = "#ffffff"; // Target white

  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const containingBlockRef = useRef<HTMLElement | null>(null);

  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPreloaderPresent, setIsPreloaderPresent] = useState(true);

  const mousePositionRef = useRef({ x: 0, y: 0 });

  // Disable custom cursor on mobile, touch screens, and reduced-motion settings
  useEffect(() => {
    const checkScreen = () => {
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

  // One-time preloader detection — poll briefly then stop permanently
  useEffect(() => {
    const check = () => !!document.getElementById("preloader");
    if (!check()) {
      setIsPreloaderPresent(false);
      return;
    }
    // Preloader is present — poll every 300ms until it's gone, then stop
    const pollId = setInterval(() => {
      if (!check()) {
        setIsPreloaderPresent(false);
        clearInterval(pollId);
      }
    }, 300);
    return () => clearInterval(pollId);
  }, []);

  // Dynamically toggle body native cursor visibility based on preloader state
  useEffect(() => {
    if (isDisabled || isPreloaderPresent) {
      document.body.style.cursor = "auto";
    } else {
      document.body.style.cursor = "none";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [isDisabled, isPreloaderPresent]);

  const isMobile = isDisabled;

  const constants = useMemo(() => ({
    borderWidth: 1.5,
    cornerSize: 10,
    padding: 5
  }), []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner");
    containingBlockRef.current = getContainingBlock(cursor);

    let offsetX = 0;
    let offsetY = 0;
    const updateOffset = () => {
      const offset = getContainingBlockOffset(containingBlockRef.current);
      offsetX = offset.x;
      offsetY = offset.y;
    };
    updateOffset();

    let activeTarget: HTMLElement | null = null;
    let currentLeaveHandler: (() => void) | null = null;

    const cleanupTarget = (target: HTMLElement) => {
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    // Rest positions
    const cornerSize = constants.cornerSize;
    const restPositions = [
      { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: cornerSize * 0.5 },
      { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
    ];

    // Animated positions in memory
    const cursorX = { current: window.innerWidth / 2 - offsetX };
    const cursorY = { current: window.innerHeight / 2 - offsetY };
    const cornerPositions = [
      { x: restPositions[0].x, y: restPositions[0].y },
      { x: restPositions[1].x, y: restPositions[1].y },
      { x: restPositions[2].x, y: restPositions[2].y },
      { x: restPositions[3].x, y: restPositions[3].y }
    ];

    let targetCornerPositions: { x: number; y: number }[] | null = null;

    // Set initial position
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: cursorX.current,
      y: cursorY.current
    });

    // Position corners initially
    if (cornersRef.current) {
      Array.from(cornersRef.current).forEach((corner, i) => {
        gsap.set(corner, { x: restPositions[i].x, y: restPositions[i].y });
      });
    }

    // Viewfinder slow continuous breathing rotation tween (targets ONLY the inner guides, keeping brackets straight)
    const rotationTween = gsap.to(guidesRef.current, {
      rotation: "+=360",
      duration: 25,
      ease: "none",
      repeat: -1
    });

    // Single high-performance requestAnimationFrame loop with zero DOM reads
    let rafId = 0;
    const tick = () => {
      const targetCursorX = mousePositionRef.current.x - offsetX;
      const targetCursorY = mousePositionRef.current.y - offsetY;
      cursorX.current += (targetCursorX - cursorX.current) * 0.15;
      cursorY.current += (targetCursorY - cursorY.current) * 0.15;

      gsap.set(cursor, { x: cursorX.current, y: cursorY.current });

      if (cornersRef.current) {
        const corners = Array.from(cornersRef.current);
        corners.forEach((corner, i) => {
          let destX = restPositions[i].x;
          let destY = restPositions[i].y;

          if (targetCornerPositions) {
            destX = targetCornerPositions[i].x - cursorX.current;
            destY = targetCornerPositions[i].y - cursorY.current;
          }

          cornerPositions[i].x += (destX - cornerPositions[i].x) * 0.18;
          cornerPositions[i].y += (destY - cornerPositions[i].y) * 0.18;

          gsap.set(corner, { x: cornerPositions[i].x, y: cornerPositions[i].y });
        });
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const moveHandler = (e: MouseEvent) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", moveHandler, { passive: true });

    // Track scroll events to release lock-on brackets if scrolling causes mouse to leave boundaries
    const scrollHandler = () => {
      if (!activeTarget) return;
      const mouseX = mousePositionRef.current.x;
      const mouseY = mousePositionRef.current.y;
      const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
      const isStillOverTarget =
        elementUnderMouse &&
        (elementUnderMouse === activeTarget || elementUnderMouse.closest(targetSelector) === activeTarget);
      if (!isStillOverTarget) {
        if (currentLeaveHandler) {
          currentLeaveHandler();
        }
      }
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Micro-squeezes on mouse clicks
    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.65, duration: 0.2 });
      gsap.to(cursor, { scale: 0.92, duration: 0.15 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      gsap.to(cursor, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousedown", mouseDownHandler);
    window.addEventListener("mouseup", mouseUpHandler);

    const enterHandler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(targetSelector) as HTMLElement | null;
      if (!target || !cursorRef.current || !cornersRef.current) return;

      // Exempt header navigation links from snap targeting to keep navbar clean, except the Let's Talk or Let's Connect buttons
      if (target.closest("header") && !target.textContent?.includes("Let's Talk") && !target.textContent?.includes("Let's Connect")) {
        return;
      }

      if (activeTarget === target) return;
      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      activeTarget = target;
      setIsHovering(true);

      // Extract cursor text badges (e.g. VIEW STORY, PLAY FILM)
      const text = target.getAttribute("data-cursor-text");
      setCursorText(text);

      const corners = Array.from(cornersRef.current);

      // Change colors to target white
      gsap.to(corners, {
        borderColor: cursorColorOnTarget,
        duration: 0.15,
        ease: "power2.out"
      });
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          backgroundColor: cursorColorOnTarget,
          duration: 0.15,
          ease: "power2.out"
        });
      }

      const rect = target.getBoundingClientRect();
      const { borderWidth, padding } = constants;

      // Calculate targeting box corners with padding
      targetCornerPositions = [
        { x: rect.left - borderWidth - padding - offsetX, y: rect.top - borderWidth - padding - offsetY },
        { x: rect.right + borderWidth + padding - cornerSize - offsetX, y: rect.top - borderWidth - padding - offsetY },
        { x: rect.right + borderWidth + padding - cornerSize - offsetX, y: rect.bottom + borderWidth + padding - cornerSize - offsetY },
        { x: rect.left - borderWidth - padding - offsetX, y: rect.bottom + borderWidth + padding - cornerSize - offsetY }
      ];

      const leaveHandler = () => {
        targetCornerPositions = null;
        activeTarget = null;
        setIsHovering(false);
        setCursorText(null);

        // Reset colors
        if (cornersRef.current) {
          gsap.to(Array.from(cornersRef.current), {
            borderColor: cursorColor,
            duration: 0.15,
            ease: "power2.out"
          });
        }
        if (dotRef.current) {
          gsap.to(dotRef.current, {
            backgroundColor: "#FFFFFF",
            duration: 0.15,
            ease: "power2.out"
          });
        }

        cleanupTarget(target);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener("mouseleave", leaveHandler);
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    const resizeHandler = () => {
      containingBlockRef.current = getContainingBlock(cursor);
      updateOffset();
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousedown", mouseDownHandler);
      window.removeEventListener("mouseup", mouseUpHandler);

      if (activeTarget) {
        cleanupTarget(activeTarget);
      }

      rotationTween.kill();
      targetCornerPositions = null;
    };
  }, [
    targetSelector,
    constants,
    hideDefaultCursor,
    isMobile,
    cursorColor,
    cursorColorOnTarget
  ]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="target-cursor-wrapper pointer-events-none hidden lg:block transition-opacity duration-300"
      style={{ opacity: isPreloaderPresent ? 0 : 1 }}
    >
      {/* ═══ Camera Viewfinder Inner Guides (Visible when not showing text badges) ═══ */}
      <AnimatePresence>
        {!cursorText && (
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ color: isHovering ? cursorColorOnTarget : cursorColor }}
          >
            {/* 1. Viewfinder Circular Focus Ring (spins slowly in background) */}
            <div
              ref={guidesRef}
              className="absolute w-[18px] h-[18px] border border-dashed border-current/25 rounded-full pointer-events-none"
            />

            {/* 2. Central Focus Crosshair Ticks (always aligned straight - 0 rotation) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Horizontal line */}
              <div className="w-1.5 h-[0.5px] bg-current/30 absolute pointer-events-none" />
              {/* Vertical line */}
              <div className="h-1.5 w-[0.5px] bg-current/30 absolute pointer-events-none" />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ Center Dot / Text Badge Morph ═══ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Badge Element (rendered statically, animated via opacity/scale) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: cursorText ? 1 : 0,
            scale: cursorText ? 1 : 0.6,
            pointerEvents: cursorText ? "auto" : "none"
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="w-[90px] h-[90px] rounded-full bg-black/92 border border-gold/75 flex items-center justify-center text-center backdrop-blur-[2px] shadow-2xl overflow-hidden select-none pointer-events-none absolute"
        >
          <span className="text-[9px] tracking-[0.25em] font-sans uppercase font-medium leading-tight text-white px-2 pointer-events-none">
            {(cursorText || "").split(" ").map((word, i) => (
              <span key={i} className="block pointer-events-none">{word}</span>
            ))}
          </span>
        </motion.div>

        {/* Center Dot Element (rendered statically, animated via opacity/scale) */}
        <motion.div
          ref={dotRef}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: cursorText ? 0 : 1,
            scale: cursorText ? 0 : 1
          }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="w-1.5 h-1.5 rounded-full bg-white will-change-transform pointer-events-none absolute"
        />
      </div>

      {/* ═══ Focus Brackets (Lock onto elements during hover) ═══ */}
      <div className="absolute inset-0 pointer-events-none" style={{ color: isHovering ? cursorColorOnTarget : cursorColor }}>
        <div className="target-cursor-corner corner-tl pointer-events-none" style={{ borderColor: "inherit" }}>
          {/* Pulsing RED REC indicator for videos */}
          {cursorText === "PLAY FILM" && (
            <div className="absolute bottom-3 left-0 flex items-center gap-1.5 text-[8px] font-bold font-mono text-red-500 tracking-wider select-none whitespace-nowrap bg-[#061a2b]/60 border border-red-500/30 px-1 py-0.5 rounded-[2px] pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse pointer-events-none" />
              REC
            </div>
          )}
        </div>
        <div className="target-cursor-corner corner-tr pointer-events-none" style={{ borderColor: "inherit" }} />
        <div className="target-cursor-corner corner-br pointer-events-none" style={{ borderColor: "inherit" }} />
        <div className="target-cursor-corner corner-bl pointer-events-none" style={{ borderColor: "inherit" }}>
          {/* Green AF-S (Auto-Focus Single) lock status indicator for photos */}
          {cursorText === "VIEW STORY" && (
            <div className="absolute top-3 left-0 flex items-center gap-1.5 text-[8px] font-bold font-mono text-emerald-400 tracking-wider select-none whitespace-nowrap bg-[#061a2b]/60 border border-emerald-500/25 px-1 py-0.5 rounded-[2px] pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pointer-events-none" />
              AF-S
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
