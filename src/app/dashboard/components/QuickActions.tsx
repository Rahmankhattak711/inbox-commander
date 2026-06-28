"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface QuickAction {
  href: string;
  label: string;
  sublabel: string;
  icon: ReactNode;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div
      className="rounded-3xl p-6 md:p-8"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
          Quick Actions
        </h3>
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
          style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--lime)";
            e.currentTarget.style.color = "var(--lime)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
        >
          <span>+ New</span>
        </button>
      </div>

      <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action, i) => (
          <Link
            key={i}
            href={action.href}
            className="group flex items-center justify-between p-3 -mx-3 rounded-2xl transition-all"
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: "rgba(200,241,53,0.08)", color: "var(--lime)" }}
              >
                {action.icon}
              </div>
              <div>
                <p className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
                  {action.label}
                </p>
                <p className="text-[11px] font-medium mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {action.sublabel}
                </p>
              </div>
            </div>

            <div
              className="w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
              style={{ background: "var(--lime)", color: "var(--bg-base)" }}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
