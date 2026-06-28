"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { faqs } from "./data";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="px-6 py-24"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[10px] font-extrabold tracking-widest text-[var(--lime)]">
            Common Questions
          </p>
          <h2
             className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-balance"
            style={{ color: "var(--text-primary)" }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-[var(--border)] overflow-hidden transition-colors duration-200 cursor-pointer"
                style={{
                  background: "var(--bg-card)",
                  borderColor: isOpen
                    ? "rgba(200,241,53,0.3)"
                    : "var(--border)",
                }}
                onClick={() => toggle(idx)}
              >
                <div className="p-6 flex items-center justify-between">
                  <h4
                    className="text-xs font-extrabold uppercase tracking-wider"
                    style={{
                      color: isOpen ? "var(--lime)" : "var(--text-primary)",
                    }}
                  >
                    {faq.q}
                  </h4>
                  <div
                    className="w-5 h-5 flex items-center justify-center rounded-full border text-[10px] transition-all"
                    style={{
                      borderColor: isOpen ? "var(--lime)" : "var(--border)",
                      color: isOpen ? "var(--lime)" : "var(--text-secondary)",
                      background: isOpen
                        ? "rgba(200,241,53,0.05)"
                        : "transparent",
                    }}
                  >
                    {isOpen ? "−" : "＋"}
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6">
                        <p
                          className="text-[11px] leading-relaxed pl-4 border-l border-[rgba(200,241,53,0.2)]"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
