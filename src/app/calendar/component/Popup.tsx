"use client";

import { useState } from "react";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";
import {
  toDateKey,
} from "@/utils/index";

const inputClass =
  "w-full px-4 py-3 rounded-xl text-xs outline-none transition";
const inputStyle = {
  background: "var(--bg-base)",
  border: "1px solid var(--border)",
  color: "var(--text-primary)",
};
const inputFocus = (e: React.FocusEvent<HTMLInputElement>) =>
  (e.currentTarget.style.borderColor = "rgba(200,241,53,0.4)");
const inputBlur = (e: React.FocusEvent<HTMLInputElement>) =>
  (e.currentTarget.style.borderColor = "var(--border)");

interface PopupProps {
  onClose: () => void;
  setShowCreate: React.Dispatch<React.SetStateAction<boolean>>;
  showCreate: boolean;
}

function Popup({ onClose, setShowCreate, showCreate }: PopupProps) {
  const {
    createEvent,
    isCreating,
    createError,
  } = useCalendarEvents();

  const [selectedDate, setSelectedDate] = useState(() => toDateKey(new Date()));
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("10:00");

  const onSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    createEvent(
      {
        summary: title,
        startDateTime: `${selectedDate}T${start}:00`,
        endDateTime: `${selectedDate}T${end}:00`,
      },
      {
        onSuccess: () => {
          setTitle("");
          setStart("09:00");
          setEnd("10:00");
          setShowCreate(false);
        },
      },
    );
  };
  return (
    <div>
      {" "}
      <div className="fixed inset-0 z-50 h-screen flex items-center justify-center px-4">
        <div
          className="absolute inset-0 backdrop-blur-sm"
          style={{ background: "rgba(8,13,5,0.8)" }}
          onClick={() => setShowCreate(false)}
        />
        <div
          className="relative w-full max-w-md rounded-2xl p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200 shadow-2xl"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 0 40px rgba(200,241,53,0.04)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <span
                className="text-[9px] font-extrabold tracking-widest uppercase font-mono"
                style={{ color: "var(--lime)" }}
              >
                New Event
              </span>
              <h2
                className="text-sm font-bold mt-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                Create Calendar Event
              </h2>
              <p
                className="text-[10px] font-mono mt-0.5"
                style={{ color: "var(--text-secondary)" }}
              >
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                }).format(new Date(`${selectedDate}T00:00:00`))}
              </p>
            </div>
            <button
              onClick={() => setShowCreate(false)}
              style={{ color: "var(--text-secondary)" }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={onSubmitEvent} className="space-y-4">
            <div>
              <label
                className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
                style={{ color: "var(--text-secondary)" }}
              >
                Event Title
              </label>
              <input
                type="text"
                required
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Team Standup"
                onFocus={inputFocus}
                onBlur={inputBlur}
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Start Time", val: start, set: setStart },
                { label: "End Time", val: end, set: setEnd },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-widest mb-1.5"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {label}
                  </label>
                  <input
                    type="time"
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>
            {createError && (
              <div
                className="text-xs p-3 rounded-xl"
                style={{
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#f87171",
                }}
              >
                {createError instanceof Error
                  ? createError.message
                  : "Failed to create event."}
              </div>
            )}
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition active:scale-[0.98] disabled:opacity-50"
                style={{ background: "var(--lime)", color: "var(--bg-base)" }}
              >
                {isCreating ? (
                  <>
                    <svg
                      className="animate-spin h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Event"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Popup;
