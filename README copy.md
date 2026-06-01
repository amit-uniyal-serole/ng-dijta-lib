# Ng Dijta

## Getting Started

### Installation

``

-  You can add global styles to this file, and also import other style files _/
@use '@angular/material'as mat;
@import "node_modules/@ngdx/dijta/theme/\_dx-theme";

// Include the common styles for Angular Material. We include this here so that you only
// have to load a single css file for Angular Material in your app.
// Be sure that you only ever include this mixin once!
@include mat.core();

// Define the palettes for your theme using the Material Design palettes available in palette.scss
// (imported above). For each palette, you can optionally specify a default, lighter, and darker
// hue. Available color palettes: https://material.io/design/color/
$dx-dijta-home-primary: mat.define-palette(mat.$indigo-palette);
$dx-dijta-home-accent: mat.define-palette(mat.$pink-palette, A200, A100, A400);

// The warn palette is optional (defaults to red).
$dx-dijta-home-warn: mat.define-palette(mat.$red-palette);

// Create the theme object. A theme consists of configurations for individual
// theming systems such as "color" or "typography".
$dx-dijta-home-theme: mat.define-light-theme((color: (primary: $dx-dijta-home-primary,
accent: $dx-dijta-home-accent,
warn: $dx-dijta-home-warn,
),
));

// Include theme styles for core and each component used in your app.
// Alternatively, you can import and @include the theme mixins for each component
// that you are using.
@include mat.all-component-themes($dx-dijta-home-theme);

// need to remove
:root {
--input-focused-fc: #1d6cc0;
--input-border-fc: #6f7287;
--input-label-fc: #00000099;
--input-label-fw: normal;
--error-fc: #bd3232;
--input-border-width: 1px;
}

````

```bash
 npm i @ngdx/dijta
````

### Import Module

```ts
import { DxInputModule } from '@ngdx/dijta';

@NgModule({
  declarations: [...],
  imports: [
    ...
    DxInputModule,
  ],
   providers: [
    { provide: UI_COMPONENT_CONFIG, useValue: UI_COMPONENT }, // you can define input outline globally // interface UiConfig
    { provide: LOCALE_ID, useValue: "en-IN" } // currency and date input apply based on locale ID
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AppModule {}
```

### Usage

> You can find README.md for every module respective folder itself. please visit internal folder for more information.

## Authors

- **Serole technologies** - [Serole](https://www.serole.com/)

## Running Storybook

Run `npm run storybook`
