"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Sun, Moon, X } from "lucide-react";
import { useTheme, PALETTES } from "@/components/theme-provider";

export function PaletteSwitcher() {
  const { theme, palette, setPalette, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 left-6 z-[9998] flex flex-col items-start gap-3"
    >
      {/* Expanded Palette Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border p-4 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] min-w-[220px]"
            style={{
              background:
                theme === "light"
                  ? "rgba(255,255,255,0.88)"
                  : "rgba(10,8,6,0.92)",
              borderColor:
                theme === "light"
                  ? "rgba(0,0,0,0.1)"
                  : "rgba(255,255,255,0.08)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[8.5px] tracking-[0.28em] uppercase font-sans font-bold"
                style={{ color: "var(--gold)", opacity: 0.7 }}
              >
                Color Palette
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-full transition-colors duration-200 cursor-pointer"
                style={{
                  color: "var(--foreground)",
                  opacity: 0.4,
                }}
                aria-label="Close palette picker"
              >
                <X size={12} />
              </button>
            </div>

            {/* Palette Swatches */}
            <div className="flex flex-col gap-1.5 mb-4 max-h-[340px] overflow-y-auto pr-1 scrollbar-thin">
              {PALETTES.map((p) => {
                const isActive = palette === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPalette(p.id)}
                    className="group flex items-center gap-3 w-full px-2.5 py-2 rounded-xl transition-all duration-300 cursor-pointer"
                    style={{
                      background: isActive
                        ? theme === "light"
                          ? "rgba(0,0,0,0.06)"
                          : "rgba(255,255,255,0.06)"
                        : "transparent",
                      border: isActive
                        ? `1px solid ${p.accentSwatch}40`
                        : "1px solid transparent",
                    }}
                    aria-label={`Switch to ${p.label} palette`}
                  >
                    {/* Dual swatch circle */}
                    <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                      <div
                        className="absolute inset-0 w-1/2 h-full"
                        style={{ background: p.swatchDark }}
                      />
                      <div
                        className="absolute right-0 top-0 w-1/2 h-full"
                        style={{ background: p.swatchLight }}
                      />
                      {/* Accent ring */}
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: `1.5px solid ${p.accentSwatch}`,
                          opacity: isActive ? 1 : 0.4,
                          transition: "opacity 0.3s ease",
                        }}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className="text-[10px] tracking-[0.12em] uppercase font-sans font-medium transition-colors duration-300"
                      style={{
                        color: isActive
                          ? p.accentSwatch
                          : "var(--foreground)",
                        opacity: isActive ? 1 : 0.55,
                      }}
                    >
                      {p.label}
                    </span>

                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="paletteActiveDot"
                        className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                        style={{
                          background: p.accentSwatch,
                          boxShadow: `0 0 8px ${p.accentSwatch}80`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div
              className="h-px w-full mb-3"
              style={{
                background:
                  theme === "light"
                    ? "rgba(0,0,0,0.08)"
                    : "rgba(255,255,255,0.06)",
              }}
            />

            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-xl transition-all duration-300 cursor-pointer"
              style={{
                background:
                  theme === "light"
                    ? "rgba(0,0,0,0.04)"
                    : "rgba(255,255,255,0.04)",
                border:
                  theme === "light"
                    ? "1px solid rgba(0,0,0,0.08)"
                    : "1px solid rgba(255,255,255,0.06)",
              }}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <div
                className="p-1.5 rounded-lg transition-colors duration-300"
                style={{
                  background:
                    theme === "light"
                      ? "rgba(0,0,0,0.08)"
                      : "rgba(255,255,255,0.08)",
                }}
              >
                {theme === "dark" ? (
                  <Sun size={12} style={{ color: "var(--gold)" }} />
                ) : (
                  <Moon size={12} style={{ color: "var(--gold)" }} />
                )}
              </div>
              <span
                className="text-[10px] tracking-[0.12em] uppercase font-sans font-medium"
                style={{ color: "var(--foreground)", opacity: 0.6 }}
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3 rounded-2xl backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 cursor-pointer"
        style={{
          background:
            theme === "light"
              ? "rgba(255,255,255,0.85)"
              : "rgba(15,12,10,0.85)",
          border:
            theme === "light"
              ? "1px solid rgba(0,0,0,0.1)"
              : "1px solid rgba(255,255,255,0.08)",
          color: "var(--gold)",
        }}
        aria-label="Open palette switcher"
      >
        <Palette size={18} />
        {/* Active palette accent dot indicator */}
        <span
          className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
          style={{
            background:
              PALETTES.find((p) => p.id === palette)?.accentSwatch ||
              "#c5a880",
            borderColor:
              theme === "light"
                ? "rgba(255,255,255,0.9)"
                : "rgba(15,12,10,0.9)",
          }}
        />
      </motion.button>
    </div>
  );
}
