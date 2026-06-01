# Angular Material Rules

**Scope:** Angular Material usage patterns, theming, and component conventions for ng-dijta.

> **Material-First Rule (MANDATORY)**: NEVER build custom UI when Angular Material provides the component. Angular Material components automatically follow the theme defined in the library's SCSS theme layer. Build custom only when Material has no component for the need. Shared reusable components go in `ng-dijta`. See [ng-dijta.md](ng-dijta.md) for the component inventory.

---

## Angular Material Configuration

ng-dijta uses `@angular/material` 18.1 with `@angular/cdk` 18.1. The theme is defined via SCSS (`projects/ng-dijta/src/lib/theme/_theme.scss`) using `@angular/material` theming APIs.

### Consuming Applications

Consumers import the bundled theme SCSS (see [scss-bundle.config.json](../../scss-bundle.config.json)) and include the library's NgModules where needed.

---

## Material-First Approach (MANDATORY)

Angular Material components MUST be used directly. NEVER build a custom component when Material already provides the capability — Material components automatically follow the shared theme.

**Mandatory Protocol:**
1. **Check Material first** — Before writing ANY UI component, check if `@angular/material` already has a component for the need.
2. **If Material has it → use it directly** — Import the Material module. The component will follow the shared theme and density settings.
3. **Customize via theming / SCSS overrides only** — Apply look-and-feel tweaks through Material's theme tokens or component-scoped SCSS. Do NOT override Material component behavior.
4. **If a reusable wrapper is needed** — Create it in `ng-dijta` (not in feature code). Wrap the Material primitive; don't reinvent it.
5. **Never reimplement Material behavior** — No custom tooltips, modals, dropdowns, date pickers, tables, menus, snackbars, etc. when Material provides them.

### FORBIDDEN custom implementations (Material has these)

| Need | WRONG (custom) | CORRECT (Angular Material) |
|------|----------------|-----------------------------|
| Modal dialog | Custom overlay div | `MatDialog` / `mat-dialog` |
| Dropdown select | Custom select | `mat-select` (`MatSelectModule`) |
| Date picker | Custom calendar | `mat-datepicker` (`MatDatepickerModule`) |
| Tooltip | Custom hover popup | `matTooltip` (`MatTooltipModule`) |
| Toast / snackbar | Custom notification | `MatSnackBar` |
| Menu / context menu | Custom dropdown | `mat-menu` (`MatMenuModule`) |
| Expansion / accordion | Custom expand panel | `mat-expansion-panel` (`MatExpansionModule`) |
| Tabs | Custom tab switcher | `mat-tab-group` (`MatTabsModule`) |
| Progress indicator | Custom spinner/bar | `mat-progress-spinner`, `mat-progress-bar` |
| Autocomplete | Custom search input | `mat-autocomplete` (`MatAutocompleteModule`) |
| Chips / tags | Custom chip component | `mat-chip-list` (`MatChipsModule`) |
| Sidenav / drawer | Custom slide panel | `mat-sidenav` (`MatSidenavModule`) |
| Stepper | Custom step component | `mat-stepper` (`MatStepperModule`) |
| Tree view | Custom tree | `mat-tree` (`MatTreeModule`) |
| Toolbar | Custom action bar | `mat-toolbar` (`MatToolbarModule`) |
| Button | Custom button | `mat-button`, `mat-raised-button`, `mat-icon-button` |
| Form field / input | Custom input wrapper | `mat-form-field` + `matInput` |
| Checkbox | Custom checkbox | `mat-checkbox` (`MatCheckboxModule`) |
| Radio button | Custom radio | `mat-radio-button` (`MatRadioModule`) |
| Toggle / switch | Custom toggle | `mat-slide-toggle` (`MatSlideToggleModule`) |
| Table | Custom grid | `mat-table` (`MatTableModule`) + `MatPaginatorModule` + `MatSortModule` |
| Divider | Custom `<hr>` styling | `mat-divider` (`MatDividerModule`) |

---

## Styling Rules

### Use Theme Tokens and Material Mixins

Color, typography, density, and shape tokens MUST come from the Material theme defined in `_theme.scss`. Do NOT hardcode colors in component SCSS.

```scss
// CORRECT — Material theme tokens
@use '@angular/material' as mat;

.dx-card {
  background: mat.get-theme-color($theme, surface);
  color: mat.get-theme-color($theme, on-surface);
  border-radius: mat.get-theme-shape($theme, medium);
}

// WRONG — Hardcoded colors
.dx-card {
  background: #ffffff;
  color: #333333;
  border-radius: 8px;
}
```

