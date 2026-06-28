export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="px-6 py-24"
    //  style={{ background: "var(--bg-surface)" }}
    >
      <div className="max-w-4xl mx-auto space-y-14">
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[10px] font-extrabold tracking-widest text-[var(--lime)]">
            How it works
          </span>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-balance"
            style={{ color: "var(--text-primary)" }}
          >
            Set up in a minute. Use for years.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Connect in one click",
              desc: "Sign in with Google. Inbox Commander connects Gmail and Google Calendar immediately. No migration, no configuration, no setup guides.",
            },
            {
              step: "02",
              title: "Everything in one place",
              desc: "Your inbox and calendar live side by side in a focused reading pane. Smart category tabs. Full conversation context. Nothing buried.",
            },
            {
              step: "03",
              title: "Move faster with AI",
              desc: "Ask the AI to draft a reply, schedule a meeting, or triage your inbox. From the chat panel or the command palette, in plain language.",
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="relative p-6 rounded-2xl space-y-3"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <span
                className="text-5xl font-extrabold opacity-10 absolute top-4 right-5 leading-none"
                style={{ color: "var(--lime)" }}
              >
                {step}
              </span>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-extrabold"
                style={{
                  background: "rgba(200,241,53,0.1)",
                  border: "1px solid rgba(200,241,53,0.2)",
                  color: "var(--lime)",
                }}
              >
                {step}
              </div>
              <h3
                className="text-xs font-extrabold uppercase tracking-widest"
                style={{ color: "var(--text-primary)" }}
              >
                {title}
              </h3>
              <p
                className="text-[11px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
