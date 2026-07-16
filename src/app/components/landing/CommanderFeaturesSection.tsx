"use client";

import {
  AlertTriangle,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Mail,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

const executionSteps = [
  ["Commander Agent", "Understands the mission and assigns the work"],
  ["Inbox Agent", "Finds the priority threads and follow-ups"],
  ["Calendar Agent", "Checks conflicts and protects focus time"],
  ["Draft Agent", "Prepares the approval-ready response"],
  ["Commander Agent", "Returns one coordinated plan"],
] as const;

const agents = [
  { name: "Inbox Agent", detail: "Priority scan", icon: Mail },
  { name: "Calendar Agent", detail: "Conflict check", icon: CalendarDays },
  { name: "Draft Agent", detail: "Reply prepared", icon: Sparkles },
] as const;

export default function CommanderFeaturesSection() {
  const [completedSteps, setCompletedSteps] = useState<number>(
    executionSteps.length,
  );
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = window.setInterval(() => {
      setCompletedSteps((current) => {
        if (current >= executionSteps.length - 1) {
          setIsRunning(false);
          return executionSteps.length;
        }
        return current + 1;
      });
    }, 700);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const runMission = () => {
    setCompletedSteps(0);
    setIsRunning(true);
  };

  return (
    <section
      id="intelligence"
      className="relative overflow-hidden border-y border-white/[0.07] bg-[#0a0d0b] px-6 py-28"
    >
      <div className="pointer-events-none absolute right-0 top-0 size-[520px] rounded-full bg-emerald-300/[0.08] blur-[140px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
            Commander intelligence
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            One mission. Multiple specialized agents.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#9aa69f]">
            Commander coordinates focused agents across your inbox and calendar,
            then returns a clear plan with every action ready for approval.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl border border-emerald-200/15 bg-emerald-300/[0.045] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                  Multi-agent visualization
                </p>
                <h3 className="mt-3 text-2xl font-semibold">Commander Agent</h3>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/20 bg-emerald-300/[0.1] px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-200">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-200" />
                Orchestrating
              </span>
            </div>

            <div className="relative mt-10 flex justify-center">
              <div className="relative z-10 flex size-28 flex-col items-center justify-center rounded-3xl border border-emerald-200/30 bg-[#101a14] text-center shadow-[0_0_40px_rgba(110,231,183,0.12)]">
                <BrainCircuit
                  className="size-7 text-emerald-200"
                  aria-hidden="true"
                />
                <span className="mt-2 text-[10px] font-medium uppercase tracking-wider text-white">
                  Commander
                </span>
              </div>
              <span className="absolute left-1/2 top-full h-8 w-px -translate-x-1/2 bg-emerald-200/25" />
            </div>

            <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
              <span className="absolute left-[16%] right-[16%] top-0 hidden h-px bg-emerald-200/25 sm:block" />
              {agents.map(({ name, detail, icon: Icon }) => (
                <div
                  key={name}
                  className="relative rounded-2xl border border-white/[0.09] bg-black/20 p-4 text-center"
                >
                  <span className="mx-auto flex size-9 items-center justify-center rounded-xl border border-emerald-200/15 bg-emerald-300/[0.08] text-emerald-200">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <p className="mt-3 text-xs font-medium text-white">{name}</p>
                  <p className="mt-1 text-[10px] text-[#849189]">{detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#91a098]">
              <Zap className="size-3.5 text-emerald-200" aria-hidden="true" />
              Agents share context without losing approval control.
            </div>
          </div>

          <div className="rounded-3xl border border-white/[0.1] bg-white/[0.03] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                  Live execution timeline
                </p>
                <h3 className="mt-3 text-2xl font-semibold">
                  Watch the mission move
                </h3>
              </div>
              <button
                type="button"
                onClick={runMission}
                disabled={isRunning}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-300/[0.1] px-4 py-2.5 text-xs font-medium text-emerald-100 transition hover:bg-emerald-300/[0.16] disabled:cursor-wait disabled:opacity-60"
              >
                <Play className="size-3.5" aria-hidden="true" />
                {isRunning ? "Running mission" : "Run mission"}
              </button>
            </div>

            <div className="mt-8 space-y-3" aria-live="polite">
              {executionSteps.map(([agent, detail], index) => {
                const complete = completedSteps > index;
                const active = isRunning && completedSteps === index;

                return (
                  <div
                    key={`${agent}-${detail}`}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition ${complete ? "border-emerald-200/20 bg-emerald-300/[0.08]" : "border-white/[0.07] bg-black/15"}`}
                  >
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-full border ${complete ? "border-emerald-200/30 bg-emerald-300 text-[#07100c]" : active ? "border-emerald-200/30 text-emerald-200" : "border-white/[0.12] text-[#65736a]"}`}
                    >
                      {complete ? (
                        <Check
                          className="size-3.5 stroke-[3]"
                          aria-hidden="true"
                        />
                      ) : active ? (
                        <span className="size-2 animate-ping rounded-full bg-emerald-200" />
                      ) : (
                        <span className="text-[10px]">{index + 1}</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs font-medium text-white">
                        {agent}
                      </span>
                      <span className="mt-0.5 block text-[10px] text-[#839087]">
                        {detail}
                      </span>
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-emerald-200">
                      {complete ? "done" : active ? "running" : "queued"}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-200/20 bg-emerald-300/[0.08] p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-100">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                Mission Complete
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-[10px] text-[#9eafa4] sm:grid-cols-3">
                <span>
                  <strong className="block text-lg font-semibold text-white">
                    4
                  </strong>
                  tasks completed
                </span>
                <span>
                  <strong className="block text-lg font-semibold text-white">
                    47m
                  </strong>
                  time saved
                </span>
                <span>
                  <strong className="block text-lg font-semibold text-white">
                    0
                  </strong>
                  tabs switched
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border border-white/[0.1] bg-white/[0.025] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-emerald-200/15 bg-emerald-300/[0.08] text-emerald-200">
                <Clock3 className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                  Daily AI Briefing
                </p>
                <h3 className="mt-1 text-lg font-medium">
                  Know what matters before 9 AM.
                </h3>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-[#cbd6cf]">
              <p className="rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3">
                Northstar contract review needs a reply today.
              </p>
              <p className="rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3">
                Two meetings overlap at 2:00 PM; a reschedule is recommended.
              </p>
              <p className="rounded-xl border border-emerald-200/15 bg-emerald-300/[0.06] px-4 py-3 text-emerald-100">
                Commander recommends protecting 90 minutes for focused work.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-amber-200/15 bg-amber-300/[0.04] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl border border-amber-200/20 bg-amber-300/[0.1] text-amber-200">
                <AlertTriangle className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-200">
                  Commander Alerts
                </p>
                <h3 className="mt-1 text-lg font-medium">
                  Problems found before you ask.
                </h3>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {[
                ["High", "A client thread has been waiting 48 hours"],
                ["Medium", "Your afternoon calendar is over capacity"],
                ["Low", "Three follow-ups have no next action"],
              ].map(([severity, message]) => (
                <div
                  key={message}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3"
                >
                  <span className="rounded-md border border-amber-200/20 px-2 py-1 text-[9px] uppercase tracking-wider text-amber-200">
                    {severity}
                  </span>
                  <span className="text-sm text-[#d5ddd8]">{message}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
