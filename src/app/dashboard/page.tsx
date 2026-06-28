"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useGmailDraft, useGmailDrafts } from "@/hooks/useCreateGmailDraft";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { parseGmailMessage } from "@/app/gmail/component/gmail-utils";
import { useMemo } from "react";

export default function Dashboard() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
  });

  const { emails, isFetching: emailsFetching } = useGmailDraft();
  const { drafts, isFetching: draftsFetching } = useGmailDrafts();
  const { events, isFetching: eventsFetching } = useCalendarEvents();

  const user = session?.data?.user;

  const today = new Date();
  const todayKey = today.toISOString().split("T")[0];

  const todayEvents = useMemo(
    () => events.filter((e: any) => e.date === todayKey),
    [events, todayKey]
  );

  const upcomingEvents = useMemo(
    () => events.filter((e: any) => e.date >= todayKey).slice(0, 3),
    [events, todayKey]
  );

  const recentEmails = useMemo(
    () =>
      emails
        .slice(0, 4)
        .map((email: Parameters<typeof parseGmailMessage>[0]) =>
          parseGmailMessage(email),
        ),
    [emails],
  );

  const recentDrafts = useMemo(
    () =>
      drafts
        .slice(0, 4)
        .map((draft: Parameters<typeof parseGmailMessage>[0]) =>
          parseGmailMessage(draft),
        ),
    [drafts],
  );

  const isLoadingStats = emailsFetching || draftsFetching || eventsFetching;

  const greeting = useMemo(() => {
    const h = today.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  const stats = [
    {
      label: "Today's Events",
      value: todayEvents.length,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "#c8f135",
      bg: "rgba(200,241,53,0.06)",
      borderColor: "rgba(200,241,53,0.12)",
    },
    {
      label: "Total Sent",
      value: emails.length,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
      color: "#60d4f0",
      bg: "rgba(96,212,240,0.06)",
      borderColor: "rgba(96,212,240,0.12)",
    },
    {
      label: "Drafts",
      value: drafts.length,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
      color: "#c084fc",
      bg: "rgba(192,132,252,0.06)",
      borderColor: "rgba(192,132,252,0.12)",
    },
    {
      label: "Upcoming",
      value: events.filter((e: any) => e.date >= todayKey).length,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "#f0a060",
      bg: "rgba(240,160,96,0.06)",
      borderColor: "rgba(240,160,96,0.12)",
    },
  ];

  const quickActions = [
    {
      href: "/chat",
      label: "Compose Email",
      sublabel: "AI-Assisted",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
    },
    {
      href: "/calendar",
      label: "New Event",
      sublabel: "Schedule Now",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      ),
    },
    {
      href: "/gmail",
      label: "Sent Emails",
      sublabel: "View History",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      href: "/gmail?tab=drafts",
      label: "Gmail Drafts",
      sublabel: "Edit & Send",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
      ),
    },
    {
      href: "/gmail?tab=purchases",
      label: "Purchases",
      sublabel: "Order Receipts",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
    },
    {
      href: "/calendar",
      label: "Calendar",
      sublabel: "All Events",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="flex-1 antialiased px-8 py-10 max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-500"
      style={{ color: "var(--text-primary)" }}
    >
      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl p-8 md:p-10"
        style={{
          background: "linear-gradient(135deg, rgba(200,241,53,0.06) 0%, rgba(200,241,53,0.02) 40%, var(--bg-surface) 100%)",
          border: "1px solid rgba(200,241,53,0.1)",
        }}
      >
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl pointer-events-none"
          style={{ background: "rgba(200,241,53,0.06)" }}
        />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-2xl pointer-events-none"
          style={{ background: "rgba(200,241,53,0.03)" }}
        />

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {user?.image ? (
              <div className="relative">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover shrink-0"
                  style={{ outline: "2px solid rgba(200,241,53,0.2)", outlineOffset: "2px" }}
                />
                <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--lime)" }} />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 border-2" style={{ background: "var(--lime)", borderColor: "var(--bg-surface)" }} />
                </span>
              </div>
            ) : (
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-extrabold shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(200,241,53,0.15), rgba(200,241,53,0.05))",
                  border: "1px solid rgba(200,241,53,0.2)",
                  color: "var(--lime)",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {greeting},
              </p>
              <h1 className="text-2xl font-extrabold tracking-tight mt-0.5" style={{ color: "var(--text-primary)" }}>
                {user?.name || "Commander"}
              </h1>
              <p className="text-[11px] font-mono mt-1 flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                <span>{user?.email}</span>
                <span className="w-1 h-1 rounded-full" style={{ background: "var(--text-muted)" }} />
                <span style={{ color: "var(--lime)" }}>
                  {new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric" }).format(today)}
                </span>
              </p>
            </div>
          </div>

          {/* System status pill */}
          <div
            className="flex items-center gap-3 px-5 py-3 rounded-2xl self-start"
            style={{
              background: "rgba(200,241,53,0.04)",
              border: "1px solid rgba(200,241,53,0.1)",
            }}
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--lime)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--lime)" }} />
            </span>
            <div>
              <p className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--text-secondary)" }}>
                System Status
              </p>
              <p className="text-[10px] font-mono font-bold" style={{ color: "var(--lime)" }}>
                ALL SERVICES ONLINE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative group p-5 rounded-2xl transition-all duration-300 overflow-hidden"
            style={{
              background: "var(--bg-surface)",
              border: `1px solid ${stat.borderColor}`,
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle at 50% 50%, ${stat.bg}, transparent 70%)` }}
            />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--text-secondary)" }}>
                  {stat.label}
                </p>
                <p className="text-3xl font-extrabold tracking-tight mt-1" style={{ color: stat.color }}>
                  {isLoadingStats ? (
                    <span className="inline-block w-8 h-8 rounded-lg animate-pulse" style={{ background: stat.bg }} />
                  ) : (
                    stat.value
                  )}
                </p>
              </div>
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                style={{ background: stat.bg, border: `1px solid ${stat.borderColor}`, color: stat.color }}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts & Analytics ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-[9px] font-extrabold uppercase tracking-widest font-mono" style={{ color: "var(--text-secondary)" }}>
            Analytics
          </h3>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        <div className="grid gap-5 lg:grid-cols-3">

          {/* ── Bar Chart: Weekly Analytics ── */}
          <div
            className="lg:col-span-2 rounded-3xl p-6 md:p-8 space-y-8 flex flex-col justify-between"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
          >
            <div>
              <p className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>Project Analytics</p>
            </div>

            {/* HTML/CSS Bar Chart */}
            <div className="flex-1 flex items-end justify-between h-40 md:h-48 mt-2 relative gap-2 sm:gap-6 pb-6 px-2">
              {(() => {
                const days = ["S", "M", "T", "W", "T", "F", "S"];
                const styles = [
                  { type: "striped" },
                  { type: "solid", color: "#233d18" },
                  { type: "solid", color: "var(--lime)", tooltip: "14%" },
                  { type: "solid", color: "#233d18" },
                  { type: "striped" },
                  { type: "striped" },
                  { type: "striped" },
                ];

                return days.map((day, i) => {
                  const s = styles[i];
                  return (
                    <div key={i} className="relative flex flex-col items-center justify-end h-full w-full max-w-[64px]">
                      {s.tooltip && (
                        <div className="absolute -top-12 flex flex-col items-center z-10 pointer-events-none drop-shadow-xl">
                          <div className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: "var(--bg-card)", color: "var(--lime)", border: "1px solid var(--border)" }}>
                            {s.tooltip}
                          </div>
                          <div className="w-2 h-2 rotate-45 -mt-1.5 border-b border-r" style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}></div>
                        </div>
                      )}

                      <div
                        className="w-full h-full rounded-full transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                        style={{
                          background: s.type === "striped"
                            ? "repeating-linear-gradient(45deg, transparent, transparent 6px, var(--border) 6px, var(--border) 8px)"
                            : s.color,
                          border: s.type === "striped" ? "2px solid var(--border)" : "none",
                        }}
                      />

                      <span className="absolute -bottom-7 text-sm font-bold" style={{ color: "var(--text-muted)", fontFamily: "var(--font-poppins)" }}>
                        {day}
                      </span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

          {/* ── Semi-Circle Gauge: Project Progress ── */}
          <div
            className="rounded-3xl p-6 md:p-8 flex flex-col justify-between"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
          >
            <div>
              <p className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>Inbox Health</p>
            </div>

            {(() => {
              // Dynamically calculate based on real data
              const total = emails.length + drafts.length;
              const progressPct = total > 0 ? Math.round((emails.length / total) * 100) : 0;

              // SVG semi-circle gauge calculations
              const cx = 150, cy = 140, r = 100;
              const circumf = Math.PI * r;
              const filled = (circumf * progressPct) / 100;

              return (
                <div className="flex flex-col items-center gap-8 mt-4">
                  <div className="relative w-full flex justify-center">
                    <svg width="100%" height="150" viewBox="0 0 300 150" className="overflow-visible">
                      <defs>
                        <pattern id="diagonalHatchGauge" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                          <line x1="0" y1="0" x2="0" y2="8" stroke="var(--border)" strokeWidth="3" />
                        </pattern>
                      </defs>

                      {/* Background Striped Track */}
                      <path
                        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                        fill="none"
                        stroke="url(#diagonalHatchGauge)"
                        strokeWidth="36"
                        strokeLinecap="round"
                      />

                      {/* Foreground Filled Track */}
                      <path
                        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                        fill="none"
                        stroke="#233d18"
                        strokeWidth="36"
                        strokeLinecap="round"
                        strokeDasharray={`${circumf} ${circumf}`}
                      />
                      <path
                        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                        fill="none"
                        stroke="var(--lime)"
                        strokeWidth="36"
                        strokeLinecap="round"
                        strokeDasharray={`${filled} ${circumf}`}
                      />

                      {/* Center Label */}
                      <text x={cx} y={cy - 15} textAnchor="middle" fill="var(--text-primary)" fontSize="48" fontWeight="900" fontFamily="var(--font-poppins)">{progressPct}%</text>
                      <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontWeight="bold">Emails Sent</text>
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap items-center justify-center gap-4 w-full">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: "var(--lime)" }} />
                      <span className="text-[11px] font-bold text-[var(--text-secondary)]">Sent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: "#233d18" }} />
                      <span className="text-[11px] font-bold text-[var(--text-secondary)]">Drafts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ background: "var(--bg-surface)", border: "2px solid var(--border)" }} />
                      <span className="text-[11px] font-bold text-[var(--text-secondary)]">Total</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* ── Sparkline: Event Trend ── */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[9px] font-extrabold uppercase tracking-widest font-mono" style={{ color: "var(--text-secondary)" }}>Activity Trend</p>
              <p className="text-lg font-extrabold mt-0.5" style={{ color: "var(--text-primary)" }}>Last 12 Hours</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-extrabold" style={{ color: "var(--lime)" }}>{events.length}</p>
              <p className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>total events</p>
            </div>
          </div>
          {/* Sparkline SVG */}
          {(() => {
            const W = 700, H = 60;
            const base = events.length || 0;
            const pts  = Array.from({ length: 13 }, (_, i) => Math.max(0, Math.round(base * (0.3 + Math.sin(i * 0.8) * 0.4 + Math.random() * 0.3))));
            const max  = Math.max(...pts, 1);
            const xs   = pts.map((_, i) => (i / (pts.length - 1)) * W);
            const ys   = pts.map(v => H - (v / max) * (H - 8) - 4);
            const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
            const fill = `${path} L${W},${H} L0,${H} Z`;
            return (
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: "60px" }} preserveAspectRatio="none">
                <title>Activity sparkline</title>
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#c8f135" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#c8f135" stopOpacity="0"    />
                  </linearGradient>
                </defs>
                <path d={fill} fill="url(#sparkGrad)" />
                <path d={path} fill="none" stroke="#c8f135" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
                {xs.map((x, i) => (
                  <circle key={i} cx={x} cy={ys[i]} r="3" fill="#c8f135" opacity={i === pts.length - 1 ? 1 : 0.4} />
                ))}
              </svg>
            );
          })()}
          <div className="flex justify-between mt-1">
            {["12h ago","10h","8h","6h","4h","2h","Now"].map(l => (
              <span key={l} className="text-[8px] font-mono" style={{ color: "var(--text-muted)" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Tools */}
      <div
        className="rounded-3xl p-6 md:p-8 mt-6"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Quick Actions
          </h3>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
            style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--lime)"; e.currentTarget.style.color = "var(--lime)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
          >
            <span>+ New</span>
          </button>
        </div>

        <div className="grid gap-x-8 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="group flex items-center justify-between p-3 -mx-3 rounded-2xl transition-all"
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
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

      {/* Activity Panels */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Upcoming Events ── */}
        <div
          className="rounded-3xl p-6 md:p-8 flex flex-col gap-5"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Upcoming Events
            </h3>
            <Link
              href="/calendar"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
              style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--lime)"; e.currentTarget.style.color = "var(--lime)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            >
              + Add
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            {eventsFetching && upcomingEvents.length === 0 ? (
              <div className="py-8 flex justify-center">
                <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
                  <svg className="animate-spin h-3.5 w-3.5" style={{ color: "var(--lime)" }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading events...
                </div>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <p className="text-[12px] font-medium" style={{ color: "var(--text-muted)" }}>No upcoming events</p>
              </div>
            ) : (
              upcomingEvents.map((event: any) => (
                <div
                  key={event.id}
                  className="group flex items-center gap-4 p-3 -mx-3 rounded-2xl transition-all cursor-pointer"
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div className="flex flex-col items-center justify-center w-10 h-10 rounded-full shrink-0"
                    style={{
                      background: event.date === todayKey ? "var(--lime)" : "rgba(200,241,53,0.08)",
                      color: event.date === todayKey ? "var(--bg-base)" : "var(--lime)",
                    }}
                  >
                    <span className="text-[9px] font-extrabold uppercase -mb-0.5">
                      {new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(`${event.date}T00:00:00`))}
                    </span>
                    <span className="text-xs font-black">
                      {new Date(`${event.date}T00:00:00`).getDate()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold truncate" style={{ color: "var(--text-primary)" }}>
                      {event.title}
                    </p>
                    <p className="text-[11px] font-medium mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
                      {event.time}
                    </p>
                  </div>
                  {event.date === todayKey ? (
                    <span
                      className="text-[9px] px-2.5 py-1 rounded-full font-bold shrink-0"
                      style={{ background: "rgba(200,241,53,0.15)", color: "var(--lime)" }}
                    >
                      Today
                    </span>
                  ) : (
                    <span
                      className="text-[9px] px-2.5 py-1 rounded-full font-bold shrink-0"
                      style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}
                    >
                      Upcoming
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Recent Sent ── */}
        <div
          className="rounded-3xl p-6 md:p-8 flex flex-col gap-5"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Recent Sent
            </h3>
            <Link
              href="/gmail"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
              style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#60d4f0"; e.currentTarget.style.color = "#60d4f0"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            >
              + View
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            {emailsFetching && recentEmails.length === 0 ? (
              <div className="py-8 flex justify-center">
                <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
                  <svg className="animate-spin h-3.5 w-3.5" style={{ color: "#60d4f0" }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading emails...
                </div>
              </div>
            ) : recentEmails.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <p className="text-[12px] font-medium" style={{ color: "var(--text-muted)" }}>No sent emails yet</p>
              </div>
            ) : (
              recentEmails.map((email: ReturnType<typeof parseGmailMessage>) => (
                <Link
                  key={email.id}
                  href="/gmail"
                  className="group flex items-center gap-4 p-3 -mx-3 rounded-2xl transition-all"
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-extrabold uppercase"
                    style={{ background: "rgba(96,212,240,0.08)", color: "#60d4f0" }}
                  >
                    {email.to.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold truncate" style={{ color: "var(--text-primary)" }}>
                      {email.subject}
                    </p>
                    <p className="text-[11px] font-medium mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
                      To: {email.to}
                    </p>
                  </div>
                  <span
                    className="text-[9px] px-2.5 py-1 rounded-full font-bold shrink-0"
                    style={{ background: "rgba(96,212,240,0.15)", color: "#60d4f0" }}
                  >
                    Sent
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* ── Recent Drafts ── */}
        <div
          className="rounded-3xl p-6 md:p-8 flex flex-col gap-5"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Recent Drafts
            </h3>
            <Link
              href="/gmail?tab=drafts"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors"
              style={{ border: "1px solid var(--border)", color: "var(--text-primary)" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#c084fc"; e.currentTarget.style.color = "#c084fc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-primary)"; }}
            >
              + Draft
            </Link>
          </div>

          <div className="flex flex-col gap-1">
            {draftsFetching && recentDrafts.length === 0 ? (
              <div className="py-8 flex justify-center">
                <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
                  <svg className="animate-spin h-3.5 w-3.5" style={{ color: "#c084fc" }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading drafts...
                </div>
              </div>
            ) : recentDrafts.length === 0 ? (
              <div className="py-10 flex flex-col items-center justify-center text-center">
                <p className="text-[12px] font-medium" style={{ color: "var(--text-muted)" }}>No drafts yet</p>
              </div>
            ) : (
              recentDrafts.map((draft: ReturnType<typeof parseGmailMessage>) => (
                <Link
                  key={draft.id}
                  href="/gmail?tab=drafts"
                  className="group flex items-center gap-4 p-3 -mx-3 rounded-2xl transition-all"
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-extrabold uppercase"
                    style={{ background: "rgba(192,132,252,0.08)", color: "#c084fc" }}
                  >
                    {draft.to.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold truncate" style={{ color: "var(--text-primary)" }}>
                      {draft.subject}
                    </p>
                    <p className="text-[11px] font-medium mt-0.5 truncate" style={{ color: "var(--text-secondary)" }}>
                      To: {draft.to}
                    </p>
                  </div>
                  <span
                    className="text-[9px] px-2.5 py-1 rounded-full font-bold shrink-0"
                    style={{ background: "rgba(240,160,96,0.15)", color: "#f0a060" }}
                  >
                    Pending
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>      </div>
  );
}
