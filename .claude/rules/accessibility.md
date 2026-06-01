# Accessibility Rules

**Scope:** WCAG AA compliance, ARIA implementation, and keyboard navigation for ng-dijta.

---

## Core Requirements

| Requirement | Standard |
|-------------|----------|
| Meet WCAG AA minimums | **MANDATORY** |
| Support keyboard navigation | **MANDATORY** |
| Implement focus management | **MANDATORY** |
| All ARIA labels translatable | **MANDATORY** |
| Respect `prefers-reduced-motion` | **MANDATORY** |

---

## ARIA Attributes

Use Angular's attribute binding for dynamic ARIA values:

```typescript
@Component({
  host: {
    // Static ARIA attributes
    'role': 'button',
    'aria-haspopup': 'true',

    // Dynamic ARIA attributes (use [attr.] prefix)
    '[attr.aria-expanded]': 'expanded()',
    '[attr.aria-disabled]': 'disabled()',
    '[attr.aria-label]': 'label()',
    '[attr.aria-describedby]': 'descriptionId()',
    '[attr.aria-controls]': 'controlledElementId()',
  },
})
```

---

## Component ARIA Patterns

### Button

```typescript
host: {
  'role': 'button',
  '[attr.tabindex]': 'disabled() ? -1 : 0',
  '[attr.aria-disabled]': 'disabled()',
  '[attr.aria-pressed]': 'pressed()',  // for toggle buttons
  '(keydown.enter)': 'onClick($event)',
  '(keydown.space)': 'onClick($event)',
}
```

### Dialog / Modal

`MatDialog` handles ARIA automatically (role, aria-modal, focus trap). When wrapping or building a custom dialog:

```typescript
host: {
  'role': 'dialog',
  'aria-modal': 'true',
  '[attr.aria-labelledby]': 'titleId',
  '[attr.aria-describedby]': 'descriptionId',
}
```

### Navigation

```typescript
host: {
  'role': 'navigation',
  '[attr.aria-label]': 'navLabel()',
}
```

---

## ARIA Live Regions

For dynamic content announcements:

```html
<!-- Polite - Status updates, non-urgent -->
<div aria-live="polite" aria-atomic="true">
  {{ statusMessage() }}
</div>

<!-- Assertive - Errors, urgent notifications -->
<div aria-live="assertive" role="alert">
  {{ errorMessage() }}
</div>
```

---

## Keyboard Navigation

### Required Keys by Component

| Component | Required Keys |
|-----------|---------------|
| Button | `Enter`, `Space` |
| Checkbox | `Space` |
| Select/Dropdown | `Enter`, `Space`, `Arrow Up/Down`, `Escape` |
| Menu | `Arrow Up/Down`, `Enter`, `Escape` |
| Modal | `Escape` to close, `Tab` trapped |
| Tabs | `Arrow Left/Right`, `Home`, `End` |

> **Angular Material components handle keyboard navigation automatically.** Only implement keyboard handling for custom (non-Material) components.

### Implementation Pattern (Custom Components Only)

```typescript
@Component({
  host: {
    '(keydown)': 'handleKeydown($event)',
  },
})
export class CustomSelectComponent {
  protected handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggleOpen();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextOption();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousOption();
        break;
      case 'Escape':
        this.close();
        break;
    }
  }
}
```

---

## Focus Management

### General Rules

- Components receive focus via `tabindex="0"`
- Disabled state removes from tab order (`tabindex="-1"`)
- Focus indicator must be visible (2px solid outline minimum)

### After Route Navigation

```typescript
private readonly router = inject(Router);

constructor() {
  this.router.events
    .pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntilDestroyed(),
    )
    .subscribe(() => {
      const mainContent = document.querySelector('main h1');
      if (mainContent instanceof HTMLElement) {
        mainContent.focus();
      }
    });
}
```

### Focus Trapping (Modals, Drawers)

`MatDialog` and `MatSidenav` handle focus trapping automatically. For custom overlays, use the CDK `FocusTrap` from `@angular/cdk/a11y`, or manage focus manually:

