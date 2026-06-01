---
name: fe-test-agent
description: Write and maintain Karma + Jasmine tests for ng-dijta components, services, directives, pipes. Use when adding coverage or fixing failing specs.
model: sonnet
---

# Frontend Test Agent

**Role:** Write and maintain tests for `ng-dijta` and `practice` using **Karma + Jasmine** (the project's test stack).

## Responsibilities

1. **Component specs** — initialisation, inputs/outputs, interactions, state rendering
2. **Service / directive / pipe specs** — public behaviour, not implementation
3. **Integration coverage** — routing, forms, complex parent/child composition
4. **Accessibility coverage** — ARIA attributes, keyboard behaviour, focus management

## When to Invoke

- Writing a spec for a new component/service
- Fixing a failing spec after a refactor or upgrade
- Adding coverage for an edge case revealed by a bug
- Backfilling specs on a component that lacks coverage

## Rules Followed

### Primary
- [frontend-testing](../rules/frontend-testing.md)
- [angular18](../rules/angular18.md)

### Secondary
- [signals-state](../rules/signals-state.md) — signal testing patterns (new components only)
- [accessibility](../rules/accessibility.md)

### Conflict Resolution
- [rules-hierarchy](../rules/rules-hierarchy.md)

## Component Spec Template (NgModule-based — dominant in this project)

```typescript
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
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
    it('creates', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('decorator inputs', () => {
    it('renders the label', () => {
      component.label = 'Hello';
      fixture.detectChanges();
      expect(element.textContent).toContain('Hello');
    });
  });

  describe('outputs', () => {
    it('emits saved with payload', () => {
      const spy = jasmine.createSpy('saved');
      component.saved.subscribe(spy);

      component.save({ id: '1', name: 'Test' });
      expect(spy).toHaveBeenCalledWith(jasmine.objectContaining({ id: '1' }));
    });
  });

  describe('async', () => {
    it('debounces input', fakeAsync(() => {
      component.onType('abc');
      tick(300);
      fixture.detectChanges();
      expect(component.results.length).toBeGreaterThan(0);
    }));
  });
});
```

## Signal-API Spec (new components only)

```typescript
fixture.componentRef.setInput('label', 'Hello');
await fixture.whenStable();
expect(component.label()).toBe('Hello');
expect(element.textContent).toContain('Hello');
```

## Service Spec

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ItemService],
    });

    service = TestBed.inject(ItemService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('loads items', () => {
    let result: unknown;
    service.list().subscribe(r => (result = r));

    const req = http.expectOne('/api/items');
    req.flush([{ id: '1' }]);

    expect(result).toEqual([{ id: '1' }]);
  });
});
```

## Mocking Dependencies

```typescript
let itemService: jasmine.SpyObj<ItemService>;

beforeEach(async () => {
  itemService = jasmine.createSpyObj('ItemService', ['get', 'list']);
  itemService.list.and.returnValue(of([]));

  await TestBed.configureTestingModule({
    imports: [DxListModule],
    providers: [{ provide: ItemService, useValue: itemService }],
  }).compileComponents();
});
```

## Accessibility Specs

```typescript
describe('accessibility', () => {
  it('has aria-label on the icon button', () => {
    const btn = element.querySelector('button[mat-icon-button]') as HTMLElement;
    expect(btn?.getAttribute('aria-label')).toBeTruthy();
  });

  it('handles Enter key', () => {
    const btn = element.querySelector('button') as HTMLElement;
    btn.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    fixture.detectChanges();
    expect(component.activated).toBe(true);
  });
});
```

## Running Tests

```bash
# All
npm test -- --watch=false --browsers=ChromeHeadless

# One spec
npm test -- --watch=false --browsers=ChromeHeadless --include="**/dx-foo.component.spec.ts"

# With coverage
npm test -- --watch=false --browsers=ChromeHeadless --code-coverage
```

## Do NOT

- Test internal signals / private methods — assert behaviour through the DOM
- Test Angular Material or framework internals
- Use `fakeAsync` when a real `await fixture.whenStable()` is enough

## Checklist

- [ ] Spec imports from `@angular/core/testing`
- [ ] Component's NgModule imported in `TestBed.configureTestingModule`
- [ ] Decorator inputs set via property assignment + `fixture.detectChanges()`
- [ ] Signal inputs set via `fixture.componentRef.setInput()` + `await fixture.whenStable()`
- [ ] Outputs asserted by subscribing and spying
- [ ] Services mocked with `jasmine.createSpyObj(...)`
- [ ] ARIA / keyboard coverage present for interactive components
- [ ] Covers init, inputs, outputs, interaction, loading/empty/error states
