"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "@/components/preloader";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

// Chapter Components
import { WorkIntro } from "@/components/work/work-intro";
import { WorkChapter } from "@/components/work/work-chapter";
import { CinematicSequence } from "@/components/work/cinematic-sequence";
import { ScatteredGallery } from "@/components/work/scattered-gallery";
import { MaskedReveal } from "@/components/work/masked-reveal";
import { AerialZoom } from "@/components/work/aerial-zoom";
import { HorizontalFilmStrip } from "@/components/work/film-strip";
import { ChapterTransition } from "@/components/work/chapter-transition";
import { AllWorkGallery } from "@/components/work/all-work-gallery";

// Data
import { workCategories } from "@/lib/work-data";

// Preload the four core cover images
const WORK_IMAGES_TO_PRELOAD = [
  "/logo/logo.png",
  "/wedding/DSC00085.JPG",
  "/landscape/imgi_10_6.jpg",
  "/real-estate/L_1.jpg",
  "/drone/imgi_11_6.jpg",
];

export default function WorkPage() {
  const [isLoading, setIsLoading] = useState(true);

  const weddingData = workCategories.find((cat) => cat.category === "weddings")!;
  const eventData = workCategories.find((cat) => cat.category === "events")!;
  const realEstateData = workCategories.find((cat) => cat.category === "realestate")!;
  const droneData = workCategories.find((cat) => cat.category === "drone")!;

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            key="preloader"
            imagesToPreload={WORK_IMAGES_TO_PRELOAD}
            onComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      <Navigation isParentLoaded={!isLoading} />

      <main className="overflow-x-clip w-full max-w-full relative bg-[#020912] min-h-screen">
        {/* Section 01: Work Intro */}
        <WorkIntro />

        {/* Section 02: Weddings Chapter */}
        <WorkChapter data={weddingData}>
          <CinematicSequence data={weddingData} />
        </WorkChapter>

        {/* Transition: Weddings -> Events */}
        <ChapterTransition
          nextChapterNum={eventData.number}
          nextChapterTitle={eventData.title}
        />

        {/* Section 03: Events Chapter */}
        <WorkChapter data={eventData}>
          <ScatteredGallery data={eventData} />
        </WorkChapter>

        {/* Horizontal Film Strip */}
        <HorizontalFilmStrip />

        {/* Section 04: Real Estate Chapter */}
        <WorkChapter data={realEstateData}>
          <MaskedReveal data={realEstateData} />
        </WorkChapter>

        {/* Transition: Real Estate -> Drone */}
        <ChapterTransition
          nextChapterNum={droneData.number}
          nextChapterTitle={droneData.title}
        />

        {/* Section 05: Drone Chapter */}
        <WorkChapter data={droneData}>
          <AerialZoom data={droneData} />
        </WorkChapter>

        {/* Final: All Work Gallery Grid */}
        <AllWorkGallery />

        <Footer />
      </main>
    </>
  );
}
