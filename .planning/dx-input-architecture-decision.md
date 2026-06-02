# dx-input — Architecture Decision Record

**Project:** ng-dijta Design System  
**Date:** 2026-05-28  
**Status:** Proposed  
**Author:** Design System Team

---

## Context

The existing library exposes **16+ individual input components** as public API:
`dx-input`, `dx-input-email`, `dx-input-phone`, `dx-input-dob`, `dx-currency`,
`dx-number`, `dx-textarea`, `dx-ip`, `dx-input-company`, `dx-input-url`,
`dx-input-icon`, `dx-input-label`, `dx-input-chips`, and more.

The goal is to redesign this into a single public component `<dx-input>` that
handles all input variants through a `variant` property, while ensuring zero
breaking changes to the **148 existing usages** across all consumer applications.

---

### What Consumers Actually Use Today

| Feature | Usage Frequency | Risk if Broken |
|---|---|---|
| `<dx-label>` content slot | Heavy | Critical |
| `<dx-error>` content slot | Heavy | Critical |
| `<dx-suffix>` content slot | Medium | High |
| `<dx-hint>` content slot | Medium | High |
| `[formControl]` / `formControlName` | All usages | Critical |
| `[disabled]`, `[required]` | Very common | High |
| `[mask]`, `[tooltip]`, `[precision]` | Common | Medium |
| `(blur)` output | Common | Medium |
| `type="number"` / `type="text"` | Rare | Low |

---

## Approaches Evaluated

Six architectural approaches were evaluated against the requirements.

---

## Full Approach Comparison Table

