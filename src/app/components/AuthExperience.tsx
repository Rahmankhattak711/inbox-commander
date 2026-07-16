"use client";

import { ArrowRight, Check, Command, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

type AuthMode = "login" | "signup";

const executiveBenefits = [
  "Prioritize inbox conversations that need attention",
  "Coordinate meetings, follow-ups, and reminders",
  "Deliver a focused briefing for every workday",
];

export default function AuthExperience({ mode }: { mode: AuthMode }) {
  const isSignup = mode === "signup";
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = isSignup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(
          result.error.message || "Unable to continue. Please try again.",
        );
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Unable to continue. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const signInWithGoogle = async () => {
    setError("");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080a0a] px-5 py-6 text-[#f3f7f4] sm:px-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:px-12 lg:py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(110,231,183,0.12),transparent_25%),radial-gradient(circle_at_85%_85%,rgba(52,211,153,0.08),transparent_26%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:52px_52px]" />

      <section className="relative hidden max-w-xl flex-col justify-between rounded-[2rem] border border-white/[0.07] bg-white/[0.025] p-10 lg:flex xl:p-14">
        <Link href="/" className="flex w-fit items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200 shadow-[0_0_28px_rgba(110,231,183,0.16)]">
            <Command className="size-5 stroke-[2.5]" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">
            Inbox Commander
          </span>
        </Link>

        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-200">
            <Sparkles className="size-3.5" /> OpenAI-powered workspace
          </div>
          <h1 className="max-w-md text-5xl font-semibold leading-[1.05] tracking-[-0.05em] text-white xl:text-6xl">
            Your workday, led by intelligent action.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-[#9ea9a2]">
            Inbox Commander turns email, meetings, and deadlines into a calm,
            approval-ready plan.
          </p>
        </div>

        <div className="space-y-4 border-t border-white/[0.08] pt-8 text-sm text-[#b7c1ba]">
          {executiveBenefits.map((benefit) => (
            <div className="flex items-center gap-3" key={benefit}>
              <span className="grid size-5 place-items-center rounded-full bg-emerald-300/10 text-emerald-200">
                <Check className="size-3" strokeWidth={3} />
              </span>
              {benefit}
            </div>
          ))}
        </div>
      </section>

      <section className="relative flex items-center justify-center py-8 lg:py-0">
        <div className="w-full max-w-md rounded-[1.75rem] border border-white/[0.09] bg-[#111412]/85 p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-9">
          <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200">
              <Command className="size-5 stroke-[2.5]" />
            </span>
            <span className="text-sm font-semibold">Inbox Commander</span>
          </Link>

          <div className="mb-8">
            <span className="text-[11px] font-semibold uppercase tracking-[0.17em] text-emerald-200">
              Executive workspace
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">
              {isSignup ? "Create your command center" : "Welcome back"}
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#929d96]">
              {isSignup
                ? "Start managing your work with an AI Executive Assistant."
                : "Sign in to continue with your AI Executive Assistant."}
            </p>
          </div>

          <button
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.04] text-sm font-medium text-white transition hover:border-white/20 hover:bg-white/[0.08]"
            onClick={signInWithGoogle}
            type="button"
          >
            <span className="grid size-5 place-items-center rounded-full bg-white text-[11px] font-bold text-[#202124]">
              G
            </span>
            Continue with Google
          </button>

          <div className="my-7 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#657069]">
            <span className="h-px flex-1 bg-white/[0.08]" /> or continue with
            email <span className="h-px flex-1 bg-white/[0.08]" />
          </div>

          <form className="space-y-4" onSubmit={submit}>
            {isSignup && (
              <label className="block text-sm font-medium text-[#d8dfda]">
                Full name
                <input
                  className="mt-2 h-12 w-full rounded-xl border border-white/[0.1] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-[#66716a] focus:border-emerald-300/45 focus:ring-4 focus:ring-emerald-300/[0.08]"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Alex Morgan"
                  required
                  value={name}
                />
              </label>
            )}
            <label className="block text-sm font-medium text-[#d8dfda]">
              Work email
              <input
                autoComplete="email"
                className="mt-2 h-12 w-full rounded-xl border border-white/[0.1] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-[#66716a] focus:border-emerald-300/45 focus:ring-4 focus:ring-emerald-300/[0.08]"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@company.com"
                required
                type="email"
                value={email}
              />
            </label>
            <label className="block text-sm font-medium text-[#d8dfda]">
              Password
              <input
                autoComplete={isSignup ? "new-password" : "current-password"}
                className="mt-2 h-12 w-full rounded-xl border border-white/[0.1] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-[#66716a] focus:border-emerald-300/45 focus:ring-4 focus:ring-emerald-300/[0.08]"
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                required
                type="password"
                value={password}
              />
            </label>
            {isSignup && (
              <label className="block text-sm font-medium text-[#d8dfda]">
                Confirm password
                <input
                  autoComplete="new-password"
                  className="mt-2 h-12 w-full rounded-xl border border-white/[0.1] bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-[#66716a] focus:border-emerald-300/45 focus:ring-4 focus:ring-emerald-300/[0.08]"
                  minLength={8}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat your password"
                  required
                  type="password"
                  value={confirmPassword}
                />
              </label>
            )}

            {error && (
              <p className="rounded-lg border border-rose-400/20 bg-rose-400/[0.08] px-3 py-2.5 text-sm text-rose-200">
                {error}
              </p>
            )}

            <button
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-300 text-sm font-semibold text-[#072117] shadow-[0_0_28px_rgba(110,231,183,0.18)] transition hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting
                ? "Please wait..."
                : isSignup
                  ? "Create workspace"
                  : "Continue to workspace"}
              {!isSubmitting && <ArrowRight className="size-4" />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-[#8d9891]">
            {isSignup ? "Already have an account?" : "New to Inbox Commander?"}{" "}
            <Link
              className="font-medium text-emerald-200 transition hover:text-emerald-100"
              href={isSignup ? "/login" : "/signup"}
            >
              {isSignup ? "Sign in" : "Create an account"}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
