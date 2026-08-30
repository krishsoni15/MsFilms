// ────────────────────────────────────────────────────────────
// MSFILMS — Redesigned /work Page Cinematic Data Layer
// ────────────────────────────────────────────────────────────

export interface WorkImage {
  url: string;
  alt: string;
  orientation: "portrait" | "landscape" | "square";
  title?: string;
  aspectRatio?: string;
}

export interface WorkCategoryData {
  id: string;
  category: "weddings" | "events" | "realestate" | "drone";
  title: string;
  headline: string;
  description: string;
  number: string;
  featuredImage: WorkImage;
  images: WorkImage[];
  theme: {
    bg: string;      // Tailwind class for background (e.g., bg-[#020912])
    text: string;    // Tailwind class for typography (e.g., text-[#f4f1eb])
    accent: string;  // Hex color for elements/accents
  };
  metadata: {
    location: string;
    year: string;
    services: string[];
  };
}

export const workCategories: WorkCategoryData[] = [
  {
    id: "weddings",
    category: "weddings",
    title: "Weddings",
    headline: "THE MOMENTS BETWEEN THE MOMENTS.",
    description: "Honest, emotional, and timeless documentations of celebrations across Canada. We focus on the quiet glances, the unscripted laughs, and the raw atmosphere of your wedding day.",
    number: "01",
    featuredImage: {
      url: "/wedding/DSC00085.JPG",
      alt: "Intimate wedding couple sunset Saskatchewan",
      orientation: "landscape"
    },
    images: [
      {
        url: "/wedding/DSC00085.JPG",
        alt: "Intimate wedding couple sunset Saskatchewan",
        orientation: "landscape",
        title: "Sunset Serenade"
      },
      {
        url: "/wedding/imgi_7_3.jpg",
        alt: "Groom holding bride in a forest canopy",
        orientation: "portrait",
        title: "Forest Canopy"
      },
      {
        url: "/wedding/imgi_6_4.jpg",
        alt: "Bridal portrait close-up veil detailing",
        orientation: "landscape",
        title: "The Detail"
      },
      {
        url: "/wedding/8.jpg",
        alt: "Wedding reception couple exit smiles",
        orientation: "landscape",
        title: "The Exit"
      },
      {
        url: "/wedding/imgi_3_5.png",
        alt: "Emotional wedding ceremony exchange of vows",
        orientation: "portrait",
        title: "The Vow"
      },
      {
        url: "/wedding/1 (1).png",
        alt: "Bridal walk outdoors Saskatchewan sunset",
        orientation: "landscape",
        title: "Golden Walk"
      }
    ],
    theme: {
      bg: "bg-background", // Deep dark Navy
      text: "text-foreground",
      accent: "#c5a880"
    },
    metadata: {
      location: "Saskatoon & Banff",
      year: "2025 - 2026",
      services: ["Wedding Photography", "Cinematic Films", "Destination Shoots"]
    }
  },
  {
    id: "events",
    category: "events",
    title: "Events",
    headline: "EVERY ROOM HAS A STORY.",
    description: "Candid storytelling that preserves the atmosphere, energy, and human connections of local events, family celebrations, and commercial gatherings.",
    number: "02",
    featuredImage: {
      url: "/landscape/imgi_10_6.jpg",
      alt: "Outdoor sunset gathering with beautiful ambient lights",
      orientation: "landscape"
    },
    images: [
      {
        url: "/landscape/imgi_9_3.jpg",
        alt: "Portrait study in natural golden light",
        orientation: "portrait",
        title: "Character Study"
      },
      {
        url: "/landscape/imgi_10_6.jpg",
        alt: "Outdoor sunset gathering ambient light",
        orientation: "landscape",
        title: "Sunset Reunion"
      },
      {
        url: "/landscape/imgi_7_4.jpg",
        alt: "Scenic forest trail outdoor ceremony backdrop",
        orientation: "landscape",
        title: "Nature Gathering"
      },
      {
        url: "/wedding/imgi_8_6.jpg",
        alt: "Table dinner event detail lighting",
        orientation: "landscape",
        title: "Warm Details"
      },
      {
        url: "/me/imgi_85_622505371_18140539135468400_2765037163092247242_n.jpg",
        alt: "Candid conversation portrait events",
        orientation: "portrait",
        title: "Candid Conversation"
      },
      {
        url: "/landscape/imgi_6_2 (1).jpg",
        alt: "Outdoor sunset family event laughter",
        orientation: "landscape",
        title: "Shared Moments"
      },
      {
        url: "/wedding/imgi_2_2.png",
        alt: "Bridal party event setup close-up",
        orientation: "square",
        title: "Tableau"
      }
    ],
    theme: {
      bg: "bg-background-alt", // Obsidian Dark Gray
      text: "text-foreground",
      accent: "#e5d5be"
    },
    metadata: {
      location: "Saskatchewan & Alberta",
      year: "2025 - 2026",
      services: ["Event Photography", "Candid Portraits", "Brand Storytelling"]
    }
  },
  {
    id: "realestate",
    category: "realestate",
    title: "Real Estate",
    headline: "SPACE IN MOTION.",
    description: "Architectural photography and cinematic virtual tours for premium estates. We translate spaces, structures, and lighting into luxury visual experiences.",
    number: "03",
    featuredImage: {
      url: "/real-estate/L (1).jpg",
      alt: "Luxury estate exterior architecture dusk sky",
      orientation: "landscape"
    },
    images: [
      {
        url: "/real-estate/L (1).jpg",
        alt: "Luxury estate exterior architecture dusk sky",
        orientation: "landscape",
        title: "Dusk Silhouette"
      },
      {
        url: "/real-estate/L4 (6).jpg",
        alt: "Modern custom kitchen interior design wood accents",
        orientation: "landscape",
        title: "The Hearth"
      },
      {
        url: "/real-estate/img_1.jpg",
        alt: "Bright living area structure fireplace design",
        orientation: "landscape",
        title: "Living Room Geometry"
      },
      {
        url: "/real-estate/img_2.jpg",
        alt: "Minimal dining area design ambient natural light",
        orientation: "landscape",
        title: "Interior Light"
      },
      {
        url: "/real-estate/img_4.jpg",
        alt: "Premium residential estate entrance lighting",
        orientation: "landscape",
        title: "Welcome In"
      },
      {
        url: "/real-estate/img_6.jpg",
        alt: "Clean bathroom interior luxury marble tiling",
        orientation: "landscape",
        title: "Spatial Alignment"
      }
    ],
    theme: {
      bg: "bg-background-alt-2", // Deep Slate Black
      text: "text-foreground",
      accent: "#c5a880"
    },
    metadata: {
      location: "Saskatoon & Regina",
      year: "2025 - 2026",
      services: ["Architectural Photography", "Interior Styling Video", "Virtual Tours"]
    }
  },
  {
    id: "drone",
    category: "drone",
    title: "Drone",
    headline: "SEE IT FROM ABOVE.",
    description: "Cinematic high-altitude perspectives capturing the grandeur of landscapes, wedding venues, and vast natural horizons in 4K resolution.",
    number: "04",
    featuredImage: {
      url: "/drone/imgi_11_6.jpg",
      alt: "Vast lake and forest high-altitude aerial view",
      orientation: "landscape"
    },
    images: [
      {
        url: "/drone/imgi_11_6.jpg",
        alt: "Vast lake and forest high-altitude aerial view",
        orientation: "landscape",
        title: "Vast Horizon"
      },
      {
        url: "/drone/imgi_10_3.jpg",
        alt: "Scenic lake winding shoreline aerial view",
        orientation: "landscape",
        title: "Shoreline Drift"
      },
      {
        url: "/drone/imgi_12_9.jpg",
        alt: "Saskatchewan golden wheat fields geometric roads",
        orientation: "landscape",
        title: "Prairie Lines"
      },
      {
        url: "/drone/imgi_13_12.jpg",
        alt: "Dense green forest valley river stream overhead",
        orientation: "landscape",
        title: "Overhead Canopy"
      },
      {
        url: "/drone/imgi_7_5.jpg",
        alt: "Aerial sunset fields golden lighting",
        orientation: "landscape",
        title: "Golden Hour Flight"
      },
      {
        url: "/drone/imgi_2_1.jpg",
        alt: "Beautiful river bend high altitude winter frost",
        orientation: "landscape",
        title: "Frost Valley"
      }
    ],
    theme: {
      bg: "bg-background-alt", // Cold Midnight Blue
      text: "text-foreground",
      accent: "#e5d5be"
    },
    metadata: {
      location: "Canada Nationwide",
      year: "2025 - 2026",
      services: ["FAA-Certified Aerial Footage", "Venue Mapping", "Dynamic Video Follow"]
    }
  }
];

// All images flattened for the "Explore All Work" filterable gallery
export const allGalleryItems = workCategories.flatMap((cat) =>
  cat.images.map((img, i) => ({
    id: `${cat.id}-${i}`,
    category: cat.id,
    img: img.url,
    alt: img.alt,
    title: img.title || `${cat.title} Moment`,
    orientation: img.orientation,
    height: img.orientation === "portrait" ? 640 : img.orientation === "square" ? 540 : 440
  }))
);
