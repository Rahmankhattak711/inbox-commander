# ⚡ Inbox Commander

Inbox Commander is a high-density, keyboard-first command center for orchestrating your Google Workspace. Built on top of the ultra-fast **Corsair** integration platform, it brings Gmail draft management and Google Calendar scheduling into a unified, zero-bloat console interface.

## ✨ Latest Update

The landing page has been refreshed with polished micro-animations, subtle hover motion, and a more immersive hero experience. These updates improve the first impression while keeping the high-density terminal style intact.

---

## 🚀 Key Features

- **📬 Dual-Pane Gmail Composer**: List, view, compose, and delete email drafts in a lightning-fast side-by-side layout. Saves and deletes sync with Google in real-time.
- **📅 Interactive Calendar Grid**: An agenda scheduler that lets you view, create, and delete calendar events for any date. Navigate across months and see today's agenda at a glance.
- **🔐 Secure OAuth & Multi-Tenancy**: Built using [Better Auth](https://www.better-auth.com/) and powered by Corsair. All access tokens are sandboxed, encrypted with AES-256 via key encryption keys (KEKs), and never cached permanently on disk.
- **💻 Vim-Inspired Layout & Aesthetics**: Sleek dark mode styling with vibrant lime accentuation, subtle micro-animations, and minimal layout overhead.

---

## 🛠️ Tech Stack & Architecture

### Core Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, React 19)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & CSS custom properties
- **Auth**: [Better Auth v1](https://www.better-auth.com/) (Google OAuth & Email/Password login)
- **Database & ORM**: PostgreSQL via [Prisma Client](https://www.prisma.io/)
- **Integrations**: [Corsair Engine](https://github.com/corsair-dev) (`@corsair-dev/gmail`, `@corsair-dev/googlecalendar`)
- **Data Fetching**: [TanStack React Query v5](https://tanstack.com/query/latest)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)

---

## 📁 Directory Structure

```text
├── prisma/
│   ├── schema.prisma       # Prisma schema for user auth and Corsair account/entity sync
│   └── migrations/         # PostgreSQL DB migrations
├── src/
│   ├── app/
│   │   ├── api/            # API Endpoints (Gmail, Calendar, Better Auth wildcard)
│   │   ├── calendar/       # Interactive Calendar Page
│   │   ├── gmail/          # Split-View Drafts Composer
│   │   ├── login/ /signup/ # Secure Auth Pages
│   │   └── page.tsx        # High-density landing page
│   ├── hooks/              # Custom query hooks (useCreateGmailDraft, useCalendarEvents)
│   ├── lib/                # Auth configurations, Prisma clients, and Corsair adapters
│   ├── services/           # Backend interaction layers
│   ├── types/              # Domain TypeScript types
│   └── utils/              # Helper functions (date keys, class utilities)
├── corsair.ts              # Root Corsair engine and plugin config
└── package.json            # Scripts, dev tools, and packages
```

---

## ⚙️ Database Schema & Corsair Integration

The PostgreSQL database (configured through [prisma/schema.prisma](file:///c:/Users/Rahman%20ullah/Documents/inbox-commander/prisma/schema.prisma)) bridges user profiles with Google token isolation:

- **Core User Auth**: `User`, `Session`, `Account`, and `Verification` schemas mapping to Better Auth specs.
- **Corsair Integrations**:
  - `CorsairIntegration`: Stores configured integrations (Gmail, Google Calendar).
  - `CorsairAccount`: Ties authenticated user profiles with multi-tenant workspace credentials.
  - `CorsairEntity` & `CorsairEvent`: Manages operational telemetry, draft models, and webhook pipelines under isolated scopes.

---

## 🏁 Getting Started

### 1. Prerequisites

- **Node.js** (v18+)
- **pnpm** (preferred) or npm
- **PostgreSQL Database** running locally or in the cloud.

### 2. Environment Setup

Create a `.env` file in the root directory and configure the following:

```env
# Encryption & Local Database
CORSAIR_KEK="your-aes-256-key-encryption-key"
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"

# Better Auth Configuration
BETTER_AUTH_SECRET="your-better-auth-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth Credentials
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"
```

> [!NOTE]
> Make sure your Google OAuth credential has authorized redirect URIs containing `http://localhost:3000/api/auth/callback/google` and access scopes requested for **Gmail (modify, labels, compose, send)** and **Google Calendar**.

### 3. Installation & Run

Install dependencies:

```bash
pnpm install
```

Generate Prisma Client and push schemas:

```bash
pnpm prisma db push
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the Inbox Commander dashboard.

---

## 🧼 Code Quality & Formatting

We use [Biome](https://biomejs.dev/) for fast linting and code formatting:

- **Lint checks**: `pnpm lint`
- **Format code**: `pnpm format`
