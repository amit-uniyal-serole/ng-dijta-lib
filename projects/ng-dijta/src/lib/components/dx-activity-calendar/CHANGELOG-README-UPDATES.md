# README & model updates — dx-activity-calendar

Date: 2026-01-13

This file summarizes documentation updates made to the `dx-activity-calendar` component and associated model/data files.

Files added/updated
- `dx-activity-calendar/README.md` — replaced with a detailed reference including inputs, outputs, calendarSettings docs, usage examples, and performance tips (chunked rendering).
- `dx-activity-calendar/dx-activity-calendar.model.md` — NEW: documents model types (`CalendarSettings`, `CalendarViewModel`) and provides copyable `calendarSettings` and `calendarView` examples.
- `dx-activity-calendar/dx-activity-calendar.data.md` — NEW: documents default `DxCalendar` values and provides realistic, copyable `ISchedule` examples and calendar definitions.

Why
- The original README had minimal or generated content that did not reflect the real API surface. These docs were created by extracting types, inputs and outputs from the component source and related model/data files to provide accurate, copy-paste ready documentation for developers integrating the component.

How to use
- For quick examples copy the arrays from `dx-activity-calendar.data.md` and assign them to your component's `calendars`, `schedules` and `calendarSettings` inputs.

Next steps (optional)
- Add small unit/integration examples in `practice/src` to demonstrate the calendar with mock data and server sync examples.
- Generate READMEs for other large components in the library (I can continue in batches).
