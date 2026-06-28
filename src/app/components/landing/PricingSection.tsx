"use client";

import Link from "next/link";
import { Check, Zap, Star } from "lucide-react";
import { tiers } from "./data";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative px-6 py-24  overflow-hidden"
      // style={{ background: "var(--bg-base)" }}
    >
      {/* Structural Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-[var(--lime-glow)] blur-[130px] pointer-events-none opacity-30 rounded-full" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[10px] font-extrabold tracking-widest text-[var(--lime)]">
            Flexible Plans
          </span>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-balance"
            style={{ color: "var(--text-primary)" }}
          >
            Simple, Transparent Pricing
          </h2>
          <p
            className="text-base md:text-md max-w-xl mx-auto text-pretty"
            style={{ color: "var(--text-secondary)" }}
          >
            Start free. Scale as you grow. No surprises, no lock-in contracts.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {tiers.map((tier) => {
            const isPopular = tier.popular;

            return (
              <div
                key={tier.name}
                className={`relative p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 group border ${
                  isPopular
                    ? "md:scale-[1.04] z-10 bg-[var(--bg-card)] border-[var(--lime)] shadow-[0_0_40px_var(--lime-glow)]"
                    : "bg-[var(--bg-card)]/60 backdrop-blur-sm border-[var(--border)] hover:border-[var(--text-muted)]"
                }`}
              >
                {/* Popular Badge Anchor */}
                {isPopular && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 text-[8px] tracking-widest font-extrabold uppercase rounded-full flex items-center gap-1.5 border border-[var(--lime)] shadow-[0_4px_12px_var(--lime-glow)]"
                    style={{
                      background: "var(--bg-base)",
                      color: "var(--lime)",
                    }}
                  >
                    <Star fill="currentColor" className="w-2.5 h-2.5" />
                    MOST POPULAR
                  </div>
                )}

                {/* Main Card Content Layer */}
                <div className="space-y-6">
                  {/* Tier Meta info */}
                  <div className="space-y-2">
                    <h3
                      className="text-sm font-extrabold uppercase tracking-widest"
                      style={{
                        color: isPopular
                          ? "var(--lime)"
                          : "var(--text-primary)",
                      }}
                    >
                      {tier.name}
                    </h3>
                    <p
                      className="text-[11px] leading-relaxed min-h-[32px]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {tier.desc}
                    </p>
                  </div>

                  {/* Financial Metrics Row */}
                  <div className="space-y-1">
                    <span
                      className="text-5xl font-black tracking-tighter"
                      style={{ color: "var(--text-primary)" }}
                    >
                      ${tier.price}
                    </span>
                    <p
                      className="text-[10px] uppercase tracking-wider"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {tier.price === "0"
                        ? "Forever free"
                        : "per month, billed annually"}
                    </p>
                  </div>

                  {/* Structural Divider */}
                  <div
                    className={`h-[1px] w-full ${isPopular ? "bg-[var(--lime)]/20" : "bg-[var(--border-muted)]"}`}
                  />

                  {/* Feature Checklist Framework */}
                  <ul className="space-y-3 text-[11px]">
                    {tier.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 group/item"
                      >
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors ${
                            isPopular
                              ? "text-[var(--lime)]"
                              : "text-[var(--text-muted)] group-hover/item:text-[var(--text-primary)]"
                          }`}
                        />
                        <span
                          style={{ color: "var(--text-secondary)" }}
                          className="leading-normal"
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Form Action Buttons Container */}
                <div className="pt-8">
                  <Link
                    href="/signup"
                    className={`w-full flex items-center justify-center py-3.5 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all duration-200 active:scale-[0.98] ${
                      isPopular
                        ? "bg-[var(--lime)] text-[var(--bg-base)] hover:shadow-[0_0_20px_var(--lime-glow)] hover:bg-[var(--lime-dim)]"
                        : "bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--text-muted)] hover:bg-[var(--bg-card)]"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
