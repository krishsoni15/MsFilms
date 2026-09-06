"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause, Volume2, VolumeX, X, ChevronLeft, ChevronRight, Film, Sparkles } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

export interface FilmItem {
  id: string;
  title: string;
  category: "wedding" | "real-estate" | "drone" | "events";
  categoryLabel: string;
  duration: string;
  image: string;
  videoUrl: string;
  location: string;
  year: string;
  description: string;
}

const FEATURED_FILMS: FilmItem[] = [
  {
    id: "film-1",
    title: "Golden Hour Prairie Vows",
    category: "wedding",
    categoryLabel: "Wedding Cinema",
    duration: "03:45",
    image: "/wedding/1_1.png",
    videoUrl: "/mp4/DJI_0094_optimized.mp4",
    location: "Saskatoon, SK",
    year: "2025",
    description: "An intimate luxury wedding film captured across the golden horizon of Saskatchewan during sunset.",
  },
  {
    id: "film-2",
    title: "Downtown Saskatoon Aerial 4K",
    category: "drone",
    categoryLabel: "Drone Reel",
    duration: "04:12",
    image: "/drone/imgi_10_3.jpg",
    videoUrl: "/mp4/bg_video.mp4",
    location: "Saskatoon Riverbank",
    year: "2025",
    description: "Sweeping 4K aerial cinematic drone tour exploring the riverbank landmarks and architecture of Saskatoon.",
  },
  {
    id: "film-3",
    title: "Greenbryre Modern Estate",
    category: "real-estate",
    categoryLabel: "Real Estate",
    duration: "02:30",
    image: "/real-estate/img_1.jpg",
    videoUrl: "/mp4/whatsapp_intro.mp4",
    location: "Greenbryre Estates",
    year: "2024",
    description: "High-end architectural walkthrough showcasing luxury interiors, custom pools, and sprawling golf views.",
  },
  {
    id: "film-4",
    title: "Banff Mountain Romance",
    category: "wedding",
    categoryLabel: "Wedding Cinema",
    duration: "05:15",
    image: "/wedding/bg1.png",
    videoUrl: "/mp4/DJI_0094_optimized.mp4",
    location: "Banff National Park, AB",
    year: "2025",
    description: "Breathtaking mountain elopement cinema surrounded by glacial alpine lakes and snowcapped peaks.",
  },
  {
    id: "film-5",
    title: "Boreal Forest Canopy Flyover",
    category: "drone",
    categoryLabel: "Drone Reel",
    duration: "02:10",
    image: "/drone/imgi_12_9.jpg",
    videoUrl: "/mp4/bg_video.mp4",
    location: "Prince Albert National Park",
    year: "2025",
    description: "Crisp 4K drone flight skimming pine treetops and pristine wilderness waterways in northern Canada.",
  },
  {
    id: "film-6",
    title: "Willows Architectural Villa",
    category: "real-estate",
    categoryLabel: "Real Estate",
    duration: "03:00",
    image: "/real-estate/img_3.jpg",
    videoUrl: "/mp4/whatsapp_intro.mp4",
    location: "Willows Golf Community",
    year: "2024",
    description: "Sleek contemporary residence cinema featuring natural light design, high ceilings, and landscaped grounds.",
  },
  {
    id: "film-7",
    title: "Waskesiu Lake Vows & Sunset",
    category: "wedding",
    categoryLabel: "Wedding Cinema",
    duration: "04:50",
    image: "/wedding/1_3.png",
    videoUrl: "/mp4/DJI_0094_optimized.mp4",
    location: "Waskesiu Lake, SK",
    year: "2025",
    description: "Lakeside ceremony highlights with emotional vow exchanges and twilight canoe portraits.",
  },
  {
    id: "film-8",
    title: "River Landing Dawn Flyover",
    category: "drone",
    categoryLabel: "Drone Reel",
    duration: "01:45",
    image: "/drone/imgi_4_7.jpg",
    videoUrl: "/mp4/bg_video.mp4",
    location: "River Landing, Saskatoon",
    year: "2025",
    description: "Sunrise aerial perspective of urban architecture reflecting off calm river waters at dawn.",
  },
];

