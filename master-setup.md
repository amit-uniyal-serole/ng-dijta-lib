# Claude Master Setup

A reusable blueprint for wiring Claude Code into any project — runbook first, reference second.

> Stack-agnostic. Works for frontend, backend, infra, library, or monorepo. Adapt the examples; keep the structure.

---

## Part 1 — Runbook

A step-by-step checklist for bootstrapping the setup in a fresh repository. If you've never set up a Claude project before, start here and skim Part 2 as you go.

### Prerequisites

- [ ] Claude Code installed.
- [ ] Repo is under version control.
- [ ] You know the project's tech stack, build command, test command, and lint command.

### Step 1 — Create the skeleton

```bash
mkdir -p .claude/rules .claude/commands .claude/skills .claude/agents .claude/hooks
touch CLAUDE.md
touch .claude/settings.json
echo 'settings.local.json' >> .gitignore
echo '.claude/.mcp.local.json' >> .gitignore
```

### Step 2 — Write `CLAUDE.md`

Copy the `CLAUDE.md` template from the Appendix. Fill in every `<placeholder>`. Keep it under ~200 lines; link out to `rules/` for depth.

### Step 3 — Define the rule tiers

1. Create `.claude/rules/rules-hierarchy.md` from the Appendix template.
2. Create one rule file per topic you actually care about. Start small — 3 to 5 files is plenty. Add more only when you notice the same reviewer comment repeatedly.
3. Common starter set:
   - `prohibited.md` (Tier 1)
   - `security.md` (Tier 1)
   - `style-guide.md` (Tier 3)
   - `testing.md` (Tier 3)

### Step 4 — Seed `settings.json`

Copy the `settings.json` template from the Appendix. Add entries for:

- Build command (`Bash(<build>:*)`)
- Test command (`Bash(<test>:*)`)
- Package manager (`Bash(<pm>:*)`)
- Lint command (`Bash(<lint>:*)`)
- Read-only git (`git status:*`, `git diff:*`, `git log:*`, `git branch:*`, `git show:*`)
- File-ops helpers (`ls:*`, `grep:*`, `find:*`)

Do **not** allow destructive git (`push`, `reset --hard`, `branch -D`) in the shared allowlist — prompt for those every time.

### Step 5 — Add commands, skills, and agents as needed

Don't create them upfront. Let them emerge:

- The second time you run the same multi-step instruction → create a **command**.
- The second time you walk Claude through the same workflow with variations → create a **skill**.
- The second time you manually scope a "go explore X and report back" task → create a **subagent**.

Use the templates in the Appendix when each need arises.

### Step 6 — (Optional) Add hooks for automated behaviors

Use hooks when you want Claude to do something **every time** an event happens (file edit, tool call, session start). Configured in `settings.json` under `"hooks"`. See the Hooks reference below and the hooks template in the Appendix.

Common starter hooks:
- Run lint / format after every file edit
- Run a security check before any `Bash` tool call
- Inject project context on session start

### Step 7 — (Optional) Configure MCP servers

Use MCP servers when you want Claude to call external services (databases, APIs, design tools, cloud consoles) as tools. Configured in `.mcp.json` at the repo root, or `.claude/.mcp.local.json` for personal servers. See the MCP reference below.

### Step 8 — Verify

Open a fresh Claude conversation in the project and confirm:

- [ ] Claude mentions the project by name without being told (→ it read `CLAUDE.md`).
- [ ] Asking "what commands/skills are available here?" produces the correct list.
- [ ] Asking Claude to do something forbidden by a Tier 1 rule causes it to refuse or push back with the rule cited.
- [ ] Running the build, test, and lint commands succeeds without a permission prompt.
- [ ] If hooks are configured, a triggering event fires the hook (check output or side effect).
- [ ] If MCP servers are configured, the MCP tools appear in Claude's tool list.

If any of these fail, the corresponding piece of the setup is miswired or missing.

### Step 9 — Commit

