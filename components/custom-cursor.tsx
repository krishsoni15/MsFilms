"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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
  const spinDuration = 25; // Viewfinder continuous slow rotation time in seconds
  const hideDefaultCursor = true;
  const hoverDuration = 0.22;
  const parallaxOn = true;
  const cursorColor = "rgba(255, 255, 255, 0.65)";
  const cursorColorOnTarget = "#C4A35A"; // Brand gold

  const cursorRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<NodeListOf<HTMLDivElement> | null>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const guidesRef = useRef<HTMLDivElement>(null);
  const containingBlockRef = useRef<HTMLElement | null>(null);

  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPreloaderPresent, setIsPreloaderPresent] = useState(true);

  const activeTargetRef = useRef<HTMLElement | null>(null);
  const targetCornerPositionsRef = useRef<{ x: number; y: number }[] | null>(null);
  const activeStrengthRef = useRef(0);
  const tickerFnRef = useRef<(() => void) | null>(null);

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

  // Monitor DOM for preloader container unmounting to show cursor only after loading finishes
  useEffect(() => {
    const checkPreloader = () => {
      const preloader = document.getElementById("preloader");
      setIsPreloaderPresent(!!preloader);
    };

    checkPreloader();

    const observer = new MutationObserver(() => {
      checkPreloader();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
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
    cornerSize: 10
  }), []);

  // GSAP-based cursor position updates
  const moveCursor = useCallback((clientX: number, clientY: number) => {
    if (!cursorRef.current) return;
    const { x: offsetX, y: offsetY } = getContainingBlockOffset(containingBlockRef.current);
    gsap.to(cursorRef.current, {
      x: clientX - offsetX,
      y: clientY - offsetY,
      duration: 0.08,
      ease: "power3.out"
    });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const cursor = cursorRef.current;
    cornersRef.current = cursor.querySelectorAll(".target-cursor-corner");
    containingBlockRef.current = getContainingBlock(cursor);
    const getOffset = () => getContainingBlockOffset(containingBlockRef.current);

    let activeTarget: HTMLElement | null = null;
    let currentLeaveHandler: (() => void) | null = null;

    const cleanupTarget = (target: HTMLElement) => {
      if (currentLeaveHandler) {
        target.removeEventListener("mouseleave", currentLeaveHandler);
      }
      currentLeaveHandler = null;
    };

    const initialOffset = getOffset();
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2 - initialOffset.x,
      y: window.innerHeight / 2 - initialOffset.y
    });

    // Viewfinder slow continuous breathing rotation tween (targets ONLY the inner guides, keeping brackets straight)
    const rotationTween = gsap.to(guidesRef.current, {
      rotation: "+=360",
      duration: 25,
      ease: "none",
      repeat: -1
    });

    // Custom GSAP ticker loop to animate lock-on corner brackets smoothly
    const tickerFn = () => {
      if (!targetCornerPositionsRef.current || !cursorRef.current || !cornersRef.current) {
        return;
      }

      const strength = activeStrengthRef.current;
      if (strength === 0) return;

      const cursorX = gsap.getProperty(cursorRef.current, "x") as number;
      const cursorY = gsap.getProperty(cursorRef.current, "y") as number;

      const corners = Array.from(cornersRef.current);
      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, "x") as number;
        const currentY = gsap.getProperty(corner, "y") as number;

        const targetX = targetCornerPositionsRef.current![i].x - cursorX;
        const targetY = targetCornerPositionsRef.current![i].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        const duration = strength >= 0.99 ? (parallaxOn ? 0.22 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? "none" : "power2.out",
          overwrite: "auto"
        });
      });
    };

    tickerFnRef.current = tickerFn;

    const moveHandler = (e: MouseEvent) => {
      moveCursor(e.clientX, e.clientY);
    };
    window.addEventListener("mousemove", moveHandler);

    // Track scroll events to release lock-on brackets if scrolling causes mouse to leave boundaries
    const scrollHandler = () => {
      if (!activeTarget || !cursorRef.current) return;
      const { x: offsetX, y: offsetY } = getOffset();
      const mouseX = (gsap.getProperty(cursorRef.current, "x") as number) + offsetX;
      const mouseY = (gsap.getProperty(cursorRef.current, "y") as number) + offsetY;
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

    // Mouse over: Lock onto target element
    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as HTMLElement | null;
      const allTargets: HTMLElement[] = [];
      let current = directTarget;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement;
      }
      const target = allTargets[0] || null;
      if (!target || !cursorRef.current || !cornersRef.current) return;
      
      // Exempt header navigation links from snap targeting to keep navbar clean, except the Let's Talk button
      if (target.closest("header") && !target.textContent?.includes("Let's Talk")) {
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
      corners.forEach(corner => gsap.killTweensOf(corner, "x,y"));

      // Change colors to target gold
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
      const { borderWidth, cornerSize } = constants;
      const { x: offsetX, y: offsetY } = getOffset();
      const cursorX = gsap.getProperty(cursor, "x") as number;
      const cursorY = gsap.getProperty(cursor, "y") as number;

      // Calculate targeting box corners
      targetCornerPositionsRef.current = [
        { x: rect.left - borderWidth - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.top - borderWidth - offsetY },
        { x: rect.right + borderWidth - cornerSize - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY },
        { x: rect.left - borderWidth - offsetX, y: rect.bottom + borderWidth - cornerSize - offsetY }
      ];

      gsap.ticker.add(tickerFnRef.current!);

      gsap.to(activeStrengthRef, {
        current: 1,
        duration: hoverDuration,
        ease: "power2.out"
      });

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositionsRef.current![i].x - cursorX,
          y: targetCornerPositionsRef.current![i].y - cursorY,
          duration: 0.25,
          ease: "power2.out"
        });
      });

      const leaveHandler = () => {
        if (tickerFnRef.current) {
          gsap.ticker.remove(tickerFnRef.current);
        }

        targetCornerPositionsRef.current = null;
        gsap.set(activeStrengthRef, { current: 0, overwrite: true });
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

        // Return corners to rest state
        if (cornersRef.current) {
          const corners = Array.from(cornersRef.current);
          gsap.killTweensOf(corners, "x,y");
          const { cornerSize } = constants;
          const positions = [
            { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
            { x: cornerSize * 0.5, y: cornerSize * 0.5 },
            { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
          ];
          corners.forEach((corner, index) => {
            gsap.to(corner, {
              x: positions[index].x,
              y: positions[index].y,
              duration: 0.35,
              ease: "power3.out"
            });
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
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
      }

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

      targetCornerPositionsRef.current = null;
      activeStrengthRef.current = 0;
    };
  }, [
    targetSelector,
    spinDuration,
    moveCursor,
    constants,
    hideDefaultCursor,
    isMobile,
    hoverDuration,
    parallaxOn,
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
              className="absolute w-[18px] h-[18px] border border-dashed border-current/25 rounded-full" 
            />
            
            {/* 2. Central Focus Crosshair Ticks (always aligned straight - 0 rotation) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Horizontal line */}
              <div className="w-2.5 h-[0.5px] bg-current/30 absolute" />
              {/* Vertical line */}
              <div className="h-2.5 w-[0.5px] bg-current/30 absolute" />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══ Center Dot / Text Badge Morph ═══ */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          {cursorText ? (
            <motion.div
              key="badge"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-[90px] h-[90px] rounded-full bg-black/92 border border-gold/75 flex items-center justify-center text-center backdrop-blur-[2px] shadow-2xl overflow-hidden select-none"
            >
              <span className="text-[9px] tracking-[0.25em] font-sans uppercase font-medium leading-tight text-white px-2">
                {cursorText.split(" ").map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="dot"
              ref={dotRef}
              className="w-1.5 h-1.5 rounded-full bg-white will-change-transform"
            />
          )}
        </AnimatePresence>
      </div>

      {/* ═══ Focus Brackets (Lock onto elements during hover) ═══ */}
      <div className="absolute inset-0 pointer-events-none" style={{ color: isHovering ? cursorColorOnTarget : cursorColor }}>
        <div className="target-cursor-corner corner-tl" style={{ borderColor: "inherit" }}>
          {/* Pulsing RED REC indicator for videos */}
          {cursorText === "PLAY FILM" && (
            <div className="absolute bottom-3 left-0 flex items-center gap-1.5 text-[8px] font-bold font-mono text-red-500 tracking-wider select-none whitespace-nowrap bg-[#061a2b]/60 border border-red-500/30 px-1 py-0.5 rounded-[2px] pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              REC
            </div>
          )}
        </div>
        <div className="target-cursor-corner corner-tr" style={{ borderColor: "inherit" }} />
        <div className="target-cursor-corner corner-br" style={{ borderColor: "inherit" }} />
        <div className="target-cursor-corner corner-bl" style={{ borderColor: "inherit" }}>
          {/* Green AF-S (Auto-Focus Single) lock status indicator for photos */}
          {cursorText === "VIEW STORY" && (
            <div className="absolute top-3 left-0 flex items-center gap-1.5 text-[8px] font-bold font-mono text-emerald-400 tracking-wider select-none whitespace-nowrap bg-[#061a2b]/60 border border-emerald-500/25 px-1 py-0.5 rounded-[2px] pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              AF-S
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
