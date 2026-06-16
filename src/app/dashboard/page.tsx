"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Dashboard() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
  });

  const user = session?.data?.user;

  const cards = [
    {
      href: "/calendar",
      label: "Google Calendar",
      description: "Review upcoming events, create new appointments, and clear outdated calendar entries.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: "/gmail",
      label: "Gmail Drafts",
      description: "Compose new email drafts, scan saved messages, and clean up old drafts.",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1a2 2 0 00-2-2H4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex-1 antialiased px-8 py-10 max-w-5xl w-full mx-auto space-y-10 animate-in fade-in duration-300" style={{ color: "var(--text-primary)" }}>
      {/* Header */}
      <div className="pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
          Control Center
        </span>
        <h1 className="text-2xl font-extrabold tracking-tight mt-1" style={{ color: "var(--text-primary)" }}>
          Command Dashboard
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
          Monitor your synced Google accounts and access automation modules.
        </p>
      </div>

      {/* Profile + Status */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Profile */}
        <div
          className="flex items-center gap-5 p-6 rounded-2xl"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          {user?.image ? (
            <img src={user.image} alt={user.name} className="w-14 h-14 rounded-full object-cover shrink-0" style={{ outline: "2px solid var(--border)" }} />
          ) : (
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold shrink-0"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--lime)" }}
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
              Active Session
            </span>
            <h2 className="text-sm font-bold truncate mt-0.5" style={{ color: "var(--text-primary)" }}>
              {user?.name || "System Operator"}
            </h2>
            <p className="text-[10px] truncate font-mono" style={{ color: "var(--text-secondary)" }}>
              {user?.email}
            </p>
          </div>
        </div>

        {/* System Status */}
        <div
          className="flex flex-col justify-between p-6 rounded-2xl"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--text-secondary)" }}>
                System Status
              </span>
              <h3 className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>
                Multi-Tenant Router
              </h3>
            </div>
            <span className="flex h-2 w-2 relative mt-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--lime)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--lime)" }} />
            </span>
          </div>
          <p className="text-[10px] font-mono mt-4" style={{ color: "var(--text-secondary)" }}>
            Corsair Engine: <span style={{ color: "var(--lime)" }}>ONLINE</span>
          </p>
        </div>
      </div>

      {/* Module Cards */}
      <div className="space-y-4">
        <h3 className="text-[9px] font-extrabold uppercase tracking-widest font-mono" style={{ color: "var(--text-secondary)" }}>
          Modules
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block p-6 rounded-2xl transition-all duration-200 space-y-4"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(200,241,53,0.3)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{ background: "rgba(200,241,53,0.06)", border: "1px solid rgba(200,241,53,0.15)", color: "var(--lime)" }}
              >
                {card.icon}
              </div>
              <div>
                <h4 className="text-xs font-extrabold tracking-wide uppercase" style={{ color: "var(--text-primary)" }}>
                  {card.label}
                </h4>
                <p className="text-[11px] leading-relaxed mt-1" style={{ color: "var(--text-secondary)" }}>
                  {card.description}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--lime)" }}>
                Open Module
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
