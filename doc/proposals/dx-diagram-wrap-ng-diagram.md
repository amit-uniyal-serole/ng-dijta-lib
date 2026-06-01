# dx-diagram — Wrap `ng-diagram` (Proposal)

**Status:** Proposed — not implemented
**Driver:** 2+ downstream apps need interactive diagram / flowchart UI (nodes, edges, drag/drop).
**Source library:** [`ng-diagram`](https://github.com/synergycodes/ng-diagram) by Synergy Codes — Apache-2.0, 522 stars, last push 2026-05-19.

---

## TL;DR

1. Add a thin `dx-diagram` wrapper in `ng-dijta` around `ng-diagram`'s `NgDiagramComponent`. Ship as a regular `dx-*` NgModule with external `templateUrl` / `styleUrls`, re-exported from `public-api.ts`.
2. Take `ng-diagram` as a **`peerDependency`** (not a direct dependency) so consumers pin the version and don't pay for it unless they import `dx-diagram`.
3. Bridge `ng-diagram`'s CSS-variable theming to `--dx-*` design tokens via a dedicated theme partial. Route every ARIA label through Transloco under the `dx.diagram.*` namespace.
4. Two pre-commit verifications before merging: an a11y spike against WCAG AA, and a bundle-size measurement on the consuming apps.

---

## Motivation

- **Concrete need.** Two or more downstream apps already require diagramming UI. Without a shared wrapper, each app will install `ng-diagram` independently and re-invent the theme bridge, the Transloco wiring, and the accessibility hardening.
- **Material-first rule passes.** Angular Material has nothing in this category (no node-graph / flowchart primitive). CDK `DragDropModule` is too low-level — using it would mean reimplementing ports, edge routing, viewport pan/zoom, palette, and optional ELK layout. This is one of the legitimate cases for a non-Material wrapper.
- **Library-grade behaviour belongs in the library.** Theme mapping, i18n routing, ARIA defaults, and OnPush change detection are exactly the kind of cross-cutting hardening that justifies a `dx-*` component over per-app integration.

---

## `ng-diagram` assessment

| Dimension | Result |
|-----------|--------|
| License | Apache-2.0 — compatible with the library's distribution model |
| Maintenance | Pushed 2026-05-19, 522 stars, backed by Synergy Codes (diagramming specialists) |
| Architecture | Angular-first, standalone components, signal-based; consumed via `provideNgDiagram()` |
| Theming | Ships its own CSS variables + a global `ng-diagram/styles.css` import |
| Maturity | Repo created 2025-04-14 — ~13 months old; API may still evolve before 1.0 |
| Bundle | Non-trivial (drag/drop + viewport + routing + optional palette / ELK) |

**Architectural friction vs `ng-dijta`.** `ng-diagram` is standalone-only; `ng-dijta` is NgModule-dominant. This is **not blocking** — an NgModule can `imports: [NgDiagramComponent]` and re-export it. No source changes to `ng-diagram` are needed.

---

## Proposed shape

### Component

```
projects/ng-dijta/src/lib/components/dx-diagram/
├── dx-diagram.component.ts
├── dx-diagram.component.html
├── dx-diagram.component.scss
├── dx-diagram.component.spec.ts
├── dx-diagram.module.ts
└── index.ts
```

Standard ng-dijta layout: external `templateUrl` / `styleUrls`, NgModule that declares + exports the component, `ChangeDetectionStrategy.OnPush`, JSDoc on the class and every public input/output, re-export through [public-api.ts](../../projects/ng-dijta/src/public-api.ts).

### Packaging

- `ng-diagram` declared in **`peerDependencies`** of [`projects/ng-dijta/package.json`](../../projects/ng-dijta/package.json). Not a direct dependency. Consumers pin their own version.
- The wrapper module calls `provideNgDiagram()` internally so consumers don't have to wire it up at the app level (or exposes a `provideDxDiagram()` helper if root-providers are needed).
- Re-export the narrow set of `ng-diagram` primitives that consumers commonly extend (`NgDiagramPortComponent`, `NgDiagramBaseEdgeComponent`, `NgDiagramNodeTemplate`, `NgDiagramEdgeTemplate`) from `@ngdx/dijta` so consumers don't pull in two packages from two import roots.

### Theme bridge

New partial: `projects/ng-dijta/src/lib/theme/dx-diagram/_theme.scss`. Maps `ng-diagram`'s own CSS variables to existing `--dx-*` tokens where possible; declares the diagram-scoped tokens listed below where there is no equivalent.

```
--dx-diagram-surface           → --dx-surface
--dx-diagram-grid              → --dx-outline (low-emphasis variant)
--dx-diagram-node-bg           → --dx-surface-card
--dx-diagram-node-border       → --dx-outline
--dx-diagram-node-selected     → --dx-primary
--dx-diagram-edge              → --dx-on-surface-variant
--dx-diagram-edge-selected     → --dx-primary
```

All scheme-agnostic — no `light` / `dark` / state words in token names ([theming.md Guardrail 3](../../.claude/rules/theming.md)). New tokens declared in [`projects/ng-dijta/src/lib/theme/tokens/`](../../projects/ng-dijta/src/lib/theme/tokens/) with hardcoded fallbacks.

### i18n bridge

Every ARIA label routed through Transloco. Keys:

```
dx.diagram.ariaLabel
dx.diagram.palette.ariaLabel
dx.diagram.controls.zoomIn
dx.diagram.controls.zoomOut
dx.diagram.controls.fitToView
dx.diagram.controls.resetView
dx.diagram.minimap.ariaLabel
```

The library declares the keys it *uses*; consumer apps own the dictionaries ([i18n.md](../../.claude/rules/i18n.md)).

---

## Draft API

**Selector:** `dx-diagram`

### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `model` | `NgDiagramModel` | — (required) | Diagram model created via `initializeModel(...)`. |
| `readonly` | `boolean` | `false` | Disables editing (dragging, connecting, palette). |
| `paletteItems` | `DxPaletteItem[]` | `[]` | Optional palette items rendered in the side drawer. |
| `showMinimap` | `boolean` | `false` | Renders the minimap overlay. |
| `fitOnInit` | `boolean` | `true` | Auto-fits content on first render. |
| `ariaLabelKey` | `string` | `'dx.diagram.ariaLabel'` | Transloco key for the root `aria-label`. |

### Outputs

| Output | Type | Description |
|--------|------|-------------|
| `modelChange` | `NgDiagramModel` | Emitted when the model mutates (selection, position, edges). |
| `nodeSelected` | `Node \| null` | Emitted on selection change. |
| `edgeCreated` | `Edge` | Emitted when a user draws a new edge. |

Custom node / edge templates are projected via `<ng-content>` slots — matching `ng-diagram`'s own pattern rather than introducing a config object.

---

## Accessibility plan

- Root role: `application` (the `ng-diagram` default). Reviewed against WCAG AA in the a11y spike.
- Keyboard:
  - Arrow keys — nudge selected node
  - `Delete` — remove selection
  - `Ctrl/Cmd+A` — select all
  - `Ctrl/Cmd+Z` / `Ctrl/Cmd+Y` — undo / redo
  - `Tab` — move focus between focusable elements (nodes, palette items, controls)
  - The spike audits which of these `ng-diagram` ships by default and which the wrapper must layer.
- ARIA: all labels via Transloco. No hardcoded strings. No overrides of Material/CDK ARIA where they're in play.
- `prefers-reduced-motion`: confirm `ng-diagram` honours it for pan/zoom transitions. If not, gate transitions in the wrapper SCSS ([accessibility.md](../../.claude/rules/accessibility.md)).
- Focus indicator: must meet the 3:1 contrast ratio against the diagram surface. Override via theme tokens if `ng-diagram`'s default falls short.

---

## Pre-commit verifications

Both are small spikes, not full epics. Either failing flips the recommendation to "document only — let consumers install `ng-diagram` directly."

1. **A11y spike** — keyboard model, focus management, ARIA coverage against WCAG AA. Document gaps and whether the wrapper closes them or upstream issues need to be filed against `ng-diagram`.
2. **Bundle-size measurement** — measure the addition (`ng-diagram` + drag/drop + viewport + optional ELK) against the consuming apps' current budget. Confirm it's acceptable to the affected app teams before merging.

---

## Open questions

- Which `ng-diagram` version do we pin in `peerDependencies` — latest, or wait for a 1.0?
- Do consumers need the **palette** out of the box, or is that opt-in via `paletteItems`?
- Does `ng-diagram`'s keyboard model satisfy WCAG AA, or does the wrapper layer additional handlers? (Answered by the a11y spike.)
- Bundle-size budget — is the addition acceptable in the apps consuming this? (Answered by the bundle-size measurement.)
- Does `ng-diagram` emit hardcoded English strings anywhere not coverable by inputs? If so, raise upstream or shim in the wrapper.

---

## Non-goals (this proposal)

- A custom diagram engine — we're wrapping, not building.
- ELK layout as a hard dependency — keep it opt-in.
- Importing `ng-diagram` symbols deeply through `@ngdx/dijta/lib/...` — re-exports go through `public-api.ts` like any other public symbol.
- Migrating consumer apps that already use `ng-diagram` directly — that's a follow-up after the wrapper ships.

---

## Recommendation

**Proceed** — as a thin `dx-diagram` wrapper with `ng-diagram` pinned as a `peerDependency`, gated on the two pre-commit verifications above. The wrapper is small (one component, one theme partial, one i18n namespace), Material-first is satisfied (Material has nothing here), and the standalone-vs-NgModule mismatch is a non-issue because an NgModule can re-export a standalone component. If the a11y spike or bundle-size measurement fails, fall back to "document only — consumers install `ng-diagram` directly."

Next step when ready: `/plan-epic` to scope the wrapper, theme bridge, peer-dep wiring, and the two spikes.
