"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Masonry, { MasonryItem } from "@/components/ui/Masonry";
import { VideoModal } from "@/components/video-modal";
import CircularShowcase from "@/components/sections/circular-showcase";
import { Sparkles, Camera, Film, Play, X, Heart, Building2, PartyPopper, ArrowUpRight } from "lucide-react";

type CategoryTab = "weddings" | "realestate" | "events";

interface VideoCard {
  id: string;
  title: string;
  category: string;
  location: string;
  duration: string;
  poster: string;
  videoUrl?: string;
}

// Category 1: Weddings (ALL 17 Verified Wedding Images)
const WEDDING_MASONRY: MasonryItem[] = [
  {
    id: "w1",
    img: "/wedding/bg1.png",
    height: 720,
    title: "Golden Hour Prairie Vows",
    category: "Weddings",
    location: "Saskatoon, SK",
  },
  {
    id: "w2",
    img: "/wedding/1_1.png",
    height: 520,
    title: "Aisle Walk Unscripted Emotion",
    category: "Weddings",
    location: "Saskatchewan",
  },
  {
    id: "w3",
    img: "/wedding/1_2.png",
    height: 840,
    title: "Editorial Bridal Portrait Framing",
    category: "Weddings",
    location: "Saskatoon, SK",
  },
  {
    id: "w4",
    img: "/wedding/1_3.png",
    height: 600,
    title: "Sunset Vow Exchange",
    category: "Weddings",
    location: "Regina, SK",
  },
  {
    id: "w5",
    img: "/wedding/1_4.png",
    height: 760,
    title: "Quiet Romance & Touch",
    category: "Weddings",
    location: "Meewasin Valley",
  },
  {
    id: "w6",
    img: "/wedding/1_5.png",
    height: 560,
    title: "Ceremony Joy & Confetti",
    category: "Weddings",
    location: "Saskatoon, SK",
  },
  {
    id: "w7",
    img: "/wedding/8.jpg",
    height: 660,
    title: "Grand Ballroom Celebration",
    category: "Weddings",
    location: "TCU Place Saskatoon",
  },
  {
    id: "w8",
    img: "/wedding/DSC00080.JPG",
    height: 780,
    title: "Fine Art Bridal Study",
    category: "Weddings",
    location: "Saskatoon, SK",
  },
  {
    id: "w9",
    img: "/wedding/DSC00085.JPG",
    height: 640,
    title: "Candlelight First Dance",
    category: "Weddings",
    location: "Greenbryre SK",
  },
  {
    id: "w10",
    img: "/wedding/bg.png",
    height: 700,
    title: "Twilight Prairie Horizon",
    category: "Weddings",
    location: "Saskatchewan",
  },
  {
    id: "w11",
    img: "/wedding/imgi_2_2.png",
    height: 530,
    title: "Bridal Preparation Details",
    category: "Weddings",
    location: "Saskatoon Suite",
  },
  {
    id: "w12",
    img: "/wedding/imgi_3_5.png",
    height: 820,
    title: "Fine Art Veil Movement",
    category: "Weddings",
    location: "Wanuskewin Park",
  },
  {
    id: "w13",
    img: "/wedding/imgi_4_7.jpg",
    height: 590,
    title: "Aisle Entrance Joy",
    category: "Weddings",
    location: "Saskatoon Church",
  },
  {
    id: "w14",
    img: "/wedding/imgi_4_7_1.jpg",
    height: 610,
    title: "Candid Toast & Laughter",
    category: "Weddings",
    location: "Banff National Park",
  },
  {
    id: "w15",
    img: "/wedding/imgi_6_4.jpg",
    height: 670,
    title: "Unscripted First Look",
    category: "Weddings",
    location: "Saskatoon, SK",
  },
  {
    id: "w16",
    img: "/wedding/imgi_7_3.jpg",
    height: 550,
    title: "Sunset Couple Stroll",
    category: "Weddings",
    location: "Waskesiu Lake",
  },
  {
    id: "w17",
    img: "/wedding/imgi_8_6.jpg",
    height: 710,
    title: "Archival Memory Heirloom",
    category: "Weddings",
    location: "Saskatchewan",
  },
];

