# Inbox Commander

Inbox Commander is a keyboard-first command center for Gmail and Google Calendar. Built on the **Corsair** integration platform, it unifies email management, calendar scheduling, and an AI assistant in a single dark-mode console UI.

---

## Features

### Gmail
- **Sent emails** — list, preview, send new mail, move to trash
- **Drafts** — create, list, send, and delete drafts
- **Folders** — Starred, Important, Snoozed, Spam, Purchases, and Trash
- **Trash** — restore or permanently delete messages
- Split-pane list + preview layout for every folder

### Google Calendar
- Monthly grid with event list sidebar
- Create and delete events
- Dashboard widgets for today's and upcoming events

### AI Assistant (`/chat`)
- Natural-language requests powered by OpenRouter (Grok)
- Detects multiple actions in one prompt (email + calendar)
- Returns structured JSON for email compose cards and calendar event forms
- Sends only user prompt messages to the model (no assistant history replay)

### Dashboard
- Personalized greeting and stats (events, sent mail, drafts)
- Quick actions for compose, calendar, Gmail folders, and chat
- Activity panels for upcoming events, recent sent mail, and drafts

### Auth & Security
- Google OAuth and email/password via [Better Auth](https://www.better-auth.com/)
- Corsair multi-tenant token storage with AES-256 KEK encryption
- Session-gated API routes

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, React 19) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + CSS variables |
| Auth | [Better Auth v1](https://www.better-auth.com/) |
| Database | PostgreSQL + [Prisma 7](https://www.prisma.io/) |
| Integrations | [Corsair](https://github.com/corsair-dev) (`@corsair-dev/gmail`, `@corsair-dev/googlecalendar`) |
| Data fetching | [TanStack React Query v5](https://tanstack.com/query/latest) |
| AI | [OpenRouter](https://openrouter.ai/) via OpenAI SDK |
| Lint / format | [Biome](https://biomejs.dev/) |

---

## Project Structure

```text
├── prisma/
│   ├── schema.prisma          # User auth + Corsair integration models
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...all]   # Better Auth handler
│   │   │   ├── calendar/       # Calendar CRUD
│   │   │   ├── chat/           # AI assistant (OpenRouter)
│   │   │   └── gmail/
│   │   │       ├── route.ts    # Sent emails (GET, DELETE → trash)
│   │   │       ├── send/       # Send email or draft
│   │   │       ├── drafts/     # Drafts CRUD
│   │   │       ├── trash/      # Trash list, restore, delete forever
│   │   │       ├── folder/     # spam, important, snoozed, starred, purchases
│   │   │       └── purchases/  # Purchase receipts + analytics
│   │   ├── dashboard/        # Main dashboard
│   │   ├── gmail/            # Gmail UI (sidebar-driven views)
│   │   ├── calendar/         # Calendar UI
│   │   ├── chat/             # AI assistant UI
│   │   ├── login/ / signup/
│   │   └── page.tsx          # Landing page
│   ├── hooks/                # React Query hooks (Gmail, calendar)
│   ├── lib/                  # Auth, Prisma, Corsair, OpenRouter, folder config
│   ├── services/             # Client-side API helpers (gmail-api.ts)
│   └── types/
├── corsair.ts                # Corsair engine config
└── package.json
```

---

## API Overview

### Gmail

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/gmail` | List sent emails |
| `DELETE` | `/api/gmail?id=` | Move email to trash |
| `POST` | `/api/gmail/send` | Send email (`raw`) or draft (`draftId`) |
| `GET` | `/api/gmail/drafts` | List drafts |
| `POST` | `/api/gmail/drafts` | Create draft |
| `DELETE` | `/api/gmail/drafts?id=` | Delete draft |
| `GET` | `/api/gmail/trash` | List trashed emails |
| `POST` | `/api/gmail/trash` | Restore email (`{ id }`) |
| `DELETE` | `/api/gmail/trash?id=` | Delete forever |
| `GET` | `/api/gmail/folder?folder=` | `spam`, `important`, `snoozed`, `starred`, `purchases` |
| `GET` | `/api/gmail/purchases` | Purchase emails + analytics |

### Calendar

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/calendar` | List events |
| `POST` | `/api/calendar` | Create event |
| `DELETE` | `/api/calendar?id=` | Delete event |

### Chat

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | AI assistant — body: `{ messages: [{ role: "user", content }] }` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)
- PostgreSQL database
- Google Cloud OAuth credentials (Gmail + Calendar scopes)
- OpenRouter API key (for AI chat)

### Environment variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/inbox_commander"

# Corsair encryption
CORSAIR_KEK="your-aes-256-key-encryption-key"

# Better Auth
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI (OpenRouter)
OPENROUTER_API_KEY="your-openrouter-api-key"
```

> **Google OAuth:** Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI. Enable Gmail (modify, labels, compose, send) and Google Calendar API scopes.

### Install & run

```bash
pnpm install
pnpm prisma db push
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Sign in to reach the dashboard.

If port 3000 is already in use, stop the existing process or use the port Next.js assigns.

---

## Navigation

The sidebar is the primary navigation — Gmail views are opened via URL query params:

| Sidebar item | Route |
|--------------|-------|
| Dashboard | `/dashboard` |
| Google Calendar | `/calendar` |
| Sent Emails | `/gmail` |
| Drafts | `/gmail?tab=drafts` |
| Starred | `/gmail?tab=starred` |
| Important | `/gmail?tab=important` |
| Snoozed | `/gmail?tab=snoozed` |
| Spam | `/gmail?tab=spam` |
| Purchases | `/gmail?tab=purchases` |
| Trash | `/gmail?tab=trash` |
| AI Assistant | `/chat` |

---

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server (Turbopack) |
| `pnpm build` | Generate Prisma client and production build |
| `pnpm start` | Run production server |
| `pnpm lint` | Biome lint check |
| `pnpm format` | Biome format write |

---

## Database & Corsair

PostgreSQL stores Better Auth users/sessions and Corsair integration state:

- **User / Session / Account** — authentication
- **CorsairIntegration** — Gmail and Calendar plugin config
- **CorsairAccount** — per-user Google token binding
- **CorsairEntity / CorsairEvent** — sync telemetry and webhooks

See `prisma/schema.prisma` for the full schema.

---

## License

MIT License — open source, contributions welcome.
