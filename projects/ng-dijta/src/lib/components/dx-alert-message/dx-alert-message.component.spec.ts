import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideTransloco, TranslocoLoader, Translation } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';

import { DxAlertMessageComponent } from './dx-alert-message.component';
import { DxAlertMessageModule } from './dx-alert-message.module';

class TestTranslocoLoader implements TranslocoLoader {
  getTranslation(): Observable<Translation> {
    return of({});
  }
}

describe('DxAlertMessageComponent', () => {
  let component: DxAlertMessageComponent;
  let fixture: ComponentFixture<DxAlertMessageComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DxAlertMessageModule],
      providers: [
        provideNoopAnimations(),
        provideTransloco({
          config: { availableLangs: ['en'], defaultLang: 'en', prodMode: true },
          loader: TestTranslocoLoader,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DxAlertMessageComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should default to the info type', () => {
    expect(component.type).toBe('info');
  });

  it('should render the message and apply the type class', () => {
    component.message = 'Hello';
    component.type = 'error';
    fixture.detectChanges();

    const alert = element.querySelector('.dx-alert')!;
    expect(alert.classList).toContain('dx-alert--error');
    expect(alert.textContent).toContain('Hello');
    expect(alert.getAttribute('role')).toBe('alert');
    expect(alert.getAttribute('aria-live')).toBe('assertive');
  });

  it('should not render the icon unless showIcon (or banner) is set', () => {
    component.message = 'Hi';
    fixture.detectChanges();
    expect(element.querySelector('.dx-alert__icon')).toBeNull();

    component.showIcon = true;
    fixture.detectChanges();
    expect(element.querySelector('.dx-alert__icon')).not.toBeNull();
  });

  it('should show the icon by default in banner mode', () => {
    component.message = 'Hi';
    component.banner = true;
    fixture.detectChanges();
    expect(element.querySelector('.dx-alert__icon')).not.toBeNull();
    expect(element.querySelector('.dx-alert--banner')).not.toBeNull();
  });

  it('should keep the deprecated `msg` alias working', () => {
    component.msg = 'Legacy text';
    fixture.detectChanges();
    expect(component.message).toBe('Legacy text');
    expect(element.querySelector('.dx-alert__message')!.textContent).toContain('Legacy text');
  });

  it('should emit onClose and remove itself when closed', () => {
    const spy = jasmine.createSpy('onClose');
    component.message = 'Closable';
    component.closeable = true;
    component.onClose.subscribe(spy);
    fixture.detectChanges();

    const closeBtn = element.querySelector('.dx-alert__close') as HTMLButtonElement;
    expect(closeBtn).not.toBeNull();

    closeBtn.click();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(element.querySelector('.dx-alert')).toBeNull();
  });
});
