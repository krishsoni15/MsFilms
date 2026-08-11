"use client";

import { useEffect, useCallback, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string | null;
  posterUrl?: string;
  title?: string;
  children?: ReactNode;
}

export function VideoModal({ isOpen, onClose, videoUrl, posterUrl, title }: VideoModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9990] bg-black flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 text-white/70 hover:text-white transition-colors"
            aria-label="Close video"
          >
            <X size={28} />
          </button>

          {/* Title */}
          {title && (
            <div className="absolute top-6 left-6 z-50">
              <p className="text-white/50 font-sans text-xs tracking-widest uppercase">{title}</p>
            </div>
          )}

          {/* Video or poster placeholder */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full max-w-5xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {videoUrl ? (
              <video
                src={videoUrl}
                poster={posterUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center gap-4">
                {posterUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={posterUrl} alt={title || "Film"} className="absolute inset-0 w-full h-full object-cover opacity-30" />
                )}
                <div className="relative z-10 text-center">
                  <p className="text-white/40 font-sans text-sm tracking-widest uppercase mb-2">Coming Soon</p>
                  <p className="text-white/60 font-serif text-2xl italic">Film will be available here</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
