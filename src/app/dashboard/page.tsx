"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useGmailDraft } from "@/hooks/useCreateGmailDraft";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { useMemo } from "react";
import Chat from "../chat/page";

export default function Dashboard() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
  });

  const { emails, isFetching: emailsFetching } = useGmailDraft();
  const { events, isFetching: eventsFetching } = useCalendarEvents();

  const user = session?.data?.user;

  // Compute live stats
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

  const recentEmails = useMemo(() => emails.slice(0, 4), [emails]);

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
      <div className="grid gap-4 sm:grid-cols-3">
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
                  {(emailsFetching || eventsFetching) ? (
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

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-[9px] font-extrabold uppercase tracking-widest font-mono" style={{ color: "var(--text-secondary)" }}>
            Quick Actions
          </h3>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {quickActions.map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="group relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl text-center transition-all duration-300 overflow-hidden"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(200,241,53,0.25)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,241,53,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(200,241,53,0.06)",
                  border: "1px solid rgba(200,241,53,0.12)",
                  color: "var(--lime)",
                }}
              >
                {action.icon}
              </div>
              <div>
                <p className="text-[11px] font-bold" style={{ color: "var(--text-primary)" }}>
                  {action.label}
                </p>
                <p className="text-[9px] font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {action.sublabel}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Activity Panels */}
      <div className="grid gap-5 lg:grid-cols-2">
        {/* Upcoming Events */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(200,241,53,0.06)", border: "1px solid rgba(200,241,53,0.12)", color: "var(--lime)" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
                  Upcoming Events
                </h3>
              </div>
            </div>
            <Link
              href="/calendar"
              className="text-[9px] font-bold uppercase tracking-widest transition hover:opacity-80"
              style={{ color: "var(--lime)" }}
            >
              View All →
            </Link>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border-muted)" }}>
            {eventsFetching && upcomingEvents.length === 0 ? (
              <div className="p-6 flex justify-center">
                <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
                  <svg className="animate-spin h-3.5 w-3.5" style={{ color: "var(--lime)" }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading events...
                </div>
              </div>
            ) : upcomingEvents.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <p className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>No upcoming events</p>
                <Link href="/calendar" className="mt-2 text-[10px] font-bold" style={{ color: "var(--lime)" }}>
                  + Create Event
                </Link>
              </div>
            ) : (
              upcomingEvents.map((event: any) => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 px-6 py-4 transition-colors duration-150 hover:bg-[rgba(200,241,53,0.02)]"
                >
                  <div className="flex flex-col items-center justify-center w-11 h-11 rounded-xl shrink-0"
                    style={{
                      background: event.date === todayKey ? "rgba(200,241,53,0.1)" : "var(--bg-card)",
                      border: `1px solid ${event.date === todayKey ? "rgba(200,241,53,0.2)" : "var(--border)"}`,
                    }}
                  >
                    <span className="text-[8px] font-extrabold uppercase tracking-widest"
                      style={{ color: event.date === todayKey ? "var(--lime)" : "var(--text-muted)" }}
                    >
                      {new Intl.DateTimeFormat("en-US", { month: "short" }).format(new Date(`${event.date}T00:00:00`))}
                    </span>
                    <span className="text-sm font-extrabold -mt-0.5"
                      style={{ color: event.date === todayKey ? "var(--lime)" : "var(--text-primary)" }}
                    >
                      {new Date(`${event.date}T00:00:00`).getDate()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>
                      {event.title}
                    </p>
                    <p className="text-[10px] font-mono mt-0.5" style={{ color: "var(--text-secondary)" }}>
                      {event.time}
                    </p>
                  </div>
                  {event.date === todayKey && (
                    <span
                      className="text-[8px] px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest shrink-0"
                      style={{
                        background: "rgba(200,241,53,0.08)",
                        border: "1px solid rgba(200,241,53,0.15)",
                        color: "var(--lime)",
                      }}
                    >
                      Today
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Sent Emails */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "rgba(96,212,240,0.06)", border: "1px solid rgba(96,212,240,0.12)", color: "#60d4f0" }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>
                  Recent Sent
                </h3>
              </div>
            </div>
            <Link
              href="/gmail"
              className="text-[9px] font-bold uppercase tracking-widest transition hover:opacity-80"
              style={{ color: "#60d4f0" }}
            >
              View All →
            </Link>
          </div>

          <div className="divide-y" style={{ borderColor: "var(--border-muted)" }}>
            {emailsFetching && recentEmails.length === 0 ? (
              <div className="p-6 flex justify-center">
                <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
                  <svg className="animate-spin h-3.5 w-3.5" style={{ color: "#60d4f0" }} viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Loading emails...
                </div>
              </div>
            ) : recentEmails.length === 0 ? (
              <div className="p-8 flex flex-col items-center justify-center text-center">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </div>
                <p className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>No sent emails yet</p>
                <Link href="/chat" className="mt-2 text-[10px] font-bold" style={{ color: "#60d4f0" }}>
                  Compose with AI →
                </Link>
              </div>
            ) : (
              recentEmails.map((email: any) => {
                const headers = email.payload?.headers || [];
                const h = (name: string) => (headers.find((x: any) => x.name.toLowerCase() === name.toLowerCase())?.value ?? "");
                const to = h("to") || "(No Recipient)";
                const subject = h("subject") || "(No Subject)";
                const snippet = email.snippet
                  ? email.snippet.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
                  : "";
                const dateHeader = h("date");
                const dateStr = dateHeader
                  ? new Date(dateHeader).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                  : email.internalDate
                    ? new Date(Number(email.internalDate)).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                    : "";

                return (
                  <Link
                    key={email.id}
                    href="/gmail"
                    className="flex items-start gap-4 px-6 py-4 transition-colors duration-150 hover:bg-[rgba(96,212,240,0.02)]"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-extrabold uppercase"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {to.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>
                          {subject}
                        </p>
                        <span className="text-[9px] font-mono shrink-0" style={{ color: "var(--text-muted)" }}>
                          {dateStr}
                        </span>
                      </div>
                      <p className="text-[10px] font-mono truncate mt-0.5" style={{ color: "var(--text-secondary)" }}>
                        To: {to}
                      </p>
                      {snippet && (
                        <p className="text-[10px] truncate mt-1" style={{ color: "var(--text-muted)" }}>
                          {snippet}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Chat Module — full width */}
      {/* <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-[9px] font-extrabold uppercase tracking-widest font-mono" style={{ color: "var(--text-secondary)" }}>
            AI Commander
          </h3>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <Link
            href="/chat"
            className="text-[9px] font-bold uppercase tracking-widest transition hover:opacity-80"
            style={{ color: "var(--lime)" }}
          >
            Open Full View →
          </Link>
        </div>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          <Chat />
        </div>
      </div> */}
    </div>
  );
}
