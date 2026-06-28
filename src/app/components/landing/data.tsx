export const features = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <title>Google Calendar icon</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "Google Calendar",
    desc: "Create, view and delete events directly from your command center without switching tabs.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <title>Gmail Drafts icon</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4a2 2 0 00-2 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1a2 2 0 00-2-2H4"
        />
      </svg>
    ),
    title: "Gmail Drafts",
    desc: "Compose and manage email drafts with a clean split-view interface. Save and delete with one click.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <title>Secure Auth icon</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Secure Auth",
    desc: "Sign in with Google OAuth or email credentials. Sessions are secured via better-auth.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        focusable="false"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <title>Multi-Tenant icon</title>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    title: "Multi-Tenant",
    desc: "Built on the Corsair engine — each user's Google tokens are isolated and managed securely.",
  },
];

export const techSpecs = [
  { metric: "99.98%", label: "API Sync Uptime" },
  { metric: "< 42ms", label: "Corsair Latency" },
  { metric: "AES-256", label: "Token Encryption" },
  { metric: "12 / sec", label: "Max Rate Limits" },
];

export const testimonials = [
  {
    quote:
      "I used to think Superhuman was the endgame for speed. Commander takes that layout, gives me a side-by-side view of my execution roadmap, and builds the drafts for me. Absolutely ridiculous output optimization.",
    author: "Alex Rivers",
    role: "Principal Infrastructure Lead",
    company: "Vektor.io",
    handle: "@v_rivers",
    metrics: "Saved 14h/week",
  },
  {
    quote:
      "Keeping up with calendar blocks and corresponding email threads felt like manual context stitching. Having an intelligent console that treats calendar entities as operational nodes has rewired my pipeline entirely.",
    author: "Elena Rostova",
    role: "Technical Product Operator",
    company: "Aether Engine",
    handle: "@elena_rostov",
    metrics: "Inbox Zero x 40 Days",
  },
  {
    quote:
      "The zero-cache architecture combined with keyboard-first workflows makes it perfect for secure enterprise use. It is raw, ultra-fast power without the typical browser wrapper bloat.",
    author: "Marcus Chen",
    role: "Founding Engineer",
    company: "ZeroState Security",
    handle: "@mchen_dev",
    metrics: "<50ms Execution Time",
  },
  {
    quote:
      "Commander replaced three tools I was juggling. The AI drafts are eerily on-point, and the calendar sync is instantaneous. My team lead asked why I respond so fast now — I just smiled.",
    author: "Priya Nair",
    role: "Senior DevOps Architect",
    company: "Helios Cloud",
    handle: "@pnair_ops",
    metrics: "3 Tools Replaced",
  },
  {
    quote:
      "Running 12 Google Workspaces for our portfolio companies used to require a dedicated ops person. Now it's one terminal, one context. The multi-tenant isolation is enterprise-grade.",
    author: "Jordan Osei",
    role: "VC Portfolio Operator",
    company: "Meridian Ventures",
    handle: "@j_osei_vc",
    metrics: "12 Workspaces Unified",
  },
  {
    quote:
      "The Corsair engine latency is no joke. I've stress-tested it against high-volume inboxes with 400+ daily threads and it never skips a beat. This is the infra I wished Gmail had built.",
    author: "Sven Larsen",
    role: "Platform Reliability Engineer",
    company: "NordStack",
    handle: "@s_larsen_sre",
    metrics: "400+ Threads/day",
  },
  {
    quote:
      "Inbox Commander turned my morning email chaos into a structured command session. The keyboard macros alone are worth the upgrade — I never touch the mouse for email anymore.",
    author: "Chloe Dupont",
    role: "Growth Product Manager",
    company: "Luminary SaaS",
    handle: "@cdupont_pm",
    metrics: "Mouse-free Workflow",
  },
  {
    quote:
      "I was skeptical about AI email drafting until I saw Commander's context awareness. It reads the thread, respects tone, and even matches my writing style. Shipped three client decks without editing a word.",
    author: "Riku Takahashi",
    role: "Freelance Tech Consultant",
    company: "Self-Employed",
    handle: "@riku_builds",
    metrics: "0 Draft Edits Needed",
  },
  {
    quote:
      "The zero-retention compliance mode was the deciding factor for our legal team. We needed zero persistence and instant revocation — Commander delivered on day one without any configuration theater.",
    author: "Amara Okonkwo",
    role: "Chief Compliance Officer",
    company: "LexShield Corp",
    handle: "@amara_cco",
    metrics: "Zero Retention Certified",
  },
];

export const tiers = [
  {
    name: "Base Deck",
    price: "0",
    desc: "Essential command capabilities for solo developers and power users.",
    features: [
      "1 Connected Google Account",
      "Real-time Gmail Draft Sync",
      "Standard Calendar Control",
      "Better-Auth Security Layer",
    ],
    cta: "Deploy Free",
    popular: false,
  },
  {
    name: "Overclocked Pro",
    price: "25",
    desc: "Advanced terminal access for hyper-productive operators and builders.",
    features: [
      "20 Connected Workspaces",
      "Priority Corsair Engine Routing",
      "Vim Keyboard Macro Bindings",
      "AI Context Autocomplete",
      "Smart Thread Synthesis Engine",
    ],
    cta: "Initialize Uplink",
    popular: true,
  },
  {
    name: "Enterprise Shard",
    price: "45",
    desc: "Dedicated performance matrices and full semantic intelligence infrastructure.",
    features: [
      "Unlimited Google Profiles",
      "Dedicated Server Sharding",
      "Custom Webhook Integration Pipelines",
      "Zero-Retention Compliance Box",
      "24/7 Priority Core Shard Support",
      "Beta Access to Autonomous Agents",
    ],
    cta: "Request Shard Access",
    popular: false,
  },
];

export const faqs = [
  {
    q: "How secure is my Google Account data?",
    a: "Security is our top priority. Authentication is handled via industry-standard protocols. Your access tokens are securely sandboxed within our multi-tenant architecture, ensuring that your data scopes are strictly isolated and access can be revoked instantaneously.",
  },
  {
    q: "Can I connect multiple Google Workspaces?",
    a: "Yes. Users on our Overclocked Pro and Enterprise Shard tiers can connect cross-domain Google identities, allowing you to manage drafts and schedule events seamlessly across multiple professional profiles.",
  },
  {
    q: "Does Inbox Commander read or store my emails?",
    a: "No. We utilize a zero-cache architecture that processes your email content strictly in-memory. Your data is never permanently indexed or stored on our disks; it only passes through our systems to facilitate immediate actions.",
  },
  {
    q: "Does the platform support custom keyboard shortcuts?",
    a: "Yes. Overclocked Pro and Enterprise users can configure native Vim keybindings or create fully custom keyboard macros, enabling comprehensive, mouse-free navigation throughout the application.",
  },
];
