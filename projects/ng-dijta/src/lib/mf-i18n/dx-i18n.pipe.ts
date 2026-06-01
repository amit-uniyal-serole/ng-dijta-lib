import {
  ChangeDetectorRef,
  DestroyRef,
  Inject,
  Optional,
  Pipe,
  PipeTransform,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HashMap, TranslocoService } from '@jsverse/transloco';
import { DX_APP_NAMESPACE, DX_I18N_STRICT_MODE } from './tokens';

/**
 * Translation pipe for Module Federation remotes registered with
 * `DxRemoteI18nModule`. Prepends the remote's namespace (from
 * `DX_APP_NAMESPACE`) to every key so consumers write bare keys (`'foo'`)
 * instead of the fully-qualified `'${namespace}.foo'` form.
 *
 * **Must be used inside a component tree that has imported
 * `DxRemoteI18nModule.register()`** — the pipe injects `DX_APP_NAMESPACE`
 * via DI and will throw (strict mode) or warn (lenient) when the token is
 * absent.
 *
 * The pipe is `pure: false` because it must re-evaluate whenever the active
 * language changes. This carries a per-change-detection-cycle evaluation cost.
 * Keep it behind `OnPush` components where possible — they only run CD when
 * inputs change or the pipe calls `markForCheck()`.
 *
 * @example
 * ```html
 * <!-- Basic key -->
 * <span>{{ 'greeting' | dxi18n }}</span>
 *
 * <!-- With interpolation params -->
 * <span>{{ 'items.count' | dxi18n:{ count: items.length } }}</span>
 *
 * <!-- Force a specific language -->
 * <span>{{ 'greeting' | dxi18n:{}:'fr' }}</span>
 * ```
 */
@Pipe({ name: 'dxi18n', standalone: true, pure: false })
export class DxI18nPipe implements PipeTransform {
  private readonly transloco = inject(TranslocoService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly strictMode = inject(DX_I18N_STRICT_MODE);

  private readonly namespace: string | null;

  /** Last translated value — returned synchronously on each CD cycle. */
  private lastValue = '';

  /** Track the key+lang+params combo so we only re-translate when they change. */
  private lastFullKey = '';
  private lastLang = '';
  private lastParamsJson = '';

  constructor(@Optional() @Inject(DX_APP_NAMESPACE) namespace: string | null) {
    this.namespace = namespace;

    // Re-mark for check on every lang change so the pipe re-evaluates.
    this.transloco.langChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.cdr.markForCheck());
  }

  /**
   * Translates `key` under the remote's namespace.
   *
   * @param key - Bare translation key (without the namespace prefix).
   * @param params - Optional interpolation parameters.
   * @param lang - Optional language override; falls back to the active lang.
   */
  transform(key: string, params?: HashMap, lang?: string): string {
    if (!this.namespace) {
      return this.handleMissingNamespace(key);
    }

    const activeLang = lang ?? this.transloco.getActiveLang();
    const fullKey = `${this.namespace}.${key}`;
    const paramsJson = params ? JSON.stringify(params) : '';

    // Only re-translate when key, lang, or params actually changed.
    if (
      fullKey === this.lastFullKey &&
      activeLang === this.lastLang &&
      paramsJson === this.lastParamsJson
    ) {
      return this.lastValue;
    }

    this.lastFullKey = fullKey;
    this.lastLang = activeLang;
    this.lastParamsJson = paramsJson;
    this.lastValue = this.transloco.translate<string>(fullKey, params, activeLang);
    return this.lastValue;
  }

  private handleMissingNamespace(rawKey: string): string {
    const message =
      '[ng-dijta] DxI18nPipe: DX_APP_NAMESPACE is not provided. ' +
      'Import DxRemoteI18nModule.register() in the remote root module.';

    // DX_I18N_STRICT_MODE defaults to isDevMode() via the token factory —
    // no need to call isDevMode() again here.
    if (this.strictMode) {
      throw new Error(message);
    }

    console.warn(message);
    return rawKey;
  }
}
