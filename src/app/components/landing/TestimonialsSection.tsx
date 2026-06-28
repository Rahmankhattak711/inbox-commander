"use client";

import { motion, useReducedMotion } from "motion/react";
import { testimonials } from "./data";

function TestimonialCard({
  t,
}: {
  t: {
    quote: string;
    author: string;
    role: string;
    company: string;
    metrics: string;
  };
}) {
  return (
    <div
      className="p-6 rounded-2xl border flex flex-col justify-between space-y-4 overflow-hidden relative"
      style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      {/* Stars */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-1.5">
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              style={{ color: "var(--lime)", display: "inline-block" }}
              initial={{ opacity: 0, y: -4 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              viewport={{ once: true }}
            >
              ★
            </motion.span>
          ))}
        </div>
        <p
          className="text-[12px] leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Footer */}
      <div className="relative z-10 pt-4 border-t border-[var(--border)] flex items-center justify-between">
        <div>
          <div
            className="text-xs font-extrabold"
            style={{ color: "var(--text-primary)" }}
          >
            {t.author}
          </div>
          <div className="text-[10px] opacity-60 truncate max-w-[160px]">
            {t.role} <span style={{ color: "var(--lime)" }}>·</span> {t.company}
          </div>
        </div>
        <div className="text-[9px] text-[var(--lime)] text-right">
          {t.metrics}
        </div>
      </div>
    </div>
  );
}

/** Infinite vertical marquee driven by Motion — no CSS keyframes needed */
function MarqueeColumn({
  items,
  direction,
  duration,
  className = "",
}: {
  items: (typeof testimonials)[number][];
  direction: "up" | "down";
  duration: number;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  const doubled = [...items, ...items];
  // "down" = cards appear from top → animate from 0 to -50%
  // "up"   = cards appear from bottom → animate from -50% to 0
  const fromY = direction === "down" ? "0%" : "-50%";
  const toY = direction === "down" ? "-50%" : "0%";

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex flex-col gap-5"
        animate={shouldReduce ? undefined : { y: [fromY, toY] }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {doubled.map((t, idx) => (
          <TestimonialCard key={`${direction}-${idx}`} t={t} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="reviews"
      className="px-6 py-24 "
      // style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-6xl mx-auto space-y-14">
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[10px] font-extrabold tracking-widest"
            style={{ color: "var(--lime)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          >
           -- Operator Intelligence
          </motion.span>
          <motion.h2
            className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-balance"
            style={{ color: "var(--text-primary)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Deployed By Elite Engineering Teams.
          </motion.h2>
          <motion.p
            className="text-base md:text-md max-w-xl mx-auto text-pretty"
            style={{ color: "var(--text-secondary)" }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            See how leading teams use Inbox Commander to cut email noise and
            deliver with confidence.
          </motion.p>
        </motion.div>

        {/* Three-column marquee powered by Motion: down · up · down */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          style={{
            height: "640px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          {/* Col 1 — down, 30s */}
          <MarqueeColumn
            items={testimonials.slice(0, 5)}
            direction="down"
            duration={30}
          />

          {/* Col 2 — up, 24s */}
          <MarqueeColumn
            items={testimonials.slice(2, 8)}
            direction="up"
            duration={24}
            className="hidden md:block"
          />

          {/* Col 3 — down, 36s */}
          <MarqueeColumn
            items={testimonials.slice(4)}
            direction="down"
            duration={36}
            className="hidden md:block"
          />
        </motion.div>
      </div>
    </section>
  );
}
