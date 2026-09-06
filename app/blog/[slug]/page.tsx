import Metadata from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Calendar, Clock, ArrowLeft, ArrowRight, Share2, Tag, CheckCircle2 } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Article Not Found | MS Films",
    };
  }

  return {
    title: `${post.title} | MS Films Journal`,
    description: post.metaDescription,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      images: [{ url: post.heroImage }],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts excluding current post
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug);

  return (
    <>
      <Navigation isParentLoaded={true} />

      <main className="min-h-screen w-full relative bg-background text-foreground pt-28 pb-20 overflow-x-hidden">
        {/* Background ambient lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full bg-gold/5 blur-[160px] pointer-events-none" />

        <article className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase font-sans text-gold hover:underline"
            >
              <ArrowLeft size={14} />
              <span>Back to Journal</span>
            </Link>
          </div>

          {/* Article Header */}
          <header className="space-y-6 mb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-sans font-semibold text-gold bg-gold/10 border border-gold/30">
                {post.category}
              </span>
              <span className="text-foreground/30 text-xs">•</span>
              <div className="flex items-center gap-1.5 text-xs text-foreground/60 font-sans">
                <Clock size={13} className="text-gold/80" />
                <span>{post.readTime}</span>
              </div>
              <span className="text-foreground/30 text-xs">•</span>
              <div className="flex items-center gap-1.5 text-xs text-foreground/60 font-sans">
                <Calendar size={13} className="text-gold/80" />
                <span>{post.publishedAt}</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-foreground font-normal leading-[1.1] tracking-tight">
              {post.title}
            </h1>

            <p className="font-serif text-lg sm:text-xl text-foreground/75 italic leading-relaxed font-light">
              {post.subtitle}
            </p>

            {/* Author info & Share */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-gold/30 p-1 bg-gold/10 flex items-center justify-center font-serif text-gold font-bold text-xs">
                  MS
                </div>
                <div>
                  <h4 className="text-xs font-sans font-semibold text-foreground">
                    {post.author.name}
                  </h4>
                  <p className="text-[10px] tracking-wider uppercase font-sans text-gold/80">
                    {post.author.role}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Image */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/15 shadow-2xl mb-12 bg-neutral-950">
            <Image
              src={post.heroImage}
              alt={post.title}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
            />
            {post.imageCaption && (
              <div className="absolute bottom-0 inset-x-0 bg-black/75 backdrop-blur-md px-4 py-2 text-[11px] font-sans italic text-foreground/70 border-t border-white/10">
                {post.imageCaption}
              </div>
            )}
          </div>

          {/* Article Content Body */}
          <div className="space-y-10 text-foreground/85 font-sans leading-relaxed text-base sm:text-lg">
            {post.content.map((sec, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-display text-2xl sm:text-3xl text-foreground font-light tracking-wide pt-2 border-b border-white/10 pb-2">
                  {sec.heading}
                </h2>
                <p className="text-foreground/80 leading-relaxed font-light font-sans text-sm sm:text-base">
                  {sec.paragraph}
                </p>

                {/* Highlight Pull-Quote */}
                {sec.quote && (
                  <blockquote className="my-6 p-6 rounded-xl border-l-4 border-gold bg-gold/5 backdrop-blur-sm italic font-serif text-lg sm:text-xl text-gold/90 leading-relaxed">
                    &ldquo;{sec.quote}&rdquo;
                  </blockquote>
                )}

                {/* Section Image */}
                {sec.image && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 my-6">
                    <Image
                      src={sec.image}
                      alt={sec.heading}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 900px"
                    />
                  </div>
                )}

                {/* Section List */}
                {sec.list && (
                  <ul className="space-y-2 my-4 pl-2">
                    {sec.list.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-foreground/80">
                        <CheckCircle2 size={16} className="text-gold shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Keyword Tags */}
          <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
            <Tag size={14} className="text-gold mr-2" />
            {post.keywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-[10px] font-sans font-medium text-foreground/60 bg-white/5 border border-white/10"
              >
                #{kw}
              </span>
            ))}
          </div>

          {/* Next / Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t border-white/10">
              <h3 className="font-display text-2xl text-foreground font-light uppercase tracking-wider mb-6">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-5 hover:border-gold/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-gold font-sans font-semibold block mb-2">
                        {rel.category}
                      </span>
                      <h4 className="font-display text-xl text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-2 mb-2">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-foreground/50 line-clamp-2 font-sans">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] uppercase font-sans font-semibold text-gold mt-4 group-hover:translate-x-1 transition-transform duration-300">
                      <span>Read Article</span>
                      <ArrowRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="mt-16 p-8 sm:p-12 rounded-2xl border border-gold/30 bg-gradient-to-b from-gold/10 to-transparent text-center space-y-4">
            <h3 className="font-display text-3xl text-foreground font-light">
              Ready to Capture Your Story?
            </h3>
            <p className="font-serif italic text-sm text-foreground/75 max-w-md mx-auto">
              Book your wedding date or luxury real estate film with MS Films today.
            </p>
            <div className="pt-2 flex justify-center">
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
                  href="/contact"
                  className="px-7 py-3 rounded-full bg-gold text-neutral-950 text-[11px] tracking-[0.2em] uppercase font-sans font-bold hover:bg-gold/90 transition-all duration-300 shadow-lg block"
                >
                  Inquire Now
                </Link>
              </BorderGlow>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
