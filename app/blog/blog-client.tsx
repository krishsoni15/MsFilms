"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BLOG_POSTS, BlogPost } from "@/lib/blog-data";
import { Clock, ArrowRight, Search, Sparkles, Filter, X } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

const CATEGORIES = [
  "All",
  "Wedding Cinema",
  "Real Estate & Drone",
  "Wedding Guides",
  "Behind The Lens",
];

export function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter blog posts based on category and search query
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS[0];

  return (
    <>
      <Navigation isParentLoaded={true} />

      <main className="min-h-screen w-full relative bg-background flex flex-col justify-between overflow-x-hidden pt-28">
        {/* Ambient glow backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gold/5 blur-[150px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex-grow pb-24">
          {/* Hero Header */}
          <section className="relative z-10 text-center px-6 pt-12 pb-10 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 mb-4 shadow-sm"
            >
              <Sparkles size={13} className="text-gold animate-pulse" />
              <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold font-bold">
                Journal & Insights
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl text-foreground font-normal uppercase tracking-tight mb-4"
            >
              Stories &amp; Guides
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-xs sm:text-sm text-foreground/70 max-w-xl mx-auto leading-relaxed"
            >
              Behind-the-scenes stories, wedding day planning tips, drone filmmaking insights, and editorial visual advice from our creative team.
            </motion.p>

            {/* Live Search & Filter Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-3"
            >
              {/* Search Input Box */}
              <div className="relative w-full">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40" />
                <input
                  type="text"
                  placeholder="Search articles, guides, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-full bg-background-alt border border-foreground/15 text-foreground placeholder:text-foreground/40 font-sans text-xs focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/30 transition-all shadow-md"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-foreground/40 hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Category Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2"
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-sans text-[10px] tracking-[0.15em] uppercase transition-all duration-300 ${
                      isActive
                        ? "bg-gold text-black font-bold shadow-md shadow-gold/20 scale-105"
                        : "bg-foreground/5 hover:bg-foreground/10 text-foreground/70 border border-foreground/10"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </motion.div>
          </section>

          {/* Main Articles Container */}
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            {/* Featured Article Section (shown when no search filter active and 'All' category selected) */}
            {selectedCategory === "All" && searchQuery === "" && featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-14"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-gold animate-ping" />
                  <span className="text-[10px] tracking-[0.25em] font-sans font-bold text-gold uppercase">
                    Featured Edition
                  </span>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group relative rounded-2xl border border-gold/30 hover:border-gold/70 bg-background-alt overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(197,168,128,0.25)] grid grid-cols-1 lg:grid-cols-12 items-center"
                >
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-[16/11] w-full overflow-hidden">
                    <Image
                      src={featuredPost.heroImage}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background-alt via-background-alt/40 to-transparent opacity-90" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] tracking-[0.2em] uppercase font-sans font-bold text-gold bg-black/80 backdrop-blur-md border border-gold/40 shadow-lg">
                      {featuredPost.category}
                    </span>
                  </div>

                  <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-5">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] font-sans text-gold/90 font-medium">
                        <Clock size={12} />
                        <span>{featuredPost.readTime}</span>
                        <span>&bull;</span>
                        <span>{featuredPost.publishedAt}</span>
                      </div>

                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-foreground font-normal group-hover:text-gold transition-colors duration-300 leading-snug">
                        {featuredPost.title}
                      </h2>

                      <p className="font-sans text-xs sm:text-sm text-foreground/70 leading-relaxed font-light line-clamp-3">
                        {featuredPost.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-foreground/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-[10px] font-bold text-gold border border-gold/30">
                          MS
                        </div>
                        <span className="text-[10px] tracking-wider uppercase font-sans font-medium text-foreground/80">
                          {featuredPost.author.name}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase font-sans font-bold text-gold group-hover:text-white transition-colors duration-300">
                        Read Story <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group relative rounded-xl border border-foreground/15 hover:border-gold/60 bg-background-alt overflow-hidden shadow-xl transition-all duration-500 hover:shadow-[0_12px_35px_-10px_rgba(197,168,128,0.2)] hover:-translate-y-1 flex flex-col justify-between h-full"
                    >
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-background-alt">
                        <Image
                          src={post.heroImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-108"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-alt via-background/20 to-transparent opacity-85" />
                        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                          <span className="px-2.5 py-0.5 rounded-full text-[8.5px] tracking-[0.18em] uppercase font-sans font-semibold text-gold bg-black/75 backdrop-blur-md border border-gold/30">
                            {post.category}
                          </span>
                          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8.5px] tracking-[0.12em] font-sans text-white/80 bg-black/75 backdrop-blur-md border border-white/15">
                            <Clock size={10} className="text-gold" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
                        <div className="space-y-2">
                          <span className="text-[9px] tracking-[0.16em] uppercase font-sans text-gold/80 font-medium">
                            {post.publishedAt}
                          </span>
                          <h3 className="font-serif text-lg text-foreground font-normal group-hover:text-gold transition-colors duration-300 leading-snug line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="font-sans text-xs text-foreground/60 leading-relaxed line-clamp-2 font-light">
                            {post.subtitle}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-foreground/10 flex items-center justify-between text-[9.5px] tracking-[0.2em] uppercase font-sans font-semibold text-gold group-hover:text-white transition-colors duration-300">
                          <span>Read Article</span>
                          <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300 text-gold" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-background-alt/50 rounded-2xl border border-foreground/10 max-w-md mx-auto my-10">
                <Filter className="mx-auto text-gold/40 mb-3" size={32} />
                <h3 className="font-serif text-xl text-foreground font-normal mb-2 uppercase">No Articles Found</h3>
                <p className="font-sans text-xs text-foreground/60 mb-6">
                  We couldn't find any articles matching your search "{searchQuery}". Try selecting another category or clearing your filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-full bg-gold text-black text-xs uppercase tracking-wider font-bold hover:bg-gold-light transition-colors shadow-md"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
