"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Camera, MapPin, Eye } from "lucide-react";

interface FilmstripFrame {
  id: string;
  image: string;
  title: string;
  location: string;
  tag: string;
  time: string;
}

const frames: FilmstripFrame[] = [
  {
    id: "f1",
    image: "/wedding/imgi_7_3.jpg",
    title: "Golden Hour Glow",
    location: "South Saskatchewan River",
    tag: "Wedding Portrait",
    time: "19:42 PM",
  },
  {
    id: "f2",
    image: "/wedding/imgi_6_4.jpg",
    title: "The Unscripted First Glance",
    location: "Saskatoon Estate",
    tag: "Emotional Moment",
    time: "14:15 PM",
  },
  {
    id: "f3",
    image: "/drone/imgi_11_6.jpg",
    title: "Prairie Horizon Flight",
    location: "Wanuskewin Valley",
    tag: "Aerial Drone 4K",
    time: "18:00 PM",
  },
  {
    id: "f4",
    image: "/wedding/imgi_4_7_1.jpg",
    title: "Silent Promises",
    location: "Church Ceremony",
    tag: "Vow Exchange",
    time: "15:30 PM",
  },
  {
    id: "f5",
    image: "/drone/imgi_10_3.jpg",
    title: "High-Altitude Canopy",
    location: "Boreal Trail Venue",
    tag: "Landscape Scale",
    time: "17:20 PM",
  },
  {
    id: "f6",
    image: "/wedding/imgi_8_6.jpg",
    title: "Midnight Celebration",
    location: "Downtown Saskatoon",
    tag: "Reception Party",
    time: "22:45 PM",
  },
];

export function FilmstripStory() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full py-20 bg-background border-t border-border overflow-hidden">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] tracking-[0.3em] uppercase font-sans font-semibold mb-3">
            <Camera size={12} className="text-gold" />
            <span>Behind The Lens Filmstrip</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-foreground font-normal tracking-tight">
            Moments Captured In Motion
          </h2>
        </div>

        <p className="font-sans text-xs sm:text-sm text-foreground/60 max-w-md leading-relaxed">
          Drag or scroll through our filmstrip of unscripted moments, twilight light, and aerial perspective across Saskatchewan.
        </p>
      </div>

      {/* Filmstrip Container */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto scrollbar-none py-4 px-6 cursor-grab active:cursor-grabbing"
      >
        <div className="flex gap-6 w-max items-center">
          {frames.map((frame, index) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative w-[280px] sm:w-[340px] shrink-0 bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden p-3 shadow-xl group transition-all duration-300"
            >
              {/* Film Sprocket Holes simulation */}
              <div className="flex justify-between items-center px-2 pb-2 mb-2 border-b border-neutral-800 text-[9px] font-mono text-gold/70">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
                  FRAME {index + 1}
                </span>
                <span>MSFILMS 35MM</span>
                <span>{frame.time}</span>
              </div>

              {/* Image Frame */}
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-950">
                <Image
                  src={frame.image}
                  alt={frame.title}
                  fill
                  sizes="340px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Overlaid Pill */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-sans tracking-wider uppercase text-white font-medium border border-white/10">
                  {frame.tag}
                </div>
              </div>

              {/* Caption Footer */}
              <div className="pt-3 px-1 flex items-center justify-between text-white">
                <div>
                  <h4 className="font-serif text-base text-neutral-100 font-normal leading-snug group-hover:text-gold transition-colors">
                    {frame.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-sans mt-0.5">
                    <MapPin size={10} className="text-gold" />
                    <span>{frame.location}</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-neutral-700 bg-neutral-800 flex items-center justify-center text-neutral-300 group-hover:border-gold group-hover:text-gold transition-colors">
                  <Eye size={13} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
