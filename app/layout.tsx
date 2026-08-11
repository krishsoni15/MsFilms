import type { Metadata } from "next";
import { Inter, Instrument_Serif, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Msfilms | Wedding Photography & Films in Saskatoon",
  description: "Msfilms captures weddings, engagements, portraits, family moments and special events through timeless photography and cinematic films in Saskatoon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ScrollProgress />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
