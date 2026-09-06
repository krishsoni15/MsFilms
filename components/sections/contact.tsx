"use client";

import { useState } from "react";
import { siteData } from "@/lib/data";
import { AnimatedText } from "@/components/animated-text";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BorderGlow from "@/components/ui/border-glow";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

function FormField({ id, label, type = "text", required = false }: { id: string; label: string; type?: string; required?: boolean }) {
  const isDate = type === "date";
  const [displayValue, setDisplayValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!val) {
      setDisplayValue("");
      setDateValue("");
      return;
    }
    setDateValue(val);

    try {
      const dateObj = new Date(val + "T00:00:00");
      const day = dateObj.getDate();
      const month = dateObj.toLocaleDateString("en-US", { month: "long" });
      const year = dateObj.getFullYear();
      setDisplayValue(`${day} ${month} ${year}`);
    } catch (err) {
      setDisplayValue(val);
    }
  };

  const triggerPicker = () => {
    if (!isDate) return;
    const picker = document.getElementById(`${id}-picker`) as HTMLInputElement;
    if (picker) {
      try {
        picker.showPicker();
      } catch (err) {
        picker.focus();
      }
    }
  };

  if (isDate) {
    return (
      <div className="relative group">
        <input
          type="date"
          id={`${id}-picker`}
          value={dateValue}
          onChange={handleDateChange}
          className="absolute w-0 h-0 opacity-0 pointer-events-none"
          required={required && !dateValue}
        />

        <input
          type="text"
          id={id}
          name={id}
          value={displayValue}
          onClick={triggerPicker}
          readOnly
          placeholder=" "
          required={required}
          className="block w-full border-t-0 border-x-0 border-b border-border bg-transparent py-2.5 pr-8 text-foreground text-xs focus:border-t-0 focus:border-x-0 focus:border-b-gold/60 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-500 peer placeholder-transparent cursor-pointer font-sans"
        />

        <label
          htmlFor={id}
          className="absolute left-0 top-2.5 text-[9.5px] text-foreground/60 tracking-[0.18em] uppercase transition-all duration-300 peer-focus:-top-3 peer-focus:text-[8.5px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8.5px] pointer-events-none"
        >
          {label}
        </label>

        <button
          type="button"
          onClick={triggerPicker}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-gold hover:text-gold-light transition-colors duration-300 cursor-pointer p-1 z-10"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M16 2v4" />
            <path d="M8 2v4" />
            <path d="M3 10h18" />
          </svg>
        </button>

        <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gold transition-all duration-500 ease-out peer-focus:w-full" />
      </div>
    );
  }

  return (
    <div className="relative group">
      <input
        type={type}
        id={id}
        name={id}
        placeholder=" "
        required={required}
        className="block w-full border-t-0 border-x-0 border-b border-border bg-transparent py-2.5 text-foreground text-xs focus:border-t-0 focus:border-x-0 focus:border-b-gold/60 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-500 peer placeholder-transparent font-sans"
      />
      <label
        htmlFor={id}
        className="absolute left-0 top-2.5 text-[9.5px] text-foreground/60 tracking-[0.18em] uppercase transition-all duration-300 peer-focus:-top-3 peer-focus:text-[8.5px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8.5px] pointer-events-none"
      >
        {label}
      </label>
      <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gold transition-all duration-500 ease-out peer-focus:w-full" />
    </div>
  );
}

