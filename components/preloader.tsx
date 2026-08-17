"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/lib/data";

interface PreloaderProps {
  onReady: () => void;
  onComplete: () => void;
}

const slideshowImages = [
  "/wedding/imgi_3_5.png",
  "/landscape/imgi_2_1 (1).jpg",
  "/wedding/imgi_7_3.jpg",
];

/* ═══════════════════════════════════════════════════════════
   CAMERA IRIS BLADE GEOMETRY
   
   Each blade is a curved quadrilateral formed by two arcs:
   - Outer arc: follows the lens housing ring (convex)
   - Inner arc: follows a smaller circle with a spiral twist
   
   The twist offset between the outer and inner arc angles
   creates the classic pinwheel/spiral overlap pattern seen
   in real camera lenses (like the reference images).
   ═══════════════════════════════════════════════════════════ */

const NUM_BLADES = 7;
const CX = 100;
const CY = 100;
const OUTER_R = 67;
const BLADE_ARC = ((2 * Math.PI) / NUM_BLADES) * 1.4;
const SPIRAL_TWIST = 0.4;

function bladePath(i: number, innerR: number): string {
  const base = (i * 2 * Math.PI) / NUM_BLADES - Math.PI / 2;

  const oA = base;
  const oB = base + BLADE_ARC;
  const iA = base + SPIRAL_TWIST;
  const iB = base + BLADE_ARC + SPIRAL_TWIST;

  const ox1 = (CX + OUTER_R * Math.cos(oA)).toFixed(3);
  const oy1 = (CY + OUTER_R * Math.sin(oA)).toFixed(3);
  const ox2 = (CX + OUTER_R * Math.cos(oB)).toFixed(3);
  const oy2 = (CY + OUTER_R * Math.sin(oB)).toFixed(3);
  const ix1 = (CX + innerR * Math.cos(iB)).toFixed(3);
  const iy1 = (CY + innerR * Math.sin(iB)).toFixed(3);
  const ix2 = (CX + innerR * Math.cos(iA)).toFixed(3);
  const iy2 = (CY + innerR * Math.sin(iA)).toFixed(3);
  const ir = innerR.toFixed(3);

  return `M ${ox1},${oy1} A ${OUTER_R} ${OUTER_R} 0 0 1 ${ox2},${oy2} L ${ix1},${iy1} A ${ir} ${ir} 0 0 0 ${ix2},${iy2} Z`;
}

/* ═══════════════════════════════════════════════════════════ */

function playCameraShutterSound() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Resume context if browser suspended autoplay
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    // Helper to generate a bandpass filtered white noise burst
    const createNoiseNode = (duration: number, freq: number, q: number) => {
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = freq;
      filter.Q.value = q;

      const gain = ctx.createGain();

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      return { source, gain };
    };

    // 1. Shutter Open Click (highpass noise transient + low-freq slap)
    const openClick = createNoiseNode(0.06, 2800, 2);
    openClick.gain.gain.setValueAtTime(0.45, now);
    openClick.gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    openClick.source.start(now);

    // Mirror Thump (low sine wave)
    const thumpOsc = ctx.createOscillator();
    const thumpGain = ctx.createGain();
    thumpOsc.type = "sine";
    thumpOsc.frequency.setValueAtTime(140, now);
    thumpOsc.frequency.exponentialRampToValueAtTime(30, now + 0.08);
    thumpGain.gain.setValueAtTime(0.7, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    thumpOsc.connect(thumpGain);
    thumpGain.connect(ctx.destination);
    thumpOsc.start(now);
    thumpOsc.stop(now + 0.08);

    // 2. Shutter Close Click (120ms offset to simulate shutter speed exposure)
    const closeTime = now + 0.12;
    const closeClick = createNoiseNode(0.07, 2400, 3);
    closeClick.gain.gain.setValueAtTime(0.38, closeTime);
    closeClick.gain.gain.exponentialRampToValueAtTime(0.001, closeTime + 0.06);
    closeClick.source.start(closeTime);

    // Spring Ring (triangle wave decay)
    const springOsc = ctx.createOscillator();
    const springGain = ctx.createGain();
    springOsc.type = "triangle";
    springOsc.frequency.setValueAtTime(750, closeTime);
    springOsc.frequency.linearRampToValueAtTime(350, closeTime + 0.14);
    springGain.gain.setValueAtTime(0.06, closeTime);
    springGain.gain.exponentialRampToValueAtTime(0.001, closeTime + 0.14);
    springOsc.connect(springGain);
    springGain.connect(ctx.destination);
    springOsc.start(closeTime);
    springOsc.stop(closeTime + 0.14);

  } catch (err) {
    console.warn("Camera shutter sound synthesis failed:", err);
  }
}

