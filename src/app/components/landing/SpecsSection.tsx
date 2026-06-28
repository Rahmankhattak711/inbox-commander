export default function SpecsSection() {
  return (
    <section
      id="specs"
      className="px-6 py-32  relative overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Structural Ambient Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--lime-glow)] blur-[150px] pointer-events-none rounded-full opacity-20" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[var(--lime)]/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Modern Editorial Header Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16 border-b border-[var(--border-muted)]">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--bg-surface)] text-[10px] font-extrabold tracking-widest text-[var(--lime)]">
              -- Core Architecture
            </div>
            <h2
              className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-balance"
              style={{ color: "var(--text-primary)" }}
            >
              Engineered for speed.
              <br />
              <span className="text-[var(--text-secondary)] opacity-60">
                Zero compromises.
              </span>
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-6">
            <p
              className="text-base md:text-md max-w-xl mx-auto text-pretty"
              style={{ color: "var(--text-secondary)" }}
            >
              A clean, keyboard-first framework crafted meticulously for teams
              managing mission-critical daily communications under
              uncompromising security parameters.
            </p>
          </div>
        </div>

        {/* Premium, Non-Box Feature Rows */}
        <div className="mt-16 grid md:grid-cols-2 gap-x-12 gap-y-16">
          {/* Feature 1 */}
          <div className="group pl-6 border-l-2 border-[var(--border)] hover:border-[var(--lime)] transition-colors duration-300 space-y-3">
            <div className="text-[10px] font-bold tracking-widest text-[var(--lime)] uppercase">
              [ 01 -- Pipeline ]
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              Real-Time Sync Webhooks
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Instantly broadcast high-importance incoming email updates
              straight to your localized workflows, custom internal scripts, or
              database endpoints with zero middleware delays.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group pl-6 border-l-2 border-[var(--border)] hover:border-[var(--text-primary)] transition-colors duration-300 space-y-3">
            <div className="text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase">
              [ 02 -- Security ]
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              Isolated Tenant Sandboxing
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Complete runtime isolation. Authentication variables, tokens, and
              active profile access frames sit inside strictly siloed structural
              layers to eliminate internal leaks.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group pl-6 border-l-2 border-[var(--border)] hover:border-[var(--text-primary)] transition-colors duration-300 space-y-3">
            <div className="text-[10px] font-bold tracking-widest text-[var(--text-secondary)] uppercase">
              [ 03 -- Interface ]
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              Native Key Bindings
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Fly through your workspace without touching your mouse. Bind
              precise terminal-style hotkeys and directional layouts natively
              right within your primary browser context.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group pl-6 border-l-2 border-[var(--border)] hover:border-[var(--lime)] transition-colors duration-300 space-y-3">
            <div className="text-[10px] font-bold tracking-widest text-[var(--lime)] uppercase">
              [ 04 -- Privacy ]
            </div>
            <h3 className="text-xl font-bold uppercase tracking-tight text-[var(--text-primary)]">
              Zero-Retention Data Logs
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              Absolute privacy by design. Raw content parameters live strictly
              inside short-lived React state transformations and are never
              cached or permanently indexed to an external disk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
