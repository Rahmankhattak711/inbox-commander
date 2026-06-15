export type CalendarEvent = {
  id: string;
  title: string;
  date: string; // Formatted as YYYY-MM-DD
  time: string; // Formatted as HH:MM AM/PM
  color: string; // Tailwind background class name (e.g., 'bg-sky-500')
};

export interface CreateEventPayload {
  summary: string;
  startDateTime: string; // ISO String format
  endDateTime: string;   // ISO String format
}
