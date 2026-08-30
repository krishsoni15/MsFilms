"use client";

import { services } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import ScrollStack, { ScrollStackItem } from "@/components/ui/ScrollStack";

// Custom detailed metadata for each service card
const serviceDetails: Record<string, {
  subtitle: string;
  description: string;
  cta: string;
}> = {
  "01": {
    subtitle: "Timeless & Editorial Storytelling",
    description: "Capturing the emotional highlights and quiet, candid moments of your wedding day with a blend of fine-art photography and cinematic 4K filmmaking.",
    cta: "Inquire Wedding Packages"
  },
  "02": {
    subtitle: "High-End Residential & Commercial Media",
    description: "Premium visual assets designed to elevate property listings through stunning HDR imagery and cinematic video walkthroughs.",
    cta: "Inquire Real Estate Media"
  },
  "03": {
    subtitle: "Milestones, Celebrations & Corporate Galas",
    description: "Documenting the energy, interactions, and key details of your milestones, engagement sessions, and corporate functions.",
    cta: "Inquire Event Booking"
  }
};

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-5 md:px-10 lg:px-16 bg-background border-t border-foreground/5">
      <div className="max-w-6xl mx-auto w-full mb-12 md:mb-16">
        <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-4">
          What We Do
        </AnimatedText>
        <ScrollReveal
          baseOpacity={0.05}
          enableBlur={true}
          baseRotation={2}
          blurStrength={8}
          textClassName="font-display text-3xl md:text-4xl font-normal leading-[1.2]"
          rotationEnd="bottom center+=20%"
          wordAnimationEnd="bottom center+=45%"
        >
          Services
        </ScrollReveal>
      </div>

      <div className="max-w-5xl mx-auto w-full">
        <ScrollStack
          useWindowScroll={true}
          baseScale={0.93}
          itemScale={0.02}
          itemStackDistance={35}
          itemDistance={80}
          blurAmount={1}
          stackPosition="15%"
        >
          {services.map((service) => {
            const details = serviceDetails[service.id] || {
              subtitle: "Professional Photography & Video",
              description: "High-quality photographic and cinematic coverage tailored specifically to your needs.",
              cta: "Inquire Now"
            };

            return (
              <ScrollStackItem key={service.id}>
                <div className="scroll-stack-card-split">
                  {/* Left Side: Content Panel */}
                  <div className="scroll-stack-card-content">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-gold uppercase">
                        Service {service.id}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground font-normal uppercase leading-tight tracking-wide">
                        {service.title}
                      </h3>
                      <p className="font-sans text-[10px] md:text-xs tracking-wider text-foreground/50 uppercase mt-1">
                        {details.subtitle}
                      </p>
                    </div>

                    <div className="flex flex-col items-start mt-6 lg:mt-10">
                      <p className="font-sans text-xs md:text-sm text-foreground/70 leading-relaxed max-w-sm">
                        {details.description}
                      </p>

                      {/* Interactive Button */}
                      <a
                        href="#contact"
                        className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-foreground/20 text-foreground font-sans text-[10px] uppercase tracking-widest mt-6 hover:border-gold hover:text-gold transition-colors duration-300 bg-foreground/5 hover:bg-gold/10"
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

