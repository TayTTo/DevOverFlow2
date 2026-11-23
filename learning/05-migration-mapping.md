# 05 · Next.js → TanStack Start Mapping

## Why it matters

This is _the_ migration skill: look at a Next.js file, know exactly what each
line becomes.

## The cheat sheet

| Next.js                                 | TanStack Start                                         | Example in this repo       |
| --------------------------------------- | ------------------------------------------------------ | -------------------------- |
| `app/layout.tsx`                        | `src/routes/__root.tsx` (`shellComponent`)             | `__root.tsx`               |
| `app/(group)/layout.tsx`                | `src/routes/_group.tsx` + `<Outlet />`                 | `_main.tsx`, `_auth.tsx`   |
| `app/foo/page.tsx`                      | `src/routes/_group/foo.tsx`                            | `_main/community.tsx`      |
| `app/foo/[id]/page.tsx`                 | `src/routes/foo/$id.tsx`                               | `_main/tags/$id.tsx`       |
| `export const metadata`                 | `head: () => ({ meta, links })`                        | `__root.tsx`               |
| `next/font/google`                      | Google Fonts `<link>` + `@theme` font vars             | `__root.tsx`, `styles.css` |
| `import Link from 'next/link'` / `href` | `import { Link } from '@tanstack/react-router'` / `to` | `navbar/index.tsx`         |
| `next/image` `<Image>`                  | `<img>` (same `src`, `width`, `height`)                | `NavLinks.tsx`             |
| `usePathname()`                         | `useLocation({ select: l => l.pathname })`             | `NavLinks.tsx`             |
| `useRouter().push(url)`                 | `useNavigate()({ to, search })`                        | phase 2                    |
| `useSearchParams()`                     | `Route.useSearch()` + `validateSearch`                 | phase 2                    |
| `searchParams` page prop                | `Route.useSearch()`                                    | phase 2                    |
| `"use client"`                          | delete it (not needed)                                 | `components/ui/*`          |
| Server Actions                          | `createServerFn()`                                     | phase 4                    |
| `app/api/*/route.ts`                    | server functions or server routes                      | phase 4                    |
| `middleware.ts`                         | `beforeLoad` on routes                                 | phase 4                    |
| `next-auth`                             | Better Auth / Auth.js (decide in phase 4)              | phase 4                    |
| `@/` alias = project root               | `@/` alias = `src/` (`tsconfig.json`)                  | everywhere                 |

## The process we followed (repeatable)

1. **Inventory**: list every file in the old app; grep for `from 'next` to
   count what needs rewriting (`grep -rl "from ['\"]next" --include=*.tsx .`).
2. **Phase it**: shell → pages → auth UI → backend. Each phase ends runnable.
3. **Branch** (`feat/migrate-ui-shell`).
4. **Copy what's framework-free** unchanged (shadcn `ui/`, `constants`,
   `utils`, CSS, `public/`).
5. **Rewrite framework touchpoints** using the table above.
6. **Verify**: `vp build`, `vp check`, open every page.
7. **Commit only your changes**, push, open a PR.

## Exercises

Convert these by hand (answers: compare with the files in `src/`):

1. `~/Nextjs15/components/navigation/navbar/index.tsx` → write your version,
   then diff with `src/components/navigation/navbar/index.tsx`.
2. `~/Nextjs15/app/(auth)/layout.tsx` → compare with `src/routes/_auth.tsx`.
3. Explain why `Theme.tsx` barely changed (hint: `next-themes` isn't tied to
   Next.js).
