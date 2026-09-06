export interface BlogPost {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  heroImage: string;
  imageCaption: string;
  metaDescription: string;
  keywords: string[];
  content: {
    heading: string;
    paragraph: string;
    quote?: string;
    image?: string;
    list?: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "art-of-wedding-cinematography",
    title: "The Art of Wedding Cinematography: How We Capture Unscripted Emotion across Saskatchewan",
    subtitle: "Discover how our studio blends documentary storytelling with fine art aesthetics to craft timeless, emotional wedding films.",
    excerpt: "Behind every frame of a wedding film is a unspoken glance, a tear, and a story waiting to be told with timeless cinematic grace.",
    category: "Wedding Cinema",
    readTime: "6 min read",
    publishedAt: "September 4, 2025",
    author: {
      name: "MS Films Studio",
      role: "Lead Cinematographers",
      avatar: "/logo/logo.png",
    },
    heroImage: "/wedding/bg1.png",
    imageCaption: "Sunset golden hour vows captured on location in Saskatchewan.",
    metaDescription: "Learn how MS Films crafts emotional 4K wedding cinema across Saskatchewan with fine art framing, sound design, and unscripted storytelling.",
    keywords: [
      "Wedding Cinematography",
      "Saskatchewan Wedding Videographer",
      "Saskatoon Wedding Films",
      "Unscripted Storytelling",
      "Luxury Wedding Cinema"
    ],
    content: [
      {
        heading: "Beyond Standard Videography",
        paragraph: "When we step onto the grounds of a wedding, our objective isn't merely to document events in chronological order. Standard wedding videos capture what happened; wedding cinema captures how it felt. By merging fine-art composition with authentic documentary observation, we create films that resonate across generations.",
        quote: "We don't pose moments—we preserve authentic emotions as they unfold in golden natural light.",
      },
      {
        heading: "The Soul of Audio & Soundscape",
        paragraph: "Visuals draw the eye, but audio touches the heart. A whispered vow, a tremble in a speech, the rustle of a gown against prairie grass—these acoustic details elevate a video into cinema. We utilize multi-channel high-fidelity recorders to capture vows with crystal-clear clarity while preserving ambient natural soundscapes.",
        image: "/wedding/1_1.png",
      },
      {
        heading: "Saskatchewan's Prairie Golden Hour",
        paragraph: "The Saskatchewan sky is legendary for its open horizons and rich sunset hues. We design our filming schedules around the golden hour—that 45-minute window right before dusk when light turns into molten gold. This natural soft box brings a painterly tone to couples' portraits.",
        list: [
          "Plan sunset couple portraits 30 minutes before official dusk",
          "Embrace natural wind and unscripted movement for dynamic framing",
          "Keep audio gear lightweight for discreet candlelit speeches",
        ],
      },
      {
        heading: "Crafting Your Heirloom Film",
        paragraph: "Every film undergoes bespoke color grading and custom sound mixing in our studio. From the selection of licensing acoustic scores to subtle film grain textures, your final wedding film is delivered as a 4K digital heirloom ready to share across the world.",
      },
    ],
  },
  {
    slug: "elevating-luxury-real-estate-with-4k-drone-cinema",
    title: "Elevating Luxury Real Estate: Why 4K Architectural Cinema & Drone Films Sell Properties Faster",
    subtitle: "How high-end real estate walkthroughs and FPV drone cinematography transform property listings into captivating visual tours.",
    excerpt: "Static photography shows a property's size, but fluid architectural video cinema communicates its lifestyle, elegance, and soul.",
    category: "Real Estate & Drone",
    readTime: "5 min read",
    publishedAt: "August 28, 2025",
    author: {
      name: "MS Films Studio",
      role: "Architectural & Aerial Specialists",
      avatar: "/logo/logo.png",
    },
    heroImage: "/real-estate/img_1.jpg",
    imageCaption: "Architectural dusk cinema tour of a luxury residence in Greenbryre Estates.",
    metaDescription: "Explore how 4K real estate walkthroughs and aerial drone films elevate luxury property listings in Saskatoon & Western Canada.",
    keywords: [
      "Real Estate Videography",
      "Saskatoon Real Estate Cinema",
      "Aerial Drone Video",
      "Property Walkthroughs",
      "Greenbryre Estates"
    ],
    content: [
      {
        heading: "The Shift in Modern Real Estate Marketing",
        paragraph: "Luxury homebuyers today expect an immersive cinematic preview before scheduling a private showing. High-definition video walkthroughs combined with sweeping 4K aerial drone perspectives allow prospective buyers to experience the flow, natural light, and lifestyle of an estate remotely.",
        quote: "Video cinema bridges the gap between seeing a house and imagining living in a home.",
      },
      {
        heading: "Aerial Drone Perspectives: Context & Scale",
        paragraph: "A grand residence is defined not just by its walls, but by its surroundings—sprawling golf courses, riverbanks, and private acreage. Our FAA/Transport Canada certified drone pilots capture smooth flyover sweeps that showcase property boundaries and neighborhood amenities in stunning 4K detail.",
        image: "/drone/imgi_10_3.jpg",
      },
      {
        heading: "Lighting, Speed & Smooth Camera Motion",
        paragraph: "To create an inviting walkthrough, we utilize motorized gimbals and wide-angle cinema lenses calibrated for zero optical distortion. We schedule shoots around twilight or mid-morning light to capture interior warmth alongside exterior sunset brilliance.",
        list: [
          "Gimbal-stabilized walkthroughs matching human walking speed",
          "Dusk & golden hour exterior lighting for maximum curb appeal",
          "Coordinated interior lighting sweeps showcasing custom millwork and stonework",
        ],
      },
      {
        heading: "Measurable Impact for Listing Agents",
        paragraph: "Listings featuring high-end video cinema consistently generate 400% more inquiries and attract out-of-province buyers seeking turnkey luxury properties. Investing in cinematic presentation positions both the property and the listing agent at the forefront of the market.",
      },
    ],
  },
];
