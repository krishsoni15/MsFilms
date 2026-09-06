"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SoundwaveTeaser } from "@/components/ui/soundwave-teaser";
import { ArrowRight, Sparkles, Film, Compass, Heart, Play } from "lucide-react";
import Link from "next/link";

interface Chapter {
  id: string;
  number: string;
  badge: string;
  title: string;
  subtitle: string;
  quote: string;
  quoteAuthor: string;
  description: string;
  bullets: string[];
  image: string;
  alt: string;
  icon: typeof Sparkles;
}

const chapters: Chapter[] = [
  {
    id: "unscripted",
    number: "01",
    badge: "The Narrative Spark",
    title: "Unscripted Emotion Over Posed Perfection",
    subtitle: "Capturing the quiet, raw, and unrepeatable moments",
    quote: "The best photos aren't staged. They are captured in the split second when you forget the camera is even there.",
    quoteAuthor: "MSFilms Creative Direction",
    description:
      "We believe true storytelling happens in the spaces between traditional poses. The nervous tear before walking down the aisle, the quiet whisper during sunset vows, and the uncontrolled laughter on the dance floor. Our approach blends artistic direction with unobtrusive candid coverage so your wedding day feels authentic, unhurried, and deeply personal.",
    bullets: [
      "Documentary-style candid coverage",
      "Natural light & warm editorial tones",
      "Stress-free, relaxed guidance for camera-shy couples",
    ],
    image: "/wedding/imgi_7_3.jpg",
    alt: "Candid wedding couple laughing — MSFilms Saskatoon Storytelling",
    icon: Heart,
  },
  {
    id: "atmosphere",
    number: "02",
    badge: "Cinematic Cinema",
    title: "Films Graced With Rich Atmospheric Tone",
    subtitle: "Color-graded 4K cinema that moves your heart",
    quote: "A great film doesn't just show what your wedding day looked like — it resurrects exactly how it felt.",
    quoteAuthor: "MSFilms Film Director",
    description:
      "Our wedding films are crafted like independent cinema. We fuse custom color grading, ambient sound design, crisp audio vows, and curated musical scoring to build a filmic heirloom that grows more valuable with every passing decade.",
    bullets: [
      "Crystal clear vow & speech audio recording",
      "Custom 4K color grading tailored to prairie light",
      "Highlight teaser trailer + Full feature edit options",
    ],
    image: "/wedding/imgi_6_4.jpg",
    alt: "Cinematic wedding film still — MSFilms Saskatoon",
    icon: Film,
  },
  {
    id: "scale",
    number: "03",
    badge: "Aerial Dronography",
    title: "Sweeping Scale From High-Altitude Skies",
    subtitle: "Showcasing your venue & landscape in panoramic glory",
    quote: "From above, your story connects with the vast Canadian horizons and architectural majesty of your venue.",
    quoteAuthor: "MSFilms Licensed Flight Lead",
    description:
      "Every grand venue has a story written across the landscape. With fully licensed, high-resolution aerial dronography, we capture cinematic bird’s-eye sweeps of your ceremony grounds, Saskatchewan river valleys, and twilight skies.",
    bullets: [
      "Fully licensed Transport Canada drone operations",
      "High-resolution 4K aerial video & aerial portraits",
      "Seamless integration into your wedding film cut",
    ],
    image: "/drone/imgi_11_6.jpg",
    alt: "Aerial drone photography of venue — MSFilms Saskatchewan",
    icon: Compass,
  },
  {
    id: "legacy",
    number: "04",
    badge: "Heirloom Collections",
    title: "Memories Crafted To Last For Generations",
    subtitle: "Tangible physical art and archival digital preservation",
    quote: "Decades from today, these photographs and films will sit in your children's hands like timeless family treasures.",
    quoteAuthor: "MSFilms Legacy Philosophy",
    description:
      "Your wedding day passes in a whirlwind of joy. We curate high-resolution gallery archives, fine art linen albums, and custom archival video drives so your love story remains preserved in pristine quality forever.",
    bullets: [
      "Ultra-high resolution digital gallery with full print rights",
      "Fine-art handbound layflat photo albums",
      "Rapid preview gallery delivery within days of your event",
    ],
    image: "/wedding/imgi_3_5.png",
    alt: "Fine art wedding portrait collection — MSFilms Saskatoon",
    icon: Sparkles,
  },
];