```bash
git add CLAUDE.md .claude/settings.json .claude/rules .claude/commands .claude/skills .claude/agents .claude/hooks .gitignore
git add .mcp.json   # only if you created shared MCP config
git commit -m "Initial Claude setup"
```

`settings.local.json` and `.claude/.mcp.local.json` stay local.

---

## Part 2 — Reference

### 1. Purpose of a Claude setup

A Claude setup is a small, versioned configuration layer that teaches Claude **what this project is, what rules it must follow, and what shortcuts exist** for recurring work. Without it, every conversation restarts from zero and the model guesses at conventions. With it, the model reads the project's canonical instructions before every response and behaves consistently across sessions, teammates, and weeks.

A good setup answers four questions for Claude, in order of priority:

1. What is this project? (→ `CLAUDE.md`)
2. What must I never do / always do here? (→ `rules/`)
3. When the human types `/foo`, what do they want? (→ `commands/` and `skills/`)
4. When a task needs a specialist, who do I hand it to? (→ `agents/`)

Hooks and MCP servers extend Claude's reach: hooks let the harness react to events automatically, MCP servers let Claude talk to external systems.

### 2. Layout at a glance

```
<repo-root>/
├── CLAUDE.md                      # operational guide (entry point)
├── .mcp.json                      # shared MCP servers (committed, optional)
└── .claude/
    ├── rules/                     # tiered rule docs
    ├── commands/                  # slash commands (/foo)
    ├── skills/                    # user-invokable skills (/foo)
    ├── agents/                    # subagents
    ├── hooks/                     # hook scripts (optional)
    ├── .mcp.local.json            # personal MCP servers (gitignored, optional)
    ├── settings.json              # shared permissions + hooks (committed)
    └── settings.local.json        # per-developer overrides (gitignored)
```

### 3. The building blocks

#### `CLAUDE.md` — the entry point

A single markdown file at the repo root. Claude reads this automatically at the start of every conversation. Treat it as the operational preface to all work.

**Contains:** project summary, tech stack, workspace layout, key commands, naming conventions, import rules, rules-hierarchy pointer, command/skill table.

**Does NOT contain:** long rule explanations (belong in `rules/`), per-feature context (belongs in planning docs), volatile information.

**When to reach for it:** Always, at project creation. Edit it when the tech stack changes, major conventions shift, or a new command/skill is added.

#### `.claude/rules/` — the rulebook

One markdown file per topic. Rules describe **how** Claude should write code in this project: which patterns are forbidden, which are mandatory, and how to resolve conflicts between them.

**When to reach for it:** When a convention is non-obvious from reading the code, or when there is a rule that must be enforced consistently. If a reviewer would write "see the style guide" in a PR comment, the style guide should be a rule file.

**When NOT to reach for it:** Don't codify patterns that are already obvious from the codebase.

#### `.claude/commands/` — slash commands

One markdown file per command. Invoked by the user as `/<filename-without-.md>`. The file content becomes a prompt Claude runs.

**Use when:** the task is a fixed, multi-step procedure called often.

**Examples:** `/verify`, `/audit`, `/status`, `/cleanup`.

#### `.claude/skills/` — user-invokable skills

Like commands mechanically, but the content is a **playbook** rather than a script — it tells Claude the approach, the guardrails, and the shape of a good outcome, then lets Claude drive.

**Use when:** the workflow has a recognizable shape but the steps depend on what Claude finds.

**Examples:** `/debug`, `/refactor`, `/commit`, `/pr`.

> The distinction between `commands/` and `skills/` is intent, not mechanics. Scripts live in `commands/`; playbooks live in `skills/`.

#### `.claude/agents/` — subagents

Subagents run as separate Claude instances launched via the `Agent` tool. They have their own context window and tool permissions, and they return a single summary to the parent.

**Use when:** a task needs deep context that would pollute the main conversation, is independent and parallelizable, or benefits from a scoped specialist persona (architect, reviewer, explorer).

#### `.claude/hooks/` + `settings.json` hooks block — automated behaviors

