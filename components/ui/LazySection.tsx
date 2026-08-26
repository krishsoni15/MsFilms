"use client";

import React, { useRef, useState, useEffect, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  /** How far before the section enters the viewport to start rendering (px) */
  rootMargin?: string;
  /** Minimum height for the placeholder before content loads */
  minHeight?: string;
  /** Optional className for the wrapper */
  className?: string;
}

/**
 * LazySection — Only renders children when the section is near the viewport.
 * Uses IntersectionObserver with a generous rootMargin to pre-load content
 * before the user scrolls to it, avoiding layout shift.
 * 
 * Once activated, stays mounted permanently (no unmounting on scroll away).
 */
export function LazySection({
  children,
  rootMargin = "300px",
  minHeight = "400px",
  className = "",
}: LazySectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Once visible, stay mounted permanently
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={sentinelRef} className={className}>
      {isVisible ? (
        children
      ) : (
        <div
          style={{ minHeight }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

export default LazySection;