| Criteria | Status Quo | Facade + Delegate | Inline `ngSwitch` | `ng-template` + `ngTemplateOutlet` | `ViewContainerRef` | Directive `[dxInput]` |
|---|---|---|---|---|---|---|
| **Concept** | Multiple public components remain unchanged | `dx-input` routes to internal `dxi-xxx` child components | All variant templates written inline inside one `dx-input.html` | Templates declared as `<ng-template>` blocks, outlet stamps the active one | Component class creates the right component programmatically at runtime | A directive applied directly on the native element — no component shell |
| **Public API** | Many: `dx-input-email`, `dx-input-phone`… | One `<dx-input variant="…">` | One `<dx-input variant="…">` | One `<dx-input variant="…">` | One `<dx-input variant="…">` | `[dxInput]="'email'"` on native element — **no `<dx-input>` component** |
| **DOM wrapper layers** | 2 | 3 — `dx-input` → `dxi-renderer` → `mat-form-field` | **1** — `dx-input` → `mat-form-field` directly | **1** — `dx-input` → `mat-form-field` directly | 2–3 depending on created component | **0** — directive on native element |
| **Wrapper on wrapper** | No | **Yes** | No | No | Possibly | No |
| **`<dx-label>` / `<dx-suffix>` / `<dx-error>` content slots safe** | Yes — unchanged | **Breaks** — slots cannot be forwarded into child components | **Safe** — slots stay in the same component template | **Safe** — slots stay in the same component template | **Breaks** — created component has its own isolated template | Not applicable — no component shell exists |
| **Existing `<dx-input>` bindings safe** | Yes — zero change | Partial — CVA preserved but outputs need re-wiring | **Yes** — same class, same `@Input`s, same `@Output`s | **Yes** — same class, same `@Input`s, same `@Output`s | Partial — needs re-wiring per created component | No — completely different API shape |
| **Impact on 148 existing usages** | None | Medium — content slots break, outputs need rewire | **None — fully backward compatible** | **None — fully backward compatible** | Medium — content slots break | **Full rewrite of all 148 usages** |
| **Angular 14 compatible** | Yes | Yes | Yes | Yes | Yes | Yes |
| **Single public component** | No | Yes | Yes | Yes | Yes | No — directive is not a component |
| **New variant addition effort** | High — new component per variant | Medium — new renderer component + wire into switch | Low — add one `*ngSwitchCase` block in HTML | **Low** — add one `<ng-template>` block in HTML | Medium — new component class + registration in map | Medium — new branch inside directive |
| **Template file size** | Small per component | Small per renderer | Large single HTML file | Large but organised by named `#ref` blocks | Minimal template, logic in TS | Minimal |
| **TypeScript class size** | Small per component | Medium facade + renderer map | Medium — one class handles all variants | Medium — adds `@ViewChild` per template | **Large** — component map, dynamic create, instance wiring | Medium |
| **Code organisation** | Spread across many component folders | Spread across many renderer folders | One large HTML file, one TS class | One large HTML file with clearly named template sections | Spread across files, dynamic wiring in TS | One directive file |
| **Type safety of `[config]`** | N/A — per-component typed inputs | Per-variant typed renderer inputs | Typed union on `dx-input` class | Typed union on `dx-input` class | Partial — type lost on dynamic instance | Typed union on directive |
| **CVA (form binding) complexity** | Per component, fully isolated | Medium — facade CVA bridges to child instances | **Low** — single CVA, one `internalControl` | **Low** — single CVA, one `internalControl` | Medium — CVA on facade, must bridge to created instance | Low — directive patches host element CVA |
| **Validation wiring** | Per component, duplicated logic | Per renderer component, still duplicated | **Centralised** — one validator registry in the class | **Centralised** — one validator registry in the class | Centralised but harder to apply to dynamically created instance | Centralised in directive |
| **WCAG / ARIA consistency** | Inconsistent across components | Inconsistent — each renderer may differ | **Consistent** — one class applies ARIA rules systematically | **Consistent** — one class applies ARIA rules systematically | Inconsistent — depends on each created component | Can be consistent but requires discipline |
| **Bundle size** | All components bundled regardless | Larger — all renderer components added on top | **Same or smaller** — no extra component classes | Same as inline `ngSwitch` | Potentially smaller (lazy create) but marginal gain | Smallest — zero component overhead |
| **Testability** | Easy — fully isolated per component | Medium — must test facade and each renderer | Medium — test one component with `variant` as input | **Medium** — test one component with `variant` as input | Hard — dynamic creation is difficult to unit test | Easy — test directive behaviour in isolation |
| **Library consumer migration effort** | None | Medium — change selectors, fix broken content slots | **Minimal** — only add `variant=` when adopting new types | **Minimal** — only add `variant=` when adopting new types | Medium — content slots break, selectors change | **Full rewrite** of every usage |
| **Library author migration effort** | None | Medium — create renderer per variant, wire facade | Medium — consolidate all logic into one component | **Medium** — same as inline, named templates aid organisation | High — dynamic component map, instance wiring, change detection | High — rethink public API entirely |
| **Scales to 40+ variants** | Poor | Poor — file explosion | Fair — template grows but manageable | **Good** — named template sections scale cleanly | Fair | Fair |
| **Recommended** | No — does not meet the goal | **No** — wrapper on wrapper, content slots break | Yes | **Yes — preferred** | No | No — breaks public API |

---

## The Two Valid Options: Side-by-Side

| | **Inline `ngSwitch`** | **`ng-template` + `ngTemplateOutlet`** ✓ |
|---|---|---|
| **How it works** | `*ngSwitchCase` blocks write the markup directly | `<ng-template #emailTpl>` blocks; `*ngTemplateOutlet="active"` stamps the right one |
| **DOM result** | Identical — no extra wrapper | Identical — no extra wrapper |
| **Template navigation** | Harder — must scroll through one long switch block | Easier — jump to named `#ref` directly in IDE |
| **Dynamic switching at runtime** | Works immediately on change | Needs `ngAfterViewInit` before `@ViewChild` refs resolve; requires `detectChanges()` |
| **Variant isolation** | Low — all cases in one switch block | **High** — each template is a named, self-contained block |
| **IDE / editor support** | Standard | Standard |
| **Implementation complexity** | Lower | Slightly higher — `@ViewChild` map per template |
| **Best for** | Up to ~10 variants | **10+ variants** — this system has 40 |

---

