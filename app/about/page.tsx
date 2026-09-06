import type { Metadata } from "next";
import { AboutClient } from "./about-client";

export const metadata: Metadata = {
  title: "About Us | MS Films — Canada-Wide Media Team",
  description:
    "Discover the story behind MS Films — a Saskatoon-based professional media team dedicated to authentic emotions, editorial art direction, and cinematic storytelling across Canada.",
  keywords: [
    "About MS Films",
    "Saskatoon wedding photographer",
    "Canada videographer",
    "editorial wedding photography",
    "drone photographer Saskatoon",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About MS Films | Photography & Cinematic Films | Saskatoon & Canada Wide",
    description:
      "Crafting timeless visual narratives through editorial photography and cinematic filmmaking across Saskatchewan and all of Canada.",
    url: "https://msfilms.ca/about",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
