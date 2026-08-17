"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";
import { ProjectModal } from "@/components/project-modal";
import { AccordionGallery } from "@/components/ui/accordion-gallery";
import { motion } from "framer-motion";

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
            <ScrollReveal
              baseOpacity={0.05}
              enableBlur={true}
              baseRotation={2}
              blurStrength={8}
              textClassName="font-display text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2]"
              rotationEnd="bottom center+=20%"
              wordAnimationEnd="bottom center+=45%"
            >
              A glimpse into the moments we've preserved.
            </ScrollReveal>
          </div>
          <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
            Explore our core portfolios across Wedding, Portraits, Landscape, and Dronography — click any expanded panel to view full high-res galleries.
          </p>
        </div>

        {/* Accordion Gallery replacing the old grid */}
        <div className="max-w-7xl mx-auto relative z-10">
          <AccordionGallery
            items={projects.map((project) => ({
              image: project.cover,
              label: project.category,
              slug: project.slug,
            }))}
            defaultIndex={0}
            expandRatio={0.48}
            onItemClick={(item) => {
              const project = projects.find((p) => p.slug === item.slug);
              if (project) {
                setActiveProject(project);
              }
            }}
          />
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

