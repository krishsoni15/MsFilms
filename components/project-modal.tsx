"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: typeof projects[0] | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  const { theme } = useTheme();
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
          className="fixed inset-0 z-[9990] bg-background-alt-2 overflow-y-auto"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-background-alt-2/90 backdrop-blur-md border-b border-border">
            <div>
              <p className="text-[9px] tracking-[0.25em] uppercase text-gold/80 font-sans mb-0.5">
                {project.category} Story
              </p>
              <h3 className="font-display text-xl md:text-2xl text-foreground">
                {project.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground/70 hover:text-foreground hover:border-foreground transition-colors"
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
              <p className="font-serif text-lg md:text-xl italic text-foreground/60 mb-4">
                &ldquo;{project.subtitle}&rdquo;
              </p>
              <p className="font-sans text-sm md:text-base text-foreground/80 leading-relaxed mb-6">
                {project.description}
              </p>
              <div className="flex items-center gap-6 text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-sans border-t border-border pt-4">
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
                  className={`relative overflow-hidden rounded-2xl ${idx === 0
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
            <div className="border-t border-border pt-12 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <p className="font-serif text-xl text-foreground mb-1">Inspired by this story?</p>
                <p className="text-xs text-foreground/50 font-sans">Let&apos;s capture your moments with the same care.</p>
              </div>

              <a
                href="#contact"
                onClick={onClose}
                className="relative inline-flex items-center gap-3 border border-border px-9 py-4 text-[12px] tracking-[0.25em] uppercase font-sans text-foreground overflow-hidden group transition-colors duration-500 hover:text-background hover:border-gold"
              >
                <span className="absolute inset-0 bg-gold -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] pointer-events-none" />
                <span className="relative z-10 flex items-center gap-3">
                  Inquire About Availability
                  <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
