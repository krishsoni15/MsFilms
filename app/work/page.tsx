import type { Metadata } from "next";
import { WorkClient } from "./work-client";

export const metadata: Metadata = {
  title: "Portfolio & Cinematic Stories | Wedding Photography Saskatoon",
  description:
    "Explore Msfilms' portfolio of wedding stories, 4K cinematic films, portrait studies, and aerial dronography captured in Saskatoon and across Saskatchewan.",
  keywords: [
    "Wedding photography portfolio Saskatoon",
    "Saskatchewan wedding films",
    "cinematic videography Saskatoon",
    "drone photography gallery",
    "fine art portraits",
  ],
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Portfolio & Cinematic Stories | Msfilms Saskatoon",
    description:
      "A curated collection of cinematic films, wedding love stories, landscape highlights, and fine art memories.",
    url: "https://msfilms.ca/work",
  },
};

export default function WorkPage() {
  return <WorkClient />;
}
