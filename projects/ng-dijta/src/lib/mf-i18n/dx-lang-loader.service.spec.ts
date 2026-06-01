import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { DxLangLoaderService } from './dx-lang-loader.service';
import { DxRemoteI18nConfig } from './dx-remote-i18n.config';

/** Helper: creates a manually-resolvable/rejectable promise. */
function deferred<T>(): { promise: Promise<T>; resolve: (v: T) => void; reject: (e: unknown) => void } {
  let resolve!: (v: T) => void;
  let reject!: (e: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

describe('DxLangLoaderService', () => {
  let service: DxLangLoaderService;
  let mockTransloco: jasmine.SpyObj<TranslocoService>;
  let langChanges$: Subject<string>;

  const EN_TRANSLATIONS: Record<string, unknown> = { 'test.hello': 'Hello' };
  const FR_TRANSLATIONS: Record<string, unknown> = { 'test.hello': 'Bonjour' };

  const baseConfig: DxRemoteI18nConfig = {
    namespace: 'test',
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

    TestBed.configureTestingModule({
      providers: [
        DxLangLoaderService,
        { provide: TranslocoService, useValue: mockTransloco },
      ],
    });

    service = TestBed.inject(DxLangLoaderService);
  });

  afterEach(() => TestBed.resetTestingModule());

  describe('(a) eager translations', () => {
    it('writes eager translations synchronously on boot', () => {
      service.boot(baseConfig);

      expect(mockTransloco.setTranslation).toHaveBeenCalledOnceWith(
        EN_TRANSLATIONS,
        'en',
        { merge: true },
      );
    });

    it('writes all provided eager language entries on boot', () => {
      service.boot({
        ...baseConfig,
        translations: { en: EN_TRANSLATIONS, fr: FR_TRANSLATIONS },
      });

      expect(mockTransloco.setTranslation).toHaveBeenCalledWith(EN_TRANSLATIONS, 'en', { merge: true });
      expect(mockTransloco.setTranslation).toHaveBeenCalledWith(FR_TRANSLATIONS, 'fr', { merge: true });
      expect(mockTransloco.setTranslation).toHaveBeenCalledTimes(2);
    });
  });

  describe('(b) dedup of concurrent ensureLangLoaded calls', () => {
    it('returns the same promise for concurrent calls to the same lang', fakeAsync(() => {
      const d = deferred<{ default: Record<string, unknown> }>();
      const config: DxRemoteI18nConfig = {
        ...baseConfig,
        lazyTranslations: { fr: () => d.promise },
      };
      service.boot(config);
      mockTransloco.getActiveLang.and.returnValue('fr');

      const p1 = service.ensureLangLoaded('fr');
      const p2 = service.ensureLangLoaded('fr');

      expect(p1).toBe(p2);

      d.resolve({ default: FR_TRANSLATIONS });
      tick();
    }));

    it('calls the factory only once for concurrent calls', fakeAsync(() => {
      const factory = jasmine.createSpy('frFactory').and.returnValue(
        Promise.resolve({ default: FR_TRANSLATIONS }),
      );
      const config: DxRemoteI18nConfig = {
        ...baseConfig,
        lazyTranslations: { fr: factory },
      };
      service.boot(config);
      mockTransloco.getActiveLang.and.returnValue('fr');

      service.ensureLangLoaded('fr');
      service.ensureLangLoaded('fr');
      tick();

      expect(factory).toHaveBeenCalledTimes(1);
    }));

    it('returns a resolved promise immediately for already-loaded lang', fakeAsync(() => {
      const config: DxRemoteI18nConfig = {
        ...baseConfig,
        lazyTranslations: {
          fr: () => Promise.resolve({ default: FR_TRANSLATIONS }),
        },
      };
      service.boot(config);
      mockTransloco.getActiveLang.and.returnValue('fr');

      service.ensureLangLoaded('fr');
      tick();

      // Second call: lang is in loaded set — returns resolved promise
      let resolved = false;
      service.ensureLangLoaded('fr').then(() => (resolved = true));
      tick();
      expect(resolved).toBeTrue();
    }));
  });

  describe('(c) staleness check', () => {
    it('skips setTranslation when active lang changes mid-flight', fakeAsync(() => {
      const d = deferred<{ default: Record<string, unknown> }>();
      const config: DxRemoteI18nConfig = {
        ...baseConfig,
        lazyTranslations: { fr: () => d.promise },
      };
      service.boot(config);
      // Start loading 'fr'
      mockTransloco.getActiveLang.and.returnValue('fr');
      service.ensureLangLoaded('fr');

      // Active lang switches to 'de' before the import resolves
      mockTransloco.getActiveLang.and.returnValue('de');
      d.resolve({ default: FR_TRANSLATIONS });
      tick();

      // setTranslation should not have been called for 'fr' lazy translations
      // (eager 'en' write from boot is absent because no eager translations triggered here)
      expect(mockTransloco.setTranslation).not.toHaveBeenCalledWith(
        FR_TRANSLATIONS, 'fr', { merge: true },
      );
    }));

    it('allows the lang to be retried after a stale miss', fakeAsync(() => {
      const factory = jasmine.createSpy('frFactory').and.returnValues(
        Promise.resolve({ default: {} }),             // first call — stale
        Promise.resolve({ default: FR_TRANSLATIONS }), // second call — valid
      );
      const config: DxRemoteI18nConfig = {
        ...baseConfig,
        lazyTranslations: { fr: factory },
      };
      service.boot(config);

      // First load — active lang changes before it resolves
      mockTransloco.getActiveLang.and.returnValue('fr');
      const p1 = service.ensureLangLoaded('fr');
      mockTransloco.getActiveLang.and.returnValue('de');
      tick();
      // p1 is resolved (stale, no write)

      // Second load attempt — active lang is back to 'fr'
      mockTransloco.getActiveLang.and.returnValue('fr');
      const p2 = service.ensureLangLoaded('fr');
      expect(p2).not.toBe(p1); // fresh promise, not dedup of first
      tick();

      expect(factory).toHaveBeenCalledTimes(2);
      expect(mockTransloco.setTranslation).toHaveBeenCalledWith(FR_TRANSLATIONS, 'fr', { merge: true });
    }));
  });

  describe('(d) destroy mid-flight', () => {
    it('does not call setTranslation when destroyed before import resolves', fakeAsync(() => {
      const d = deferred<{ default: Record<string, unknown> }>();
      const config: DxRemoteI18nConfig = {
        ...baseConfig,
        lazyTranslations: { fr: () => d.promise },
      };
      service.boot(config);
      mockTransloco.getActiveLang.and.returnValue('fr');
      service.ensureLangLoaded('fr');

      // Destroy the service
      service.ngOnDestroy();

      // Import resolves after destroy
      d.resolve({ default: FR_TRANSLATIONS });
      tick();

      expect(mockTransloco.setTranslation).not.toHaveBeenCalledWith(
        FR_TRANSLATIONS, 'fr', { merge: true },
      );
    }));
  });

  describe('(e) cache: second call same lang returns cached promise', () => {
    it('returns a resolved promise on second call without re-importing', fakeAsync(() => {
      let factoryCalls = 0;
      const config: DxRemoteI18nConfig = {
        ...baseConfig,
        lazyTranslations: {
          fr: () => {
            factoryCalls++;
            return Promise.resolve({ default: FR_TRANSLATIONS });
          },
        },
      };
      service.boot(config);
      mockTransloco.getActiveLang.and.returnValue('fr');

      service.ensureLangLoaded('fr');
      tick();

      service.ensureLangLoaded('fr');
      tick();

      expect(factoryCalls).toBe(1);
    }));
  });

  describe('langChanges$ subscription', () => {
    it('calls ensureLangLoaded when active lang changes', fakeAsync(() => {
      const factory = jasmine.createSpy('frFactory').and.returnValue(
        Promise.resolve({ default: FR_TRANSLATIONS }),
      );
      service.boot({
        ...baseConfig,
        lazyTranslations: { fr: factory },
      });

      mockTransloco.getActiveLang.and.returnValue('fr');
      langChanges$.next('fr');
      tick();

      expect(factory).toHaveBeenCalledTimes(1);
      expect(mockTransloco.setTranslation).toHaveBeenCalledWith(FR_TRANSLATIONS, 'fr', { merge: true });
    }));

    it('returns a resolved promise for a lang with no lazy factory', fakeAsync(() => {
      service.boot(baseConfig); // no lazyTranslations

      let resolved = false;
      service.ensureLangLoaded('fr').then(() => (resolved = true));
      tick();

      expect(resolved).toBeTrue();
    }));
  });
});
