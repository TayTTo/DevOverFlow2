# DevFlow (DevOverFlow2)

A Q&A site for developers, built with **TanStack Start**. It is a migration of
the original Next.js 15 app ([TayTTo/Nextjs15](https://github.com/TayTTo/Nextjs15));
see [docs/MIGRATION.md](docs/MIGRATION.md) for what changed and why.

## Stack

| Area      | Tool                                                       |
| --------- | ---------------------------------------------------------- |
| Framework | TanStack Start + TanStack Router (file-based routing)      |
| Toolchain | Vite+ (`vp`), pnpm                                         |
| UI        | React 19, Tailwind CSS v4, shadcn/ui (Radix), lucide icons |
| Forms     | react-hook-form + zod, MDXEditor                           |
| Auth      | Better Auth (email/password, optional GitHub/Google)       |
| Database  | MongoDB (Better Auth adapter + Mongoose models)            |

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional: fill in to enable sign-in/sign-up
pnpm dev                     # http://localhost:3000
```

Every page works **without** a database. Only submitting the sign-in/sign-up
forms needs `MONGODB_URI` and `BETTER_AUTH_SECRET` in `.env.local`
(see [.env.example](.env.example)). `.env.local` is git-ignored — never commit it.

> Running in a VM? `localhost` on your host is not the VM. Use
> `ssh -L 3000:localhost:3000 <user>@<vm-ip>` or `pnpm dev --host 0.0.0.0`.

## Scripts

| Command          | What it does                                       |
| ---------------- | -------------------------------------------------- |
| `pnpm dev`       | Dev server on port 3000                            |
| `pnpm build`     | Production build (also regenerates the route tree) |
| `pnpm start`     | Run the production build                           |
| `pnpm test`      | Vitest                                             |
| `vp check --fix` | Format, lint and type check (runs on pre-commit)   |

## Project structure

```
src/
├── routes/                  # File-based routes (URL = file path)
│   ├── __root.tsx           # <html>, fonts, theme provider, toaster
│   ├── _main.tsx            # Layout: navbar + left/right sidebars
│   ├── _main/               # /, /community, /tags, /ask-question, ...
│   ├── _auth.tsx            # Layout: "Join DevFlow" card + social login
│   ├── _auth/               # /sign-in, /sign-up
│   └── api/auth/$.ts        # Better Auth handler for /api/auth/*
├── components/
│   ├── ui/                  # shadcn/ui primitives (owned, editable)
│   ├── navigation/          # Navbar, sidebars, nav links, theme toggle
│   ├── cards/ forms/ filter/ search/ editor/
├── lib/
│   ├── auth.ts              # Better Auth server config (server only)
│   ├── auth-client.ts       # Better Auth browser client
│   ├── mongoose.ts          # Cached Mongoose connection
│   ├── handlers/            # action() guard, error formatting
│   └── validation.ts        # zod schemas
├── database/                # Mongoose models
├── constants/               # Routes, sidebar links, tech icons, mock data
└── types/
```

Routes starting with `_` (like `_main`) are **pathless layouts**: they wrap
child pages without adding a URL segment. `src/routeTree.gen.ts` is generated —
don't edit it.

## Status

| Done                                             | Not yet built                                                                |
| ------------------------------------------------ | ---------------------------------------------------------------------------- |
| Layout, navigation, dark mode                    | Saving questions (form doesn't submit yet)                                   |
| Home: search, filter, question cards (mock data) | Real question data from MongoDB                                              |
| Ask-question form with Markdown editor           | Question details, profile, community, collections, jobs pages (placeholders) |
| Sign-in/sign-up UI + Better Auth backend         | Route protection                                                             |

## Learning

[learning/](learning/README.md) is a step-by-step path through the skills used
in this migration, with exercises based on this codebase.
