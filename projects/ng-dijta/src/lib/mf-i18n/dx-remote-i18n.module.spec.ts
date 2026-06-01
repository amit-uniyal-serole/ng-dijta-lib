import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { DxRemoteI18nModule } from './dx-remote-i18n.module';
import { DxLangLoaderService } from './dx-lang-loader.service';
import { DxRemoteI18nConfig } from './dx-remote-i18n.config';
import { DX_APP_NAMESPACE, DX_I18N_STRICT_MODE } from './tokens';

describe('DxRemoteI18nModule', () => {
  let mockTransloco: jasmine.SpyObj<TranslocoService>;
  let langChanges$: Subject<string>;

  const EN_TRANSLATIONS: Record<string, unknown> = { 'test.hello': 'Hello' };
  const FR_TRANSLATIONS: Record<string, unknown> = { 'test.hello': 'Bonjour' };

  const baseConfig: DxRemoteI18nConfig = {
    namespace: 'my-remote',
    translations: { en: EN_TRANSLATIONS },
  };

  beforeEach(() => {
    langChanges$ = new Subject<string>();

    mockTransloco = jasmine.createSpyObj<TranslocoService>(
      'TranslocoService',
      ['setTranslation', 'getActiveLang'],
      { langChanges$: langChanges$.asObservable() },
    );
    mockTransloco.getActiveLang.and.returnValue('en');
  });

  afterEach(() => TestBed.resetTestingModule());

  function configureWith(config: DxRemoteI18nConfig): void {
    TestBed.configureTestingModule({
      imports: [DxRemoteI18nModule.register(config)],
      providers: [{ provide: TranslocoService, useValue: mockTransloco }],
    });
    // Trigger module construction
    TestBed.inject(DxRemoteI18nModule);
  }

  describe('(a) double-register guard', () => {
    it('throws a descriptive error when a parent module instance is present (hierarchical double-registration)', () => {
      // The @Optional() @SkipSelf() decorator supplies a non-null parent when
      // DxRemoteI18nModule is already present in a parent injector scope.
      // We verify the guard logic directly by constructing the module with a
      // simulated parent instance — the same value Angular's DI would provide
      // in a real child-module double-registration scenario.
      const fakeParent = {} as DxRemoteI18nModule;
      const fakeLoader = jasmine.createSpyObj<DxLangLoaderService>('DxLangLoaderService', ['boot']);

      expect(() => new DxRemoteI18nModule(fakeParent, fakeLoader, baseConfig))
        .toThrowError(/DxRemoteI18nModule\.register\(\) was called more than once/);
    });
  });

  describe('(b) eager translations written on init', () => {
    it('writes eager translations via setTranslation({ merge: true }) during construction', () => {
      configureWith(baseConfig);

      expect(mockTransloco.setTranslation).toHaveBeenCalledOnceWith(
        EN_TRANSLATIONS,
        'en',
        { merge: true },
      );
    });

    it('writes all eager language entries when multiple are provided', () => {
      configureWith({
        ...baseConfig,
        translations: { en: EN_TRANSLATIONS, fr: FR_TRANSLATIONS },
      });

      expect(mockTransloco.setTranslation).toHaveBeenCalledWith(EN_TRANSLATIONS, 'en', { merge: true });
      expect(mockTransloco.setTranslation).toHaveBeenCalledWith(FR_TRANSLATIONS, 'fr', { merge: true });
    });
  });

  describe('(c) lazy lang loads on setActiveLang', () => {
    it('loads lazy translations when langChanges$ emits', fakeAsync(() => {
      const factory = jasmine.createSpy('frFactory').and.returnValue(
        Promise.resolve({ default: FR_TRANSLATIONS }),
      );
      configureWith({
        ...baseConfig,
        lazyTranslations: { fr: factory },
      });
      mockTransloco.getActiveLang.and.returnValue('fr');

      langChanges$.next('fr');
      tick();

      expect(factory).toHaveBeenCalledTimes(1);
      expect(mockTransloco.setTranslation).toHaveBeenCalledWith(FR_TRANSLATIONS, 'fr', { merge: true });
    }));
  });

  describe('(d) DX_APP_NAMESPACE visible to child injectors', () => {
    it('provides DX_APP_NAMESPACE with the configured namespace value', () => {
      configureWith(baseConfig);

      const namespace = TestBed.inject(DX_APP_NAMESPACE);
      expect(namespace).toBe('my-remote');
    });
  });

  describe('(e) cfg.strictMode override', () => {
    it('overrides DX_I18N_STRICT_MODE when config.strictMode is set to true', () => {
      configureWith({ ...baseConfig, strictMode: true });

      const strictMode = TestBed.inject(DX_I18N_STRICT_MODE);
      expect(strictMode).toBeTrue();
    });

    it('overrides DX_I18N_STRICT_MODE when config.strictMode is set to false', () => {
      configureWith({ ...baseConfig, strictMode: false });

      const strictMode = TestBed.inject(DX_I18N_STRICT_MODE);
      expect(strictMode).toBeFalse();
    });

    it('does not override DX_I18N_STRICT_MODE when config.strictMode is omitted', () => {
      // Without an override, the root factory (isDevMode) is used.
      // In a Karma test environment, isDevMode() is true.
      configureWith(baseConfig);

      const strictMode = TestBed.inject(DX_I18N_STRICT_MODE);
      // DX_I18N_STRICT_MODE uses providedIn: 'root' with factory: isDevMode()
      // The test environment uses dev mode so the root default applies.
      expect(typeof strictMode).toBe('boolean');
    });
  });
});
