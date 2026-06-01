````markdown
# dx-activity-calendar — Data defaults & ISchedule examples

This document shows the default data provided by `DxCalendar` (see `dx-activity-calendar.data.ts`) and provides copyable, realistic `ISchedule` examples (the schedule shape used by `tui-calendar`). Use these samples when testing or wiring up the calendar to your backend.

## Default provider (DxCalendar)

The component includes a small `DxCalendar` helper with defaults used by demos:

- `schedules`: an example `ISchedule[]` with one event
- `options`: date display options used for the top label
- `calendars`: default calendar definitions (id, colors)
- `calendarView`: default view options

You can import these defaults in tests or examples (they are not required at runtime):

```ts
import { DxCalendar } from './dx-activity-calendar.data';
console.log(DxCalendar.schedules, DxCalendar.calendars);
```

## ISchedule — shape and common fields

The `ISchedule` type comes from `tui-calendar`. The calendar component uses many of these fields; below are the most commonly used properties with explanations and how `dx-activity-calendar` uses them.

```ts
interface ISchedule {
  id?: string;                // unique id for the schedule
  calendarId?: string;        // which calendar this event belongs to
  title?: string;             // displayed title
  body?: string;              // optional description / body
  start?: Date | string | number; // start date/time
  end?: Date | string | number;   // end date/time
  isAllDay?: boolean;         // all-day event
  category?: 'time' | 'allday' | string; // category used by tui-calendar
  location?: string;          // optional location text
  attendees?: any[];          // optional attendees array
  recurrenceRule?: string;    // recurrence rule (iCal RRULE format)
  isPrivate?: boolean;        // privacy flag
  isReadOnly?: boolean;       // non-editable event
  raw?: any;                  // arbitrary data attached to schedule (component reads `raw.class` for styling)
  state?: any;                // custom state (used by updates in the component)
  isVisible?: boolean;        // visibility flag used by dx-calendar defaults
}
```

## Copyable sample data (realistic)

```ts
import { ISchedule } from 'tui-calendar';

const now = new Date();
const sampleSchedules: ISchedule[] = [
  // time-based meeting
  {
    id: 'evt-1',
    calendarId: '1',
    title: 'Daily Scrum',
    body: 'Standup with dev team',
    category: 'time',
    isAllDay: false,
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 30),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
    isVisible: true,
    raw: { class: 'meeting--standup' }
  },

  // multi-day all-day event
  {
    id: 'evt-2',
    calendarId: '2',
    title: 'Conference — New York',
    body: 'Attending the industry conference',
    category: 'allday',
    isAllDay: true,
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
    isVisible: true,
    raw: { class: 'event--conference' }
  },

  // recurring event example
  {
    id: 'evt-3',
    calendarId: '1',
    title: 'Bi-weekly Sync',
    body: 'Recurring sync every other Monday',
    category: 'time',
    isAllDay: false,
    start: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0),
    end: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0),
    recurrenceRule: 'FREQ=WEEKLY;INTERVAL=2;BYDAY=MO',
    isVisible: true,
    raw: { class: 'event--recurring' }
  }
];

export { sampleSchedules };
```

## Default calendars example

```ts
const calendars = [
  { id: '1', name: 'Work', color: '#fff', bgColor: '#3A5985', dragBgColor: '#89AFE0', borderColor: '#89AFE0' },
  { id: '2', name: 'Personal', color: '#fff', bgColor: '#4caf50', dragBgColor: '#80e27e', borderColor: '#80e27e' }
];
```

## Notes on times and zones

- The component will format display labels using `calenderOptions` (Intl.DateTimeFormatOptions). If you need timezone-aware rendering, pass `calendarSettings.timeZone` with an `ITimezone` object.
- `start` and `end` fields can be `Date`, ISO date strings, or numeric timestamps; `tui-calendar` accepts those variants.

````
