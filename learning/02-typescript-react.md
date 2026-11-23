# 02 · TypeScript + React

## Why it matters

Everything in `src/` is a typed React component. You can't migrate code you
can't read.

## Concepts to learn (in order)

**React**

- Components and props: `function TagCard({ name, compact }: TagProps)`
- JSX: `className`, `{expression}`, `{cond && <X/>}`, `{list.map(...)}`
- `key` on list items: `{popularTags.map(t => <TagCard key={t._id} … />)}`
- Hooks: `useState`, `useEffect` (used by `LocalSearch` in phase 2)
- Composition: `children`, layouts that wrap pages

**TypeScript**

- `interface` / `type` for props
- Union types: `side?: 'top' | 'right' | 'bottom' | 'left'` (in `sheet.tsx`)
- `as const`: turns values into exact literal types
- `import type { X }`: type-only imports (required by this repo's config)

## From this project

**`as const` made typed links work** (`src/constants/index.ts`):

```ts
export const sideBarLinks = [
  { imgUrl: '/icons/home.svg', label: 'Home', route: '/' },
  ...
] as const
```

Without `as const`, `route` has type `string`. TanStack's `<Link to>` only
accepts paths that exist, so `string` fails type checking. With `as const`,
`route` becomes `'/' | '/community' | …`, which matches real routes.

**Type-only import error** we hit during the build:

```ts
// ❌ TS1484: 'ToasterProps' is a type and must be imported using a type-only import
import { Toaster as Sonner, ToasterProps } from 'sonner'
// ✅
import { Toaster as Sonner, type ToasterProps } from 'sonner'
```

## Exercises

1. In `src/components/cards/TagCard.tsx`, what renders when `compact` is false?
   Is that what you want?
2. Remove `as const` from `src/constants/index.ts`, run `vp check`, read the
   error, then put it back.
3. Add an optional `onClick?: () => void` prop to `TagCard` and wire it to the
   button branch.

## Docs

- React (start with "Learn"): https://react.dev/learn
- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- React + TS cheatsheet: https://react-typescript-cheatsheet.netlify.app/