function playFocusBeep() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Resume context if browser suspended autoplay
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    const playBeep = (time: number, freq: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      gain.gain.setValueAtTime(0.04, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + duration);
    };

    // Quick camera focus double beep
    playBeep(now, 2000, 0.05);
    playBeep(now + 0.08, 2000, 0.05);
  } catch (err) {
    console.warn("Autofocus beep failed:", err);
  }
}

/* ═══════════════════════════════════════════════════════════ */

// ── CONFIGURABLE PRELOADER SETTINGS ──
// Adjust this to change how long the camera preloader takes to load (in milliseconds)
// (e.g. 1000 for 1.0s, 1500 for 1.5s, 2200 for 2.2s, etc.)
const TOTAL_LOAD_TIME_MS = 800; 

/* ═══════════════════════════════════════════════════════════ */

export function Preloader({ onReady, onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("SENSOR INIT");
  const [irisOpenAmount, setIrisOpenAmount] = useState(0);
  const [isShutterGone, setIsShutterGone] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const [focusLocked, setFocusLocked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Store callbacks in refs to avoid dependency churn
  const onReadyRef = useRef(onReady);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onReadyRef.current = onReady;
    onCompleteRef.current = onComplete;
  });

  // Lock scroll and hide browser scrollbar
  useEffect(() => {
    const html = document.documentElement;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;

    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    html.classList.add("preloader-active");

    return () => {
      html.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      html.classList.remove("preloader-active");
    };
  }, []);

  // ── Progress timer (cleanup handles Strict Mode correctly, dynamically scaled) ──
  useEffect(() => {
    let currentProgress = 0;
    const tick = 20; // 20ms update interval
    
    // Base step size to hit 100% in TOTAL_LOAD_TIME_MS
    const baseStep = (100 / (TOTAL_LOAD_TIME_MS / tick));

    const id = setInterval(() => {
      // Non-linear pacing simulating real hardware sensor checks:
      // - Starts fast (0% to 40%)
      // - Slows down to scan autofocus brackets (40% to 85%)
      // - Quick focus lock confirmation (85% to 100%)
      let stepMultiplier = 1.2;
      if (currentProgress < 40) {
        stepMultiplier = 2.4;
      } else if (currentProgress < 85) {
        stepMultiplier = 0.8;
      } else {
        stepMultiplier = 1.8;
      }

      currentProgress += baseStep * stepMultiplier;

      if (currentProgress >= 100) {
        setProgress(100);
        setStatusText("READY");
        clearInterval(id);
      } else {
        const p = Math.floor(currentProgress);
        setProgress(p);
        if (p < 20) setStatusText("SENSOR INIT");
        else if (p < 45) setStatusText("CALIBRATING LENS");
        else if (p < 85) setStatusText("AUTO FOCUS");
        else setStatusText("LOADING MEDIA");
      }
    }, tick);

    return () => clearInterval(id);
  }, []);

  // ── Focus Lock sound and automatic transition when progress hits 100 ──
  useEffect(() => {
    if (progress < 100) return;
    playFocusBeep();
    setFocusLocked(true);
    setStatusText("CAPTURING");
    setIsClicked(true); // Automatically trigger enter transition
  }, [progress]);

  // ── Transition pipeline (runs when user clicks the shutter) ──
  useEffect(() => {
    if (!isClicked) return;
    console.log("[Debug Preloader] Transition started.");

    setStatusText("CAPTURING");

    // Load actual camera shutter sound provided by user
    const shutterAudio = new Audio("/mp3/freesound_community-camera-shutter-6305.mp3");
    shutterAudio.volume = 0.55;
    shutterAudio.preload = "auto";

    // Play user shutter MP3 immediately (aligns with flash)
    shutterAudio.play().catch((err) => {
      console.warn("MP3 shutter audio play failed, falling back to synthesis:", err);
      playCameraShutterSound();
    });

    // Phase 1: Smoothly open iris blades at 80ms
    let rafId: number;
    const startIrisTimer = setTimeout(() => {
      const startTime = performance.now();
      const irisDuration = 450;

      function animateIris(now: number) {
        const elapsed = now - startTime;
        const t = Math.min(elapsed / irisDuration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setIrisOpenAmount(eased);
        if (t < 1) rafId = requestAnimationFrame(animateIris);
      }
      rafId = requestAnimationFrame(animateIris);
    }, 80);

    // Phase 2: Flash + shutters wipe at 130ms
    const wipeTimer = setTimeout(() => {
      console.log("[Debug Preloader] Phase 2: Calling onReady.");
      setShowFlash(true);
      setIsShutterGone(true);
      onReadyRef.current();
    }, 130);

    // Phase 3: Unmount at 750ms (after background images finish fading to 0 opacity)
    const doneTimer = setTimeout(() => {
      console.log("[Debug Preloader] Phase 3: Calling onComplete.");
      onCompleteRef.current();
    }, 750);

    return () => {
      clearTimeout(startIrisTimer);
      clearTimeout(wipeTimer);
      clearTimeout(doneTimer);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isClicked]);

  // ── Derived animation values ──
  const isIrisOpening = irisOpenAmount > 0;

  // Inner radius: 32 (nice visible center opening) → 70 (fully retracted)
  const breathe = Math.sin(progress * 0.12) * 1.5;
  const innerR = 32 + breathe + irisOpenAmount * 38;

  // Blade group rotation
  const rotation = progress * 0.2 + irisOpenAmount * 20;

  // Generate blade paths
  const bladePaths = useMemo(
    () => Array.from({ length: NUM_BLADES }, (_, i) => bladePath(i, innerR)),
    [innerR]
  );

  // Slideshow image index (change less frequently for a calmer background feel)
  const imgIdx = Math.min(
    Math.floor(progress / 50), // Changes only at 50% instead of every 25%
    slideshowImages.length - 1
  );
  const blur = isIrisOpening ? 0 : Math.max(0, 12 - (progress / 100) * 12);

  const handleShutterClick = () => {
    console.log("[Debug Preloader] Shutter clicked. progress:", progress, "isClicked:", isClicked);
    if (progress < 100 || isClicked) return;
    setIsClicked(true);
  };

  return (
    <motion.div
      id="preloader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className={`fixed inset-0 z-[99999] flex items-center justify-center select-none overflow-hidden transition-all duration-300 ${
        progress === 100 && !isClicked ? "cursor-pointer hover:bg-black/20" : ""
      }`}
      style={{ fontFamily: "'JetBrains Mono', 'SF Mono', monospace" }}
      onClick={handleShutterClick}
    >
      {/* ═══ LAYER 1: Background photo slideshow (z-0) ═══ */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slideshowImages.map((src, i) => (
          <motion.div
            key={src}
            animate={{
              opacity: isShutterGone ? 0 : (imgIdx === i ? 0.25 : 0),
              scale: isShutterGone ? 1.07 : (imgIdx === i ? 1.01 : 1.03), // 30-40% smaller zoom scale movements
            }}
            transition={{ duration: 1.1, ease: "easeOut" }} // Slower, smoother transition zoom (1.1s)
            style={{ filter: `blur(${blur}px)` }}
            className="absolute inset-0"
          >
            <Image
              src={src}
              alt="Portfolio"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 20%, rgba(2,7,15,0.92) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-[#02070f]/60" />
      </div>

      {/* ═══ LAYER 2: Full-screen dark overlay (z-10) ═══ */}
      <AnimatePresence>
        {!isShutterGone && (
          <motion.div
            key="dark-overlay"
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: "#020810" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ═══ LAYER 3: Film grain (z-20) ═══ */}
      <div className="film-grain-overlay" style={{ zIndex: 20 }} />

      {/* ═══ LAYER 4: Camera lens + iris aperture (z-30) ═══ */}
      <motion.div
        animate={{
          opacity: irisOpenAmount > 0.8 ? 0 : 1,
          scale: 1 + irisOpenAmount * 0.12,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-30 flex items-center justify-center"
      >
        {/* Soft glow behind lens */}
        <motion.div
          animate={{
            scale: [0.9, 1.1, 0.9],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 rounded-full blur-[50px] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(203,163,88,0.12) 0%, transparent 60%)",
          }}
        />

        {/* ── SVG Camera Lens (z-20, establishes the complete lens element stacking context) ── */}
        <svg
          viewBox="0 0 200 200"
          className="w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 text-gold pointer-events-none z-20 relative"
        >
          <defs>
            <linearGradient id="bl-a" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ddb96e" />
              <stop offset="45%" stopColor="#c9a04a" />
              <stop offset="100%" stopColor="#8a6520" />
            </linearGradient>
            <linearGradient id="bl-b" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c09538" />
              <stop offset="50%" stopColor="#9a7a2c" />
              <stop offset="100%" stopColor="#6e5518" />
            </linearGradient>
            <radialGradient id="glass" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(203,163,88,0.02)" />
              <stop offset="70%" stopColor="rgba(2,7,15,0.1)" />
              <stop offset="100%" stopColor="rgba(2,7,15,0.25)" />
            </radialGradient>
            <linearGradient id="front-glass-glare" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(67,92,112,0.16)" />
              <stop offset="35%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="65%" stopColor="rgba(203,163,88,0.04)" />
              <stop offset="100%" stopColor="rgba(140,80,200,0.1)" />
            </linearGradient>
            <clipPath id="iris-clip">
              <circle cx={CX} cy={CY} r={OUTER_R} />
            </clipPath>
          </defs>

          {/* Outer lens body rings */}
          <circle cx={CX} cy={CY} r="96" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-12" />
          <circle cx={CX} cy={CY} r="92" fill="none" stroke="currentColor" strokeWidth="0.5" className="opacity-[0.06]" />

          {/* Tick marks */}
          <g className="opacity-[0.1]">
            {Array.from({ length: 48 }).map((_, i) => {
              const a = (i * 360) / 48;
              const r = (a * Math.PI) / 180;
              const major = i % 8 === 0;
              const len = major ? 5 : 2;
              return (
                <line
                  key={i}
                  x1={Number((CX + 92 * Math.cos(r)).toFixed(3))}
                  y1={Number((CY + 92 * Math.sin(r)).toFixed(3))}
                  x2={Number((CX + (92 - len) * Math.cos(r)).toFixed(3))}
                  y2={Number((CY + (92 - len) * Math.sin(r)).toFixed(3))}
                  stroke="currentColor"
                  strokeWidth={major ? 0.7 : 0.3}
                />
              );
            })}
          </g>

          {/* Subtle ring text */}
          <defs>
            <path id="rtu" d="M 18,100 A 82,82 0 0 1 182,100" fill="none" />
            <path id="rtl" d="M 182,100 A 82,82 0 0 1 18,100" fill="none" />
          </defs>
          <text fill="currentColor" className="opacity-[0.06]" fontSize="4" letterSpacing="1.5">
            <textPath href="#rtu" startOffset="18%">MSFILMS · CINEMATIC</textPath>
          </text>
          <text fill="currentColor" className="opacity-[0.06]" fontSize="4" letterSpacing="1.5">
            <textPath href="#rtl" startOffset="22%">50mm f/1.2 · 4K HDR</textPath>
          </text>

          {/* Inner housing ring */}
          <circle cx={CX} cy={CY} r={OUTER_R + 1.5} fill="none" stroke="currentColor" strokeWidth="1.2" className="opacity-20" />
          <circle cx={CX} cy={CY} r={OUTER_R} fill="url(#glass)" />

          {/* ── SUBJECT LAYER: Logo & Brackets inside the lens (drawn under the blades) ── */}
          
          {/* Logo image (gold filtered, dropshadowed) */}
          {progress > 10 && irisOpenAmount < 0.65 && (
            <image
              href={siteData.logo}
              x="62"
              y="91"
              width="76"
              height="18"
              className="gold-filter pointer-events-none"
              style={{
                filter: "drop-shadow(0px 0px 5px rgba(203,163,88,0.4))",
              }}
            />
          )}

          {/* Autofocus Target Brackets */}
          {progress > 45 && irisOpenAmount < 0.65 && (
            <g
              className="transition-all duration-300"
              style={{
                opacity: focusLocked ? 1 : 0.6,
                stroke: focusLocked ? "rgb(34, 197, 94)" : "rgba(203, 163, 88, 0.55)",
              }}
            >
              {/* Top-Left Bracket */}
              <path d="M 60,92 L 60,86 L 68,86" fill="none" strokeWidth="1.2" strokeLinecap="round" />
              {/* Top-Right Bracket */}
              <path d="M 140,92 L 140,86 L 132,86" fill="none" strokeWidth="1.2" strokeLinecap="round" />
              {/* Bottom-Left Bracket */}
              <path d="M 60,108 L 60,114 L 68,114" fill="none" strokeWidth="1.2" strokeLinecap="round" />
              {/* Bottom-Right Bracket */}
              <path d="M 140,108 L 140,114 L 132,114" fill="none" strokeWidth="1.2" strokeLinecap="round" />
              
              {/* Center dot indicator */}
              <circle
                cx="100"
                cy="100"
                r="1.2"
                fill={focusLocked ? "rgb(34, 197, 94)" : "rgba(203, 163, 88, 0.55)"}
                className={focusLocked ? "animate-pulse" : ""}
              />
            </g>
          )}

          {/* ── IRIS BLADES (clipped inside housing) ── */}
          <g clipPath="url(#iris-clip)">
            <g transform={`rotate(${rotation.toFixed(3)} ${CX} ${CY})`}>
              {bladePaths.map((d, i) => (
                <path
                  key={i}
                  d={d}
                  fill={i % 2 === 0 ? "url(#bl-a)" : "url(#bl-b)"}
                  stroke="#060d18"
                  strokeWidth="0.7"
                  strokeLinejoin="round"
                />
              ))}
            </g>
          </g>

          {/* Front Glass element glare (rendered on top of blades) */}
          <circle cx={CX} cy={CY} r={OUTER_R} fill="url(#front-glass-glare)" className="opacity-90 mix-blend-screen" />

          {/* Accent ring on top of blades */}
          <circle cx={CX} cy={CY} r={OUTER_R} fill="none" stroke="currentColor" strokeWidth="0.6" className="opacity-[0.1]" />

          {/* Lens flare highlight */}
          <path d="M 50,55 A 65,65 0 0,1 150,55" fill="none" stroke="white" strokeWidth="0.5" className="opacity-[0.03]" strokeDasharray="15 90" />
        </svg>
      </motion.div>

      {/* ═══ LAYER 5: Viewfinder HUD (z-40) ═══ */}
      <motion.div
        animate={{
          opacity: isIrisOpening ? 0 : 1,
          y: isIrisOpening ? -8 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="absolute inset-0 z-40 pointer-events-none"
      >
        {/* Corner brackets */}
        <div className="absolute inset-3 sm:inset-5 md:inset-8">
          <div className="absolute top-0 left-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t border-l border-white/[0.1]" />
          <div className="absolute top-0 right-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-t border-r border-white/[0.1]" />
          <div className="absolute bottom-0 left-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b border-l border-white/[0.1]" />
          <div className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 border-b border-r border-white/[0.1]" />
        </div>

        {/* Top bar */}
        <div className="absolute top-3 sm:top-5 md:top-9 left-4 sm:left-6 md:left-11 right-4 sm:right-6 md:right-11 flex justify-between items-start">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-rec-blink" />
            <span className="text-[7px] sm:text-[9px] tracking-[0.2em] text-white/50 uppercase">REC</span>
          </div>
          <span className="hidden sm:block text-[8px] md:text-[10px] tracking-[0.12em] text-white/30">
            00:00:{String(Math.floor(progress / 10)).padStart(2, "0")}:{String(progress % 10).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2">
            <span className="border border-white/[0.08] px-1 py-0.5 text-[6px] sm:text-[7px] text-white/35 tracking-wider uppercase">4K</span>
            <div className="flex items-center gap-0.5">
              <span className="text-[7px] sm:text-[8px] text-white/35">100%</span>
              <div className="w-3.5 h-1.5 border border-white/15 rounded-[1px] p-[1px]">
                <div className="h-full bg-white/45 rounded-[0.5px] w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-3 sm:bottom-5 md:bottom-9 left-4 sm:left-6 md:left-11 right-4 sm:right-6 md:right-11 flex justify-between items-end">
          <div className="flex flex-col gap-0.5 text-[6px] sm:text-[7px] md:text-[8px] tracking-[0.12em] text-white/30">
            <span>ISO {progress < 35 ? "100" : progress < 70 ? "200" : "400"}</span>
            <span>F/1.2 50mm</span>
            <span>1/125s</span>
          </div>
          <div className="flex flex-col items-center gap-1 mx-auto">
            <span className={`text-[6px] sm:text-[7px] tracking-[0.25em] text-gold/50 uppercase ${progress === 100 && !isClicked ? "animate-pulse text-gold font-bold" : ""}`}>
              {progress === 100 && !isClicked ? "CLICK SCREEN TO ENTER" : statusText}
            </span>
            <div className="w-20 sm:w-28 md:w-36 h-[1px] bg-white/[0.05] relative overflow-hidden">
              <motion.div style={{ width: `${progress}%` }} className="h-full bg-gold/60" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-0.5 text-[6px] sm:text-[7px] md:text-[8px] tracking-[0.12em] text-white/30">
            <span>AF-C</span>
            <div className="flex items-end gap-[1px] h-2">
              {[0.55, 0.45, 0.65, 0.35].map((dur, i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["20%", `${45 + i * 15}%`, "25%", "20%"] }}
                  transition={{ repeat: Infinity, duration: dur, ease: "easeInOut", delay: i * 0.08 }}
                  className={`w-[1px] ${i < 3 ? "bg-green-500/50" : "bg-amber-500/50"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ═══ LAYER 6: White flash (z-50) ═══ */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            key="flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 0] }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 bg-white z-50 pointer-events-none flex items-center justify-center"
          >
            {/* Inner radial bloom for extra glare/flare effect */}
            <div
              className="absolute w-[80vw] h-[80vw] rounded-full blur-3xl opacity-60 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 70%)"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
