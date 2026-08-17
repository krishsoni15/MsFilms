"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll() {
  useEffect(() => {
    // Initialize Lenis with premium easing config
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    // Animate Lenis on every frame
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // Bind link clicks to Lenis smooth scroll anchors
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const id = anchor.getAttribute("href");
        if (id === "#") return;
        const element = document.querySelector(id!);
        if (element instanceof HTMLElement) {
          lenis.scrollTo(element, {
            offset: -80, // Offset to clear fixed navbar
            duration: 1.2,
          });
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);

    // Stop Lenis if preloader is active, start it when preloader is gone
    const checkPreloader = () => {
      const isPreloaderActive =
        document.documentElement.classList.contains("preloader-active") ||
        !!document.getElementById("preloader");
      if (isPreloaderActive) {
        lenis.stop();
      } else {
        lenis.start();
        // Recalculate ScrollTrigger markers once DOM layout height is final
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);
      }
    };

    checkPreloader();

    const observer = new MutationObserver(() => {
      checkPreloader();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      observer.disconnect();
    };
  }, []);

  return null;
}
