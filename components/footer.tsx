"use client";

import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/lib/data";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const textX = useTransform(scrollYProgress, [0, 1], ["5%", "0%"]);

  return (
    <footer ref={ref} className="bg-[#03111d] text-foreground py-20 md:py-32 overflow-hidden w-full max-w-full">
      {/* Large Display Text — contained within viewport */}
      <div className="w-full overflow-hidden mb-12 md:mb-20 px-4 sm:px-6 md:px-10 lg:px-16">
        <motion.div
          style={{ x: textX }}
          className="w-full"
        >
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tighter uppercase text-foreground/10 select-none whitespace-nowrap">
            LET&apos;S CREATE
          </h2>
        </motion.div>
      </div>

      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src={siteData.logo}
            alt={siteData.name}
            width={240}
            height={70}
            className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain brightness-100"
          />
        </div>
        <p className="font-serif text-lg md:text-xl italic text-foreground/50 mb-16 md:mb-24">
          Stories worth remembering.
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20 md:mb-28">
          {/* Column 1 - Location */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">Location</p>
            <p className="text-sm text-foreground/70 uppercase tracking-wider">{siteData.locationShort}</p>
          </div>

          {/* Column 2 - Navigation */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">Navigation</p>
            <div className="flex flex-col gap-2">
              {["Work", "Films", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-foreground/70 uppercase tracking-wider hover:text-gold transition-colors w-fit group flex items-center gap-2"
                >
                  {item}
                  <span className="inline-block w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" />
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3 - Connect */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-4">Connect</p>
            <div className="flex flex-col gap-2">
              <a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/70 uppercase tracking-wider hover:text-gold transition-colors w-fit group flex items-center gap-2"
              >
                Instagram
                <span className="inline-block w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" />
              </a>
              <a
                href={`mailto:${siteData.email}`}
                className="text-sm text-foreground/70 uppercase tracking-wider hover:text-gold transition-colors w-fit group flex items-center gap-2"
              >
                Email
                <span className="inline-block w-0 h-px bg-gold group-hover:w-4 transition-all duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/25">
            {siteData.copyright}
          </p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-foreground/25">
            {siteData.locationShort}
          </p>
        </div>
      </div>
    </footer>
  );
}
