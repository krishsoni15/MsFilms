"use client";

import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";
import { CardStack } from "@/components/ui/card-stack";
import BorderGlow from "@/components/ui/border-glow";
import DiagonalMarqueeCarousel from "@/components/ui/great-ui-diagonal-marquee-carousel";

export function FeaturedWork() {
  const landscapeItems = [
    { image: "/landscape/imgi_2_1.jpg", label: "Valley Horizon", alt: "Valley Horizon Study" },
    { image: "/landscape/imgi_8_8.jpg", label: "Mist Mountain", alt: "Mist Mountain Study" },
    { image: "/landscape/imgi_7_4.jpg", label: "Silent Forest", alt: "Silent Forest Study" },
    { image: "/landscape/imgi_5_10.jpg", label: "Alpine Lake", alt: "Alpine Lake Study" },
    { image: "/landscape/imgi_10_6.jpg", label: "Sunset Peak", alt: "Sunset Peak Study" },
  ];

  const cardStackItems = landscapeItems.map((item, idx) => ({
    id: idx + 1,
    title: item.label,
    description: item.alt,
    imageSrc: item.image,
  }));

  const marqueeCards = [
    { id: 1, url: "/landscape/imgi_2_1.jpg", title: "Valley Horizon" },
    { id: 2, url: "/landscape/imgi_8_8.jpg", title: "Mist Mountain" },
    { id: 3, url: "/landscape/imgi_7_4.jpg", title: "Silent Forest" },
    { id: 4, url: "/landscape/imgi_5_10.jpg", title: "Alpine Lake" },
    { id: 5, url: "/landscape/imgi_10_6.jpg", title: "Sunset Peak" },
    { id: 6, url: "/wedding/imgi_6_4.jpg", title: "Wedding Story" },
    { id: 7, url: "/wedding/imgi_7_3.jpg", title: "Forest Kiss" },
    { id: 8, url: "/drone/imgi_10_3.jpg", title: "Aerial Horizon" },
  ];

  // Dynamic responsiveness sizing for CardStack
  const [dimensions, setDimensions] = useState({ cardWidth: 520, cardHeight: 330 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile screens
        const computedWidth = Math.min(320, width - 40);
        setDimensions({
          cardWidth: computedWidth,
          cardHeight: computedWidth * 0.65, // Preserve landscape proportions
        });
      } else if (width < 1024) {
        // Tablet screens
        setDimensions({
          cardWidth: 440,
          cardHeight: 280,
        });
      } else {
        // Desktop screens
        setDimensions({
          cardWidth: 520,
          cardHeight: 330,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section id="work" className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-background overflow-x-hidden">
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

        {/* 3D Card Stack replacing Accordion Gallery */}
        <div className="max-w-4xl mx-auto relative z-10 flex justify-center items-center py-6">
          <CardStack
            items={cardStackItems}
            initialIndex={2}
            maxVisible={5}
            cardWidth={dimensions.cardWidth}
            cardHeight={dimensions.cardHeight}
            overlap={0.48}
            spreadDeg={36}
            perspectivePx={1100}
            depthPx={100}
            tiltXDeg={8}
            activeLiftPx={18}
            activeScale={1.03}
            inactiveScale={0.93}
            springStiffness={260}
            springDamping={26}
            loop={true}
            autoAdvance={true}
            intervalMs={3000}
            pauseOnHover={true}
            showDots={true}
            renderCard={(item, { active }) => (
              <div className="relative h-full w-full rounded-2xl overflow-hidden bg-background">
                <BorderGlow
                  borderRadius={16}
                  backgroundColor="#020912"
                  glowColor="40 50 60"
                  glowRadius={40}
                  glowIntensity={active ? 1.5 : 0.4}
                  edgeSensitivity={20}
                  coneSpread={25}
                  colors={["#c5a880", "#e5d5be", "#ffffff"]}
                  fillOpacity={active ? 0.08 : 0.0}
                  className="w-full h-full"
                >
                  <div className="relative h-full w-full">
                    {/* Card Image */}
                    {item.imageSrc ? (
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="h-full w-full object-cover select-none pointer-events-none"
                        draggable={false}
                        loading="eager"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
                        No image
                      </div>
                    )}
                    {/* Shadow overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020912]/85 via-[#020912]/30 to-transparent" />

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-end p-6 select-none">
                      <div className="font-display text-xl font-normal text-white mb-1 tracking-wide">
                        {item.title}
                      </div>
                      {item.description ? (
                        <div className="text-[11px] text-white/60 font-sans tracking-wide leading-relaxed">
                          {item.description}
                        </div>
                      ) : null}
                    </div>

                    {/* Inside frame outline */}
                    <div className="absolute inset-[10px] border border-gold/10 pointer-events-none z-10 rounded-[10px]" />
                  </div>
                </BorderGlow>
              </div>
            )}
          />
        </div>

        {/* Cinematic Diagonal Marquee Carousel Section */}
        <div className="mt-28 md:mt-36 border-t border-white/[0.04] pt-20 md:pt-28">
          <div className="mb-12 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
                Visual Journey
              </p>
              <h3 className="font-display text-3xl md:text-4xl text-foreground/90 font-normal leading-[1.2]">
                Framing life&apos;s cinematic narrative.
              </h3>
            </div>
            <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
              An immersive showcase of fine art photography, captured with precision and raw emotion.
            </p>
          </div>
          <div className="w-full relative overflow-hidden rounded-3xl border border-white/[0.06] shadow-[0_24px_80px_rgba(0,0,0,0.95)]">
            <DiagonalMarqueeCarousel
              className="h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] w-full"
              angle={-15}
              baseSpeed={110}
              cards={marqueeCards}
              fadeClassName="from-[#020912] dark:from-[#020912]"
            />
          </div>
        </div>
      </section>
    </>
  );
}