Hooks are shell commands the harness runs automatically in response to events: `PreToolUse`, `PostToolUse`, `UserPromptSubmit`, `SessionStart`, `Stop`, etc. Claude does not invoke them; the harness does, based on `settings.json` configuration.

**Use when:** a behavior must happen **every time** a trigger fires and the user should not have to remember to ask for it.

**Common uses:**
- `PostToolUse` on `Edit` → run formatter / linter on the edited file.
- `PreToolUse` on `Bash` → block commands matching a dangerous pattern.
- `SessionStart` → print a project banner or load dynamic context.
- `Stop` → desktop notification when Claude finishes a long task.

**Keep scripts short.** Hook scripts should do one thing, exit fast, and return clean output. Long-running hooks make the harness feel laggy.

#### `.mcp.json` / `.claude/.mcp.local.json` — MCP servers

Model Context Protocol servers are long-running processes that expose additional tools to Claude (database clients, API wrappers, design-tool bridges, cloud consoles). Configure them in `.mcp.json` at the repo root (shared, committed) or `.claude/.mcp.local.json` (personal, gitignored). Claude auto-discovers both and namespaces the resulting tools as `mcp__<server>__<tool>`.

**Use when:** Claude needs to interact with a system that has no CLI equivalent, or where a CLI would be unreliable (e.g., browser automation, design tools, cloud dashboards, company-internal APIs).

**Don't use when:** a shell command + a file-based workflow would do the same job with less machinery.

**Examples of typical MCP servers:** playwright / chrome-devtools (browser control), figma (design inspection), database clients, cloud provider consoles, company-specific search / ticketing.

#### `.claude/settings.json` and `settings.local.json`

- **`settings.json`** — committed. Shared permissions the whole team needs, plus any hooks configuration. Minimum: build, test, package manager, lint, read-only git.
- **`settings.local.json`** — gitignored. Personal allowlist accumulated over time (ad-hoc `grep` patterns, one-off scripts). Never contains secrets.

### 4. The rule tier system

When rules conflict, Claude needs to know which wins. A tier system makes that explicit.

| Tier | Intent | Examples | On conflict |
|------|--------|----------|-------------|
| **1 — Non-Negotiable** | Safety and correctness. Never violated. | Prohibited patterns, security, accessibility | Block the work; ask the human |
| **2 — Core Patterns** | How the codebase is built. Deviations need justification. | Framework conventions, architecture, i18n, theming | Higher tier wins; document the choice |
| **3 — Quality** | Consistency and readability. | Style guide, testing, doc standards | Yield to tiers 1–2 |
| **4 — Operational** | Meta-guidance for Claude itself. | `CLAUDE.md` | Yield to all |

**Conflict resolution protocol:**
1. Same-tier conflict → stop and ask the human.
2. Cross-tier conflict → higher tier wins; Claude notes the override in its response.
3. Never "split the difference" — ambiguity is a signal to clarify, not compromise.

A rule that isn't placed in a tier is effectively unenforceable. Link every rule file to `rules-hierarchy.md`.

### 5. Decision guide — what goes where

| If you want Claude to… | Use |
|------------------------|-----|
| Know a fact or constraint at all times | **Rule** |
| Run the same procedure the same way every time | **Command** |
| Apply a pattern with judgment (debug, refactor, review) | **Skill** |
| Delegate a heavy or isolated task to a specialist | **Subagent** |
| React automatically to an event (no user prompt) | **Hook** |
| Call an external system as a tool | **MCP server** |
| Get project orientation on startup | **`CLAUDE.md`** |

Order of creation for a new project:
1. `CLAUDE.md` and `settings.json` — always.
2. `rules/` — add files as real constraints emerge. Don't pre-write speculative rules.
3. `commands/` — add when you catch yourself typing the same multi-step instruction twice.
4. `skills/` — add when a workflow has a recognizable shape but variable steps.
5. `agents/` — when a parallel or isolated specialist is genuinely needed.
6. `hooks/` — when a behavior must fire automatically on an event.
7. `.mcp.json` — when an external system must appear as tools in Claude's toolbox.

