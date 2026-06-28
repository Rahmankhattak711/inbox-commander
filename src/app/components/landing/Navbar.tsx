"use client";

import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      {/* Floating Capsule Wrapper Container */}
      <div
        className="max-w-6xl mx-auto rounded-full border border-[var(--border)] backdrop-blur-xl px-4 sm:px-6 py-2.5 flex items-center justify-between pointer-events-auto transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
        style={{
          background: "rgba(10, 15, 8, 0.75)", // Sophisticated transparent OLED dark profile
        }}
      >
        {/* Left Side: Brand Identity */}
        <div className="flex items-center gap-2.5 group cursor-pointer">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-12"
            style={{
              background: "var(--lime)",
              boxShadow: "0 0 15px var(--lime-glow)",
            }}
          >
            <svg
              className="w-3.5 h-3.5 text-[var(--bg-base)]"
              aria-hidden="true"
              focusable="false"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <title>Inbox Commander logo</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span
            className="text-[11px] font-black tracking-widest uppercase transition-colors group-hover:text-[var(--lime)]"
            style={{ color: "var(--text-primary)" }}
          >
            Inbox Commander
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {[
            "Features",
            "Control Room",
            "Specs",
            "Reviews",
            "Pricing",
            "FAQ",
          ].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase().replace(/ /g, "-")}`}
              className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative group/link py-1"
            >
              {label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[var(--lime)] transition-all duration-300 group-hover/link:w-full opacity-80" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="h-4 w-[1px] bg-[var(--border-muted)] hidden sm:block" />

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all duration-300 active:scale-[0.96]"
              style={{ background: "var(--lime)", color: "var(--bg-base)" }}
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </Link>
          </div>

          {/* Micro Mobile Menu Trigger View Toggle */}
          <button
            className="md:hidden text-[var(--text-primary)] p-1"
            aria-label="Open primary layout tracking system"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
