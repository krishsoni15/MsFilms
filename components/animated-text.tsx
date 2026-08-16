"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export function AnimatedText({ children, delay = 0, className = "", as: Component = "div" }: AnimatedTextProps) {
  const MotionComponent = motion.create(Component as any);

  return (
    <MotionComponent
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom slow ease out
        delay
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}
