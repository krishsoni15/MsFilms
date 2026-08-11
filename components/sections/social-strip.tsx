"use client";

import Image from "next/image";
import { socialImages, siteData } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";

export function SocialStrip() {
  // Double images for seamless infinite loop
  const doubledImages = [...socialImages, ...socialImages];

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="px-5 md:px-10 lg:px-16 mb-10">
        <AnimatedText as="div" className="flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-4">A Little More of Our World</p>
          </div>
          <a
            href={siteData.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] tracking-[0.2em] uppercase text-foreground/40 hover:text-gold transition-colors editorial-link editorial-link-gold"
          >
            Instagram →
          </a>
        </AnimatedText>
      </div>

      {/* Infinite horizontal marquee */}
      <div className="relative" data-cursor="drag">
        <div className="marquee-track">
          {doubledImages.map((src, i) => (
            <div
              key={i}
              className="relative flex-shrink-0 w-[calc(100vw/3)] md:w-[calc(100vw/5)] lg:w-[calc(100vw/8)] aspect-square overflow-hidden group cursor-grab"
            >
              <Image
                src={src}
                alt={`Photography by Msfilms ${(i % socialImages.length) + 1}`}
                fill
                className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-75"
                sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 12.5vw"
              />
              {/* Hover overlay icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
