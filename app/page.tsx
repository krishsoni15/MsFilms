"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { FeaturedWork } from "@/components/sections/featured-work";
import { CinematicBreak } from "@/components/sections/cinematic-break";
import { Films } from "@/components/sections/films";
import { Services } from "@/components/sections/services";
import { AboutStudio } from "@/components/sections/about";
import { AboutPhotographer } from "@/components/sections/photographer";
import { Philosophy } from "@/components/sections/philosophy";
import { Testimonials } from "@/components/sections/testimonials";
import { SocialStrip } from "@/components/sections/social-strip";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden w-full max-w-full">
        <Hero />
        <AboutStudio />
        <AboutPhotographer />
        <Philosophy />
        <FeaturedWork />
        <CinematicBreak />
        <Films />
        <Services />
        <Testimonials />
        <SocialStrip />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
