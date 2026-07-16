import {
  getAuthenticatedCorsairTenant,
  getAuthenticatedGmailTenant,
} from "@/lib/corsair-auth";
import { listGmailMessagesByQuery } from "@/lib/gmail-list-messages";

type GmailMessage = {
  id?: string;
  threadId?: string;
  internalDate?: string;
  labelIds?: string[];
  snippet?: string;
  payload?: { headers?: Array<{ name: string; value: string }> };
};

type CalendarEvent = {
  id?: string;
  summary?: string;
  description?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
  attendees?: Array<{ email?: string; responseStatus?: string }>;
  reminders?: { overrides?: unknown[] };
};

function getHeader(message: GmailMessage, name: string) {
  return (
    message.payload?.headers?.find(
      (header) => header.name.toLowerCase() === name.toLowerCase(),
    )?.value ?? ""
  );
}

function toEmailSummary(message: GmailMessage) {
  return {
    id: message.id ?? "",
    threadId: message.threadId ?? "",
    from: getHeader(message, "from") || "Unknown sender",
    to: getHeader(message, "to") || "Unknown recipient",
    subject: getHeader(message, "subject") || "(No subject)",
    receivedAt: message.internalDate
      ? new Date(Number(message.internalDate)).toISOString()
      : "",
    labels: message.labelIds ?? [],
    snippet: (message.snippet ?? "").replace(/\s+/g, " ").slice(0, 360),
  };
}

function toCalendarSummary(event: CalendarEvent) {
  return {
    id: event.id ?? "",
    title: event.summary || "Untitled event",
    start: event.start?.dateTime ?? event.start?.date ?? "",
    end: event.end?.dateTime ?? event.end?.date ?? "",
    attendeeCount: event.attendees?.length ?? 0,
    attendeeResponses: (event.attendees ?? []).map((attendee) => ({
      email: attendee.email ?? "",
      status: attendee.responseStatus ?? "needsAction",
    })),
    hasAgenda: Boolean(event.description?.trim()),
    hasCustomReminder: Boolean(event.reminders?.overrides?.length),
  };
}

function findCalendarConflicts(events: ReturnType<typeof toCalendarSummary>[]) {
  const timedEvents = events
    .map((event) => ({
      ...event,
      startMs: Date.parse(event.start),
      endMs: Date.parse(event.end),
    }))
    .filter(
      (event) =>
        Number.isFinite(event.startMs) &&
        Number.isFinite(event.endMs) &&
        event.endMs > event.startMs,
    )
    .sort((first, second) => first.startMs - second.startMs);

  const conflicts: Array<{ first: string; second: string }> = [];
  const backToBack: Array<{
    first: string;
    second: string;
    gapMinutes: number;
  }> = [];

  for (let index = 0; index < timedEvents.length - 1; index += 1) {
    const current = timedEvents[index];
    const next = timedEvents[index + 1];
    if (current.endMs > next.startMs) {
      conflicts.push({ first: current.title, second: next.title });
      continue;
    }

    const gapMinutes = Math.round((next.startMs - current.endMs) / 60_000);
    if (gapMinutes <= 10) {
      backToBack.push({
        first: current.title,
        second: next.title,
        gapMinutes,
      });
    }
  }

  return { conflicts, backToBack };
}

export async function getCommanderWorkspaceContext(userId: string) {
  const context = {
    generatedAt: new Date().toISOString(),
    email: {
      status: "unavailable" as "available" | "unavailable",
      inbox: [] as ReturnType<typeof toEmailSummary>[],
      unreadImportant: [] as ReturnType<typeof toEmailSummary>[],
      recentSent: [] as ReturnType<typeof toEmailSummary>[],
      draftCount: 0,
    },
    calendar: {
      status: "unavailable" as "available" | "unavailable",
      upcoming: [] as ReturnType<typeof toCalendarSummary>[],
      conflicts: [] as Array<{ first: string; second: string }>,
      backToBack: [] as Array<{
        first: string;
        second: string;
        gapMinutes: number;
      }>,
    },
    meetingHistory: "Not connected in this workspace.",
    tasks: "Not connected in this workspace.",
  };

  try {
    const tenant = await getAuthenticatedGmailTenant(userId);
    const [inbox, unreadImportant, recentSent, drafts] = await Promise.all([
      listGmailMessagesByQuery(tenant, "in:inbox", 20),
      listGmailMessagesByQuery(tenant, "in:inbox is:unread is:important", 10),
      listGmailMessagesByQuery(tenant, "in:sent newer_than:14d", 20),
      tenant.gmail.api.drafts.list({ userId: "me", maxResults: 50 }),
    ]);

    context.email = {
      status: "available",
      inbox: inbox.map((message) => toEmailSummary(message as GmailMessage)),
      unreadImportant: unreadImportant.map((message) =>
        toEmailSummary(message as GmailMessage),
      ),
      recentSent: recentSent.map((message) =>
        toEmailSummary(message as GmailMessage),
      ),
      draftCount: drafts.drafts?.length ?? 0,
    };
  } catch (error) {
    console.error("Commander could not load Gmail context.", error);
  }

  try {
    const tenant = await getAuthenticatedCorsairTenant(userId);
    const response = await tenant.googlecalendar.api.events.getMany({
      calendarId: "primary",
      singleEvents: true,
      orderBy: "startTime",
      timeMin: new Date().toISOString(),
      maxResults: 50,
    });
    const upcoming = (response.items ?? []).map((event) =>
      toCalendarSummary(event as CalendarEvent),
    );

    context.calendar = {
      status: "available",
      upcoming,
      ...findCalendarConflicts(upcoming),
    };
  } catch (error) {
    console.error("Commander could not load Calendar context.", error);
  }

  return context;
}
