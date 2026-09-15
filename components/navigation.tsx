"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteData } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import BorderGlow from "@/components/ui/border-glow";
import { Phone, Mail, MessageCircle, ArrowUpRight, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

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
    color: "hover:text-gold",
    iconBgHover: "group-hover:bg-gold/15 group-hover:border-gold/30 group-hover:text-gold",
  },
  {
    label: "Email",
    subtitle: "contactus.msfilms@gmail.com",
    href: "mailto:contactus.msfilms@gmail.com",
    icon: Mail,
    color: "hover:text-gold-light",
    iconBgHover: "group-hover:bg-gold-light/15 group-hover:border-gold-light/30 group-hover:text-gold-light",
  },
];

export function Navigation({
  isParentLoaded = true,
}: {
  isParentLoaded?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(pathname === "/work" ? "work" : "home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const connectRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const sectionId = href === "/" ? "home" : href.replace("/", "").split("#")[0];
    if (pathname === "/" && href !== "/services") {
      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        e.preventDefault();
        const offset = targetEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: Math.max(0, offset),
          behavior: "smooth",
        });
        setActiveSection(sectionId);
        window.history.pushState(null, "", `#${sectionId}`);
        return;
      }
    }
    if (href.startsWith("#") || (href.startsWith("/#") && pathname === "/")) {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = targetEl.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top: Math.max(0, offset),
          behavior: "smooth",
        });
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setIsScrolled(currentScrollY > 50);

      // Smart show/hide navbar based on scroll direction
      const diff = currentScrollY - lastScrollY.current;

      if (mobileOpen || connectOpen) {
        setVisible(true);
      } else if (currentScrollY <= 80) {
        setVisible(true);
      } else {
        if (diff > 12 && currentScrollY > 150) {
          setVisible(false); // Hide on scroll down
        } else if (diff < -6) {
          setVisible(true); // Reveal on scroll up
        }
      }

      lastScrollY.current = currentScrollY;

      // Detect active section on scroll
      if (pathname !== "/") {
        const currentPathSection = links.find((l) => l.href !== "/" && pathname.startsWith(l.href))?.href.replace("/", "") || "home";
        setActiveSection(currentPathSection);
        return;
      }

      const sectionIds = ["home", "about", "work", "services", "blog", "contact"];
      const threshold = window.innerHeight * 0.35;

      const isAtBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      let currentSection = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= threshold && rect.bottom > 80) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen, connectOpen]);

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
    if (mobileOpen) {
      document.documentElement.classList.add("mobile-menu-open");
    } else {
      document.documentElement.classList.remove("mobile-menu-open");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setConnectOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("mobile-menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // Variants for staggered children dropdown animation
  const dropdownVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        duration: 0.4,
        staggerChildren: 0.05,
        delayChildren: 0.05,
      }
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const
      }
    }
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={isParentLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 9999 }}
        className={`fixed left-0 top-0 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${!visible
          ? "opacity-0 -translate-y-24 pointer-events-none"
          : "opacity-100 translate-y-0"
          } ${isScrolled
            ? theme === "light"
              ? "bg-white/75 backdrop-blur-xl border-b border-black/10 py-3 sm:py-3.5 px-6 sm:px-10 lg:px-16 shadow-sm"
              : "bg-background/55 backdrop-blur-2xl border-b border-gold/25 py-3 sm:py-3.5 px-6 sm:px-10 lg:px-16 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent border-b border-transparent py-4 sm:py-5 px-6 sm:px-10 lg:px-16"
          }`}
      >
        <div className="flex items-center justify-between w-full mx-auto">
          {/* Logo */}
          <Link href="/" className={`z-50 relative flex items-center shrink-0 transition-opacity duration-300 ${mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Image
              src="/logo/logo.png"
              alt="Ms films"
              width={180}
              height={48}
              className={`w-auto object-contain transition-all duration-500 logo ${isScrolled && theme === "light"
                ? "invert brightness-0"
                : "brightness-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                } ${isScrolled
                  ? "h-[24px] sm:h-[27px] lg:h-[30px]"
                  : "h-[28px] sm:h-[31px] lg:h-[34px]"
                }`}
              priority
            />
          </Link>

          {/* ─── Center Navigation Links (Desktop) ─── */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div
              onMouseLeave={() => setHoveredSection(null)}
              className="flex items-center gap-1.5 px-1 py-1"
            >
              {links.map((link) => {
                const sectionId = link.href === "/" ? "home" : link.href.replace("/", "");
                const isActive =
                  pathname === "/"
                    ? activeSection === sectionId
                    : pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                const isHighlighted =
                  hoveredSection !== null
                    ? hoveredSection === sectionId
                    : isActive;

                // Color classes depending on scrolled state & theme
                let textClass = "";
                if (!isScrolled) {
                  textClass = isActive
                    ? "text-white font-bold"
                    : isHighlighted
                      ? "text-white"
                      : "text-white/75 hover:text-white";
                } else if (theme === "light") {
                  textClass = isActive
                    ? "text-neutral-950 font-bold"
                    : isHighlighted
                      ? "text-neutral-900"
                      : "text-neutral-600 hover:text-neutral-900";
                } else {
                  textClass = isActive
                    ? "text-foreground font-bold"
                    : isHighlighted
                      ? "text-foreground"
                      : "text-foreground/70 hover:text-foreground";
                }

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    onMouseEnter={() => setHoveredSection(sectionId)}
                    className={`relative rounded-full uppercase font-sans transition-all duration-300 px-4 py-1.5 text-[11px] tracking-[0.18em] ${textClass}`}
                  >
                    {/* Sliding active/hover pill background */}
                    {isHighlighted && (
                      <motion.span
                        layoutId="navPill"
                        className={`absolute inset-0 rounded-full ${!isScrolled
                          ? isActive
                            ? "border border-white/30 bg-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.3)]"
                            : "border border-white/20 bg-white/10"
                          : theme === "light"
                            ? isActive
                              ? "border border-black/20 bg-black/[0.08] shadow-sm"
                              : "border border-black/10 bg-black/[0.04]"
                            : isActive
                              ? "border border-white/20 bg-white/[0.1] shadow-sm"
                              : "border border-white/10 bg-white/[0.04]"
                          }`}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
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
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <div className="relative" ref={connectRef}>
              <BorderGlow
                edgeSensitivity={25}
                glowColor="35 85 75"
                backgroundColor="transparent"
                borderRadius={9999}
                glowRadius={35}
                glowIntensity={0.3}
                coneSpread={30}
                animated={true}
                colors={
                  !isScrolled
                    ? ["var(--white)", "var(--gold)", "var(--white)"]
                    : theme === "light"
                      ? ["var(--foreground)", "var(--gold)", "var(--foreground)"]
                      : ["var(--white)", "var(--gold)", "var(--white)"]
                }
                fillOpacity={0}
                style={{
                  borderColor: "transparent",
                }}
              >
                <button
                  onClick={() => setConnectOpen(!connectOpen)}
                  className={`relative cursor-pointer text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full border transition-all duration-500 focus:outline-none hover:text-gold px-6 py-2.5 ${!isScrolled
                    ? "border-white/25 text-white hover:border-gold/50 bg-white/10"
                    : theme === "light"
                      ? "border-black/15 text-neutral-900 hover:border-gold/50 bg-black/[0.03]"
                      : "border-white/15 text-foreground hover:border-gold/50 bg-white/[0.04]"
                    }`}
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.02) 100%)",
                  }}
                >
                  <span className="relative z-10 font-sans font-medium transition-colors duration-300">
                    Let&apos;s Connect
                  </span>
                  <motion.svg
                    animate={{ rotate: connectOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 top-full mt-3.5 min-w-[310px] z-50 rounded-2xl border border-gold/35 bg-background/95 backdrop-blur-3xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-3 flex flex-col gap-1 overflow-hidden ring-1 ring-white/10"
                  >
                    {/* Top inner gold hairline highlight */}
                    <div className="bg-gradient-to-r from-transparent via-gold/50 to-transparent h-px w-full absolute top-0 left-0" />

                    {/* Section Header */}
                    <div className="px-3 pt-1.5 pb-2 border-b border-gold/15 mb-1 flex items-center justify-between">
                      <span className="text-[8.5px] tracking-[0.3em] uppercase text-gold/70 font-sans font-bold">
                        Get In Touch
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    </div>

                    {connectLinks.map((item) => (
                      <motion.a
                        key={item.label}
                        variants={dropdownItemVariants}
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
                        className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl transition-all duration-300 hover:bg-gold/[0.09] border border-transparent hover:border-gold/25 active:scale-[0.98] cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="p-2.5 rounded-xl bg-background-alt-2 border border-gold/25 text-gold transition-all duration-300 group-hover:bg-gold group-hover:border-gold group-hover:text-background group-hover:scale-105 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                            <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10.5px] font-bold tracking-[0.2em] uppercase font-sans text-foreground group-hover:text-white transition-colors duration-300">
                              {item.label}
                            </span>
                            <span className="text-[9.5px] tracking-wide text-gold/70 group-hover:text-gold transition-colors duration-300 mt-0.5 max-w-[180px] truncate">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-gold/40 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-2" />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─── Mobile Right Actions ─── */}
          <div className={`lg:hidden flex items-center gap-2 z-50 transition-opacity duration-300 ${mobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            {/* Mobile Hamburger */}
            <button
              className={`relative cursor-pointer text-[10px] tracking-[0.22em] uppercase font-sans font-semibold flex items-center gap-2 rounded-full border px-3.5 py-2 backdrop-blur-md active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.3)] ${mobileOpen
                ? "border-gold text-gold bg-gold/15"
                : !isScrolled
                  ? "border-white/30 text-white bg-white/10 hover:border-gold/60"
                  : theme === "light"
                    ? "border-black/15 text-neutral-900 bg-black/[0.04] hover:border-gold/50"
                    : "border-white/20 text-foreground bg-white/[0.06] hover:border-gold/50"
                }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              <span className="text-[9.5px] font-bold tracking-[0.2em]">MENU</span>
              <div className="flex flex-col justify-center items-center w-3.5 h-3.5 gap-1 relative">
                <span className="block w-3.5 h-[1.5px] rounded-full bg-current" />
                <span className="block w-3.5 h-[1.5px] rounded-full bg-current" />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Floating Glass Mobile Menu Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[10000] flex justify-end"
          >
            {/* Scrim Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Sliding Glass Drawer Panel (Stuck Flush on Right Edge, Rounded on Left) */}
            <motion.div
              initial={{ x: "100%", opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ zIndex: 10005 }}
              className="relative h-full w-[calc(100%-40px)] sm:w-[380px] max-w-[420px] bg-gradient-to-b from-background/98 via-background/98 to-background/99 border-l border-y border-gold/35 border-r-0 rounded-l-[32px] rounded-r-none backdrop-blur-2xl shadow-[-20px_0_70px_rgba(0,0,0,0.9)] p-0 flex flex-col overflow-y-auto no-scrollbar overflow-x-hidden"
            >
              {/* Ambient Background Light Glows */}
              <div className="absolute top-[-15%] left-[-15%] w-[80%] h-[50%] rounded-full bg-gold/12 blur-[100px] pointer-events-none" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] rounded-full bg-gold/6 blur-[80px] pointer-events-none" />

              {/* Top Bar inside Drawer */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-gold/15 z-20 relative"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src="/logo/logo.png"
                    alt="Ms films"
                    width={100}
                    height={28}
                    className="h-5 sm:h-6 w-auto object-contain brightness-100 logo"
                  />
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gold/40 bg-gold/15 text-gold hover:bg-gold hover:text-background text-[9.5px] tracking-[0.2em] font-sans font-bold uppercase transition-all duration-300 active:scale-95 shadow-[0_2px_10px_rgba(0,0,0,0.4)] cursor-pointer"
                  aria-label="Close Menu"
                >
                  <span>CLOSE</span>
                  <span className="text-[11px] font-bold">✕</span>
                </button>
              </motion.div>

              {/* Nav Links */}
              <nav className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-8 gap-1 py-4">
                {links.map((link, i) => {
                  const sectionId = link.href === "/" ? "home" : (link.href.includes("#")
                    ? link.href.split("#")[1]
                    : link.href.replace("/", ""));
                  const isActive =
                    pathname === "/"
                      ? activeSection === sectionId
                      : pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        delay: 0.08 + i * 0.045,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                    >
                      <Link
                        href={link.href}
                        className={`relative block py-2 sm:py-2.5 font-laluxes-serif text-2xl sm:text-3xl transition-all duration-300 hover:translate-x-2 flex items-center gap-3.5 group ${isActive
                          ? "text-gold font-semibold"
                          : "text-foreground/75 hover:text-gold"
                          }`}
                        onClick={(e) => {
                          handleLinkClick(e, link.href);
                          setMobileOpen(false);
                        }}
                      >
                        <span className="font-sans text-[10px] sm:text-[11px] tracking-widest text-gold/60 group-hover:text-gold font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{link.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="mobileActiveDot"
                            className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 shadow-[0_0_8px_color-mix(in_srgb,var(--gold)_80%,transparent)] ml-auto"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom: Quick Contact Actions + Social Links + Footer */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="relative z-10 px-6 sm:px-8 pb-6 border-t border-gold/15 pt-5 space-y-4"
              >
                {/* Connect Label */}
                <p className="text-[8.5px] tracking-[0.22em] uppercase text-gold/70 font-sans font-bold">
                  Connect With Us
                </p>

                {/* Direct Let's Connect Button inside Mobile Drawer */}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-between px-4.5 py-2.5 rounded-full border border-gold/40 bg-gold/15 text-foreground hover:border-gold text-[9.5px] tracking-[0.2em] uppercase font-sans font-semibold transition-all duration-300 active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                  <span>Let&apos;s Connect</span>
                  <div className="w-4.5 h-4.5 rounded-full bg-gold text-background flex items-center justify-center">
                    <ArrowUpRight size={11} />
                  </div>
                </a>

                {/* Social icons row */}
                <div className="flex flex-wrap gap-1.5">
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
                      className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/20 bg-black/30 text-foreground/80 hover:text-gold hover:border-gold/40 transition-all duration-300 text-[9px] tracking-[0.14em] uppercase font-sans font-medium active:scale-[0.97]"
                    >
                      <item.icon className="w-3 h-3 text-gold" />
                      <span>{item.label}</span>
                    </a>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gold/15 pt-3">
                  <span className="text-gold/70 text-[8.5px] tracking-[0.18em] uppercase font-sans font-bold">
                    MS FILMS &copy; {new Date().getFullYear()}
                  </span>
                  <p className="text-foreground/30 text-[8px] tracking-[0.18em] uppercase font-sans font-medium">
                    {siteData.locationShort}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
