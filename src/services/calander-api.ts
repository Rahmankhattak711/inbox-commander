import { CalendarEvent } from "@/types";
import { formatTime } from "../utils";

export const fetchCalendarEvents = async (): Promise<CalendarEvent[]> => {
  const response = await fetch("/api/calendar", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Unable to fetch events.");
  }

  return result.events.map((event: any) => ({
    id: event.id,
    title: event.summary,
    date: event.start.dateTime.split("T")[0],
    time: formatTime(event.start.dateTime),
    color: "bg-sky-500",
  }));
};

export const deleteCalendarEvent = async ({
  id,
  calendarId = "primary",
}: {
  id: string;
  calendarId?: string;
}) => {
  const params = new URLSearchParams({ id, calendarId });
  const response = await fetch(`/api/calendar?${params}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Unable to delete event.");
  }

  return result;
};

interface CreateEventPayload {
  summary: string;
  startDateTime: string;
  endDateTime: string;
}

export const createCalendarEvent = async ({
  summary,
  startDateTime,
  endDateTime,
}: CreateEventPayload) => {
  const response = await fetch("/api/calendar", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      calendarId: "primary",
      event: {
        summary,
        start: { dateTime: startDateTime },
        end: { dateTime: endDateTime },
      },
    }),
  });
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || "Unable to create event.");
  }
  return result;
};
