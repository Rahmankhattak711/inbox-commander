"use client";

import { useMemo, useState } from "react";
import { useCalendarEvents } from "../../hooks/useCalendarEvents";
import { addMonths, getCalendarDays, startOfMonth, toDateKey } from "../../utils";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const inputClass = "w-full px-4 py-3 rounded-xl text-xs outline-none transition";
const inputStyle = { background: "var(--bg-base)", border: "1px solid var(--border)", color: "var(--text-primary)" };
const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "rgba(200,241,53,0.4)");
const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => (e.currentTarget.style.borderColor = "var(--border)");

export default function Calendar() {
  const { events, isFetching, fetchError, createEvent, isCreating, createError, deleteEvent, deleteError } = useCalendarEvents();

  const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");

  const calendarDays = useMemo(() => getCalendarDays(visibleMonth), [visibleMonth]);
  const selectedEvents = useMemo(() => events.filter((e) => e.date === selectedDate), [events, selectedDate]);

  const onSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createEvent(
      { summary: title, startDateTime: `${selectedDate}T${startTime}:00`, endDateTime: `${selectedDate}T${endTime}:00` },
      { onSuccess: () => { setTitle(""); setStartTime("09:00"); setEndTime("10:00"); setShowCreate(false); } }
    );
  };

  return (
    <div className="flex-1 antialiased px-6 py-10 max-w-6xl w-full mx-auto space-y-8 animate-in fade-in duration-300" style={{ color: "var(--text-primary)" }}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <div>
          <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
            Calendar Module
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight mt-1" style={{ color: "var(--text-primary)" }}>
            Google Calendar
          </h1>
          <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
            View, create, and manage your workspace events.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition duration-200 active:scale-[0.98]"
            style={{ background: "var(--lime)", color: "var(--bg-base)", boxShadow: "0 0 16px rgba(200,241,53,0.15)" }}
          >
            + New Event
          </button>
          <button
            onClick={() => { const t = new Date(); setVisibleMonth(startOfMonth(t)); setSelectedDate(toDateKey(t)); }}
            className="px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          >
            Today
          </button>
          <div className="w-px h-5" style={{ background: "var(--border)" }} />
          {[{ dir: -1, icon: "M15 19l-7-7 7-7" }, { dir: 1, icon: "M9 5l7 7-7 7" }].map(({ dir, icon }) => (
            <button
              key={dir}
              onClick={() => setVisibleMonth((m) => addMonths(m, dir))}
              className="p-2 rounded-xl transition"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
            </button>
          ))}
        </div>
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 backdrop-blur-sm" style={{ background: "rgba(8,13,5,0.8)" }} onClick={() => setShowCreate(false)} />
          <div
            className="relative w-full max-w-md rounded-2xl p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 shadow-2xl"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", boxShadow: "0 0 40px rgba(200,241,53,0.04)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>New Event</span>
                <h2 className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>Create Calendar Event</h2>
                <p className="text-[10px] font-mono mt-0.5" style={{ color: "var(--text-secondary)" }}>
                  {new Intl.DateTimeFormat("en-US", { weekday: "long", month: "short", day: "numeric" }).format(new Date(`${selectedDate}T00:00:00`))}
                </p>
              </div>
              <button onClick={() => setShowCreate(false)} style={{ color: "var(--text-secondary)" }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={onSubmitEvent} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>Event Title</label>
                <input
                  type="text" required autoFocus value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Team Standup" onFocus={inputFocus} onBlur={inputBlur}
                  className={inputClass} style={inputStyle}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Start Time", val: startTime, set: setStartTime },
                  { label: "End Time", val: endTime, set: setEndTime },
                ].map(({ label, val, set }) => (
                  <div key={label}>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                    <input
                      type="time" value={val} onChange={(e) => set(e.target.value)}
                      onFocus={inputFocus} onBlur={inputBlur}
                      className={inputClass} style={inputStyle}
                    />
                  </div>
                ))}
              </div>
              {createError && (
                <div className="text-xs p-3 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
                  {createError instanceof Error ? createError.message : "Failed to create event."}
                </div>
              )}
              <div className="flex gap-3 pt-1">
                <button
                  type="button" onClick={() => setShowCreate(false)}
                  className="flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit" disabled={isCreating}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition active:scale-[0.98] disabled:opacity-50"
                  style={{ background: "var(--lime)", color: "var(--bg-base)" }}
                >
                  {isCreating ? (
                    <>
                      <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        {/* Calendar Grid */}
        <div className="rounded-2xl p-6 space-y-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold tracking-wide uppercase font-mono" style={{ color: "var(--text-primary)" }}>
              {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(visibleMonth)}
            </h2>
            {isFetching && (
              <span className="text-[10px] font-mono flex items-center gap-1.5" style={{ color: "var(--lime)" }}>
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Syncing
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-7 text-center text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--text-secondary)" }}>
              {WEEK_DAYS.map((d) => <div key={d}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1.5">
              {calendarDays.map((day) => {
                const dateKey = toDateKey(day);
                const hasEvents = events.some((e) => e.date === dateKey);
                const isCurrentMonth = day.getMonth() === visibleMonth.getMonth();
                const isSelected = dateKey === selectedDate;
                const isToday = dateKey === toDateKey(new Date());

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedDate(dateKey)}
                    className="relative flex flex-col items-center justify-center aspect-[4/3] rounded-xl text-xs font-bold transition-all duration-150"
                    style={
                      isSelected
                        ? { background: "var(--lime)", color: "var(--bg-base)" }
                        : isToday
                          ? { background: "rgba(200,241,53,0.08)", border: "1px solid rgba(200,241,53,0.25)", color: "var(--lime)" }
                          : isCurrentMonth
                            ? { background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }
                            : { opacity: 0.25, color: "var(--text-muted)", pointerEvents: "none" }
                    }
                  >
                    {day.getDate()}
                    {hasEvents && (
                      <span
                        className="absolute bottom-1 w-1 h-1 rounded-full"
                        style={{ background: isSelected ? "var(--bg-base)" : "var(--lime)" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Event Sidebar */}
        <div className="space-y-5">
          <div className="flex items-center justify-between pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
            <div>
              <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--text-secondary)" }}>Agenda</span>
              <h3 className="text-sm font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>
                {new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(new Date(`${selectedDate}T00:00:00`))}
              </h3>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="text-[9px] px-3 py-1.5 rounded-lg font-extrabold uppercase tracking-widest transition"
              style={{ background: "rgba(200,241,53,0.08)", border: "1px solid rgba(200,241,53,0.2)", color: "var(--lime)" }}
            >
              + Add
            </button>
          </div>

          <div className="space-y-3">
            {selectedEvents.length > 0 ? (
              selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start justify-between gap-4 p-4 rounded-xl"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--lime)", boxShadow: "0 0 6px var(--lime)" }} />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold truncate" style={{ color: "var(--text-primary)" }}>{event.title}</h4>
                      <p className="text-[10px] font-mono mt-0.5" style={{ color: "var(--text-secondary)" }}>{event.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { setDeletingId(event.id); deleteEvent({ id: event.id }, { onSettled: () => setDeletingId(null) }); }}
                    disabled={deletingId === event.id}
                    className="text-[9px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-widest transition disabled:opacity-40"
                    style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#f87171"; e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border)"; }}
                  >
                    {deletingId === event.id ? "..." : "Delete"}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center border border-dashed rounded-2xl" style={{ borderColor: "var(--border)" }}>
                <svg className="w-7 h-7 mb-2" style={{ color: "var(--text-muted)" }} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <p className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>No events for this date.</p>
                <button onClick={() => setShowCreate(true)} className="mt-3 text-[10px] font-bold uppercase tracking-widest transition" style={{ color: "var(--lime)" }}>
                  + Create Event
                </button>
              </div>
            )}
          </div>

          {(fetchError || deleteError) && (
            <div className="text-xs p-3.5 rounded-xl" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
              {fetchError instanceof Error ? fetchError.message : deleteError instanceof Error ? deleteError.message : "Something went wrong."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