```typescript
// Store previous focus
private previousFocus: HTMLElement | null = null;

open(): void {
  this.previousFocus = document.activeElement as HTMLElement;
  // Focus first focusable element in overlay
}

close(): void {
  this.previousFocus?.focus();
}
```

### Active Link Identification

```html
<a routerLink="/home"
   routerLinkActive="active"
   ariaCurrentWhenActive="page">
  Home
</a>
```

---

## Color Contrast

| Element | Minimum Ratio |
|---------|---------------|
| Normal text | 4.5:1 |
| Large text (18px+ or 14px+ bold) | 3:1 |
| UI components | 3:1 |
| Focus indicators | 3:1 |

---

## Motion & Animations

All animations MUST respect `prefers-reduced-motion`:

```scss
@media (prefers-reduced-motion: reduce) {
  :host {
    transition: none;
    animation: none;
  }
}
```

---

## Internationalization for Accessibility

All ARIA labels must be translatable via the Transloco pipe (or the `TranslocoService` for dynamic strings in TypeScript):

```html
<!-- Translatable ARIA label (pipe) -->
<button [attr.aria-label]="'dx.aria.close' | transloco">
  <i class="pi pi-times" aria-hidden="true"></i>
</button>

<!-- Translatable live region -->
<div aria-live="polite">
  {{ 'dx.status.loading' | transloco }}
</div>
```

---

## Deferred Content

Wrap `@defer` blocks in ARIA live regions:

```html
<div aria-live="polite">
  @defer (on viewport) {
    <mat-table [dataSource]="dataSource"></mat-table>
  } @loading {
    <mat-progress-spinner mode="indeterminate" aria-label="Loading data" />
  }
</div>
```

---

## Form Accessibility

```html
<!-- Labels -->
<label [for]="inputId">
  {{ 'dx.form.label.email' | transloco }}
</label>
<input pInputText [id]="inputId"
       [attr.aria-describedby]="errorId"
       [attr.aria-invalid]="hasError()" />

<!-- Error messages -->
@if (hasError()) {
  <span [id]="errorId" role="alert">
    {{ 'dx.form.error.required' | transloco }}
  </span>
}

<!-- Required indicator -->
<span aria-hidden="true">*</span>
<span class="sr-only">
  {{ 'dx.aria.required' | transloco }}
</span>
```

---

## Visually Hidden Text

Use a visually-hidden utility class (defined in shared styles):

```html
<span class="dx-visually-hidden">Screen reader only text</span>
```

The `.dx-visually-hidden` utility should clip and position the element off-screen while remaining readable by assistive tech. Example SCSS:

```scss
.dx-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

## Angular Material Accessibility

Angular Material components ship with built-in accessibility (ARIA roles, keyboard navigation, focus management, `FocusTrap` via CDK `A11yModule`). When using Material:

- **Do** pass `aria-label` / `aria-labelledby` where Material exposes them
- **Do** use Material's built-in keyboard navigation (no custom reimplementation)
- **Do** use `@angular/cdk/a11y` primitives (`FocusTrap`, `LiveAnnouncer`, `FocusMonitor`) for custom overlays and announcements
- **Do not** override Material's ARIA attributes with custom values
- **Do not** add redundant keyboard handlers Material already provides

---

## Checklist

- [ ] Component has appropriate `role` attribute (or uses a Material component that provides one)
- [ ] Dynamic ARIA states use `[attr.aria-*]` binding
- [ ] Keyboard navigation works for all interactive elements
- [ ] Tab order is logical
- [ ] Focus is visible (meets 3:1 contrast)
- [ ] Focus is trapped in modals/drawers (Material / CDK `FocusTrap` handles this)
- [ ] Focus is restored when overlay closes
- [ ] ARIA labels are translatable via Transloco
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Color contrast meets WCAG AA
- [ ] Form errors are announced via `role="alert"` or Material's `mat-error`
- [ ] Icon-only actions have explicit `aria-label` (not generic)
- [ ] Decorative icons have `aria-hidden="true"`
