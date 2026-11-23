# 08 · Practice: Migrate the Home Page Yourself (Phase 2)

Your capstone. Do it on a branch; ask Claude for **hints or a review**, not
the solution.

```bash
# Start from phase 1 (34a3767), before phase 2 was done for you
git checkout -b practice/phase-2 34a3767
pnpm install

# When finished, compare with the reference solution:
git diff practice/phase-2 d4ee91f -- src/
```

## Goal

`/` shows the full home page from `~/Nextjs15/app/(root)/page.tsx`: title,
"Ask a question", **search box**, **filter buttons**, **question cards**, and
`?query=react&filter=react` in the URL filters the list.

## Files to migrate

| From `~/Nextjs15`                   | To `src/`                                                | Difficulty                      |
| ----------------------------------- | -------------------------------------------------------- | ------------------------------- |
| `components/ui/input.tsx`           | `components/ui/input.tsx`                                | ⭐ copy                         |
| `components/Metric.tsx`             | `components/Metric.tsx`                                  | ⭐ `Image`/`Link` swap          |
| `components/cards/QuestionCard.tsx` | `components/cards/QuestionCard.tsx`                      | ⭐⭐                            |
| `components/filter/HomeFilter.tsx`  | `components/filter/HomeFilter.tsx`                       | ⭐⭐⭐ search params            |
| `components/search/LocalSearch.tsx` | `components/search/LocalSearch.tsx`                      | ⭐⭐⭐ search params + debounce |
| `lib/url.ts`                        | probably **not needed** (TanStack handles search params) | —                               |
| `app/(root)/page.tsx`               | `routes/_main/index.tsx`                                 | ⭐⭐                            |

## Steps & hints

**1. Validate search params on the route** (`_main/index.tsx`)

```tsx
export const Route = createFileRoute('/_main/')({
  validateSearch: (search: Record<string, unknown>) => ({
    query: typeof search.query === 'string' ? search.query : '',
    filter: typeof search.filter === 'string' ? search.filter : '',
  }),
  component: Home,
})
// in Home: const { query, filter } = Route.useSearch()
```

**2. Replace `router.push(formUrlQuery(...))`**
The Next.js code builds URL strings by hand. In TanStack:

```tsx
const navigate = useNavigate({ from: '/' })
navigate({ search: (prev) => ({ ...prev, filter: 'react' }) })
```

To remove a param, set it to `undefined` (and make it optional in
`validateSearch`).

**3. `LocalSearch` debounce** — keep the `useEffect` + `setTimeout` pattern,
just swap the navigation call. Pass `replace: true` so typing doesn't flood
browser history.

**4. Mock data** — move the `questions` array into
`src/constants/mock.ts` for now; real data comes in phase 4.

**5. Watch out**

- `getTimeStamp(createdAt)` with `new Date()` may differ between server and
  browser render → hydration warning. Notice it, think about why.
- Remove the `console.log`s from the original.

## Definition of done

- [ ] `vp check` passes with 0 errors
- [ ] `vp build` succeeds
- [ ] Typing "react" in search updates the URL and the list
- [ ] Clicking a filter toggles `?filter=` on and off
- [ ] Back button restores the previous search
- [ ] No errors in the browser console

## Get a review

When done: _"Review my phase 2 changes on branch practice/phase-2 —
explain anything I did that isn't idiomatic TanStack."_

Docs: https://tanstack.com/router/latest/docs/framework/react/guide/search-params
