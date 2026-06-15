"use client";

import { useMemo, useState } from "react";
import { useCalendarEvents } from "../../hooks/useCalendarEvents";
import {
  addMonths,
  getCalendarDays,
  startOfMonth,
  toDateKey,
} from "../../utils";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function Calendar() {
  const {
    events,
    isFetching,
    createEvent,
    isCreating,
    createError,
    fetchError,
    deleteEvent,
    deleteError,
  } = useCalendarEvents();

  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(new Date()),
  );
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [showAddForm, setShowAddForm] = useState(false);
  const [summary, setSummary] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const calendarDays = useMemo(
    () => getCalendarDays(visibleMonth),
    [visibleMonth],
  );

  const selectedEvents = useMemo(() => {
    return events.filter((event) => event.date === selectedDate);
  }, [events, selectedDate]);

  const onSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) return;

    createEvent(
      {
        summary,
        startDateTime: `${selectedDate}T${startTime}:00Z`,
        endDateTime: `${selectedDate}T${endTime}:00Z`,
      },
      {
        onSuccess: () => {
          setSummary("");
          setShowAddForm(false);
        },
      },
    );
  };

  return (
    <main className="min-h-screen bg-[#090a0f] text-slate-200 antialiased font-sans px-4 py-12 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl grid gap-12 lg:grid-cols-[1fr_340px]">
        {/* LEFT COLUMN: THE GRID CANVAS */}
        <div className="space-y-6">
          {/* FLOATING ACTION BANNER HEADER */}
          <header className="flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-xl p-4 shadow-sm">
            <div>
              <h1 className="text-base font-semibold text-white tracking-tight">
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  year: "numeric",
                }).format(visibleMonth)}
              </h1>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  setVisibleMonth(startOfMonth(today));
                  setSelectedDate(toDateKey(today));
                }}
                className="rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition"
              >
                Today
              </button>
              <div className="w-px h-4 bg-slate-800 mx-1" />
              <button
                type="button"
                onClick={() => setVisibleMonth((month) => addMonths(month, -1))}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition"
                aria-label="Previous Month"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setVisibleMonth((month) => addMonths(month, 1))}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-900 hover:text-slate-200 transition"
                aria-label="Next Month"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </header>

          {/* CALENDAR BODY */}
          <div className="space-y-2">
            {/* Week Labels */}
            <div className="grid grid-cols-7 text-center text-[10px] font-bold tracking-widest text-slate-600 uppercase">
              {WEEK_DAYS.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Days Field Canvas */}
            <div className="grid grid-cols-7 gap-1.5">
              {calendarDays.map((day) => {
                const dateKey = toDateKey(day);
                const dayEvents = events.filter(
                  (event) => event.date === dateKey,
                );
                const isCurrentMonth =
                  day.getMonth() === visibleMonth.getMonth();
                const isSelected = dateKey === selectedDate;
                const isToday = dateKey === toDateKey(new Date());

                return (
                  <button
                    type="button"
                    key={dateKey}
                    onClick={() => {
                      setSelectedDate(dateKey);
                      setShowAddForm(false);
                    }}
                    className={`relative flex flex-col items-center justify-center aspect-[4/3] rounded-lg transition-all ${
                      isSelected
                        ? "bg-sky-500 text-slate-950 font-bold shadow-lg shadow-sky-500/10 scale-95 z-10"
                        : isToday
                          ? "bg-slate-900/90 border border-sky-500/30 text-sky-400 font-semibold"
                          : isCurrentMonth
                            ? "bg-slate-900/30 border border-slate-900 text-slate-300 hover:border-slate-800 hover:bg-slate-900/60"
                            : "text-slate-700 bg-transparent"
                    }`}
                  >
                    <span className="text-sm">{day.getDate()}</span>

                    {/* Tiny Notification Dot for Pending Events */}
                    {dayEvents.length > 0 && (
                      <span
                        className={`absolute bottom-1.5 h-1 w-1 rounded-full ${isSelected ? "bg-slate-950" : "bg-sky-400"}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AGENDA INSIGHTS & INLINE ADDS */}
        <div className="space-y-6 lg:border-l lg:border-slate-900 lg:pl-12">
          {/* Section Dynamic Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                Agenda details
              </p>
              <h2 className="text-sm font-semibold text-white mt-0.5">
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                }).format(new Date(`${selectedDate}T00:00:00`))}
              </h2>
            </div>

            {!showAddForm && (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2.5 py-1 text-xs text-sky-400 border border-slate-800 hover:border-slate-700 font-medium transition"
              >
                Add Event
              </button>
            )}
          </div>

          {/* COLLAPSIBLE QUICK FORM COMPONENT */}
          {showAddForm && (
            <form
              onSubmit={onSubmitEvent}
              className="rounded-xl border border-slate-800/80 bg-slate-900/20 p-4 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div>
                <input
                  type="text"
                  required
                  autoFocus
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Sync event title..."
                  className="w-full bg-transparent border-b border-slate-800 focus:border-sky-500/50 pb-1.5 text-xs text-slate-200 placeholder-slate-600 outline-none transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-400">
                <label className="space-y-1">
                  <span className="block text-slate-600 uppercase font-bold tracking-wider text-[9px]">
                    Starts
                  </span>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-300 outline-none focus:border-slate-700"
                  />
                </label>
                <label className="space-y-1">
                  <span className="block text-slate-600 uppercase font-bold tracking-wider text-[9px]">
                    Ends
                  </span>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-slate-300 outline-none focus:border-slate-700"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2 justify-end pt-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-slate-500 hover:text-slate-400 font-medium px-2 py-1"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="rounded-md bg-sky-500 px-3 py-1 font-semibold text-slate-950 hover:bg-sky-400 transition disabled:opacity-40"
                >
                  {isCreating ? "Saving..." : "Commit"}
                </button>
              </div>
            </form>
          )}

          {/* STREAMLINED INTERACTION EVENTS STACK LIST */}
          <div className="space-y-2.5">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-slate-900 bg-slate-900/20 p-3.5 hover:border-slate-800 transition"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />
                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-xs font-medium text-slate-200 group-hover:text-white transition truncate">
                        {event.title}
                      </h4>
                      <p className="text-[10px] font-mono text-slate-500">
                        {event.time}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setDeletingId(event.id);
                      deleteEvent(
                        { id: event.id },
                        { onSettled: () => setDeletingId(null) },
                      );
                    }}
                    disabled={deletingId === event.id}
                    aria-label={`Delete ${event.title}`}
                    className="shrink-0 rounded-md px-2 py-1 text-[10px] font-medium text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400 hover:bg-red-950/30 transition disabled:opacity-40"
                  >
                    {deletingId === event.id ? "..." : "Delete"}
                    dele
                  </button>
                </div>
              ))
            ) : !showAddForm ? (
              <div className="flex flex-col items-center text-center justify-center py-10 border border-dashed border-slate-900 rounded-xl bg-slate-900/5">
                <p className="text-xs text-slate-600 font-medium">
                  Nothing logged on this line.
                </p>
              </div>
            ) : null}
          </div>

          {(fetchError || createError || deleteError) && (
            <div className="text-[11px] text-red-400/80 bg-red-950/20 border border-red-900/30 rounded-lg p-2.5">
              {fetchError instanceof Error
                ? fetchError.message
                : createError instanceof Error
                  ? createError.message
                  : deleteError instanceof Error
                    ? deleteError.message
                    : "Something went wrong."}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