---

## Appendix — Templates

Copy these verbatim and fill in the `<placeholders>`. Everything here is generic; none of it assumes a specific language or framework.

The command / skill / agent templates use YAML frontmatter (the Claude Code standard). Frontmatter is optional — Claude Code accepts files with just a body — but frontmatter gives you a proper `description` that shows up in listings and helps Claude pick the right one.

### Template: `CLAUDE.md`

```markdown
# <project-name> — AI Operational Guide

## Project Overview

<one-paragraph summary of what this project is, what it does, and what it deliberately is NOT>

## Tech Stack

| Technology | Version |
|-----------|---------|
| <language> | <version> |
| <framework> | <version> |
| <test runner> | <version> |
| <package manager> | — |

## Workspace Structure

<tree or table of top-level directories and their purpose>

## Key Commands

```bash
<build>        # produce shippable artifacts
<test>         # run the full test suite
<lint>         # static analysis
<run-dev>      # local development
```

## Naming Conventions

<prefixes, file patterns, casing rules — one table>

## Import Rules

<how internal modules import each other; barrel / public-api conventions>

## Rules Hierarchy

See `.claude/rules/rules-hierarchy.md`. Summary:

| Tier | Rules |
|------|-------|
| 1 (Non-Negotiable) | prohibited, security, accessibility |
| 2 (Core Patterns)  | <framework>, <architecture> |
| 3 (Quality)        | style-guide, testing, documentation |

## Workflows

| Task | Invocation | Kind |
|------|------------|------|
| <example> | `/<name>` | command / skill |
```

### Template: `.claude/rules/rules-hierarchy.md`

```markdown
# Rule Hierarchy

**Scope:** Precedence order when rules conflict.

## Tier 1 — Non-Negotiable
Block merge on violation.
- [prohibited.md](prohibited.md)
- [security.md](security.md)
- [accessibility.md](accessibility.md)

## Tier 2 — Core Patterns
How code is written in this project.
- <list>

## Tier 3 — Quality
Consistency and readability.
- <list>

## Tier 4 — Operational
- [../../CLAUDE.md](../../CLAUDE.md)

## Conflict Resolution
- **Same-tier conflict:** STOP and ask the human.
- **Cross-tier conflict:** Higher tier wins; document the override.
- **No "best effort" resolutions.**
```

### Template: a rule file (e.g. `.claude/rules/<topic>.md`)

```markdown
# <Topic>

**Scope:** <one line describing what this rule governs>
**Tier:** <1 | 2 | 3>

## Core Requirements

| Requirement | Status |
|-------------|--------|
| <rule>      | MANDATORY / RECOMMENDED |

## Rules

### Forbidden

| Forbidden | Alternative |
|-----------|-------------|
| <pattern> | <replacement> |

### Required

<prose + examples>

## Checklist

- [ ] <check>
- [ ] <check>
```

### Template: `.claude/commands/<name>.md`

```markdown
---
name: <name>
description: <one-line description shown in command listings>
---

# /<name>

## Purpose
<why this command exists>

## Steps

### Step 1: <action>
<what Claude runs>

### Step 2: <action>
<what Claude runs>

## Output
<what Claude should report when done>
```

### Template: `.claude/skills/<name>.md`

```markdown
---
name: <name>
description: <one-line description — used by Claude to decide when to invoke>
---

# /<name>

## When to Use
<the recognizable situations this skill applies to>

## Approach
1. <step — possibly conditional>
2. <step>
3. <step>

## Guardrails
- <thing to avoid>
- <thing to always confirm>

## Done When
<definition of a successful outcome>
```

### Template: `.claude/agents/<name>.md`

```markdown
---
name: <name>
description: <one-line role description used when selecting this agent>
tools: Read, Grep, Glob, Bash   # scope the agent's toolbox; omit to inherit parent's
---

# <Name> Agent

**Role:** <one line>

## Responsibilities
1. <scope item>
2. <scope item>

## When to Invoke
- <trigger>
- <trigger>

## Rules This Agent Follows
- <link to rules/ files>

## Output Contract
<what the agent returns to the parent>
```

