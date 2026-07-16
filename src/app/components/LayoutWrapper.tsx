"use client";

import { Command } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Sidebar from "./Sidebar";

const PUBLIC_ROUTES = ["/", "/login", "/signup"];
const AUTH_ONLY_ROUTES = ["/login", "/signup"];

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isPublic = PUBLIC_ROUTES.includes(pathname);
  const isAuthOnly = AUTH_ONLY_ROUTES.includes(pathname);

  useEffect(() => {
    if (!isPending) {
      if (session) {
        if (isAuthOnly) router.push("/dashboard");
      } else {
        if (!isPublic) router.push("/login");
      }
    }
  }, [session, isPending, isPublic, isAuthOnly, router]);

  if (isPending) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080a0a] px-6 text-white">
        <div className="pointer-events-none absolute size-[28rem] rounded-full bg-emerald-300/[0.08] blur-[110px]" />
        <div className="relative flex w-full max-w-sm flex-col items-center rounded-3xl border border-white/[0.08] bg-white/[0.025] px-8 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="relative grid size-14 place-items-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200 shadow-[0_0_30px_rgba(110,231,183,0.14)]">
            <span className="absolute inset-[-7px] rounded-[1.15rem] border border-emerald-300/15 animate-ping" />
            <Command className="size-6 stroke-[2.5]" />
          </div>
          <p className="mt-6 text-sm font-semibold tracking-[-0.02em]">
            Preparing your Executive Workspace
          </p>
          <p className="mt-2 text-xs text-[#8d9891]">
            Syncing your secure workspace context
          </p>
        </div>
      </div>
    );
  }

  if (!session || isPublic) {
    return <>{children}</>;
  }

  return (
    <div
      className="flex min-h-screen bg-[#080a0a]"
      style={{ color: "var(--text-primary)" }}
    >
      <Suspense
        fallback={
          <aside className="w-64 shrink-0 border-r border-white/[0.08]" />
        }
      >
        <Sidebar />
      </Suspense>
      <main className="flex-1 h-screen overflow-y-auto flex flex-col bg-[#080a0a]">
        {children}
      </main>
    </div>
  );
}
