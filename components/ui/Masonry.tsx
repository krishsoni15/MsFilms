"use client";

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Maximize2 } from "lucide-react";
import "./Masonry.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const MEDIA_QUERIES = [
  "(min-width:1500px)",
  "(min-width:1000px)",
  "(min-width:600px)",
  "(min-width:400px)",
];
const MEDIA_VALUES = [4, 3, 2, 2];
const DEFAULT_COLUMNS = 1;

export interface MasonryItem {
  id: string | number;
  img: string;
  url?: string;
  height: number;
  title?: string;
  category?: string;
  location?: string;
}

export interface MasonryProps {
  items: MasonryItem[];
  ease?: string;
  duration?: number;
  stagger?: number;
  animateFrom?: "top" | "bottom" | "left" | "right" | "center" | "random";
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
  colorShiftOnHover?: boolean;
  onItemClick?: (item: MasonryItem) => void;
}

interface GridItem extends MasonryItem {
  x: number;
  y: number;
  w: number;
  h: number;
}

const useMedia = <T,>(queries: string[], values: T[], defaultValue: T): T => {
  const get = () => {
    if (typeof window === "undefined") return defaultValue;
    const match = queries.findIndex((q) => matchMedia(q).matches);
    return values[match] !== undefined ? values[match] : defaultValue;
  };

  const [value, setValue] = useState<T>(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener("change", handler));
  }, [queries]);

  return value;
};

const useMeasure = (): [React.RefObject<HTMLDivElement | null>, { width: number; height: number }] => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

// preloadImages removed — Next.js <Image> handles lazy loading natively

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.05,
  animateFrom = "bottom",
  scaleOnHover = true,
  hoverScale = 0.96,
  blurToFocus = true,
  colorShiftOnHover = false,
  onItemClick,
}: MasonryProps) => {
  const columns = useMedia<number>(MEDIA_QUERIES, MEDIA_VALUES, DEFAULT_COLUMNS);
  const [containerRef, { width }] = useMeasure();

  const getInitialPosition = (item: GridItem) => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };

    let direction = animateFrom;

    if (animateFrom === "random") {
      const directions = ["top", "bottom", "left", "right"];
      direction = directions[Math.floor(Math.random() * directions.length)] as any;
    }

    switch (direction) {
      case "top":
        return { x: item.x, y: -150 };
      case "bottom":
        return { x: item.x, y: window.innerHeight + 150 };
      case "left":
        return { x: -150, y: item.y };
      case "right":
        return { x: window.innerWidth + 150, y: item.y };
      case "center":
        return {
          x: containerRect.width / 2 - item.w / 2,
          y: containerRect.height / 2 - item.h / 2,
        };
      default:
        return { x: item.x, y: item.y + 80 };
    }
  };

  // Images load lazily via Next.js <Image> — no blocking preload needed

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return [];

    const colHeights = new Array(columns).fill(0);
    const gap = 16;
    const totalGap = gap * (columns - 1);
    const columnWidth = (width - totalGap) / columns;

    return items.map((child) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const height = child.height / 2.2;
      const y = colHeights[col];

      colHeights[col] += height + gap;

      return { ...child, x, y, w: columnWidth, h: height };
    });
  }, [columns, items, width]);

  const maxGridHeight = useMemo(() => {
    if (grid.length === 0) return 0;
    return Math.max(...grid.map((item) => item.y + item.h));
  }, [grid]);

  useLayoutEffect(() => {
    if (!containerRef.current || grid.length === 0) return;

    const ctx = gsap.context(() => {
      grid.forEach((item, index) => {
        const selector = `[data-key="${item.id}"]`;
        const el = containerRef.current?.querySelector(selector) as HTMLElement | null;
        if (!el) return;

        const isRevealed = el.getAttribute("data-revealed") === "true";

        if (isRevealed) {
          gsap.to(el, {
            x: item.x,
            y: item.y,
            width: item.w,
            height: item.h,
            duration: duration || 0.5,
            ease: ease || "power2.out",
            overwrite: "auto",
          });
        } else {
          // Bottom-to-top entrance offset
          const offsetY = 65;

          gsap.set(el, {
            x: item.x,
            y: item.y + offsetY,
            width: item.w,
            height: item.h,
            opacity: 0,
            scale: 0.94,
            filter: blurToFocus ? "blur(8px)" : "none",
          });

          ScrollTrigger.create({
            trigger: el,
            start: "top 92%",
            once: true,
            onEnter: () => {
              el.setAttribute("data-revealed", "true");
              gsap.to(el, {
                x: item.x,
                y: item.y,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: duration || 0.75,
                ease: ease || "power3.out",
                delay: (index % columns) * 0.08,
              });
            },
          });
        }
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [grid, columns, blurToFocus, duration, ease]);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, item: GridItem) => {
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, item: GridItem) => {
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleClick = (item: GridItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else if (item.url) {
      window.open(item.url, "_blank", "noopener");
    }
  };

  return (
    <div
      ref={containerRef}
      className="list relative w-full"
      style={{ height: maxGridHeight ? `${maxGridHeight}px` : "auto" }}
    >
      {grid.map((item) => {
        return (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper group cursor-pointer"
            style={{ width: item.w, height: item.h }}
            onClick={() => handleClick(item)}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
          >
            <div className="item-img relative w-full h-full overflow-hidden rounded-xl border border-foreground/10 shadow-xl bg-background-alt">
              <Image
                src={item.img}
                alt={item.title || "MSFilms Portfolio Image"}
                fill
                sizes="(max-width: 600px) 50vw, (max-width: 1000px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-108"
                quality={70}
                loading="lazy"
              />

              {/* Hover Dark Overlay & Text Badges */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10 pointer-events-none">
                <div className="flex justify-between items-center">
                  {item.category && (
                    <span className="px-2.5 py-1 rounded-full bg-gold/90 text-black text-[9px] font-sans font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                  )}
                  <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <Maximize2 size={12} />
                  </div>
                </div>

                <div>
                  {item.title && (
                    <h4 className="font-serif text-base text-white font-normal leading-tight uppercase tracking-wide">
                      {item.title}
                    </h4>
                  )}
                  {item.location && (
                    <p className="font-sans text-[10px] text-gold/90 tracking-wider uppercase font-medium mt-0.5">
                      {item.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Masonry;

