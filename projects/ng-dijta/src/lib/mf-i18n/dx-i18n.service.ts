import { Inject, Injectable, Optional, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HashMap, TranslocoService } from '@jsverse/transloco';
import { DX_APP_NAMESPACE, DX_I18N_STRICT_MODE } from './tokens';

/**
 * Facade service for Module Federation remotes registered with
 * `DxRemoteI18nModule`. Provides a namespaced translation API so consumer
 * code uses bare keys (`'foo'`) instead of fully-qualified keys
 * (`'${namespace}.foo'`).
 *
 * All key-accepting methods (`translate`, `selectTranslate`, `translateObject`)
 * automatically prepend the remote namespace injected via `DX_APP_NAMESPACE`.
 * Passthrough methods (`getActiveLang`, `setActiveLang`, `langChanges$`) do
 * NOT mutate or prepend the namespace.
 *
 * ### Strict-mode behaviour
 *
 * | Mode | `DX_APP_NAMESPACE` absent | Effect |
 * |------|--------------------------|--------|
 * | Strict (`DX_I18N_STRICT_MODE = true`) | Throws `Error` | Use in dev or opt-in via `register({ strictMode: true })` |
 * | Lenient (`DX_I18N_STRICT_MODE = false`) | `console.warn` + returns raw key | Used in production by default |
 *
 * `DX_I18N_STRICT_MODE` defaults to `isDevMode()` via the root token factory.
 * Override per-remote with `DxRemoteI18nModule.register({ strictMode: true | false })`.
 *
 * @example
 * ```ts
 * // In a component:
 * private readonly i18n = inject(DxI18nService);
 *
 * getGreeting(): string {
 *   return this.i18n.translate('greeting');
 * }
 *
 * greeting$ = this.i18n.selectTranslate('greeting');
 * ```
 */
@Injectable({ providedIn: 'root' })
export class DxI18nService {
  private readonly transloco = inject(TranslocoService);
  private readonly strictMode = inject(DX_I18N_STRICT_MODE);

  private readonly namespace: string | null;

  /**
   * Observable that emits the BCP 47 language tag whenever the active
   * language changes. Delegates directly to `TranslocoService.langChanges$`
   * — the namespace is not relevant for language change notifications.
   */
  readonly langChanges$: Observable<string>;

  constructor(@Optional() @Inject(DX_APP_NAMESPACE) namespace: string | null) {
    this.namespace = namespace;
    this.langChanges$ = this.transloco.langChanges$;
  }

  /**
   * Returns the BCP 47 tag of the currently active language.
   * Delegates directly to `TranslocoService.getActiveLang()`.
   */
  getActiveLang(): string {
    return this.transloco.getActiveLang();
  }

  /**
   * Switches the active language.
   * Delegates directly to `TranslocoService.setActiveLang()`.
   *
   * @param lang - BCP 47 language tag (e.g. `'fr'`, `'de'`).
   */
  setActiveLang(lang: string): void {
    this.transloco.setActiveLang(lang);
  }

  /**
   * Returns the instant translated value for `key` under the remote namespace.
   * Prepends `${namespace}.` to the key before delegating to Transloco.
   *
   * @param key - Bare translation key (without the namespace prefix).
   * @param params - Optional interpolation parameters.
   * @param lang - Optional language override; defaults to the active language.
   */
  translate<T = string>(key: string, params?: HashMap, lang?: string): T {
    const fullKey = this.resolveKey(key);
    if (fullKey === null) {
      return key as unknown as T;
    }
    return this.transloco.translate<T>(fullKey, params, lang);
  }

  /**
   * Returns an `Observable` that emits the translated value for `key` under
   * the remote namespace and re-emits on every active-language change.
   * Prepends `${namespace}.` to the key before delegating to Transloco.
   *
   * @param key - Bare translation key (without the namespace prefix).
   * @param params - Optional interpolation parameters.
   * @param lang - Optional language override; defaults to the active language.
   */
  selectTranslate<T = string>(key: string, params?: HashMap, lang?: string): Observable<T> {
    const fullKey = this.resolveKey(key);
    if (fullKey === null) {
      // In lenient mode the namespace is missing — stream never updates
      // (the error is already warned in resolveKey).
      return new Observable<T>((obs) => {
        obs.next(key as unknown as T);
        obs.complete();
      });
    }
    return this.transloco.selectTranslate<T>(fullKey, params, lang);
  }

  /**
   * Returns the translated object at `key` under the remote namespace.
   * Prepends `${namespace}.` to the key before delegating to Transloco.
   *
   * @param key - Bare translation key pointing to an object in the dictionary.
   * @param params - Optional interpolation parameters.
   * @param lang - Optional language override; defaults to the active language.
   */
  translateObject<T = unknown>(key: string, params?: HashMap, lang?: string): T {
    const fullKey = this.resolveKey(key);
    if (fullKey === null) {
      return {} as T;
    }
    return this.transloco.translateObject<T>(fullKey, params, lang);
  }

  /**
   * Prepends the namespace to `key` and returns the fully-qualified key.
   * Returns `null` when the namespace token is absent, handling the error
   * per the strict/lenient policy.
   */
  private resolveKey(key: string): string | null {
    if (!this.namespace) {
      const message =
        '[ng-dijta] DxI18nService: DX_APP_NAMESPACE is not provided. ' +
        'Import DxRemoteI18nModule.register() in the remote root module.';

      if (this.strictMode) {
        throw new Error(message);
      }
      console.warn(message);
      return null;
    }
    return `${this.namespace}.${key}`;
  }
}
