"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteData } from "@/lib/data";
import { Magnetic } from "@/components/ui/magnetic";
import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const links = [
    { label: "Home", href: "#home", num: "01" },
    { label: "About", href: "#about", num: "02" },
    { label: "Work", href: "#work", num: "03" },
    { label: "Contact", href: "#contact", num: "04" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 9999 }}
        className={`fixed top-0 left-0 right-0 border-b transition-all duration-700 ease-out ${isScrolled
          ? "bg-[#020912]/85 backdrop-blur-lg border-gold/15 py-[12px] md:py-[14px]"
          : "bg-[#020912]/0 backdrop-blur-none border-transparent py-[16px] md:py-[18px]"
          }`}
      >
        <div className="flex justify-between items-center px-5 md:px-10 lg:px-16">
          {/* Logo */}
          <Link
            href="/"
            className="z-50 relative block group"
          >
            <Image
              src={siteData.logo}
              alt={siteData.name}
              width={140}
              height={40}
              priority
              className={`w-auto object-contain transition-all duration-500 gold-filter ${isScrolled ? "h-[26px] sm:h-[30px] md:h-[34px]" : "h-8 sm:h-9 md:h-10"
                }`}
            />
          </Link>
 
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-[11px] tracking-[0.2em] uppercase transition-colors duration-500 hover:opacity-80 group ${isScrolled ? "text-foreground" : "text-white/90"
                  }`}
              >
                {link.label}
                {/* Gold hover underline - grows from center */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-full transition-all duration-300 ease-out bg-gold" />
              </Link>
            ))}
 
            <Link
              href="#contact"
              className={`relative text-[11px] tracking-[0.2em] uppercase border overflow-hidden group block transition-all duration-500 hover:text-[#020912] ${isScrolled
                  ? "border-gold/30 hover:border-gold text-foreground px-4 py-2"
                  : "border-gold/50 hover:border-gold text-white px-5 py-2.5"
                }`}
            >
              <span className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left bg-gold" />
              <span className="relative z-10">Let&apos;s Talk</span>
            </Link>
          </nav>
 
          {/* Mobile Hamburger */}
          <button
            className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-px transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[3.5px] bg-white" : isScrolled ? "bg-foreground" : "bg-white"
              }`} />
            <span className={`block w-6 h-px transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[3.5px] bg-white" : isScrolled ? "bg-foreground" : "bg-white"
              }`} />
          </button>
        </div>
      </motion.header>
 
      {/* Fullscreen Mobile Menu — with numbered links */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#020912] z-40 flex flex-col justify-between px-8 py-28"
          >
            <nav className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="flex items-baseline gap-4"
                >
                  <span className="text-[10px] tracking-[0.2em] text-gold/50 font-sans w-6">
                    {link.num}
                  </span>
                  <Link
                    href={link.href}
                    className="font-display text-4xl text-white/90 block py-3 hover:text-white hover:translate-x-2 transition-all duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-6"
            >
              <div className="flex justify-center pb-2">
                <Image
                  src={siteData.logo}
                  alt={siteData.name}
                  width={160}
                  height={45}
                  className="h-10 w-auto object-contain brightness-100 opacity-80"
                />
              </div>
              <Link
                href="#contact"
                className="block text-white text-[11px] tracking-[0.2em] uppercase border border-gold/30 text-center py-4 hover:bg-gold hover:text-foreground transition-all duration-500"
                onClick={() => setMobileOpen(false)}
              >
                Start a Conversation
              </Link>
              <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase text-center">
                {siteData.locationShort}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
