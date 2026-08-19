"use client";

import { useEffect, useRef } from "react";
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
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = true,
  enabled = true,
  children,
  className = "",
  style,
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
          scrub: true,
          anticipatePin: 1,
        },
      });

      // Set initial styles
      gsap.set(frame, {
        clipPath: `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${startRadius}px)`,
      });
      gsap.set(media, { scale: mediaZoom });
      if (scrimRef.current) gsap.set(scrimRef.current, { opacity: 0 });
      if (titleRef.current) gsap.set(titleRef.current, { opacity: 1, y: 0, scale: 1 });
      if (hintRef.current) gsap.set(hintRef.current, { opacity: 1, y: 0 });
      if (overlayRef.current) gsap.set(overlayRef.current, { opacity: 0, y: 20, pointerEvents: "none" });

      // Build symmetric animation by tracking raw progress state
      const stateObj = { progress: 0 };

      tl.to(
        stateObj,
        {
          progress: 1,
          duration: 1,
          ease: "none",
          onUpdate: () => {
            const p = stateObj.progress;
            
            // Symmetrically interpolate width & height dimensions
            const currentW = startWidth + (100 - startWidth) * p;
            const currentH = startHeight + (100 - startHeight) * p;
            
            const curIx = Math.max(0, (100 - currentW) / 2);
            const curIy = Math.max(0, (100 - currentH) / 2);
            const r = startRadius + (endRadius - startRadius) * p;

            frame.style.clipPath = `inset(${curIy}% ${curIx}% ${curIy}% ${curIx}% round ${r}px)`;
            media.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * p})`;
            
            if (scrimRef.current) {
              scrimRef.current.style.opacity = `${overlayScrim * p}`;
            }
          },
        },
        0
      );

      // Fade out title
      if (titleRef.current) {
        tl.to(
          titleRef.current,
          {
            opacity: 0,
            y: -30,
            scale: 1.05,
            duration: 0.6,
            ease: "none",
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

      // Fade in child overlays once the frame is fully expanded
      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          {
            opacity: 1,
            y: 0,
            pointerEvents: "auto",
            duration: 0.4,
            ease: "none",
          },
          0.6 // starts as the clipPath reaches full size
        );
      }

      // Add dummy hold spacing at the end of timeline
      if (holdDistance > 0) {
        tl.to({}, { duration: holdDistance });
      }
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
    overlayScrim,
  ]);

  const mediaElement =
    mediaType === "video" ? (
      <video
        ref={mediaRef as React.RefObject<HTMLVideoElement>}
        className="scroll-expand__media"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
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
