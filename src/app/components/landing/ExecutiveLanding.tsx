"use client";

import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Command,
  Mail,
  Menu,
  MessageSquareText,
  MoreHorizontal,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CommanderFeaturesSection from "./CommanderFeaturesSection";
import PricingSection from "./PricingSection";

const executionSteps = [
  "Understanding request",
  "Planning workflow",
  "Creating calendar event",
  "Drafting email",
  "Setting reminder",
  "Ready for approval",
];

const capabilities = [
  [
    "Natural Language Understanding",
    "Turn a sentence into a complete operational plan.",
    BrainCircuit,
  ],
  [
    "AI Email Generation",
    "Draft replies that match the context and your intent.",
    Mail,
  ],
  [
    "Meeting Intelligence",
    "Surface agendas, attendees, decisions, and follow-ups.",
    MessageSquareText,
  ],
  [
    "Smart Scheduling",
    "Find space, resolve conflicts, and protect your focus time.",
    CalendarDays,
  ],
  [
    "Multi-Step Planning",
    "Coordinate messages, meetings, reminders, and next actions.",
    Workflow,
  ],
  [
    "Workflow Automation",
    "Move repeatable work forward with approval-aware AI actions.",
    Command,
  ],
] as const;

const problems = [
  "Inbox overload",
  "Missed follow-ups",
  "Calendar conflicts",
  "Repetitive work",
  "Context switching",
  "Manual scheduling",
  "Forgotten action items",
];

const productFeatures = [
  [
    "AI Executive Briefing",
    "Your daily priorities, risks, and next best actions in one view.",
  ],
  [
    "Commander Alerts",
    "Critical emails, meeting conflicts, and deadlines surfaced early.",
  ],
  [
    "Meeting Summaries",
    "Turn conversations into decisions, owners, and follow-ups.",
  ],
  [
    "AI Inbox Prioritization",
    "Understand what matters now without scanning every thread.",
  ],
  ["Smart Follow-ups", "Never let a key conversation quietly go cold."],
  [
    "Natural Language Commands",
    "Ask once. Commander plans the workflow across your tools.",
  ],
  [
    "AI Productivity Insights",
    "See where your time goes and what the AI can reclaim.",
  ],
];

function DotGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(rgba(231, 255, 244, 0.16) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
        maskImage: "linear-gradient(to bottom, black, transparent 80%)",
      }}
    />
  );
}

