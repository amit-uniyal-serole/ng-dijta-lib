import { applicationConfig, type Preview } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { of as rxOf } from 'rxjs';
import { provideNgxMask } from 'ngx-mask';
import {
  TRANSLOCO_MISSING_HANDLER,
  TranslocoModule,
  provideTransloco,
  type TranslocoLoader,
  type TranslocoMissingHandler,
  type Translation,
} from '@jsverse/transloco';
import { of, type Observable } from 'rxjs';
import { withThemeByClassName } from '@storybook/addon-themes';
import { Ability, PureAbility, createMongoAbility } from '@casl/ability';

// Theme token overrides scoped to body.dx-theme-* classes live in
// .storybook/preview-head.html (injected into the preview iframe <head>).
// They make the addon-themes switcher below actually re-skin stories; the
// shipped library theme is unaffected. (A bare CSS import here is not
// processed by the Storybook Angular webpack builder, hence preview-head.)

class StoryTranslocoLoader implements TranslocoLoader {
  getTranslation(_lang: string): Observable<Translation> {
    return of({});
  }
}

class StoryTranslocoMissingHandler implements TranslocoMissingHandler {
  handle(key: string): string {
    return key;
  }
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // Disabled: the theme switcher (withThemeByClassName) drives the page
    // background via --background-light on <html>. A backgrounds-addon default
    // would paint over it and mask the dark/brand themes. Re-enable with named
    // values only if you need a manual background override independent of theme.
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          'Buttons',
          'Form Inputs',
          'Data Display',
          'Overlays',
          'Layout',
          'Feedback',
          'Navigation',
          'Utilities',
        ],
      },
    },
  },
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideTransloco({
          config: {
            availableLangs: ['en'],
            defaultLang: 'en',
            reRenderOnLangChange: false,
            prodMode: true,
            missingHandler: {
              useFallbackTranslation: false,
              allowEmpty: false,
              logMissingKey: false,
            },
          },
          loader: StoryTranslocoLoader,
        }),
        { provide: TRANSLOCO_MISSING_HANDLER, useClass: StoryTranslocoMissingHandler },
        { provide: Ability, useValue: createMongoAbility() },
        { provide: PureAbility, useExisting: Ability },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: new Map(), queryParamMap: new Map(), data: {}, params: {}, url: [] },
            params: rxOf({}),
            queryParams: rxOf({}),
            data: rxOf({}),
            url: rxOf([]),
            fragment: rxOf(null),
          },
        },
        {
          provide: Router,
          useValue: {
            events: rxOf(),
            url: '/',
            navigate: () => Promise.resolve(true),
            navigateByUrl: () => Promise.resolve(true),
            createUrlTree: () => null,
            serializeUrl: () => '',
          },
        },
        provideNgxMask(),
        importProvidersFrom(TranslocoModule),
      ],
    }),
    withThemeByClassName({
      themes: {
        light: 'dx-theme-light',
        dark: 'dx-theme-dark',
        ocean: 'dx-theme-ocean',
      },
      defaultTheme: 'light',
      // Apply on <html>: the library declares derived tokens (--dx-*, --mdc-*,
      // --mat-*) at :root, so they only recompute against overridden base tokens
      // when the theme class sits on the same element. See preview-head.html.
      parentSelector: 'html',
    }),
  ],
  tags: ['autodocs'],
};

export default preview;
