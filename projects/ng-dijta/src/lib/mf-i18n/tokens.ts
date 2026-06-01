import { InjectionToken, isDevMode } from '@angular/core';
import type { DxRemoteI18nConfig } from './dx-remote-i18n.config';

/**
 * Injection token holding the namespace key under which this remote's
 * translations are registered in Transloco.
 *
 * Provided automatically by `DxRemoteI18nModule.register()` — consumers
 * may inject it to prefix their own translation keys programmatically.
 */
export const DX_APP_NAMESPACE = new InjectionToken<string>('DX_APP_NAMESPACE');

/**
 * Internal injection token that carries the full `DxRemoteI18nConfig` object
 * into `DxLangLoaderService`. Not part of the public API — do not inject
 * this directly; use `DxRemoteI18nModule.register()` instead.
 */
export const DX_REMOTE_I18N_CONFIG = new InjectionToken<DxRemoteI18nConfig>(
  'DX_REMOTE_I18N_CONFIG',
);

/**
 * Injection token that enables strict translation-key validation mode.
 *
 * In strict mode the translation layer will warn (dev) or throw (if
 * configured) when a requested key is missing from the active language.
 *
 * @default `isDevMode()` — automatically `true` during development,
 * `false` in production builds. Override per-remote via
 * `DxRemoteI18nModule.register({ strictMode: true | false })`.
 */
export const DX_I18N_STRICT_MODE = new InjectionToken<boolean>('DX_I18N_STRICT_MODE', {
  providedIn: 'root',
  factory: () => isDevMode(),
});
