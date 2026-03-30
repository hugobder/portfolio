# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm start         # Start production server
```

No test suite is configured.

Database migrations are managed with Drizzle Kit — schema lives in `src/lib/db/schema.ts`, migrations output to `./drizzle/`. The SQLite database file is created at `./data/portfolio.db` on first run.

## Environment Variables

```
ADMIN_PASSWORD=   # Required — password for /admin login
SESSION_SECRET=   # Required — used to generate session tokens
NEXT_PUBLIC_SITE_URL=  # Optional — defaults to https://bruderhugo.fr
```

## Architecture

This is a **Next.js App Router** portfolio site with a built-in admin CMS. It uses **SQLite + Drizzle ORM** (`better-sqlite3`) with no external database dependency.

### Route Groups

- **`(admin-auth)/`** — Unauthenticated admin routes (login page only)
- **`(admin-dashboard)/`** — Protected admin routes with a shared sidebar layout
- Public pages: `/`, `/about`, `/projects`, `/contact`

### Auth Flow

`src/middleware.ts` guards all `/admin/*` routes (except `/admin/login`) by checking the `admin_session` cookie. Auth logic is in `src/lib/auth.ts` — passwords are bcrypt-hashed and compared against the `ADMIN_PASSWORD` env var. Sessions use a random token stored in an HTTP-only cookie (7-day expiry).

### Data Layer

`src/lib/data.ts` contains all DB queries. Settings are stored as key/value JSON rows in the `settings` table (name, title, bio, email, social_links, skills). `initializeSettings()` seeds defaults on first run and is called from server components that need settings.

### Three DB Tables

- **`projects`** — Portfolio projects with status (`draft`|`published`), featured flag, display order, and technologies (JSON array)
- **`settings`** — Site-wide config as JSON key/value pairs
- **`messages`** — Contact form submissions with read/unread state

### API Routes (`src/app/api/`)

| Route | Methods |
|---|---|
| `/api/auth/login`, `/logout`, `/check` | POST, POST, GET |
| `/api/projects` | GET, POST |
| `/api/projects/[id]` | GET, PUT, DELETE |
| `/api/contact` | POST |
| `/api/messages` | GET |
| `/api/messages/[id]` | PATCH, DELETE |
| `/api/settings` | GET, PUT |

### UI Stack

- **shadcn/ui** (new-york style) with Radix UI primitives — components in `src/components/ui/`
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **framer-motion** for animations
- **sonner** for toast notifications
- Path alias `@/*` → `src/*`

### Docker

`next.config.ts` sets `output: "standalone"`. The `docker-compose.yml` mounts a named volume at `/app/data` for SQLite persistence.