export default function ExecutiveLanding() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    if (!isRunning) return;

    setActiveStep(0);
    const interval = window.setInterval(() => {
      setActiveStep((current) => {
        if (current >= executionSteps.length - 1) {
          window.clearInterval(interval);
          setIsRunning(false);
          return current;
        }
        return current + 1;
      });
    }, 680);

    return () => window.clearInterval(interval);
  }, [isRunning]);

  const runDemo = () => {
    setActiveStep(-1);
    setIsRunning(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080a0a] text-[#f4f7f5] selection:bg-emerald-300 selection:text-[#07100c]">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/[0.09] bg-[#0d0f0ef2] px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-5">
          <Link
            href="/"
            className="flex items-center gap-2.5"
            aria-label="Inbox Commander home"
          >
            <span className="flex size-8 items-center justify-center rounded-xl bg-emerald-300 text-[#08100c] shadow-[0_0_28px_rgba(110,231,183,0.28)]">
              <Command className="size-4 stroke-[2.5]" aria-hidden="true" />
            </span>
            <span className="text-sm font-semibold tracking-tight">
              Inbox Commander
            </span>
          </Link>
          <div className="hidden items-center gap-6 text-xs text-[#a9b4ad] md:flex">
            <a href="#capabilities" className="transition hover:text-white">
              Capabilities
            </a>
            <a href="#intelligence" className="transition hover:text-white">
              Intelligence
            </a>
            <a href="#workflow" className="transition hover:text-white">
              How it works
            </a>
            <a href="#technology" className="transition hover:text-white">
              Technology
            </a>
            <a href="#pricing" className="transition hover:text-white">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden px-3 py-2 text-xs text-[#c9d1cc] transition hover:text-white sm:block"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-emerald-300 px-3.5 py-2 text-xs font-semibold text-[#08100c] transition hover:bg-emerald-200"
            >
              Try Commander
            </Link>
            <Menu
              className="size-4 text-[#a9b4ad] md:hidden"
              aria-hidden="true"
            />
          </div>
        </nav>
      </header>

      <main>
        <section className="relative isolate px-6 pb-20 pt-40 sm:pt-48">
          <DotGrid />
          <div className="pointer-events-none absolute left-1/2 top-20 -z-10 size-[620px] -translate-x-1/2 rounded-full bg-emerald-400/[0.13] blur-[150px]" />
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-4xl text-center">
              <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-emerald-200/15 bg-emerald-300/[0.07] px-3 py-1.5 text-[11px] font-medium text-emerald-200">
                <Sparkles className="size-3.5" aria-hidden="true" />
                OpenAI-powered AI Executive Assistant
              </div>
              <h1 className="animate-fade-in-up mt-7 text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[82px]">
                Your workday,
                <span className="block bg-gradient-to-r from-emerald-200 via-white to-emerald-300 bg-clip-text text-transparent">
                  {" "}
                  expertly orchestrated.
                </span>
              </h1>
              <p className="animate-fade-in-up mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-[#a9b4ad] sm:text-lg">
                Inbox Commander uses OpenAI to understand your priorities,
                reason across Gmail and Calendar, then prepare the work that
                moves your day forward.
              </p>
              <div className="animate-fade-in-up mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 px-5 py-3.5 text-sm font-semibold text-[#08100c] shadow-[0_0_34px_rgba(110,231,183,0.2)] transition hover:-translate-y-0.5 hover:bg-emerald-200 sm:w-auto"
                >
                  Meet your AI assistant{" "}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href="#demo"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.07] sm:w-auto"
                >
                  See it in action{" "}
                  <ChevronRight className="size-4" aria-hidden="true" />
                </a>
              </div>
              <p className="mt-5 text-xs text-[#6f7c74]">
                Your approval stays in the loop for every email and calendar
                action.
              </p>
            </div>

            <div className="relative mx-auto mt-16 max-w-5xl rounded-[28px] border border-white/[0.1] bg-gradient-to-b from-white/[0.09] to-white/[0.025] p-2 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="rounded-[21px] border border-white/[0.07] bg-[#0c0f0d] p-4 sm:p-7">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2 text-xs text-[#a9b4ad]">
                    <span className="size-2 rounded-full bg-red-400/80" />
                    <span className="size-2 rounded-full bg-amber-300/80" />
                    <span className="size-2 rounded-full bg-emerald-300/80" />
                    <span className="ml-2">commander.ai</span>
                  </div>
                  <span className="rounded-full border border-emerald-200/15 bg-emerald-300/[0.07] px-2.5 py-1 text-[10px] text-emerald-200">
                    OPENAI AGENT ONLINE
                  </span>
                </div>
                <div className="grid gap-5 py-6 lg:grid-cols-[1.25fr_.75fr]">
                  <div className="rounded-2xl border border-white/[0.08] bg-black/20 p-5 text-left">
                    <div className="flex items-center gap-2 text-xs font-medium text-[#f4f7f5]">
                      <span className="flex size-6 items-center justify-center rounded-lg bg-emerald-300 text-[#08100c]">
                        <Sparkles className="size-3.5" aria-hidden="true" />
                      </span>{" "}
                      Ask Commander anything
                    </div>
                    <p className="mt-6 text-lg leading-relaxed text-white sm:text-xl">
                      “Prepare me for today. Surface anything I cannot afford to
                      miss.”
                    </p>
                    <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/[0.09] bg-white/[0.04] p-2 pl-4 text-sm text-[#a9b4ad]">
                      <Search className="size-4" aria-hidden="true" />
                      <span className="flex-1">What needs my attention?</span>
                      <button
                        type="button"
                        onClick={runDemo}
                        className="rounded-lg bg-emerald-300 px-3 py-2 text-xs font-semibold text-[#08100c] transition hover:bg-emerald-200"
                      >
                        Run
                      </button>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-emerald-200/10 bg-emerald-300/[0.045] p-5 text-left">
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-200">
                      Executive briefing
                    </p>
                    <div className="mt-5 space-y-4">
                      <div>
                        <p className="text-xs text-[#718077]">
                          Highest priority
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          Reply to Northstar contract review
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#718077]">Schedule risk</p>
                        <p className="mt-1 text-sm font-medium">
                          Two meetings overlap at 2:00 PM
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#718077]">
                          Suggested action
                        </p>
                        <p className="mt-1 text-sm font-medium text-emerald-200">
                          Draft reply + propose new time
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-white/[0.018] px-6 py-8">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <p className="text-xs text-[#7f8b84]">
              Built on trusted technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm font-medium text-[#dbe4df] sm:justify-end">
              {["OpenAI", "Gmail", "Google Calendar", "Next.js"].map(
                (technology) => (
                  <span key={technology} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-300" />
                    {technology}
                  </span>
                ),
              )}
            </div>
          </div>
        </section>

        <CommanderFeaturesSection />

        <section id="capabilities" className="px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
              AI capabilities
            </p>
            <div className="mt-4 flex max-w-3xl flex-col justify-between gap-6 md:flex-row">
              <h2 className="text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Intelligence that understands work, not just commands.
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-[#9aa69f]">
                Commander turns the hidden work of coordination into a plan you
                can review and approve.
              </p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map(([title, description, Icon]) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200/25 hover:bg-emerald-300/[0.04]"
                >
                  <span className="flex size-10 items-center justify-center rounded-xl border border-emerald-200/15 bg-emerald-300/[0.08] text-emerald-200">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-8 text-base font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#92a098]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-28">
          <div className="mx-auto max-w-6xl rounded-3xl border border-white/[0.08] bg-gradient-to-br from-[#131a16] to-[#0d100f] p-7 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                  Problems we solve
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em]">
                  Less coordination. More command.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-[#9aa69f]">
                  Your assistant sees the work accumulating across email and
                  calendar before it becomes a problem.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {problems.map((problem, index) => (
                  <div
                    key={problem}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-black/15 px-4 py-3 text-sm text-[#d9e0dc]"
                  >
                    <span className="text-[10px] text-emerald-200">
                      0{index + 1}
                    </span>
                    {problem}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className="relative border-y border-white/[0.07] bg-[#0a0d0b] px-6 py-28"
        >
          <DotGrid />
          <div className="relative mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                How OpenAI works
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                From intent to execution in one intelligent workflow.
              </h2>
            </div>
            <div className="relative mx-auto mt-16 grid max-w-5xl gap-3 md:grid-cols-7 md:gap-0">
              {[
                "User Prompt",
                "OpenAI Understands",
                "Reasons",
                "Plans",
                "Calls Gmail",
                "Calls Calendar",
                "Returns Results",
              ].map((label, index) => (
                <div
                  key={label}
                  className="relative flex flex-col items-center text-center md:min-w-0"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-200/20 bg-emerald-300/[0.08] text-sm font-semibold text-emerald-200">
                    {index + 1}
                  </div>
                  <p className="mt-3 max-w-[108px] text-xs leading-snug text-[#dce6e0]">
                    {label}
                  </p>
                  {index < 6 && (
                    <span className="my-2 h-5 w-px bg-emerald-200/25 md:absolute md:left-[calc(50%+28px)] md:top-5 md:my-0 md:h-px md:w-[calc(100%-56px)]" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="px-6 py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                Live AI demo
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                One request. A coordinated plan.
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-[#9aa69f]">
                Commander understands the end-to-end outcome you want, lays out
                the workflow, and leaves every external action ready for your
                approval.
              </p>
              <button
                type="button"
                onClick={runDemo}
                disabled={isRunning}
                className="mt-7 inline-flex items-center gap-2 rounded-xl border border-emerald-200/20 bg-emerald-300/[0.08] px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-300/[0.14] disabled:opacity-60"
              >
                <Sparkles className="size-4" aria-hidden="true" />
                {isRunning ? "Commander is working…" : "Run the workflow"}
              </button>
            </div>
            <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-[#0b0e0c] shadow-2xl shadow-black/30">
              <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
                <div className="flex items-center gap-2 text-xs text-[#a6b0aa]">
                  <span className="size-2 rounded-full bg-emerald-300" /> Live
                  execution
                </div>
                <MoreHorizontal
                  className="size-4 text-[#77837b]"
                  aria-hidden="true"
                />
              </div>
              <div className="p-5 sm:p-7">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 text-sm leading-relaxed text-[#e9efeb]">
                  “Schedule a meeting with Sarah next Tuesday, send an
                  invitation, and remind me.”
                </div>
                <div className="mt-5 space-y-2">
                  {executionSteps.map((step, index) => {
                    const complete = activeStep >= index;
                    const current = isRunning && activeStep === index;
                    return (
                      <div
                        key={step}
                        className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${complete ? "border-emerald-200/15 bg-emerald-300/[0.07] text-emerald-100" : "border-white/[0.06] bg-white/[0.02] text-[#68746c]"}`}
                      >
                        <span
                          className={`flex size-5 items-center justify-center rounded-full border ${complete ? "border-emerald-200/30 bg-emerald-300 text-[#07100c]" : "border-white/[0.12]"}`}
                        >
                          {complete ? (
                            <Check
                              className="size-3.5 stroke-[3]"
                              aria-hidden="true"
                            />
                          ) : current ? (
                            <span className="size-2 animate-ping rounded-full bg-emerald-200" />
                          ) : null}
                        </span>
                        <span className="flex-1">{step}</span>
                        {current && (
                          <span className="text-[10px] uppercase tracking-wider text-emerald-200">
                            running
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-white/[0.018] px-6 py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                  Built for the whole day
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                  The operating system for your attention.
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#9aa69f]">
                Proactive intelligence that helps you lead the day instead of
                reacting to it.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {productFeatures.map(([title, description], index) => (
                <article
                  key={title}
                  className={`rounded-2xl border p-6 ${index === 0 ? "border-emerald-200/20 bg-emerald-300/[0.07] lg:col-span-2" : "border-white/[0.08] bg-white/[0.02]"}`}
                >
                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-emerald-200">
                    0{index + 1}
                  </span>
                  <h3 className="mt-7 text-lg font-medium">{title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-[#94a199]">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="technology" className="px-6 py-28">
          <div className="mx-auto max-w-6xl rounded-3xl border border-emerald-200/15 bg-gradient-to-br from-emerald-300/[0.09] via-[#111612] to-[#0b0e0c] p-7 sm:p-12">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                  Technology stack
                </p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em]">
                  OpenAI is the intelligence layer.
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-[#a5b1aa]">
                  OpenAI interprets intent, reasons over your work context, and
                  produces an approval-ready plan. The rest of the stack turns
                  that intelligence into reliable actions.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["OpenAI", "Core intelligence"],
                  ["Next.js", "Product runtime"],
                  ["Gmail API", "Email context"],
                  ["Google Calendar API", "Schedule context"],
                  ["Better Auth", "Secure access"],
                ].map(([name, role], index) => (
                  <div
                    key={name}
                    className={`rounded-xl border border-white/[0.1] bg-black/20 p-4 ${index === 0 ? "col-span-2 border-emerald-200/25 bg-emerald-300/[0.1]" : ""}`}
                  >
                    <p className="font-medium text-white">{name}</p>
                    <p className="mt-1 text-xs text-[#92a097]">{role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PricingSection />

        <section className="px-6 pb-24">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/[0.09] bg-[#101512] px-7 py-16 text-center sm:px-12">
            <div className="pointer-events-none absolute left-1/2 top-0 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/[0.12] blur-[100px]" />
            <div className="relative">
              <ShieldCheck
                className="mx-auto size-6 text-emerald-200"
                aria-hidden="true"
              />
              <h2 className="mx-auto mt-5 max-w-2xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Give your workday an executive assistant.
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#9ca9a1]">
                Connect your tools, ask in plain language, and review every
                action before it happens.
              </p>
              <Link
                href="/signup"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-5 py-3.5 text-sm font-semibold text-[#08100c] transition hover:bg-emerald-200"
              >
                Start with Inbox Commander{" "}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] px-6 py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-xs text-[#718077] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-[#cfd8d2]">
            <Command className="size-3.5 text-emerald-200" aria-hidden="true" />{" "}
            Inbox Commander
          </div>
          <p>OpenAI-powered productivity, with you in control.</p>
          <div className="flex items-center gap-3">
            <Clock3 className="size-3.5" aria-hidden="true" /> Approval-first
            automation
          </div>
        </div>
      </footer>
    </div>
  );
}