const WEDDING_VIDEOS: VideoCard[] = [
  {
    id: "wv1",
    title: "Golden Hour Prairie Vows",
    category: "Wedding Cinema",
    location: "Saskatoon · 2026",
    duration: "4:30 min",
    poster: "/wedding/bg1.png",
    videoUrl: "/mp4/bg_video.mp4",
  },
  {
    id: "wv2",
    title: "Banff Mountain Romance",
    category: "Wedding Cinema",
    location: "Banff National Park · 2026",
    duration: "6:15 min",
    poster: "/wedding/1_2.png",
    videoUrl: "/mp4/DJI_0094_optimized.mp4",
  },
  {
    id: "wv3",
    title: "Waskesiu Lake Sunset Vows",
    category: "Wedding Cinema",
    location: "Prince Albert National Park · 2026",
    duration: "5:10 min",
    poster: "/wedding/imgi_6_4.jpg",
    videoUrl: "/mp4/whatsapp_intro.mp4",
  },
];

// Category 2: Real Estate (ALL 12 Verified Real Estate + 6 Drone Images)
const REAL_ESTATE_MASONRY: MasonryItem[] = [
  {
    id: "r1",
    img: "/real-estate/img_1.jpg",
    height: 760,
    title: "Greenbryre Luxury Estate",
    category: "Real Estate",
    location: "Greenbryre Estates",
  },
  {
    id: "r2",
    img: "/real-estate/img_2.jpg",
    height: 540,
    title: "River Landing Penthouse View",
    category: "Real Estate",
    location: "Saskatoon Riverbank",
  },
  {
    id: "r3",
    img: "/real-estate/img_3.jpg",
    height: 800,
    title: "Willows Villa Modernist Architecture",
    category: "Real Estate",
    location: "Willows Golf Estate",
  },
  {
    id: "r4",
    img: "/real-estate/img_4.jpg",
    height: 600,
    title: "Architectural Interior & Millwork",
    category: "Real Estate",
    location: "Saskatoon, SK",
  },
  {
    id: "r5",
    img: "/real-estate/img_5.jpg",
    height: 680,
    title: "Sunlit Living Room Sanctuary",
    category: "Real Estate",
    location: "Saskatoon, SK",
  },
  {
    id: "r6",
    img: "/real-estate/img_6.jpg",
    height: 720,
    title: "Contemporary Dining & Kitchen Suite",
    category: "Real Estate",
    location: "Greenbryre SK",
  },
  {
    id: "r7",
    img: "/real-estate/14.jpg",
    height: 790,
    title: "High-End Residential Grounds & Lawn",
    category: "Real Estate",
    location: "Saskatchewan",
  },
  {
    id: "r8",
    img: "/real-estate/CK_41.jpg",
    height: 570,
    title: "Commercial Plaza & Architectural Facade",
    category: "Commercial Media",
    location: "Saskatoon, SK",
  },
  {
    id: "r9",
    img: "/real-estate/L4_6.jpg",
    height: 650,
    title: "Luxury Poolside & Outdoor Living",
    category: "Real Estate",
    location: "Regina Estates",
  },
  {
    id: "r10",
    img: "/real-estate/L4_69.JPG",
    height: 710,
    title: "Modern Master Suite Sanctuary",
    category: "Real Estate",
    location: "Greenbryre SK",
  },
  {
    id: "r11",
    img: "/real-estate/L_1.jpg",
    height: 630,
    title: "Dusk Exterior Architectural Illumination",
    category: "Real Estate",
    location: "Saskatoon, SK",
  },
  {
    id: "r12",
    img: "/real-estate/L_36.JPG",
    height: 750,
    title: "Contemporary Residence Facade Framing",
    category: "Real Estate",
    location: "Saskatoon, SK",
  },
  {
    id: "r13",
    img: "/drone/imgi_10_3.jpg",
    height: 660,
    title: "South Saskatchewan River Aerial Sweep",
    category: "Aerial Drone",
    location: "Saskatoon, SK",
  },
  {
    id: "r14",
    img: "/drone/imgi_11_6.jpg",
    height: 700,
    title: "Boreal Forest Canopy & Acreage Flyover",
    category: "Aerial Drone",
    location: "Saskatchewan",
  },
  {
    id: "r15",
    img: "/drone/imgi_12_9.jpg",
    height: 580,
    title: "Dusk Estate Drone Flight",
    category: "Aerial Drone",
    location: "Regina, SK",
  },
  {
    id: "r16",
    img: "/drone/imgi_13_12.jpg",
    height: 640,
    title: "High-Altitude Horizon Sunset",
    category: "Aerial Drone",
    location: "Prairie Valley",
  },
];