function HoverVideoCard({
  film,
  onClick,
  onHoverStateChange,
}: {
  film: FilmItem;
  onClick: () => void;
  onHoverStateChange: (hovered: boolean) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.muted = true;
      video.defaultMuted = true;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isHovered]);

  return (
    <div
      onMouseEnter={() => {
        setIsHovered(true);
        onHoverStateChange(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverStateChange(false);
      }}
      onClick={onClick}
      className="relative shrink-0 w-[280px] xs:w-[320px] sm:w-[400px] md:w-[460px] lg:w-[500px] aspect-video rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-gold/70 shadow-2xl transition-all duration-500 hover:scale-[1.02] group bg-background-alt"
    >
      {/* Poster Image */}
      <Image
        src={film.image}
        alt={film.title}
        fill
        className={`object-cover object-center transition-all duration-700 ${
          isHovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
        }`}
        sizes="(max-width: 640px) 280px, (max-width: 1024px) 440px, 500px"
      />

      {/* Video Element (Auto plays on hover) */}
      <video
        ref={videoRef}
        src={film.videoUrl}
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
          isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100 pointer-events-none"
        }`}
      />

      {/* Ambient Dark Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/25 to-transparent group-hover:from-background/95 transition-all duration-300" />

      {/* Center Glass Gold Play Button */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/45 border border-gold/60 backdrop-blur-md flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(197,168,128,0.3)]">
          <Play size={20} className="ml-1 fill-current" />
        </div>
      </div>

      {/* Minimalist Bottom Title Bar */}
      <div className="absolute bottom-3 sm:bottom-4 inset-x-4 sm:inset-x-5 flex flex-col justify-end pointer-events-none">
        <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-gold font-sans font-semibold mb-0.5 sm:mb-1">
          {film.categoryLabel}
        </span>
        <h3 className="font-display text-lg sm:text-2xl text-white font-normal group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {film.title}
        </h3>
      </div>
    </div>
  );
}

export function CircularGallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeModalFilm, setActiveModalFilm] = useState<FilmItem | null>(null);
  const [activeModalIndex, setActiveModalIndex] = useState<number>(0);
  const [isAnyHovered, setIsAnyHovered] = useState<boolean>(false);

  // Video modal playback controls
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const filteredFilms = activeCategory === "all"
    ? FEATURED_FILMS
    : FEATURED_FILMS.filter((f) => f.category === activeCategory);

  // Duplicated list for seamless right-to-left infinite auto-scrolling
  const displayFilms = [...filteredFilms, ...filteredFilms, ...filteredFilms];

  // Silky Right-to-Left Auto-Scroll Engine (Pauses when hovered)
  useEffect(() => {
    const track = scrollTrackRef.current;
    if (!track || activeModalFilm) return;

    let animFrameId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;

      if (track && !isAnyHovered) {
        track.scrollLeft += delta * 0.04; // Smooth continuous movement

        // Infinite loop reset
        if (track.scrollLeft >= (track.scrollWidth / 3) * 2) {
          track.scrollLeft -= track.scrollWidth / 3;
        }
      }

      animFrameId = requestAnimationFrame(step);
    };

    animFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [activeModalFilm, isAnyHovered, activeCategory]);

  const handleCardClick = (film: FilmItem, index: number) => {
    setActiveModalFilm(film);
    setActiveModalIndex(index % filteredFilms.length);
    setIsPlaying(true);
  };

  const handleNextFilm = () => {
    const nextIdx = (activeModalIndex + 1) % filteredFilms.length;
    setActiveModalIndex(nextIdx);
    setActiveModalFilm(filteredFilms[nextIdx]);
    setIsPlaying(true);
  };

  const handlePrevFilm = () => {
    const prevIdx = (activeModalIndex - 1 + filteredFilms.length) % filteredFilms.length;
    setActiveModalIndex(prevIdx);
    setActiveModalFilm(filteredFilms[prevIdx]);
    setIsPlaying(true);
  };

  const scrollTrack = (direction: "left" | "right") => {
    const track = scrollTrackRef.current;
    if (!track) return;
    const scrollAmount = direction === "left" ? -440 : 440;
    track.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-background border-t border-border/30 overflow-hidden relative">
      {/* Subtle Background Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gold/5 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-16 mb-6 sm:mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Film size={14} className="text-gold animate-pulse" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-semibold">
                Curated Cinema
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-light text-foreground">
              Featured Film Showcase.
            </h2>
          </div>
          
          <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
            <p className="text-xs sm:text-sm text-foreground/60 max-w-xs sm:max-w-md font-sans font-light hidden sm:block">
              Hover for video preview. Click to launch full cinema mode with sound.
            </p>

            {/* Left / Right Chevron Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollTrack("left")}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 hover:bg-gold hover:text-black hover:border-gold text-foreground/70 flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="Previous Films"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollTrack("right")}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/15 bg-white/5 hover:bg-gold hover:text-black hover:border-gold text-foreground/70 flex items-center justify-center transition-all duration-300 shadow-md"
                aria-label="Next Films"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Category Filter Tabs */}
        <div className="flex items-center gap-2 pt-4 border-t border-white/10 overflow-x-auto scrollbar-none">
          {[
            { id: "all", label: "All Films" },
            { id: "wedding", label: "Wedding Cinema" },
            { id: "real-estate", label: "Real Estate" },
            { id: "drone", label: "Drone 4K Reels" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] tracking-[0.18em] uppercase font-sans font-semibold rounded-full border transition-all duration-300 shrink-0 ${
                activeCategory === tab.id
                  ? "bg-gold text-neutral-950 border-gold shadow-[0_0_18px_rgba(197,168,128,0.4)]"
                  : "bg-white/5 text-foreground/70 border-white/10 hover:border-gold/50 hover:text-gold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Clean 16:9 Video Reel Track with Edge Vignette Gradient Blurs ─── */}
      <div className="relative z-10 w-full overflow-hidden">
        {/* Left Side Blur Fade Vignette */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 md:w-44 bg-gradient-to-r from-background via-background/85 to-transparent z-20" />
        
        {/* Right Side Blur Fade Vignette */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 md:w-44 bg-gradient-to-l from-background via-background/85 to-transparent z-20" />

        <div
          ref={scrollTrackRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none px-6 sm:px-12 md:px-20 lg:px-24 py-3"
        >
          {displayFilms.map((film, index) => {
            return (
              <HoverVideoCard
                key={`${film.id}-${index}`}
                film={film}
                onClick={() => handleCardClick(film, index)}
                onHoverStateChange={setIsAnyHovered}
              />
            );
          })}
        </div>
      </div>

      {/* ─── FULLSCREEN LUXURY CINEMA VIDEO MODAL PLAYER ─── */}
      {activeModalFilm && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in">
          <div className="relative w-full max-w-5xl bg-background-alt border border-gold/30 rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-gold/20 bg-background-alt-2/80">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-gold font-sans font-semibold">
                  {activeModalFilm.categoryLabel}
                </span>
                <span className="text-foreground/30 text-xs">•</span>
                <span className="text-xs text-foreground/70 font-sans font-medium">
                  {activeModalFilm.location} ({activeModalFilm.year})
                </span>
              </div>
              <button
                onClick={() => setActiveModalFilm(null)}
                className="w-8 h-8 rounded-full border border-white/20 hover:border-gold text-foreground/70 hover:text-gold flex items-center justify-center transition-all duration-300 bg-white/5"
              >
                <X size={16} />
              </button>
            </div>

            {/* Video Player Container (16:9 Aspect Ratio) */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden group">
              <video
                key={activeModalFilm.id}
                src={activeModalFilm.videoUrl}
                poster={activeModalFilm.image}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Video Overlay Navigation Chevrons */}
              <button
                onClick={handlePrevFilm}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-white/20 bg-black/60 text-white hover:bg-gold hover:text-black flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 shadow-xl"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNextFilm}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-white/20 bg-black/60 text-white hover:bg-gold hover:text-black flex items-center justify-center transition-all duration-300 opacity-80 hover:opacity-100 shadow-xl"
              >
                <ChevronRight size={20} />
              </button>

              {/* Bottom Video Controls Bar Overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => {
                      const videoEl = e.currentTarget.closest('.aspect-video')?.querySelector('video');
                      if (videoEl) {
                        if (videoEl.paused) {
                          videoEl.play();
                          setIsPlaying(true);
                        } else {
                          videoEl.pause();
                          setIsPlaying(false);
                        }
                      }
                    }}
                    className="text-white hover:text-gold transition-colors"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white hover:text-gold transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  <span className="text-xs text-white/80 font-mono">
                    {activeModalFilm.duration}
                  </span>
                </div>

                <div className="text-xs text-gold/90 font-sans tracking-widest uppercase font-medium">
                  {activeModalFilm.title}
                </div>
              </div>
            </div>

            {/* Modal Details & CTA Footer */}
            <div className="p-5 sm:p-6 md:p-8 bg-background-alt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2 max-w-2xl">
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl text-foreground font-light">
                  {activeModalFilm.title}
                </h3>
                <p className="font-serif italic text-xs sm:text-sm text-foreground/75 leading-relaxed font-light">
                  {activeModalFilm.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
                <BorderGlow
                  edgeSensitivity={20}
                  glowColor="35 85 75"
                  backgroundColor="transparent"
                  borderRadius={9999}
                  glowRadius={30}
                  glowIntensity={0.4}
                  animated={true}
                  colors={["#ffffff", "#cba358", "#ffffff"]}
                  fillOpacity={0}
                  style={{ borderColor: "transparent" }}
                >
                  <Link
                    href="/contact"
                    onClick={() => setActiveModalFilm(null)}
                    className="px-6 py-3 rounded-full bg-gold text-neutral-950 text-[10px] tracking-[0.2em] uppercase font-sans font-bold hover:bg-gold/90 transition-all duration-300 shadow-md block text-center"
                  >
                    Inquire About This Film
                  </Link>
                </BorderGlow>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
