"use client";

import { Inbox } from "lucide-react";

export default function UnifiedInboxFeature() {
  return (
    <section
      id="features"
      className="px-6 py-12 md:py-16"
      style={{ background: "var(--bg-base)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Side - Copy & Details */}
        <div className="flex-1 space-y-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[10px] font-extrabold tracking-widest text-[var(--lime)]">
              <Inbox className="w-4 h-4" />
              <span>Unified Inbox</span>
            </div>

            <h2
              className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-balance"
              style={{ color: "var(--text-primary)" }}
            >
              Your inbox, the way it should have always worked.
            </h2>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-lg text-pretty">
              Inbox Commander pulls Gmail into a focused reading pane with smart
              category tabs, real-time previews, and bulk actions. Every message
              visible. Nothing buried three clicks deep.
            </p>
          </div>

          <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
            {[
              "Primary, Updates, and Promotions tabs built in",
              "Bulk select and delete in one keystroke",
              "Full-text search across your entire inbox history",
              "Threaded conversation view with complete context",
            ].map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[var(--text-muted)] mt-0.5">•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - App Mockup */}
        <div className="flex-1 w-full max-w-lg lg:max-w-none lg:w-auto">
          <div className="relative w-full rounded-2xl overflow-hidden border border-[var(--border-muted)] bg-[var(--bg-surface)]/80">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border-muted)]">
              <div className="flex items-center gap-3">
                <span className="text-sm font-extrabold tracking-widest uppercase text-[var(--text-secondary)]">
                  Inbox
                </span>
                <span className="w-5 h-5 flex items-center justify-center rounded bg-[var(--bg-surface)] border border-[var(--border-muted)] text-[10px] font-bold text-[var(--text-secondary)]">
                  5
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="text-[var(--text-primary)] cursor-pointer">
                  Primary
                </span>
                <span className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors">
                  Updates
                </span>
                <span className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer transition-colors">
                  Other
                </span>
              </div>
            </div>

            {/* Email List */}
            <div className="flex flex-col">
              {[
                {
                  name: "Sarah Chen",
                  initial: "S",
                  subject: "Q3 investor update deck",
                  snippet: "I have attached the revised slides...",
                  time: "9:41 AM",
                  unread: true,
                },
                {
                  name: "Marcus Reed",
                  initial: "M",
                  subject: "Re: Partnership proposal",
                  snippet: "Thanks for sending this over...",
                  time: "8:15 AM",
                  unread: true,
                },
                {
                  name: "Notion",
                  initial: "N",
                  subject: "Your workspace summary",
                  snippet: "Here are highlights from this week...",
                  time: "Yesterday",
                  unread: false,
                },
                {
                  name: "Alex Kim",
                  initial: "A",
                  subject: "Quick sync tomorrow?",
                  snippet: "Hey, do you have 20 minutes to...",
                  time: "Yesterday",
                  unread: false,
                },
                {
                  name: "GitHub",
                  initial: "G",
                  subject: "New security advisory",
                  snippet: "A vulnerability has been reported...",
                  time: "Mon",
                  unread: false,
                },
              ].map((email, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 border-b border-[var(--border-muted)] last:border-0 hover:bg-[var(--bg-surface)]/30 transition-colors cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-full bg-[var(--bg-surface)] border border-[var(--border-muted)] flex items-center justify-center text-xs font-bold text-[var(--text-primary)] shrink-0 group-hover:border-[var(--border)] transition-colors">
                    {email.initial}
                  </div>
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center justify-between mb-0.5">
                      <span
                        className={`text-sm truncate ${email.unread ? "text-[var(--text-primary)] font-bold" : "text-[var(--text-secondary)] font-medium"}`}
                      >
                        {email.name}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] shrink-0">
                        {email.time}
                      </span>
                    </div>
                    <div
                      className={`text-sm truncate mb-0.5 ${email.unread ? "text-[var(--text-primary)] font-medium" : "text-[var(--text-secondary)]"}`}
                    >
                      {email.subject}
                    </div>
                    <div className="text-xs text-[var(--text-muted)] truncate">
                      {email.snippet}
                    </div>
                  </div>
                  {email.unread && (
                    <div className="flex items-center self-stretch justify-center pr-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
