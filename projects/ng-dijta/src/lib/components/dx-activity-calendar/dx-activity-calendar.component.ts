/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import moment from 'moment';
import Calendar, {
  ICalendarInfo,
  IEventObject,
  IEventScheduleObject,
  IMonthDayNameInfo,
  ISchedule,
  ITimezone
} from 'tui-calendar';
import { DxCalendar } from './dx-activity-calendar.data';
import { CalendarSettings, CalendarViewModel, StartDayOfWeekType } from './dx-activity-calendar.model';

@Component({
  selector: 'dx-activity-calendar',
  templateUrl: './dx-activity-calendar.component.html',
  styleUrls: ['./dx-activity-calendar.component.scss']
})
export class DxActivityCalendarComponent implements AfterViewInit, OnInit, OnChanges, OnDestroy {
  @Input() calendersList!: ICalendarInfo[];
  // @Input() defaultView: any = 2;
  @Input() calenderOptions!: Intl.DateTimeFormatOptions;
  @Input() schedulesList: ISchedule[] = [];
  @Input() calendarView!: CalendarViewModel[];
  @Input() isReadOnly: boolean = false;
  @Output() calendarViewClicked: EventEmitter<CalendarViewModel> =
    new EventEmitter<CalendarViewModel>();
  @Output() beforeCreateSchedule: EventEmitter<ISchedule> =
    new EventEmitter<ISchedule>();
  @Output() beforeUpdateSchedule: EventEmitter<IEventObject> =
    new EventEmitter<IEventObject>();
  @Output() beforeDeleteSchedule: EventEmitter<IEventScheduleObject> =
    new EventEmitter<IEventScheduleObject>();
  @Output() onChangeMonth: EventEmitter<Date> =
    new EventEmitter<Date>();
  @Output() onClickSchedule: EventEmitter<IEventScheduleObject> =
    new EventEmitter<IEventScheduleObject>();
  @Output() onClickSettings: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() onClickToggleMenu: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  calendar!: Calendar;
  currentCalendar!: string;

  @Input() selectedView: CalendarViewModel | undefined =
    DxCalendar.calendarView[0];

