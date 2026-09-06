"use client";

import { services } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

// Custom detailed metadata for each service card
const serviceDetails: Record<string, {
  subtitle: string;
  description: string;
  tags: string[];
  cta: string;
}> = {
  "01": {
    subtitle: "Timeless & Candid Love Stories",
    description: "Candid, unscripted photography and 4K cinematic films capturing authentic emotions, quiet vows, and joyful celebrations across Saskatchewan and Canada.",
    tags: ["Full-Day Coverage", "4K Cinema & Audio", "Archival Digital Gallery"],
    cta: "Inquire Wedding Packages"
  },
  "02": {
    subtitle: "High-End Residential & Commercial Media",
    description: "Premium visual assets designed to elevate property listings through crisp HDR interior imagery, 4K video walkthroughs, and aerial perspective.",
    tags: ["HDR Interior Photography", "4K Video Walkthroughs", "Licensed Aerial Drone"],
    cta: "Inquire Real Estate Media"
  },
  "03": {
    subtitle: "Engagements, Galas & Milestone Parties",
    description: "Documenting the vibrant energy, interactions, and key details of your milestone celebrations, family functions, and corporate functions.",
    tags: ["Engagements & Parties", "Corporate & Galas", "Fast Gallery Delivery"],
    cta: "Inquire Event Booking"
  }
};

export function Services() {
  return (
    <section id="services" className="pt-12 md:pt-16 pb-24 md:pb-32 px-5 md:px-10 lg:px-16 bg-background border-t border-foreground/5">
      <div className="max-w-6xl mx-auto w-full mb-6 md:mb-8">
        <AnimatedText as="p" className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold font-bold mb-3">
          What We Offer
        </AnimatedText>
        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          textClassName="font-serif text-4xl md:text-6xl font-normal leading-[1.1] uppercase tracking-tight"
          rotationEnd="bottom center+=20%"
          wordAnimationEnd="bottom center+=45%"
        >
          Signature Services
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <ScrollStack
          useWindowScroll={true}
          baseScale={0.93}
          itemScale={0.02}
          itemStackDistance={35}
          itemDistance={90}
          blurAmount={1}
          stackPosition="2%"
        >
          {services.map((service) => {
            const details = serviceDetails[service.id] || {
              subtitle: "Professional Photography & Video",
              description: "High-quality photographic and cinematic coverage tailored specifically to your needs.",
              tags: ["Custom Packages", "High Resolution", "Full Coverage"],
              cta: "Inquire Now"
            };

            return (
              <ScrollStackItem key={service.id}>
                <div className="scroll-stack-card-split">
                  {/* Left Side: Content Panel */}
                  <div className="scroll-stack-card-content">
                    <div className="flex flex-col gap-2">
                      <span className="text-xs tracking-[0.3em] font-sans font-bold text-gold uppercase">
                        Service {service.id}
                      </span>
                      <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground font-normal uppercase leading-[1.15] tracking-wide">
                        {service.title}
                      </h3>
                      <p className="font-sans text-[11px] md:text-xs tracking-widest text-foreground/60 uppercase mt-1 font-medium">
                        {details.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-col items-start mt-4">
                      <p className="font-sans text-xs sm:text-sm text-foreground/75 leading-relaxed max-w-md">
                        {details.description}
                      </p>

                      {/* Feature Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {details.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[9px] sm:text-[10px] tracking-wider uppercase font-sans font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Button */}
                      <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-foreground/20 text-foreground font-sans text-xs uppercase tracking-widest mt-5 hover:border-gold hover:text-gold transition-all duration-300 bg-foreground/5 hover:bg-gold/10 font-semibold shadow-sm shrink-0"
                      >
                        <span>{details.cta}</span>
                        <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                      </a>
                    </div>
                  </div>

                  {/* Right Side: Image Panel */}
                  <div className="scroll-stack-card-image-wrapper">
                    <div
                      className="scroll-stack-card-bg-image"
                      style={{ backgroundImage: `url(${service.image})` }}
                    />
                    <div className="scroll-stack-card-image-overlay" />
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </section>
  );
}

