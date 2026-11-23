# Migration: Next.js 15 → TanStack Start

Source app: [TayTTo/Nextjs15](https://github.com/TayTTo/Nextjs15)
(last commit `64aa905`, Oct 2025). Target: this repo, branch
`feat/migrate-ui-shell`.

## Phases

Each phase ended with a passing `vp build` + `vp check` and every page
returning 200.

| Phase | Commit    | Scope                                                                      |
| ----- | --------- | -------------------------------------------------------------------------- |
| 1     | `34a3767` | UI shell: styles, fonts, theme, navbar, sidebars, layouts, page routes     |
| 2     | `d4ee91f` | Home page (search, filter, question cards), ask-question form + MDX editor |
| 4     | `fd31b56` | Better Auth on MongoDB, Mongoose models, server helpers, env handling      |
| 3     | `3c40588` | Sign-in / sign-up forms, social login buttons, "Log out" in sidebars       |

Phase 4 was committed before phase 3 because the auth forms import the
Better Auth client, so each commit builds on its own.

## File mapping

| Next.js                               | TanStack Start                                 |
| ------------------------------------- | ---------------------------------------------- |
| `app/layout.tsx`                      | `src/routes/__root.tsx`                        |
| `app/(root)/layout.tsx`               | `src/routes/_main.tsx`                         |
| `app/(root)/page.tsx`                 | `src/routes/_main/index.tsx`                   |
| `app/(root)/<page>/page.tsx`          | `src/routes/_main/<page>.tsx`                  |
| `app/(auth)/layout.tsx`               | `src/routes/_auth.tsx`                         |
| `app/(auth)/sign-in/page.tsx`         | `src/routes/_auth/sign-in.tsx`                 |
| `app/api/auth/[...nextauth]/route.ts` | `src/routes/api/auth/$.ts`                     |
| `auth.ts` (NextAuth)                  | `src/lib/auth.ts` (Better Auth)                |
| `lib/action/auth.action.ts`           | `src/lib/actions/auth.ts`                      |
| `app/globals.css`                     | `src/styles.css`                               |
| `components/`, `lib/`, `database/`    | `src/components/`, `src/lib/`, `src/database/` |
| `constansts/`                         | `src/constants/` (typo fixed)                  |
| `types/global.d.ts`                   | `src/types/index.ts` (explicit exports)        |

## API mapping

| Next.js                                   | TanStack Start                                          |
| ----------------------------------------- | ------------------------------------------------------- |
| `next/link` `<Link href>`                 | `@tanstack/react-router` `<Link to>` (type-checked)     |
| `next/image` `<Image>`                    | `<img>`                                                 |
| `next/font/google`                        | Google Fonts `<link>` in `head()` + `@theme` font vars  |
| `export const metadata`                   | `head: () => ({ meta, links })`                         |
| `usePathname()`                           | `useLocation({ select: (l) => l.pathname })`            |
| `useSearchParams()` / page `searchParams` | `validateSearch` + `Route.useSearch()`                  |
| `useRouter().push(url)`                   | `useNavigate()({ search: (prev) => ... })`              |
| `next/dynamic({ ssr: false })`            | `React.lazy` inside `<ClientOnly>`                      |
| `"use client"`                            | removed (not needed)                                    |
| `NextResponse.json`                       | `Response.json`                                         |
| `next-auth/react` `signIn`                | `authClient.signIn.email` / `signIn.social`             |
| `auth()` in server code                   | `auth.api.getSession({ headers: getRequestHeaders() })` |

## Decisions

- **Route groups → pathless layouts.** `(root)`/`(auth)` became `_main`/`_auth`.
  TanStack's `(group)` folders only organize files and can't hold a layout.
  (Also recorded in Repowise, decision `a56e8a3e`.)
- **URL is the source of truth for search/filter.** `HomeFilter` and
  `LocalSearch` read `Route.useSearch()` instead of mirroring it in
  `useState`. Search uses `replace: true` so typing doesn't flood history.
- **Typed links.** Sidebar links use `as const`; dynamic links use
  `to="/tags/$id" params={{ id }}`. `Metric` takes `profileId` instead of an
  arbitrary `href` for the same reason. Placeholder routes
  (`/question/$id`, `/tags/$id`, `/profile/$id`) exist so links type-check.
- **Better Auth instead of NextAuth.** Stores users, accounts and sessions in
  MongoDB itself, so the hand-written accounts/users/OAuth API routes were no
  longer needed. Users live in the same `users` collection as the Mongoose
  `User` model (`user.modelName: 'users'`) so other models can reference them.
  DevFlow fields (`username`, `bio`, `location`, `portfolio`, `reputation`)
  are Better Auth `additionalFields`.
- **No Mongo transactions.** The adapter is created without `client`, because
  transactions need a replica set (the Next.js app hit the same error).
- **App boots without a database.** `MongoClient` connects lazily; only auth
  requests fail when `MONGODB_URI` is missing.
- **OAuth providers are optional.** GitHub/Google are enabled only when both
  their env keys are set.
- **Kept `next-themes`.** Despite the name it has no Next.js dependency.

## Removed

| Removed                                                     | Why                                                                                                        |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `app/api/accounts/*`, `app/api/auth/signin-with-oauth`      | NextAuth plumbing; Better Auth handles accounts                                                            |
| `app/api/users/*`                                           | Only used by NextAuth; allowed unauthenticated edit/delete of any user. Rebuild with auth checks if needed |
| `lib/api.ts`, `lib/handlers/fetch.ts`                       | Client for the removed API routes                                                                          |
| `app/api/tickets/*`, `app/database.ts`                      | In-memory demo, unrelated to DevFlow                                                                       |
| `database/account.model.ts`                                 | Better Auth owns the `account` collection                                                                  |
| `components/search/hello.tsx`, `dark-editor.css`            | Unused in the Next.js app                                                                                  |
| TanStack starter `Header`, `Footer`, `ThemeToggle`, `about` | Replaced by DevFlow UI                                                                                     |

## Bugs fixed during migration

| Where                 | Bug in the Next.js code                                              |
| --------------------- | -------------------------------------------------------------------- |
| `AuthForm`            | JSX returned from inside `handleSubmit` → form never rendered        |
| `getDeviconClassName` | Returned a malformed class string → tag icons never showed           |
| `QuestionCard`        | Votes metric showed the author name; author linked to a question URL |
| Home filter           | Matched only the first tag                                           |
| Mock data             | `new Date()` at import → server/browser hydration mismatch           |
| `question.model.ts`   | Schema field `answer` vs interface `answers`                         |
| `LeftSideBar`         | Sign-up button labelled "Sign in"; `<a>` nested in `<button>`        |
| Root layout           | Leftover "This is gotesk" debug headings                             |

## Security notes

- `.env.local` had been committed by the template (with a `DATABASE_URL` and
  `BETTER_AUTH_SECRET`). It is now untracked and matched by `*.local` in
  `.gitignore`, but the old values remain in git history — **rotate them**.
- `.env.example` lists every variable without values.

## Known gaps

- `Tailwind` arbitrary values without units (`w-[330]`, `lg:pl-[266]`,
  `sm:pl-[80]`, `min-lg:pr-[332]`) were copied as-is and are ignored by
  Tailwind; add `px` to apply them.
- Ask-question form does not save; questions are mock data
  (`src/constants/mock.ts`). Next step: a server function using
  `src/lib/handlers/action.ts`.
- Sign-up/sign-in have not been tested against a real MongoDB yet.
- No route protection (the Next.js middleware didn't protect routes either).
