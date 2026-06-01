import { TestBed } from '@angular/core/testing';
import { Subject, firstValueFrom } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { DxI18nService } from './dx-i18n.service';
import { DX_APP_NAMESPACE, DX_I18N_STRICT_MODE } from './tokens';

function buildTranslocoSpy(langChanges$: Subject<string>, activeLang = 'en') {
  const spy = jasmine.createSpyObj<TranslocoService>(
    'TranslocoService',
    ['translate', 'selectTranslate', 'translateObject', 'getActiveLang', 'setActiveLang'],
    { langChanges$: langChanges$.asObservable() },
  );
  spy.getActiveLang.and.returnValue(activeLang);
  spy.setActiveLang.and.returnValue(spy);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (spy.translate as any).and.callFake((key: string): string => `[translated]${key}`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (spy.selectTranslate as any).and.callFake((key: string) => {
    const s = new Subject<string>();
    setTimeout(() => {
      s.next(`[obs]${key}`);
      s.complete();
    }, 0);
    return s.asObservable();
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (spy.translateObject as any).and.callFake((key: string) => ({ [key]: true }));
  return spy;
}

describe('DxI18nService', () => {
  describe('(a) namespace prepended on translate / selectTranslate / translateObject', () => {
    let service: DxI18nService;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;

    beforeEach(() => {
      const langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);

      TestBed.configureTestingModule({
        providers: [
          DxI18nService,
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DX_APP_NAMESPACE, useValue: 'my-remote' },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      });

      service = TestBed.inject(DxI18nService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('prepends namespace to translate key', () => {
      service.translate('greeting');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockTransloco.translate as any)).toHaveBeenCalledWith('my-remote.greeting', undefined, undefined);
    });

    it('prepends namespace to translate key with params', () => {
      service.translate('items.count', { count: 5 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockTransloco.translate as any)).toHaveBeenCalledWith('my-remote.items.count', { count: 5 }, undefined);
    });

    it('prepends namespace to translate key with lang override', () => {
      service.translate('greeting', undefined, 'fr');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockTransloco.translate as any)).toHaveBeenCalledWith('my-remote.greeting', undefined, 'fr');
    });

    it('prepends namespace to selectTranslate key', async () => {
      const result = await firstValueFrom(service.selectTranslate('greeting'));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockTransloco.selectTranslate as any)).toHaveBeenCalledWith('my-remote.greeting', undefined, undefined);
      expect(result).toBe('[obs]my-remote.greeting');
    });

    it('prepends namespace to translateObject key', () => {
      service.translateObject('section');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((mockTransloco.translateObject as any)).toHaveBeenCalledWith('my-remote.section', undefined, undefined);
    });
  });

  describe('(b) passthrough for getActiveLang / setActiveLang / langChanges$', () => {
    let service: DxI18nService;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;
    let langChanges$: Subject<string>;

    beforeEach(() => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$, 'en');

      TestBed.configureTestingModule({
        providers: [
          DxI18nService,
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DX_APP_NAMESPACE, useValue: 'my-remote' },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      });

      service = TestBed.inject(DxI18nService);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('getActiveLang delegates to TranslocoService without namespace mutation', () => {
      const lang = service.getActiveLang();
      expect(lang).toBe('en');
      expect(mockTransloco.getActiveLang).toHaveBeenCalled();
    });

    it('setActiveLang delegates to TranslocoService without namespace mutation', () => {
      service.setActiveLang('fr');
      expect(mockTransloco.setActiveLang).toHaveBeenCalledWith('fr');
    });

    it('langChanges$ emits the raw language code (no namespace prefix)', (done) => {
      service.langChanges$.subscribe((lang) => {
        expect(lang).toBe('de');
        done();
      });
      langChanges$.next('de');
    });
  });

  describe('(c) strict vs lenient missing-namespace path', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('returns a raw key in lenient mode when namespace is missing', () => {
      const langChanges$ = new Subject<string>();
      TestBed.configureTestingModule({
        providers: [
          DxI18nService,
          { provide: TranslocoService, useValue: buildTranslocoSpy(langChanges$) },
          // DX_APP_NAMESPACE intentionally NOT provided
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      });

      const service = TestBed.inject(DxI18nService);
      expect(service.translate('greeting')).toBe('greeting');
    });

    it('throws in strict mode when namespace is missing', () => {
      const langChanges$ = new Subject<string>();
      TestBed.configureTestingModule({
        providers: [
          DxI18nService,
          { provide: TranslocoService, useValue: buildTranslocoSpy(langChanges$) },
          // DX_APP_NAMESPACE intentionally NOT provided
          { provide: DX_I18N_STRICT_MODE, useValue: true },
        ],
      });

      const service = TestBed.inject(DxI18nService);
      expect(() => service.translate('greeting')).toThrowError(/DX_APP_NAMESPACE is not provided/);
    });

    it('returns empty object from translateObject in lenient mode when namespace is missing', () => {
      const langChanges$ = new Subject<string>();
      TestBed.configureTestingModule({
        providers: [
          DxI18nService,
          { provide: TranslocoService, useValue: buildTranslocoSpy(langChanges$) },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      });

      const service = TestBed.inject(DxI18nService);
      expect(service.translateObject('section')).toEqual({});
    });

    it('completes selectTranslate with raw key in lenient mode when namespace is missing', async () => {
      const langChanges$ = new Subject<string>();
      TestBed.configureTestingModule({
        providers: [
          DxI18nService,
          { provide: TranslocoService, useValue: buildTranslocoSpy(langChanges$) },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
        ],
      });

      const service = TestBed.inject(DxI18nService);
      const result = await firstValueFrom(service.selectTranslate('greeting'));
      expect(result).toBe('greeting');
    });
  });

  describe('(d) cfg.strictMode: true override wins over isDevMode()', () => {
    afterEach(() => TestBed.resetTestingModule());

    it('throws when strictMode token is true even in a test (normally lenient) environment', () => {
      const langChanges$ = new Subject<string>();
      TestBed.configureTestingModule({
        providers: [
          DxI18nService,
          { provide: TranslocoService, useValue: buildTranslocoSpy(langChanges$) },
          // Explicitly set strictMode = true via DX_I18N_STRICT_MODE
          { provide: DX_I18N_STRICT_MODE, useValue: true },
          // DX_APP_NAMESPACE missing to trigger the error
        ],
      });

      const service = TestBed.inject(DxI18nService);
      expect(() => service.translate('greeting')).toThrowError(/DX_APP_NAMESPACE is not provided/);
    });

    it('does NOT throw (lenient) when strictMode token is false', () => {
      const langChanges$ = new Subject<string>();
      TestBed.configureTestingModule({
        providers: [
          DxI18nService,
          { provide: TranslocoService, useValue: buildTranslocoSpy(langChanges$) },
          { provide: DX_I18N_STRICT_MODE, useValue: false },
          // DX_APP_NAMESPACE missing
        ],
      });

      const service = TestBed.inject(DxI18nService);
      expect(() => service.translate('greeting')).not.toThrow();
    });
  });
});
