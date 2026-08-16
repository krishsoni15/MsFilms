"use client";

import { useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";
import { TextReveal } from "@/components/text-reveal";
import { ProjectModal } from "@/components/project-modal";
import { motion } from "framer-motion";

function ProjectCard({
  project,
  layout,
  index,
  onSelect,
}: {
  project: typeof projects[0];
  layout: "hero" | "side-left" | "side-right";
  index: number;
  onSelect: (project: typeof projects[0]) => void;
}) {
  const aspectMap = {
    hero: "aspect-[16/10] md:aspect-[16/9]",
    "side-left": "aspect-[4/5]",
    "side-right": "aspect-[4/5]",
  };

  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
    >
      <button
        onClick={() => onSelect(project)}
        className="group block w-full text-left cursor-pointer"
      >
        <div
          data-cursor-text="VIEW STORY"
          className={`relative ${aspectMap[layout]} overflow-hidden mb-6 rounded-sm border border-foreground/10 group-hover:border-gold/50 transition-colors duration-700 shadow-xl`}
        >
          <Image
            src={project.cover}
            alt={`${project.title} — ${project.category} photography`}
            fill
            className="object-cover transition-all duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            sizes={
              layout === "hero"
                ? "(max-width: 768px) 100vw, 85vw"
                : "(max-width: 768px) 100vw, 45vw"
            }
          />
          {/* Subtle gradient vignette for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-700" />

          {/* Top Info Pill Badges */}
          <div className="absolute top-5 left-5 right-5 flex justify-between items-center z-10">
            <span className="text-[9px] tracking-[0.25em] uppercase text-white/90 bg-black/40 backdrop-blur-md px-3.5 py-1.5 border border-white/15 rounded-full font-sans">
              {project.category}
            </span>
            <span className="text-[10px] tracking-[0.2em] text-white/60 font-sans">{num}</span>
          </div>

          {/* Bottom Floating Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 text-white flex flex-col justify-end">
            <p className="text-[10px] tracking-[0.25em] uppercase text-gold/90 mb-1 font-sans">
              {project.subtitle}
            </p>
            <h3 className="font-serif text-2xl md:text-3xl font-normal leading-snug group-hover:translate-x-2 transition-transform duration-500 ease-out">
              {project.title}
            </h3>

            <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-4 text-[10px] tracking-[0.2em] uppercase text-white/60">
              <span>{project.location} · {project.year}</span>
              <span className="text-gold flex items-center gap-1.5 group-hover:translate-x-1 transition-transform duration-300">
                Explore Gallery →
              </span>
            </div>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export function FeaturedWork() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="work" className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-background">
        <div className="mb-16 md:mb-20 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-4">
              Selected Stories
            </AnimatedText>
            <TextReveal as="h2" className="font-display text-3xl md:text-4xl lg:text-5xl">
              {"A glimpse into the moments\nwe've preserved."}
            </TextReveal>
          </div>
          <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
            Explore our core portfolios across Wedding, Landscape, and Dronography — click any story to view full high-res galleries.
          </p>
        </div>

        {/* 3 Core Gallery Cards Grid */}
        <div className="space-y-16 md:space-y-20 max-w-7xl mx-auto">
          {/* Card 01 — WEDDING (Hero Full Width) */}
          {projects[0] && (
            <ProjectCard project={projects[0]} layout="hero" index={0} onSelect={setActiveProject} />
          )}

          {/* Cards 02 & 03 — LANDSCAPE & DRONE (Side by Side) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {projects[1] && (
              <ProjectCard project={projects[1]} layout="side-left" index={1} onSelect={setActiveProject} />
            )}
            {projects[2] && (
              <ProjectCard project={projects[2]} layout="side-right" index={2} onSelect={setActiveProject} />
            )}
          </div>
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 md:mt-24 text-center"
        >
          <button
            onClick={() => setActiveProject(projects[0])}
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase border border-gold/40 px-8 py-4 text-foreground hover:bg-gold hover:text-[#061a2b] hover:border-gold transition-all duration-500 group cursor-pointer"
          >
            Browse Full Galleries
            <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </button>
        </motion.div>
      </section>

      {/* High-res Story Viewer Modal */}
      <ProjectModal
        isOpen={!!activeProject}
        onClose={() => setActiveProject(null)}
        project={activeProject}
      />
    </>
  );
}
