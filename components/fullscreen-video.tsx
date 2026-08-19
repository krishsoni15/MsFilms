"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FullscreenVideoProps {
  src: string;
  onComplete: () => void;
}

export function FullscreenVideo({ src, onComplete }: FullscreenVideoProps) {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlaying = () => {
    setIsVideoLoading(false);
    const video = videoRef.current;
    if (video) {
      video.volume = 0;
      let vol = 0;
      const interval = setInterval(() => {
        vol += 0.05;
        if (vol >= 0.8) {
          video.volume = 0.8;
          clearInterval(interval);
        } else {
          video.volume = vol;
        }
      }, 70); // Smooth audio fade-in over ~1.1s
    }
  };

  return (
    <motion.div
      key="intro-video-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[99999] bg-[#02070f] bg-[radial-gradient(circle_at_50%_50%,rgba(203,163,88,0.03)_0%,transparent_70%)] flex items-center justify-center"
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
        onWaiting={() => setIsVideoLoading(true)}
        onPlaying={handleVideoPlaying}
        onCanPlay={() => setIsVideoLoading(false)}
        onEnded={onComplete}
      />

      {/* Premium Buffering Loading Overlay */}
      <AnimatePresence>
        {isVideoLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-[100002] pointer-events-none"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-white/5 border-t-white/40 mb-4"
            />
            <span className="font-sans text-[9px] tracking-[0.3em] uppercase text-white/50 animate-pulse">
              Streaming Cinematic Intro...
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="absolute top-6 right-6 z-[100003] px-5 py-2.5 border border-white/20 hover:border-white text-[10px] tracking-[0.2em] uppercase text-white font-sans rounded-sm transition-all duration-300 bg-black/40 backdrop-blur-sm hover:scale-105 active:scale-95 cursor-pointer"
      >
        Skip Intro
      </button>
    </motion.div>
  );
}
