# 06 · Tooling & Debugging

## Why it matters

Half of this session was debugging _"why does localhost:3000 show the wrong
page?"_. Knowing the tools turns hours into minutes.

## The toolchain in this repo

| Tool         | Command                     | Use                                                    |
| ------------ | --------------------------- | ------------------------------------------------------ |
| Vite+ (`vp`) | `vp dev`                    | Dev server (port 3000 via `pnpm dev`)                  |
|              | `vp build`                  | Production build (also regenerates `routeTree.gen.ts`) |
|              | `vp check --fix`            | Format + lint + **type check**                         |
|              | `vp add <pkg>`              | Install a dependency                                   |
| pnpm         | `pnpm install` / `pnpm dev` | Package manager / scripts                              |
| Repowise     | `repowise distill <cmd>`    | Shorten noisy output                                   |

`vp` lives in `node_modules/.bin`. If `vp: command not found`, use `pnpm dev`
or `export PATH=$PWD/node_modules/.bin:$PATH`.

## Debugging playbook: "the page is wrong / doesn't load"

**1. Is a server actually running, and where?**

```bash
ss -ltnp | grep :3000        # who listens on 3000 (Linux)
curl -I localhost:3000       # does it answer?
```

**2. Which machine is "localhost"?** Your project runs in a VM
(`192.168.122.180`). On the host, `localhost` means the host itself.
Options: SSH tunnel `ssh -L 3000:localhost:3000 kenguin@192.168.122.180`,
or `pnpm dev --host 0.0.0.0` then open `http://192.168.122.180:3000`.

**3. Is the code what you think it is?**

```bash
grep -n 'TanStack Start Base Template' -r src/   # still the template?
git log --oneline -5                             # which version is checked out?
```

**4. Read the real error.** Build output, `vp check`, and the browser
DevTools console (F12) — copy the exact message.

**5. Verify every page quickly** (what Claude did before committing):

```bash
for p in / /community /sign-in; do
  echo "$p $(curl -s -o /dev/null -w '%{http_code}' localhost:3000$p)"
done
```

## Exercises

1. Start `pnpm dev`, then from the VM run `ss -ltnp | grep 3000`. Note the PID.
2. Open the site from your host using **both** methods in step 2.
3. Break something on purpose (import a missing file), read the error in
   `vp dev`, `vp build`, and the browser. Which is clearest?
4. Open DevTools → Console on `/`. Are there hydration warnings? Fix one.

## Docs

- Vite+: https://viteplus.dev/guide/ (also local: `node_modules/vite-plus/docs`)
- Chrome DevTools: https://developer.chrome.com/docs/devtools