  @Input() calendarSettings!: CalendarSettings;
  @Input() toggleMenu: boolean = true;
  timeFormat: 12 | 24 = 12;
  dateFormat: any = 'DD-MM-YYYY';
  startDayOfWeek: StartDayOfWeekType = 0;
  timeZone: ITimezone | undefined;
  dayStartAt: number | undefined;
  useDetailPopup: boolean = true;
  useCreationPopup: boolean = true;
  defaultView: string | undefined;
  enableSettings: boolean | undefined = false;
  timeDisplayFormat: string | undefined;
  enableCalendarsMenu: boolean = false;
  hideActions: boolean = false;
  private intervalId: any
  @Input() CHUNK_SIZE = 50;
  @Input() renderDuration: number = 5000;
  chunkIndex = 0;
  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit(): void {

    this.timeDisplayFormat = this.timeFormat === 12 ? 'hh:mm A' : 'HH:mm';
    this.calenderOptions = this.calenderOptions ?? DxCalendar.options;
    this.calendarView = this.calendarView?.length! > 0 ? this.calendarView : DxCalendar.calendarView;
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calenderRenderer();
      this.cd.detectChanges();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['calendersList']?.previousValue !== changes['calendersList']?.currentValue) {
      this.calendersList = changes['calendersList']?.currentValue;
      this.chunkIndex = 0;
      this.calendar?.setCalendars(this.calendersList);
    }
    if (changes['schedulesList']?.previousValue !== changes['schedulesList']?.currentValue) {
      this.chunkIndex = 0;
      this.schedulesList = changes['schedulesList']?.currentValue;
      this.calendar?.createSchedules(this.schedulesList);
    }
    if (changes['calendarSettings']?.previousValue !== changes['calendarSettings']?.currentValue) {
      this.calendarSettings = changes['calendarSettings']?.currentValue;
      this.upadteCalendarSettings();
    }
    if (changes['toggleMenu']?.previousValue !== changes['toggleMenu']?.currentValue) {
      this.toggleMenu = changes['toggleMenu']?.currentValue;
    }
    if (changes['calendarView']?.previousValue !== changes['calendarView']?.currentValue) {
      this.calendarView = changes['calendarView']?.currentValue;
      if (this.defaultView) {
        this.selectedView = this.calendarView.find(calendar => calendar?.view === this.defaultView)
        if (this.selectedView) {
          this.onChangeCalendarView(this.selectedView!);
        }
      }
    }
    if (changes['selectedView']?.previousValue !== changes['selectedView']?.currentValue) {
      this.selectedView = changes['selectedView']?.currentValue;
      if (this.selectedView) {
        this.onChangeCalendarView(this.selectedView!)
      }
    }

  };
  upadteCalendarSettings(): void {
    const {
      enableSettingsAction,
      dateFormat,
      dayStartAt,
      defaultView,
      startDayOfWeek,
      timeFormat,
      timeZone,
      useCreationPopup,
      useDetailPopup,
      enableCalendarsMenu,
      hideActions
    } = this.calendarSettings;

    this.enableSettings = enableSettingsAction;
    this.dateFormat = dateFormat ?? 'DD-MM-YYYY';
    this.dayStartAt = dayStartAt ?? 0;
    this.defaultView = defaultView ?? 'month';
    this.startDayOfWeek = startDayOfWeek ?? 0;
    this.timeFormat = timeFormat ?? this.timeFormat;
    this.timeZone = timeZone;
    this.useCreationPopup = useCreationPopup ?? true;
    this.useDetailPopup = useDetailPopup ?? true;
    this.selectedView = DxCalendar.calendarView.find(calendar => calendar?.view === this.defaultView)
    this.timeDisplayFormat = this.timeFormat === 12 ? 'hh:mm A' : 'HH:mm';
    this.enableCalendarsMenu = enableCalendarsMenu ?? false;
    this.hideActions = hideActions ?? false;
  }
  calenderRenderer(): void {
    const MONTH_VIEW = !!(this.defaultView === '2_WEEKS' || this.defaultView === '3_WEEKS' || this.defaultView === 'workWeek')
    const useCreationPopup = this.useCreationPopup;
    const useDetailPopup = this.useDetailPopup;
    const dateFormat = this.dateFormat;
    const timeFormat = this.timeFormat;
    this.calendar = new Calendar('#calendar', {
      defaultView: MONTH_VIEW ? 'month' : this.defaultView ?? 'month',
      useCreationPopup: useCreationPopup,
      useDetailPopup: useDetailPopup,
      taskView: this.calendarSettings?.taskView,
      calendars: this.calendersList ?? DxCalendar.calendars,
      isReadOnly: this.isReadOnly,
      template: {
        // Template for all-day events
        allday(event: any) {          
          const color = event?.color || '#000';
          return `
            <div class="d-flex align-items-center gap-2">
              ${event?.raw?.icon ? `<span class="material-icons-outlined" style="color: ${color}"> ${event?.raw?.icon} </span>` : ''}
              <span>${event.title}</span>
            </div>
          `;
        },
        monthDayname: (dayname: IMonthDayNameInfo) => {
          return (
            '<span class="calendar-week-dayname-name">' +
            dayname.label +
            '</span>'
          );
        },
        time: (schedule: ISchedule) => {
          return _getTimeTemplate(schedule, false);
        },
        timegridDisplayPrimaryTime: function (time) {
          var meridiem = time.hour < 12 ? 'AM' : 'PM';
          return timeFormat === 24
            ? time.hour + ":00"
            : `${(time.hour % 12) || 12} ${meridiem}`;
        },
        timegridDisplayTime: function (time) {

          var meridiem = time.hour < 12 ? 'AM' : 'PM';
          return timeFormat === 24
            ? time.hour + ":00"
            : `${(time.hour % 12) || 12} ${meridiem}`;
        },
        timegridCurrentTime(time) {
          const date = moment(new Date(Number(time.hourmarker.getTime()))).format(timeDisplayFormat);
          return date;
        },
        popupDetailDate(isAllDay, start: any, end: any) {
          const isSameDateAndTime = new Date(start).getTime() === new Date(end).getTime();

          var isSameDate = end ? moment(start).isSame(end) : false;
          var endFormat = (isSameDate ? '' : `${dateFormat} `) + `${timeDisplayFormat}`;

          if (isAllDay) {
            return `${moment(new Date(start)).format(`${dateFormat}`)} ${end ? (isSameDate ? '' : ' - ' + moment(new Date(end)).format(`${dateFormat}`)) : ''}`;
          }
          return `${moment(new Date(start)).format(`${dateFormat} ${timeDisplayFormat}`)} ${end && !isSameDateAndTime ? ' - ' + moment(new Date(end)).format(endFormat) : ''}`

        }
      },
      timezones: this.timeZone ? [
        this.timeZone,
      ] : [],
      week: {
        startDayOfWeek: this.startDayOfWeek,

      },
      month: {
        startDayOfWeek: this.startDayOfWeek,
      },
      usageStatistics: false,
    });
    if (this.dayStartAt) {
      this.calendar?.setOptions({
        week: {
          hourStart: this.dayStartAt
        }
      })
    }
    if (this.defaultView) {
      this.selectedView = this.calendarView.find(calendar => calendar?.view === this.defaultView);
      if (this.selectedView) {
        this.onChangeCalendarView(this.selectedView!);
      }
    }
    this.renderChunk();
    this.displayDate();
    const cal: Calendar = this.calendar;
    const beforeCreateSchedule: EventEmitter<ISchedule> = this.beforeCreateSchedule;
    const beforeUpdateSchedule: EventEmitter<IEventObject> = this.beforeUpdateSchedule;
    const beforeDeleteSchedule: EventEmitter<IEventScheduleObject> = this.beforeDeleteSchedule;
    const onClickSchedule: EventEmitter<IEventScheduleObject> = this.onClickSchedule;

    const timeDisplayFormat = this.timeDisplayFormat;
    this.calendar?.on({
      clickSchedule: function (e) {
        onClickSchedule.emit(e);
      },

      beforeCreateSchedule: function (scheduleData: any) {
        if (useCreationPopup) {
          const schedule: ISchedule = {
            id: String(Math.random()),
            title: `${String(scheduleData?.title)}`,
            isAllDay: scheduleData?.isAllDay,
            start: scheduleData?.start,
            end: scheduleData?.end,
            category: scheduleData?.isAllDay ? 'allday' : 'time',
            location: scheduleData?.location,
            raw: {
              class: scheduleData?.raw?.class,
            },
            state: scheduleData.state,
            calendarId: scheduleData.calendarId,
            isPrivate: scheduleData.isPrivate,
          };
          beforeCreateSchedule.emit(schedule);
          cal.createSchedules([schedule]);
        } else {
          if (document.querySelector('.tui-full-calendar-time-guide-creation-label')) {
            (document.querySelector('.tui-full-calendar-time-guide-creation-label') as any)!.innerText = '';
          }
          beforeCreateSchedule.emit(scheduleData);
        }
      },
      beforeUpdateSchedule: function (e: IEventObject) {
        beforeUpdateSchedule.emit(e);
        e.schedule.start = e.start;
        e.schedule.end = e.end;
        cal.updateSchedule(
          String(e?.schedule?.id),
          String(e?.schedule?.calendarId),
          e?.changes as ISchedule
        );
      },
      beforeDeleteSchedule: function (e: IEventScheduleObject) {
        beforeDeleteSchedule.emit(e);
        cal.deleteSchedule(
          String(e.schedule.id),
          String(e.schedule.calendarId)
        );
      },
    });
    function _getFormattedTime(schedule: ISchedule) {
      const formattedTime = moment(new Date(Number(schedule?.start))).format(timeDisplayFormat);
      return schedule?.isAllDay ? `` : `${formattedTime}`;
    }
    function _getTimeTemplate(schedule: ISchedule, isAllDay: boolean) {
      const html: string[] = [];

      if (!isAllDay) {
        html.push(
          '<strong>' + _getFormattedTime(schedule) + '</strong> '
        );
      }
      if (schedule?.isPrivate) {
        html.push('<span class="calendar-font-icon ic-lock-b"></span>');
        html.push(' Private');
      } else {
        if (schedule?.isReadOnly) {
          html.push('<span class="calendar-font-icon ic-readonly-b"></span>');
        } else if (schedule?.recurrenceRule) {
          html.push('<span class="calendar-font-icon ic-repeat-b"></span>');
        } else if (schedule?.attendees?.length) {
          html.push('<span class="calendar-font-icon ic-user-b"></span>');
        } else if (schedule?.location) {
          html.push('<span class="calendar-font-icon ic-location-b"></span>');
        }
        html.push(`${' '}${String(schedule?.title)}`);
      }

      return html.join('');
    }


  }

  renderChunk = () => {
    if (this.chunkIndex < this.schedulesList.length) {
      // Slice the remaining schedules
      const chunk = this.schedulesList.slice(this.chunkIndex, this.chunkIndex + this.CHUNK_SIZE);
      this.calendar?.createSchedules(chunk);
      this.chunkIndex += this.CHUNK_SIZE;

      // Schedule the next chunk
      this.intervalId = setTimeout(this.renderChunk, this.renderDuration); // Defer to avoid freezing the UI
    } else {
      // Clear the timeout when all schedules are processed
      clearTimeout(this.intervalId);
      const schedule = this.schedulesList.slice(-2);
      if (schedule.length > 2 && schedule.length > 0) {
        this.calendar?.createSchedules(schedule);
      }
    }
  };



  onClickToday(): void {
    this.calendar.today();
    this.getMonth();
    this.displayDate();
  }
  onClickPrevious(): void {
    this.calendar.prev();
    this.getMonth();
    this.displayDate();
  }
  onClickNext(): void {
    this.calendar.next();
    this.getMonth();
    this.displayDate();
  }

  getMonth(): void {
    this.onChangeMonth.emit(this.calendar?.getDate().toDate())
  }

  displayDate(): void {
    if (this.calendar?.getViewName() === 'month') {
      this.currentCalendar = this.calendar
        .getDate()
        .toDate()
        .toLocaleDateString('en-US', this.calenderOptions);
    } else {
      const startDate = new Date(this.calendar?.getDateRangeStart().toDate());
      const endDate = new Date(this.calendar?.getDateRangeEnd().toDate());
      this.currentCalendar = this.calendar?.getViewName() === 'day'
        ? `${moment(startDate).format(this.dateFormat)}`
        : `${moment(startDate).format(this.dateFormat)}` + ' ~ ' + `${moment(endDate).format(this.dateFormat)}`;
    }
  }
  onChangeCalendarView(event: CalendarViewModel): void {
    if (this.calendar) {
      this.calendarViewClicked.emit(event);
      this.selectedView = event;
      const calendarView: string | number = event?.view;
      if (calendarView == 'day' || calendarView == 'week') {
        this.calendar?.setOptions({ month: { workweek: false }, week: { workweek: false } }, true);
        this.calendar?.changeView(calendarView, true);
      } else if (calendarView == 'month') {
        this.calendar?.setOptions({ month: { visibleWeeksCount: undefined, startDayOfWeek: this.startDayOfWeek, workweek: false }, week: { startDayOfWeek: this.startDayOfWeek, workweek: false } }, true);
        this.calendar?.changeView('month', true);
      } else if (calendarView === '2_WEEKS' || calendarView === '3_WEEKS') {
        this.calendar?.setOptions(
          { month: { visibleWeeksCount: calendarView === '2_WEEKS' ? 2 : 3, workweek: false } },
          true
        );
        this.calendar?.changeView('month', true);
      } else if (calendarView === 'workWeek') {

        this.calendar?.setOptions({ week: { workweek: true }, month: { workweek: true, visibleWeeksCount: undefined } }, true);
        this.calendar?.setOptions({ month: { workweek: true, visibleWeeksCount: undefined }, week: { workweek: true } }, true);
        this.calendar?.changeView('month', true);
      }
      this.displayDate();
    }
  }
  onClickSettingsAction(): void {
    this.onClickSettings.emit()
  }

  onClickToggleAction(): void {
    this.onClickToggleMenu.emit(this.toggleMenu);
  }
  ngOnDestroy() {
    // Clear the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}