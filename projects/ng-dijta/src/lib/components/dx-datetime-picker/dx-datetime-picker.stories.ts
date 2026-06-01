import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxDatetimePickerComponent } from './dx-datetime-picker.component';
import { DxDatetimePickerModule } from './dx-datetime-picker.module';

const NOW = new Date();
const ONE_WEEK_AGO = new Date(NOW.getTime() - 7 * 24 * 60 * 60 * 1000);
const ONE_WEEK_AHEAD = new Date(NOW.getTime() + 7 * 24 * 60 * 60 * 1000);
const MONTH_START = new Date(NOW.getFullYear(), NOW.getMonth(), 1);
const MONTH_END = new Date(NOW.getFullYear(), NOW.getMonth() + 1, 0);

const meta: Meta<any> = {
  title: 'Form Inputs/Datetime Picker',
  component: DxDatetimePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [DxDatetimePickerModule, ReactiveFormsModule, DxLabelDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Combined date + time input built on a `ngx-mat-datetime-picker` overlay. Captures ' +
          'a single `Date` value with calendar + hour/minute (+ optional seconds) controls in ' +
          'one popup. Supports min/max bounds, step sizes for the time spinners, 12-h vs 24-h ' +
          'modes via `[enableMeridian]`, a touch-friendly large UI via `[touchUi]`, and three ' +
          'label layouts. Implements `ControlValueAccessor` + `Validator` for reactive and ' +
          'template-driven forms.',
      },
    },
  },
  argTypes: {
    minDate: { control: 'date', description: 'Earliest selectable date.' },
    maxDate: { control: 'date', description: 'Latest selectable date.' },
    startAt: { control: 'date', description: 'Initial calendar position when the picker opens (does not set the value).' },
    showSpinners: { control: 'boolean', description: 'Show up/down spinners on the hour/minute/second fields.' },
    showSeconds: { control: 'boolean', description: 'Render a seconds field alongside hours/minutes.' },
    enableMeridian: { control: 'boolean', description: 'Use 12-hour mode with AM/PM toggle. Set `false` for 24-hour.' },
    touchUi: { control: 'boolean', description: 'Render the picker as a full-screen dialog instead of an anchored popup — better for touch devices.' },
    stepHour: { control: 'number', description: 'Hour increment applied by the spinner buttons.' },
    stepMinute: { control: 'number', description: 'Minute increment applied by the spinner buttons.' },
    stepSecond: { control: 'number', description: 'Second increment applied by the spinner buttons.' },
    color: {
      control: { type: 'inline-radio' },
      options: ['primary', 'accent', 'warn'],
      description: 'Material `ThemePalette` applied to the picker chrome.',
    },
    defaultTime: { control: 'object', description: 'Initial `[hour, minute, second]` array used when the user picks a date but hasn\'t set a time yet.' },
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render as read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    outline: {
      control: { type: 'inline-radio' },
      options: ['floating', 'none-floating', 'outer-label'],
      description: 'Field label / outline style.',
    },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'top'],
      description: 'Outer-label placement (only effective with `outline="outer-label"`).',
    },
    outerLabelErrorType: {
      control: { type: 'inline-radio' },
      options: ['astrict-error', 'filled-error'],
      description: 'Validation-error treatment in `outer-label` mode.',
    },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    onDateChange: { action: 'onDateChange', description: 'Fires when the picked datetime changes.' },
  },
  args: {
    showSpinners: true,
    showSeconds: false,
    touchUi: false,
    enableMeridian: true,
    minDate: undefined,
    maxDate: undefined,
    startAt: undefined,
    stepHour: 1,
    stepMinute: 1,
    stepSecond: 1,
    color: 'primary',
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    outline: 'none-floating',
    tabIndex: 0,
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    defaultTime: [],
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-datetime-picker
    [formControl]="control"
    [showSpinners]="showSpinners"
    [showSeconds]="showSeconds"
    [touchUi]="touchUi"
    [enableMeridian]="enableMeridian"
    [minDate]="minDate"
    [maxDate]="maxDate"
    [startAt]="startAt"
    [stepHour]="stepHour"
    [stepMinute]="stepMinute"
    [stepSecond]="stepSecond"
    [color]="color"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [defaultTime]="defaultTime"
    [tabIndex]="tabIndex">
    <p dxLabel class="mb-0">Date &amp; time</p>
    <dx-label>Date &amp; time</dx-label>
  </dx-datetime-picker>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline date + time input. Click the calendar icon to open the combined picker.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected value',
  parameters: {
    docs: {
      description: {
        story: 'Initial datetime supplied via the bound `FormControl(Date)`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const TwentyFourHour: Story = {
  name: '24-hour mode',
  args: { enableMeridian: false },
  parameters: {
    docs: {
      description: {
        story: '`[enableMeridian]="false"` switches the time picker from 12-h (AM/PM toggle) to 24-h mode.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const WithSeconds: Story = {
  name: 'With seconds',
  args: { showSeconds: true },
  parameters: {
    docs: {
      description: {
        story: '`[showSeconds]="true"` adds a seconds field to the time row — useful for log timestamps or precise scheduling.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const NoSpinners: Story = {
  name: 'Without spinners',
  args: { showSpinners: false },
  parameters: {
    docs: {
      description: {
        story: '`[showSpinners]="false"` removes the up/down arrows next to hours/minutes — users edit time by direct keystrokes.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const TouchUi: Story = {
  name: 'Touch UI (dialog)',
  args: { touchUi: true },
  parameters: {
    docs: {
      description: {
        story: '`[touchUi]="true"` renders the picker as a full-screen Material dialog — preferred on touch devices.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const QuarterHourSteps: Story = {
  name: '15-minute step',
  args: { stepMinute: 15 },
  parameters: {
    docs: {
      description: {
        story: '`[stepMinute]="15"` snaps the minute spinner to 15-minute increments. Pair with `[stepHour]` and `[stepSecond]` to coarsen each axis independently.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const WithMinMax: Story = {
  name: 'With min / max date',
  args: { minDate: MONTH_START, maxDate: MONTH_END },
  parameters: {
    docs: {
      description: {
        story: '`[minDate]` and `[maxDate]` clip the selectable range. Defaults here lock the picker to the current month.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const PastOnly: Story = {
  name: 'Past dates only',
  args: { maxDate: NOW },
  parameters: {
    docs: {
      description: {
        story: 'Set `[maxDate]="today"` to lock the picker to past dates. Typical for audit logs / "from" filters.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(ONE_WEEK_AGO) },
    template: FULL_TEMPLATE,
  }),
};

export const FutureOnly: Story = {
  name: 'Future dates only',
  args: { minDate: NOW },
  parameters: {
    docs: {
      description: {
        story: 'Set `[minDate]="today"` to lock the picker to future dates. Typical for scheduling.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(ONE_WEEK_AHEAD) },
    template: FULL_TEMPLATE,
  }),
};

export const AccentColor: Story = {
  name: 'Accent palette',
  args: { color: 'accent' as any },
  parameters: {
    docs: {
      description: {
        story: 'Apply Material\'s `accent` theme palette to the picker chrome. Supported values: `primary` (default), `accent`, `warn`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const OuterLabel: Story = {
  name: 'Outer label',
  args: { outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Label rendered outside the Material form-field — set `outline="outer-label"` and project via `[dxLabel]`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const FloatingLabel: Story = {
  name: 'Floating label',
  args: { outline: 'floating' },
  parameters: {
    docs: {
      description: {
        story: 'Floating Material label that animates into the outline on focus.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const LabelLeft: Story = {
  name: 'Outer label — left position',
  args: { outline: 'outer-label', labelPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Outer label placed to the left of the field — useful in dense form layouts.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Required: Story = {
  args: { required: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Marks the field as required. Pair with `Validators.required` on the bound control.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null, Validators.required) },
    template: FULL_TEMPLATE,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled control — the calendar icon and inputs are inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: NOW, disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — focusable but the picker can\'t be opened.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Display-only mode for summary screens. Material chrome stripped.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(NOW) },
    template: FULL_TEMPLATE,
  }),
};

export const AllVariants: Story = {
  name: 'All label variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every supported `outline` value.',
      },
    },
  },
  render: () => ({
    props: {
      noneFloatingControl: new FormControl(NOW),
      floatingControl: new FormControl(NOW),
      outerLabelControl: new FormControl(NOW),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-datetime-picker [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Date &amp; time</dx-label>
          </dx-datetime-picker>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-datetime-picker [formControl]="floatingControl" outline="floating">
            <dx-label>Date &amp; time</dx-label>
          </dx-datetime-picker>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-datetime-picker [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel class="mb-0">Date &amp; time</p>
          </dx-datetime-picker>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, with value, required (touched), disabled, view-only.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl(null, Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        defaultControl: new FormControl(null),
        valueControl: new FormControl(NOW),
        requiredControl,
        disabledControl: new FormControl({ value: NOW, disabled: true }),
        viewOnlyControl: new FormControl(NOW),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-datetime-picker [formControl]="defaultControl" outline="outer-label">
              <p dxLabel class="mb-0">Date &amp; time</p>
            </dx-datetime-picker>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-datetime-picker [formControl]="valueControl" outline="outer-label">
              <p dxLabel class="mb-0">Date &amp; time</p>
            </dx-datetime-picker>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-datetime-picker [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel class="mb-0">Date &amp; time</p>
            </dx-datetime-picker>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-datetime-picker [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel class="mb-0">Date &amp; time</p>
            </dx-datetime-picker>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-datetime-picker [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel class="mb-0">Date &amp; time</p>
            </dx-datetime-picker>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Date & time',
    labelText: 'Date & time',
    prefixIcon: 'schedule',
    suffixIcon: 'help',
    hintText: 'Pick a date and time.',
    errorText: '',
    outline: 'outer-label',
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '`<p dxLabel>` outer-label text. Clear to hide.', table: { category: 'Slots' } },
    labelText: { control: 'text', description: '`<dx-label>` inline label text. Clear to hide.', table: { category: 'Slots' } },
    prefixIcon: { control: 'text', description: '`<dx-prefix>` Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    suffixIcon: { control: 'text', description: '`<dx-suffix>` Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '`<dx-hint>` helper text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '`<dx-error>` error text. Set a value to show.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates every content-projection slot: outer label, inner label, prefix icon, suffix icon, hint, and error.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-datetime-picker
        [formControl]="control"
        [showSpinners]="showSpinners"
        [showSeconds]="showSeconds"
        [touchUi]="touchUi"
        [enableMeridian]="enableMeridian"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [startAt]="startAt"
        [stepHour]="stepHour"
        [stepMinute]="stepMinute"
        [stepSecond]="stepSecond"
        [color]="color"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [defaultTime]="defaultTime"
        [tabIndex]="tabIndex">
        <p dxLabel class="mb-0">{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-datetime-picker>
    `,
  }),
};
