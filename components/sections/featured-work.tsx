"use client";

import { useState } from "react";
import { projects } from "@/lib/data";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";
import { ProjectModal } from "@/components/project-modal";
import { AccordionGallery } from "@/components/ui/accordion-gallery";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FeaturedWork() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null);

  const landscapeItems = [
    { image: "/landscape/imgi_2_1.jpg", label: "Valley Horizon", alt: "Valley Horizon Study" },
    { image: "/landscape/imgi_8_8.jpg", label: "Mist Mountain", alt: "Mist Mountain Study" },
    { image: "/landscape/imgi_7_4.jpg", label: "Silent Forest", alt: "Silent Forest Study" },
    { image: "/landscape/imgi_5_10.jpg", label: "Alpine Lake", alt: "Alpine Lake Study" },
    { image: "/landscape/imgi_10_6.jpg", label: "Sunset Peak", alt: "Sunset Peak Study" },
  ];

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
              A glimpse into the moments we{"'"}ve preserved.
            </ScrollReveal>
          </div>
          <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
            Explore our fine art landscape photography across Saskatchewan & Banff.
          </p>
        </div>

        {/* Accordion Gallery replacing the old grid */}
        <div className="max-w-7xl mx-auto relative z-10">
          <AccordionGallery
            items={landscapeItems}
            defaultIndex={2}
            expandRatio={0.52}
            grayscale={true}
            trigger="hover"
            duration={0.18}
            ease="power2.out"
            radius={16}
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
            onClick={() => setActiveProject(projects.find((p) => p.slug === "landscape") || null)}
            className="relative inline-flex items-center gap-3 text-[12px] tracking-[0.25em] uppercase border border-gold/40 px-9 py-4 text-foreground overflow-hidden group transition-colors duration-500 hover:text-[#061a2b] hover:border-gold cursor-pointer"
          >
            <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left pointer-events-none" />
            <span className="relative z-10 flex items-center gap-3">
              Browse Full Galleries
              <ArrowRight size={14} className="transform group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
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

