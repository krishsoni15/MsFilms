"use client";

import Image from "next/image";
import Link from "next/link";
import { siteData } from "@/lib/data";
import { motion } from "framer-motion";

export function Footer() {
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
    <footer className="bg-[#020912] text-foreground py-16 md:py-20 relative overflow-hidden w-full max-w-full border-t border-white/[0.03]">
      {/* Ambient background glow inside the footer */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[150px] bg-gold/[0.02] blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="px-6 md:px-10 lg:px-16 max-w-7xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16"
        >
          {/* Column 1 - Brand Info */}
          <motion.div variants={itemVariants} className="flex flex-col items-start">
            <div className="mb-4">
              <Image
                src={siteData.logo}
                alt={siteData.name}
                width={180}
                height={54}
                className="h-9 sm:h-11 w-auto object-contain brightness-100"
              />
            </div>
            <p className="font-laluxes-script text-xl md:text-2xl text-gold/70 mb-4">
              Stories worth remembering.
            </p>
          </motion.div>

          {/* Column 2 - Navigation */}
          <motion.div variants={itemVariants}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-5 font-semibold">
              Exploration
            </p>
            <div className="flex flex-col gap-3">
              {["Work", "Films", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-foreground/60 hover:text-gold transition-colors w-fit font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Column 3 - Connect */}
          <motion.div variants={itemVariants}>
            <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-5 font-semibold">
              Connect
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={siteData.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-foreground/60 hover:text-gold transition-colors w-fit font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Instagram
                </span>
              </a>
              <a
                href={`mailto:${siteData.email}`}
                className="group flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-foreground/60 hover:text-gold transition-colors w-fit font-medium"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">
                  Email Details
                </span>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-[9px] tracking-[0.18em] uppercase text-foreground/20 font-mono">
            {siteData.copyright}
          </p>
          <p className="text-[9px] tracking-[0.18em] uppercase text-foreground/20 font-mono">
            {siteData.locationShort}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
