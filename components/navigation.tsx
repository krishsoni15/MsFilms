"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { siteData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BorderGlow from "@/components/ui/border-glow";
import { Phone, Mail, MessageCircle, X, ArrowUpRight, Home, User, Film } from "lucide-react";

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
    subtitle: "@msfilms._",
    href: "https://www.instagram.com/msfilms._/",
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
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const currentScrollY = window.scrollY;
        const heroThreshold = window.innerHeight * 0.95;

        setIsScrolled(currentScrollY > heroThreshold);

        // Smart show/hide navbar based on scroll direction and context
        const isMobile = window.innerWidth < 1024;
        if (isMobile) {
          setVisible(true);
        } else {
          if (currentScrollY <= 40) {
            setVisible(true);
          } else if (currentScrollY > 40 && currentScrollY <= window.innerHeight * 1.85) {
            // Hide during hero video expansion and AboutStudio section to prevent clutter
            setVisible(false);
          } else {
            // Show on all subsequent sections (Photographer, Work, Contact)
            setVisible(true);
          }
        }

        lastScrollY.current = currentScrollY;

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
        className={`fixed top-0 left-0 right-0 transition-all duration-500 bg-transparent border-b border-transparent ${
          !visible
            ? "opacity-0 -translate-y-12 pointer-events-none"
            : "opacity-100 translate-y-0"
        } ${isScrolled
          ? "py-2.5 px-4 sm:px-6 lg:px-10"
          : "py-4 px-4 sm:px-6 lg:px-10"
          }`}
      >
        <div
          className="flex items-center justify-between max-w-[1440px] mx-auto"
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
                  <a
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
                  </a>
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
                  className="absolute right-0 top-full mt-3 min-w-[280px] z-50 rounded-2xl border border-white/10 bg-[#060f1b]/70 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(197,168,128,0.03)] p-2.5 flex flex-col gap-1.5 overflow-hidden"
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
                      className="group flex items-center justify-between p-2.5 rounded-xl transition-all duration-300 hover:bg-white/[0.04] active:scale-[0.98]"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] text-white/50 transition-all duration-300 group-hover:bg-gold/10 group-hover:border-gold/25 group-hover:text-gold">
                          <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase font-sans text-white/70 group-hover:text-white transition-colors duration-300">
                            {item.label}
                          </span>
                          <span className="text-[9px] tracking-wide text-white/30 group-hover:text-white/50 transition-colors duration-300 mt-0.5 max-w-[170px] truncate">
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
            key="mobile-menu-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990]"
          />
        )}
        {mobileOpen && (
          <motion.div
            key="mobile-menu-drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 220 }}
            style={{ zIndex: 9995 }}
            className="fixed top-0 right-0 bottom-0 h-full w-full sm:w-[440px] md:w-[480px] bg-gradient-to-b from-[#030914] via-[#050d1a] to-[#0e0a05] border-l border-gold/15 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] p-0 flex flex-col"
          >
            {/* Nav Links (padded at top to clear logo & animated close hamburger from header) */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-1 pt-[110px] pb-6">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 48, opacity: 0.5 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="h-px bg-gold mb-6"
              />

              {links.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 25 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 25 }}
                    transition={{
                      delay: 0.05 + i * 0.06,
                      duration: 0.4,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                  >
                    <a
                      href={link.href}
                      className={`block py-3 font-laluxes-serif text-4xl sm:text-5xl transition-all duration-300 hover:translate-x-2.5 ${isActive
                        ? "text-gold font-medium"
                        : "text-white/70 hover:text-gold"
                        }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom: Social Links + Logo */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="px-8 sm:px-12 pb-10 border-t border-white/[0.05] pt-8 space-y-6"
            >
              {/* Connect Label */}
              <p className="text-[9px] tracking-[0.2em] uppercase text-white/30 font-sans">
                Connect With Us
              </p>

              {/* Social icons row */}
              <div className="flex flex-wrap gap-2.5">
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
                    className="group flex items-center gap-2 px-4.5 py-3 rounded-full border border-white/10 bg-white/[0.03] text-white/70 hover:text-gold-light hover:border-gold/45 hover:bg-gold/[0.06] transition-all duration-300 text-[10px] tracking-[0.15em] uppercase font-sans active:scale-[0.97]"
                  >
                    <item.icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Logo */}
              <div className="flex items-center justify-between border-t border-white/[0.05] pt-6">
                <Image
                  src={siteData.logo}
                  alt={siteData.name}
                  width={110}
                  height={32}
                  className="h-7 w-auto object-contain brightness-100 opacity-55"
                />
                <p className="text-white/20 text-[9px] tracking-[0.15em] uppercase font-sans">
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
