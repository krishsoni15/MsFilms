"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BorderGlow from "@/components/ui/border-glow";
import { Phone, Mail, MessageCircle, X, ArrowUpRight } from "lucide-react";

// Instagram icon (not available in this lucide-react version)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


const connectLinks = [
  {
    label: "Instagram",
    subtitle: "@msfilms",
    href: "https://instagram.com/msfilms",
    icon: InstagramIcon,
    color: "hover:text-[#E1306C]",
    iconBgHover: "group-hover:bg-[#E1306C]/10 group-hover:border-[#E1306C]/20 group-hover:text-[#E1306C]",
  },
  {
    label: "WhatsApp",
    subtitle: "Direct Message",
    href: "https://wa.me/1234567890",
    icon: MessageCircle,
    color: "hover:text-[#25D366]",
    iconBgHover: "group-hover:bg-[#25D366]/10 group-hover:border-[#25D366]/20 group-hover:text-[#25D366]",
  },
  {
    label: "Phone",
    subtitle: "+1 (234) 567-890",
    href: "tel:+1234567890",
    icon: Phone,
    color: "hover:text-[#c5a880]",
    iconBgHover: "group-hover:bg-[#c5a880]/15 group-hover:border-[#c5a880]/30 group-hover:text-[#c5a880]",
  },
  {
    label: "Email",
    subtitle: "contactus.msfilms@gmail.com",
    href: "mailto:contactus.msfilms@gmail.com",
    icon: Mail,
    color: "hover:text-[#e5d5be]",
    iconBgHover: "group-hover:bg-[#e5d5be]/15 group-hover:border-[#e5d5be]/30 group-hover:text-[#e5d5be]",
  },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setIsScrolled(window.scrollY > 40);

        // Detect active section on scroll
        const sectionIds = ["home", "about", "work", "contact"];
        const scrollPosition = window.scrollY;

        // Calculate active section based on proximity to 35% of the viewport height
        const threshold = window.innerHeight * 0.35;

        // Edge case: scrolled to bottom
        const isAtBottom =
          window.innerHeight + scrollPosition >=
          document.documentElement.scrollHeight - 20;
        if (isAtBottom) {
          setActiveSection("contact");
          return;
        }

        let currentSection = "home";
        let minDistance = Infinity;
        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= threshold && rect.bottom >= threshold) {
              currentSection = id;
              break;
            }
            const distance = Math.abs(rect.top - threshold);
            if (distance < minDistance) {
              minDistance = distance;
              currentSection = id;
            }
          }
        }
        setActiveSection(currentSection);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close connect dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        connectRef.current &&
        !connectRef.current.contains(e.target as Node)
      ) {
        setConnectOpen(false);
      }
    };
    if (connectOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [connectOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 9999 }}
        className="fixed top-0 left-0 right-0 px-4 sm:px-6 lg:px-10"
      >
        <div
          className={`flex items-center justify-between max-w-[1440px] mx-auto transition-all duration-500 ease-out ${isScrolled ? "py-2 mt-1.5" : "py-3 mt-2"
            }`}
        >
          {/* Logo */}
          <Link href="/" className="z-50 relative flex items-center shrink-0">
            <Image
              src="/logo/logo.png"
              alt="Ms films"
              width={150}
              height={40}
              className="h-7 sm:h-8 lg:h-9 w-auto object-contain brightness-100"
              priority
            />
          </Link>

          {/* ─── Center Floating Pill Nav (Desktop) ─── */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div
              onMouseLeave={() => setHoveredSection(null)}
              className={`flex items-center gap-0.5 rounded-full border transition-all duration-500 ease-out px-1.5 py-1.5 ${isScrolled
                ? "bg-[#0a1628]/80 backdrop-blur-xl border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                : "bg-white/[0.04] backdrop-blur-md border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                }`}
            >
              {links.map((link) => {
                const sectionId = link.href.substring(1);
                const isActive = activeSection === sectionId;
                const isHighlighted = hoveredSection !== null ? hoveredSection === sectionId : isActive;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onMouseEnter={() => setHoveredSection(sectionId)}
                    className={`relative px-5 py-2 rounded-full text-[11px] tracking-[0.15em] uppercase font-sans transition-all duration-300 ${isHighlighted
                      ? "text-white"
                      : "text-white/50 hover:text-white/80"
                      }`}
                  >
                    {/* Sliding active/hover pill background */}
                    {isHighlighted && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 rounded-full bg-white/[0.1] border border-white/[0.08]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* ─── Right: Let's Connect Button + Dropdown (Desktop) ─── */}
          <div className="hidden lg:block relative shrink-0" ref={connectRef}>
            <BorderGlow
              edgeSensitivity={20}
              glowColor="35 85 75"
              backgroundColor="transparent"
              borderRadius={9999}
              glowRadius={30}
              glowIntensity={1.5}
              coneSpread={25}
              animated={false}
              colors={["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={0}
              style={{
                borderColor: "transparent",
              }}
            >
              <button
                onClick={() => setConnectOpen(!connectOpen)}
                className={`relative text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full border border-white/10 hover:border-gold/30 hover:text-white transition-all duration-300 focus:outline-none ${isScrolled
                  ? "text-foreground px-6 py-2.5"
                  : "text-white px-6 py-3"
                  }`}
                style={{
                  background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.01) 100%)",
                }}
              >
                <span className="relative z-10 font-sans group-hover:text-white transition-colors duration-300">
                  Let&apos;s Connect
                </span>
                <motion.svg
                  animate={{ rotate: connectOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 w-3 h-3 text-current transition-colors duration-300"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M2 4l4 4 4-4" />
                </motion.svg>
              </button>
            </BorderGlow>

            {/* Dropdown */}
            <AnimatePresence>
              {connectOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-full mt-3 min-w-[260px] rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#0a1628]/98 to-[#050e1b]/98 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-2 z-50 flex flex-col gap-1"
                >
                  {connectLinks.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      onClick={() => setConnectOpen(false)}
                      className="group flex items-center justify-between p-2 rounded-xl transition-all duration-300 hover:bg-white/[0.05] active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2 rounded-lg bg-white/[0.02] border border-white/[0.03] text-white/60 transition-all duration-300 ${item.iconBgHover}`}>
                          <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-medium tracking-[0.15em] uppercase font-sans text-white/80 group-hover:text-white transition-colors duration-300">
                            {item.label}
                          </span>
                          <span className="text-[9px] tracking-wide text-white/35 group-hover:text-white/55 transition-colors duration-300 mt-0.5 max-w-[150px] truncate">
                            {item.subtitle}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/10 group-hover:text-white/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-2" />
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── Mobile Hamburger ─── */}
          <button
            className="lg:hidden z-50 relative w-9 h-9 flex flex-col justify-center items-center gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-6 h-px transition-all duration-300 ${mobileOpen
                ? "rotate-45 translate-y-[3.5px] bg-white"
                : "bg-white"
                }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${mobileOpen
                ? "-rotate-45 -translate-y-[3.5px] bg-white"
                : "bg-white"
                }`}
            />
          </button>
        </div>
      </motion.header>

      {/* ─── Fullscreen Mobile Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-[#020912]/98 backdrop-blur-md z-[9998] flex flex-col"
          >
            {/* Close button */}
            <div className="flex justify-end px-6 pt-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:border-white/30 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col justify-center px-10 gap-2">
              {links.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.08,
                      duration: 0.5,
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3 font-laluxes-serif text-4xl sm:text-5xl transition-all duration-300 hover:translate-x-3 ${isActive
                        ? "text-gold"
                        : "text-white/70 hover:text-white"
                        }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom: Social Links + Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="px-10 pb-10 space-y-6"
            >
              {/* Social icons row */}
              <div className="flex items-center gap-5">
                {connectLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={
                      item.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center justify-center w-11 h-11 rounded-full border border-white/10 text-white/50 ${item.color} hover:border-white/25 transition-all duration-300`}
                  >
                    <item.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              {/* Logo */}
              <div className="flex items-center justify-between">
                <Image
                  src={siteData.logo}
                  alt={siteData.name}
                  width={120}
                  height={35}
                  className="h-8 w-auto object-contain brightness-100 opacity-60"
                />
                <p className="text-white/25 text-[10px] tracking-[0.15em] uppercase font-sans">
                  {siteData.locationShort}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
