import { Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { DxRemoteI18nConfig } from './dx-remote-i18n.config';
import { DxLangLoaderService } from './dx-lang-loader.service';
import { DX_APP_NAMESPACE, DX_I18N_STRICT_MODE, DX_REMOTE_I18N_CONFIG } from './tokens';

/**
 * Root-level NgModule for Module Federation remotes that need to register
 * their Transloco translations under a remote-scoped namespace.
 *
 * Import via the static `register()` factory at the root of each remote
 * module. Importing more than once in the same injector tree throws a
 * descriptive error at construction time.
 *
 * ### What this module does
 *
 * - Writes **eager** translations (those present in `config.translations`)
 *   synchronously to `TranslocoService` during module construction.
 * - Subscribes to `TranslocoService.langChanges$` and **lazy-loads**
 *   translation bundles listed in `config.lazyTranslations` on demand.
 * - Provides `DX_APP_NAMESPACE` so child components can inject the remote's
 *   namespace key.
 * - Optionally overrides `DX_I18N_STRICT_MODE` for this remote when
 *   `config.strictMode` is supplied.
 *
 * @example
 * ```ts
 * // remote.module.ts
 * \@NgModule({
 *   imports: [
 *     DxRemoteI18nModule.register({
 *       namespace: 'my-remote',
 *       translations: { en: enTranslations },
 *       lazyTranslations: {
 *         fr: () => import('./i18n/fr.json'),
 *         de: () => import('./i18n/de.json'),
 *       },
 *     }),
 *   ],
 * })
 * export class MyRemoteModule {}
 * ```
 */
@NgModule({})
export class DxRemoteI18nModule {
  /**
   * Returns a `ModuleWithProviders` that registers the remote's i18n
   * configuration and boots `DxLangLoaderService` in the remote's
   * injector scope.
   *
   * @param config - Translation configuration for this remote.
   */
  static register(config: DxRemoteI18nConfig): ModuleWithProviders<DxRemoteI18nModule> {
    return {
      ngModule: DxRemoteI18nModule,
      providers: [
        { provide: DX_APP_NAMESPACE, useValue: config.namespace },
        { provide: DX_REMOTE_I18N_CONFIG, useValue: config },
        ...(config.strictMode !== undefined
          ? [{ provide: DX_I18N_STRICT_MODE, useValue: config.strictMode }]
          : []),
        DxLangLoaderService,
      ],
    };
  }

  constructor(
    @Optional() @SkipSelf() parent: DxRemoteI18nModule | null,
    loader: DxLangLoaderService,
    @Inject(DX_REMOTE_I18N_CONFIG) config: DxRemoteI18nConfig,
  ) {
    if (parent) {
      throw new Error(
        '[ng-dijta] DxRemoteI18nModule.register() was called more than once in the same ' +
          'injector tree. Each Module Federation remote must call register() exactly once at ' +
          'its root module. Nested registration is not supported in v1.',
      );
    }
    loader.boot(config);
  }
}
