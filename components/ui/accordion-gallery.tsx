"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import "./accordion-gallery.css";

export interface AccordionItem {
  image: string;
  label?: string;
  link?: string;
  alt?: string;
  [key: string]: unknown; // Allow custom properties
}

interface AccordionGalleryProps {
  items: AccordionItem[];
  defaultIndex?: number;
  accentColor?: string;
  overlayColor?: string;
  textColor?: string;
  height?: number;
  gap?: number;
  radius?: number;
  expandRatio?: number;
  orientation?: "horizontal" | "vertical";
  duration?: number;
  ease?: string;
  parallax?: number;
  tilt?: number;
  stagger?: number;
  trigger?: "hover" | "click";
  showLabels?: boolean;
  grayscale?: boolean;
  className?: string;
  onItemClick?: (item: AccordionItem, index: number) => void;
}

export function AccordionGallery({
  items,
  defaultIndex = 2,
  accentColor = "#ffffff",
  overlayColor = "#020912",
  textColor = "#ffffff",
  height = 500,
  gap = 12,
  radius = 8,
  expandRatio = 0.52,
  orientation = "horizontal",
  duration = 0.6,
  ease = "power3.out",
  parallax = 0.5,
  tilt = 6,
  stagger = 0.06,
  trigger = "hover",
  showLabels = true,
  grayscale = false,
  className = "",
  onItemClick
}: AccordionGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLElement | null)[]>([]);
  const barRefs = useRef<(HTMLElement | null)[]>([]);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const mediaSizeRef = useRef(320);
  const activeRef = useRef(Math.min(Math.max(defaultIndex, 0), items.length - 1));

  // State only for className toggling (gold border on active panel)
  const [activeForRender, setActiveForRender] = useState(activeRef.current);

  const vertical = orientation === "vertical";
  const count = items.length;

  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  // Imperative GSAP layout — reads from refs, NOT React state
  const animateTo = useCallback(
    (targetIndex: number, animate: boolean) => {
      const panels = panelRefs.current;
      if (!panels.length) return;

      activeRef.current = targetIndex;

      const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
      const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
      const ms = mediaSizeRef.current;

      tlRef.current?.kill();
      const dur = animate && !prefersReduced ? duration : 0;
      const tl = gsap.timeline();

      panels.forEach((panel, i) => {
        if (!panel) return;
        const isActive = i === targetIndex;
        const media = mediaRefs.current[i];
        const overlay = overlayRefs.current[i];
        const bar = barRefs.current[i];
        const text = textRefs.current[i];

        const rot = isActive ? 0 : i < targetIndex ? tilt : -tilt;
        const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

        tl.to(panel, { flexGrow: isActive ? grow : 1, ...rotProp, duration: dur, ease }, 0);

        if (media) {
          const drift = Math.max(-1.5, Math.min(1.5, targetIndex - i));
          const shift = drift * parallax * ms * 0.06;
          const gray = grayscale ? (isActive ? 0 : 1) : 0;
          tl.to(
            media,
            {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : isActive ? 0 : shift,
              y: vertical ? (isActive ? 0 : shift) : 0,
              filter: `grayscale(${gray})`,
              duration: dur,
              ease
            },
            0
          );
        }

        if (overlay) {
          tl.to(overlay, { opacity: isActive ? 0 : 0.35, duration: dur, ease }, 0);
        }

        if (showLabels && bar && text) {
          if (isActive) {
            tl.to([bar, text], { opacity: 1, x: 0, duration: dur, ease, stagger: prefersReduced ? 0 : stagger }, 0);
          } else {
            tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease }, 0);
          }
        }

        // Toggle active class directly on the DOM (instant, no React render needed)
        panel.classList.toggle("ag-panel--active", isActive);
      });

      tlRef.current = tl;

      // Update React state for any future re-render consistency
      setActiveForRender(targetIndex);
    },
    [count, expandRatio, duration, ease, vertical, tilt, parallax, showLabels, stagger, prefersReduced]
  );

  // Measure container and set up initial layout
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const total = vertical ? rect.height : rect.width;
      const usable = Math.max(total - gap * (count - 1), 120);
      const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
      mediaSizeRef.current = size;
      el.style.setProperty("--ag-media-size", `${size}px`);
    };

    measure();
    // Initial layout (no animation)
    animateTo(activeRef.current, false);

    const ro = new ResizeObserver(() => {
      measure();
      animateTo(activeRef.current, false);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [gap, count, expandRatio, vertical, animateTo]);

  useEffect(() => {
    return () => { tlRef.current?.kill(); };
  }, []);

  // Direct imperative handlers — NO React state in the hot path
  const handleEnter = (i: number) => {
    if (trigger === "hover" && activeRef.current !== i) {
      animateTo(i, true);
    }
  };

  const handleClick = (i: number, e: React.MouseEvent) => {
    if (trigger === "click") {
      e.preventDefault();
      animateTo(i, true);
    }
    if (onItemClick) {
      e.preventDefault();
      onItemClick(items[i], i);
    } else if (trigger === "hover") {
      e.preventDefault();
      animateTo(i, true);
    }
  };

  return (
    <div
      ref={rootRef}
      className={`accordion-gallery${vertical ? " accordion-gallery--vertical" : ""}${className ? ` ${className}` : ""}`}
      style={{
        "--ag-accent": accentColor,
        "--ag-overlay": overlayColor,
        "--ag-text": textColor,
        "--ag-gap": `${gap}px`,
        "--ag-radius": `${radius}px`,
        height: vertical ? `${Math.round(height * 1.6)}px` : `${height}px`
      } as React.CSSProperties}
      role="list"
      aria-label="Image accordion gallery"
    >
      {items.map((item, i) => {
        const isActive = i === activeForRender;
        return (
          <div
            key={i}
            ref={(el: HTMLDivElement | null) => { panelRefs.current[i] = el; }}
            className={`ag-panel${isActive ? " ag-panel--active" : ""}`}
            style={{ borderRadius: `${radius}px` }}
            onClick={e => handleClick(i, e)}
            onMouseEnter={() => handleEnter(i)}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
          >
            <span className="ag-panel__frame">
              <span
                className="ag-panel__media"
                ref={(el: HTMLSpanElement | null) => { mediaRefs.current[i] = el; }}
              >
                <Image src={item.image} alt={item.alt || item.label || ""} fill className="object-cover" draggable="false" />
              </span>
              <span
                className="ag-panel__overlay"
                ref={(el: HTMLSpanElement | null) => { overlayRefs.current[i] = el; }}
                aria-hidden="true"
              />
            </span>
            {showLabels && (
              <span className="ag-panel__label" aria-hidden="true">
                <span className="ag-panel__bar" ref={(el: HTMLSpanElement | null) => { barRefs.current[i] = el; }} />
                <span className="ag-panel__text" ref={(el: HTMLSpanElement | null) => { textRefs.current[i] = el; }}>
                  {item.label}
                </span>
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AccordionGallery;
