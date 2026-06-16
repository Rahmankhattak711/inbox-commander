"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";

export default function Sidebar() {
  const pathname = usePathname();

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
  });

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: { onSuccess: () => { window.location.href = "/"; } },
    });
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: "Google Calendar",
      href: "/calendar",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: "Gmail Drafts",
      href: "/gmail",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1a2 2 0 00-2-2H4" />
        </svg>
      ),
    },
  ];

  if (!session?.data?.user) return null;
  const user = session.data.user;

  return (
    <aside
      style={{ background: "var(--bg-surface)", borderRight: "1px solid var(--border)" }}
      className="w-60 flex flex-col justify-between p-5 h-screen sticky top-0 shrink-0"
    >
      <div className="space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3 px-1">
          <div
            style={{ background: "var(--lime)", boxShadow: "0 0 16px rgba(200,241,53,0.25)" }}
            className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
          >
            <svg className="w-4 h-4 text-[#080d05]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xs font-extrabold tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>
             Inbox Commander
            </h2>
            <p className="text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>v1.0 · STABLE</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                style={isActive ? {
                  background: "var(--lime-glow)",
                  borderColor: "rgba(200,241,53,0.25)",
                  color: "var(--lime)",
                } : {
                  borderColor: "transparent",
                  color: "var(--text-secondary)",
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold border transition-all duration-200 hover:opacity-100 group"
              >
                <span style={{ color: isActive ? "var(--lime)" : "var(--text-muted)" }} className="group-hover:text-[var(--lime)] transition-colors">
                  {item.icon}
                </span>
                <span className="tracking-wide uppercase text-[10px] font-bold">{item.name}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "var(--lime)", boxShadow: "0 0 6px var(--lime)" }} />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer */}
      <div className="space-y-4" style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem" }}>
        <div className="flex items-center gap-3 px-1">
          {user.image ? (
            <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover" style={{ outline: "2px solid var(--border)" }} />
          ) : (
            <div
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--lime)" }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-extrabold"
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h4 className="text-[10px] font-bold truncate" style={{ color: "var(--text-primary)" }}>{user.name}</h4>
            <p className="text-[9px] truncate font-mono" style={{ color: "var(--text-secondary)" }}>{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-red-900/40 hover:text-red-400 hover:bg-red-950/10 transition duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
