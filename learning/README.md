# Learning Path: Skills Behind the Next.js → TanStack Migration

This folder teaches the skills used to migrate DevFlow from Next.js
(`~/Nextjs15`) to TanStack Start (this repo). Every lesson uses **real code
from this project**, so you can open the files and compare.

## How to use it

1. Read the lessons in order. Each one has: _why it matters → concepts →
   example from this project → exercises → official docs_.
2. Do the exercises **yourself first**. Ask Claude only when stuck, and ask it
   to _explain_, not to _write it for you_.
3. Finish with [08-practice-phase-2.md](08-practice-phase-2.md): migrate the
   home page on your own. That's the real test.

## Roadmap

| #   | Lesson                                           | You'll be able to…                           | Time      |
| --- | ------------------------------------------------ | -------------------------------------------- | --------- |
| 01  | [Git](01-git.md)                                 | Branch, commit, push, dig through history    | 2–3 h     |
| 02  | [TypeScript + React](02-typescript-react.md)     | Read and write typed components              | 1–2 weeks |
| 03  | [TanStack Router & Start](03-tanstack-router.md) | Build routes, layouts, links, params         | 3–5 days  |
| 04  | [Tailwind + shadcn/ui](04-tailwind-shadcn.md)    | Style pages, use and customize UI components | 2–4 days  |
| 05  | [Migration mapping](05-migration-mapping.md)     | Convert any Next.js file to TanStack         | 1–2 days  |
| 06  | [Tooling & debugging](06-tooling-debugging.md)   | Build, check, debug "page doesn't show"      | 1–2 days  |
| 07  | [Working with Claude](07-working-with-claude.md) | Get good results cheaply                     | 1 h       |
| 08  | [Practice: phase 2](08-practice-phase-2.md)      | Migrate the home page yourself               | 1–2 days  |

## Skill check: are you ready?

You understand this migration when you can answer these without looking:

- [ ] Why did `localhost:3000` on your host show a different app than the VM?
- [ ] Why does `src/routes/_main.tsx` not add `/_main` to the URL?
- [ ] What replaces `next/link`, `next/image`, `usePathname()`?
- [ ] Why does `<Link to={someString}>` fail type checking but `to="/tags"` works?
- [ ] What does `as const` do in `src/constants/index.ts`?
- [ ] How did we prove the old Next.js code was never in this repo's history?
