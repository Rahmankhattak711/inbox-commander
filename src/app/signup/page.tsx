"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await authClient.signUp.email({ email, password, name });
      if (response.error) {
        setError(response.error.message || "Failed to create account.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = "rgba(200,241,53,0.4)");
  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) =>
    (e.currentTarget.style.borderColor = "var(--border)");

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden select-none py-10"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Glow spots */}
      <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle, rgba(200,241,53,0.07) 0%, transparent 70%)" }} />

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
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-extrabold tracking-widest uppercase" style={{ color: "var(--text-primary)" }}>
              Create Account
            </h1>
            <p className="text-[10px] font-mono mt-1" style={{ color: "var(--text-secondary)" }}>
              Join Inbox Commander and take control
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Full Name
            </label>
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="John Doe" onFocus={focusStyle} onBlur={blurStyle}
              className="w-full px-4 py-3 rounded-xl text-xs outline-none transition"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Email Address
            </label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" onFocus={focusStyle} onBlur={blurStyle}
              className="w-full px-4 py-3 rounded-xl text-xs outline-none transition"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>Password</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" onFocus={focusStyle} onBlur={blurStyle}
                className="w-full px-4 py-3 rounded-xl text-xs outline-none transition"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: "var(--text-secondary)" }}>Confirm</label>
              <input
                type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••" onFocus={focusStyle} onBlur={blurStyle}
                className="w-full px-4 py-3 rounded-xl text-xs outline-none transition"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
            </div>
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
                Creating Account...
              </>
            ) : "Register Account"}
          </button>
        </form>

        <p className="text-center text-[10px]" style={{ color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-bold transition hover:opacity-70" style={{ color: "var(--lime)" }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
