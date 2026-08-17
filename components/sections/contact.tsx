"use client";

import { useState } from "react";
import { siteData } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

function FormField({ id, label, type = "text", required = false }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="relative group">
      <input
        type={type}
        id={id}
        name={id}
        placeholder=" "
        required={required}
        className="block w-full border-b border-foreground/15 bg-transparent py-4 text-foreground text-sm focus:border-foreground/60 focus:outline-none transition-colors duration-500 peer placeholder-transparent"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-4 text-[11px] text-foreground/35 tracking-[0.15em] uppercase transition-all duration-300 peer-focus:-top-3 peer-focus:text-[9px] peer-focus:text-foreground/50 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[9px]"
      >
        {label}
      </label>
      {/* Gold focus line animation */}
      <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 ease-out peer-focus:w-full" />
    </div>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-5 md:px-10 lg:px-16 bg-background">
      <div className="max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
          {/* Left — Invitation */}
          <div className="lg:col-span-5">
            <AnimatedText as="p" className="text-[10px] tracking-[0.25em] uppercase text-foreground/40 mb-6">
              {siteData.contactHeadline}
            </AnimatedText>

            <ScrollReveal
              baseOpacity={0.05}
              preset="scale"
              textClassName="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6"
              rotationEnd="bottom center+=20%"
              wordAnimationEnd="bottom center+=45%"
            >
              Get in Touch
            </ScrollReveal>

            <AnimatedText as="p" delay={0.3} className="font-sans text-sm text-foreground/50 leading-relaxed mb-8">
              {siteData.contactText}
            </AnimatedText>

            {/* Booking Badge */}
            <AnimatedText as="div" delay={0.4}>
              <div className="inline-flex items-center gap-2 border border-gold/40 px-4 py-2 mb-12">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold/80 font-sans">
                  {siteData.bookingBadge}
                </span>
              </div>
            </AnimatedText>

            {/* Contact Info */}
            <AnimatedText as="div" delay={0.5} className="space-y-4">
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/25 mb-1">Location</p>
                <p className="text-sm text-foreground/60">{siteData.location}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.2em] uppercase text-foreground/25 mb-1">Email</p>
                <a href={`mailto:${siteData.email}`} className="text-sm text-foreground/60 hover:text-gold transition-colors editorial-link editorial-link-gold">
                  {siteData.email}
                </a>
              </div>
            </AnimatedText>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-6 lg:col-start-7">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-10"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <FormField id="name" label="Your Name" required />
                    <FormField id="email" label="Email" type="email" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <FormField id="phone" label="Phone" type="tel" />
                    <FormField id="event-type" label="Event Type" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <FormField id="event-date" label="Event Date (MM-DD-YYYY)" />
                    <FormField id="location" label="Location" />
                  </div>
                  <FormField id="budget" label="Estimated Budget (Optional)" />

                  <div className="relative group">
                    <textarea
                      id="message"
                      name="message"
                      placeholder=" "
                      rows={3}
                      className="block w-full border-b border-foreground/15 bg-transparent py-4 text-foreground text-sm focus:border-foreground/60 focus:outline-none transition-colors duration-500 peer placeholder-transparent resize-none"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-4 text-[11px] text-foreground/35 tracking-[0.15em] uppercase transition-all duration-300 peer-focus:-top-3 peer-focus:text-[9px] peer-focus:text-foreground/50 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[9px]"
                    >
                      Tell us about your plans
                    </label>
                    <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 ease-out peer-focus:w-full" />
                  </div>

                  <button
                    type="submit"
                    className="relative inline-flex items-center gap-4 bg-foreground text-background px-11 py-[18px] text-[12px] tracking-[0.25em] uppercase overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left pointer-events-none" />
                    <span className="relative z-10 group-hover:text-foreground transition-colors duration-500">Start Your Story</span>
                    <ArrowRight size={14} className="relative z-10 transform group-hover:translate-x-1.5 group-hover:text-foreground transition-all duration-300" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col items-start justify-center min-h-[300px]"
                >
                  <h3 className="font-display text-3xl md:text-4xl mb-4">Thank you.</h3>
                  <p className="font-display text-xl italic text-foreground/50 mb-8">
                    Your story is on its way to us.
                  </p>
                  <p className="text-sm text-foreground/40">
                    We&apos;ll be in touch within 24–48 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
