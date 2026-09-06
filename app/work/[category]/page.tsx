"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ChevronLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";

const CATEGORY_DATA: Record<
  string,
  {
    title: string;
    subtitle: string;
    description: string;
    heroImage: string;
    gallery: Array<{ src: string; title: string; subtitle: string }>;
  }
> = {
  wedding: {
    title: "Wedding Stories",
    subtitle: "Chapter I — Romance & Emotion",
    description:
      "Every glance, every smile, and every golden moment captured with timeless luxury and editorial grace.",
    heroImage: "/wedding/imgi_7_3.jpg",
    gallery: [
      { src: "/wedding/1_1.png", title: "The Golden Hour Glow", subtitle: "Saskatoon Estate Wedding" },
      { src: "/wedding/1_2.png", title: "Whispers in Gold", subtitle: "Bridal Portraiture" },
      { src: "/wedding/1_3.png", title: "Intimate Reception", subtitle: "Candlelight First Dance" },
      { src: "/wedding/1_4.png", title: "Eternal Promise", subtitle: "Exchange of Vows" },
      { src: "/wedding/1_5.png", title: "Sunset Romance", subtitle: "Open Horizon Portraits" },
      { src: "/wedding/imgi_6_4.jpg", title: "Bridal Elegance", subtitle: "Fine Art Close-up" },
    ],
  },
  "real-estate": {
    title: "Real Estate & Landscapes",
    subtitle: "Chapter II — Architecture & Nature",
    description:
      "Showcasing high-end architectural designs, luxury estates, and sweeping Canadian wilderness vistas.",
    heroImage: "/landscape/imgi_8_8.jpg",
    gallery: [
      { src: "/real-estate/img_1.jpg", title: "Modern Luxury Villa", subtitle: "Interior Architecture" },
      { src: "/real-estate/img_2.jpg", title: "Open Living Suite", subtitle: "Natural Light Showcase" },
      { src: "/real-estate/img_3.jpg", title: "Grand Facade", subtitle: "Exterior Landscape" },
      { src: "/real-estate/img_4.jpg", title: "Sunset Horizon", subtitle: "Estate Dusk Capture" },
      { src: "/landscape/imgi_7_4.jpg", title: "Silent Mountain Forest", subtitle: "Banff Fine Art Study" },
      { src: "/landscape/imgi_10_6.jpg", title: "Sunset Mountain Peaks", subtitle: "Wilderness Horizon" },
    ],
  },
  drone: {
    title: "Aerial & Drone Horizons",
    subtitle: "Chapter III — Perspectives From Above",
    description:
      "Captivating 4K overhead compositions, coastline panoramas, and dynamic aerial storytelling.",
    heroImage: "/drone/imgi_10_3.jpg",
    gallery: [
      { src: "/drone/imgi_10_3.jpg", title: "High Coastlines", subtitle: "Aerial Shoreline Motion" },
      { src: "/drone/imgi_12_9.jpg", title: "Symmetry from Above", subtitle: "Overhead Composition" },
      { src: "/drone/imgi_11_6.jpg", title: "Winter Prairie Roads", subtitle: "Snow Lines & Horizon" },
      { src: "/drone/imgi_2_1.jpg", title: "Forest Canopies", subtitle: "Overhead Canopy Study" },
      { src: "/drone/imgi_4_7.jpg", title: "River Bends", subtitle: "Natural Symmetry" },
    ],
  },
  events: {
    title: "Events & Celebrations",
    subtitle: "Chapter IV — Milestones & Gatherings",
    description:
      "Authentic documentary coverage of gala celebrations, corporate unveilings, and intimate gatherings.",
    heroImage: "/wedding/bg1.png",
    gallery: [
      { src: "/wedding/bg1.png", title: "Grand Gala Evening", subtitle: "Celebration Highlight" },
      { src: "/wedding/DSC00085.JPG", title: "Evening Reception", subtitle: "Candlelit Atmosphere" },
      { src: "/wedding/1_3.png", title: "Stage & Speeches", subtitle: "Live Experience Capture" },
    ],
  },
};

export default function CategoryWorkPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = use(params);
  const categoryKey = resolvedParams?.category?.toLowerCase() || "wedding";
  const data = CATEGORY_DATA[categoryKey];

  if (!data) {
    return notFound();
  }

  return (
    <>
      <Navigation isParentLoaded={true} />

      <main className="min-h-screen w-full relative bg-background flex flex-col justify-between overflow-x-hidden pt-28">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gold/5 blur-[140px] pointer-events-none" />

        <div className="flex-grow max-w-7xl mx-auto px-6 w-full">
          {/* Back to All Work link */}
          <div className="mb-8">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-gold/70 hover:text-gold transition-colors font-sans"
            >
              <ChevronLeft size={14} />
              <span>Back to All Work</span>
            </Link>
          </div>

          {/* Category Hero Header */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 p-8 md:p-16 mb-16 shadow-2xl">
            <div className="absolute inset-0 z-0 opacity-40">
              <Image
                src={data.heroImage}
                alt={data.title}
                fill
                className="object-cover object-center grayscale"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-gold font-sans font-semibold">
                {data.subtitle}
              </span>
              <h1 className="font-serif text-4xl md:text-6xl text-foreground font-light tracking-wide uppercase leading-none">
                {data.title}
              </h1>
              <p className="font-serif text-sm md:text-base italic text-foreground/75 leading-relaxed font-light">
                {data.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 border border-gold/50 hover:border-gold bg-gold/10 hover:bg-gold/20 text-gold px-6 py-3 text-[10px] tracking-[0.25em] uppercase font-sans font-semibold rounded transition-all duration-300 shadow-lg"
                >
                  <span>Book This Collection</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="space-y-8 mb-20">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="font-display text-xl md:text-2xl text-foreground uppercase tracking-wider font-light">
                Featured Highlights
              </h2>
              <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-mono">
                {data.gallery.length} Selected Works
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden border border-white/10 bg-neutral-900 aspect-[4/3] shadow-lg transition-transform duration-500 hover:-translate-y-1.5"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6 text-left z-10">
                    <span className="text-[8px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-1 block">
                      {data.title}
                    </span>
                    <h3 className="font-display text-lg text-white uppercase tracking-wider">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-white/60 font-sans tracking-wide mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
