import { ICalendarInfo, ISchedule } from 'tui-calendar';
import { CalendarViewModel } from './dx-activity-calendar.model';
const start: Date = new Date();
export class DxCalendar {
  static readonly schedules: ISchedule[] = [
    {
      calendarId: '1',
      category: 'time',
      isVisible: true,
      title: 'Daily Scrum - Salama,PolicyFest,Altheqa',
      id: '1',
      body: 'Description',
      start: new Date(new Date().setHours(start.getHours() + 1)),
      end: new Date(new Date().setHours(start.getHours() + 2)),
    },
  ];
  static readonly options: Intl.DateTimeFormatOptions = {
    month: 'long', //to display the full name of the month
    year: 'numeric',
  };
  static readonly calendars: ICalendarInfo[] = [
    {
      id: '1',
      name: 'Serole',
      color: '#ffffff',
      bgColor: '#3A5985',
      dragBgColor: '#89AFE0',
      borderColor: '#89AFE0',
    },
  ];
  static readonly calendarView: CalendarViewModel[] = [
    { view: 'month', name: 'Monthly', icon: 'calendar_view_month' },
    { view: 'day', name: 'Daily', icon: 'calendar_view_day' },
    { view: 'week', name: 'Weekly', icon: 'view_week' },
    { view: '2_WEEKS', name: '2 Weeks', icon: 'view_module' },
    { view: '3_WEEKS', name: '3 Weeks', icon: 'grid_on' },
    { view: 'workWeek', name: 'Work Week', icon: 'calendar_view_week' },
  ];
}
