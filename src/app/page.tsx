import Link from "next/link";

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Google Calendar",
    desc: "Create, view and delete events directly from your command center without switching tabs.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1a2 2 0 00-2-2H4" />
      </svg>
    ),
    title: "Gmail Drafts",
    desc: "Compose and manage email drafts with a clean split-view interface. Save and delete with one click.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Secure Auth",
    desc: "Sign in with Google OAuth or email credentials. Sessions are secured via better-auth.",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Multi-Tenant",
    desc: "Built on the Corsair engine — each user's Google tokens are isolated and managed securely.",
  },
];

const techSpecs = [
  { metric: "99.98%", label: "API Sync Uptime" },
  { metric: "< 42ms", label: "Corsair Latency" },
  { metric: "AES-256", label: "Token Encryption" },
  { metric: "12 / sec", label: "Max Rate Limits" },
];

const testimonials = [
  {
    quote: "I used to think Superhuman was the endgame for speed. Commander takes that layout, gives me a side-by-side view of my execution roadmap, and builds the drafts for me. Absolutely ridiculous output optimization.",
    author: "Alex Rivers",
    role: "Principal Infrastructure Lead",
    company: "Vektor.io",
    handle: "@v_rivers",
    metrics: "Saved 14h/week"
  },
  {
    quote: "Keeping up with calendar blocks and corresponding email threads felt like manual context stitching. Having an intelligent console that treats calendar entities as operational nodes has rewired my pipeline entirely.",
    author: "Elena Rostova",
    role: "Technical Product Operator",
    company: "Aether Engine",
    handle: "@elena_rostov",
    metrics: "Inbox Zero x 40 Days"
  },
  {
    quote: "The zero-cache architecture combined with keyboard-first workflows makes it perfect for secure enterprise use. It is raw, ultra-fast power without the typical browser wrapper bloat.",
    author: "Marcus Chen",
    role: "Founding Engineer",
    company: "ZeroState Security",
    handle: "@mchen_dev",
    metrics: "<50ms Execution Time"
  }
];

const tiers = [
  {
    name: "Base Deck",
    price: "0",
    desc: "Essential command capabilities for solo developers and power users.",
    features: [
      "1 Connected Google Account",
      "Real-time Gmail Draft Sync",
      "Standard Calendar Control",
      "Better-Auth Security Layer"
    ],
    cta: "Deploy Free",
    popular: false,
  },
  {
    name: "Overclocked Pro",
    price: "45",
    desc: "Advanced terminal access for hyper-productive operators and builders.",
    features: [
      "20 Connected Workspaces",
      "Priority Corsair Engine Routing",
      "Vim Keyboard Macro Bindings",
      "AI Context Autocomplete",
      "Smart Thread Synthesis Engine"
    ],
    cta: "Initialize Uplink",
    popular: true,
  },
  {
    name: "Enterprise Shard",
    price: "99",
    desc: "Dedicated performance matrices and full semantic intelligence infrastructure.",
    features: [
      "Unlimited Google Profiles",
      "Dedicated Server Sharding",
      "Custom Webhook Integration Pipelines",
      "Zero-Retention Compliance Box",
      "24/7 Priority Core Shard Support",
      "Beta Access to Autonomous Agents"
    ],
    cta: "Request Shard Access",
    popular: false,
  },
];

const faqs = [
  { q: "How secure is my Google Account data?", a: "Extremely secure. Your authentication is isolated via better-auth protocols. Tokens are fully sandboxed on our Corsair multi-tenant architecture, meaning your access scopes are strictly confined to your terminal slice and revocable at any millisecond." },
  { q: "Can I connect multiple Google Workspaces?", a: "Yes. With the Overclocked Pro ($45) and Enterprise Shard ($99) tiers, you can link cross-domain Google identities and orchestrate drafts/events globally across multiple profiles seamlessly." },
  { q: "What is the Corsair Engine?", a: "It is our proprietary underlying system designed for low-latency state synchronizations with Google APIs, turning clunky network requests into immediate local UI mutations." },
];

