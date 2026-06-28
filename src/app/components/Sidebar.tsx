"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { GmailTab } from "@/lib/gmail-folders";
import { useQuery } from "@tanstack/react-query";

type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
  gmailTab?: GmailTab;
};

const mainNavItems: NavItem[] = [
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
];

const gmailNavItems: NavItem[] = [
  {
    name: "Sent Emails",
    href: "/gmail",
    gmailTab: "sent",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
      </svg>
    ),
  },
  {
    name: "Drafts",
    href: "/gmail?tab=drafts",
    gmailTab: "drafts",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    name: "Starred",
    href: "/gmail?tab=starred",
    gmailTab: "starred",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    name: "Purchases",
    href: "/gmail?tab=purchases",
    gmailTab: "purchases",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
  },
  {
    name: "Important",
    href: "/gmail?tab=important",
    gmailTab: "important",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    name: "Snoozed",
    href: "/gmail?tab=snoozed",
    gmailTab: "snoozed",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Spam",
    href: "/gmail?tab=spam",
    gmailTab: "spam",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    name: "Trash",
    href: "/gmail?tab=trash",
    gmailTab: "trash",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
    ),
  },
];

const bottomNavItems: NavItem[] = [
  {
    name: "AI Assistant",
    href: "/chat",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
];

function NavLink({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      style={
        active
          ? {
              background: "var(--lime-glow)",
              borderColor: "rgba(200,241,53,0.25)",
              color: "var(--lime)",
            }
          : {
              borderColor: "transparent",
              color: "var(--text-secondary)",
            }
      }
      className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-bold border transition-all duration-300 hover:opacity-100 group"
    >
      <span
        style={{ color: active ? "var(--lime)" : "var(--text-muted)" }}
        className="group-hover:text-[var(--lime)] group-hover:scale-110 transition-all duration-300"
      >
        {item.icon}
      </span>
      <span className="tracking-widest uppercase truncate">
        {item.name}
      </span>
      {active && (
        <span
          className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: "var(--lime)", boxShadow: "0 0 8px var(--lime)" }}
        />
      )}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const gmailTab = searchParams.get("tab") ?? "sent";

  const { data: session } = useQuery({
    queryKey: ["session"],
    queryFn: () => authClient.getSession(),
  });

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const isActive = (item: NavItem) => {
    if (item.gmailTab) {
      return pathname === "/gmail" && gmailTab === item.gmailTab;
    }
    return pathname === item.href;
  };

  if (!session?.data?.user) return null;
  const user = session.data.user;

  return (
    <aside
      style={{ background: "var(--bg-surface)", borderRight: "1px solid var(--border)" }}
      className="w-60 flex flex-col p-5 h-screen sticky top-0 shrink-0"
    >
      <div className="flex items-center gap-3 px-1 mb-6 shrink-0">
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
          <p className="text-[10px] font-mono" style={{ color: "var(--text-secondary)" }}>
            v1.0 · STABLE
          </p>
        </div>
      </div>

      <nav className="flex-1 min-h-0 flex flex-col gap-4 overflow-y-auto">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <NavLink key={item.name} item={item} active={isActive(item)} />
          ))}
        </div>

        <div>
          <p
            className="px-4 mb-2 text-[9px] font-extrabold tracking-widest uppercase font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            Gmail
          </p>
          <div className="space-y-1">
            {gmailNavItems.map((item) => (
              <NavLink key={item.name} item={item} active={isActive(item)} />
            ))}
          </div>
        </div>

        <div className="space-y-1">
          {bottomNavItems.map((item) => (
            <NavLink key={item.name} item={item} active={isActive(item)} />
          ))}
        </div>
      </nav>

      <div className="space-y-4 shrink-0 pt-4 mt-4" style={{ borderTop: "1px solid var(--border)" }}>
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
