Using npm:

## Usage


Import `DxLoaderModule` in in the root module(`AppModule`):

```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
// Import library module
import { DxLoaderModule } from "dx-loader";

@NgModule({
  imports: [
    // ...
    BrowserAnimationsModule,
    DxLoaderModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

#### NOTE

- There is possibility to use global configuration for DxLoaderModule.
- Just call `forRoot` method for DxLoaderModule and pass configuration object.
- The input properties of DxLoaderComponent has higher priority than global options

```typescript
// Available options
interface DxLoaderConfig {
  type?: string;
}
// Use in app
@NgModule({
  imports: [
    DxLoaderModule.forRoot({ type: 'ball-scale-multiple' })
  ]
})



## Available Options

- **[bdColor]**: RGBA color format.
  To set background-color for backdrop, default `rgba(51,51,51,0.8)` where `alpha` value(0.8) is opacity of backdrop
- **[size]**: Anyone from `small`, `default`, `medium`, `large`.
  To set size of spinner, default `large`
- **[color]**: Any css color format.
  To set color of spinner, default `#fff`
- **[type]**: Choose any animation spinner from [Load Awesome](http://github.danielcardoso.net/load-awesome/animations.html).
  To set type of spinner
- **[fullScreen]**: `true` or `false`
  To enable/disable fullscreen mode(overlay), default `true`
- **[name]**: For multiple spinners
  To set name for spinner, default `primary`
- **[zIndex]**: For dynamic z-index
  To set z-index for the spinner, default `99999`
- **[template]**: For custom spinner image
  To set custom template for the custom spinner, default `null`
- **[showSpinner]**: `true` or `false`
  To show/hide spinner from template using variable
- **[disableAnimation]**: `true` or `false`
  To enable/disable fade animation of spinner, default `false`

#### Using Spinner Type

```html
<dx-loader
  bdColor="rgba(51,51,51,0.8)"
  size="medium"
  color="#fff"
  type="ball-scale-multiple"
>
  <p style="font-size: 20px; color: white">Loading...</p>
</dx-loader>
```

#### Using Custom Spinner

```html
<dx-loader
  bdColor="rgba(0, 0, 0, 1)"
  template="<img src='https://media.giphy.com/media/o8igknyuKs6aY/giphy.gif' />"
>
</dx-loader>