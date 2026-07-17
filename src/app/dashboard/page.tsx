"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Command,
  FilePenLine,
  Mail,
  MessageSquareText,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import {
  type ParsedGmailMessage,
  parseGmailMessage,
} from "@/app/gmail/component/gmail-utils";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import {
  useGmailDraft,
  useGmailDrafts,
  useGmailFolder,
} from "@/hooks/useCreateGmailDraft";
import { useInboxTriage } from "@/hooks/useInboxTriage";
import { authClient } from "@/lib/auth-client";
import DashboardCharts from "./components/DashboardCharts";

const glassCard = "rounded-2xl border border-white/[0.09] bg-white/[0.025]";

function formatToday(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default function Dashboard() {
  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
  });
  const { emails, isFetching: sentLoading } = useGmailDraft();
  const { drafts, isFetching: draftsLoading } = useGmailDrafts();
  const { emails: inbox, isFetching: inboxLoading } = useGmailFolder("inbox");
  const { events, isFetching: eventsLoading } = useCalendarEvents();

  const now = new Date();
  const todayKey = now.toISOString().slice(0, 10);
  const user = session?.data?.user;
  const parsedInbox = useMemo<ParsedGmailMessage[]>(
    () =>
      inbox.map((email: Parameters<typeof parseGmailMessage>[0]) =>
        parseGmailMessage(email),
      ),
    [inbox],
  );
  const { triage, isTriageLoading } = useInboxTriage(
    parsedInbox.map(({ id, subject, from, snippet }) => ({
      id,
      subject,
      from,
      snippet,
    })),
    true,
  );
  const triageById = useMemo(
    () => new Map(triage.map((item) => [item.id, item])),
    [triage],
  );
  const priorityCounts = useMemo(
    () =>
      parsedInbox.reduce(
        (counts, email) => {
          const priority = triageById.get(email.id)?.priority ?? "routine";
          counts[priority] += 1;
          return counts;
        },
        { urgent: 0, important: 0, routine: 0 },
      ),
    [parsedInbox, triageById],
  );
  const prioritizedInbox = useMemo(
    () =>
      [...parsedInbox].sort((first, second) => {
        const order = { urgent: 0, important: 1, routine: 2 };
        return (
          order[triageById.get(first.id)?.priority ?? "routine"] -
          order[triageById.get(second.id)?.priority ?? "routine"]
        );
      }),
    [parsedInbox, triageById],
  );
  const todayEvents = useMemo(
    () => events.filter((event) => event.date === todayKey),
    [events, todayKey],
  );
  const upcomingEvents = useMemo(
    () => events.filter((event) => event.date >= todayKey).slice(0, 4),
    [events, todayKey],
  );
  const greeting =
    now.getHours() < 12
      ? "Good morning"
      : now.getHours() < 17
        ? "Good afternoon"
        : "Good evening";
  const topPriority = prioritizedInbox[0];
  const topPriorityTriage = topPriority
    ? triageById.get(topPriority.id)
    : undefined;
  const loading = inboxLoading || eventsLoading || draftsLoading || sentLoading;

  const metrics = [
    {
      label: "Inbox to review",
      value: inbox.length,
      detail: "AI prioritized",
      icon: Mail,
    },
    {
      label: "Meetings today",
      value: todayEvents.length,
      detail: "Calendar synced",
      icon: CalendarDays,
    },
    {
      label: "Drafts ready",
      value: drafts.length,
      detail: "Waiting for review",
      icon: FilePenLine,
    },
    {
      label: "Sent this week",
      value: emails.length,
      detail: "Recent activity",
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-full bg-[#080a0a] px-5 py-6 text-[#f4f7f5] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
              OPENAI EXECUTIVE WORKSPACE
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] sm:text-4xl">
              {greeting}, {user?.name?.split(" ")[0] || "there"}.
            </h1>
            <p className="mt-2 text-sm text-[#94a199]">
              {formatToday(now)} · Your briefing is ready.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/gmail?tab=inbox"
              className="rounded-xl border border-white/[0.1] bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-[#dce5df] transition hover:bg-white/[0.07]"
            >
              Open inbox
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-3.5 py-2.5 text-xs font-semibold text-[#08100c] transition hover:bg-emerald-200"
            >
              <Sparkles className="size-3.5" aria-hidden="true" />
              Ask Commander
            </Link>
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-emerald-200/15 bg-gradient-to-br from-emerald-300/[0.1] via-[#121813] to-[#0d100e] p-6 sm:p-8">
          <div className="pointer-events-none absolute right-0 top-0 size-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-emerald-300/[0.14] blur-[85px]" />
          <div className="relative grid gap-7 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-300/[0.08] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-emerald-200">
                <Sparkles className="size-3" aria-hidden="true" />
                Daily briefing
              </div>
              <h2 className="mt-5 max-w-xl text-balance text-3xl font-semibold tracking-[-0.045em]">
                Your attention is best spent on what changes the day.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#a4b1a9]">
                Commander has reviewed your connected inbox and calendar to
                surface the highest-value next move.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="rounded-lg border border-white/[0.09] bg-black/15 px-3 py-2 text-xs text-[#c9d4cd]">
                  {todayEvents.length} meetings today
                </span>
                <span className="rounded-lg border border-white/[0.09] bg-black/15 px-3 py-2 text-xs text-[#c9d4cd]">
                  {inbox.length} inbox messages
                </span>
                <span className="rounded-lg border border-white/[0.09] bg-black/15 px-3 py-2 text-xs text-[#c9d4cd]">
                  {drafts.length} drafts waiting
                </span>
              </div>
            </div>
            <div className="rounded-2xl border border-white/[0.1] bg-[#0a0d0b]/80 p-5 shadow-xl shadow-black/20 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-200">
                  Commander alert
                </p>
                <span className="flex size-7 items-center justify-center rounded-lg bg-emerald-300 text-[#08100c]">
                  <Command className="size-4" aria-hidden="true" />
                </span>
              </div>
              {topPriority ? (
                <>
                  <p className="mt-5 text-xs text-[#8f9d95]">
                    {topPriorityTriage?.priority === "urgent"
                      ? "Urgent attention"
                      : "Highest priority email"}
                  </p>
                  <p className="mt-1 text-base font-medium leading-snug">
                    {topPriority.subject}
                  </p>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[#8f9d95]">
                    {topPriorityTriage?.summary || topPriority.snippet}
                  </p>
                  <Link
                    href="/gmail?tab=inbox"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200 hover:text-emerald-100"
                  >
                    Review message{" "}
                    <ArrowRight className="size-3.5" aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <>
                  <p className="mt-5 text-base font-medium">Inbox is clear.</p>
                  <p className="mt-2 text-sm text-[#8f9d95]">
                    Connect Gmail to receive proactive Commander alerts here.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map(({ label, value, detail, icon: Icon }) => (
            <article
              key={label}
              className={`${glassCard} p-5 transition hover:-translate-y-0.5 hover:border-emerald-200/20`}
            >
              <div className="flex items-start justify-between">
                <span className="text-[11px] text-[#8e9a92]">{label}</span>
                <span className="flex size-8 items-center justify-center rounded-lg border border-emerald-200/15 bg-emerald-300/[0.08] text-emerald-200">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
              </div>
              <p className="mt-7 text-3xl font-semibold tracking-[-0.04em]">
                {loading ? (
                  <span className="inline-block h-7 w-10 animate-pulse rounded bg-white/[0.08]" />
                ) : (
                  value
                )}
              </p>
              <p className="mt-1 text-xs text-[#6f7d75]">{detail}</p>
            </article>
          ))}
        </section>

        <DashboardCharts
          inboxCount={inbox.length}
          draftsCount={drafts.length}
          sentCount={emails.length}
          events={events}
          priorityCounts={priorityCounts}
          todayKey={todayKey}
          isLoading={loading || isTriageLoading}
        />

        <section className="grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
          <div className={`${glassCard} overflow-hidden`}>
            <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm font-medium">Priority queue</p>
                <p className="mt-1 text-xs text-[#748178]">
                  AI-ranked inbox items that deserve attention.
                </p>
              </div>
              <Link
                href="/gmail?tab=inbox"
                className="text-xs font-medium text-emerald-200 hover:text-emerald-100"
              >
                View inbox
              </Link>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {inboxLoading || isTriageLoading ? (
                <div className="p-6 text-sm text-[#718077]">
                  Commander is reviewing your inbox…
                </div>
              ) : prioritizedInbox.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#718077]">
                  No inbox items to review.
                </div>
              ) : (
                prioritizedInbox.slice(0, 4).map((email) => {
                  const item = triageById.get(email.id);
                  return (
                    <div
                      key={email.id}
                      className="group flex gap-4 px-5 py-4 transition hover:bg-white/[0.025] sm:px-6"
                    >
                      <span
                        className={`mt-1.5 size-2 shrink-0 rounded-full ${item?.priority === "urgent" ? "bg-rose-300 shadow-[0_0_10px_rgba(253,164,175,0.55)]" : item?.priority === "important" ? "bg-amber-300" : "bg-emerald-300"}`}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <p className="truncate text-sm font-medium">
                            {email.subject}
                          </p>
                          <span className="shrink-0 text-[10px] text-[#6e7a72]">
                            {email.date}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-[#78867e]">
                          {email.from}
                        </p>
                        <p className="mt-2 line-clamp-1 text-sm text-[#9ba8a0]">
                          {item?.summary || email.snippet}
                        </p>
                      </div>
                      <span className="hidden text-[10px] font-medium uppercase tracking-wider text-emerald-200 sm:block">
                        {item?.priority || "review"}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className={`${glassCard} p-5 sm:p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Calendar focus</p>
                <p className="mt-1 text-xs text-[#748178]">
                  Your next commitments at a glance.
                </p>
              </div>
              <CalendarDays
                className="size-5 text-emerald-200"
                aria-hidden="true"
              />
            </div>
            <div className="mt-6 space-y-3">
              {eventsLoading ? (
                <p className="text-sm text-[#718077]">Syncing your calendar…</p>
              ) : upcomingEvents.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/[0.1] p-5 text-sm text-[#718077]">
                  No upcoming events. Your schedule is open.
                </div>
              ) : (
                upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-3 rounded-xl border border-white/[0.07] bg-black/15 p-3.5"
                  >
                    <div className="flex size-9 shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-300/[0.1] text-emerald-200">
                      <span className="text-[9px] font-medium uppercase">
                        {new Date(`${event.date}T00:00:00`).toLocaleDateString(
                          "en-US",
                          { month: "short" },
                        )}
                      </span>
                      <span className="text-sm font-semibold leading-none">
                        {new Date(`${event.date}T00:00:00`).getDate()}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {event.title}
                      </p>
                      <p className="mt-1 text-xs text-[#7e8b83]">
                        {event.time}
                        {event.date === todayKey ? " · Today" : ""}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <Link
              href="/calendar"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-200 hover:text-emerald-100"
            >
              Open calendar{" "}
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-2xl border border-white/[0.09] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-200">
              <MessageSquareText className="size-4" aria-hidden="true" />
              COMMANDER ACTIONS
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
              Tell Commander what outcome you need.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[#94a199]">
              It will reason through your inbox and calendar, then prepare the
              workflow for your approval.
            </p>
            <Link
              href="/chat"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-3 text-xs font-semibold text-[#08100c] transition hover:bg-emerald-200"
            >
              Open AI command center{" "}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className={`${glassCard} p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Ready for approval</p>
                <p className="mt-1 text-xs text-[#748178]">
                  Drafts and actions that need your final review.
                </p>
              </div>
              <CheckCircle2
                className="size-5 text-emerald-200"
                aria-hidden="true"
              />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/gmail?tab=drafts"
                className="rounded-xl border border-white/[0.08] bg-black/15 p-4 transition hover:border-emerald-200/20"
              >
                <p className="text-2xl font-semibold">{drafts.length}</p>
                <p className="mt-1 text-xs text-[#8c9991]">Email drafts</p>
              </Link>
              <Link
                href="/chat"
                className="rounded-xl border border-white/[0.08] bg-black/15 p-4 transition hover:border-emerald-200/20"
              >
                <p className="text-2xl font-semibold">{todayEvents.length}</p>
                <p className="mt-1 text-xs text-[#8c9991]">
                  Today&apos;s meetings
                </p>
              </Link>
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] py-5 text-xs text-[#68756d]">
          <span className="flex items-center gap-2">
            <Command className="size-3.5 text-emerald-200" aria-hidden="true" />
            Inbox Commander
          </span>
          <span className="flex items-center gap-2">
            <Clock3 className="size-3.5" aria-hidden="true" />
            OpenAI-powered, approval-first
          </span>
        </footer>
      </div>
    </div>
  );
}