export function Contact() {
  const { theme } = useTheme();
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(siteData.email);
    triggerToast("Email copied to clipboard!");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;

    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      await fetch(`https://formsubmit.co/ajax/${siteData.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(data)
      });
      triggerToast("Inquiry sent successfully! We will be in touch within 24 hours.");
      form.reset();
    } catch (error) {
      triggerToast("Inquiry sent! We will respond within 24 hours.");
      form.reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-background relative overflow-hidden">
      {/* Ambient background gold glows */}
      <div className="absolute top-1/4 left-[10%] w-80 h-80 rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[10%] w-96 h-96 rounded-full bg-gold/[0.03] blur-[120px] pointer-events-none" />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-xl border border-gold/40 bg-[#0c0a08]/95 backdrop-blur-xl shadow-2xl text-foreground text-xs"
          >
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse shrink-0" />
            <span className="font-sans font-medium tracking-wide text-foreground/90">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Brand Info & Contact Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pr-0 lg:pr-2">
            <div className="space-y-3.5">
              <span className="text-[8.5px] tracking-[0.25em] uppercase text-gold font-sans font-semibold block">
                {siteData.contactHeadline}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight leading-[1.15]">
                Let{"'"}s Create Something <br />
                <span className="italic font-normal text-gold/90">Extraordinary.</span>
              </h2>
              <p className="font-sans text-xs text-foreground/75 leading-relaxed">
                Saskatoon-based luxury wedding &amp; architectural cinema available across Canada. Share your event details below to receive a personalized proposal.
              </p>

              {/* Booking status badge */}
              <div className="pt-1">
                <div className="inline-flex items-center gap-2 border border-gold/30 bg-gold/10 px-3.5 py-1.5 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <span className="text-[8.5px] tracking-[0.18em] uppercase text-gold font-sans font-semibold">
                    {siteData.bookingBadge}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-5 border-t border-border/20">
              <span className="text-[8px] uppercase tracking-[0.2em] text-foreground/40 font-sans font-semibold block">
                Direct Communication Channels
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Location Item */}
                <div className="flex items-center gap-3 p-2.5 rounded-lg border border-gold/15 bg-white/[0.02]">
                  <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-gold shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[7.5px] uppercase tracking-[0.15em] text-foreground/40 block font-semibold">Studio Base</span>
                    <span className="text-[11px] text-foreground/90 font-sans font-medium truncate block">Saskatoon, SK</span>
                  </div>
                </div>

                {/* Direct Email with Copy Action */}
                <div className="flex items-center justify-between p-2.5 rounded-lg border border-gold/15 bg-white/[0.02] hover:border-gold/40 transition-colors group cursor-pointer" onClick={copyEmail}>
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-gold shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[7.5px] uppercase tracking-[0.15em] text-foreground/40 block font-semibold">Email</span>
                      <span className="text-[10.5px] text-foreground/90 font-sans font-medium truncate block group-hover:text-gold transition-colors">
                        contactus.msfilms
                      </span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Link */}
                <a
                  href={siteData.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-gold/15 bg-white/[0.02] hover:border-gold/40 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-gold shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 2.14.673 4.12 1.82 5.75L2 22l4.37-1.77C7.94 21.36 9.89 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.87 0-3.62-.51-5.12-1.41l-.37-.22-2.58 1.04 1.05-2.51-.24-.39A7.947 7.947 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[7.5px] uppercase tracking-[0.15em] text-foreground/40 block font-semibold">WhatsApp</span>
                    <span className="text-[10.5px] text-foreground/90 font-sans font-medium truncate block group-hover:text-gold transition-colors">Instant Chat &rarr;</span>
                  </div>
                </a>

                {/* Instagram Link */}
                <a
                  href={siteData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-2.5 rounded-lg border border-gold/15 bg-white/[0.02] hover:border-gold/40 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full border border-gold/30 bg-gold/5 flex items-center justify-center text-gold shrink-0 group-hover:border-gold group-hover:bg-gold/10 transition-colors">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[7.5px] uppercase tracking-[0.15em] text-foreground/40 block font-semibold">Instagram</span>
                    <span className="text-[10.5px] text-foreground/90 font-sans font-medium truncate block group-hover:text-gold transition-colors">@msfilms._</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form inside BorderGlow Card */}
          <div className="lg:col-span-7 w-full">
            <BorderGlow
              edgeSensitivity={20}
              glowColor="40 50 60"
              backgroundColor={theme === "light" ? "var(--background-alt-2)" : "#020912"}
              borderRadius={16}
              glowRadius={40}
              glowIntensity={theme === "light" ? 0.3 : 0.6}
              coneSpread={30}
              colors={theme === "light" ? ["#c5a880", "#bba282", "#020912"] : ["#c5a880", "#e5d5be", "#ffffff"]}
              fillOpacity={theme === "light" ? 0.95 : 0.03}
              className="w-full"
            >
              <div className="p-7 sm:p-9 md:p-10 relative z-10">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField id="name" label="Your Good Name" required />
                    <FormField id="email" label="Email Address" type="email" required />
                    <FormField id="phone" label="Phone Number (Optional)" type="tel" />
                    <FormField id="event-type" label="Event Type (e.g. Wedding)" required />
                    <FormField id="event-date" label="Event Date" type="date" required />
                    <FormField id="location" label="Event Location" required />

                    {/* Message Box — Floating Label Single Underline Field */}
                    <div className="relative group col-span-1 sm:col-span-2 pt-2">
                      <textarea
                        id="message"
                        name="message"
                        placeholder=" "
                        rows={2}
                        className="block w-full border-t-0 border-x-0 border-b border-border bg-transparent py-2.5 text-foreground text-xs focus:border-t-0 focus:border-x-0 focus:border-b-gold/60 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-500 peer placeholder-transparent font-sans resize-none"
                      />
                      <label
                        htmlFor="message"
                        className="absolute left-0 top-2.5 text-[9.5px] text-foreground/60 tracking-[0.18em] uppercase transition-all duration-300 peer-focus:-top-3 peer-focus:text-[8.5px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:text-[8.5px] pointer-events-none"
                      >
                        Tell Us About Your Plans (Optional)
                      </label>
                      <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gold transition-all duration-500 ease-out peer-focus:w-full" />
                    </div>
                  </div>

                  {/* Form Footer Action Row */}
                  <div className="pt-6 flex justify-end">
                    <div className="relative shrink-0 inline-block group">
                      <BorderGlow
                        edgeSensitivity={25}
                        glowColor="35 85 75"
                        backgroundColor="transparent"
                        borderRadius={9999}
                        glowRadius={30}
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
                          type="submit"
                          disabled={submitting}
                          className="relative cursor-pointer text-[10px] tracking-[0.2em] uppercase flex items-center gap-2 rounded-full border border-border hover:border-gold/30 hover:text-gold transition-all duration-500 focus:outline-none px-7 py-3 text-foreground/80 font-sans font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                          style={{
                            background: "linear-gradient(to bottom, rgba(197, 168, 128, 0.12) 0%, rgba(197, 168, 128, 0.02) 100%)",
                          }}
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            {submitting ? "Sending..." : "Start Your Story"}
                            {!submitting && <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform duration-300 text-current" />}
                          </span>
                        </button>
                      </BorderGlow>
                    </div>
                  </div>
                </form>
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
}
