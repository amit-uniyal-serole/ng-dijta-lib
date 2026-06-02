import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DxIconComponent } from './dx-icon.component';
import { DxIconModule } from './dx-icon.module';

describe('DxIconComponent', () => {
  let component: DxIconComponent;
  let fixture: ComponentFixture<DxIconComponent>;
  let hostEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DxIconModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DxIconComponent);
    component = fixture.componentInstance;
    hostEl = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('host', () => {
    it('should have dx-icon class on host element', () => {
      expect(hostEl.classList).toContain('dx-icon');
    });
  });

  describe('accessibility', () => {
    it('should set aria-hidden="true" by default (decorative icon)', () => {
      expect(hostEl.getAttribute('aria-hidden')).toBe('true');
    });

    it('should remove aria-hidden when ariaLabel is provided', () => {
      component.ariaLabel = 'Close dialog';
      fixture.detectChanges();
      expect(hostEl.getAttribute('aria-hidden')).toBeNull();
    });

    it('should set aria-label on the host when ariaLabel is provided', () => {
      component.ariaLabel = 'Notifications';
      fixture.detectChanges();
      expect(hostEl.getAttribute('aria-label')).toBe('Notifications');
    });

    it('should not set aria-label when ariaLabel is not provided', () => {
      expect(hostEl.getAttribute('aria-label')).toBeNull();
    });

    it('should always mark inner mat-icon as aria-hidden', () => {
      component.ariaLabel = 'Close';
      fixture.detectChanges();
      const matIcon = hostEl.querySelector('mat-icon');
      expect(matIcon?.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('size', () => {
    it('should apply dx-icon--md class by default', () => {
      const matIcon = hostEl.querySelector('mat-icon');
      expect(matIcon?.classList).toContain('dx-icon--md');
    });

    (['xs', 'sm', 'md', 'lg', 'xl'] as const).forEach(size => {
      it(`should apply dx-icon--${size} class when size="${size}"`, () => {
        component.size = size;
        fixture.detectChanges();
        const matIcon = hostEl.querySelector('mat-icon');
        expect(matIcon?.classList).toContain(`dx-icon--${size}`);
      });
    });
  });

  describe('name', () => {
    it('should render the icon ligature as text content', () => {
      component.name = 'close';
      fixture.detectChanges();
      const matIcon = hostEl.querySelector('mat-icon');
      expect(matIcon?.textContent?.trim()).toBe('close');
    });
  });

  describe('fontSet', () => {
    it('should resolve filled fontSet to empty string (mat-icon default)', () => {
      component.fontSet = 'filled';
      expect(component.resolvedFontSet).toBe('');
    });

    it('should resolve outlined fontSet to material-icons-outlined', () => {
      component.fontSet = 'outlined';
      expect(component.resolvedFontSet).toBe('material-icons-outlined');
    });

    it('should resolve rounded fontSet to material-icons-rounded', () => {
      component.fontSet = 'rounded';
      expect(component.resolvedFontSet).toBe('material-icons-rounded');
    });

    it('should resolve sharp fontSet to material-icons-sharp', () => {
      component.fontSet = 'sharp';
      expect(component.resolvedFontSet).toBe('material-icons-sharp');
    });
  });
});
