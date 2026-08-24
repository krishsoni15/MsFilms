"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function AnimatedText({ children, delay = 0, className = "", as = "div" }: AnimatedTextProps) {
  const props = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // Custom slow ease out
      delay
    },
    className
  };

  switch (as) {
    case "p":
      return <motion.p {...props}>{children}</motion.p>;
    case "span":
      return <motion.span {...props}>{children}</motion.span>;
    case "h1":
      return <motion.h1 {...props}>{children}</motion.h1>;
    case "h2":
      return <motion.h2 {...props}>{children}</motion.h2>;
    case "h3":
      return <motion.h3 {...props}>{children}</motion.h3>;
    case "h4":
      return <motion.h4 {...props}>{children}</motion.h4>;
    case "h5":
      return <motion.h5 {...props}>{children}</motion.h5>;
    case "h6":
      return <motion.h6 {...props}>{children}</motion.h6>;
    default:
      return <motion.div {...props}>{children}</motion.div>;
  }
}

