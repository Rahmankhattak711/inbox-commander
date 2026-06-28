import Link from "next/link";

export default function CtaBanner() {
  return (
    <section
      className="px-6 py-20"
      // style={{
      //   borderTop: "1px solid var(--border)",
      //   background: "var(--bg-surface)",
      // }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2
          className="text-4xl md:text-5xl font-black tracking-tight leading-[0.95] text-balance"
          style={{ color: "var(--text-primary)" }}
        >
          Ready to take <span style={{ color: "var(--lime)" }}>command?</span>
        </h2>
        <p
          className="text-base md:text-md max-w-xl mx-auto text-pretty"
          style={{ color: "var(--text-secondary)" }}
        >
          Free to use. No credit card required.
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-200 active:scale-[0.97]"
          style={{
            background: "var(--lime)",
            color: "var(--bg-base)",
            boxShadow: "0 0 40px rgba(200,241,53,0.2)",
          }}
        >
          Get Started Free
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            focusable="false"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <title>Arrow right</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