## Eliminated Approaches: Reasons

| Approach | Why Eliminated |
|---|---|
| **Status Quo** | Does not meet the goal — 16+ public components, inconsistent API |
| **Facade + Delegate** | Wrapper on wrapper; `<dx-label>`, `<dx-suffix>`, `<dx-error>` content slots break across 148 usages |
| **`ViewContainerRef.createComponent`** | Same content projection breakage; dynamic wiring is complex and harder to test |
| **Directive `[dxInput]`** | Breaks the `<dx-input>` public API entirely; all 148 usages require full rewrite |

---

## Final Recommendation

### `ng-template` + `ngTemplateOutlet`

```
<dx-input variant="email" [formControl]="emailCtrl">
  <dx-label>Email Address</dx-label>
  <dx-error>Enter a valid email</dx-error>
</dx-input>
```

**Internally:**

```
dx-input (one component, one CVA, one class)
  │
  ├── @ViewChild('emailTpl')  → <ng-template #emailTpl> ... </ng-template>
  ├── @ViewChild('phoneTpl')  → <ng-template #phoneTpl> ... </ng-template>
  ├── @ViewChild('dateTpl')   → <ng-template #dateTpl>  ... </ng-template>
  │   ... (one block per variant)
  │
  └── *ngTemplateOutlet="activeTemplate"
        ↓
        stamps the matching <ng-template> in place
        inside mat-form-field
        no child component, no extra DOM layer
```

### Why This Wins

| Requirement | Met |
|---|---|
| Zero impact on 148 existing usages | ✓ |
| `<dx-label>`, `<dx-suffix>`, `<dx-error>`, `<dx-hint>` content slots preserved | ✓ |
| No wrapper on wrapper | ✓ |
| Single public `<dx-input>` component | ✓ |
| Scales cleanly to 40 variants | ✓ |
| Single CVA, single validator registry, single ARIA strategy | ✓ |
| Angular 14 compatible — no upgrade required | ✓ |
| Minimal consumer migration — add `variant=` only when adopting new types | ✓ |
| Old components (`dx-input-email`, etc.) deprecated gracefully, not deleted | ✓ |

---

## Migration Strategy

### Phase 1 — Foundation (no consumer impact)
Build the new `dx-input` with `ng-template` architecture. Old components remain
untouched and continue to work. New variants (`variant="email"`, `variant="phone"`
etc.) become available as additive features.

### Phase 2 — Soft deprecation
Mark old components (`dx-input-email`, `dx-input-phone`, etc.) as `@deprecated`
in JSDoc. They still compile and work. Teams are notified but nothing breaks.

### Phase 3 — Consumer migration (own pace)
Teams migrate their usages from `<dx-input-email>` to `<dx-input variant="email">`
at their own pace. The old selector continues to function until the next major version.

### Phase 4 — Major version removal
Old component selectors are removed in the next major version bump. By this point
all consumers have had time to migrate.

---

## Old to New Selector Map

> **Legend**
> - **Migrate** — existing component exists, replace the selector
> - **New** — no existing component, built from scratch as a new variant

