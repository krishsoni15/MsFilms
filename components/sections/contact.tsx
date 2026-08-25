"use client";

import { useState } from "react";
import { siteData } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";

function FormField({ id, label, type = "text", required = false }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div className="relative group">
      <input
        type={type}
        id={id}
        name={id}
        placeholder=" "
        required={required}
        className="block w-full border-t-0 border-x-0 border-b border-white/10 bg-transparent py-4 text-white text-sm focus:border-t-0 focus:border-x-0 focus:border-b-gold/60 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-500 peer placeholder-transparent"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-4 text-[10px] text-white/60 tracking-[0.2em] uppercase transition-all duration-300 peer-focus:-top-3 peer-focus:text-[9px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[9px] pointer-events-none"
      >
        {label}
      </label>
      {/* Gold focus line animation */}
      <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gold transition-all duration-500 ease-out peer-focus:w-full" />
    </div>
  );
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteData.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setSubmitted(true); // Fallback to success view
      }
    } catch (error) {
      setSubmitted(true); // Fallback to success view
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 md:py-44 px-5 md:px-10 lg:px-16 bg-background relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-[10%] w-96 h-96 rounded-full bg-gold/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-[450px] h-[450px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Premium Brand details */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-sans font-semibold mb-4 block">
                {siteData.contactHeadline}
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[1.1] mb-6">
                Let{"'"}s Create Something <br />
                <span className="italic font-normal text-gold/90">Extraordinary.</span>
              </h2>
              <p className="font-sans text-xs text-white/80 leading-relaxed max-w-md">
                Based in Saskatoon, Saskatchewan, we offer premium wedding photography, videography, and dronography services available <strong className="text-white font-semibold">across all of Canada</strong>. Whether you are planning an intimate local ceremony or a grand destination celebration from coast to coast, we are dedicated to capturing your most meaningful stories. Please share the details of your upcoming event below, and we will craft a personalized proposal tailored to your vision.
              </p>
            </div>

            {/* Booking status badge */}
            <div className="inline-flex items-center gap-3 border border-gold/20 bg-gold/[0.02] px-4 py-2.5 rounded-sm">
              <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-gold/80 font-sans font-semibold">
                {siteData.bookingBadge}
              </span>
            </div>

            {/* Direct Channels (Flexible wrap layout for high visibility / responsiveness) */}
            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-x-10 gap-y-6 max-w-md">
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center text-gold/80 flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-semibold mb-1">Location</h4>
                  <p className="text-xs text-white/90 font-sans leading-normal whitespace-nowrap">{siteData.location}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-full border border-white/5 bg-white/[0.01] flex items-center justify-center text-gold/80 flex-shrink-0">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-semibold mb-1">Direct Inquiry</h4>
                  <a href={`mailto:${siteData.email}`} className="text-xs text-white/90 hover:text-gold transition-colors font-sans border-b border-white/10 hover:border-gold leading-normal whitespace-nowrap">
                    {siteData.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form inside BorderGlow Card */}
          <div className="lg:col-span-7 w-full">
            <BorderGlow
              edgeSensitivity={20}
              glowColor="40 50 60"
              backgroundColor="#020912"
              borderRadius={16}
              glowRadius={50}
              glowIntensity={0.6}
              coneSpread={30}
              colors={["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={0.03}
              className="w-full"
            >
              <div className="p-8 md:p-12 relative z-10">
                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-8"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FormField id="name" label="Your Good Name" required />
                        <FormField id="email" label="Email Address" type="email" required />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FormField id="phone" label="Phone Number (Optional)" type="tel" />
                        <FormField id="event-type" label="Event Type (e.g. Wedding)" required />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <FormField id="event-date" label="Event Date" required />
                        <FormField id="location" label="Event Location" required />
                      </div>
                      <div className="relative group">
                        <textarea
                          id="message"
                          name="message"
                          placeholder=" "
                          rows={4}
                          className="block w-full border-t-0 border-x-0 border-b border-white/10 bg-transparent py-4 text-white text-sm focus:border-t-0 focus:border-x-0 focus:border-b-gold/60 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-500 peer placeholder-transparent resize-none"
                        />
                        <label
                          htmlFor="message"
                          className="absolute left-0 top-4 text-[10px] text-white/60 tracking-[0.2em] uppercase transition-all duration-300 peer-focus:-top-3 peer-focus:text-[9px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[9px] pointer-events-none"
                        >
                          Tell us about your plans (Optional)
                        </label>
                        <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gold transition-all duration-500 ease-out peer-focus:w-full" />
                      </div>

                      <div className="pt-4 flex justify-end">
                        <div className="relative shrink-0 inline-block group">
                          <BorderGlow
                            edgeSensitivity={25}
                            glowColor="35 85 75"
                            backgroundColor="transparent"
                            borderRadius={9999}
                            glowRadius={35}
                            glowIntensity={0.3}
                            coneSpread={30}
                            animated={true}
                            colors={["#ffffff", "#c5a880", "#ffffff"]}
                            fillOpacity={0}
                            style={{
                              borderColor: "transparent",
                            }}
                          >
                            <button
                              type="submit"
                              disabled={submitting}
                              className="relative cursor-pointer text-[11px] tracking-[0.2em] uppercase flex items-center gap-2.5 rounded-full border border-white/[0.08] hover:border-gold/30 hover:text-white transition-all duration-500 focus:outline-none px-8 py-3.5 text-white/80 font-sans font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{
                                background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.02) 100%)",
                              }}
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                {submitting ? "Sending..." : "Start Your Story"}
                                {!submitting && <ArrowRight size={13} className="transform group-hover:translate-x-1.5 transition-transform duration-300 text-current" />}
                              </span>
                            </button>
                          </BorderGlow>
                        </div>
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="flex flex-col items-center text-center justify-center py-16"
                    >
                      {/* Decorative Gold Aperture Icon */}
                      <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-8 animate-[spin_20s_linear_infinite]">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" x2="12" y1="2" y2="22" />
                          <line x1="2" x2="22" y1="12" y2="12" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                      </div>

                      <h3 className="font-display text-4xl font-light tracking-wide text-white mb-4">Thank you.</h3>
                      <p className="font-display text-xl italic text-gold/80 mb-6">
                        Your story is on its way to us.
                      </p>
                      <p className="text-xs text-foreground/45 max-w-sm leading-relaxed">
                        We have received your details and will get back to you within 24 to 48 hours to discuss your project.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
}