### Material CDK

Use `@angular/cdk` for low-level primitives not covered by Material components:

| CDK Feature | Use For |
|-------------|---------|
| `Overlay` / `OverlayModule` | Custom overlays, popovers, floating menus |
| `Portal` / `PortalModule` | Rendering content in different DOM locations |
| `A11yModule` (`FocusTrap`, `LiveAnnouncer`) | Focus management, ARIA live regions |
| `DragDropModule` | Drag-and-drop interactions |
| `LayoutModule` (`BreakpointObserver`) | Responsive breakpoint detection |
| `ScrollingModule` (`cdk-virtual-scroll-viewport`) | Virtual scrolling for large lists |

---

## Dialog Patterns

```typescript
import { MatDialog } from '@angular/material/dialog';

private readonly dialog = inject(MatDialog);

openConfirm(): void {
  const ref = this.dialog.open(ConfirmDialogComponent, {
    data: { message: 'Are you sure?' },
    width: '420px',
  });

  ref.afterClosed().subscribe(confirmed => {
    if (confirmed) {
      this.performAction();
    }
  });
}
```

---

## Snackbar Patterns

```typescript
import { MatSnackBar } from '@angular/material/snack-bar';

private readonly snackBar = inject(MatSnackBar);

showSuccess(message: string): void {
  this.snackBar.open(message, 'Dismiss', {
    duration: 3000,
    panelClass: 'dx-snackbar--success',
  });
}
```

---

## Form Patterns

```html
<form [formGroup]="itemForm" (ngSubmit)="saveItem()">
  <mat-form-field appearance="outline">
    <mat-label>Name</mat-label>
    <input matInput formControlName="name" />
    <mat-error *ngIf="itemForm.get('name')?.hasError('required')">
      Name is required
    </mat-error>
  </mat-form-field>

  <mat-form-field appearance="outline">
    <mat-label>Status</mat-label>
    <mat-select formControlName="status">
      <mat-option *ngFor="let s of statusOptions" [value]="s.value">
        {{ s.label }}
      </mat-option>
    </mat-select>
  </mat-form-field>

  <div class="dx-form-actions">
    <button mat-stroked-button type="button" (click)="cancel()">Cancel</button>
    <button mat-flat-button color="primary" type="submit" [disabled]="itemForm.invalid">
      Save
    </button>
  </div>
</form>
```

---

## Table Patterns

```html
<table mat-table [dataSource]="dataSource" matSort>
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
    <td mat-cell *matCellDef="let row">{{ row.name }}</td>
  </ng-container>

  <ng-container matColumnDef="status">
    <th mat-header-cell *matHeaderCellDef>Status</th>
    <td mat-cell *matCellDef="let row">
      <dx-tag [label]="row.status" />
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
</table>

<mat-paginator [pageSizeOptions]="[10, 25, 50]" showFirstLastButtons />
```

---

## Icons

ng-dijta uses Material Icons via `MatIconModule`. Register custom icons with `MatIconRegistry` when needed.

```html
<mat-icon>home</mat-icon>
<mat-icon svgIcon="dx-custom-icon"></mat-icon>
```

Decorative icons must be hidden from assistive tech:

```html
<button mat-icon-button aria-label="Close">
  <mat-icon aria-hidden="true">close</mat-icon>
</button>
```

---

## Accessibility (Material provides)

Material components ship with built-in accessibility — keyboard navigation, focus management, ARIA roles. When using Material:

- **DO** pass `aria-label` / `aria-labelledby` inputs where Material exposes them
- **DO** use Material's built-in keyboard handling (no custom reimplementation)
- **DO NOT** override Material ARIA attributes
- **DO NOT** add redundant keyboard handlers Material already provides

---

## Checklist

- [ ] Angular Material component used when Material provides the capability (zero custom implementations)
- [ ] Correct Material module imported (e.g., `MatDialogModule`, `MatTableModule`)
- [ ] Styling uses Material theme tokens or SCSS mixins (no hardcoded colors)
- [ ] CDK primitives (`Overlay`, `A11y`, `DragDrop`, `Scrolling`) used for non-Material needs
- [ ] Shared reusable wrappers live in `ng-dijta` (not duplicated across apps)
- [ ] Interactive elements have accessible names (label / aria-label / aria-labelledby)
- [ ] Icon-only buttons provide explicit `aria-label`
- [ ] Decorative icons marked `aria-hidden="true"`
