import { Check, Clock3 } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    eyebrow: "Start with the essentials",
    price: "$0",
    cadence: "forever",
    description:
      "A focused command center for managing your everyday Gmail and Calendar workflows.",
    features: [
      "One connected Google account",
      "Gmail and Calendar workspace",
      "AI-assisted email drafts",
      "Approval-first actions",
    ],
    action: "Get started free",
    comingSoon: false,
  },
  {
    name: "Pro",
    eyebrow: "For advanced operators",
    price: "Coming soon",
    cadence: "",
    description:
      "More intelligence, deeper automation, and expanded workspace control are on the way.",
    features: [
      "Multiple connected workspaces",
      "Advanced AI workflows",
      "Priority automation capabilities",
      "Early access to new features",
    ],
    action: "Coming soon",
    comingSoon: true,
  },
] as const;

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-y border-white/[0.07] bg-[#0a0d0b] px-6 py-28"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300/[0.08] blur-[140px]" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
            Pricing
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Start free. Upgrade when you are ready.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#9aa69f]">
            Get the core Inbox Commander experience today. A more powerful plan
            is coming soon for teams and high-volume workflows.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-3xl border p-7 sm:p-9 ${plan.comingSoon ? "border-emerald-200/20 bg-emerald-300/[0.06]" : "border-white/[0.1] bg-white/[0.035]"}`}
            >
              {plan.comingSoon && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full border border-emerald-200/20 bg-emerald-300/[0.1] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-emerald-200">
                  <Clock3 className="size-3" aria-hidden="true" />
                  Coming soon
                </span>
              )}

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-200">
                  {plan.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-semibold">{plan.name}</h3>
                <div className="mt-7 flex min-h-14 items-end gap-2">
                  <span
                    className={`font-semibold tracking-[-0.045em] ${plan.comingSoon ? "text-3xl text-emerald-100" : "text-5xl"}`}
                  >
                    {plan.price}
                  </span>
                  {plan.cadence && (
                    <span className="pb-1 text-sm text-[#7f8b84]">
                      / {plan.cadence}
                    </span>
                  )}
                </div>
                <p className="mt-5 min-h-14 text-sm leading-relaxed text-[#9aa69f]">
                  {plan.description}
                </p>
              </div>

              <ul className="mt-8 space-y-3 border-t border-white/[0.08] pt-7">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-[#d9e2dc]"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-emerald-200"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-9">
                {plan.comingSoon ? (
                  <span className="flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-emerald-200/15 bg-emerald-300/[0.08] px-4 py-3.5 text-sm font-medium text-emerald-100/70">
                    {plan.action}
                  </span>
                ) : (
                  <Link
                    href="/signup"
                    className="flex w-full items-center justify-center rounded-xl bg-emerald-300 px-4 py-3.5 text-sm font-semibold text-[#08100c] transition hover:bg-emerald-200"
                  >
                    {plan.action}
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
