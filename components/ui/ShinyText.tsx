"use client";

import React, { useState, useCallback } from "react";
import "./ShinyText.css";

interface ShinyTextProps {
  text?: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean; // Keep for compatibility, though CSS uses standard loop
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  alt?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text = "",
  disabled = false,
  speed = 2,
  className = "",
  color = "#b5b5b5",
  shineColor = "#ffffff",
  spread = 120,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
  imageSrc,
  imageWidth = 150,
  imageHeight = 40,
  alt = "Shiny logo",
}) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const animationStyle: React.CSSProperties = {
    animationName: disabled ? "none" : "shine-sweep",
    animationDuration: `${speed}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationDelay: `${delay}s`,
    animationPlayState: isPaused ? "paused" : "running",
    animationDirection: direction === "right" ? "reverse" : "normal",
  };

  if (imageSrc) {
    const gradientStyle: React.CSSProperties = {
      backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 30%, ${shineColor} 50%, ${color} 70%, ${color} 100%)`,
      backgroundSize: "200% auto",
      WebkitMaskImage: `url(${imageSrc})`,
      maskImage: `url(${imageSrc})`,
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      width: imageWidth,
      height: imageHeight,
      display: "inline-block",
      ...animationStyle,
    };

    return (
      <div
        className={`shiny-logo ${className}`}
        style={gradientStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label={alt}
      />
    );
  }

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 30%, ${shineColor} 50%, ${color} 70%, ${color} 100%)`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    ...animationStyle,
  };

  return (
    <span
      className={`shiny-text ${className}`}
      style={gradientStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </span>
  );
};

export default ShinyText;

