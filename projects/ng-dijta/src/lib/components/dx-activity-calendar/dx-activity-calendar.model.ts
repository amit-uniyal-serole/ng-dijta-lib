import { ITimezone } from "tui-calendar";

export type calendarDisplayViewType =
  | 'month'
  | 'day'
  | 'week'
  | '2_WEEKS'
  | '3_WEEKS'
  | 'workWeek';
export interface CalendarViewModel {
  view: calendarDisplayViewType;
  name: string;
  icon?: string;
}
export type CalendatDateFormatType = 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD';
export type StartDayOfWeekType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface CalendarSettings {
  enableSettingsAction?: boolean;
  timeFormat?: 12 | 24;
  dateFormat?: CalendatDateFormatType;
  startDayOfWeek?: StartDayOfWeekType;
  timeZone?: ITimezone | undefined;
  dayStartAt?: number | undefined;
  defaultView?: 'day' | 'month' | 'week' | '2_WEEKS' | '3_WEEKS' | 'workWeek';
  useDetailPopup?: boolean;
  useCreationPopup?: boolean;
  taskView?:boolean | string[];
  enableCalendarsMenu?:boolean;
  hideActions?:boolean;
}