import { DestroyRef, Injectable, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@jsverse/transloco';
import type { DxRemoteI18nConfig } from './dx-remote-i18n.config';

/**
 * Internal service that manages eager and lazy Transloco translation loading
 * for a single Module Federation remote.
 *
 * **Not for direct use by consumers.** It is provided and booted
 * automatically by `DxRemoteI18nModule.register()`. The pipe and directive
 * introduced in P1-E03 will interact with this service via DI.
 *
 * ### Behaviour contract
 *
 * 1. **Eager writes are synchronous.** `boot()` iterates `config.translations`
 *    and calls `TranslocoService.setTranslation` with `{ merge: true }` for
 *    each language before returning.
 * 2. **`ensureLangLoaded` is idempotent.** Calling it twice for the same
 *    language while a load is in-flight returns the same `Promise` (no
 *    duplicate imports). After the load completes a second call returns a
 *    resolved `Promise` immediately.
 * 3. **Staleness check.** If the active language changes between the time a
 *    lazy load starts and the time the `Promise` resolves, the write is
 *    skipped. The load is removed from the in-flight map so it can be
 *    retried if the user returns to that language.
 * 4. **Destroy guard.** If the injector that owns this service is destroyed
 *    while a lazy load is in-flight, the resolved value is silently discarded
 *    — `setTranslation` is never called after `ngOnDestroy`.
 * 5. **All `setTranslation` calls use `{ merge: true }`** so multiple remotes
 *    coexist safely under the same Transloco instance.
 */
@Injectable()
export class DxLangLoaderService implements OnDestroy {
  private readonly transloco = inject(TranslocoService);
  private readonly destroyRef = inject(DestroyRef);

  private namespace = '';
  private lazyTranslations: Record<string, () => Promise<{ default: Record<string, unknown> }>> =
    {};

  /** Languages whose lazy translations have been successfully written. */
  private readonly loaded = new Set<string>();

  /** In-flight lazy-load promises keyed by language code. */
  private readonly inflight = new Map<string, Promise<void>>();

  private destroyed = false;

  /**
   * Writes all eager translations synchronously and subscribes to
   * `TranslocoService.langChanges$` to trigger lazy loading on language
   * switches. Must be called exactly once, from `DxRemoteI18nModule`.
   *
   * @param config - The same config object passed to `DxRemoteI18nModule.register()`.
   */
  boot(config: DxRemoteI18nConfig): void {
    this.namespace = config.namespace;
    this.lazyTranslations = config.lazyTranslations ?? {};

    // Eager writes — synchronous, merge so other remotes are not clobbered.
    for (const [lang, translations] of Object.entries(config.translations)) {
      this.transloco.setTranslation(translations, lang, { merge: true });
    }

    // Subscribe for lazy loading; torn down automatically via DestroyRef.
    this.transloco.langChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => void this.ensureLangLoaded(lang));
  }

  /**
   * Ensures the lazy translation bundle for `lang` is loaded and written to
   * Transloco. Safe to call concurrently — duplicate calls for the same
   * in-flight language share one `Promise`.
   *
   * @param lang - BCP 47 language tag (e.g. `'fr'`, `'de'`).
   * @returns A `Promise` that resolves when the translations are written, or
   *   immediately when no lazy factory exists for `lang`, the language is
   *   already loaded, or a staleness/destroy condition is detected.
   */
  ensureLangLoaded(lang: string): Promise<void> {
    if (this.loaded.has(lang)) {
      return Promise.resolve();
    }

    const existing = this.inflight.get(lang);
    if (existing) {
      return existing;
    }

    const factory = this.lazyTranslations[lang];
    if (!factory) {
      return Promise.resolve();
    }

    const load = factory()
      .then(({ default: translations }) => {
        // Staleness check: skip if the active language changed mid-flight
        // or the service was destroyed before the import resolved.
        if (this.destroyed || this.transloco.getActiveLang() !== lang) {
          return;
        }
        this.transloco.setTranslation(translations, lang, { merge: true });
        this.loaded.add(lang);
      })
      .finally(() => {
        this.inflight.delete(lang);
      });

    this.inflight.set(lang, load);
    return load;
  }

  ngOnDestroy(): void {
    this.destroyed = true;
  }
}
