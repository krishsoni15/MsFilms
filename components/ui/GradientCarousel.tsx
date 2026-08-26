"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./GradientCarousel.css";

export interface GradientCarouselItem {
  id: string | number;
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  /** Colors used for the background gradient. E.g., ['#ff007f', '#7f00ff'] */
  gradientColors: string[];
}

export interface GradientCarouselProps {
  items: GradientCarouselItem[];
  className?: string;
}

export function GradientCarousel({ items, className = "" }: GradientCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Set up cloned items for infinite loop: [Set 1] [Set 2 (Middle)] [Set 3]
  const clonedItems = [...items, ...items, ...items];

  // Center the scroll track to the middle set of items on mount
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const timer = setTimeout(() => {
      const cards = container.getElementsByClassName("gradient-carousel-card-wrapper");
      if (cards.length > 0) {
        const firstMiddleCard = cards[items.length] as HTMLElement;
        const targetScroll = firstMiddleCard.offsetLeft - container.clientWidth / 2 + firstMiddleCard.clientWidth / 2;
        container.scrollLeft = targetScroll;
        setActiveIndex(0);
      }
    }, 120);

    return () => clearTimeout(timer);
  }, [items]);

  // Monitor scroll positioning to update active item based on center-proximity and loop infinitely
  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.getElementsByClassName("gradient-carousel-card-wrapper");
    if (cards.length === 0) return;

    // Measure single card spacing dynamically (width + left/right margins)
    const singleCardWidth = cards[0].clientWidth + 24; 
    const setWidth = items.length * singleCardWidth;
    const currentScroll = container.scrollLeft;

    // Instant loop boundaries shift to simulate infinite track
    if (currentScroll < setWidth - container.clientWidth / 2) {
      container.scrollLeft = currentScroll + setWidth;
      return;
    }
    if (currentScroll > setWidth * 2 - container.clientWidth / 2) {
      container.scrollLeft = currentScroll - setWidth;
      return;
    }

    // Determine centered active card
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    const mappedIndex = closestIndex % items.length;
    if (mappedIndex !== activeIndex) {
      setActiveIndex(mappedIndex);
    }
  };

  const scrollToCard = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = container.getElementsByClassName("gradient-carousel-card-wrapper");
    const targetClonedIndex = items.length + index;
    if (cards[targetClonedIndex]) {
      const card = cards[targetClonedIndex] as HTMLElement;
      const targetScroll = card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleNext = () => {
    scrollToCard((activeIndex + 1) % items.length);
  };

  const handlePrev = () => {
    scrollToCard((activeIndex - 1 + items.length) % items.length);
  };

  const activeItem = items[activeIndex] || items[0];

  return (
    <div className={`gradient-carousel-container ${className}`}>
      {/* Rich Dynamic Cross-Fading Background Gradient Layer */}
      <AnimatePresence initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${activeItem.gradientColors[0]} 0%, ${activeItem.gradientColors[1] || "#020912"} 80%)`,
          }}
        />
      </AnimatePresence>
      {/* Dynamic Left & Right Blur Vignette Side Overlays */}
      <div className="gradient-carousel-side-overlay gradient-carousel-side-overlay-left" />
      <div className="gradient-carousel-side-overlay gradient-carousel-side-overlay-right" />

      {/* Main Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="gradient-carousel-track"
        onScroll={handleScroll}
      >
        <div className="gradient-carousel-scroll-spacer" />
        
        {clonedItems.map((item, index) => {
          const isActive = index === items.length + activeIndex;
          
          return (
            <div
              key={`${item.id}-${index}`}
              className={`gradient-carousel-card-wrapper ${isActive ? "active" : ""}`}
              onClick={() => scrollToCard(index % items.length)}
            >
              <div className="gradient-carousel-card">
                {/* Dynamic colorful border light */}
                <div
                  className="gradient-carousel-card-border"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientColors[0]}, ${item.gradientColors[1] || item.gradientColors[0]})`,
                  }}
                />
                
                {/* Card Inner Content */}
                <div className="gradient-carousel-card-inner">
                  {/* Next.js Optimized Image */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="gradient-carousel-card-image"
                    quality={75}
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="gradient-carousel-card-scrim" />

                  {/* Card Content Overlay */}
                  <div className="gradient-carousel-card-content">
                    <span className="gradient-carousel-card-subtitle">
                      {item.subtitle}
                    </span>
                    <h3 className="gradient-carousel-card-title">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="gradient-carousel-card-desc">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="gradient-carousel-scroll-spacer" />
      </div>

      {/* Navigation Buttons and Indicators */}
      <div className="gradient-carousel-controls">
        <button
          onClick={handlePrev}
          aria-label="Previous Slide"
          className="gradient-carousel-nav-btn"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="gradient-carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`gradient-carousel-dot ${index === activeIndex ? "active" : ""}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next Slide"
          className="gradient-carousel-nav-btn"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default GradientCarousel;
