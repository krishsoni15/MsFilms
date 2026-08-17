"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { films } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { VideoModal } from "@/components/video-modal";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

function FilmCard({ film, index }: { film: typeof films[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && film.videoUrl) {
      setIsVideoLoading(true);
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVideoLoading(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        className="group block w-full text-left relative cursor-pointer"
        data-cursor-text="PLAY FILM"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Cinematic Poster with overlaid typography */}
        <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden rounded-2xl">
          {/* Poster Image */}
          <Image
            src={film.poster}
            alt={`${film.title} film poster`}
            fill
            className={`object-cover transition-all duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isHovered ? "scale-[1.05] brightness-[0.35]" : "scale-100 brightness-[0.65]"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Video preview on hover */}
          {film.videoUrl && (
            <video
              ref={videoRef}
              src={film.videoUrl}
              muted
              loop
              playsInline
              preload="none"
              onPlaying={() => setIsVideoLoading(false)}
              onError={() => setIsVideoLoading(false)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                isHovered && !isVideoLoading ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Overlaid Typography */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 lg:p-10 z-10">
            {/* Top — Category label */}
            <div>
              <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-white/50 font-sans">
                {film.category}
              </p>
            </div>

            {/* Bottom — Large serif name + Magnetic play button */}
            <div className="flex items-end justify-between">
              <div>
                <h3 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1] tracking-tight uppercase group-hover:translate-x-1 transition-transform duration-500">
                  {film.title}
                </h3>
                <p className="font-serif text-base md:text-lg italic text-white/60 mt-2">
                  {film.subtitle}
                </p>
              </div>

              <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border flex items-center justify-center backdrop-blur-md transition-all duration-500 ${
                isHovered
                  ? "bg-white text-black border-white scale-110 shadow-[0_0_40px_rgba(196,163,90,0.4)]"
                  : "bg-black/30 text-white border-white/30"
              }`}>
                {isHovered && isVideoLoading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <Play size={20} className={`ml-0.5 transition-colors duration-300 ${isHovered ? "fill-black text-black" : "fill-white text-white"}`} />
                )}
              </div>
            </div>
          </div>

          {/* Location + Year — top right */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 lg:top-10 lg:right-10 z-10">
            <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 text-right">
              {film.location}<br />{film.year}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

export function Films() {
  const [activeFilm, setActiveFilm] = useState<typeof films[0] | null>(null);

  return (
    <>
      <section id="films" className="bg-[#03111d] text-foreground py-24 md:py-32 px-5 md:px-10 lg:px-16">
        <div className="mb-12 md:mb-16">
          <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-4">Films</AnimatedText>
          <ScrollReveal
            baseOpacity={0.05}
            preset="fade"
            textClassName="font-display text-3xl md:text-4xl lg:text-5xl text-foreground/90 max-w-lg font-normal leading-[1.2]"
            rotationEnd="bottom center+=20%"
            wordAnimationEnd="bottom center+=45%"
          >
            Some stories are better felt in motion.
          </ScrollReveal>
        </div>

        {/* Side-by-side film cards with vertical separator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 max-w-7xl relative">
          {/* Vertical gold separator — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent -translate-x-1/2" />

          {films.map((film, i) => (
            <div key={film.id} className={i === 0 ? "md:pr-6" : "md:pl-6"} onClick={() => setActiveFilm(film)}>
              <FilmCard film={film} index={i} />
            </div>
          ))}
        </div>
      </section>

      {/* Video Lightbox Modal */}
      <VideoModal
        isOpen={!!activeFilm}
        onClose={() => setActiveFilm(null)}
        videoUrl={activeFilm?.videoUrl}
        posterUrl={activeFilm?.poster}
        title={activeFilm ? `${activeFilm.title} — ${activeFilm.subtitle}` : ""}
      />
    </>
  );
}
