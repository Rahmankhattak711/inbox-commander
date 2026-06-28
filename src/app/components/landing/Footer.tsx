"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="px-6 py-16 text-[13px] border-t border-[var(--border-muted)]"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">

          {/* Brand Presentation Meta Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-12"
                style={{
                  background: "var(--lime)",
                  boxShadow: "0 0 15px var(--lime-glow)",
                }}
              >
                <svg
                  className="w-3 h-3 text-[var(--bg-base)]"
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
                className="text-[14px] font-bold tracking-tight text-[var(--text-primary)]"
              >
                Inbox Commander
              </span>
            </div>

            <p className="leading-relaxed max-w-sm text-[var(--text-secondary)]">
              AI-native email and calendar workspace for people who move fast.
            </p>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* PRODUCT */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)]">
                Product
              </h4>
              <ul className="space-y-3">
                {["Features", "Changelog", "Roadmap"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)]">
                Company
              </h4>
              <ul className="space-y-3">
                {["About", "Blog", "Careers"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LEGAL */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)]">
                Legal
              </h4>
              <ul className="space-y-3">
                {["Privacy", "Terms", "Security"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SOCIALS */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)]">
                Socials
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://x.com/Rahmankhat51083" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-muted)] group-hover:border-[var(--lime)] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                      </svg>
                    </span>
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Rahmankhattak711" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-muted)] group-hover:border-[var(--lime)] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                      </svg>
                    </span>
                    GitHub
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/rahman-khattak/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group">
                    <span className="w-5 h-5 rounded flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border-muted)] group-hover:border-[var(--lime)] transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                        <rect x="2" y="9" width="4" height="12"></rect>
                        <circle cx="4" cy="4" r="2"></circle>
                      </svg>
                    </span>
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Structural Section Divider */}
        <div className="h-[1px] w-full bg-[var(--border-muted)] opacity-50" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)]">
          <div>
            &copy; {new Date().getFullYear()} Inbox Commander. All rights reserved.
          </div>
          <div>
            Built for people who actually ship.
          </div>
        </div>
      </div>
    </footer>
  );
}
