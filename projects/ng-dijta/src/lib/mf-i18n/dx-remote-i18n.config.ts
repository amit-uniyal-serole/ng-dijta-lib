/**
 * Configuration object passed to `DxRemoteI18nModule.register()`.
 *
 * Each Module Federation remote registers exactly one instance of this
 * config. Eager translations are written synchronously at module
 * construction; lazy translations are loaded on demand when Transloco
 * activates a new language.
 */
export interface DxRemoteI18nConfig {
  /**
   * Unique key under which this remote's translations are namespaced in
   * Transloco. Used as the injection-token value for `DX_APP_NAMESPACE`.
   *
   * Must be unique across all remotes loaded into the same shell.
   *
   * @example 'my-remote'
   */
  namespace: string;

  /**
   * Eager translations that are written synchronously to Transloco during
   * module construction. Keys are language codes (e.g. `'en'`); values are
   * flat or nested translation objects.
   *
   * @example
   * ```ts
   * translations: { en: { 'my-remote.greeting': 'Hello' } }
   * ```
   */
  translations: Record<string, Record<string, unknown>>;

  /**
   * Lazy-load factories for additional languages. Keys are language codes;
   * values are dynamic-import factories that resolve to a default-exported
   * translation object. The loader calls these on `setActiveLang` events,
   * deduplicated and race-safe.
   *
   * @example
   * ```ts
   * lazyTranslations: {
   *   fr: () => import('./i18n/fr.json'),
   *   de: () => import('./i18n/de.json'),
   * }
   * ```
   */
  lazyTranslations?: Record<string, () => Promise<{ default: Record<string, unknown> }>>;

  /**
   * Override the global `DX_I18N_STRICT_MODE` token for this remote only.
   * When omitted the root factory (`isDevMode()`) applies.
   *
   * @default undefined (inherits global token)
   */
  strictMode?: boolean;
}
