```ts
import { DxTimelineModule } from '@ngdx/dijta';
```

## API

```html
<dx-timeline>
  <dx-timeline-item>step1 2015-09-01</dx-timeline-item>
  <dx-timeline-item>step2 2015-09-01</dx-timeline-item>
  <dx-timeline-item>step3 2015-09-01</dx-timeline-item>
  <dx-timeline-item>step4 2015-09-01</dx-timeline-item>
</dx-timeline>
```

### dx-timeline

Timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[dxPending]` | Set the last ghost node's existence or its content | `string\|boolean\|TemplateRef<void>` | `false` |
| `[dxPendingDot]` | Set the dot of the last ghost node when pending is true | `string\|TemplateRef<void>` | `<i dx-icon dxType="loading"></i>` |
| `dxzReverse]` | Reverse nodes or not | `boolean` | `false` |
| `[dxMode]` | By sending `alternate` the timeline will distribute the nodes to the left and right | `'left' \| 'alternate' \| 'right' \| 'custom'` | - |

### dx-timeline-item

Node of timeline

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `[dxColor]` | Set the circle's color to `'blue' \| 'red' \| 'green' \| 'gray'`| `string` | `blue` |
| `[dxDot]` | Customize timeline dot | `string \| TemplateRef<void>` | - |
| `[dxPosition]` | Customize position, only works when `nzMode` is `custom` | `'left' \| 'right'` | - |
| `[dxLabel]` | Set the label |  `string \| TemplateRef<void>` | - |

### Variant
  ### dx-calender-timeline
  ```Html
   <dx-calender-timeline [data]="data"></dx-calender-timeline>
  ```
  

  | Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `data` | nodes | `TimeLineCalenderModel[]` | `[]` |


  ### dx-timeline-detail-view
  ```Html
   <dx-timeline-detail-view [data]="data"></dx-timeline-detail-view>
  ```
  

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| `data` | nodes | `TimeLineCalenderModel[]` | `[]` |
            