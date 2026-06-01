# How To Use

Import in module：

```ts
import { DxFullscreenModule } from '@ngdx/dijta';
```

In the page：

```html
<dx-fullscreen>
  <div fullscreen-target>
    <div fullscreen-launch></div>
  </div>
</dx-fullscreen>
```

## dx-fullscreen

### dx-fullscreen parameters

| Parameter    | Type                            | Default     | Description                                                                                                                                                                                                                                           | Jump to Demo                                   | Global Config |
| ------------ | ------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------------- |
| mode         | `'immersive' \|'normal'`        | 'immersive' | Optional. Set the full-screen mode.                                                                                                                                                                                                                   |  - |
| zIndex       | `number`                        | 10          | Optional. Set the full-screen level.                                                                                                                                                                                                                  | - |
| beforeChange | `Function\|Promise\|Observable` | --          | Optional. Callback function before full-screen switchover is triggered. The return type is boolean. The return value is false to prevent full-screen switchover. Please note that immersive full-screen exit by pressing ESC or F11 cannot be blocked | -  |
| container    | `HTMLElement`                   | --          | Optional. Full screen based on a specified container. This parameter can be used only in normal mode.                                                                                                                                                 | -  |

### dx-fullscreen event

| Event            | Type                    | Description                          | 
| ---------------- | ----------------------- | ------------------------------------ | --------------------------------------------------- |
| fullscreenLaunch | `EventEmitter<boolean>` | Optional. Callback after full screen | 
