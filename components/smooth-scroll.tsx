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

    // Expose lenis instance globally for scroll-to-top access
    (window as any).lenis = lenis;

    // Sync Lenis scroll updates with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync Lenis updates with the GSAP ticker to eliminate scroll animation jitter
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000); // GSAP Ticker provides seconds, Lenis expects milliseconds
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

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

    // ONE-TIME preloader detection — no MutationObserver needed.
    // Check if preloader is active. If so, stop Lenis and poll until it's gone.
    // Once it's gone, start Lenis, refresh ScrollTrigger once, and stop polling.
    const isPreloaderActive = () =>
      document.documentElement.classList.contains("preloader-active") ||
      !!document.getElementById("preloader");

    if (isPreloaderActive()) {
      lenis.stop();
      const pollId = setInterval(() => {
        if (!isPreloaderActive()) {
          clearInterval(pollId);
          lenis.start();
          // Single refresh after preloader is fully gone and DOM has settled
          requestAnimationFrame(() => {
            ScrollTrigger.refresh();
          });
        }
      }, 200);
    }

    // Sync ScrollTrigger when the body height changes (due to lazy loading, image mounts, etc.)
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      delete (window as any).lenis;
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      document.removeEventListener("click", handleAnchorClick);
      resizeObserver.disconnect();
    };
  }, []);

  return null;
}
