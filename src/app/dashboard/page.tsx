"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { useGmailDraft, useGmailDrafts } from "@/hooks/useCreateGmailDraft";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import { parseGmailMessage } from "@/app/gmail/component/gmail-utils";
import { useMemo } from "react";

import DashboardHero from "./components/DashboardHero";
import DashboardStats from "./components/DashboardStats";
import AnalyticsSection from "./components/AnalyticsSection";
import QuickActions from "./components/QuickActions";
import ActivityPanels from "./components/ActivityPanels";

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
        .map((email: Parameters<typeof parseGmailMessage>[0]) => parseGmailMessage(email)),
    [emails]
  );

  const recentDrafts = useMemo(
    () =>
      drafts
        .slice(0, 4)
        .map((draft: Parameters<typeof parseGmailMessage>[0]) => parseGmailMessage(draft)),
    [drafts]
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
      <DashboardHero user={user} greeting={greeting} today={today} />
      <DashboardStats stats={stats} isLoading={isLoadingStats} />
      <AnalyticsSection
        emailsCount={emails.length}
        draftsCount={drafts.length}
        eventsCount={events.length}
      />
      <QuickActions actions={quickActions} />
      <ActivityPanels
        upcomingEvents={upcomingEvents}
        recentEmails={recentEmails}
        recentDrafts={recentDrafts}
        todayKey={todayKey}
        eventsFetching={eventsFetching}
        emailsFetching={emailsFetching}
        draftsFetching={draftsFetching}
      />
    </div>
  );
}