| Old | New | Status |
|---|---|---|
| `<dx-input type="text">` | `<dx-input variant="text">` | Migrate |
| `<dx-input type="number">` | `<dx-input variant="number">` | Migrate |
| `<dx-input [isCurrency]="true">` | `<dx-input variant="currency" [config]="{code:'INR'}">` | Migrate |
| `<dx-input-email>` | `<dx-input variant="email">` | Migrate |
| `<dx-input-phone>` | `<dx-input variant="phone" [config]="{country:'IN'}">` | Migrate |
| `<dx-input-dob>` | `<dx-input variant="dob" [config]="{minAge:18}">` | Migrate |
| `<dx-input-url>` | `<dx-input variant="url">` | Migrate |
| `<dx-input-company>` | `<dx-input variant="company">` | Migrate |
| `<dx-input-label>` | `<dx-input variant="label">` | Migrate |
| `<dx-input-name>` | `<dx-input variant="name">` | Migrate |
| `<dx-number>` | `<dx-input variant="number">` | Migrate |
| `<dx-textarea>` | `<dx-input variant="textarea">` | Migrate |
| `<dx-input-chips>` | `<dx-input variant="chips">` | Migrate |
| `<dx-ip>` | `<dx-input variant="ip" [config]="{type:'ipv4'}">` | Migrate |
| `<dx-input-icon>` | `<dx-input variant="icon">` | Migrate |
| `<dx-datetime-picker>` | `<dx-input variant="datetime">` | Migrate |
| `<dx-time-picker-input>` | `<dx-input variant="time">` | Migrate |
| `<dx-checkbox>` | `<dx-input variant="checkbox">` | Migrate |
| `<dx-radio-button>` | `<dx-input variant="radio">` | Migrate |
| `<dx-toggle>` | `<dx-input variant="toggle">` | Migrate |
| `<dx-tag-input>` | `<dx-input variant="tag">` | Migrate |
| `<dx-colors>` | `<dx-input variant="color">` | Migrate |
| `<file-upload>` | `<dx-input variant="file" [config]="{multiple:false}">` | Migrate |
| `<dx-image-input>` | `<dx-input variant="image" [config]="{uploadType:'single'}">` | Migrate |
| `<dx-coordinates>` | `<dx-input variant="coordinates">` | Migrate |
| `<dx-latlong-input>` | `<dx-input variant="latlong">` | Migrate |
| `<dx-datepicker>` | `<dx-input variant="date">` | Migrate |
| `<dx-daterange>` | `<dx-input variant="daterange">` | Migrate |
| `<dx-select>` | `<dx-input variant="select" [config]="{options:[]}">` | Migrate |
| `<dx-autocomplete-select>` | `<dx-input variant="autocomplete" [config]="{options:[]}">` | Migrate |
| `<dx-lookup>` | `<dx-input variant="lookup">` | Migrate |
| `<dx-multi-lookup>` | `<dx-input variant="multi-lookup">` | Migrate |
| — | `<dx-input variant="password">` | New |
| — | `<dx-input variant="search">` | New |
| — | `<dx-input variant="percentage" [config]="{min:0,max:100,decimal:2}">` | New |
| — | `<dx-input variant="otp" [config]="{length:6}">` | New |
| `input[mask]` directive + `[mask]` prop on `dx-input` | `<dx-input variant="mask" [config]="{mask:'000-000'}">` | Migrate |
| — | `<dx-input variant="range" [config]="{min:0,max:100,step:1}">` | New |
| — | `<dx-input variant="rating" [config]="{max:5,icon:'star'}">` | New |
| — | `<dx-input variant="stepper" [config]="{min:0,max:100,step:1}">` | New |
| `<dx-tree>` / `<dx-tree-v2>` (display only, not a form input) | `<dx-input variant="tree-select" [config]="{nodes:[],multiple:false}">` | New |
| — | `<dx-input variant="address" [config]="{fields:['street','city','state','zip']}">` | New |
| — | `<dx-input variant="card" [config]="{showExpiry:true,showCvv:true}">` | New |
| — | `<dx-input variant="editor" [config]="{toolbar:true,height:300}">` | New |

---

## Component Removal Strategy

### Will we remove all other components and keep only `dx-input`?

**No — not all at once, and not all of them.**

Three different outcomes apply depending on what the component actually is.

---

### Category 1 — Remove After Migration

These are pure input wrappers with **zero or near-zero consumer usage**.
Once the corresponding `dx-input` variant is live and the handful of existing
usages are migrated, these components are deleted from the public API entirely.