const REAL_ESTATE_VIDEOS: VideoCard[] = [
  {
    id: "rv1",
    title: "Greenbryre Modern Estate 4K Tour",
    category: "Architectural Walkthrough",
    location: "Greenbryre · 2026",
    duration: "3:45 min",
    poster: "/real-estate/img_1.jpg",
    videoUrl: "/mp4/DJI_0094_optimized.mp4",
  },
  {
    id: "rv2",
    title: "River Landing Penthouse Aerial Cinema",
    category: "4K Drone Reel",
    location: "Saskatoon · 2026",
    duration: "2:50 min",
    poster: "/drone/imgi_10_3.jpg",
    videoUrl: "/mp4/bg_video.mp4",
  },
  {
    id: "rv3",
    title: "Willows Architectural Villa Walkthrough",
    category: "Property Showcase",
    location: "Willows · 2026",
    duration: "3:15 min",
    poster: "/real-estate/img_3.jpg",
    videoUrl: "/mp4/whatsapp_intro.mp4",
  },
];

// Category 3: Events & Lifestyle (ALL 11 Drone Images + Verified Fine Art)
const EVENT_MASONRY: MasonryItem[] = [
  {
    id: "e1",
    img: "/drone/imgi_2_1.jpg",
    height: 720,
    title: "Wanuskewin Valley Aerial Flight",
    category: "Aerial Fine Art",
    location: "Wanuskewin Park",
  },
  {
    id: "e2",
    img: "/drone/imgi_3_4.jpg",
    height: 540,
    title: "Meewasin Trail River Sweep",
    category: "Aerial Drone",
    location: "Saskatoon, SK",
  },
  {
    id: "e3",
    img: "/drone/imgi_4_7.jpg",
    height: 810,
    title: "Prairie Golden Hour Flight",
    category: "Aerial Drone",
    location: "Saskatchewan",
  },
  {
    id: "e4",
    img: "/drone/imgi_5_10.jpg",
    height: 600,
    title: "High-Altitude River Bend",
    category: "Aerial Drone",
    location: "South Saskatchewan River",
  },
  {
    id: "e5",
    img: "/drone/imgi_6_2.jpg",
    height: 760,
    title: "Twilight Sunset Horizon",
    category: "Aerial Fine Art",
    location: "Prairie Horizon",
  },
  {
    id: "e6",
    img: "/drone/imgi_7_5.jpg",
    height: 580,
    title: "Boreal Canopy Overlook",
    category: "Aerial Drone",
    location: "Waskesiu Lake",
  },
  {
    id: "e7",
    img: "/drone/imgi_9_11.jpg",
    height: 670,
    title: "South Saskatchewan Sunset Waters",
    category: "Aerial Drone",
    location: "Saskatoon, SK",
  },
  {
    id: "e8",
    img: "/wedding/imgi_3_5.png",
    height: 750,
    title: "Twilight Engagement Session",
    category: "Engagements",
    location: "Wanuskewin Park",
  },
  {
    id: "e9",
    img: "/wedding/8.jpg",
    height: 560,
    title: "Saskatchewan Gala Celebration",
    category: "Events",
    location: "TCU Place Saskatoon",
  },
  {
    id: "e10",
    img: "/wedding/1_2.png",
    height: 800,
    title: "Artisanal Fine Art Portrait Study",
    category: "Portraits",
    location: "Saskatoon, SK",
  },
  {
    id: "e11",
    img: "/wedding/DSC00080.JPG",
    height: 630,
    title: "Fine Art Lifestyle Framing",
    category: "Lifestyle",
    location: "Saskatoon, SK",
  },
  {
    id: "e12",
    img: "/wedding/DSC00085.JPG",
    height: 690,
    title: "Milestone Gala Evening",
    category: "Events",
    location: "Regina, SK",
  },
];

