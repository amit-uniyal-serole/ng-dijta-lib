# Angular 18 Core Rules

**Scope:** Mandatory Angular 18.1 patterns for the ng-dijta library and the `practice` preview app.

---

## Project Configuration

| Property | Value |
|----------|-------|
| Angular | 18.1 |
| TypeScript | 5.4 |
| Component prefix (library) | `dx` |
| Component prefix (practice) | `dx` |
| UI library | Angular Material 18.1 + CDK 18.1 |
| Test framework | Karma + Jasmine |
| Styling | SCSS + Material theme tokens |
| Package manager | npm |

---

## Workspace Structure

```
projects/
├── ng-dijta/     — Shared UI library (ng-packagr): components, theme, services, directives
└── practice/     — Preview/showcase application for the library
```

---

## Component Declaration

Angular 18 supports both standalone components and `NgModule`-based components. ng-dijta historically ships `NgModule`-based components via `public-api.ts` (see existing components under [projects/ng-dijta/src/lib/components/](../../projects/ng-dijta/src/lib/components/)).

### Rules

- **Follow the existing module structure** for new library components — each component folder typically has an `index.ts`, the component file, and an `NgModule` that re-exports the component.
- Use `ChangeDetectionStrategy.OnPush` on all components where practical.
- **Templates and styles** — `ng-dijta` components use external `templateUrl` / `styleUrls` (the existing 274 components do this; ng-packagr supports both). Inline templates are acceptable for tiny presentational components only.

```typescript
// ng-dijta library component — external templateUrl/styleUrls (standard pattern)
@Component({
  selector: 'dx-example',
  templateUrl: './dx-example.component.html',
  styleUrls: ['./dx-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxExampleComponent { }
```

---

## Signal APIs (Angular 18 supports)

Angular 18 has the signal APIs stable. Prefer them for new components; when touching existing decorator-based components, migrate to signal APIs when the change is safe.

### Inputs

```typescript
// PREFERRED
readonly itemId = input.required<string>();
readonly status = input<string>('default');
readonly disabled = input(false, { transform: booleanAttribute });

// LEGACY (existing code) — acceptable when modifying existing decorator-based components
@Input() itemId!: string;
```

### Outputs

```typescript
// PREFERRED
readonly statusChanged = output<string>();
readonly closed = output<void>();

// LEGACY
@Output() statusChanged = new EventEmitter<string>();
```

### Two-Way Binding

```typescript
// PREFERRED
readonly selectedItem = model<string>();
// Template: [(selectedItem)]="item"
```

### View / Content Queries

```typescript
// PREFERRED (signal-based)
readonly tableRef = viewChild<MatTable>('table');
readonly columns = contentChildren<TemplateRef<unknown>>('column');

// LEGACY
@ViewChild('table') tableRef!: MatTable<unknown>;
```

---

## State Management

```typescript
// Mutable state → signal()
private readonly _loading = signal(false);
private readonly _items = signal<Item[]>([]);

// Derived state → computed()
readonly isEmpty = computed(() => this._items().length === 0);
readonly filteredItems = computed(() =>
  this._items().filter(i => i.status === this.selectedStatus())
);

// AVOID — getter with logic
get isEmpty(): boolean { return this.items.length === 0; }
```

---

## Template Control Flow

Angular 18 stabilized the built-in control flow (`@if`, `@for`, `@switch`). Prefer them over structural directives for new templates.

```html
<!-- PREFERRED -->
@if (loading()) {
  <mat-progress-spinner mode="indeterminate" />
} @else if (isEmpty()) {
  <p>No items found.</p>
} @else {
  @for (item of filteredItems(); track item.id) {
    <dx-item-card [item]="item" />
  } @empty {
    <p>No matching items.</p>
  }
}

<!-- LEGACY structural directives — still work but prefer @-syntax for new code -->
<div *ngIf="loading">...</div>
<div *ngFor="let i of items; trackBy: trackById">...</div>
```

---

## Dependency Injection

```typescript
// PREFERRED — inject() function
private readonly router = inject(Router);
private readonly destroyRef = inject(DestroyRef);

// LEGACY — constructor injection (acceptable in existing code)
constructor(private router: Router) { }
```

---

## Host Bindings

```typescript
// PREFERRED — host object
@Component({
  host: {
    'class': 'dx-item-card',
    '[class.is-selected]': 'selected()',
    '[attr.aria-selected]': 'selected()',
    '(click)': 'selectItem()',
  },
})

// LEGACY — decorators (acceptable in existing code)
@HostBinding('class.is-selected') get isSelected() { return this.selected; }
@HostListener('click') onClick() { }
```

---

## Functional Guards & Interceptors

```typescript
// PREFERRED — Functional
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  return authService.isAuthenticated() || inject(Router).createUrlTree(['/login']);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(TokenService).getAccessToken();
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
  return next(req);
};
```

---

## Lazy Loading

```typescript
// Lazy-loaded routes
{
  path: 'dashboard',
  loadComponent: () => import('./features/dashboard/dashboard.component')
    .then(m => m.DashboardComponent),
}

// @defer in templates
@defer (on viewport) {
  <dx-heavy-component [data]="data()" />
} @placeholder {
  <div class="dx-skeleton"></div>
}
```

---

## RxJS Integration

```typescript
// Convert Observable to Signal
readonly items = toSignal(
  this.itemService.list().pipe(map(page => page.content)),
  { initialValue: [] }
);

// Cleanup with DestroyRef
private readonly destroyRef = inject(DestroyRef);

ngOnInit(): void {
  this.someObservable$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(value => this._data.set(value));
}

// WRONG — Unsubscribed observable
this.http.get('/api/data').subscribe(data => this.data = data);
```

---

## Checklist

- [ ] `ChangeDetectionStrategy.OnPush` on all new components
- [ ] Signal APIs (`signal`, `computed`, `input`, `output`, `model`) for new components
- [ ] Built-in control flow (`@if`, `@for`, `@switch`) for new templates
- [ ] `inject()` for DI in new code
- [ ] `host` object for bindings in new code
- [ ] Functional guards and interceptors
- [ ] Lazy-loaded routes
- [ ] `takeUntilDestroyed()` for RxJS subscriptions
- [ ] Correct prefix: `dx-`
- [ ] Library components use inline `template` / `styles`
