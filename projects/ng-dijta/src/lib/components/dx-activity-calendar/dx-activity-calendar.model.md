````markdown
# dx-activity-calendar — Models

This document describes the TypeScript model types used by the `dx-activity-calendar` component (from `dx-activity-calendar.model.ts`). Use these types when constructing `calendarSettings`, `calendarView` and other configuration objects.

## Types and interfaces

- `calendarDisplayViewType` — allowed view identifiers: `'month' | 'day' | 'week' | '2_WEEKS' | '3_WEEKS' | 'workWeek'`.

- `CalendarViewModel` — object describing a view option:

```ts
interface CalendarViewModel {
  view: calendarDisplayViewType; // id used by tui-calendar
  name: string;                  // label shown in the UI
  icon?: string;                 // optional material icon name
}
```

- `CalendatDateFormatType` — allowed date format strings: `'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD'`.

- `StartDayOfWeekType` — numeric start of week: 0..6 (0 = Sunday).

- `CalendarSettings` — configuration object used by the component to control behavior and rendering:

```ts
interface CalendarSettings {
  enableSettingsAction?: boolean;     // show settings action in UI
  timeFormat?: 12 | 24;               // 12 or 24 hour format
  dateFormat?: CalendatDateFormatType;
  startDayOfWeek?: StartDayOfWeekType; // first day of week
  timeZone?: ITimezone | undefined;    // timezone object from tui-calendar
  dayStartAt?: number | undefined;     // hour to start day view
  defaultView?: 'day' | 'month' | 'week' | '2_WEEKS' | '3_WEEKS' | 'workWeek';
  useDetailPopup?: boolean;            // use built-in detail popup
  useCreationPopup?: boolean;          // use built-in creation popup
  taskView?: boolean | string[];       // shows tasks or task columns if supported
  enableCalendarsMenu?: boolean;       // show per-calendar visibility menu
  hideActions?: boolean;               // hide action controls
}
```

## Copyable example — CalendarSettings

```ts
const calendarSettings: CalendarSettings = {
  enableSettingsAction: true,
  timeFormat: 12,
  dateFormat: 'DD-MM-YYYY',
  startDayOfWeek: 1, // Monday
  dayStartAt: 8,     // start day at 8:00
  defaultView: 'month',
  useCreationPopup: true,
  useDetailPopup: true,
  enableCalendarsMenu: true,
  hideActions: false
};
```

## CalendarView sample

```ts
const calendarView: CalendarViewModel[] = [
  { view: 'month', name: 'Monthly', icon: 'calendar_view_month' },
  { view: 'week', name: 'Weekly', icon: 'view_week' },
  { view: 'day', name: 'Daily', icon: 'calendar_view_day' }
];
```

## Notes
- The `timeZone` property expects the `ITimezone` type from `tui-calendar` (see `package.json` peer deps).
- If you need additional custom behavior, extend the `CalendarSettings` type in your application and map the extra values to the component via the `calendarSettings` input.

````
