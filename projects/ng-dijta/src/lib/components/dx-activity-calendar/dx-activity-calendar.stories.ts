import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxActivityCalendarComponent } from './dx-activity-calendar.component';
import { DxActivityCalendarModule } from './dx-activity-calendar.module';
import { DxCalendar } from './dx-activity-calendar.data';

const meta: Meta<any> = {
  title: 'Data Display/Activity Calendar',
  component: DxActivityCalendarComponent,
  decorators: [
    moduleMetadata({
      imports: [DxActivityCalendarModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Activity calendar wrapping `tui-calendar`. Supports month / week / day / 2-weeks / ' +
          '3-weeks / work-week views, multiple named calendars (color-tagged), drag-to-create / ' +
          'drag-to-resize schedules, configurable date/time formats, time-zone overrides, and a ' +
          'chunked render pipeline for large schedule sets (`[CHUNK_SIZE]` + `[renderDuration]`). ' +
          'Toolbar emits `calendarViewClicked` / `onChangeMonth`; the schedule lifecycle emits ' +
          '`beforeCreateSchedule` / `beforeUpdateSchedule` / `beforeDeleteSchedule` / `onClickSchedule`.',
      },
    },
  },
  argTypes: {
    calendersList: { control: 'object', description: 'Named calendars (`ICalendarInfo[]`) used as the color/category source for schedules.' },
    schedulesList: { control: 'object', description: 'Schedule entries (`ISchedule[]`).' },
    calendarView: { control: 'object', description: 'Toolbar view list (`CalendarViewModel[]`) — controls which view buttons render.' },
    selectedView: { control: 'object', description: 'Currently active view in the toolbar.' },
    calendarSettings: { control: 'object', description: '`CalendarSettings`: `defaultView`, `dateFormat`, `timeFormat` (12/24), `startDayOfWeek`, `timeZone`, `enableSettingsAction`, `useCreationPopup`, `useDetailPopup`, `enableCalendarsMenu`, `hideActions`, `dayStartAt`, `taskView`.' },
    calenderOptions: { control: 'object', description: 'Intl date-formatting options for the toolbar title (`Intl.DateTimeFormatOptions`).' },
    isReadOnly: { control: 'boolean', description: 'Render the calendar as read-only — schedules are not editable.' },
    toggleMenu: { control: 'boolean', description: 'Whether the side menu is open (paired with the `onClickToggleMenu` output).' },
    CHUNK_SIZE: { control: 'number', description: 'Max schedules rendered per chunk during initial paint.' },
    renderDuration: { control: 'number', description: 'Delay (ms) between chunks — lower = faster but more main-thread work.' },
    calendarViewClicked: { action: 'calendarViewClicked' },
    beforeCreateSchedule: { action: 'beforeCreateSchedule' },
    beforeUpdateSchedule: { action: 'beforeUpdateSchedule' },
    beforeDeleteSchedule: { action: 'beforeDeleteSchedule' },
    onChangeMonth: { action: 'onChangeMonth' },
    onClickSchedule: { action: 'onClickSchedule' },
    onClickSettings: { action: 'onClickSettings' },
    onClickToggleMenu: { action: 'onClickToggleMenu' },
  },
  args: {
    calendersList: DxCalendar.calendars,
    schedulesList: DxCalendar.schedules,
    calendarView: DxCalendar.calendarView,
    selectedView: DxCalendar.calendarView[0],
    calendarSettings: {},
    calenderOptions: DxCalendar.options,
    isReadOnly: false,
    toggleMenu: true,
    CHUNK_SIZE: 50,
    renderDuration: 5000,
  },
};

export default meta;
type Story = StoryObj<any>;

const start = new Date();
const today = (h: number, m = 0) => new Date(new Date().setHours(h, m, 0, 0));
const tomorrow = (h: number, m = 0) => new Date(new Date(start.getTime() + 24 * 3600 * 1000).setHours(h, m, 0, 0));
const inDays = (days: number, h = 9, m = 0) => new Date(new Date(start.getTime() + days * 24 * 3600 * 1000).setHours(h, m, 0, 0));

const TEAM_CALENDARS = [
  { id: '1', name: 'Engineering', color: '#ffffff', bgColor: '#3A5985', dragBgColor: '#89AFE0', borderColor: '#89AFE0' },
  { id: '2', name: 'Design',      color: '#ffffff', bgColor: '#9B59B6', dragBgColor: '#C39BD3', borderColor: '#C39BD3' },
  { id: '3', name: 'QA',          color: '#ffffff', bgColor: '#16A085', dragBgColor: '#76D7C4', borderColor: '#76D7C4' },
  { id: '4', name: 'Personal',    color: '#ffffff', bgColor: '#E67E22', dragBgColor: '#F0B27A', borderColor: '#F0B27A' },
];

const RICH_SCHEDULES = [
  { id: 'a', calendarId: '1', category: 'time',   title: 'Daily standup',          isVisible: true, start: today(9, 30),  end: today(9, 45) },
  { id: 'b', calendarId: '2', category: 'time',   title: 'Design review',          isVisible: true, start: today(11, 0),  end: today(12, 0), location: 'Room A' },
  { id: 'c', calendarId: '1', category: 'time',   title: 'Pairing — auth flow',    isVisible: true, start: today(14, 0),  end: today(15, 30) },
  { id: 'd', calendarId: '3', category: 'time',   title: 'Regression sweep',       isVisible: true, start: tomorrow(10, 0), end: tomorrow(12, 0) },
  { id: 'e', calendarId: '4', category: 'allday', title: 'PTO — half day',         isVisible: true, isAllDay: true,        start: tomorrow(0), end: tomorrow(12) },
  { id: 'f', calendarId: '2', category: 'time',   title: 'Brand workshop',         isVisible: true, start: inDays(2, 13), end: inDays(2, 16) },
  { id: 'g', calendarId: '1', category: 'time',   title: 'Sprint retro',           isVisible: true, start: inDays(3, 15), end: inDays(3, 16) },
  { id: 'h', calendarId: '3', category: 'allday', title: 'Release window',         isVisible: true, isAllDay: true,        start: inDays(4, 0), end: inDays(5, 23, 59) },
];

const FULL_TEMPLATE = `
  <div style="height: 720px;">
    <dx-activity-calendar
      [calendersList]="calendersList"
      [schedulesList]="schedulesList"
      [calendarView]="calendarView"
      [selectedView]="selectedView"
      [calendarSettings]="calendarSettings"
      [calenderOptions]="calenderOptions"
      [isReadOnly]="isReadOnly"
      [toggleMenu]="toggleMenu"
      [CHUNK_SIZE]="CHUNK_SIZE"
      [renderDuration]="renderDuration">
    </dx-activity-calendar>
  </div>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single-calendar month view with one demo schedule.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const MultipleCalendars: Story = {
  name: 'Multiple calendars',
  args: { calendersList: TEAM_CALENDARS, schedulesList: RICH_SCHEDULES },
  parameters: {
    docs: {
      description: {
        story: 'Four named calendars (Engineering / Design / QA / Personal) sharing the grid, each color-tagged from its `ICalendarInfo`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const WeekView: Story = {
  name: 'Default week view',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    selectedView: DxCalendar.calendarView.find(v => v.view === 'week'),
    calendarSettings: { defaultView: 'week' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Open in the weekly view by setting both `[selectedView]` and `calendarSettings.defaultView`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const DayView: Story = {
  name: 'Default day view',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    selectedView: DxCalendar.calendarView.find(v => v.view === 'day'),
    calendarSettings: { defaultView: 'day' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Single-day timeline view — useful for focused agenda screens.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const TwoWeeks: Story = {
  name: '2-week view',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    selectedView: DxCalendar.calendarView.find(v => v.view === '2_WEEKS'),
    calendarSettings: { defaultView: '2_WEEKS' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Renders a 2-week strip — the component still uses the `month` view under the hood with `visibleWeeksCount=2`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const WorkWeek: Story = {
  name: 'Work-week (Mon–Fri)',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    selectedView: DxCalendar.calendarView.find(v => v.view === 'workWeek'),
    calendarSettings: { defaultView: 'workWeek', startDayOfWeek: 1 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Hides Saturday and Sunday — pair with `startDayOfWeek=1` so Monday leads the row.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const StartMonday: Story = {
  name: 'Week starts Monday',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    calendarSettings: { startDayOfWeek: 1, defaultView: 'month' },
  },
  parameters: {
    docs: {
      description: {
        story: '`calendarSettings.startDayOfWeek=1` shifts the leading column to Monday.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Format24h: Story = {
  name: '24-hour clock + ISO date',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    calendarSettings: { timeFormat: 24, dateFormat: 'YYYY-MM-DD', defaultView: 'week' },
    selectedView: DxCalendar.calendarView.find(v => v.view === 'week'),
  },
  parameters: {
    docs: {
      description: {
        story: '24-hour time labels with ISO date formatting in popups — `timeFormat: 24` + `dateFormat: \'YYYY-MM-DD\'`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const ReadOnly: Story = {
  name: 'Read-only',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    isReadOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: '`[isReadOnly]="true"` disables drag-create / edit / delete — the calendar becomes a viewer.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const NoPopups: Story = {
  name: 'No quick-edit popups',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    calendarSettings: { useCreationPopup: false, useDetailPopup: false, defaultView: 'week' },
    selectedView: DxCalendar.calendarView.find(v => v.view === 'week'),
  },
  parameters: {
    docs: {
      description: {
        story: '`useCreationPopup=false` / `useDetailPopup=false` suppress the tui-calendar inline popups so the parent app can render its own create/detail UI off of `beforeCreateSchedule` / `onClickSchedule`.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const DayStartsAt: Story = {
  name: 'Workday starts at 8 AM',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    selectedView: DxCalendar.calendarView.find(v => v.view === 'week'),
    calendarSettings: { dayStartAt: 8, defaultView: 'week' },
  },
  parameters: {
    docs: {
      description: {
        story: '`calendarSettings.dayStartAt=8` scrolls the timeline to start at 08:00 instead of midnight.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const WithTaskView: Story = {
  name: 'With task lane',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    selectedView: DxCalendar.calendarView.find(v => v.view === 'week'),
    calendarSettings: { taskView: true, defaultView: 'week' },
  },
  parameters: {
    docs: {
      description: {
        story: '`calendarSettings.taskView=true` adds the milestone / task lane above the time grid.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const HiddenActions: Story = {
  name: 'Hidden toolbar actions',
  args: {
    calendersList: TEAM_CALENDARS,
    schedulesList: RICH_SCHEDULES,
    calendarSettings: { hideActions: true },
  },
  parameters: {
    docs: {
      description: {
        story: '`calendarSettings.hideActions=true` strips the right-side action buttons — useful for embedded/widget-style usage.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const HighVolume: Story = {
  name: 'High-volume (chunked render)',
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the chunked render pipeline — 300 schedules added in batches via `[CHUNK_SIZE]=25` every 200 ms.',
      },
    },
  },
  render: () => {
    const bulk = Array.from({ length: 300 }, (_, i) => {
      const dayOffset = (i % 28) - 14;
      const hour = 8 + (i % 9);
      return {
        id: `bulk-${i}`,
        calendarId: String((i % 4) + 1),
        category: 'time',
        title: `Meeting ${i + 1}`,
        isVisible: true,
        start: inDays(dayOffset, hour, 0),
        end: inDays(dayOffset, hour, 45),
      };
    });
    return {
      props: {
        calendersList: TEAM_CALENDARS,
        schedulesList: bulk,
        calendarView: DxCalendar.calendarView,
        selectedView: DxCalendar.calendarView[0],
        calendarSettings: {},
        calenderOptions: DxCalendar.options,
        isReadOnly: false,
        toggleMenu: true,
        CHUNK_SIZE: 25,
        renderDuration: 200,
      },
      template: FULL_TEMPLATE,
    };
  },
};

export const Empty: Story = {
  name: 'Empty calendar',
  args: { calendersList: TEAM_CALENDARS, schedulesList: [] },
  parameters: {
    docs: {
      description: {
        story: 'No schedules bound — useful as a starting state for first-run experiences.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};
