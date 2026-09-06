"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Copy, Check } from "lucide-react";

export function Footer() {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(siteData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Framer Motion reveal variants for clean, organic fade-ins
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <footer className="bg-background text-foreground py-16 md:py-24 relative overflow-hidden w-full max-w-full border-t border-border">
      {/* Ambient background glow inside the footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-gold/[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-16"
        >
          {/* Column 1 - Brand Info & Booking Badge (5 Cols) */}
          <motion.div variants={itemVariants} className="md:col-span-5 flex flex-col items-start space-y-4">
            <Link href="#hero" className="inline-block">
              <Image
                src={siteData.logo}
                alt={siteData.name}
                width={180}
                height={54}
                className="h-10 sm:h-12 w-auto object-contain brightness-100 logo"
              />
            </Link>
            <p className="font-serif text-lg md:text-xl italic text-gold/80 font-light">
              Stories worth remembering.
            </p>
            <p className="font-sans text-xs text-foreground/60 max-w-sm leading-relaxed">
              Saskatoon-based luxury wedding &amp; architectural cinema available across Canada. Capturing meaningful stories with authentic emotion.
            </p>

            {/* Booking Status Badge */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-3.5 py-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[8.5px] tracking-[0.18em] uppercase text-gold font-sans font-semibold">
                  {siteData.bookingBadge}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Column 2 - Navigation & Exploration (3 Cols) */}
          <motion.div variants={itemVariants} className="md:col-span-3">
            <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/40 mb-5 font-sans font-semibold">
              Exploration
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { name: "Home", href: "#hero" },
                { name: "About Us", href: "#about" },
                { name: "Portfolio & Works", href: "#work" },
                { name: "Cinema Services", href: "#services" },
                { name: "Client Stories", href: "#testimonials" },
                { name: "Journal & Articles", href: "#blog" },
                { name: "Get In Touch", href: "#contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.15em] text-foreground/70 hover:text-gold transition-colors w-fit font-sans font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3 - Direct Contact & Social Channels (4 Cols) */}
          <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col space-y-3.5">
            <p className="text-[10px] tracking-[0.22em] uppercase text-foreground/40 mb-2 font-sans font-semibold">
              Direct Channels
            </p>

            {/* Instagram */}
            <a
              href={siteData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-border bg-background-alt/50 hover:border-gold/40 hover:bg-background-alt transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-[0.18em] text-foreground/40 block font-sans font-semibold">Instagram</span>
                  <span className="text-xs font-sans font-medium text-foreground/90 group-hover:text-gold transition-colors">@msfilms._</span>
                </div>
              </div>
              <span className="text-xs text-gold font-sans group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </a>

            {/* WhatsApp */}
            <a
              href={siteData.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-xl border border-border bg-background-alt/50 hover:border-gold/40 hover:bg-background-alt transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-gold group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 2.14.673 4.12 1.82 5.75L2 22l4.37-1.77C7.94 21.36 9.89 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.87 0-3.62-.51-5.12-1.41l-.37-.22-2.58 1.04 1.05-2.51-.24-.39A7.947 7.947 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                  </svg>
                </div>
                <div>
                  <span className="text-[8px] uppercase tracking-[0.18em] text-foreground/40 block font-sans font-semibold">WhatsApp</span>
                  <span className="text-xs font-sans font-medium text-foreground/90 group-hover:text-gold transition-colors">Instant Chat &amp; Inquiries</span>
                </div>
              </div>
              <span className="text-xs text-gold font-sans group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </a>

            {/* Email Copy */}
            <button
              onClick={copyEmail}
              className="flex items-center justify-between p-3 rounded-xl border border-border bg-background-alt/50 hover:border-gold/40 hover:bg-background-alt transition-all duration-300 group text-left cursor-pointer"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center text-gold shrink-0 group-hover:scale-105 transition-transform">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="overflow-hidden">
                  <span className="text-[8px] uppercase tracking-[0.18em] text-foreground/40 block font-sans font-semibold">Direct Email</span>
                  <span className="text-xs font-sans font-medium text-foreground/90 group-hover:text-gold transition-colors truncate block">
                    contactus.msfilms
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-gold font-sans font-medium shrink-0 ml-2">
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[9.5px] tracking-[0.18em] uppercase text-foreground/40 font-mono">
            {siteData.copyright}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[9.5px] tracking-[0.18em] uppercase text-foreground/40 font-mono">
              {siteData.locationShort}
            </span>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-full border border-gold/30 bg-gold/5 hover:border-gold hover:bg-gold/15 text-gold flex items-center justify-center transition-all duration-300 cursor-pointer shadow-md"
              title="Scroll to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
