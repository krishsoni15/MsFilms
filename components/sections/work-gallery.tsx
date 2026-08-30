"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedText } from "@/components/animated-text";
import PageFlip from "@/components/ui/page-flip";

export function WorkGallery() {
  return (
    <section className="py-24 md:py-36 px-5 md:px-10 lg:px-16 bg-background border-t border-border overflow-hidden">
      <div className="mb-16 md:mb-20 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-gold/90 font-semibold mb-4">
            Creative Portfolio
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
            A mosaic of captured moments.
          </ScrollReveal>
        </div>
        <p className="text-xs text-foreground/50 max-w-xs leading-relaxed font-sans">
          Interact with our digital lookbook: drag the page corners or use the navigation arrows to flip through our fine-art selected portfolios.
        </p>
      </div>

      {/* Interactive PageFlip Book Wrapper */}
      <div className="max-w-7xl mx-auto w-full relative flex justify-center py-4">
        <PageFlip width={950} height={600} className="mx-auto">
          {/* Page 1: Front Cover */}
          <div className="w-full h-full bg-neutral-950 flex flex-col justify-between p-8 md:p-14 border border-gold/10 relative">
            <div className="absolute inset-[15px] border border-gold/10 pointer-events-none rounded-lg" />
            <div className="text-[10px] tracking-[0.35em] uppercase text-gold/60 font-sans font-semibold">
              Fine Art Portfolio
            </div>
            <div className="my-auto space-y-4">
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground font-light tracking-wide uppercase leading-none">
                Ms Films
              </h3>
              <p className="font-serif text-sm md:text-base italic text-gold/80 leading-relaxed font-light">
                Selected Works & Stories in Motion
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 font-sans">
                Saskatoon, Saskatchewan
              </span>
              <span className="text-[9px] tracking-[0.15em] uppercase text-gold/60 font-sans font-medium animate-pulse">
                Click Arrow or Drag Page to Open →
              </span>
            </div>
          </div>

          {/* Page 2: Table of Contents & Intro */}
          <div className="w-full h-full bg-[#131313] flex flex-col justify-between p-8 md:p-12 relative">
            <div className="absolute inset-[10px] border border-white/5 pointer-events-none rounded" />
            <div>
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-2 block">
                01 / Introduction
              </span>
              <h4 className="font-display text-2xl text-foreground font-light uppercase tracking-wide mb-6">
                Our Philosophy
              </h4>
              <p className="font-serif text-xs md:text-sm text-foreground/75 italic leading-relaxed mb-6">
                &ldquo;We believe that every story has a soul, and every milestone deserves to be framed with elegance. From the intimate glances of a wedding to the sweeping vistas of high-end real estate, our lens is dedicated to capturing the raw, authentic emotions of your narrative.&rdquo;
              </p>
            </div>
            <div className="border-t border-white/5 pt-4">
              <span className="text-[9px] tracking-[0.25em] uppercase text-foreground/40 font-mono block mb-1">
                Chapters
              </span>
              <div className="space-y-1.5 font-sans text-[10px] uppercase tracking-wider text-foreground/60">
                <div className="flex justify-between"><span>I. Wedding Stories</span><span className="text-gold/85">Page 3</span></div>
                <div className="flex justify-between"><span>II. Infinite Landscapes</span><span className="text-gold/85">Page 5</span></div>
                <div className="flex justify-between"><span>III. Aerial Horizons</span><span className="text-gold/85">Page 7</span></div>
              </div>
            </div>
          </div>

          {/* Page 3: Wedding 1 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/wedding/imgi_7_3.jpg" alt="Wedding Portrait" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-left z-10">
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter I</span>
              <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">The Golden Hour</h4>
              <p className="text-[10px] text-white/60 font-sans tracking-wide mt-1">Saskatoon Wedding Session</p>
            </div>
          </div>

          {/* Page 4: Wedding 2 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/wedding/imgi_6_4.jpg" alt="Wedding Bridal Close-up" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-left z-10">
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter I</span>
              <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Intimate Whispers</h4>
              <p className="text-[10px] text-white/60 font-sans tracking-wide mt-1">Selected Bridal Portraiture</p>
            </div>
          </div>

          {/* Page 5: Landscape 1 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/landscape/imgi_8_8.jpg" alt="Mist Mountain" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-left z-10">
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter II</span>
              <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Mist Mountain</h4>
              <p className="text-[10px] text-white/60 font-sans tracking-wide mt-1">Banff Fine Art Study</p>
            </div>
          </div>

          {/* Page 6: Landscape 2 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/landscape/imgi_7_4.jpg" alt="Silent Forest" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-left z-10">
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter II</span>
              <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Silent Forest</h4>
              <p className="text-[10px] text-white/60 font-sans tracking-wide mt-1">Saskatchewan Wilderness Study</p>
            </div>
          </div>

          {/* Page 7: Drone 1 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/drone/imgi_10_3.jpg" alt="Aerial Coast" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-left z-10">
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter III</span>
              <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">High Coastlines</h4>
              <p className="text-[10px] text-white/60 font-sans tracking-wide mt-1">Cinematic Flight Capture</p>
            </div>
          </div>

          {/* Page 8: Drone 2 */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/drone/imgi_12_9.jpg" alt="Drone Overhead Path" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-left z-10">
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter III</span>
              <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Symmetry from Above</h4>
              <p className="text-[10px] text-white/60 font-sans tracking-wide mt-1">Overhead Composition Study</p>
            </div>
          </div>

          {/* Page 9: Real Estate / Sunset Peak */}
          <div className="w-full h-full bg-[#111111] relative overflow-hidden group">
            <img src="/landscape/imgi_10_6.jpg" alt="Sunset Peak" className="w-full h-full object-cover brightness-[0.7]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 text-left z-10">
              <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">Chapter IV</span>
              <h4 className="font-display text-lg md:text-xl text-white uppercase tracking-wider">Sunset Peaks</h4>
              <p className="text-[10px] text-white/60 font-sans tracking-wide mt-1">Banff National Park Study</p>
            </div>
          </div>

          {/* Page 10: Back Cover */}
          <div className="w-full h-full bg-neutral-950 flex flex-col justify-between p-8 md:p-14 border border-gold/10 relative">
            <div className="absolute inset-[15px] border border-gold/10 pointer-events-none rounded-lg" />
            <div className="text-[9px] tracking-[0.3em] uppercase text-gold/60 font-sans font-semibold text-left">
              The End
            </div>
            <div className="my-auto text-center space-y-6 z-10">
              <h3 className="font-display text-2xl md:text-3xl text-foreground uppercase tracking-wide leading-tight">
                Let&apos;s Frame <br /> Your Story
              </h3>
              <p className="font-serif text-xs md:text-sm italic text-foreground/60 leading-relaxed font-light">
                Available for bookings across Canada.
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-block border border-gold/40 hover:border-gold hover:text-gold text-foreground/80 px-6 py-2.5 text-[9px] tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 rounded-sm bg-gold/5 cursor-pointer"
                >
                  Inquire Now
                </a>
              </div>
            </div>
            <div className="text-center text-[9px] tracking-[0.2em] uppercase text-foreground/30 font-sans">
              © {new Date().getFullYear()} MS FILMS
            </div>
          </div>
        </PageFlip>
      </div>
    </section>
  );
}

export default WorkGallery;
