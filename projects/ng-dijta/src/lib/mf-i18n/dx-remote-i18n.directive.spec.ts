import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { TranslocoService } from '@jsverse/transloco';
import { DxRemoteI18nDirective, DxTranslateFn } from './dx-remote-i18n.directive';
import { DxLangLoaderService } from './dx-lang-loader.service';
import { DX_APP_NAMESPACE } from './tokens';

/** Helper: manually-resolvable promise. */
function deferred<T>(): { promise: Promise<T>; resolve: (v: T) => void } {
  let resolve!: (v: T) => void;
  const promise = new Promise<T>((res) => (resolve = res));
  return { promise, resolve };
}

/** Host that captures the translate function from the directive context. */
@Component({
  standalone: true,
  imports: [DxRemoteI18nDirective],
  template: `
    <ng-container *dxRemoteI18n="let t">
      <span id="out">{{ t('greeting') }}</span>
    </ng-container>
  `,
})
class HostComponent {}

/**
 * Build a mock TranslocoService with a controllable langChanges$ subject.
 */
function buildTranslocoSpy(langChanges$: Subject<string>, activeLang = 'en') {
  const spy = jasmine.createSpyObj<TranslocoService>(
    'TranslocoService',
    ['translate', 'getActiveLang'],
    { langChanges$: langChanges$.asObservable() },
  );
  spy.getActiveLang.and.returnValue(activeLang);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spy.translate.and.callFake((key: string, _params: any, lang: string): any => `[${lang}]${key}`);
  return spy;
}

/**
 * Build a mock DxLangLoaderService.
 * By default `ensureLangLoaded` resolves immediately.
 */
function buildLoaderSpy(resolveImmediately = true) {
  const spy = jasmine.createSpyObj<DxLangLoaderService>('DxLangLoaderService', [
    'ensureLangLoaded',
  ]);
  if (resolveImmediately) {
    spy.ensureLangLoaded.and.returnValue(Promise.resolve());
  }
  return spy;
}

