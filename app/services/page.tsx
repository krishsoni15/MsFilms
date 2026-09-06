import type { Metadata } from "next";
import { ServicesClient } from "./services-client";

export const metadata: Metadata = {
  title: "Wedding Photography & Videography Services | MS Films — Canada Wide",
  description:
    "Explore MS Films' tailored production packages: wedding photography, 4K videography, aerial dronography, and portrait sessions in Saskatoon, Saskatchewan, and all across Canada.",
  keywords: [
    "Saskatoon wedding photography services",
    "wedding videography packages Saskatchewan",
    "drone photography pricing Saskatoon",
    "Canada wide wedding photography",
    "event photography Saskatoon",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Services & Production Offerings | MS Films",
    description:
      "Tailored wedding photography, 4K videography, aerial flight, and architectural media for high-end clients across Saskatchewan & all of Canada.",
    url: "https://msfilms.ca/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
