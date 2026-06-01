---
category: Components
type: Data Display
title: Activity Calendar
---

A full-featured calendar built on top of `tui-calendar` for visualizing and editing scheduled activities across day, week, month, 2-week, 3-week, and work-week views. Streams large schedule lists in batches to keep rendering responsive.

## When To Use

- Showing a team or user activity timeline with multiple calendars overlaid.
- Letting users create, drag-update, or delete scheduled events inline.
- Switching between day / week / month / multi-week views within one surface.
- Rendering large schedule datasets (hundreds+) with chunked loading.

## API

```html
<dx-activity-calendar
  [calendersList]="calendars"
  [schedulesList]="schedules"
  [calendarSettings]="settings"
  (beforeCreateSchedule)="onCreate($event)"
  (beforeUpdateSchedule)="onUpdate($event)"
  (beforeDeleteSchedule)="onDelete($event)">
</dx-activity-calendar>
```

### dx-activity-calendar

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[calendersList]` | Calendars shown in the legend / menu | `ICalendarInfo[]` | - |
| `[calenderOptions]` | `toLocaleDateString` options for the header | `Intl.DateTimeFormatOptions` | `DxCalendar.options` |
| `[schedulesList]` | Events to render | `ISchedule[]` | `[]` |
| `[calendarView]` | List of view switcher entries | `CalendarViewModel[]` | `DxCalendar.calendarView` |
| `[selectedView]` | Initially selected view entry | `CalendarViewModel` | `DxCalendar.calendarView[0]` |
| `[calendarSettings]` | Time, date, and behavior settings | `CalendarSettings` | - |
| `[isReadOnly]` | Disable drag / create / update | `boolean` | `false` |
| `[toggleMenu]` | Show the side calendars menu | `boolean` | `true` |
| `[CHUNK_SIZE]` | Number of schedules rendered per batch | `number` | `50` |
| `[renderDuration]` | Delay (ms) between batch renders | `number` | `5000` |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(calendarViewClicked)` | Emitted when the user changes view | `EventEmitter<CalendarViewModel>` |
| `(beforeCreateSchedule)` | Emitted before a new schedule is created | `EventEmitter<ISchedule>` |
| `(beforeUpdateSchedule)` | Emitted before an existing schedule updates | `EventEmitter<IEventObject>` |
| `(beforeDeleteSchedule)` | Emitted before a schedule is deleted | `EventEmitter<IEventScheduleObject>` |
| `(onChangeMonth)` | Emitted when the visible month changes | `EventEmitter<Date>` |
| `(onClickSchedule)` | Emitted when a schedule is clicked | `EventEmitter<IEventScheduleObject>` |
| `(onClickSettings)` | Emitted when the settings action is clicked | `EventEmitter<void>` |
| `(onClickToggleMenu)` | Emitted when the side-menu toggle is clicked | `EventEmitter<boolean>` |

### Types

```typescript
type calendarDisplayViewType =
  | 'month' | 'day' | 'week' | '2_WEEKS' | '3_WEEKS' | 'workWeek';

interface CalendarViewModel {
  view: calendarDisplayViewType;
  name: string;
  icon?: string;
}

type StartDayOfWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6;

interface CalendarSettings {
  enableSettingsAction?: boolean;
  timeFormat?: 12 | 24;
  dateFormat?: 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD';
  startDayOfWeek?: StartDayOfWeekType;
  timeZone?: ITimezone;
  dayStartAt?: number;
  defaultView?: 'day' | 'month' | 'week' | '2_WEEKS' | '3_WEEKS' | 'workWeek';
  useDetailPopup?: boolean;
  useCreationPopup?: boolean;
  taskView?: boolean | string[];
  enableCalendarsMenu?: boolean;
  hideActions?: boolean;
}
```

## Examples

### Basic month view

```html
<dx-activity-calendar
  [calendersList]="calendars"
  [schedulesList]="events"
  [calendarSettings]="{ defaultView: 'month', timeFormat: 12 }">
</dx-activity-calendar>
```

### Read-only with custom chunk size

```html
<dx-activity-calendar
  [calendersList]="calendars"
  [schedulesList]="events"
  [isReadOnly]="true"
  [CHUNK_SIZE]="100"
  [renderDuration]="2000">
</dx-activity-calendar>
```

### Handling create / update / delete

```typescript
onCreate(schedule: ISchedule) { this.api.create(schedule).subscribe(); }
onUpdate(event: IEventObject) { this.api.update(event.schedule).subscribe(); }
onDelete(event: IEventScheduleObject) { this.api.remove(event.schedule.id!).subscribe(); }
```

```html
<dx-activity-calendar
  [calendersList]="calendars"
  [schedulesList]="events"
  (beforeCreateSchedule)="onCreate($event)"
  (beforeUpdateSchedule)="onUpdate($event)"
  (beforeDeleteSchedule)="onDelete($event)">
</dx-activity-calendar>
```

## Import

```typescript
import { DxActivityCalendarModule } from '@ngdx/dijta';

@NgModule({ imports: [DxActivityCalendarModule] })
export class YourModule { }
```
