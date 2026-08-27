"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { allGalleryItems } from "@/lib/work-data";
import BorderGlow from "@/components/ui/border-glow";
import { ArrowUpRight } from "lucide-react";

const FILTER_OPTIONS = [
  { label: "ALL", value: "all" },
  { label: "WEDDINGS", value: "weddings" },
  { label: "EVENTS", value: "events" },
  { label: "REAL ESTATE", value: "realestate" },
  { label: "DRONE", value: "drone" }
];

export function AllWorkGallery() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = allGalleryItems.filter(
    (item) => activeFilter === "all" || item.category === activeFilter
  );

  return (
    <section className="relative py-28 md:py-40 px-6 sm:px-12 lg:px-20 bg-[#020912] border-t border-white/[0.03] z-30">
      {/* Header and CTA */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
        <div>
          <span className="font-sans text-[10px] tracking-[0.3em] text-gold/80 font-bold uppercase block mb-3">
            EXPLORE THE ARCHIVES
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-[#f4f1eb]">
            STILL CURIOUS?
          </h2>
        </div>

        {/* Premium CTA Button */}
        <div className="shrink-0">
          <BorderGlow
            edgeSensitivity={20}
            glowColor="197 168 128"
            backgroundColor="transparent"
            borderRadius={9999}
            glowRadius={30}
            glowIntensity={0.25}
            animated={true}
            colors={["#c5a880", "#ffffff", "#c5a880"]}
            fillOpacity={0}
            style={{ borderColor: "transparent" }}
          >
            <a
              href="https://www.instagram.com/msfilms._/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full px-7 py-3.5 text-white/80 border border-white/10 hover:border-gold/30 hover:text-white transition-all duration-300 font-sans focus:outline-none"
              style={{
                background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.01) 100%)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                VIEW ALL WORK
                <ArrowUpRight size={13} />
              </span>
            </a>
          </BorderGlow>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16 border-b border-white/[0.06] pb-4">
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = activeFilter === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`relative py-2 text-[10px] sm:text-xs tracking-[0.2em] font-sans font-semibold transition-colors duration-300 uppercase focus:outline-none ${isActive ? "text-[#c5a880]" : "text-white/40 hover:text-white/80"
                  }`}
              >
                {opt.label}
                {isActive && (
                  <motion.span
                    layoutId="activeFilterUnderline"
                    className="absolute bottom-[-5px] left-0 right-0 h-[1.5px] bg-[#c5a880]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Responsive Masonry Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="break-inside-avoid chroma-card group shadow-md"
              >
                <div className="chroma-card-inner w-full h-full relative">
                  {/* Image Container */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ height: `${item.height}px` }}
                  >
                    <Image
                      src={item.img}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle dark vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Editorial Label Overlay (visible on hover) */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-400 ease-out z-10 pointer-events-none">
                    <span className="text-[8px] tracking-[0.25em] text-[#c5a880] uppercase font-bold">
                      {item.category === "realestate" ? "REAL ESTATE" : item.category}
                    </span>
                    <h4 className="font-serif text-xl text-[#f4f1eb] font-normal leading-tight mt-1">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-20 text-center text-white/30 font-sans text-xs tracking-wider">
            No work items found under this category.
          </div>
        )}
      </div>
    </section>
  );
}
export default AllWorkGallery;