const EVENT_VIDEOS: VideoCard[] = [
  {
    id: "ev1",
    title: "Saskatchewan Gala Night & Milestone Story",
    category: "Event Cinema",
    location: "Regina · 2026",
    duration: "4:00 min",
    poster: "/wedding/8.jpg",
    videoUrl: "/mp4/bg_video.mp4",
  },
  {
    id: "ev2",
    title: "Engagement Lifestyle Story in Natural Light",
    category: "Engagement Cinema",
    location: "Wanuskewin · 2026",
    duration: "3:30 min",
    poster: "/wedding/imgi_3_5.png",
    videoUrl: "/mp4/whatsapp_intro.mp4",
  },
  {
    id: "ev3",
    title: "Boreal Canopy Aerial Flight Highlights",
    category: "Aerial Cinema",
    location: "Saskatchewan · 2026",
    duration: "2:40 min",
    poster: "/drone/imgi_11_6.jpg",
    videoUrl: "/mp4/DJI_0094_optimized.mp4",
  },
];

export function WorkClient() {
  const [activeTab, setActiveTab] = useState<CategoryTab>("weddings");

  // State for image lightbox modal
  const [selectedImage, setSelectedImage] = useState<MasonryItem | null>(null);

  // State for video cinema modal
  const [selectedVideo, setSelectedVideo] = useState<VideoCard | null>(null);

  // Current tab items
  const activeMasonryItems =
    activeTab === "weddings"
      ? WEDDING_MASONRY
      : activeTab === "realestate"
        ? REAL_ESTATE_MASONRY
        : EVENT_MASONRY;

  const activeVideoCards =
    activeTab === "weddings"
      ? WEDDING_VIDEOS
      : activeTab === "realestate"
        ? REAL_ESTATE_VIDEOS
        : EVENT_VIDEOS;

  const handleImageClick = (item: MasonryItem) => {
    setSelectedImage(item);
  };

  return (
    <>
      <Navigation isParentLoaded={true} />

      <main className="min-h-screen w-full relative bg-background flex flex-col justify-between overflow-x-hidden pt-28">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75vw] h-[75vw] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-96 h-96 rounded-full bg-amber-500/5 blur-[140px] pointer-events-none" />

        <div className="flex-grow pb-24">
          {/* Main Portfolio Header */}
          <div className="relative z-10 text-center px-6 pt-12 pb-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-4 shadow-sm"
            >
              <Sparkles size={13} className="text-gold animate-pulse" />
              <span className="font-sans text-[10px] tracking-[0.35em] text-gold font-bold uppercase">
                Creative Portfolio &amp; Archives
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground font-normal uppercase tracking-tight mb-4"
            >
              Portfolio Collections
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-xs sm:text-sm text-foreground/70 max-w-xl mx-auto leading-relaxed mb-8"
            >
              Select a category below to explore our complete fine-art photography masonry galleries followed by 4K video cinema across Saskatoon, Saskatchewan, and Canada.
            </motion.p>

            {/* 3 Main Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center gap-3 flex-wrap"
            >
              <button
                onClick={() => setActiveTab("weddings")}
                className={`px-6 py-3 rounded-full text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2.5 ${activeTab === "weddings"
                    ? "bg-gold text-black font-bold shadow-lg shadow-gold/20 scale-105"
                    : "bg-foreground/5 hover:bg-foreground/10 text-foreground/70 border border-foreground/10"
                  }`}
              >
                <Heart size={14} className={activeTab === "weddings" ? "text-black" : "text-gold"} />
                <span>01 Weddings ({WEDDING_MASONRY.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("realestate")}
                className={`px-6 py-3 rounded-full text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2.5 ${activeTab === "realestate"
                    ? "bg-gold text-black font-bold shadow-lg shadow-gold/20 scale-105"
                    : "bg-foreground/5 hover:bg-foreground/10 text-foreground/70 border border-foreground/10"
                  }`}
              >
                <Building2 size={14} className={activeTab === "realestate" ? "text-black" : "text-gold"} />
                <span>02 Real Estate ({REAL_ESTATE_MASONRY.length})</span>
              </button>

              <button
                onClick={() => setActiveTab("events")}
                className={`px-6 py-3 rounded-full text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 flex items-center gap-2.5 ${activeTab === "events"
                    ? "bg-gold text-black font-bold shadow-lg shadow-gold/20 scale-105"
                    : "bg-foreground/5 hover:bg-foreground/10 text-foreground/70 border border-foreground/10"
                  }`}
              >
                <PartyPopper size={14} className={activeTab === "events" ? "text-black" : "text-gold"} />
                <span>03 Events &amp; Lifestyle ({EVENT_MASONRY.length})</span>
              </button>
            </motion.div>
          </div>

          {/* Dynamic Tab Content */}
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
              >
                {/* 1. React Bits Masonry Photography Gallery */}
                <div className="mb-20">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-foreground/10">
                    <div>
                      <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-sans font-bold text-gold uppercase mb-1">
                        <Camera size={13} />
                        <span>Full Photography Gallery ({activeMasonryItems.length} Images)</span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-4xl text-foreground font-normal uppercase">
                        {activeTab === "weddings"
                          ? "Fine Art Wedding Photography"
                          : activeTab === "realestate"
                            ? "Architectural & Interior Imagery"
                            : "Events, Engagements & Fine Art"}
                      </h2>
                    </div>
                    <p className="font-sans text-xs text-foreground/50 max-w-xs">
                      Click any photo to inspect high-resolution details in full-screen Lightbox mode.
                    </p>
                  </div>

                  {/* React Bits Masonry Component */}
                  <Masonry
                    items={activeMasonryItems}
                    animateFrom="bottom"
                    blurToFocus={true}
                    scaleOnHover={true}
                    hoverScale={0.96}
                    stagger={0.05}
                    onItemClick={handleImageClick}
                  />
                </div>

                {/* 2. 4K Cinema Video Showcase */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-foreground/10">
                    <div>
                      <div className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] font-sans font-bold text-gold uppercase mb-1">
                        <Film size={13} />
                        <span>4K Cinema Showcase</span>
                      </div>
                      <h2 className="font-serif text-2xl sm:text-4xl text-foreground font-normal uppercase">
                        {activeTab === "weddings"
                          ? "Cinematic Wedding Films"
                          : activeTab === "realestate"
                            ? "4K Drone Walkthroughs"
                            : "Event Highlights & Lifestyle Reels"}
                      </h2>
                    </div>
                    <p className="font-sans text-xs text-foreground/50 max-w-xs">
                      Hover to preview stills. Click play to launch full cinema mode with sound.
                    </p>
                  </div>

                  {/* Video Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {activeVideoCards.map((video, idx) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 35 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                        onClick={() => setSelectedVideo(video)}
                        className="group relative rounded-xl border border-foreground/15 hover:border-gold/60 bg-background-alt overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-background-alt">
                          <Image
                            src={video.poster}
                            alt={video.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-108"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                          {/* Top Badge */}
                          <div className="absolute top-3 left-3 z-10">
                            <span className="px-2.5 py-1 rounded-full text-[8.5px] tracking-[0.18em] uppercase font-sans font-bold text-gold bg-black/85 backdrop-blur-md border border-gold/30 shadow-md">
                              {video.category}
                            </span>
                          </div>

                          {/* Animated Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="relative flex items-center justify-center">
                              <div className="absolute w-16 h-16 rounded-full bg-gold/20 animate-ping opacity-75" />
                              <div className="w-12 h-12 rounded-full bg-gold text-black flex items-center justify-center shadow-2xl group-hover:scale-115 transition-transform duration-300 border border-gold/50">
                                <Play size={18} className="ml-1 fill-black" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-5 flex items-center justify-between">
                          <div>
                            <h3 className="font-serif text-base text-foreground font-normal group-hover:text-gold transition-colors duration-300">
                              {video.title}
                            </h3>
                            <p className="font-sans text-[10px] text-foreground/50 uppercase tracking-wider mt-0.5">
                              {video.location}
                            </p>
                          </div>
                          <span className="text-[9px] tracking-wider uppercase font-sans text-gold font-semibold bg-gold/10 px-2.5 py-1 rounded-full border border-gold/20">
                            {video.duration}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Image Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9990] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-50 bg-black/50 rounded-full border border-white/20"
                aria-label="Close photo preview"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full h-[75vh] max-w-4xl">
                  <Image
                    src={selectedImage.img}
                    alt={selectedImage.title || "Full Resolution Photo"}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                  />
                </div>

                {selectedImage.title && (
                  <div className="mt-4 text-center">
                    <h3 className="font-serif text-xl text-white font-normal uppercase tracking-wide">
                      {selectedImage.title}
                    </h3>
                    {selectedImage.location && (
                      <p className="font-sans text-xs text-gold tracking-widest uppercase mt-1 font-semibold">
                        {selectedImage.location}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Video Cinema Modal */}
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo?.videoUrl}
          posterUrl={selectedVideo?.poster}
          title={selectedVideo?.title}
        />

        <CircularShowcase />
        <Footer />
      </main>
    </>
  );
}