export default function LandingPage() {
  return (
    <div
      className="min-h-screen flex flex-col antialiased select-none overflow-x-hidden"
      style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}
    >
      {/* ── NAV ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ borderBottom: "1px solid var(--border)", background: "rgba(8,13,5,0.85)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: "var(--lime)", boxShadow: "0 0 16px rgba(200,241,53,0.25)" }}
            >
              <svg className="w-4 h-4" style={{ color: "var(--bg-base)" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xs font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--text-primary)" }}>
              Inbox Commander
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            {["Features", "Control Room", "Specs", "Reviews", "Pricing", "Logs"].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase().replace(/ /g, "-")}`}
                className="text-[10px] font-bold uppercase tracking-widest transition hover:opacity-100 opacity-60"
                style={{ color: "var(--text-primary)" }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[10px] font-bold uppercase tracking-widest transition hover:opacity-80"
              style={{ color: "var(--lime)" }}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition active:scale-[0.97]"
              style={{ background: "var(--lime)", color: "var(--bg-base)" }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-32 text-center overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-10" style={{ background: "var(--lime)" }} />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-5" style={{ background: "var(--lime)" }} />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(var(--lime) 1px, transparent 1px), linear-gradient(90deg, var(--lime) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[9px] font-extrabold uppercase tracking-widest font-mono" style={{ background: "rgba(200,241,53,0.08)", border: "1px solid rgba(200,241,53,0.2)", color: "var(--lime)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--lime)" }} />
            Google Workspace Command Center · v1.2
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-none uppercase">
            <span style={{ color: "var(--text-primary)" }}>Inbox</span>
            <br />
            <span style={{ color: "var(--lime)", textShadow: "0 0 40px rgba(200,241,53,0.3)" }}>Commander</span>
          </h1>

          {/* Sub */}
          <p className="text-sm md:text-base max-w-lg mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Your all-in-one control panel for Gmail drafts and Google Calendar.
            Compose, schedule, and delete — all from one blazing-fast interface.
          </p>

          {/* CTA Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/signup"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-200 active:scale-[0.97]"
              style={{ background: "var(--lime)", color: "var(--bg-base)", boxShadow: "0 0 30px rgba(200,241,53,0.2)" }}
            >
              Start for Free
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#pricing"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 active:scale-[0.97]"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            >
              View System Matrix
            </a>
          </div>

          {/* Social proof strip */}
          <p className="text-[10px] font-mono" style={{ color: "var(--text-muted)" }}>
            Secured with Google OAuth · Built on Next.js 16 · Powered by Corsair
          </p>
        </div>
      </section>

      {/* ── METRIC LIVE TICKER ──────────────────── */}
      <section className="border-t border-b border-[var(--border)] py-6" style={{ background: "rgba(200,241,53,0.01)" }}>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {techSpecs.map((spec) => (
            <div key={spec.label} className="font-mono">
              <div className="text-xl md:text-2xl font-extrabold text-[var(--lime)]">{spec.metric}</div>
              <div className="text-[9px] uppercase tracking-widest mt-1 opacity-50">{spec.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section id="features" className="px-6 py-24" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
              Core Modules
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight" style={{ color: "var(--text-primary)" }}>
              Everything you need
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              Built for speed. No clutter, no bloat — just the controls that matter.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-6 rounded-2xl space-y-4 transition-all duration-200 border border-[var(--border)] hover:border-[rgba(200,241,53,0.25)]"
                style={{ background: "var(--bg-card)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: "rgba(200,241,53,0.06)", border: "1px solid rgba(200,241,53,0.15)", color: "var(--lime)" }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>{f.title}</h3>
                  <p className="text-[11px] leading-relaxed mt-2" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPLIT-VIEW COMPONENT INTERFACE ─────── */}
      <section id="control-room" className="px-6 py-24 border-t border-[var(--border)]" style={{ background: "rgba(8,13,5,0.2)" }}>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
              Realtime Operation
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight" style={{ color: "var(--text-primary)" }}>
              The Twin-Engine Command Bay
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              No tab switching. Draft high-importance communications while holding the context of your calendar nodes.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-start font-mono text-[11px]">
            {/* Left Box: Gmail Module */}
            <div className="lg:col-span-7 rounded-2xl border border-[var(--border)] p-6 space-y-4" style={{ background: "var(--bg-card)" }}>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <span className="text-[10px] font-extrabold tracking-widest uppercase text-[var(--lime)]">MODULE_GMAIL_DRAFT // COMPOSER</span>
                <span className="opacity-40 text-[9px]">ID: 0x883A</span>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block opacity-40 uppercase tracking-wider text-[9px] mb-1">To:</label>
                  <div className="w-full px-3 py-2 rounded bg-[var(--bg-surface)] border border-[var(--border)] opacity-80">investors@corsair.engine</div>
                </div>
                <div>
                  <label className="block opacity-40 uppercase tracking-wider text-[9px] mb-1">Subject:</label>
                  <div className="w-full px-3 py-2 rounded bg-[var(--bg-surface)] border border-[var(--border)] text-[var(--lime)]">[URGENT] Infrastructure Deployment Overclock v1.2</div>
                </div>
                <div>
                  <label className="block opacity-40 uppercase tracking-wider text-[9px] mb-1">Body Architecture:</label>
                  <div className="w-full px-3 py-4 rounded bg-[var(--bg-surface)] border border-[var(--border)] opacity-60 min-h-[100px]">
                    Team, the token sandboxing processes are officially optimized. Requesting synchronous validation sequence inside the calendar grid window.
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button className="px-3 py-1.5 rounded border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition">PURGE</button>
                <button className="px-4 py-1.5 rounded font-extrabold uppercase bg-[var(--lime)] text-[var(--bg-base)] shadow-[0_0_15px_rgba(200,241,53,0.2)]">STAGE DRAFT</button>
              </div>
            </div>

            {/* Right Box: Calendar Module */}
            <div className="lg:col-span-5 rounded-2xl border border-[var(--border)] p-6 space-y-4" style={{ background: "var(--bg-card)" }}>
              <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
                <span className="text-[10px] font-extrabold tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>MODULE_CALENDAR // SCHEDULER</span>
                <span className="w-2 h-2 rounded-full bg-[var(--lime)] animate-ping" />
              </div>
              <div className="space-y-2.5">
                {[
                  { time: "09:00", title: "Core Architecture Sync", status: "COMPLETED", active: false },
                  { time: "11:30", title: "Google OAuth State Refresh", status: "ACTIVE NODE", active: true },
                  { time: "14:00", title: "Corsair Engine Load Testing", status: "QUEUED", active: false },
                ].map((slot, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded border transition ${
                      slot.active ? "border-[var(--lime)] bg-[rgba(200,241,53,0.02)]" : "border-[var(--border)] opacity-60"
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className={slot.active ? "text-[var(--lime)]" : ""}>{slot.time}</span>
                      <span className="text-[9px] tracking-wider uppercase opacity-50">{slot.status}</span>
                    </div>
                    <div className="mt-1 text-[10px] truncate">{slot.title}</div>
                  </div>
                ))}
              </div>
              <button className="w-full py-2.5 rounded-xl border border-dashed border-[rgba(200,241,53,0.4)] text-[var(--lime)] hover:bg-[rgba(200,241,53,0.03)] transition font-bold uppercase tracking-wider text-[10px]">
                + Inject New Matrix Block
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ADVANCED SPECS GRID ────────────────── */}
      <section id="specs" className="px-6 py-24 border-t border-[var(--border)]" style={{ background: "var(--bg-surface)" }}>
        <div className="max-w-5xl mx-auto space-y-14">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="space-y-3 md:col-span-1">
              <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
                Deep Architecture
              </span>
              <h2 className="text-2xl font-extrabold uppercase tracking-tight" style={{ color: "var(--text-primary)" }}>
                Low Latency. High Density.
              </h2>
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Designed exclusively for operators who treat email management and calendar alignments as critical runtime operations.
              </p>
            </div>

            <div className="md:col-span-2 grid sm:grid-cols-2 gap-5 font-mono text-[11px]">
              <div className="p-5 rounded-xl border border-[var(--border)] space-y-2" style={{ background: "var(--bg-card)" }}>
                <div className="text-[var(--lime)] font-extrabold uppercase tracking-widest">Webhooks Pipeline</div>
                <p className="opacity-70 leading-relaxed text-[10px]">Pipe inbound Gmail triggers into webhooks. Feed your local automations or messaging vectors dynamically.</p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--border)] space-y-2" style={{ background: "var(--bg-card)" }}>
                <div className="text-[var(--text-primary)] font-extrabold uppercase tracking-widest">Isolated Sandbox</div>
                <p className="opacity-70 leading-relaxed text-[10px]">Encryption parameters utilize isolated environment variables per tenant profile layer. Zero cross-leakage.</p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--border)] space-y-2" style={{ background: "var(--bg-card)" }}>
                <div className="text-[var(--text-primary)] font-extrabold uppercase tracking-widest">Macro Bindings</div>
                <p className="opacity-70 leading-relaxed text-[10px]">Map native vim or customized hotkeys directly inside your workspace browser context for lightning execution.</p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--border)] space-y-2" style={{ background: "var(--lime)] font-extrabold uppercase tracking-widest"}}>Zero Cache Footprint</div>
              <p className="opacity-70 leading-relaxed text-[10px]">Data flows in state transitions. Your full email body blocks are never permanently indexed in our disk logs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── TERMINAL TESTIMONIALS ──────────────── */}
      <section id="reviews" className="px-6 py-24 border-t border-[var(--border)] bg-[#080d05]/30">
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
              Telemetry Feedback
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight" style={{ color: "var(--text-primary)" }}>
              Validated by High-Output Operators
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              See how tech-forward professionals leverage keyboard-first command vectors over standard configurations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 font-mono">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-[var(--border)] flex flex-col justify-between space-y-6 relative overflow-hidden"
                style={{ background: "var(--bg-card)" }}
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

                <div className="space-y-4">
                  <div className="inline-block text-[9px] font-bold px-2 py-0.5 rounded bg-[rgba(200,241,53,0.05)] text-[var(--lime)] border border-[rgba(200,241,53,0.15)]">
                    // {t.metrics}
                  </div>
                  <p className="text-[11px] leading-relaxed opacity-80 italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-dashed border-[var(--border)] flex items-center justify-between text-[10px]">
                  <div>
                    <div className="font-extrabold text-[var(--text-primary)]">{t.author}</div>
                    <div className="opacity-50 text-[9px] truncate max-w-[160px]">{t.role}, <span className="text-[var(--lime)]">{t.company}</span></div>
                  </div>
                  <span className="opacity-40 text-[9px] text-right">{t.handle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPDATED PRICING MATRIX (3 PLANS: $0, $45, $99) ─────────────────────────────────── */}
      <section id="pricing" className="px-6 py-24" style={{ background: "var(--bg-base)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-6xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
              License Tiers
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight" style={{ color: "var(--text-primary)" }}>
              Predictable Pricing Matrix
            </h2>
            <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
              Scale your communication bandwidth with specialized architecture allocations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 border ${
                  tier.popular
                    ? "border-[var(--lime)] bg-[var(--bg-card)] shadow-[0_0_30px_rgba(200,241,53,0.1)] md:scale-[1.03] z-10"
                    : "border-[var(--border)] bg-[var(--bg-card)]"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-6 px-3 py-1 text-[8px] tracking-widest font-extrabold uppercase rounded-full font-mono bg-[var(--lime)] text-[var(--bg-base)]">
                    RECOMMENDED DEPLOYMENT
                  </span>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xs font-extrabold font-mono uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>{tier.name}</h3>
                    <p className="text-[11px] mt-2 leading-relaxed h-[36px] overflow-hidden" style={{ color: "var(--text-secondary)" }}>{tier.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-mono text-[var(--text-primary)]">${tier.price}</span>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)]">/ monthly</span>
                  </div>

                  <hr className="border-[var(--border)]" />

                  <ul className="space-y-3 text-[11px]">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <svg className="w-3.5 h-3.5 shrink-0 text-[var(--lime)] mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span style={{ color: "var(--text-secondary)" }}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <Link
                    href="/signup"
                    className={`w-full flex items-center justify-center py-3 rounded-xl text-[10px] font-extrabold uppercase tracking-widest transition-all ${
                      tier.popular
                        ? "bg-[var(--lime)] text-[var(--bg-base)] shadow-[0_0_20px_rgba(200,241,53,0.15)] active:scale-[0.98]"
                        : "border border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--lime)] active:scale-[0.98]"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section id="how-it-works" className="px-6 py-24">
        <div className="max-w-4xl mx-auto space-y-14">
          <div className="text-center space-y-3">
            <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
              Quick Start
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight" style={{ color: "var(--text-primary)" }}>
              Up in 3 steps
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Create Account", desc: "Sign up with your email or connect instantly with Google OAuth." },
              { step: "02", title: "Connect Google", desc: "Authorize Gmail and Calendar access — scoped, secure, revocable." },
              { step: "03", title: "Take Command", desc: "Manage emails and events from a single, distraction-free dashboard." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative p-6 rounded-2xl space-y-3" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                <span className="text-5xl font-extrabold font-mono opacity-10 absolute top-4 right-5 leading-none" style={{ color: "var(--lime)" }}>
                  {step}
                </span>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-extrabold" style={{ background: "rgba(200,241,53,0.1)", border: "1px solid rgba(200,241,53,0.2)", color: "var(--lime)" }}>
                  {step}
                </div>
                <h3 className="text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM FAQ / LOGS ──────────────────────────────── */}
      <section id="logs" className="px-6 py-24" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-surface)" }}>
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[9px] font-extrabold tracking-widest uppercase font-mono" style={{ color: "var(--lime)" }}>
              Knowledge Base
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight" style={{ color: "var(--text-primary)" }}>
              System Manifest / FAQ
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-xl border border-[var(--border)] space-y-2" style={{ background: "var(--bg-card)" }}>
                <h4 className="text-xs font-mono font-extrabold text-[var(--lime)] uppercase tracking-wider">
                  Q// {faq.q}
                </h4>
                <p className="text-[11px] leading-relaxed pl-4 border-l border-[rgba(200,241,53,0.2)]" style={{ color: "var(--text-secondary)" }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────── */}
      <section className="px-6 py-20" style={{ borderTop: "1px solid var(--border)", background: "var(--bg-surface)" }}>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-tight" style={{ color: "var(--text-primary)" }}>
            Ready to take <span style={{ color: "var(--lime)" }}>command?</span>
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Free to use. No credit card required.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-200 active:scale-[0.97]"
            style={{ background: "var(--lime)", color: "var(--bg-base)", boxShadow: "0 0 40px rgba(200,241,53,0.2)" }}
          >
            Get Started Free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── HIGHLY DETAILED CYBERPUNK FOOTER ── */}
      <footer className="px-6 pt-16 pb-8 border-t border-[var(--border)] bg-[#040703]/95 font-mono text-[11px]">
        <div className="max-w-6xl mx-auto space-y-12">

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">

            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "var(--lime)" }}>
                  <svg className="w-3 h-3" style={{ color: "var(--bg-base)" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xs font-extrabold tracking-widest uppercase text-[var(--text-primary)]">
                  Inbox Commander AI
                </span>
              </div>
              <p className="text-[11px] leading-relaxed max-w-sm" style={{ color: "var(--text-secondary)" }}>
                The high-density terminal interface built to unify enterprise communication streams and workspace coordination layers. Blazing speed meets autonomous context tracking.
              </p>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-1.5 max-w-sm">
                <div className="text-[9px] font-extrabold tracking-widest text-[var(--text-muted)] uppercase flex items-center gap-1.5">
                  <svg className="w-3 h-3 text-[var(--lime)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  DESIGN INSPIRATION
                </div>
                <p className="text-[10px] leading-relaxed opacity-60">
                  Proudly inspired by the lightning-fast keyboard-first workflow of <a href="https://superhuman.com/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-primary)] hover:text-[var(--lime)] underline transition-colors">Superhuman</a>. Built for sub-100ms actions paired with next-generation AI intelligence.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" /> AI Agents Online
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] bg-[rgba(200,241,53,0.05)] text-[var(--lime)] border border-[rgba(200,241,53,0.15)]">
                  LLM Core v2.4-Hybrid
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--lime)] block">AI Core Layer</span>
              <ul className="space-y-2">
                {[
                  "Contextual Autocomplete",
                  "Intent Vector Shards",
                  "Smart Thread Synthesis",
                  "Automated Follow-ups",
                  "Dynamic Semantic Search",
                  "Draft Optimization AI"
                ].map((item) => (
                  <li key={item} className="group flex items-center gap-1">
                    <span className="opacity-0 group-hover:opacity-100 text-[var(--lime)] transition-opacity">&middot;</span>
                    <span className="hover:text-[var(--lime)] opacity-60 hover:opacity-100 transition-opacity">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-primary)] block">Command Hub</span>
              <ul className="space-y-2">
                {[
                  "Control Room",
                  "Keyboard Shortcuts",
                  "Pricing Matrix",
                  "System Logs",
                  "Developer API Node",
                  "Telemetry Deck"
                ].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase().replace(/ /g, "-")}`} className="hover:text-[var(--text-primary)] opacity-60 hover:opacity-100 transition-opacity block">
                      &gt; {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-muted)] block">Compliance & Sec</span>
              <ul className="space-y-2 text-[10px]">
                {[
                  "AES-256 Protocol",
                  "Google OAuth Scope",
                  "Revocation Panel",
                  "Multi-Tenant Iso",
                  "Zero-Retention Privacy",
                  "SOC2 Audit Pipeline"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-1.5 opacity-50 hover:opacity-80 transition-opacity cursor-default">
                    <span className="text-[var(--lime)]">[✓]</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <hr className="border-[var(--border)] opacity-40" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[10px]" style={{ color: "var(--text-muted)" }}>

            <div className="space-y-1 text-center md:text-left">
              <div>
                © {new Date().getFullYear()} Inbox Commander Inc. Matrix connection: encrypted telemetry.
              </div>
              <div className="opacity-50 text-[9px]">
                Engineered with Next.js 16 · better-auth engine · Google API Zero-Cache compliance certified.
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6 font-mono opacity-40 text-[9px]">
              <div>LOC: {Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC"}</div>
              <div>TZ: UTC/{new Date().getTimezoneOffset() / -60 >= 0 ? `+${new Date().getTimezoneOffset() / -60}` : new Date().getTimezoneOffset() / -60}</div>
              <div>LLM INFERENCE: 24ms</div>
              <div>PIPELINE: EDGE_STABLE</div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-[var(--text-primary)] transition">
                Terms of Operation
              </Link>
              <span className="opacity-20">|</span>
              <Link href="/privacy" className="hover:text-[var(--text-primary)] transition">
                Privacy Architecture
              </Link>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
