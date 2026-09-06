import type { Metadata } from "next";
import { ContactClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact & Bookings | MS Films — Canada-Wide Media Team",
  description:
    "Get in touch with MS Films to inquire about wedding photography, cinematic films, and drone coverage in Saskatoon, Saskatchewan, and destination venues across all of Canada.",
  keywords: [
    "Book wedding photographer Saskatoon",
    "MS Films contact",
    "Saskatoon wedding inquiry",
    "Canada videography quote",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Inquiries | MS Films",
    description:
      "Share the details of your upcoming wedding or event, and we will craft a personalized proposal tailored to your vision across Canada.",
    url: "https://msfilms.ca/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
