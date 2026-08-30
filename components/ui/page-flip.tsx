"use client";

import React, { useState, useRef, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import "./page-flip.css";

interface PageFlipProps {
  children: ReactNode[];
  width?: number; // Total book width on desktop
  height?: number; // Total book height on desktop
  className?: string;
}

export default function PageFlip({
  children,
  width = 900,
  height = 550,
  className,
}: PageFlipProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFlipped, setCurrentFlipped] = useState(-1); // -1 means book is closed (cover is showing)

  // Dragging and Animation states
  const [draggedSheet, setDraggedSheet] = useState<number | null>(null);
  const [dragAngle, setDragAngle] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDirection = useRef<"left" | "right" | null>(null);
  const dragStartTime = useRef(0);
  const isAnimatingRef = useRef(false);

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

  // Programmatic Page Curl Transition (Handles snap back, clicks, and buttons)
  const animateToAngle = (
    sheetIdx: number,
    fromAngle: number,
    toAngle: number,
    finalFlipped: number,
    direction: "left" | "right"
  ) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const duration = 350; // ms transition time (snappy and fast)
    const startTime = performance.now();

    setDraggedSheet(sheetIdx);
    dragDirection.current = direction;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic for a natural swing
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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, sheetIdx: number) => {
    if (isAnimatingRef.current) return;

    const isTopLeft = sheetIdx === currentFlipped;
    const isTopRight = sheetIdx === currentFlipped + 1;

    if (!isTopLeft && !isTopRight) return;

    // Detect if click is on the left side or right side of the book center
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isClickOnLeft = x < rect.width / 2;

    if (isClickOnLeft && sheetIdx !== currentFlipped) return;
    if (!isClickOnLeft && sheetIdx !== currentFlipped + 1) return;

    // Capture pointer events to track movement even outside the card boundary
    e.currentTarget.setPointerCapture(e.pointerId);

    setIsDragging(true);
    setDraggedSheet(sheetIdx);
    dragStartX.current = e.clientX;
    dragStartTime.current = performance.now();
    dragDirection.current = isClickOnLeft ? "right" : "left";
    setDragAngle(sheetIdx === currentFlipped ? -180 : 0);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, sheetIdx: number) => {
    if (!isDragging || draggedSheet !== sheetIdx || dragAngle === null || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const deltaX = e.clientX - dragStartX.current;
    const halfWidth = rect.width / 2;

    // Calculate rotation angle based on drag delta
    let angle = 0;
    if (dragDirection.current === "left") {
      const pct = Math.max(0, Math.min(1, -deltaX / halfWidth));
      angle = pct * -180;
    } else {
      const pct = Math.max(0, Math.min(1, deltaX / halfWidth));
      angle = -180 + pct * 180;
    }

    setDragAngle(angle);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>, sheetIdx: number) => {
    if (!isDragging || draggedSheet !== sheetIdx || dragAngle === null) return;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) { }

    setIsDragging(false);

    const deltaX = e.clientX - dragStartX.current;
    const elapsed = performance.now() - dragStartTime.current;
    const velocityX = deltaX / elapsed; // px/ms

    const isClick = Math.abs(deltaX) < 10 && elapsed < 250; // brief, tiny movement is a click
    const isSwipe = Math.abs(velocityX) > 0.25 && Math.abs(deltaX) > 30; // quick flicks are swipes

    if (isClick) {
      // Tap/Click turns page
      if (sheetIdx === currentFlipped) {
        // Clicked left page -> flip back (prev page)
        animateToAngle(sheetIdx, dragAngle, 0, currentFlipped - 1, "right");
      } else if (sheetIdx === currentFlipped + 1) {
        // Clicked right page -> flip forward (next page)
        animateToAngle(sheetIdx, dragAngle, -180, currentFlipped + 1, "left");
      }
    } else if (isSwipe) {
      // Swipe/Flick gesture: flip immediately in the flick's direction
      if (deltaX < 0) {
        // Flicked left -> flip forward
        if (currentFlipped < totalSheets - 1) {
          animateToAngle(sheetIdx, dragAngle, -180, currentFlipped + 1, "left");
        } else {
          // Cancel/snap back to flat Y-axis
          animateToAngle(sheetIdx, dragAngle, dragAngle < -90 ? -180 : 0, currentFlipped, dragAngle < -90 ? "left" : "right");
        }
      } else {
        // Flicked right -> flip backward
        if (currentFlipped >= 0) {
          animateToAngle(sheetIdx, dragAngle, 0, currentFlipped - 1, "right");
        } else {
          // Cancel/snap back to flat Y-axis
          animateToAngle(sheetIdx, dragAngle, dragAngle < -90 ? -180 : 0, currentFlipped, dragAngle < -90 ? "left" : "right");
        }
      }
    } else {
      // Slow drag release: flip if dragged past 50% midpoint threshold
      const threshold = -90; // midpoint angle
      if (dragDirection.current === "left") {
        if (dragAngle < threshold) {
          animateToAngle(sheetIdx, dragAngle, -180, currentFlipped + 1, "left");
        } else {
          animateToAngle(sheetIdx, dragAngle, 0, currentFlipped, "right");
        }
      } else if (dragDirection.current === "right") {
        if (dragAngle > threshold) {
          animateToAngle(sheetIdx, dragAngle, 0, currentFlipped - 1, "right");
        } else {
          animateToAngle(sheetIdx, dragAngle, -180, currentFlipped, "left");
        }
      }
    }
  };

  const handlePrev = () => {
    if (isAnimatingRef.current || isDragging) return;
    if (currentFlipped >= 0) {
      animateToAngle(currentFlipped, -180, 0, currentFlipped - 1, "right");
    }
  };

  const handleNext = () => {
    if (isAnimatingRef.current || isDragging) return;
    if (currentFlipped < totalSheets - 1) {
      animateToAngle(currentFlipped + 1, 0, -180, currentFlipped + 1, "left");
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
        className="book-container shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-foreground/5 rounded-2xl bg-neutral-900/40 backdrop-blur-sm p-4 md:p-8"
        style={{
          width: "100%",
          maxWidth: `${width}px`,
          aspectRatio: "1.6 / 1",
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
                // Flipped sheets stack upwards
                zIndex = idx + 1;
              } else {
                // Unflipped sheets stack downwards
                zIndex = totalSheets - idx;
              }

              // Active sheet currently being dragged or animated
              const isBeingDragged = draggedSheet === idx;

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
                    isDragging && isBeingDragged ? "" : "transition-none", // Programmatic ease loops control movement
                    isBeingDragged ? "flipping z-[200]" : ""
                  )}
                  style={{
                    zIndex: isBeingDragged ? 200 : zIndex,
                    transform: `rotateY(${rotation}deg)`,
                    cursor: isDragging && isBeingDragged ? "grabbing" : (idx === currentFlipped || idx === currentFlipped + 1) ? "grab" : "default",
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
                      background: dragDirection.current === "left"
                        ? "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)"
                        : "linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 100%)"
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
      <div className="flex items-center gap-6">
        <button
          onClick={handlePrev}
          disabled={currentFlipped < 0 || isAnimatingRef.current}
          className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-foreground/80 hover:text-gold hover:border-gold/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 bg-background-alt/40 backdrop-blur-sm cursor-pointer shadow-md"
          title="Previous Page"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-mono">
          Page {currentFlipped === -1 ? 1 : (currentFlipped + 1) * 2} of {totalSheets * 2}
        </span>
        <button
          onClick={handleNext}
          disabled={currentFlipped >= totalSheets - 1 || isAnimatingRef.current}
          className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-foreground/80 hover:text-gold hover:border-gold/50 disabled:opacity-30 disabled:pointer-events-none transition-all duration-300 bg-background-alt/40 backdrop-blur-sm cursor-pointer shadow-md"
          title="Next Page"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
