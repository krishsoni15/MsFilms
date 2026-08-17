// ─────────────────────────────────────────────────
// MSFILMS — Centralized Data Architecture
// Real studio photography & film assets.
// Every image URL is 100% unique — zero duplicates.
// ─────────────────────────────────────────────────

export const siteData = {
  name: "Msfilms",
  logo: "/logo/logo.png",
  location: "Saskatoon, Saskatchewan",
  locationShort: "Saskatoon · Canada",
  email: "contactus.msfilms@gmail.com",
  social: {
    instagram: "https://instagram.com",
  },
  booking: "2026 — 2027",
  bookingBadge: "Now Booking 2026 – 2027",
  aboutHeadline: "About Us",
  aboutText: "Msfilms is a Saskatoon-based company that specializes in capturing precious memories of special events like weddings, family functions and more. The team at Msfilms has a keen eye for detail and a deep understanding of the technical aspects of photography and videography. They strive to produce high-quality and visually stunning images and videos that will be cherished by clients for years to come. Their commitment to their craft and client satisfaction makes Msfilms a valuable asset in photography and videography.",
  contactHeadline: "Contact Us",
  contactText: "We at Msfilms, take pride in offering our valued clients the utmost in professional photography services. To ensure that we are able to provide you with the best possible service, we kindly request that you provide us with detailed information about your upcoming event by filling out the form. This will allow us to fully understand your requirements and tailor our services to meet your specific needs. Once we have received your information, we will get back to you as soon as possible with a personalized quote and any additional information that you may require. We appreciate your interest in our services and look forward to working with you to capture the memories of your special event.",
  copyright: "Copyright ©2026 | All rights reserved by Msfilms",
};

// ─────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────
export const heroData = {
  eyebrow: "SASKATOON · CANADA",
  headline: "Stories worth\nremembering.",
  subheadline: "Photography + films for life's meaningful moments.",
  videoPoster: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
  videoSrc: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-under-veil-40019-large.mp4" as string | null,
  tickerItems: [
    "Drone Photography",
    "Telling Stories",
    "Wedding Photography & Videography",
    "Capturing Special Family Moments",
    "Dronography",
    "Telling Stories",
  ],
};

// ─────────────────────────────────────────────────
// CINEMATIC QUOTE
// ─────────────────────────────────────────────────
export const cinematicQuote = "Every love story is beautiful, but yours is my favorite.";

// ─────────────────────────────────────────────────
// PORTFOLIO PROJECTS (Wedding, Landscape, Drone)
// ─────────────────────────────────────────────────
export const projects = [
  {
    slug: "wedding",
    title: "Wedding Photography & Films",
    subtitle: "Timeless Celebrations of Love",
    category: "Wedding",
    location: "Saskatoon",
    year: "2026",
    cover: "/wedding/imgi_3_5.png",
    images: [
      "/wedding/imgi_7_3.jpg",
      "/wedding/imgi_6_4.jpg",
      "/wedding/imgi_4_7 (1).jpg",
      "/wedding/imgi_8_6.jpg",
    ],
    description: "Capturing precious memories of special events like weddings, ceremonies, and intimate moments with a keen eye for technical and emotional detail.",
  },
  {
    slug: "landscape",
    title: "Landscape Scenery & Fine Art",
    subtitle: "Natural Horizon Studies",
    category: "Landscape",
    location: "Saskatchewan & Banff",
    year: "2026",
    cover: "/landscape/imgi_2_1 (1).jpg",
    images: [
      "/landscape/imgi_8_8.jpg",
      "/landscape/imgi_7_4.jpg",
      "/landscape/imgi_5_10 (1).jpg",
      "/landscape/imgi_10_6.jpg",
      "/landscape/imgi_4_7 (2).jpg",
      "/landscape/imgi_6_2 (1).jpg",
    ],
    description: "Visually stunning panoramic landscape photography capturing sweeping natural horizons and natural ambient light.",
  },
  {
    slug: "drone",
    title: "High-Altitude Dronography",
    subtitle: "Elevated Horizons & Venues",
    category: "Drone",
    location: "Saskatoon",
    year: "2026",
    cover: "/drone/imgi_11_6.jpg",
    images: [
      "/drone/imgi_10_3.jpg",
      "/drone/imgi_2_1.jpg",
      "/drone/imgi_12_9.jpg",
      "/drone/imgi_13_12.jpg",
      "/drone/imgi_7_5.jpg",
    ],
    description: "High-quality aerial dronography producing cinematic perspectives of land, venues, and outdoor celebrations.",
  },
];

// ─────────────────────────────────────────────────
// FILMS
// ─────────────────────────────────────────────────
export const films = [
  {
    id: "film-01",
    title: "Wedding Cinema",
    subtitle: "A Wedding Film",
    category: "Wedding Film",
    location: "Saskatoon",
    year: "2026",
    poster: "/wedding/imgi_6_4.jpg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-bride-and-groom-posing-in-a-forest-40017-large.mp4" as string | null,
  },
  {
    id: "film-02",
    title: "Drone Horizons",
    subtitle: "Cinematic Aerial Film",
    category: "Highlight Film",
    location: "Saskatoon",
    year: "2026",
    poster: "/drone/imgi_3_4.jpg",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-wedding-couple-under-veil-40019-large.mp4" as string | null,
  },
];

// ─────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────
export const services = [
  {
    id: "01",
    title: "Wedding Photography",
    image: "/wedding/imgi_7_3.jpg",
  },
  {
    id: "02",
    title: "Wedding Videography",
    image: "/wedding/imgi_4_7 (1).jpg",
  },
  {
    id: "03",
    title: "Engagement",
    image: "/landscape/imgi_6_2 (1).jpg",
  },
  {
    id: "04",
    title: "Portrait Photography",
    image: "/landscape/imgi_9_3.jpg",
  },
  {
    id: "05",
    title: "Family Photography Sessions",
    image: "/landscape/imgi_10_6.jpg",
  },
  {
    id: "06",
    title: "Dronography",
    image: "/drone/imgi_4_7.jpg",
  },
];

// ─────────────────────────────────────────────────
// SOCIAL STRIP
// ─────────────────────────────────────────────────
export const socialImages = [
  "/wedding/imgi_2_2.png",
  "/drone/imgi_11_6.jpg",
  "/landscape/imgi_2_1 (1).jpg",
  "/wedding/imgi_6_4.jpg",
  "/drone/imgi_10_3.jpg",
  "/landscape/imgi_8_9.jpg",
  "/wedding/imgi_7_3.jpg",
  "/drone/imgi_5_10.jpg",
];

// ─────────────────────────────────────────────────
// STANDALONE SECTION IMAGES
// ─────────────────────────────────────────────────
export const cinematicBreakImage = "/drone/imgi_6_2.jpg";
export const visualIntroImage = "/wedding/imgi_2_2.png";
export const aboutImage = "/me/imgi_36_625043456_18087932393515848_4263036374454868947_n.jpg";
export const aboutSecondaryImage = "/me/imgi_85_622505371_18140539135468400_2765037163092247242_n.jpg";
