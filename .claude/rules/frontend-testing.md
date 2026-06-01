# Frontend Testing Rules

**Scope:** Testing patterns for the ng-dijta Angular 18 frontend using Karma + Jasmine.

---

## Testing Framework

| Tool | Purpose |
|------|---------|
| **Karma** | Test runner |
| **Jasmine** | Assertion / spec framework |
| `jasmine.createSpy()` / `spyOn()` | Spying and mocking |
| `fakeAsync` / `tick` | Zone-based async timer control |
| `@angular/core/testing` (`TestBed`) | Component harness |

### Run Tests

```bash
npm test                  # Runs `ng test` across the workspace
npx ng test ng-dijta      # Library tests only
npx ng test practice      # Practice app tests only
```

---

## Test File Structure

```typescript
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DxExampleComponent } from './dx-example.component';
import { DxExampleModule } from './dx-example.module';

describe('DxExampleComponent', () => {
  let component: DxExampleComponent;
  let fixture: ComponentFixture<DxExampleComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DxExampleModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DxExampleComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
```

For **standalone** components (the small subset that has been converted), use `imports: [DxExampleComponent]` instead of the module.

---

## Signal Testing Patterns

If a component uses signal APIs, call signals with `()` in assertions and await `fixture.whenStable()` after input changes:

```typescript
// Read signal values
expect(component.loading()).toBe(false);
expect(component.items()).toHaveLength(0);

// Set signal inputs
fixture.componentRef.setInput('itemId', '123');
await fixture.whenStable();

expect(component.itemId()).toBe('123');
```

---

## Decorator-Based Input Testing (Legacy API)

Most existing components use `@Input()` decorators. Set them directly:

```typescript
component.itemId = '123';
fixture.detectChanges();
expect(element.textContent).toContain('123');
```

---

## Output Testing

```typescript
it('should emit on save', () => {
  const spy = jasmine.createSpy('saved');
  component.saved.subscribe(spy);

  component.saveItem();
  fixture.detectChanges();

  expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ id: '123' }));
});
```

Same pattern works for `output()` signals and classic `EventEmitter` outputs.

---

## Timer Control (Zone-Based)

```typescript
import { fakeAsync, tick } from '@angular/core/testing';

it('should debounce search', fakeAsync(() => {
  component.onSearchInput('test');
  expect(component.searchResults.length).toBe(0);

  tick(300);
  fixture.detectChanges();

  expect(component.searchResults.length).toBeGreaterThan(0);
}));
```

---

## Service Mocking

```typescript
describe('DxItemDetailComponent', () => {
  let mockItemService: jasmine.SpyObj<ItemService>;

  beforeEach(async () => {
    mockItemService = jasmine.createSpyObj('ItemService', ['get']);

    await TestBed.configureTestingModule({
      imports: [DxItemDetailModule],
      providers: [{ provide: ItemService, useValue: mockItemService }],
    }).compileComponents();
  });

  it('should load item on init', () => {
    mockItemService.get.and.returnValue(of({ id: '123', name: 'Test Item' }));

    fixture.detectChanges();

    expect(element.textContent).toContain('Test Item');
  });
});
```

---

## Accessibility Testing

```typescript
describe('accessibility', () => {
  it('should have correct ARIA attributes', () => {
    expect(element.getAttribute('role')).toBe('region');
    expect(element.getAttribute('aria-label')).toBeTruthy();
  });

  it('should be keyboard navigable', () => {
    const button = element.querySelector('button')!;
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();

    expect(component.isOpen).toBe(true);
  });
});
```

---

## What to Test

| Category | Tests |
|----------|-------|
| **Initialization** | Component creates, default values |
| **Inputs** | Input changes update component/DOM |
| **Outputs** | Events emit correctly |
| **Interactions** | Click, keyboard, focus |
| **State** | Loading, error, empty states |
| **Material integration** | Material component renders and emits events as expected |
| **Routing / Guards** | Navigation, guard behavior |

### What NOT to Test

- Angular Material internal behavior
- Angular framework behavior
- Pure getters / setters
- Third-party library internals

---

## Checklist

- [ ] Test module imports the component's own `NgModule` (or the standalone component)
- [ ] Decorator inputs set directly and followed by `fixture.detectChanges()`
- [ ] Signal inputs set with `fixture.componentRef.setInput()` and awaited with `whenStable()`
- [ ] Output subscriptions assert emissions
- [ ] Services mocked with `jasmine.createSpyObj()`
- [ ] Async / timer code uses `fakeAsync` + `tick`
- [ ] Accessibility attributes (`role`, `aria-*`) asserted where relevant
- [ ] No reliance on Material internal DOM structure
