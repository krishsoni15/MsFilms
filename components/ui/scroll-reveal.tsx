"use client";

import { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./scroll-reveal.css";

// Safely register GSAP plugin only on the client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const getChildrenText = (children: React.ReactNode): string => {
  if (typeof children === "string") return children;
  if (typeof children === "number") return children.toString();
  if (Array.isArray(children)) return children.map(getChildrenText).join("");
  return "";
};

interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  className?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  preset?: "blur" | "fade" | "slide" | "scale";
  yOffset?: number;
  as?: React.ElementType;
}

export function ScrollReveal({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  className = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
  preset = "blur",
  yOffset = 24,
  as: Component = "h2",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  const splitText = useMemo(() => {
    const text = getChildrenText(children);
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Use gsap.context to manage trigger instances scoped to this component and clean up cleanly
    const ctx = gsap.context(() => {
      // Rotation animation (only for blur preset and non-zero baseRotation)
      if (preset === "blur" && baseRotation !== 0) {
        gsap.fromTo(
          el,
          { transformOrigin: "0% 50%", rotate: baseRotation },
          {
            ease: "none",
            rotate: 0,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom",
              end: rotationEnd,
              scrub: true,
            },
          }
        );
      }

      const wordElements = el.querySelectorAll(".word");

      // Set up from and to animation properties based on selected preset
      const fromVars: gsap.TweenVars = {
        opacity: baseOpacity,
      };

      const toVars: gsap.TweenVars = {
        ease: "none",
        opacity: 1,
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      };

      if (preset === "slide") {
        fromVars.y = yOffset;
        toVars.y = 0;
      } else if (preset === "scale") {
        fromVars.scale = 0.82;
        toVars.scale = 1;
        fromVars.transformOrigin = "50% 50%";
      }

      // Main reveal tween (handles opacity and layout/transform variables)
      gsap.fromTo(wordElements, fromVars, toVars);

      // PERFORMANCE: Blur filter animation is extremely expensive — it forces a
      // full repaint on every scrub frame for every word element.
      // Instead of animating blur on scroll, just set initial blur and clear it
      // with a simple CSS transition when the element comes into view.
      if (enableBlur && preset === "blur") {
        // Set initial blur via CSS class, let the scrub opacity handle the reveal timing
        Array.from(wordElements).forEach((word) => {
          (word as HTMLElement).style.filter = `blur(${blurStrength}px)`;
          (word as HTMLElement).style.transition = "filter 0.6s ease-out";
        });

        // Use a single IntersectionObserver to clear blur when section enters view
        const blurObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              Array.from(wordElements).forEach((word) => {
                (word as HTMLElement).style.filter = "blur(0px)";
              });
              blurObserver.disconnect();
            }
          },
          { threshold: 0.1 }
        );
        blurObserver.observe(el);
      }
    }, el);

    return () => {
      ctx.revert(); // Reverts only animations and scroll triggers defined inside this context
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    preset,
    yOffset,
  ]);

  return (
    <Component ref={containerRef} className={`scroll-reveal ${containerClassName} ${className}`}>
      <span className={`scroll-reveal-text ${textClassName}`}>{splitText}</span>
    </Component>
  );
}

export default ScrollReveal;
