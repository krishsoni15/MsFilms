"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./scroll-expand.css";

// Register ScrollTrigger plugin on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollExpandProps {
  src?: string;
  mediaType?: "image" | "video";
  poster?: string;
  alt?: string;
  title?: string;
  scrollHint?: string;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  endRadius?: number;
  mediaZoom?: number;
  scrollDistance?: number;
  holdDistance?: number;
  smoothing?: number;
  overlayScrim?: number;
  useWindowScroll?: boolean;
  enabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maskType?: "inset" | "circle" | "feathered-circle";
  startRadiusVmax?: number;
  endRadiusVmax?: number;
  featherVmax?: number;
  showArrows?: boolean;
}

export function ScrollExpand({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.8,
  overlayScrim = 0.45,
  useWindowScroll = true,
  enabled = true,
  children,
  className = "",
  style,
  maskType = "inset",
  startRadiusVmax = 12,
  endRadiusVmax = 80,
  featherVmax = 15,
  showArrows = true,
  ...rest
}: ScrollExpandProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const bgDecorationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const frame = frameRef.current;
    const media = mediaRef.current;
    if (!root || !frame || !media) return;

    // Calculate initial inset percentages to center the frame
    const ix = Math.max(0, (100 - startWidth) / 2);
    const iy = Math.max(0, (100 - startHeight) / 2);

    const ctx = gsap.context(() => {
      // Create main scroll timeline with pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          // The total scroll duration of the pinning action
          end: `+=${window.innerHeight * scrollDistance}`,
          pin: true,
          scrub: smoothing,
          anticipatePin: 1,
          refreshPriority: 10,
          onEnter: () => {
            if (mediaType === "video" && media instanceof HTMLVideoElement) {
              media.play().catch(() => { });
            }
          },
          onEnterBack: () => {
            if (mediaType === "video" && media instanceof HTMLVideoElement) {
              media.play().catch(() => { });
            }
          },
          onLeave: () => {
            if (mediaType === "video" && media instanceof HTMLVideoElement) {
              media.pause();
            }
          },
          onLeaveBack: () => {
            if (mediaType === "video" && media instanceof HTMLVideoElement) {
              media.pause();
            }
          },
        },
      });

      // Set initial styles
      if (maskType === "feathered-circle") {
        gsap.set(frame, {
          clipPath: "none",
          maskImage: `radial-gradient(circle at 50% 50%, #000 ${startRadiusVmax}vmax, transparent ${startRadiusVmax + featherVmax}vmax)`,
          webkitMaskImage: `radial-gradient(circle at 50% 50%, #000 ${startRadiusVmax}vmax, transparent ${startRadiusVmax + featherVmax}vmax)`,
        });
      } else if (maskType === "circle") {
        gsap.set(frame, {
          clipPath: `circle(${startRadiusVmax}vmax at 50% 50%)`,
          maskImage: "none",
          webkitMaskImage: "none",
        });
      } else {
        gsap.set(frame, {
          clipPath: `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${startRadius}px)`,
          maskImage: "none",
          webkitMaskImage: "none",
        });
      }
      gsap.set(media, { scale: mediaZoom });
      if (scrimRef.current) gsap.set(scrimRef.current, { opacity: 0 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" });
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 1, y: 0 });
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0, y: 35, filter: "blur(18px)", pointerEvents: "none" });
      if (bgDecorationsRef.current) gsap.set(bgDecorationsRef.current, { opacity: 1, scale: 1 });

      // Animate clipPath, scale, and scrim opacity mathematically for perfect centering and rendering stability
      const stateObj = { progress: 0 };
      const totalDuration = 1 + holdDistance;
      tl.to(
        stateObj,
        {
          progress: 1,
          duration: totalDuration,
          ease: "none",
          onUpdate: () => {
            const p = stateObj.progress; // Goes from 0 to 1 over the entire scroll duration
            const t = p * totalDuration; // Current timeline time (from 0 to totalDuration)

            // clipProgress reaches 1 when t reaches 1.0
            const clipProgress = Math.min(1, t);

            if (maskType === "feathered-circle") {
              const innerRadius = startRadiusVmax + (endRadiusVmax - startRadiusVmax) * clipProgress;
              const outerRadius = innerRadius + featherVmax;
              frame.style.clipPath = "none";
              frame.style.maskImage = `radial-gradient(circle at 50% 50%, #000 ${innerRadius}vmax, transparent ${outerRadius}vmax)`;
              frame.style.webkitMaskImage = `radial-gradient(circle at 50% 50%, #000 ${innerRadius}vmax, transparent ${outerRadius}vmax)`;
            } else if (maskType === "circle") {
              const currentRadius = startRadiusVmax + (endRadiusVmax - startRadiusVmax) * clipProgress;
              frame.style.maskImage = "none";
              frame.style.webkitMaskImage = "none";
              frame.style.clipPath = `circle(${currentRadius}vmax at 50% 50%)`;
            } else {
              // Symmetrically interpolate width & height dimensions
              const currentW = startWidth + (100 - startWidth) * clipProgress;
              const currentH = startHeight + (100 - startHeight) * clipProgress;

              const curIx = Math.max(0, (100 - currentW) / 2);
              const curIy = Math.max(0, (100 - currentH) / 2);
              const r = startRadius + (endRadius - startRadius) * clipProgress;

              frame.style.maskImage = "none";
              frame.style.webkitMaskImage = "none";
              frame.style.clipPath = `inset(${curIy}% ${curIx}% ${curIy}% ${curIx}% round ${r}px)`;
            }

            // Interpolate media transform over the entire scroll progress p
            // Parallax scale: zooms down from mediaZoom (e.g. 1.22) to a clean 1.05
            // Parallax translation: slides vertically from -40px to 40px
            const currentScale = mediaZoom + (1.05 - mediaZoom) * p;
            const currentY = -40 + 80 * p;
            media.style.transform = `scale(${currentScale}) translateY(${currentY}px)`;

            if (scrimRef.current) {
              scrimRef.current.style.opacity = `${overlayScrim * clipProgress}`;
            }
          },
        },
        0
      );

      // Fade out title with elegant blur and scale drift
      if (titleRef.current) {
        tl.to(
          titleRef.current,
          {
            opacity: 0,
            y: -40,
            filter: "blur(16px)",
            scale: 1.06,
            duration: 0.6,
            ease: "power2.inOut",
          },
          0
        );
      }

      // Fade out hint
      if (hintRef.current) {
        tl.to(
          hintRef.current,
          {
            opacity: 0,
            y: 10,
            duration: 0.2,
            ease: "none",
          },
          0
        );
      }

      // Fade out background decorations
      if (bgDecorationsRef.current) {
        tl.to(
          bgDecorationsRef.current,
          {
            opacity: 0,
            scale: 0.94,
            duration: 0.6,
            ease: "none",
          },
          0
        );
      }

      // Fade in child overlays with elegant blur reveal once the frame is fully expanded
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            pointerEvents: "auto",
            duration: 0.55,
            ease: "power2.out",
          },
          0.55 // starts as the clipPath reaches full size
        );

        if (holdDistance > 0) {
          // Fade out and blur the child overlays towards the end of the pinned scroll
          tl.to(
            overlayRef.current,
            {
              opacity: 0,
              y: -30,
              filter: "blur(16px)",
              pointerEvents: "none",
              duration: holdDistance * 0.8,
              ease: "power2.in",
            },
            1.0 + holdDistance * 0.2
          );
        }
      }

      // Spacing is handled natively in totalDuration above


    }, root);

    return () => {
      ctx.revert();
    };
  }, [
    enabled,
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    mediaType,
    maskType,
    startRadiusVmax,
    endRadiusVmax,
    featherVmax,
  ]);

  const mediaElement =
    mediaType === "video" ? (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
      />
    ) : (
      <img
        ref={mediaRef as React.RefObject<HTMLImageElement>}
        className="scroll-expand__media"
        src={src}
        alt={alt}
        draggable={false}
      />
    );

  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${className}`}
      style={style}
      {...rest}
    >
      <div ref={stageRef} className="scroll-expand__stage">
        {/* Background decorations: big color glow and pointing arrows */}
        <div ref={bgDecorationsRef} className="scroll-expand__bg-decorations pointer-events-none">


          {/* Left Arrow pointing to the center */}
          {showArrows && (
            <div className="scroll-expand__arrow-wrapper scroll-expand__arrow-wrapper--left">
              <span className="scroll-expand__arrow-label">ENTER STUDIO</span>
              <svg
                className="scroll-expand__arrow-svg scroll-expand__arrow-svg--left"
                width="48"
                height="12"
                viewBox="0 0 48 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 6H46M46 6L41 1M46 6L41 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}

          {/* Right Arrow pointing to the center */}
          {showArrows && (
            <div className="scroll-expand__arrow-wrapper scroll-expand__arrow-wrapper--right">
              <svg
                className="scroll-expand__arrow-svg scroll-expand__arrow-svg--right"
                width="48"
                height="12"
                viewBox="0 0 48 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 6H46M46 6L41 1M46 6L41 11"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="scroll-expand__arrow-label">EXPLORE WORK</span>
            </div>
          )}
        </div>

        <div ref={frameRef} className="scroll-expand__frame">
          {mediaElement}
          <div ref={scrimRef} className="scroll-expand__scrim" />
          {children ? (
            <div ref={overlayRef} className="scroll-expand__overlay">
              {children}
            </div>
          ) : null}
        </div>
        {title ? (
          <div ref={titleRef} className="scroll-expand__title uppercase font-display">
            {title}
          </div>
        ) : null}
        {scrollHint ? (
          <div ref={hintRef} className="scroll-expand__hint uppercase font-sans">
            {scrollHint}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ScrollExpand;
