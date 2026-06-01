# Story Authoring Guide

Convention for `*.stories.ts` files in `@ngdx/dijta`.

## File location

Co-locate next to the component:

```
projects/ng-dijta/src/lib/components/dx-button/
├── dx-button.component.ts
├── dx-button.module.ts
├── dx-button.component.spec.ts
├── dx-button.stories.ts        ← this file
└── index.ts
```

## Required story matrix per component

Every public `dx-*` component MUST have:

| Story name      | Purpose                                                                 |
|-----------------|-------------------------------------------------------------------------|
| `Default`       | Minimal usage with sensible defaults.                                   |
| `AllVariants`   | Side-by-side matrix of every enum-like input (severity/type/colour).    |
| `AllSizes`      | Side-by-side matrix of every size value (if the component has `size`).  |
| `States`        | Disabled / readonly / loading / error / empty as applicable.            |
| `WithContent`   | Realistic content-projection demo if the component uses `<ng-content>`. |

Skip a story only if the variant doesn't apply (e.g., no `size` input → no `AllSizes`).

## Categorisation (`title:` prefix)

| Title prefix       | Used for                                  |
|--------------------|-------------------------------------------|
| `Form Inputs/…`    | Inputs, selects, checkbox, radio, date    |
| `Buttons/…`        | Buttons and button-likes                  |
| `Data Display/…`   | Tables, lists, cards, tags, charts        |
| `Overlays/…`       | Modals, drawers, popovers, tooltips       |
| `Layout/…`         | Layout wrappers, grids, headers, footers  |
| `Feedback/…`       | Alerts, snackbars, spinners, progress     |
| `Navigation/…`     | Menus, breadcrumbs, tabs, steppers        |
| `Utilities/…`      | Lower-level building blocks               |

## ArgTypes

Document **every** `@Input()` with at minimum:

```ts
argTypes: {
  size: {
    control: { type: 'inline-radio' },
    options: ['small', '', 'big'],
    description: 'Visual size of the button.',
    table: { defaultValue: { summary: '' } },
  },
}
```

The `description` is what fills the gap left by missing JSDoc on the component.
Storybook surfaces this in the Docs tab and the Controls panel.

## Outputs

Outputs are auto-wired to the Actions panel by Storybook's essentials addon —
nothing extra needed. Optionally add a description in `argTypes`.

## Template stories

For components that take a `TemplateRef` or use content projection, use the
`render` function with a literal template instead of `args`:

```ts
export const WithContent: Story = {
  render: () => ({
    template: `
      <dx-card>
        <h3>Card title</h3>
        <p>Body copy goes here.</p>
      </dx-card>
    `,
  }),
};
```

## Module imports

Every story file imports the component's own `NgModule` via `moduleMetadata`
(or the `withModule()` helper). Do **not** declare the component yourself.

```ts
import { withModule } from '../../stories/_story-helpers';
import { DxButtonModule } from './dx-button.module';

decorators: [withModule(DxButtonModule)],
```

## Accessibility gate

Before merging a story, open the **Accessibility** panel in Storybook and
confirm there are **zero critical violations**. Most violations originate in
the demo template, not the component — fix the template (e.g., add
`aria-label`).

## Theme parity

Toggle the theme switcher in the toolbar (light / dark). Both must render.

## Baseline-generated stories — known limits

Stories produced by `scripts/generate-stories.mjs` ship a sensible
`Default` story for every dx-* component but are NOT pixel-perfect demos.
The current smoke-test pass rate is **193 / 281 stories (69%)**. The 88
failures cluster as follows; each needs hand-tuning per the matrix above:

| Cause | Approx | How to fix per story |
|---|---|---|
| Component reads a specific field on a required object input (`card.id`, `data.htmlView`, `option.decimalSeparator`, etc.) — the generator's `{} as any` placeholder isn't shaped right | ~35 | Author concrete `args: { card: { id: 'k1', title: '...' } }` matching the component's expected interface |
| Required service-shaped input (config object, data source) accessed in `ngOnInit` | ~15 | Author concrete `args` with the minimum shape the component needs |
| `NG0304: 'X' is not a known element` — the generator's owning-module pick is wrong (e.g. component declared in a higher-level barrel module that doesn't re-export it) | ~15 | Replace the `imports: [SomeModule]` in `moduleMetadata` with the real module that re-exports the component |
| `MatSelect` / `MatDialog` / `MatFormField` injector errors inside an auto-wrapped CVA form | ~10 | Remove the auto-emitted `<form [formControl]>` wrap and provide the missing parent module/service in `moduleMetadata.imports` |
| Other one-offs (NG0303 alias mismatch, BrowserModule double-import, etc.) | ~12 | Read the error in the Storybook canvas → fix the specific story |

**Quick way to find which stories need work:**
```bash
node scripts/smoke-test-stories.mjs    # against running Storybook
```
Outputs the per-story failure list. Start with the components your team
uses most.

**Regenerating one component's story from scratch:**
```bash
rm projects/ng-dijta/src/lib/components/<comp>/<comp>.stories.ts
node scripts/generate-stories.mjs
```
The generator skips existing stories, so the rest of the suite is
preserved.

### Important — restart Storybook after bulk regeneration

Angular's TypeScript compiler (the one driving `practice:build`) reads
its file list at process startup and doesn't pick up *newly created*
story files on its own. If you regenerate dozens of stories at once and
see `Couldn't find story matching id '...--docs'` or `HTTP 500` on
`/index.json`, the cause is the stale file list. Fix:

```bash
# Ctrl-C the running storybook, then:
npm run storybook
```

Editing an existing story file is fine — only **new** files require
the restart.

## Shared mock data — `_mock-data.ts`

A library of typed fixtures lives in [_mock-data.ts](_mock-data.ts) for use
when hand-tuning stories. Use them directly:

```ts
import { mockRows, mockColumns, mockKanbanCards } from '../../stories/_mock-data';

export const WithData: Story = {
  args: { columns: mockColumns, data: mockRows },
};
```

Available fixtures (see the file for full schemas):

| Domain | Fixtures |
|---|---|
| People | `mockUser`, `mockUsers` |
| Selection | `mockOption`, `mockOptions`, `mockBooleanOptions` |
| Tables | `mockColumn`, `mockColumns`, `mockRow`, `mockRows` |
| Navigation | `mockMenuItem`, `mockMenuItems`, `mockBreadcrumb`, `mockBreadcrumbs` |
| Kanban | `mockKanbanCard`, `mockKanbanCards` |
| Display | `mockTag`, `mockTags`, `mockChartData`, `mockTimelineEvents` |
| Files | `mockFile`, `mockFiles` |
| Notifications | `mockNotifications` |
| Form values | `mockDate`, `mockDateRange`, `mockCoordinates`, `mockCurrency`, `mockAddress` |
| Text | `mockText.short` / `.medium` / `.long` |
| Fallback | `mockGeneric` — bag of common fields (`id`, `label`, `htmlView`, `decimalSeparator`, `permission`) for components that read several typical fields |

When you add a fixture, give it a typed `interface` and re-use it across
related stories so refactors stay manageable.

> **Note:** the generator does NOT auto-import these (an earlier attempt to
> auto-match by input name caused net regressions when the matched fixture
> shape didn't fit the consumer). Import them explicitly when you tune a
> story.

## See also

- [Storybook 8 Angular docs](https://storybook.js.org/docs/get-started/install)
- [Existing pilot stories](../components/dx-alert-message/dx-alert-message.stories.ts)
- Shared helpers: [_story-helpers.ts](_story-helpers.ts)
- Shared fixtures: [_mock-data.ts](_mock-data.ts)