| Component | Consumer Usages | Action |
|---|---|---|
| `dx-input-email` | 1 | Migrate 1 usage → remove |
| `dx-input-phone` | 1 | Migrate 1 usage → remove |
| `dx-textarea` | 3 | Migrate 3 usages → remove |
| `dx-input-dob` | 0 | Remove directly |
| `dx-input-url` | 0 | Remove directly |
| `dx-input-name` | 0 | Remove directly |
| `dx-input-company` | 0 | Remove directly |
| `dx-input-label` | 0 | Remove directly |
| `dx-input-chips` | 0 | Remove directly |
| `dx-currency` | 0 | Remove directly |
| `dx-number` | 0 | Remove directly |
| `dx-ip` | 0 | Remove directly |
| `dx-coordinates` | 0 | Remove directly |
| `dx-colors` | 0 | Remove directly |
| `dx-tag-input` | 0 | Remove directly |
| `dx-time-picker-input` | 0 | Remove directly |
| `dx-daterange` | 0 consumer | Remove from public API |
| `dx-datetime-picker` | 0 consumer | Remove from public API |
| `dx-lookup` | 0 consumer | Remove from public API |
| `dx-multi-lookup` | 0 consumer | Remove from public API |

---

### Category 2 — Cannot Remove Immediately

These have **significant active usages** in consumer apps right now.
They must stay as deprecated public API during the transition period.
Removing them before all consumer apps migrate will break their builds.

| Component | Consumer Usages | Library Internal | Migration Effort |
|---|---|---|---|
| `dx-checkbox` | **27** | 2 | High |
| `dx-autocomplete-select` | **21** | 5 | High |
| `dx-select` | **18** | 6 | High |
| `dx-datepicker` | **16** | 2 | High |
| `dx-radio-button` | 4 | 2 | Medium |
| `dx-toggle` | 1 | 1 | Low |

These are marked `@deprecated` on day one but remain fully functional.
Consumer teams migrate at their own pace. Removal happens only in the next
major version bump after confirmed zero usages across all apps.

---

### Category 3 — Never Remove

These components serve a **non-input purpose** and must remain as independent
public components permanently. They are not absorbed into `dx-input`.

| Component | Why it stays |
|---|---|
| `dx-card` | Layout and display card — unrelated to form input. `variant="card"` in `dx-input` means *credit card number input*, not this component |
| `dx-tree` / `dx-tree-v2` | Tree display component. `variant="tree-select"` uses it internally as a renderer, but `dx-tree` stays public for standalone tree rendering use cases |

---

### Codebase State: Before vs After Full Migration

```
Before                           After
──────────────────────           ──────────────────────────────
dx-input                         dx-input  ← only public input component
dx-input-email                   (removed)
dx-input-phone                   (removed)
dx-input-dob                     (removed)
dx-input-url                     (removed)
dx-input-name                    (removed)
dx-input-company                 (removed)
dx-input-label                   (removed)
dx-input-chips                   (removed)
dx-currency                      (removed)
dx-number                        (removed)
dx-textarea                      (removed)
dx-ip                            (removed)
dx-coordinates                   (removed)
dx-colors                        (removed)
dx-tag-input                     (removed)
dx-time-picker-input             (removed)
dx-daterange                     (removed from public API)
dx-datetime-picker               (removed from public API)
dx-lookup                        (removed from public API)
dx-multi-lookup                  (removed from public API)
dx-checkbox                      deprecated → removed after migration
dx-select                        deprecated → removed after migration
dx-autocomplete-select           deprecated → removed after migration
dx-datepicker                    deprecated → removed after migration
dx-radio-button                  deprecated → removed after migration
dx-toggle                        deprecated → removed after migration
dx-card                          stays — layout component, not an input
dx-tree / dx-tree-v2             stays — display component, not an input
```

---

### Removal Sequence

```
Step 1 — Ship dx-input with all variants
         New system is live. Old components still work untouched.

Step 2 — Mark old components @deprecated
         Warning appears in IDE on every usage. Nothing breaks.

Step 3 — Consumer teams migrate at their own pace
         Typically 1–2 sprints per team depending on usage count.

Step 4 — Verify zero usages across all apps
         grep / nx affected confirms no remaining references.

Step 5 — Remove old components in next major version
         Clean codebase. Public API is dx-input only.
```

---

*This document covers the architecture decision for the dx-input unified component system.*  
*Implementation guide: see `dx-input-implementation.md`*
