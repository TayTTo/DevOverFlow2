# 03 · TanStack Router & TanStack Start

## Why it matters

This is the framework you migrated **to**. Routing is the core of the migration.

## Concepts

### File-based routing

Each file in `src/routes/` is a route. The plugin generates
`src/routeTree.gen.ts` automatically — never edit that file by hand.

| File                  | URL                | Notes                            |
| --------------------- | ------------------ | -------------------------------- |
| `__root.tsx`          | (wraps everything) | `<html>`, `<head>`, providers    |
| `_main.tsx`           | (no URL segment)   | **Pathless layout**, leading `_` |
| `_main/index.tsx`     | `/`                | Index route inside the layout    |
| `_main/community.tsx` | `/community`       |                                  |
| `_main/tags/$id.tsx`  | `/tags/react`      | `$id` = dynamic param            |
| `_auth/sign-in.tsx`   | `/sign-in`         | Uses the auth layout             |

### Pathless layouts = Next.js route groups

Next.js `app/(root)/layout.tsx` → TanStack `src/routes/_main.tsx`.
The layout renders `<Outlet />` where the child page goes:

```tsx
export const Route = createFileRoute('/_main')({ component: MainLayout })
function MainLayout() {
  return (
    <main>
      … <Navbar /> <LeftSideBar /> <Outlet /> <RightSideBar /> …
    </main>
  )
}
```

### Type-safe links

```tsx
<Link to="/community">Community</Link>                    // ✅ checked
<Link to="/tags/$id" params={{ id: 'react' }}>…</Link>    // ✅ params checked
<Link to="/does-not-exist">…</Link>                       // ❌ type error
```

### Reading the URL

| Need                     | TanStack                                                |
| ------------------------ | ------------------------------------------------------- |
| Current path             | `useLocation({ select: (l) => l.pathname })`            |
| Route params             | `Route.useParams()`                                     |
| Search params `?query=x` | `validateSearch` + `Route.useSearch()`                  |
| Navigate in code         | `const navigate = useNavigate(); navigate({ to: '/' })` |

### TanStack Start extras (phase 4)

- `createServerFn()` replaces Next.js Server Actions and most API routes
- Loaders (`loader: () => …`) fetch data before the page renders

## Exercises

1. Add `src/routes/_main/question/$id.tsx` that shows "Question {id}". Run
   `vp dev` and open `/question/42`. Look at what changed in `routeTree.gen.ts`.
2. Change the "Hot network" links in `RightSideBar.tsx` to point at your new
   question route (they point at `/profile/$id` now — copied from an old bug).
3. Make `/jobs` render inside the **auth** layout instead. What did you move?
4. Read "Search Params" in the docs; sketch how `?query=` would work for
   `LocalSearch`.

## Docs

- Router overview: https://tanstack.com/router/latest/docs/framework/react/overview
- File-based routing: https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing
- Search params: https://tanstack.com/router/latest/docs/framework/react/guide/search-params
- Start: https://tanstack.com/start/latest
- Skills already in this repo: `.claude/skills/router-plugin`, `router-query`
