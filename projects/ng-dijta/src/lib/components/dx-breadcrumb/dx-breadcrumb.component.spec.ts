import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { DxBreadcrumbComponent } from './dx-breadcrumb.component';
import { DxBreadcrumbModule } from './dx-breadcrumb.module';
import { DxBreadcrumbService } from './dx-breadcrumb.service';

describe('DxBreadcrumbComponent', () => {
  let component: DxBreadcrumbComponent;
  let fixture: ComponentFixture<DxBreadcrumbComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DxBreadcrumbModule],
      providers: [provideRouter([]), provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(DxBreadcrumbComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render an explicit trail from the items input', () => {
    component.items = [
      { label: 'Home', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Laptops', url: '' },
    ];
    fixture.detectChanges();

    const links = element.querySelectorAll('a.dx-breadcrumb-item-link');
    const current = element.querySelector('.dx-breadcrumb-item--current');
    expect(links.length).toBe(2);
    expect(current?.textContent).toContain('Laptops');
    expect(current?.getAttribute('aria-current')).toBe('page');
  });

  it('should render a separator before every item except the first', () => {
    component.items = [
      { label: 'A', url: '/a' },
      { label: 'B', url: '/b' },
      { label: 'C', url: '' },
    ];
    fixture.detectChanges();
    expect(element.querySelectorAll('.dx-breadcrumb-separator').length).toBe(2);
  });

  it('should default to left alignment and reflect the align input', () => {
    component.items = [{ label: 'Home', url: '' }];
    expect(component.align).toBe('left');
    fixture.detectChanges();
    expect(element.querySelector('.dx-breadcrumb--left')).not.toBeNull();

    component.align = 'right';
    fixture.detectChanges();
    expect(element.querySelector('.dx-breadcrumb--right')).not.toBeNull();
  });

  it('should expose a navigation landmark with an accessible name', () => {
    component.items = [{ label: 'Home', url: '' }];
    fixture.detectChanges();
    const nav = element.querySelector('nav.dx-breadcrumb');
    expect(nav?.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('should let the breadcrumb service push a trail when no items input is set', () => {
    const service = TestBed.inject(DxBreadcrumbService);
    fixture.detectChanges();
    service.updateBreadcrumb([{ label: 'Reports', url: '' }]);
    fixture.detectChanges();
    expect(element.textContent).toContain('Reports');
  });
});
