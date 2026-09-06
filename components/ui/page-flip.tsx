"use client";

import React, { useState, useEffect, useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "./page-flip.css";

interface PageFlipProps {
  children: ReactNode[];
  width?: number; // Total book width on desktop
  height?: number; // Total book height on desktop
  className?: string;
  activeSheetIndex?: number;
}

export default function PageFlip({
  children,
  width = 900,
  height = 550,
  className,
  activeSheetIndex,
}: PageFlipProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFlipped, setCurrentFlipped] = useState(-1); // -1 means book is closed (cover showing)

  // Dragging and Animation states
  const [draggedSheet, setDraggedSheet] = useState<number | null>(null);
  const [dragAngle, setDragAngle] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDirection = useRef<"left" | "right" | null>(null);
  const dragStartTime = useRef(0);
  const isAnimatingRef = useRef(false);

  // Track parent activeSheetIndex scroll changes without state conflicts
  const lastParentIndexRef = useRef<number | undefined>(activeSheetIndex);

  // Group pages into sheets (front & back)
  const pages = React.Children.toArray(children);
  const totalPages = pages.length;
  const totalSheets = Math.ceil(totalPages / 2);

  const sheets = Array.from({ length: totalSheets }, (_, i) => {
    return {
      index: i,
      front: pages[i * 2] || null,
      back: pages[i * 2 + 1] || null,
    };
  });

  // Programmatic Page Curl Transition (Handles snap back, clicks, buttons, and scroll)
  const animateToAngle = (
    sheetIdx: number,
    fromAngle: number,
    toAngle: number,
    finalFlipped: number,
    direction: "left" | "right",
    isManual: boolean = false
  ) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const duration = 520; // ms transition time (luxurious and smooth)
    const startTime = performance.now();

    setDraggedSheet(sheetIdx);
    dragDirection.current = direction;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for a natural book page swing
      const ease = 1 - Math.pow(1 - progress, 3);
      const currentAngle = fromAngle + (toAngle - fromAngle) * ease;

      setDragAngle(currentAngle);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // Animation complete: commit states
        setCurrentFlipped(finalFlipped);
        setDraggedSheet(null);
        setDragAngle(null);
        dragDirection.current = null;
        isAnimatingRef.current = false;
      }
    };

    requestAnimationFrame(tick);
  };

  // Synchronize scroll-driven activeSheetIndex with page-flip animation
  useEffect(() => {
    if (activeSheetIndex === undefined) return;

    // Only respond if parent activeSheetIndex has actually changed to a NEW value from parent scroll
    if (activeSheetIndex !== lastParentIndexRef.current) {
      const targetIndex = activeSheetIndex;
      lastParentIndexRef.current = targetIndex;

      if (targetIndex !== currentFlipped && !isAnimatingRef.current && !isDragging) {
        if (Math.abs(targetIndex - currentFlipped) > 1) {
          // Fast scroll jump -> instant update
          setCurrentFlipped(targetIndex);
        } else if (targetIndex > currentFlipped) {
          // Flip forward
          animateToAngle(targetIndex, 0, -180, targetIndex, "left", false);
        } else {
          // Flip backward
          animateToAngle(currentFlipped, -180, 0, targetIndex, "right", false);
        }
      }
    }
  }, [activeSheetIndex, currentFlipped, isDragging]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, sheetIdx: number) => {
    // Ignore direct clicks on interactive elements (e.g. Inquiry links or buttons inside page)
    const target = e.target as HTMLElement;
    if (target.closest("a, button, input, [role='button']")) {
      return;
    }

    if (isAnimatingRef.current) return;

    const isTopLeft = sheetIdx === currentFlipped;
    const isTopRight = sheetIdx === currentFlipped + 1;

    if (!isTopLeft && !isTopRight) return;

    // Capture pointer events to track movement across page boundaries
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}

    setIsDragging(true);
    setDraggedSheet(sheetIdx);
    dragStartX.current = e.clientX;
    dragStartTime.current = performance.now();

    if (isTopLeft) {
      // Clicked top left page -> ready to flip backward towards right
      dragDirection.current = "right";
      setDragAngle(-180);
    } else {
      // Clicked top right page -> ready to flip forward towards left
      dragDirection.current = "left";
      setDragAngle(0);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, sheetIdx: number) => {
    if (!isDragging || draggedSheet !== sheetIdx || dragAngle === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartX.current;
    const halfWidth = rect.width / 2;

    let angle = 0;
    if (dragDirection.current === "left") {
      // Dragging right page to the left (0 to -180 deg)
      const pct = Math.max(0, Math.min(1, -deltaX / halfWidth));
      angle = pct * -180;
    } else {
      // Dragging left page to the right (-180 to 0 deg)
      const pct = Math.max(0, Math.min(1, deltaX / halfWidth));
      angle = -180 + pct * 180;
    }

    setDragAngle(angle);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, sheetIdx: number) => {
    if (!isDragging || draggedSheet !== sheetIdx || dragAngle === null) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    setIsDragging(false);

    const deltaX = e.clientX - dragStartX.current;
    const elapsed = performance.now() - dragStartTime.current;
    const velocityX = deltaX / elapsed; // px/ms

    const isClick = Math.abs(deltaX) < 10 && elapsed < 350; // brief tap/click turns page
    const isSwipe = Math.abs(velocityX) > 0.2 && Math.abs(deltaX) > 25; // quick swipe gesture

    if (isClick) {
      // Simple tap/click page turn
      if (sheetIdx === currentFlipped) {
        // Clicked left page -> flip backward
        animateToAngle(sheetIdx, dragAngle, 0, currentFlipped - 1, "right", true);
      } else if (sheetIdx === currentFlipped + 1) {
        // Clicked right page -> flip forward
        animateToAngle(sheetIdx, dragAngle, -180, currentFlipped + 1, "left", true);
      }
    } else if (isSwipe) {
      // Fast swipe/flick gesture
      if (deltaX < 0) {
        // Swiped left -> flip forward
        if (currentFlipped < totalSheets - 1) {
          const targetIdx = sheetIdx === currentFlipped ? currentFlipped + 1 : sheetIdx;
          animateToAngle(targetIdx, dragAngle, -180, currentFlipped + 1, "left", true);
        } else {
          // Snap back
          animateToAngle(sheetIdx, dragAngle, -180, currentFlipped, "right", true);
        }
      } else {
        // Swiped right -> flip backward
        if (currentFlipped >= 0) {
          const targetIdx = sheetIdx === currentFlipped + 1 ? currentFlipped : sheetIdx;
          animateToAngle(targetIdx, dragAngle, 0, currentFlipped - 1, "right", true);
        } else {
          // Snap back
          animateToAngle(sheetIdx, dragAngle, 0, currentFlipped, "left", true);
        }
      }
    } else {
      // Slow drag release: check if dragged past 50% midpoint (-90 deg)
      const threshold = -90;
      if (dragDirection.current === "left") {
        if (dragAngle < threshold) {
          // Dragged past 50% -> complete flip forward
          animateToAngle(sheetIdx, dragAngle, -180, currentFlipped + 1, "left", true);
        } else {
          // Snap back to 0 deg
          animateToAngle(sheetIdx, dragAngle, 0, currentFlipped, "right", true);
        }
      } else if (dragDirection.current === "right") {
        if (dragAngle > threshold) {
          // Dragged past 50% -> complete flip backward
          animateToAngle(sheetIdx, dragAngle, 0, currentFlipped - 1, "right", true);
        } else {
          // Snap back to -180 deg
          animateToAngle(sheetIdx, dragAngle, -180, currentFlipped, "left", true);
        }
      }
    }
  };

  const handlePrev = () => {
    if (isAnimatingRef.current || isDragging) return;
    if (currentFlipped >= 0) {
      animateToAngle(currentFlipped, -180, 0, currentFlipped - 1, "right", true);
    }
  };

  const handleNext = () => {
    if (isAnimatingRef.current || isDragging) return;
    if (currentFlipped < totalSheets - 1) {
      animateToAngle(currentFlipped + 1, 0, -180, currentFlipped + 1, "left", true);
    }
  };

  // Calculate book wrapper translation to center the active pages
  let translateX = 0;
  if (isDragging || isAnimatingRef.current) {
    if (draggedSheet === 0 && dragAngle !== null) {
      const progress = Math.min(1, Math.max(0, Math.abs(dragAngle) / 180));
      translateX = -25 + progress * 25;
    } else if (draggedSheet === totalSheets - 1 && dragAngle !== null) {
      const progress = Math.min(1, Math.max(0, Math.abs(dragAngle) / 180));
      translateX = progress * 25;
    } else {
      translateX = 0;
    }
  } else {
    if (currentFlipped === -1) {
      translateX = -25;
    } else if (currentFlipped === totalSheets - 1) {
      translateX = 25;
    } else {
      translateX = 0;
    }
  }

  return (
    <div className={cn("flex flex-col items-center gap-8 w-full select-none", className)}>
      {/* Book Container */}
      <div
        ref={containerRef}
        className="book-container shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-foreground/5 rounded-2xl bg-neutral-900/40 backdrop-blur-sm p-2 sm:p-4 md:p-8"
        style={{
          width: "100%",
          maxWidth: `${width}px`,
          touchAction: "pan-y",
        }}
      >
        <div className="book-viewport">
          <div
            className={cn(
              "book-wrap w-full h-full",
              isDragging || isAnimatingRef.current ? "transition-none" : "transition-transform duration-[350ms] ease-out"
            )}
            style={{
              transform: `translateX(${translateX}%)`,
            }}
          >
            {/* Spine Shadow Line */}
            <div className="book-spine" />

            {/* Sheets */}
            {sheets.map((sheet, idx) => {
              const isFlipped = idx <= currentFlipped;

              // Calculate z-index stack height
              let zIndex = 0;
              if (isFlipped) {
                // Flipped sheets stack upwards on left
                zIndex = idx + 1;
              } else {
                // Unflipped sheets stack downwards on right
                zIndex = totalSheets - idx;
              }

              // Active sheet currently being dragged or animated
              const isBeingDragged = draggedSheet === idx;
              const isTopLeft = idx === currentFlipped;
              const isTopRight = idx === currentFlipped + 1;
              const isInteractive = isTopLeft || isTopRight;

              // Determine active rotation angle
              let rotation = isFlipped ? -180 : 0;
              let shadowOpacity = 0;

              if (isBeingDragged && dragAngle !== null) {
                rotation = dragAngle;
                const pct = Math.abs(rotation) / 180; // 0 to 1
                shadowOpacity = Math.sin(pct * Math.PI) * 0.45;
              }

              return (
                <div
                  key={idx}
                  className={cn(
                    "sheet-el",
                    isDragging && isBeingDragged ? "" : "transition-none",
                    isBeingDragged ? "flipping z-[200]" : ""
                  )}
                  style={{
                    zIndex: isBeingDragged ? 200 : zIndex,
                    transform: `rotateY(${rotation}deg)`,
                    cursor: isDragging && isBeingDragged ? "grabbing" : isInteractive ? "pointer" : "default",
                    pointerEvents: isInteractive || isBeingDragged ? "auto" : "none",
                    touchAction: isBeingDragged ? "none" : "pan-y",
                  }}
                  onPointerDown={(e) => handlePointerDown(e, idx)}
                  onPointerMove={(e) => handlePointerMove(e, idx)}
                  onPointerUp={(e) => handlePointerUp(e, idx)}
                  onPointerCancel={(e) => handlePointerUp(e, idx)}
                >
                  {/* Shadow layer to darken backing sheets during page lift */}
                  <div
                    className="sheet-shadow"
                    style={{
                      opacity: shadowOpacity,
                      background:
                        dragDirection.current === "left"
                          ? "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)"
                          : "linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)",
                    }}
                  />

                  {/* Front Face (Right Side Page) */}
                  <div className="page-face-el front overflow-hidden rounded-r-xl border-l border-neutral-950 bg-neutral-900 shadow-[inset_10px_0_20px_rgba(0,0,0,0.5)]">
                    {sheet.front}
                  </div>

                  {/* Back Face (Left Side Page) */}
                  <div className="page-face-el back overflow-hidden rounded-l-xl border-r border-neutral-950 bg-neutral-900 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5)]">
                    {sheet.back || (
                      <div className="w-full h-full bg-[#111111] flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-foreground/20">End</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col items-center gap-2 z-40">
        <span className="text-[7.5px] uppercase tracking-[0.2em] text-gold/80 sm:hidden font-mono font-medium animate-pulse">
          Swipe left/right or tap buttons to flip
        </span>
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={handlePrev}
            disabled={currentFlipped < 0 || isAnimatingRef.current}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/20 flex items-center justify-center text-foreground/80 hover:text-gold hover:border-gold/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 bg-background-alt/40 backdrop-blur-sm cursor-pointer shadow-md"
            title="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-foreground/50 font-mono">
            Page {currentFlipped === -1 ? 1 : (currentFlipped + 1) * 2} of {totalSheets * 2}
          </span>
          <button
            onClick={handleNext}
            disabled={currentFlipped >= totalSheets - 1 || isAnimatingRef.current}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gold/20 flex items-center justify-center text-foreground/80 hover:text-gold hover:border-gold/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 bg-background-alt/40 backdrop-blur-sm cursor-pointer shadow-md"
            title="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}


