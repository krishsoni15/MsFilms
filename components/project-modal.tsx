"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: typeof projects[0] | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

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

  if (!mounted || !project) return null;

  const allImages = [project.cover, ...project.images];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9990] bg-[#111111] overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-[#111111]/90 backdrop-blur-md border-b border-white/10">
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-gold/80 font-sans mb-0.5">
                {project.category} Story
              </p>
              <h3 className="font-display text-xl md:text-2xl text-white">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white transition-colors"
              aria-label="Close story"
            >
              <X size={20} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-12">
            {/* Story Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 max-w-3xl"
            >
              <p className="font-serif text-lg md:text-xl italic text-white/60 mb-4">
                &ldquo;{project.subtitle}&rdquo;
              </p>
              <p className="font-sans text-sm md:text-base text-white/80 leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase text-white/40 font-sans border-t border-white/10 pt-4">
                <span>Location: {project.location}</span>
                <span>Year: {project.year}</span>
              </div>
            </motion.div>

            {/* Photo Gallery Grid */}
            <div className="space-y-8 md:space-y-12 mb-16">
              {allImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                  className={`relative overflow-hidden rounded-sm ${
                    idx === 0
                      ? "aspect-[16/10] md:aspect-[16/9] w-full"
                      : idx % 2 === 1
                      ? "aspect-[4/5] max-w-2xl mx-auto"
                      : "aspect-[16/10] w-full"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} photograph ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    quality={90}
                  />
                </motion.div>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="border-t border-white/10 pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="font-serif text-xl text-white mb-1">Inspired by this story?</p>
                <p className="text-xs text-white/50 font-sans">Let&apos;s capture your moments with the same care.</p>
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-sans hover:bg-gold hover:text-foreground transition-all duration-300 group"
              >
                Inquire About Availability
                <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
