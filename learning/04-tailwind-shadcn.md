# 04 · Tailwind CSS v4 + shadcn/ui

## Why it matters

All of UI A's look lives in `src/styles.css` and Tailwind classes. The
buttons, dropdown and mobile menu are shadcn/ui components.

## Concepts

### Tailwind v4 (CSS-first config — no `tailwind.config.js`)

| Directive in `src/styles.css`              | Purpose                                       |
| ------------------------------------------ | --------------------------------------------- |
| `@import 'tailwindcss';`                   | Load Tailwind                                 |
| `@theme { --color-primary-500: #ff7000; }` | Creates `text-primary-500`, `bg-primary-500`… |
| `@utility flex-between { … }`              | Your own class, e.g. `flex-between`           |
| `@custom-variant dark (&:is(.dark *));`    | `dark:` works when `<html class="dark">`      |

Arbitrary values need units: `w-[330px]` ✅, `w-[330]` ❌ (silently ignored).
`RightSideBar.tsx` and `_main.tsx` still have the ❌ form, copied from Next.js.

### Dark mode

`next-themes` puts `class="dark"` on `<html>`; utilities like
`background-light900_dark200` switch colors. The toggle is
`src/components/navigation/navbar/Theme.tsx`.

### shadcn/ui

Not a library — the source is **copied into your project**
(`src/components/ui/`). You own it and can edit it. Built on Radix primitives
(accessible dialogs, dropdowns) + `class-variance-authority` for variants +
`cn()` (`src/lib/utils.ts`) to merge classes.

`asChild` renders the child instead of a `<button>`:

```tsx
<Button asChild className="primary-gradient">
  <Link to="/ask-question">Ask a question</Link> {/* renders a styled <a> */}
</Button>
```

We used this in `LeftSideBar.tsx` to avoid a `<a>` inside `<button>`.

## Exercises

1. Fix `w-[330]` → `w-[330px]` in `RightSideBar.tsx` and the `pl-[266]`,
   `pl-[80]`, `pr-[332]` in `_main.tsx`. Compare before/after in the browser.
2. Add a `--color-primary-700` to `@theme` and use `hover:bg-primary-700` on
   the "Ask a question" button.
3. Add a new `size: 'xl'` variant to `src/components/ui/button.tsx`.
4. Toggle dark mode; find which utility in `styles.css` controls the sidebar
   background.

## Docs

- Tailwind v4: https://tailwindcss.com/docs
- Theme variables: https://tailwindcss.com/docs/theme
- shadcn/ui: https://ui.shadcn.com/docs
- Radix primitives: https://www.radix-ui.com/primitives/docs/overview/introduction
