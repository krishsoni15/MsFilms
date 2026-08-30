import type { Metadata } from "next";
import { Inter, Instrument_Serif, Playfair_Display, Pinyon_Script } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import GradualBlur from "@/components/ui/GradualBlur";
import { ThemeProvider } from "@/components/theme-provider";

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

const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Msfilms | Wedding Photography & Films in Saskatoon",
  description: "Msfilms captures weddings, engagements, portraits, family moments and special events through timeless photography and cinematic films in Saskatoon.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${playfairDisplay.variable} ${pinyonScript.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans" suppressHydrationWarning>
        <Script
          id="theme-initializer"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var saved = localStorage.getItem('theme');
                var theme = saved;
                if (!theme) {
                  var mql = window.matchMedia('(prefers-color-scheme: light)');
                  theme = mql.matches ? 'light' : 'dark';
                }
                if (theme === 'light') {
                  document.documentElement.classList.add('light');
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
            `
          }}
        />
        <ThemeProvider>
          <ScrollProgress />
          <SmoothScroll />
          {children}
          <GradualBlur
            target="page"
            position="bottom"
            height="1.6rem"
            strength={3}
            divCount={6}
            curve="bezier"
            exponential={true}
            opacity={1}
            zIndex={90}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

