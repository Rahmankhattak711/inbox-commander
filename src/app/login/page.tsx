"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await authClient.signIn.email({ email, password });
      if (response.error) {
        setError(response.error.message || "Invalid email or password.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL: "/dashboard" });
    } catch {
      setError("Failed to initiate Google sign-in.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden select-none"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Background glow spots */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,241,53,0.07) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,241,53,0.05) 0%, transparent 70%)" }} />

      <div
        className="w-full max-w-md rounded-2xl p-8 space-y-6 relative z-10 animate-in fade-in zoom-in-95 duration-500"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
      >
        {/* Logo */}
        <div className="text-center space-y-3">
          <div
            className="mx-auto w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "var(--lime)", boxShadow: "0 0 24px rgba(200,241,53,0.3)" }}
          >
            <svg className="w-6 h-6" style={{ color: "var(--bg-base)" }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>
              Inbox Commander
            </h1>
            <p className="text-[10px] font-mono mt-1" style={{ color: "var(--text-secondary)" }}>
              Sign in to access your command center
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-xs p-3.5 rounded-xl animate-in fade-in duration-200" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Email Address
            </label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl text-xs outline-none transition"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(200,241,53,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Password
            </label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl text-xs outline-none transition"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(200,241,53,0.4)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            />
          </div>
          <button
            type="submit" disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[11px] font-extrabold uppercase tracking-widest transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
            style={{ background: "var(--lime)", color: "var(--bg-base)", boxShadow: "0 0 20px rgba(200,241,53,0.15)" }}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing In...
              </>
            ) : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>or</span>
          <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
        </div>

        {/* Google */}
        <button
          onClick={handleGoogleLogin} disabled={isGoogleLoading}
          className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] disabled:opacity-50"
          style={{ background: "#fff", color: "#080d05" }}
        >
          {isGoogleLoading ? (
            <svg className="animate-spin h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.5 3.77v3.13h3.99c2.34-2.16 3.68-5.32 3.68-8.75z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.99-3.13c-1.11.75-2.53 1.19-3.97 1.19-3.05 0-5.64-2.06-6.57-4.83H1.42v3.23C3.4 21.6 7.43 24 12 24z"/>
              <path fill="#FBBC05" d="M5.43 14.32a7.12 7.12 0 0 1 0-4.64V6.45H1.42a11.96 11.96 0 0 0 0 11.1l4.01-3.23z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.43 0 3.4 2.4 1.42 6.45l4.01 3.23c.93-2.77 3.52-4.83 6.57-4.83z"/>
            </svg>
          )}
          {isGoogleLoading ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="text-center text-[10px]" style={{ color: "var(--text-secondary)" }}>
          No account?{" "}
          <Link href="/signup" className="font-bold transition hover:opacity-70" style={{ color: "var(--lime)" }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
