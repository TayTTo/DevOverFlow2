# 01 · Git

## Why it matters

Git saved us twice in this migration: it **proved** the Next.js code was never
in DevOverFlow2, and it let us work on a **branch** so `main` stayed safe.

## Concepts

| Concept | Command                        | What it means                            |
| ------- | ------------------------------ | ---------------------------------------- |
| Status  | `git status`                   | What changed and what is staged          |
| Branch  | `git checkout -b feat/x`       | A safe copy of history to work on        |
| Stage   | `git add <paths>`              | Choose exactly what goes into the commit |
| Commit  | `git commit -m "..."`          | Save a snapshot with a message           |
| Push    | `git push -u origin feat/x`    | Upload the branch to GitHub              |
| Log     | `git log --oneline --all`      | See history on every branch              |
| Diff    | `git diff main..feat/x --stat` | What changed between two points          |
| Show    | `git show <commit>:<file>`     | Read a file as it was in an old commit   |

## From this project

**Proving where code lives** (what we did when you asked "are you sure?"):

```bash
git log --all --reflog --format='%h %ad %s' --date=short   # every commit ever
git log --all --name-only --format= | sort -u              # every file ever
git ls-remote origin                                        # branches on GitHub
git fsck --unreachable                                      # orphaned objects
```

Result: 4 commits, first one "Initial commit from TanStack Builder" → the
Next.js app was in a **different repo** (`TayTTo/Nextjs15`).

**Staging only what belongs in the commit.** Your working tree had unrelated
files (`.repowise/`, `.vscode/`…). We staged by path instead of `git add -A`:

```bash
git add package.json pnpm-lock.yaml src/ public/icons public/images
```

## Exercises

1. Run `git log --oneline` in `~/Nextjs15`. Which commit added the question form?
2. Show the original home page from Next.js history:
   `git -C ~/Nextjs15 show 64aa905:"app/(root)/page.tsx" | head -30`
3. Make a branch `practice/git`, edit `learning/README.md`, commit, then switch
   back to `feat/migrate-ui-shell` and delete the branch with `git branch -D`.
4. Why is committing `.env.local` dangerous? (Hint: check commit `eceeb6f`.)

## Docs

- Pro Git book (free): https://git-scm.com/book/en/v2
- GitHub CLI: https://cli.github.com/manual/
