import { HttpClient } from '@angular/common/http';

import { Injectable, NgModule } from '@angular/core';
import {
  DefaultFallbackStrategy,
  DefaultInterceptor,
  DefaultMissingHandler,
  DefaultTranspiler,
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_FALLBACK_STRATEGY,
  TRANSLOCO_INTERCEPTOR,
  TRANSLOCO_LOADER,
  TRANSLOCO_MISSING_HANDLER,
  TRANSLOCO_TRANSPILER,
  translocoConfig,
  TranslocoLoader,
  TranslocoModule,
} from '@jsverse/transloco';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'fr'],
        defaultLang: 'en',
        fallbackLang: 'en',
        prodMode: true,
        missingHandler: {
          useFallbackTranslation: true,
          logMissingKey: false,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    { provide: TRANSLOCO_TRANSPILER, useClass: DefaultTranspiler },
    { provide: TRANSLOCO_MISSING_HANDLER, useClass: DefaultMissingHandler },
    { provide: TRANSLOCO_INTERCEPTOR, useClass: DefaultInterceptor },
    { provide: TRANSLOCO_FALLBACK_STRATEGY, useClass: DefaultFallbackStrategy },
  ],
})
export class TranslocoRootModule { }
