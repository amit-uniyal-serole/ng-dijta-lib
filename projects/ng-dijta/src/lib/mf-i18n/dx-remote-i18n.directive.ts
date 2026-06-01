import {
  DestroyRef,
  Directive,
  EmbeddedViewRef,
  Inject,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HashMap, TranslocoService } from '@jsverse/transloco';
import { DxLangLoaderService } from './dx-lang-loader.service';
import { DX_APP_NAMESPACE } from './tokens';

/** Function type exposed to the template via the `$implicit` context binding. */
export type DxTranslateFn = (key: string, params?: HashMap) => string;

/**
 * Structural directive for Module Federation remotes registered with
 * `DxRemoteI18nModule`. Creates an embedded view that receives a translate
 * function `t` as `$implicit`, where `t(key, params?)` resolves to the value
 * at `${namespace}.${key}` in the active language.
 *
 * The directive awaits `DxLangLoaderService.ensureLangLoaded()` before each
 * render, so lazy-loaded translation bundles are always available before the
 * template is rendered or re-rendered on a language switch.
 *
 * A render token guards against rapid language-switch races: only the most
 * recently requested render is applied; earlier in-flight renders are
 * discarded.
 *
 * **Must be used inside a component tree that has imported
 * `DxRemoteI18nModule.register()`** — the directive injects both
 * `DX_APP_NAMESPACE` and `DxLangLoaderService` via DI.
 *
 * @example
 * ```html
 * <ng-container *dxRemoteI18n="let t">
 *   <h1>{{ t('title') }}</h1>
 *   <p>{{ t('body', { count: items.length }) }}</p>
 * </ng-container>
 * ```
 *
 * @example
 * ```html
 * <!-- Type annotation on t is optional but improves IDE support -->
 * <ng-container *dxRemoteI18n="let t; type: $any(null)">
 *   <span>{{ t('greeting') }}</span>
 * </ng-container>
 * ```
 */
@Directive({ selector: '[dxRemoteI18n]', standalone: true })
export class DxRemoteI18nDirective implements OnInit {
  private readonly transloco = inject(TranslocoService);
  private readonly loader = inject(DxLangLoaderService);
  private readonly templateRef = inject(TemplateRef<{ $implicit: DxTranslateFn }>);
  private readonly vcr = inject(ViewContainerRef);
  private readonly destroyRef = inject(DestroyRef);

  private readonly namespace: string;
  private viewRef: EmbeddedViewRef<{ $implicit: DxTranslateFn }> | null = null;

  /**
   * Monotonically increasing counter used as a render token.
   * Incremented on every `langChanges$` event; only the render whose token
   * matches the current value is committed — earlier in-flight renders for
   * stale languages are silently dropped.
   */
  private renderToken = 0;

  constructor(@Optional() @Inject(DX_APP_NAMESPACE) namespace: string | null) {
    if (!namespace) {
      throw new Error(
        '[ng-dijta] DxRemoteI18nDirective: DX_APP_NAMESPACE is not provided. ' +
          'Import DxRemoteI18nModule.register() in the remote root module.',
      );
    }
    this.namespace = namespace;
  }

  ngOnInit(): void {
    this.renderForLang(this.transloco.getActiveLang());

    this.transloco.langChanges$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lang) => this.renderForLang(lang));
  }

  private renderForLang(lang: string): void {
    const token = ++this.renderToken;

    void this.loader.ensureLangLoaded(lang).then(() => {
      // Drop stale renders caused by rapid lang switches.
      if (token !== this.renderToken) {
        return;
      }

      const translateFn: DxTranslateFn = (key: string, params?: HashMap) =>
        this.transloco.translate(`${this.namespace}.${key}`, params, lang);

      if (!this.viewRef) {
        this.viewRef = this.vcr.createEmbeddedView(this.templateRef, {
          $implicit: translateFn,
        });
      } else {
        // Update the context function so the template re-evaluates key calls
        // with the new language.
        this.viewRef.context.$implicit = translateFn;
        this.viewRef.markForCheck();
      }
    });
  }
}
