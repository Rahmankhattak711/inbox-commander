"use client";

interface AnalyticsSectionProps {
  emailsCount: number;
  draftsCount: number;
  eventsCount: number;
}

export default function AnalyticsSection({ emailsCount, draftsCount, eventsCount }: AnalyticsSectionProps) {
  // Inbox Health gauge
  const total = emailsCount + draftsCount;
  const progressPct = total > 0 ? Math.round((emailsCount / total) * 100) : 0;
  const cx = 150, cy = 140, r = 100;
  const circumf = Math.PI * r;
  const filled = (circumf * progressPct) / 100;

  // Bar chart data
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const barStyles = [
    { type: "striped" },
    { type: "solid", color: "#233d18" },
    { type: "solid", color: "var(--lime)", tooltip: "14%" },
    { type: "solid", color: "#233d18" },
    { type: "striped" },
    { type: "striped" },
    { type: "striped" },
  ] as const;

  // Sparkline
  const W = 700, H = 60;
  const base = eventsCount || 0;
  const pts = Array.from({ length: 13 }, (_, i) =>
    Math.max(0, Math.round(base * (0.3 + Math.sin(i * 0.8) * 0.4 + Math.random() * 0.3)))
  );
  const max = Math.max(...pts, 1);
  const xs = pts.map((_, i) => (i / (pts.length - 1)) * W);
  const ys = pts.map((v) => H - (v / max) * (H - 8) - 4);
  const linePath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const fillPath = `${linePath} L${W},${H} L0,${H} Z`;

  return (
    <div className="space-y-4">
      {/* Section label */}
      <div className="flex items-center gap-3">
        <h3
          className="text-[9px] font-extrabold uppercase tracking-widest font-mono"
          style={{ color: "var(--text-secondary)" }}
        >
          Analytics
        </h3>
        <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
      </div>

      {/* Charts row */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Bar Chart */}
        <div
          className="lg:col-span-2 rounded-3xl p-6 md:p-8 space-y-8 flex flex-col justify-between"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <p className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Project Analytics
            </p>
          </div>

          <div className="flex-1 flex items-end justify-between h-40 md:h-48 mt-2 relative gap-2 sm:gap-6 pb-6 px-2">
            {days.map((day, i) => {
              const s = barStyles[i];
              return (
                <div key={i} className="relative flex flex-col items-center justify-end h-full w-full max-w-[64px]">
                  {s.type !== "striped" && "tooltip" in s && s.tooltip && (
                    <div className="absolute -top-12 flex flex-col items-center z-10 pointer-events-none drop-shadow-xl">
                      <div
                        className="px-3 py-1.5 rounded-lg text-xs font-bold"
                        style={{ background: "var(--bg-card)", color: "var(--lime)", border: "1px solid var(--border)" }}
                      >
                        {s.tooltip}
                      </div>
                      <div
                        className="w-2 h-2 rotate-45 -mt-1.5 border-b border-r"
                        style={{ background: "var(--bg-card)", borderColor: "var(--border)" }}
                      />
                    </div>
                  )}
                  <div
                    className="w-full h-full rounded-full transition-transform duration-300 hover:scale-[1.03] cursor-pointer"
                    style={{
                      background:
                        s.type === "striped"
                          ? "repeating-linear-gradient(45deg, transparent, transparent 6px, var(--border) 6px, var(--border) 8px)"
                          : s.color,
                      border: s.type === "striped" ? "2px solid var(--border)" : "none",
                    }}
                  />
                  <span
                    className="absolute -bottom-7 text-sm font-bold"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-poppins)" }}
                  >
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Inbox Health Gauge */}
        <div
          className="rounded-3xl p-6 md:p-8 flex flex-col justify-between"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <p className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
              Inbox Health
            </p>
          </div>

          <div className="flex flex-col items-center gap-8 mt-4">
            <div className="relative w-full flex justify-center">
              <svg width="100%" height="150" viewBox="0 0 300 150" className="overflow-visible">
                <defs>
                  <pattern id="diagonalHatchGauge" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="8" stroke="var(--border)" strokeWidth="3" />
                  </pattern>
                </defs>
                <path
                  d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                  fill="none"
                  stroke="url(#diagonalHatchGauge)"
                  strokeWidth="36"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                  fill="none"
                  stroke="#233d18"
                  strokeWidth="36"
                  strokeLinecap="round"
                  strokeDasharray={`${circumf} ${circumf}`}
                />
                <path
                  d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                  fill="none"
                  stroke="var(--lime)"
                  strokeWidth="36"
                  strokeLinecap="round"
                  strokeDasharray={`${filled} ${circumf}`}
                />
                <text x={cx} y={cy - 15} textAnchor="middle" fill="var(--text-primary)" fontSize="48" fontWeight="900" fontFamily="var(--font-poppins)">
                  {progressPct}%
                </text>
                <text x={cx} y={cy + 10} textAnchor="middle" fill="var(--text-muted)" fontSize="12" fontWeight="bold">
                  Emails Sent
                </text>
              </svg>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 w-full">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "var(--lime)" }} />
                <span className="text-[11px] font-bold" style={{ color: "var(--text-secondary)" }}>Sent</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "#233d18" }} />
                <span className="text-[11px] font-bold" style={{ color: "var(--text-secondary)" }}>Drafts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ background: "var(--bg-surface)", border: "2px solid var(--border)" }} />
                <span className="text-[11px] font-bold" style={{ color: "var(--text-secondary)" }}>Total</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sparkline: Activity Trend */}
      <div
        className="rounded-2xl p-6"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p
              className="text-[9px] font-extrabold uppercase tracking-widest font-mono"
              style={{ color: "var(--text-secondary)" }}
            >
              Activity Trend
            </p>
            <p className="text-lg font-extrabold mt-0.5" style={{ color: "var(--text-primary)" }}>
              Last 12 Hours
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold" style={{ color: "var(--lime)" }}>
              {eventsCount}
            </p>
            <p className="text-[9px] font-mono" style={{ color: "var(--text-muted)" }}>
              total events
            </p>
          </div>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: "60px" }} preserveAspectRatio="none">
          <title>Activity sparkline</title>
          <defs>
            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c8f135" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#c8f135" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={fillPath} fill="url(#sparkGrad)" />
          <path d={linePath} fill="none" stroke="#c8f135" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {xs.map((x, i) => (
            <circle key={i} cx={x} cy={ys[i]} r="3" fill="#c8f135" opacity={i === pts.length - 1 ? 1 : 0.4} />
          ))}
        </svg>
        <div className="flex justify-between mt-1">
          {["12h ago", "10h", "8h", "6h", "4h", "2h", "Now"].map((l) => (
            <span key={l} className="text-[8px] font-mono" style={{ color: "var(--text-muted)" }}>
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