export function StoryChapters() {
  const [activeTab, setActiveTab] = useState<string>(chapters[0].id);
  const currentChapter = chapters.find((c) => c.id === activeTab) || chapters[0];

  return (
    <section className="relative w-full py-20 lg:py-28 bg-background border-t border-border overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] tracking-[0.3em] uppercase font-sans font-semibold mb-4">
            <Sparkles size={12} className="text-gold animate-pulse" />
            <span>Our Storytelling Philosophy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-foreground font-normal tracking-tight mb-5 leading-tight">
            How We Tell Your Story
          </h2>

          <p className="font-sans text-xs sm:text-sm text-foreground/60 leading-relaxed max-w-xl mx-auto">
            Explore the four narrative chapters that define our signature editorial style, emotional depth, and cinematic imagery.
          </p>
        </div>

        {/* Chapter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-12 border-b border-border/60 pb-6">
          {chapters.map((chapter) => {
            const isActive = chapter.id === activeTab;
            const Icon = chapter.icon;
            return (
              <button
                key={chapter.id}
                onClick={() => setActiveTab(chapter.id)}
                className={`relative px-4 sm:px-6 py-3 rounded-full text-xs font-sans tracking-[0.15em] uppercase transition-all duration-300 flex items-center gap-2.5 ${
                  isActive
                    ? "bg-gold text-neutral-950 font-bold shadow-lg shadow-gold/20 scale-[1.02]"
                    : "bg-secondary/40 hover:bg-secondary/80 text-foreground/70 border border-border/40"
                }`}
              >
                <span
                  className={`text-[10px] font-mono ${
                    isActive ? "text-neutral-950/70" : "text-gold"
                  }`}
                >
                  {chapter.number}
                </span>
                <span>{chapter.badge}</span>
                <Icon size={13} className={isActive ? "text-neutral-950" : "text-gold/80"} />
              </button>
            );
          })}
        </div>

        {/* Active Chapter Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-widest text-gold bg-gold/10 px-3 py-1 rounded border border-gold/20 font-semibold">
                  CHAPTER {currentChapter.number}
                </span>
                <span className="text-[10px] tracking-[0.25em] text-foreground/50 uppercase font-sans">
                  {currentChapter.subtitle}
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl text-foreground font-normal leading-tight">
                {currentChapter.title}
              </h3>

              {/* Quote Banner */}
              <div className="relative pl-5 border-l-2 border-gold bg-gold/[0.03] p-4 rounded-r-xl">
                <p className="font-serif italic text-sm sm:text-base text-foreground/90 leading-relaxed">
                  &ldquo;{currentChapter.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[10px] font-sans tracking-[0.15em] text-gold uppercase font-semibold">
                    — {currentChapter.quoteAuthor}
                  </span>
                  <SoundwaveTeaser barCount={4} className="opacity-80" />
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-foreground/70 leading-relaxed">
                {currentChapter.description}
              </p>

              {/* Bullet Points */}
              <ul className="space-y-2.5 pt-2 font-sans text-xs text-foreground/85">
                {currentChapter.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Action Button */}
              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 bg-foreground text-background hover:bg-gold hover:text-neutral-950 font-sans text-[11px] tracking-[0.2em] uppercase font-bold px-7 py-3.5 rounded-full transition-all duration-300 shadow-md group"
                >
                  <span>Book Your Story</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 text-foreground/70 hover:text-gold font-sans text-[11px] tracking-[0.2em] uppercase font-semibold px-4 py-3 transition-colors"
                >
                  <span>View Portfolio</span>
                </Link>
              </div>
            </div>

            {/* Right Visual Image Card */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-border/80 group">
                <Image
                  src={currentChapter.image}
                  alt={currentChapter.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white font-sans">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] text-gold uppercase font-bold block mb-1">
                      {currentChapter.badge}
                    </span>
                    <p className="text-xs sm:text-sm font-serif italic text-white/90">
                      Saskatoon · Saskatchewan · Canada
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-gold group-hover:scale-110 transition-transform">
                    <Play size={14} className="ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
