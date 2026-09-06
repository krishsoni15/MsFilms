import type { Metadata } from "next";
import Script from "next/script";
import { BlogClient } from "./blog-client";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "Journal & Insights | MS Films — Canada-Wide Media Team",
  description:
    "Explore photography articles, wedding guides, drone videography tips, and behind-the-scenes stories from MS Films in Saskatoon, Saskatchewan and across Canada.",
  keywords: [
    "Saskatoon wedding blog",
    "wedding photography guide Saskatchewan",
    "drone videography tips",
    "wedding planning Canada",
    "MS Films journal",
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Journal & Insights | MS Films",
    description:
      "Behind-the-scenes stories, equipment breakdowns, and expert wedding photography planning guides from MS Films.",
    url: "https://msfilms.ca/blog",
  },
};

export default function BlogPage() {
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://msfilms.ca/blog/#blog",
    name: "MS Films Journal",
    description: "Insights, guides, and behind-the-scenes stories from MS Films.",
    url: "https://msfilms.ca/blog",
    publisher: {
      "@type": "Organization",
      name: "MS Films",
      logo: "https://msfilms.ca/logo/logo.png",
    },
    blogPost: BLOG_POSTS.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      url: `https://msfilms.ca/blog/${post.slug}`,
      datePublished: post.publishedAt,
      image: `https://msfilms.ca${post.heroImage}`,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };

  return (
    <>
      <Script
        id="json-ld-blog-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogListSchema),
        }}
      />
      <BlogClient />
    </>
  );
}
