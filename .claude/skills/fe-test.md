---
description: Write and run Karma + Jasmine tests for ng-dijta components and services
model: sonnet
---

# /fe-test

Write component / service / directive / pipe tests for `ng-dijta` using **Karma + Jasmine** (the project's real test stack).

## Prerequisites

- Read [.claude/agents/fe-test-agent.md](../agents/fe-test-agent.md) for full patterns
- Read [.claude/rules/frontend-testing.md](../rules/frontend-testing.md) for rules
- Target component/service builds successfully

## Framework

| Tool | Purpose |
|------|---------|
| **Karma** | Test runner (`ng test`) |
| **Jasmine** | Spec framework (`describe`, `it`, `expect`) |
| `jasmine.createSpy()` / `spyOn()` | Spying |
| `jasmine.createSpyObj()` | Mocking injected services |
| `fakeAsync` + `tick` (from `@angular/core/testing`) | Zone-based async control |
| `TestBed` | Component harness |

This project runs real browsers via Karma (headless Chrome in CI).

## Workflow

1. **Analyse** — what does the component actually do?
2. **Structure** — spec file next to the source (`foo.component.spec.ts`)
3. **Write** — init, inputs, outputs, interactions, loading/empty/error states, accessibility
4. **Run** — targeted Karma run with the spec pattern
5. **Coverage** — make sure public behaviour is asserted through the DOM, not internal state

## Component Test Template

```typescript
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DxFooComponent } from './dx-foo.component';
import { DxFooModule } from './dx-foo.module';

describe('DxFooComponent', () => {
  let component: DxFooComponent;
  let fixture: ComponentFixture<DxFooComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DxFooModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DxFooComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  describe('initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('decorator inputs', () => {
    it('renders the label', () => {
      component.label = 'Save';
      fixture.detectChanges();
      expect(element.textContent).toContain('Save');
    });
  });

  describe('outputs', () => {
    it('emits saved with the item payload', () => {
      const spy = jasmine.createSpy('saved');
      component.saved.subscribe(spy);

      component.saveItem();
      expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ id: '1' }));
    });
  });

  describe('async / debounced behaviour', () => {
    it('debounces search input', fakeAsync(() => {
      component.onSearchInput('test');
      tick(300);
      fixture.detectChanges();

      expect(component.searchResults.length).toBeGreaterThan(0);
    }));
  });
});
```

### Signal-based component (new code only)

```typescript
fixture.componentRef.setInput('label', 'Save');
await fixture.whenStable();

expect(component.label()).toBe('Save');
```

## Service Mocking

```typescript
let itemService: jasmine.SpyObj<ItemService>;

beforeEach(async () => {
  itemService = jasmine.createSpyObj('ItemService', ['get', 'list']);

  await TestBed.configureTestingModule({
    imports: [DxItemDetailModule],
    providers: [{ provide: ItemService, useValue: itemService }],
  }).compileComponents();
});

it('loads item on init', () => {
  itemService.get.and.returnValue(of({ id: '1', name: 'Test' }));
  fixture.detectChanges();

  expect(element.textContent).toContain('Test');
});
```

## Accessibility Coverage

- ARIA role / `aria-*` attributes assert against the rendered DOM
- Keyboard event dispatched via `new KeyboardEvent('keydown', { key: 'Enter' })`
- For modal / drawer components, assert focus return after close

## Running Tests

```bash
# All tests
npm test -- --watch=false --browsers=ChromeHeadless

# Filter to a single spec
npm test -- --watch=false --browsers=ChromeHeadless --include="**/dx-foo.component.spec.ts"

# Library only (via nx target)
npx nx test ng-dijta
```

## What to Test

| Category | Tests |
|----------|-------|
| Initialization | Component creates, default values present |
| Inputs | Setting an input updates the DOM |
| Outputs | Events emit the right payload |
| Interactions | Click, keydown, focus |
| State | Loading / empty / error render correctly |
| Material integration | Wrapped Material component renders and emits |
| A11y | `role` / `aria-*` present and reactive |

### Do NOT test
- Angular Material internals
- Angular framework behaviour
- Pure getters / setters
- Private methods or internal signals (test via public API + DOM)

## Related

- [fe-test-agent.md](../agents/fe-test-agent.md) — full patterns
- [frontend-testing.md](../rules/frontend-testing.md) — testing rules
- `/fe-build` — component to test
- `/debug` — diagnose a failing spec
