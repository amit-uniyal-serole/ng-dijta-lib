/*
 * Public API Surface of ng-dijta/mf-i18n
 *
 * Intentionally limited — DX_REMOTE_I18N_CONFIG and DxLangLoaderService are
 * internal implementation details consumed only by DxRemoteI18nModule and the
 * directive.
 */
export { DX_APP_NAMESPACE, DX_I18N_STRICT_MODE } from './tokens';
export type { DxRemoteI18nConfig } from './dx-remote-i18n.config';
export { DxRemoteI18nModule } from './dx-remote-i18n.module';
export { DxI18nPipe } from './dx-i18n.pipe';
export { DxRemoteI18nDirective } from './dx-remote-i18n.directive';
export type { DxTranslateFn } from './dx-remote-i18n.directive';
export { DxI18nService } from './dx-i18n.service';
