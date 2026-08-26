"use client";

import DomeGallery from "@/components/ui/DomeGallery";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";

export function InteractiveDome() {
  const domeImages = [
    "/wedding/imgi_7_3.jpg",
    "/landscape/imgi_8_8.jpg",
    "/drone/imgi_10_3.jpg",
    "/wedding/imgi_6_4.jpg",
    "/landscape/imgi_7_4.jpg",
    "/drone/imgi_12_9.jpg",
    "/wedding/imgi_4_7 (1).jpg",
    "/landscape/imgi_10_6.jpg",
    "/drone/imgi_2_1.jpg",
    "/wedding/imgi_8_6.jpg",
    "/landscape/imgi_5_10.jpg",
    "/drone/imgi_11_6.jpg",
  ];

  return (
    <section className="py-24 md:py-36 bg-[#020912] border-t border-white/[0.03] overflow-hidden">
      <div className="mb-16 md:mb-20 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            3D Dome Gallery
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
            Immersive 3D Space.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Click and drag to rotate the dome. Hover or tap on any thumbnail to enlarge and focus on the story.
        </p>
      </div>

      {/* Interactive Dome viewport */}
      <div className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] relative overflow-hidden">
        <DomeGallery
          images={domeImages}
          fit={0.68}
          fitBasis="auto"
          minRadius={700}
          maxRadius={1350}
          overlayBlurColor="#020912"
          grayscale={false}
          openedImageWidth="300px"
          openedImageHeight="420px"
          imageBorderRadius="16px"
          openedImageBorderRadius="20px"
        />
      </div>
    </section>
  );
}

export default InteractiveDome;
