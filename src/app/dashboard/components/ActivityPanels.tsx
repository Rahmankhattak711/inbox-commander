"use client";

import Link from "next/link";

type ParsedEmail = {
  id: string;
  to: string;
  subject: string;
  body: string;
  date: string;
};

type ParsedEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
};

interface ActivityPanelsProps {
  upcomingEvents: ParsedEvent[];
  recentEmails: ParsedEmail[];
  recentDrafts: ParsedEmail[];
  todayKey: string;
  eventsFetching: boolean;
  emailsFetching: boolean;
  draftsFetching: boolean;
}

function Spinner({ color }: { color: string }) {
  return (
    <svg className="animate-spin h-3.5 w-3.5" style={{ color }} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function LoadingRow({ text, color }: { text: string; color: string }) {
  return (
    <div className="py-8 flex justify-center">
      <div className="flex items-center gap-2 text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
        <Spinner color={color} />
        {text}
      </div>
    </div>
  );
}

function EmptyRow({ text }: { text: string }) {
  return (
    <div className="py-10 flex flex-col items-center justify-center text-center">
      <p className="text-[12px] font-medium" style={{ color: "var(--text-muted)" }}>
        {text}
      </p>
    </div>
  );
}

export default function ActivityPanels({
  upcomingEvents,
  recentEmails,
  recentDrafts,
  todayKey,
  eventsFetching,
  emailsFetching,
  draftsFetching,
}: ActivityPanelsProps) {
  return (
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
            <LoadingRow text="Loading events..." color="var(--lime)" />
          ) : upcomingEvents.length === 0 ? (
            <EmptyRow text="No upcoming events" />
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="group flex items-center gap-4 p-3 -mx-3 rounded-2xl transition-all cursor-pointer"
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div
                  className="flex flex-col items-center justify-center w-10 h-10 rounded-full shrink-0"
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
                  <span className="text-[9px] px-2.5 py-1 rounded-full font-bold shrink-0" style={{ background: "rgba(200,241,53,0.15)", color: "var(--lime)" }}>
                    Today
                  </span>
                ) : (
                  <span className="text-[9px] px-2.5 py-1 rounded-full font-bold shrink-0" style={{ background: "var(--bg-card)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
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
            <LoadingRow text="Loading emails..." color="#60d4f0" />
          ) : recentEmails.length === 0 ? (
            <EmptyRow text="No sent emails yet" />
          ) : (
            recentEmails.map((email) => (
              <Link
                key={email.id}
                href="/gmail"
                className="group flex items-center gap-4 p-3 -mx-3 rounded-2xl transition-all"
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
            <LoadingRow text="Loading drafts..." color="#c084fc" />
          ) : recentDrafts.length === 0 ? (
            <EmptyRow text="No drafts yet" />
          ) : (
            recentDrafts.map((draft) => (
              <Link
                key={draft.id}
                href="/gmail?tab=drafts"
                className="group flex items-center gap-4 p-3 -mx-3 rounded-2xl transition-all"
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
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
    </div>
  );
}