### Template: `.claude/settings.json` (permissions only)

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Write",
      "Edit",
      "Glob",
      "Grep",
      "Bash(git status:*)",
      "Bash(git diff:*)",
      "Bash(git log:*)",
      "Bash(git branch:*)",
      "Bash(git show:*)",
      "Bash(git add:*)",
      "Bash(git commit:*)",
      "Bash(ls:*)",
      "Bash(grep:*)",
      "Bash(find:*)",
      "Bash(cat:*)",
      "Bash(head:*)",
      "Bash(tail:*)",
      "Bash(mkdir:*)",
      "Bash(touch:*)",
      "Bash(<build-cmd>:*)",
      "Bash(<test-cmd>:*)",
      "Bash(<lint-cmd>:*)",
      "Bash(<package-manager>:*)"
    ],
    "deny": []
  }
}
```

Add destructive commands (`git push`, `rm`, `mv`, `reset --hard`) only if your team accepts the blast radius. When in doubt, omit.

### Template: `.claude/settings.json` with hooks

Extend the permissions file above with a `hooks` block:

```json
{
  "permissions": { "allow": ["..."], "deny": [] },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/post-edit.sh" }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/pre-bash.sh" }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [
          { "type": "command", "command": ".claude/hooks/session-start.sh" }
        ]
      }
    ]
  }
}
```

### Template: a hook script (`.claude/hooks/post-edit.sh`)

```bash
#!/usr/bin/env bash
# Runs after every Edit/Write. Receives event JSON on stdin.
# Keep this fast — it runs on every file edit.

set -euo pipefail

# Example: read the edited file path from the event payload
file_path=$(jq -r '.tool_input.file_path // empty')

if [[ -n "$file_path" ]]; then
  # Run your formatter / linter on the edited file, swallowing errors
  # so the hook never blocks the conversation.
  <formatter> "$file_path" >/dev/null 2>&1 || true
fi

exit 0
```

Make it executable:

```bash
chmod +x .claude/hooks/post-edit.sh
```

**Hook rules of thumb:**
- Exit 0 unless you genuinely want to block the action (exit non-zero to veto a `PreToolUse`).
- Never write to stdout unless you want Claude to see the output as system context.
- Put slow work behind an async trigger (e.g., `nohup … &`), not inline.

### Template: `.mcp.json` (shared MCP servers)

```json
{
  "mcpServers": {
    "<server-name>": {
      "command": "<executable>",
      "args": ["<arg1>", "<arg2>"],
      "env": {
        "<VAR>": "<value>"
      }
    }
  }
}
```

**Guidance:**
- Put **shared** MCP servers (ones the whole team needs) in `.mcp.json` at the repo root. Commit it.
- Put **personal** MCP servers (ones only you run) in `.claude/.mcp.local.json`. Gitignore it.
- Do not put secrets in either file — read them from your shell env instead: `"env": { "API_KEY": "${MY_API_KEY}" }`.
- Once Claude picks up a new server, the tools appear as `mcp__<server>__<tool>` in the tool list.

---

## Maintenance

- **Revisit every few months.** If a rule file hasn't been read or violated in a quarter, it may be dead weight — prune it.
- **Update after major dependency upgrades.** Framework version bumps usually change rule content.
- **Watch for drift between rules and reality.** If rules describe a stack the code has moved away from, Claude will follow the rules and produce wrong code. Fix the rules first.
- **Keep `CLAUDE.md` honest.** If a command in the workflows table no longer exists, remove it.
- **Audit hooks periodically.** A broken hook silently fails; a slow hook silently drags. Re-verify they still do what they claim.
- **Rotate MCP server credentials.** Stale env vars in `.mcp.json` are a quiet source of bugs.

---

## One-line summary

> A Claude setup tells the model **what the project is**, **what it must never do**, **what shortcuts exist**, **what to do automatically**, and **what external systems it can reach** — in that order. Everything else is optional.
