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
    if (href.startsWith("#") || (href.startsWith("/#") && pathname === "/")) {
      e.preventDefault();
      const targetId = href.split("#")[1];
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const offset = targetEl.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: offset,
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
      } else if (currentScrollY <= 50) {
        setVisible(true);
      } else {
        // More sensitive scroll-hiding threshold (from 12 to 5) so it hides instantly on scroll down
        if (diff > 5) {
          setVisible(false); // scrolling down
        } else if (diff < -5) {
          setVisible(true); // scrolling up
        }
      }

      lastScrollY.current = currentScrollY;

      // Detect active section on scroll
      if (pathname !== "/") {
        setActiveSection("work");
        return;
      }

      const sectionIds = ["home", "about", "work", "contact"];
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
          // If the top of the section has scrolled past the threshold, it is active
          if (rect.top <= threshold) {
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const links = [
    { label: "Home", href: pathname === "/" ? "#home" : "/#home" },
    { label: "About", href: pathname === "/" ? "#about" : "/#about" },
    { label: "Work", href: pathname === "/" ? "#work" : "/#work" },
    { label: "Services", href: pathname === "/" ? "#services" : "/#services" },
    { label: "Contact", href: pathname === "/" ? "#contact" : "/#contact" },
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
            ? "bg-background/25 backdrop-blur-md border-b border-border py-3 sm:py-3.5 px-6 sm:px-10 lg:px-16"
            : "bg-transparent border-b border-transparent py-4 sm:py-5 px-6 sm:px-10 lg:px-16"
          }`}
      >
        <div className="flex items-center justify-between w-full mx-auto">
          {/* Logo */}
          <Link href="/" className="z-50 relative flex items-center shrink-0">
            <Image
              src="/logo/logo.png"
              alt="Ms films"
              width={180}
              height={48}
              className={`w-auto object-contain brightness-100 transition-all duration-500 logo ${isScrolled ? "h-[24px] sm:h-[27px] lg:h-[30px]" : "h-[28px] sm:h-[31px] lg:h-[34px]"
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
                const sectionId = link.href.includes("#")
                  ? link.href.split("#")[1]
                  : link.href.replace("/", "");
                const isActive = activeSection === sectionId;
                const isHighlighted = hoveredSection !== null ? hoveredSection === sectionId : isActive;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    onMouseEnter={() => setHoveredSection(sectionId)}
                    className={`relative rounded-full uppercase font-sans font-medium transition-all duration-300 px-4 py-1.5 text-[11px] tracking-[0.18em] ${isActive
                      ? "text-foreground font-semibold"
                      : isHighlighted
                        ? "text-foreground/90"
                        : "text-foreground/45 hover:text-foreground/80"
                      }`}
                  >
                    {/* Sliding active/hover pill background */}
                    {isHighlighted && (
                      <motion.span
                        layoutId="navPill"
                        className={`absolute inset-0 rounded-full bg-gradient-to-b from-foreground/[0.08] to-foreground/[0.02] ${isActive
                          ? "border border-foreground/20 bg-foreground/[0.02] shadow-sm"
                          : "border border-foreground/[0.08]"
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
            {/* Desktop Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-10 h-10 flex items-center justify-center rounded-full border border-border bg-foreground/[0.02] text-foreground hover:bg-foreground/[0.08] active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -8, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 8, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {theme === "light" ? (
                    <Moon className="w-4.5 h-4.5 text-foreground" />
                  ) : (
                    <Sun className="w-4.5 h-4.5 text-foreground" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

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
                colors={theme === "light" ? ["#020912", "#cba358", "#020912"] : ["#ffffff", "#cba358", "#ffffff"]}
                fillOpacity={0}
                style={{
                  borderColor: "transparent",
                }}
              >
                <button
                  onClick={() => setConnectOpen(!connectOpen)}
                  className={`relative cursor-pointer text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full border border-border hover:border-gold/30 transition-all duration-500 focus:outline-none text-foreground hover:text-gold px-6 py-2.5`}
                  style={{
                    background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.02) 100%)",
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
                    className="absolute right-0 top-full mt-3 min-w-[300px] z-50 rounded-2xl border border-border bg-cream-dark/95 backdrop-blur-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4),0_0_40px_rgba(197,168,128,0.02),inset_0_1px_1px_rgba(255,255,255,0.04)] p-2.5 flex flex-col gap-1 overflow-hidden"
                  >
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
                        className="group flex items-center justify-between p-2.5 rounded-xl transition-all duration-300 hover:bg-foreground/[0.03] active:scale-[0.98]"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="p-2.5 rounded-lg bg-foreground/[0.02] border border-border text-foreground/50 transition-all duration-300 group-hover:bg-gold/10 group-hover:border-gold/25 group-hover:text-gold group-hover:scale-105">
                            <item.icon className="w-4 h-4 transition-transform duration-300 group-hover:rotate-6" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-semibold tracking-[0.18em] uppercase font-sans text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                              {item.label}
                            </span>
                            <span className="text-[9px] tracking-wide text-foreground/35 group-hover:text-foreground/55 transition-colors duration-300 mt-0.5 max-w-[170px] truncate">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-foreground/10 group-hover:text-foreground/50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-2" />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ─── Mobile Right Actions ─── */}
          <div className="lg:hidden flex items-center gap-2 z-50">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-border bg-foreground/[0.03] text-foreground hover:bg-foreground/10 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -8, opacity: 0, rotate: -45 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 8, opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {theme === "light" ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="w-10 h-10 flex flex-col justify-center items-center rounded-full border border-border bg-foreground/[0.03] backdrop-blur-md hover:bg-foreground/10 active:scale-95 transition-all duration-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
            >
              <span
                className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[1.5px]" : "mb-1.5"
                  }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[1.5px]" : ""
                  }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ─── Fullscreen Mobile Menu Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-[9990]"
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
            className="fixed top-0 right-0 bottom-0 h-full w-full sm:w-[440px] md:w-[480px] bg-gradient-to-b from-background via-background-alt to-background-alt-2 border-l border-gold/15 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.3)] p-0 flex flex-col overflow-hidden"
          >
            {/* Ambient Background Light Glows */}
            <div className="absolute top-[-15%] left-[-15%] w-[80%] h-[50%] rounded-full bg-gold/8 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[40%] rounded-full bg-gold/4 blur-[80px] pointer-events-none" />

            {/* Nav Links (padded at top to clear logo & animated close hamburger from header) */}
            <nav className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-12 gap-1 pt-[110px] pb-6">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 48, opacity: 0.5 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ delay: 0.1 }}
                className="h-px bg-gold mb-6"
              />

              {links.map((link, i) => {
                const sectionId = link.href.includes("#")
                  ? link.href.split("#")[1]
                  : link.href.replace("/", "");
                const isActive = activeSection === sectionId;
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
                    <Link
                      href={link.href}
                      className={`relative block py-3 font-laluxes-serif text-4xl sm:text-5xl transition-all duration-300 hover:translate-x-4 flex items-center gap-3.5 ${isActive
                        ? "text-gold font-medium"
                        : "text-foreground/70 hover:text-gold"
                        }`}
                      onClick={(e) => {
                        handleLinkClick(e, link.href);
                        setMobileOpen(false);
                      }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="mobileActiveDot"
                          className="w-2 h-2 rounded-full bg-gold shrink-0 shadow-[0_0_8px_rgba(197,168,128,0.8)]"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {link.label}
                    </Link>
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
              className="relative z-10 px-8 sm:px-12 pb-10 border-t border-border pt-8 space-y-6"
            >
              {/* Connect Label */}
              <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/30 font-sans font-medium">
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
                    className="group flex items-center gap-2.5 px-4.5 py-3 rounded-full border border-border bg-foreground/[0.03] text-foreground/70 hover:text-gold-light hover:border-gold/45 hover:bg-gold/[0.06] transition-all duration-300 text-[10px] tracking-[0.15em] uppercase font-sans font-medium active:scale-[0.97]"
                  >
                    <item.icon className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Logo */}
              <div className="flex items-center justify-between border-t border-border pt-6">
                <Image
                  src={siteData.logo}
                  alt={siteData.name}
                  width={110}
                  height={32}
                  className="h-7 w-auto object-contain brightness-100 opacity-55 logo"
                />
                <p className="text-foreground/20 text-[9px] tracking-[0.15em] uppercase font-sans font-medium">
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
