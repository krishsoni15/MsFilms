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
  const isPointerDownRef = useRef(false);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const dragDirection = useRef<"left" | "right" | null>(null);
  const dragStartTime = useRef(0);
  const hasMovedRef = useRef(false);
  const isClickOnInteractive = useRef(false);
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

    const duration = 350; // ms transition time (fast, crisp, and responsive)
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

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimatingRef.current) return;

    const target = e.target as HTMLElement;
    isClickOnInteractive.current = !!target.closest("a, button, input, [role='button']");

    // Prevent browser native image dragging or text selection
    if (!isClickOnInteractive.current) {
      e.preventDefault();
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}

    isPointerDownRef.current = true;
    hasMovedRef.current = false;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragStartTime.current = performance.now();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current || isAnimatingRef.current) return;

    const deltaX = e.clientX - dragStartX.current;
    const deltaY = e.clientY - dragStartY.current;

    const rect = containerRef.current?.getBoundingClientRect();
    const halfWidth = rect ? rect.width / 2 : 450;

    if (!isDragging) {
      // Don't hijack vertical scrolling
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 12) {
        isPointerDownRef.current = false;
        try {
          e.currentTarget.releasePointerCapture(e.pointerId);
        } catch (err) {}
        return;
      }

      // Responsive grab threshold
      if (Math.abs(deltaX) > 4) {
        hasMovedRef.current = true;

        if (deltaX > 0) {
          // Swiping right -> flip backward (left sheet turns back to right)
          if (currentFlipped >= 0) {
            setIsDragging(true);
            setDraggedSheet(currentFlipped);
            dragDirection.current = "right";
            const pct = Math.max(0, Math.min(1, deltaX / halfWidth));
            setDragAngle(-180 + pct * 180);
          }
        } else {
          // Swiping left -> flip forward (right sheet turns forward to left)
          if (currentFlipped < totalSheets - 1) {
            setIsDragging(true);
            setDraggedSheet(currentFlipped + 1);
            dragDirection.current = "left";
            const pct = Math.max(0, Math.min(1, -deltaX / halfWidth));
            setDragAngle(-pct * 180);
          }
        }
      }
    } else {
      // Already dragging active sheet
      if (dragDirection.current === "right") {
        const pct = Math.max(0, Math.min(1, deltaX / halfWidth));
        setDragAngle(-180 + pct * 180);
      } else if (dragDirection.current === "left") {
        const pct = Math.max(0, Math.min(1, -deltaX / halfWidth));
        setDragAngle(-pct * 180);
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    const deltaX = e.clientX - dragStartX.current;
    const elapsed = performance.now() - dragStartTime.current;

    // Handle Tap / Click on page
    if (!hasMovedRef.current && !isDragging) {
      if (isClickOnInteractive.current) {
        return; // Allow native click on links/buttons
      }

      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const clickX = e.clientX - rect.left;
        if (currentFlipped === -1) {
          handleNext();
        } else if (currentFlipped === totalSheets - 1) {
          handlePrev();
        } else {
          if (clickX < rect.width / 2) {
            handlePrev();
          } else {
            handleNext();
          }
        }
      }
      return;
    }

    // Handle Drag / Swipe release
    if (isDragging && draggedSheet !== null && dragAngle !== null) {
      setIsDragging(false);
      const velocityX = deltaX / elapsed;
      const isSwipe = Math.abs(velocityX) > 0.18 && Math.abs(deltaX) > 20;

      if (dragDirection.current === "right") {
        if ((isSwipe && deltaX > 0) || dragAngle > -90) {
          // Successfully flipped backward
          animateToAngle(draggedSheet, dragAngle, 0, currentFlipped - 1, "right", true);
        } else {
          // Snap back to -180
          animateToAngle(draggedSheet, dragAngle, -180, currentFlipped, "left", true);
        }
      } else if (dragDirection.current === "left") {
        if ((isSwipe && deltaX < 0) || dragAngle < -90) {
          // Successfully flipped forward
          animateToAngle(draggedSheet, dragAngle, -180, currentFlipped + 1, "left", true);
        } else {
          // Snap back to 0
          animateToAngle(draggedSheet, dragAngle, 0, currentFlipped, "right", true);
        }
      }
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    if (isDragging && draggedSheet !== null && dragAngle !== null) {
      setIsDragging(false);
      if (dragDirection.current === "right") {
        animateToAngle(draggedSheet, dragAngle, -180, currentFlipped, "left", true);
      } else if (dragDirection.current === "left") {
        animateToAngle(draggedSheet, dragAngle, 0, currentFlipped, "right", true);
      }
    }
  };

  // Dynamic translateX: centers closed cover card on right/left and centers 2-page spread when open
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
        className="book-container shadow-[0_30px_70px_rgba(0,0,0,0.5)] border border-border/40 rounded-2xl bg-background-alt/50 backdrop-blur-md p-2 sm:p-4 md:p-8"
        style={{
          width: "100%",
          maxWidth: `${width}px`,
          touchAction: "pan-y",
        }}
      >
        <div
          className="book-viewport select-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onDragStart={(e) => e.preventDefault()}
          style={{
            cursor: isDragging ? "grabbing" : "pointer",
            touchAction: "pan-y",
            userSelect: "none",
            WebkitUserSelect: "none",
          }}
        >
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

              // If sheet is tilted past 90 degrees, back face is facing the user
              const isFacingLeft = isBeingDragged ? (dragAngle !== null && dragAngle < -90) : isFlipped;

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
                  }}
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
                  <div
                    className="page-face-el front overflow-hidden rounded-r-xl border-l border-border bg-background-alt shadow-[inset_10px_0_20px_rgba(0,0,0,0.4)]"
                    style={{
                      zIndex: isFacingLeft ? 1 : 2,
                      pointerEvents: isFacingLeft ? "none" : (isInteractive ? "auto" : "none"),
                    }}
                  >
                    {sheet.front}
                  </div>

                  {/* Back Face (Left Side Page) */}
                  <div
                    className="page-face-el back overflow-hidden rounded-l-xl border-r border-border bg-background-alt shadow-[inset_-10px_0_20px_rgba(0,0,0,0.4)]"
                    style={{
                      zIndex: isFacingLeft ? 2 : 1,
                      pointerEvents: isFacingLeft ? (isInteractive ? "auto" : "none") : "none",
                    }}
                  >
                    {sheet.back || (
                      <div className="w-full h-full bg-background-alt-2 flex items-center justify-center">
                        <span className="text-[10px] uppercase tracking-widest text-foreground/30">End</span>
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


