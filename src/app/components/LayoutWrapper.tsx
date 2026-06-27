"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Suspense } from "react";
import Sidebar from "./Sidebar";

const PUBLIC_ROUTES = ["/", "/login", "/signup"];
const AUTH_ONLY_ROUTES = ["/login", "/signup"];

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
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
      <div className="flex flex-col items-center justify-center min-h-screen" style={{ background: "var(--bg-base)" }}>
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 rounded-full border animate-ping" style={{ borderColor: "rgba(200,241,53,0.15)" }} />
          <div className="w-12 h-12 rounded-full border-t-2 border-b-2 animate-spin" style={{ borderColor: "var(--lime)" }} />
        </div>
        <p className="mt-6 text-[10px] font-bold tracking-widest uppercase animate-pulse" style={{ color: "var(--text-secondary)" }}>
          Establishing Session...
        </p>
      </div>
    );
  }

  if (!session || isPublic) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <Suspense fallback={<aside className="w-60 shrink-0" style={{ borderRight: "1px solid var(--border)" }} />}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 h-screen overflow-y-auto flex flex-col">
        {children}
      </main>
    </div>
  );
}
