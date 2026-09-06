"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type Palette =
  | "midnight-gold"
  | "rose-ember"
  | "forest-sage"
  | "ocean-slate"
  | "noir-film"
  | "emerald-velvet"
  | "sunset-crimson"
  | "violet-luxury"
  | "golden-brown"
  | "champagne-cocoa"
  | "titanium-silver"
  | "titanium-gold";

export interface PaletteInfo {
  id: Palette;
  label: string;
  /** Preview swatch color for dark mode */
  swatchDark: string;
  /** Preview swatch color for light mode */
  swatchLight: string;
  /** Secondary accent swatch */
  accentSwatch: string;
}

export const PALETTES: PaletteInfo[] = [
  {
    id: "midnight-gold",
    label: "Midnight Gold",
    swatchDark: "#020912",
    swatchLight: "#fdfcf9",
    accentSwatch: "#c5a880",
  },
  {
    id: "golden-brown",
    label: "Golden Bronze",
    swatchDark: "#0a0705",
    swatchLight: "#faf5eb",
    accentSwatch: "#f3ce7e",
  },
  {
    id: "champagne-cocoa",
    label: "Champagne Cocoa",
    swatchDark: "#0B0A09",
    swatchLight: "#F4EFE6",
    accentSwatch: "#D6AE72",
  },
  {
    id: "titanium-silver",
    label: "Titanium Silver",
    swatchDark: "#080A0E",
    swatchLight: "#F8FAFC",
    accentSwatch: "#E2E8F0",
  },
  {
    id: "titanium-gold",
    label: "Titanium Gold",
    swatchDark: "#0B0C0E",
    swatchLight: "#FAF9F5",
    accentSwatch: "#E6C280",
  },
  {
    id: "rose-ember",
    label: "Rose Ember",
    swatchDark: "#0f0a0c",
    swatchLight: "#fdf6f4",
    accentSwatch: "#c48b8b",
  },
  {
    id: "forest-sage",
    label: "Forest Sage",
    swatchDark: "#060e0a",
    swatchLight: "#f4faf6",
    accentSwatch: "#8bac8b",
  },
  {
    id: "ocean-slate",
    label: "Ocean Slate",
    swatchDark: "#080c12",
    swatchLight: "#f4f7fd",
    accentSwatch: "#8b9fc4",
  },
  {
    id: "emerald-velvet",
    label: "Emerald Velvet",
    swatchDark: "#06120a",
    swatchLight: "#f4faf6",
    accentSwatch: "#4e9b72",
  },
  {
    id: "sunset-crimson",
    label: "Sunset Crimson",
    swatchDark: "#12070a",
    swatchLight: "#fdf6f4",
    accentSwatch: "#d66853",
  },
  {
    id: "violet-luxury",
    label: "Violet Luxury",
    swatchDark: "#0b0816",
    swatchLight: "#f7f4fd",
    accentSwatch: "#9b72cf",
  },
  {
    id: "noir-film",
    label: "Noir Film",
    swatchDark: "#000000",
    swatchLight: "#ffffff",
    accentSwatch: "#888888",
  },
];

interface ThemeContextType {
  theme: Theme;
  palette: Palette;
  setTheme: (theme: Theme) => void;
  setPalette: (palette: Palette) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  if (theme === "light") {
    root.classList.add("light");
    root.classList.remove("dark");
  } else {
    root.classList.add("dark");
    root.classList.remove("light");
  }
}

function applyPaletteToDOM(palette: Palette) {
  document.documentElement.setAttribute("data-palette", palette);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");
  const [palette, setPaletteState] = useState<Palette>("golden-brown");

  // On mount — read persisted values (or default to dark + golden-brown)
  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as Theme) || "dark";
    const savedPalette =
      (localStorage.getItem("palette") as Palette) || "golden-brown";

    setThemeState(savedTheme);
    setPaletteState(savedPalette);

    applyThemeToDOM(savedTheme);
    applyPaletteToDOM(savedPalette);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyThemeToDOM(newTheme);
  };

  const setPalette = (newPalette: Palette) => {
    setPaletteState(newPalette);
    localStorage.setItem("palette", newPalette);
    applyPaletteToDOM(newPalette);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider
      value={{ theme, palette, setTheme, setPalette, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
