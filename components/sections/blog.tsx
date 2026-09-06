"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { BLOG_POSTS } from "@/lib/blog-data";
import { Clock, ArrowRight, BookOpen } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

export function Blog() {
  return (
    <section
      id="blog"
      className="py-12 md:py-16 px-4 md:px-8 lg:px-12 bg-background border-t border-border/40 overflow-hidden relative"
    >
      {/* Background ambient gold lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500/5 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-9 md:mb-11">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 mb-3">
            <BookOpen size={12} className="text-gold animate-pulse" />
            <AnimatedText
              as="p"
              className="text-[9px] tracking-[0.25em] uppercase text-gold font-semibold"
            >
              Journal &amp; Insights
            </AnimatedText>
          </div>

          <ScrollReveal
            baseOpacity={0.05}
            enableBlur={true}
            baseRotation={2}
            blurStrength={8}
            textClassName="font-display text-2xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-foreground mb-3"
            rotationEnd="bottom center+=20%"
            wordAnimationEnd="bottom center+=45%"
          >
            Behind the Lens.
          </ScrollReveal>

          <p className="font-sans text-xs md:text-sm text-foreground/60 leading-relaxed font-light max-w-lg mx-auto">
            Stories from the field, creative process breakdowns, and equipment insights — crafted with the same care we bring to every frame.
          </p>
        </div>

        {/* 2 Featured Blog Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative rounded-xl border border-gold/20 hover:border-gold/60 bg-background-alt overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_12px_35px_-10px_rgba(197,168,128,0.2)] hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Image Thumbnail Container */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-background-alt-2">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                {/* Dual Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-background-alt via-background/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-75" />

                {/* Top Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-0.5 rounded-full text-[8.5px] tracking-[0.18em] uppercase font-sans font-semibold text-gold bg-black/75 backdrop-blur-md border border-gold/30 shadow-md">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8.5px] tracking-[0.12em] font-sans text-white/80 bg-black/75 backdrop-blur-md border border-white/15 shadow-md">
                    <Clock size={10} className="text-gold" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Corner Accent Line */}
                <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
              </div>

              {/* Card Text Content */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[0.16em] uppercase font-sans text-gold/80 font-medium">
                      ISSUE 0{idx + 1} &bull; {post.publishedAt}
                    </span>
                    <span className="text-[9px] tracking-[0.12em] uppercase font-sans text-foreground/40">
                      MS FILMS
                    </span>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl text-foreground font-light group-hover:text-gold transition-colors duration-300 leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="font-serif italic text-xs text-foreground/65 leading-relaxed line-clamp-2 font-light">
                    &ldquo;{post.excerpt}&rdquo;
                  </p>
                </div>

                {/* Card Action Link */}
                <div className="pt-3.5 border-t border-gold/15 flex items-center justify-between text-[9.5px] tracking-[0.2em] uppercase font-sans font-semibold text-gold group-hover:text-white transition-colors duration-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    Read Article
                  </span>
                  <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300 text-gold" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Journal CTA */}
        <div className="mt-9 md:mt-11 text-center">
          <BorderGlow
            edgeSensitivity={20}
            glowColor="35 85 75"
            backgroundColor="transparent"
            borderRadius={9999}
            glowRadius={30}
            glowIntensity={0.4}
            animated={true}
            colors={["#ffffff", "#cba358", "#ffffff"]}
            fillOpacity={0}
            style={{ borderColor: "transparent" }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white/5 border border-gold/30 hover:border-gold text-gold hover:text-white text-[10.5px] tracking-[0.22em] uppercase font-sans font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <span>Explore All Articles</span>
              <ArrowRight size={13} />
            </Link>
          </BorderGlow>
        </div>
      </div>
    </section>
  );
}
