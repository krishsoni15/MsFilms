import Script from "next/script";

export function JsonLd() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Photographer"],
    "@id": "https://msfilms.ca/#organization",
    name: "MS Films",
    legalName: "MS Films Photography & Videography",
    url: "https://msfilms.ca",
    logo: "https://msfilms.ca/logo/logo.png",
    image: "https://msfilms.ca/wedding/imgi_3_5.png",
    description:
      "MS Films is a premier Saskatoon-based professional media team, capturing timeless love stories, portraits, and high-altitude drone films across Saskatchewan and all of Canada.",
    email: "contactus.msfilms@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Saskatoon",
      addressRegion: "SK",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 52.1332,
      longitude: -106.67,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Saskatoon",
      },
      {
        "@type": "AdministrativeArea",
        name: "Regina",
      },
      {
        "@type": "AdministrativeArea",
        name: "Saskatchewan",
      },
      {
        "@type": "Country",
        name: "Canada",
      },
    ],
    priceRange: "$$$",
    sameAs: [
      "https://www.instagram.com/msfilms._/",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photography & Filmmaking Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Photography & Cinematic Films",
            description: "Full-day wedding photography, 4K documentary films, and drone coverage in Saskatoon and across Canada.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Aerial Dronography",
            description: "Licensed high-altitude drone videography and venue landscape photography.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Portrait & Engagement Photography",
            description: "Artistic portrait and engagement lifestyle sessions in indoor and outdoor natural light settings.",
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What makes Msfilms' wedding photography and films unique?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We combine editorial art direction with authentic candid storytelling. Rather than stiff posing, we frame real emotions, unscripted moments, and cinematic light so your memories feel timeless.",
        },
      },
      {
        "@type": "Question",
        name: "Do you travel outside Saskatoon for wedding photography and videography?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! While we are based in Saskatoon, Saskatchewan, we travel across Canada including Banff, Calgary, Toronto, and destination celebrations worldwide.",
        },
      },
      {
        "@type": "Question",
        name: "Is aerial drone footage included in your wedding film packages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, licensed aerial dronography is integrated into our cinematic films whenever weather and venue air restrictions safely permit.",
        },
      },
      {
        "@type": "Question",
        name: "How early should we book our wedding photographer and videographer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We recommend reserving your date 6 to 12 months in advance, especially for popular summer and autumn wedding weekends in Saskatchewan.",
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="json-ld-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <Script
        id="json-ld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
