# 07 · Working with Claude (well and cheaply)

## Learn, don't outsource

- Ask **"explain why"**, not just "fix it". E.g. _"Why does `as const` fix the
  Link type error?"_
- Try first, then ask Claude to **review** your attempt.
- Ask for **hints only**: _"Give me a hint for migrating LocalSearch, don't
  write the code."_

## Save cost

| Habit                                            | Why                                           |
| ------------------------------------------------ | --------------------------------------------- |
| `/clear` between tasks/phases                    | Every message re-sends the whole conversation |
| Be specific: file + function + error text        | Less searching = fewer tokens                 |
| `/model` → Sonnet/Haiku for small tasks          | Cheaper per token                             |
| `/compact` when a session gets long              | Summarizes history                            |
| Disable unused MCP servers (`/mcp`)              | Their tool definitions load every turn        |
| Handoff note in `NOTES.md` instead of `--resume` | Fresh start, small context                    |
| `/cost` or `/usage`                              | Know what you spend                           |

## Where to store knowledge

| Information              | Put it in                           |
| ------------------------ | ----------------------------------- |
| Project rules & commands | `.claude/CLAUDE.md` (keep it short) |
| Your preferences         | Tell Claude "remember …" (memory)   |
| Why a design was chosen  | `repowise decision add`             |
| Unfinished task state    | `NOTES.md`                          |

## Good prompts from this migration

- ✅ _"This is the initial project: https://github.com/TayTTo/Nextjs15.git"_ —
  one sentence that unblocked everything. **Give the source of truth early.**
- ✅ _"Are you sure you checked the whole git history?"_ — pushing back made
  Claude verify harder. **Ask for proof.**
- ✅ _"Start phase 1"_ after a plan — small, scoped steps.
- ❌ _"the page doesn't show current project"_ — vague; took several rounds.
  Better: _"localhost:3000 shows the TanStack starter, I expected my DevFlow
  UI from the Next.js app at <url>"_.
