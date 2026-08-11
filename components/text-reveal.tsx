"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  staggerDelay = 0.04,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [lines, setLines] = useState<string[][]>([]);

  useEffect(() => {
    // Split text by explicit line breaks first, then by words
    const textLines = children.split("\n").filter(Boolean);
    const wordsByLine = textLines.map((line) => line.trim().split(/\s+/));
    setLines(wordsByLine);
  }, [children]);

  let wordIndex = 0;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((words, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden">
          {words.map((word, wIdx) => {
            const currentIndex = wordIndex++;
            return (
              <motion.span
                key={`${lineIdx}-${wIdx}`}
                className="inline-block mr-[0.3em]"
                initial={{ y: "110%", opacity: 0 }}
                animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + currentIndex * staggerDelay,
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
