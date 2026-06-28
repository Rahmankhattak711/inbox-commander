"use client";

interface DashboardHeroProps {
  user: { name?: string | null; email?: string | null; image?: string | null } | undefined;
  greeting: string;
  today: Date;
}

export default function DashboardHero({ user, greeting, today }: DashboardHeroProps) {
  return (
    <div
      className="relative overflow-hidden rounded-[2.5rem] p-8 md:p-10"
      style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
    >
      {/* Soft background glow */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"
        style={{ background: "rgba(200,241,53,0.05)" }}
      />

      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name ?? "User"}
                className="w-20 h-20 rounded-full object-cover shadow-xl"
                style={{ border: "4px solid var(--bg-surface)" }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-black shadow-xl"
                style={{
                  background: "var(--lime)",
                  color: "var(--bg-base)",
                  border: "4px solid var(--bg-surface)",
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            {/* Online indicator dot */}
            <div
              className="absolute bottom-1 right-1 w-5 h-5 rounded-full border-[3px]"
              style={{ background: "var(--lime)", borderColor: "var(--bg-surface)" }}
            />
          </div>

          {/* Greeting & Info */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--lime)" }}>
              {greeting}
            </p>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
              {user?.name || "Commander"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
              <span>{user?.email}</span>
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--border)" }} />
              <span>
                {new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" }).format(today)}
              </span>
            </div>
          </div>
        </div>

        {/* System status pill */}
        <div
          className="flex items-center gap-4 px-6 py-4 rounded-3xl shrink-0"
          style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}
        >
          <div className="relative flex items-center justify-center w-3 h-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--lime)" }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--lime)" }} />
          </div>
          <div>
            <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
              System Status
            </p>
            <p className="text-xs font-bold mt-0.5" style={{ color: "var(--text-primary)" }}>
              All Services Online
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
