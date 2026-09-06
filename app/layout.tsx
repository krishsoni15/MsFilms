import type { Metadata } from "next";
import { Inter, Instrument_Serif, Playfair_Display, Pinyon_Script } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import GradualBlur from "@/components/ui/GradualBlur";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { PaletteSwitcher } from "@/components/palette-switcher";

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
  metadataBase: new URL("https://msfilms.ca"),
  title: {
    default: "MS Films | Canada-Wide Wedding Photography & Films | Based in Saskatoon",
    template: "%s | MS Films",
  },
  description:
    "MS Films is a professional media team based in Saskatoon, SK, crafting candid, luxury love stories, editorial portraits, and cinematic drone films across all of Canada.",
  keywords: [
    "Saskatoon wedding photographer",
    "Saskatoon wedding videography",
    "wedding films Saskatchewan",
    "Canada wide wedding photographer",
    "drone photography Saskatoon",
    "portrait photographer Saskatoon",
    "luxury wedding photographer Canada",
    "MS Films",
    "candid wedding photography",
  ],
  authors: [{ name: "MS Films" }],
  creator: "MS Films",
  publisher: "MS Films",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MS Films | Canada-Wide Wedding Photography & Cinematic Films",
    description:
      "Timeless, editorial wedding photography and cinematic films captured with heart and precision across Saskatoon, Saskatchewan, and all across Canada.",
    url: "https://msfilms.ca",
    siteName: "MS Films",
    images: [
      {
        url: "/wedding/imgi_3_5.png",
        width: 1200,
        height: 630,
        alt: "Msfilms Wedding Photography & Films Saskatoon",
      },
    ],
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Msfilms | Wedding Photography & Cinematic Films Saskatoon",
    description:
      "Framing authentic emotions, unscripted love stories, and high-altitude drone cinema across Saskatchewan and Canada.",
    images: ["/wedding/imgi_3_5.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${playfairDisplay.variable} ${pinyonScript.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd />
      </head>
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
                var palette = localStorage.getItem('palette') || 'golden-brown';
                document.documentElement.setAttribute('data-palette', palette);
              } catch (e) {}
            `
          }}
        />
        <ThemeProvider>
          <ScrollProgress />
          <SmoothScroll />
          <PaletteSwitcher />
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

