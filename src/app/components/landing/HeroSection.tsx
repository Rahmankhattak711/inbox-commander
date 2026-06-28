import Link from "next/link";
import HeroMockup from "./HeroMockup";

export default function HeroSection() {
  return (
    <section className="relative flex-1 flex flex-col items-center justify-center px-6 pt-32 text-center [mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,white_10%,transparent_100%)]">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Glow blobs */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10 animate-blob"
          style={{ background: "var(--lime)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5 animate-blob delay-200"
          style={{ background: "var(--lime)" }}
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--lime) 1px, transparent 1px), linear-gradient(90deg, var(--lime) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-extrabold tracking-widest "
          style={{
            background: "rgba(200,241,53,0.08)",
            border: "1px solid rgba(200,241,53,0.2)",
            color: "var(--lime)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--lime)" }}
          />
          Schedule meetings naturally | Reply to emails | draft emails | Manage
          your day
        </div>

        {/* Headline */}
        <h1 className="text-7xl md:text-7xl font-extrabold tracking-tight leading-none">
          <span style={{ color: "var(--text-primary)" }}>
            Your AI agent for
          </span>
          <br />
          <span
            className="animate-glow-pulse"
            style={{
              color: "var(--lime)",
              textShadow: "0 0 40px rgba(200,241,53,0.3)",
            }}
          >
            email and calendar.
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-sm md:text-base max-w-lg mx-auto leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          Inbox Commander Gmail and Google Calendar through an AI agent that
          drafts, schedules, and triages — and always waits for your approval
          before acting.
        </p>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5"
            style={{
              background: "var(--lime)",
              color: "var(--bg-base)",
              boxShadow: "0 0 30px rgba(200,241,53,0.2)",
            }}
          >
            Start for Free
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              focusable="false"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <title>Arrow right</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
          <a
            href="#pricing"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-[0.97] hover:-translate-y-0.5"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
            }}
          >
            View System Matrix
          </a>
        </div>

        {/* Social proof strip */}
        <p
          className="text-[10px]"
          style={{ color: "var(--text-muted)" }}
        >
          Corsair MCP · OpenAI Agents · Real-time Webhooks · OAuth 2.0
        </p>
      </div>

      <HeroMockup />
    </section>
  );
}
