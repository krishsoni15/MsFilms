"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import Link from "next/link";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "What makes MS Films' storytelling approach unique?",
    answer:
      "We prioritize unscripted, authentic emotions over stiff, artificial posing. We blend editorial art direction with documentary candid filming. Our goal is to create a timeless visual heirloom that reflects your unique personalities and quiet moments.",
  },
  {
    id: "faq-2",
    question: "Do you offer combined wedding photography and videography packages in Saskatoon and across Canada?",
    answer:
      "Yes! Our team works in complete harmony to cover both photography and 4K cinematic films simultaneously. This guarantees unified color tones, seamless timing, and zero conflict between photographer and filmmaker on your big day.",
  },
  {
    id: "faq-3",
    question: "Are aerial drone photos and drone videos included in your packages?",
    answer:
      "High-altitude aerial dronography is integrated into our wedding films whenever venue airspace regulations and weather conditions safely permit. We operate fully licensed drone flights across Saskatchewan and all of Canada.",
  },
  {
    id: "faq-4",
    question: "Do you travel across Saskatchewan, Alberta, Ontario, and destination venues in Canada?",
    answer:
      "Absolutely. While our team is based in Saskatoon, we provide services and travel all across Canada — including Regina, Banff, Calgary, Lake Louise, Toronto, Vancouver, and destination venues nationwide.",
  },
  {
    id: "faq-5",
    question: "How long after our wedding will we receive our photos and cinematic film?",
    answer:
      "We deliver a highlight sneak peek photo gallery within 48 to 72 hours of your wedding so you can share your initial joy. Your complete, color-graded high-resolution gallery and edited 4K film are delivered within 6 to 8 weeks.",
  },
  {
    id: "faq-6",
    question: "How do we secure our wedding date with MSFilms?",
    answer:
      "Simply reach out through our contact form. Once we confirm date availability, a 25% retainer and signed digital agreement will lock in your date for 2026–2027.",
  },
];

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative w-full py-20 lg:py-28 bg-background border-t border-border overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] tracking-[0.3em] uppercase font-sans font-semibold mb-4">
            <HelpCircle size={12} className="text-gold" />
            <span>Story & Service Insights</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-foreground font-normal tracking-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="font-sans text-xs sm:text-sm text-foreground/60 leading-relaxed max-w-md mx-auto">
            Everything you need to know about our storytelling process, travel availability, and film delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-gold/50 bg-gold/[0.03] shadow-lg shadow-gold/5"
                    : "border-border/60 bg-secondary/20 hover:border-border"
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                >
                  <span className="font-serif text-lg sm:text-xl text-foreground font-normal pr-4 group-hover:text-gold transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-gold text-neutral-950 border-gold rotate-180"
                        : "border-border text-foreground/70 group-hover:border-gold group-hover:text-gold"
                    }`}
                  >
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 font-sans text-xs sm:text-sm text-foreground/75 leading-relaxed border-t border-gold/10">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Contact Assistance Callout */}
        <div className="mt-12 text-center bg-secondary/40 border border-border/80 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-serif text-xl text-foreground mb-1 font-normal">
              Have a custom vision or destination venue in mind?
            </h3>
            <p className="font-sans text-xs text-foreground/60">
              We tailor custom photography & videography packages to match your exact itinerary.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-neutral-950 font-sans text-[10px] tracking-[0.2em] uppercase font-bold px-6 py-3 rounded-full transition-all shadow-md"
          >
            <MessageCircle size={13} />
            <span>Ask Us Anything</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
