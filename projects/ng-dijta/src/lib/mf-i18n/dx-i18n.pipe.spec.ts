import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { HashMap, TranslocoService } from '@jsverse/transloco';
import { DxI18nPipe } from './dx-i18n.pipe';
import { DX_APP_NAMESPACE, DX_I18N_STRICT_MODE } from './tokens';

/** Minimal host component that exercises the pipe in a real template. */
@Component({
  standalone: true,
  imports: [DxI18nPipe],
  template: `<span id="out">{{ key | dxi18n:params:lang }}</span>`,
})
class HostComponent {
  key = 'greeting';
  params: HashMap | undefined = undefined;
  lang: string | undefined = undefined;
}

function buildTranslocoSpy(
  langChanges$: Subject<string>,
  activeLang = 'en',
): jasmine.SpyObj<TranslocoService> {
  const spy = jasmine.createSpyObj<TranslocoService>(
    'TranslocoService',
    ['translate', 'getActiveLang'],
    { langChanges$: langChanges$.asObservable() },
  );
  spy.getActiveLang.and.returnValue(activeLang);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spy.translate.and.callFake((key: string, params?: HashMap, lang?: string): any => {
    const suffix = params ? ':' + JSON.stringify(params) : '';
    return `[${lang ?? activeLang}]${key}${suffix}`;
  });
  return spy;
}

describe('DxI18nPipe', () => {
  describe('(a) namespace prepended', () => {
    let fixture: ComponentFixture<HostComponent>;
    let langChanges$: Subject<string>;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;

    beforeEach(async () => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);

      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DX_APP_NAMESPACE, useValue: 'my-ns' },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    afterEach(() => TestBed.resetTestingModule());

    it('prepends the remote namespace to the key', () => {
      expect(mockTransloco.translate).toHaveBeenCalledWith('my-ns.greeting', undefined, 'en');
    });

    it('renders the translated value in the DOM', () => {
      const text = fixture.nativeElement.querySelector('#out')!.textContent!.trim();
      expect(text).toContain('my-ns.greeting');
    });
  });

  describe('(b) re-renders on setActiveLang', () => {
    let fixture: ComponentFixture<HostComponent>;
    let langChanges$: Subject<string>;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;

    beforeEach(async () => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);

      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DX_APP_NAMESPACE, useValue: 'my-ns' },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    afterEach(() => TestBed.resetTestingModule());

    it('re-evaluates the pipe when the active language changes', fakeAsync(() => {
      mockTransloco.getActiveLang.and.returnValue('fr');
      langChanges$.next('fr');
      tick();
      fixture.detectChanges();

      expect(mockTransloco.translate).toHaveBeenCalledWith('my-ns.greeting', undefined, 'fr');
    }));
  });

  describe('(c) interpolation params passthrough', () => {
    let fixture: ComponentFixture<HostComponent>;
    let langChanges$: Subject<string>;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;

    beforeEach(async () => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);

      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DX_APP_NAMESPACE, useValue: 'my-ns' },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    afterEach(() => TestBed.resetTestingModule());

    it('forwards params to TranslocoService.translate', () => {
      fixture.componentInstance.params = { count: 42 };
      fixture.detectChanges();

      expect(mockTransloco.translate).toHaveBeenCalledWith(
        'my-ns.greeting',
        { count: 42 },
        'en',
      );
    });
  });

  describe('(d) 3rd-arg lang override', () => {
    let fixture: ComponentFixture<HostComponent>;
    let langChanges$: Subject<string>;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;

    beforeEach(async () => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);

      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DX_APP_NAMESPACE, useValue: 'my-ns' },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    afterEach(() => TestBed.resetTestingModule());

    it('uses the explicit lang argument instead of the active lang', () => {
      fixture.componentInstance.lang = 'de';
      fixture.detectChanges();

      expect(mockTransloco.translate).toHaveBeenCalledWith('my-ns.greeting', undefined, 'de');
    });

    it('does not call getActiveLang when lang arg is provided', () => {
      fixture.componentInstance.lang = 'ar';
      const callsBefore = mockTransloco.getActiveLang.calls.count();
      fixture.detectChanges();

      expect(mockTransloco.getActiveLang.calls.count()).toBe(callsBefore);
    });
  });

  describe('(e) missing DX_APP_NAMESPACE', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('returns the raw key in lenient mode (isDevMode=false, strictMode=false)', async () => {
      const langChanges$ = new Subject<string>();
      const mockTransloco = buildTranslocoSpy(langChanges$);

      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          // DX_APP_NAMESPACE intentionally NOT provided
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      }).compileComponents();

      const fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();

      const text = fixture.nativeElement.querySelector('#out')!.textContent!.trim();
      expect(text).toBe('greeting');
    });

    it('throws in strict mode when DX_APP_NAMESPACE is missing', () => {
      const langChanges$ = new Subject<string>();
      const mockTransloco = buildTranslocoSpy(langChanges$);

      TestBed.configureTestingModule({
        providers: [
          DxI18nPipe,
          { provide: TranslocoService, useValue: mockTransloco },
          // ChangeDetectorRef required by inject() inside the pipe
          { provide: ChangeDetectorRef, useValue: { markForCheck: () => {} } },
          // DX_APP_NAMESPACE intentionally NOT provided
          { provide: DX_I18N_STRICT_MODE, useValue: true },
        ],
      });

      const pipe = TestBed.inject(DxI18nPipe);
      expect(() => pipe.transform('greeting')).toThrowError(/DX_APP_NAMESPACE is not provided/);
    });
  });

  describe('(f) unsubscribes on destroy', () => {
    let fixture: ComponentFixture<HostComponent>;
    let langChanges$: Subject<string>;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;

    beforeEach(async () => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);

      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DX_APP_NAMESPACE, useValue: 'my-ns' },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      fixture.detectChanges();
    });

    afterEach(() => TestBed.resetTestingModule());

    it('does not throw after destroy when langChanges$ emits', fakeAsync(() => {
      fixture.destroy();

      expect(() => {
        langChanges$.next('fr');
        tick();
      }).not.toThrow();
    }));

    it('stops re-rendering after destroy', fakeAsync(() => {
      const callsAfterInit = mockTransloco.translate.calls.count();
      fixture.destroy();

      langChanges$.next('fr');
      tick();

      expect(mockTransloco.translate.calls.count()).toBe(callsAfterInit);
    }));
  });
});
