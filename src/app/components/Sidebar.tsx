"use client";

import { useQuery } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import {
  Bot,
  CalendarDays,
  Command,
  Clock3,
  FilePenLine,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Send,
  ShoppingCart,
  Star,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { GmailTab } from "@/lib/gmail-folders";

type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
  gmailTab?: GmailTab;
};

const primaryNav: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Calendar", href: "/calendar", icon: CalendarDays },
];

const emailNav: NavItem[] = [
  { name: "Inbox", href: "/gmail?tab=inbox", icon: Inbox, gmailTab: "inbox" },
  { name: "Sent", href: "/gmail", icon: Send, gmailTab: "sent" },
  {
    name: "Drafts",
    href: "/gmail?tab=drafts",
    icon: FilePenLine,
    gmailTab: "drafts",
  },
  {
    name: "Starred",
    href: "/gmail?tab=starred",
    icon: Star,
    gmailTab: "starred",
  },
  {
    name: "Important",
    href: "/gmail?tab=important",
    icon: TriangleAlert,
    gmailTab: "important",
  },
  {
    name: "Snoozed",
    href: "/gmail?tab=snoozed",
    icon: Clock3,
    gmailTab: "snoozed",
  },
  {
    name: "Purchases",
    href: "/gmail?tab=purchases",
    icon: ShoppingCart,
    gmailTab: "purchases",
  },
  { name: "Trash", href: "/gmail?tab=trash", icon: Trash2, gmailTab: "trash" },
];

function NavigationItem({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
        active
          ? "border border-emerald-200/15 bg-emerald-300/[0.09] text-emerald-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
          : "border border-transparent text-[#94a199] hover:bg-white/[0.045] hover:text-[#f4f7f5]"
      }`}
    >
      <Icon
        className={`size-4 shrink-0 ${active ? "text-emerald-200" : "text-[#718077] group-hover:text-[#c8d4cd]"}`}
        aria-hidden="true"
      />
      <span className="min-w-0 flex-1 truncate">{item.name}</span>
      {active && (
        <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
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

  const user = session?.data?.user;
  if (!user) return null;

  const isActive = (item: NavItem) =>
    item.gmailTab
      ? pathname === "/gmail" && gmailTab === item.gmailTab
      : pathname === item.href;

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-white/[0.08] bg-gradient-to-b from-[#101311] to-[#090b0a] p-4 text-[#f4f7f5]">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 rounded-xl px-2 py-2"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-300 text-[#08100c] shadow-[0_0_28px_rgba(110,231,183,0.24)]">
          <Command className="size-5 stroke-[2.5]" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-sm font-semibold tracking-tight">
            Inbox Commander
          </span>
          <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-[0.15em] text-[#718077]">
            OpenAI Executive OS
          </span>
        </span>
      </Link>

      <nav className="mt-8 flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto pr-1">
        <div className="space-y-1">
          {primaryNav.map((item) => (
            <NavigationItem
              key={item.name}
              item={item}
              active={isActive(item)}
            />
          ))}
        </div>

        <div>
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#66736b]">
            Gmail workspace
          </p>
          <div className="space-y-1">
            {emailNav.map((item) => (
              <NavigationItem
                key={item.name}
                item={item}
                active={isActive(item)}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <p className="mb-2 px-3 text-[10px] font-medium uppercase tracking-[0.16em] text-[#66736b]">
            Assistant
          </p>
          <NavigationItem
            item={{ name: "Command Center", href: "/chat", icon: Bot }}
            active={pathname === "/chat"}
          />
        </div>
      </nav>

      <div className="mt-4 border-t border-white/[0.08] pt-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
          {user.image ? (
            <img
              src={user.image}
              alt=""
              className="size-8 rounded-lg object-cover"
            />
          ) : (
            <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-300/[0.11] text-xs font-semibold text-emerald-200">
              {user.name?.charAt(0).toUpperCase() || (
                <Mail className="size-4" aria-hidden="true" />
              )}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium text-[#edf3ef]">
              {user.name}
            </p>
            <p className="mt-0.5 truncate text-[10px] text-[#718077]">
              {user.email}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs text-[#8e9a92] transition hover:bg-rose-400/[0.07] hover:text-rose-200"
        >
          <LogOut className="size-3.5" aria-hidden="true" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