describe('DxRemoteI18nDirective', () => {
  describe('(a) translate fn receives namespaced calls', () => {
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
          { provide: DxLangLoaderService, useValue: buildLoaderSpy() },
          { provide: DX_APP_NAMESPACE, useValue: 'my-remote' },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('prefixes the key with the remote namespace', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(mockTransloco.translate).toHaveBeenCalledWith('my-remote.greeting', undefined, 'en');
    }));

    it('renders the translated value into the DOM', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const text = fixture.nativeElement.querySelector('#out')!.textContent!.trim();
      expect(text).toBe('[en]my-remote.greeting');
    }));
  });

  describe('(b) re-renders on langChanges$', () => {
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
          { provide: DxLangLoaderService, useValue: buildLoaderSpy() },
          { provide: DX_APP_NAMESPACE, useValue: 'my-remote' },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('updates the translate fn when the active language changes', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const initialText = fixture.nativeElement.querySelector('#out')!.textContent!.trim();
      expect(initialText).toBe('[en]my-remote.greeting');

      mockTransloco.getActiveLang.and.returnValue('fr');
      langChanges$.next('fr');
      tick();
      fixture.detectChanges();

      expect(mockTransloco.translate).toHaveBeenCalledWith('my-remote.greeting', undefined, 'fr');
    }));
  });

  describe('(c) awaits lazy lang via DxLangLoaderService before render', () => {
    let fixture: ComponentFixture<HostComponent>;
    let langChanges$: Subject<string>;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;
    let loaderSpy: jasmine.SpyObj<DxLangLoaderService>;
    let ensureDeferred: { promise: Promise<void>; resolve: (v: void) => void };

    beforeEach(async () => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);
      ensureDeferred = deferred<void>();
      loaderSpy = buildLoaderSpy(false);
      loaderSpy.ensureLangLoaded.and.returnValue(ensureDeferred.promise);

      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DxLangLoaderService, useValue: loaderSpy },
          { provide: DX_APP_NAMESPACE, useValue: 'my-remote' },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('does not create the embedded view until ensureLangLoaded resolves', fakeAsync(() => {
      fixture.detectChanges();
      // Before the loader resolves, the template should not be rendered.
      expect(fixture.nativeElement.querySelector('#out')).toBeNull();

      ensureDeferred.resolve();
      tick();
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('#out')).not.toBeNull();
    }));

    it('calls ensureLangLoaded with the active lang on init', fakeAsync(() => {
      fixture.detectChanges();
      tick();

      expect(loaderSpy.ensureLangLoaded).toHaveBeenCalledWith('en');
    }));
  });

  describe('(d) rapid lang switch — last switch wins', () => {
    let fixture: ComponentFixture<HostComponent>;
    let langChanges$: Subject<string>;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;
    let loaderSpy: jasmine.SpyObj<DxLangLoaderService>;

    beforeEach(async () => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);
      loaderSpy = buildLoaderSpy(false);

      await TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DxLangLoaderService, useValue: loaderSpy },
          { provide: DX_APP_NAMESPACE, useValue: 'my-remote' },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('only renders the last language when two lang switches overlap', fakeAsync(() => {
      const dEn = deferred<void>();
      const dFr = deferred<void>();
      const dDe = deferred<void>();

      loaderSpy.ensureLangLoaded.and.callFake((lang: string) => {
        if (lang === 'en') return dEn.promise;
        if (lang === 'fr') return dFr.promise;
        return dDe.promise;
      });

      // Initial render for 'en' — still pending
      fixture.detectChanges();

      // Rapid switch: fr then de while en and fr are still loading
      mockTransloco.getActiveLang.and.returnValue('fr');
      langChanges$.next('fr');
      mockTransloco.getActiveLang.and.returnValue('de');
      langChanges$.next('de');

      // Resolve en (should be discarded — token is stale)
      dEn.resolve();
      tick();
      fixture.detectChanges();
      // View should not have been created yet (en render is stale)
      expect(fixture.nativeElement.querySelector('#out')).toBeNull();

      // Resolve fr (also stale)
      dFr.resolve();
      tick();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#out')).toBeNull();

      // Resolve de (the winner)
      dDe.resolve();
      tick();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('#out')).not.toBeNull();
      expect(mockTransloco.translate).toHaveBeenCalledWith('my-remote.greeting', undefined, 'de');
    }));
  });

  describe('(e) cleans up subscription on destroy', () => {
    let fixture: ComponentFixture<HostComponent>;
    let langChanges$: Subject<string>;
    let mockTransloco: jasmine.SpyObj<TranslocoService>;

    beforeEach(() => {
      langChanges$ = new Subject<string>();
      mockTransloco = buildTranslocoSpy(langChanges$);

      TestBed.configureTestingModule({
        imports: [HostComponent],
        providers: [
          { provide: TranslocoService, useValue: mockTransloco },
          { provide: DxLangLoaderService, useValue: buildLoaderSpy() },
          { provide: DX_APP_NAMESPACE, useValue: 'my-remote' },
        ],
      });

      fixture = TestBed.createComponent(HostComponent);
    });

    afterEach(() => TestBed.resetTestingModule());

    it('does not throw after destroy when langChanges$ emits', fakeAsync(() => {
      fixture.detectChanges();
      tick();

      fixture.destroy();

      expect(() => {
        langChanges$.next('fr');
        tick();
      }).not.toThrow();
    }));

    it('stops calling translate after destroy', fakeAsync(() => {
      fixture.detectChanges();
      tick();

      fixture.destroy();
      const callsAtDestroy = mockTransloco.translate.calls.count();

      langChanges$.next('fr');
      tick();

      expect(mockTransloco.translate.calls.count()).toBe(callsAtDestroy);
    }));
  });
});
