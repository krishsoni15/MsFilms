"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";
import { CardStack } from "@/components/ui/card-stack";
import BorderGlow from "@/components/ui/border-glow";

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
            cardWidth={520}
            cardHeight={330}
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
      </section>
    </>
  );
}

