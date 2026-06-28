"use client";

import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  Terminal,
  Trash2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function ControlRoom() {
  const [to, setTo] = useState("investors@corsair.engine");
  const [subject, setSubject] = useState(
    "[URGENT] Infrastructure Deployment Overclock v1.2",
  );
  const [body, setBody] = useState(
    "Team, the token sandboxing processes are officially optimized. Requesting synchronous validation sequence inside the calendar grid window.",
  );

  const [stagedDrafts, setStagedDrafts] = useState<
    Array<{ to: string; subject: string; body: string }>
  >([]);

  const [events, setEvents] = useState<
    Array<{
      id: number;
      time: string;
      title: string;
      status: string;
      active: boolean;
    }>
  >([
    {
      id: 1,
      time: "09:00",
      title: "Core Architecture Sync",
      status: "COMPLETED",
      active: false,
    },
    {
      id: 2,
      time: "11:30",
      title: "Google OAuth State Refresh",
      status: "ACTIVE NODE",
      active: true,
    },
    {
      id: 3,
      time: "14:00",
      title: "Corsair Engine Load Testing",
      status: "QUEUED",
      active: false,
    },
  ]);

  function handlePurge() {
    setTo("");
    setSubject("");
    setBody("");
  }

  function handleStageDraft() {
    if (!subject) return;
    setStagedDrafts((s) => [{ to, subject, body }, ...s]);
    setSubject("[STAGED] " + subject);
  }

  function injectNewMatrixBlock() {
    const newTime = new Date(
      Date.now() + Math.floor(Math.random() * 3 + 1) * 3600 * 1000,
    );
    const hours = String(newTime.getHours()).padStart(2, "0");
    const mins = String(newTime.getMinutes()).padStart(2, "0");
    const time = `${hours}:${mins}`;

    const newEvent = {
      id: Date.now(),
      time,
      title: "Injected Matrix Block",
      status: "QUEUED",
      active: false,
    };

    setEvents((e) => [newEvent, ...e]);
  }

  function toggleEventActive(id: number) {
    setEvents((e) =>
      e.map((ev) =>
        ev.id === id
          ? {
              ...ev,
              active: !ev.active,
              status: !ev.active ? "ACTIVE NODE" : "COMPLETED",
            }
          : ev,
      ),
    );
  }

  return (
    <section
      id="control-room"
      className="relative px-6 py-32 overflow-hidden"
    //  style={{ background: "var(--bg-surface)" }}
    >
      {/* Background Ambience */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        // style={{
        //   background:
        //     "radial-gradient(circle at 50% 0%, var(--lime-glow) 0%, transparent 70%)",
        // }}
      />
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--lime)]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[10px] font-extrabold tracking-widest text-[var(--lime)]"
          >
            <Activity className="w-3 h-3 text-[var(--lime)] animate-pulse" />
            <span>Unified Context Window</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-balance max-w-3xl mx-auto"
            style={{ color: "var(--text-primary)" }}
          >
            Command your inbox without losing your schedule
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto text-pretty"
          >
            Stop context switching between tabs. Draft high-importance client responses
            side-by-side with your active calendar agenda.
          </motion.p>
        </div>

        {/* Modules Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Box: Gmail Module */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/60 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden relative group/pane"
          >
            {/* Ambient hover light */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--lime)]/[0.02] to-transparent opacity-0 group-hover/pane:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Module Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-muted)] bg-[var(--bg-surface)]/80 p-4 relative z-10">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-[var(--lime)] opacity-90" />
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--lime)]">
                  MODULE_GMAIL_DRAFT / COMPOSER
                </span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--lime)]/20 border border-[var(--lime)]/40" />
              </div>
            </div>

            {/* Module Body */}
            <div className="p-6 space-y-6 relative z-10">
              {/* Inputs */}
              <div className="space-y-4">
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1.5 transition-colors group-focus-within:text-[var(--lime)]">
                    Target Identity [To]
                  </label>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)]/30 outline-none text-[12px] text-[var(--text-primary)] transition-all placeholder:text-[var(--text-muted)]"
                    placeholder="Enter email address..."
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1.5 transition-colors group-focus-within:text-[var(--lime)]">
                    Transmission Subject
                  </label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)]/30 outline-none text-[12px] text-[var(--lime)] font-bold transition-all placeholder:text-[var(--text-muted)]"
                    placeholder="Enter subject..."
                  />
                </div>
                <div className="group flex flex-col h-full">
                  <label className="block text-[10px] uppercase tracking-widest text-[var(--text-secondary)] mb-1.5 transition-colors group-focus-within:text-[var(--lime)]">
                    Payload Architecture [Body]
                  </label>
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-[var(--bg-base)] border border-[var(--border)] focus:border-[var(--lime)] focus:ring-1 focus:ring-[var(--lime)]/30 outline-none text-[13px] font-sans text-[var(--text-primary)]/90 min-h-[160px] resize-none transition-all leading-relaxed placeholder:text-[var(--text-muted)]"
                    placeholder="Draft your payload here..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-muted)]">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[var(--text-secondary)]">
                    Staged Packets:
                  </span>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={stagedDrafts.length}
                      initial={{ opacity: 0, scale: 0.5, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border)] text-[10px] font-bold text-[var(--lime)]"
                    >
                      {stagedDrafts.length}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handlePurge}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg-surface)]/50 text-[11px] font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all hover:border-[var(--text-muted)]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    PURGE
                  </button>
                  <button
                    onClick={handleStageDraft}
                    className="group/btn flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-[var(--lime)] text-[var(--bg-base)] text-[11px] font-extrabold uppercase hover:shadow-[0_0_20px_var(--lime-glow)] transition-all active:scale-95 hover:bg-[var(--lime-dim)]"
                  >
                    <Send className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    STAGE DRAFT
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Box: Calendar Module */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/40 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden relative group/pane"
          >
            {/* Ambient hover light */}
            <div className="absolute inset-0 bg-gradient-to-bl from-[var(--text-primary)]/[0.01] to-transparent opacity-0 group-hover/pane:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Module Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-muted)] bg-[var(--bg-surface)]/80 p-4 relative z-10">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-[var(--text-primary)] opacity-90" />
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-[var(--text-primary)]">
                  MODULE_CALENDAR / SCHEDULER
                </span>
              </div>
              <div className="flex items-center gap-2 relative">
                <span className="text-[9px] text-[var(--text-secondary)] uppercase tracking-widest">
                  Live Sync
                </span>
                <div className="relative w-2 h-2 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[var(--lime)] animate-ping absolute opacity-75" />
                  <span className="w-2 h-2 rounded-full bg-[var(--lime)] relative" />
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6 relative z-10 flex flex-col h-full">
              {/* Event List */}
              <div className="space-y-3 flex-1">
                <AnimatePresence mode="popLayout">
                  {events.map((slot) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.95,
                        transition: { duration: 0.2 },
                      }}
                      key={slot.id}
                      onClick={() => toggleEventActive(slot.id)}
                      className={`group relative p-4 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                        slot.active
                          ? "border-[var(--lime)] bg-[var(--lime-glow)]"
                          : "border-[var(--border)] bg-[var(--bg-surface)]/40 hover:border-[var(--text-muted)] hover:bg-[var(--bg-surface)]/80"
                      }`}
                    >
                      {/* Active Left Glow Line */}
                      {slot.active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--lime)] shadow-[0_0_10px_var(--lime)]"
                        />
                      )}

                      <div className="flex justify-between items-center mb-2 pl-1">
                        <div className="flex items-center gap-2">
                          <Clock
                            className={`w-3.5 h-3.5 ${slot.active ? "text-[var(--lime)]" : "text-[var(--text-secondary)]"}`}
                          />
                          <span
                            className={`text-[13px] font-bold ${slot.active ? "text-[var(--lime)]" : "text-[var(--text-secondary)]"}`}
                          >
                            {slot.time}
                          </span>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase border ${
                            slot.active
                              ? "bg-[var(--lime)]/10 text-[var(--lime)] border-[var(--lime)]/20"
                              : slot.status === "COMPLETED"
                                ? "bg-[var(--bg-base)] text-[var(--text-secondary)] border-[var(--border)]"
                                : "bg-[var(--border-muted)] text-[var(--text-primary)] border-[var(--border)]"
                          }`}
                        >
                          {slot.status === "COMPLETED" && (
                            <CheckCircle2 className="w-2.5 h-2.5 text-[var(--text-secondary)]" />
                          )}
                          {slot.status}
                        </div>
                      </div>
                      <div
                        className={`pl-1 text-sm font-medium ${slot.active ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors"}`}
                      >
                        {slot.title}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <button
                onClick={injectNewMatrixBlock}
                className="w-full mt-4 group flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-dashed border-[var(--border)] hover:border-[var(--lime)]/40 text-[var(--text-secondary)] hover:text-[var(--lime)] bg-transparent hover:bg-[var(--lime-glow)] transition-all font-bold uppercase tracking-wider text-[11px]"
              >
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                Inject New Matrix Block
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
