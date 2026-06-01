import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxDaterangeComponent } from './dx-daterange.component';
import { DxDaterangeModule } from './dx-daterange.module';

const TODAY = new Date();
const ONE_WEEK_AGO = new Date(TODAY.getTime() - 7 * 24 * 60 * 60 * 1000);
const TWO_WEEKS_AHEAD = new Date(TODAY.getTime() + 14 * 24 * 60 * 60 * 1000);
const MONTH_START = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
const MONTH_END = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0);

const meta: Meta<any> = {
  title: 'Form Inputs/Daterange',
  component: DxDaterangeComponent,
  decorators: [
    moduleMetadata({
      imports: [DxDaterangeModule, ReactiveFormsModule, DxLabelDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Date-range input built on Angular Material `mat-date-range-picker`. Captures a ' +
          'start and end date in a single field with one calendar pop-up. The internal ' +
          '`FormGroup` exposes `{ start, end }` via `ControlValueAccessor` so it plugs into ' +
          'reactive and template-driven forms. Use `[minDate]` / `[maxDate]` to clip the ' +
          'selectable range, and `[startDateRequird]` / `[endDateRequird]` for per-endpoint ' +
          'required validation.',
      },
    },
  },
  argTypes: {
    minDate: { control: 'date', description: 'Earliest selectable date in the calendar.' },
    maxDate: { control: 'date', description: 'Latest selectable date in the calendar.' },
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render as read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode — strips the Material chrome.' },
    required: { control: 'boolean', description: 'Mark the field as required. Renders the asterisk in `outer-label` mode.' },
    startDateRequird: { control: 'boolean', description: 'Require the start date specifically (overrides the field-level `required`).' },
    endDateRequird: { control: 'boolean', description: 'Require the end date specifically (overrides the field-level `required`).' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot (the `[dxLabel]` projection).' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    outline: {
      control: { type: 'inline-radio' },
      options: ['floating', 'none-floating', 'outer-label'],
      description: 'Field label / outline style.',
    },
    outerLabelErrorType: {
      control: { type: 'inline-radio' },
      options: ['astrict-error', 'filled-error'],
      description: 'Validation-error treatment in `outer-label` mode.',
    },
    onDateChange: { action: 'onDateChange', description: 'Fires when either end of the range changes.' },
  },
  args: {
    minDate: undefined,
    maxDate: undefined,
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    startDateRequird: false,
    endDateRequird: false,
    noneLabel: false,
    noneBorder: false,
    outline: 'none-floating',
    outerLabelErrorType: 'filled-error',
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-daterange
    [formControl]="control"
    [minDate]="minDate"
    [maxDate]="maxDate"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [startDateRequird]="startDateRequird"
    [endDateRequird]="endDateRequird"
    [noneLabel]="noneLabel"
    [noneBorder]="noneBorder"
    [outline]="outline"
    [outerLabelErrorType]="outerLabelErrorType">
    <p dxLabel class="mb-0">Period</p>
    <dx-label>Period</dx-label>
  </dx-daterange>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty date-range input. Click the calendar icon to pick a start, then an end date.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected range',
  parameters: {
    docs: {
      description: {
        story: 'Initial range bound via `FormControl({ start, end })`. The control value is always an object with `start` and `end` Date keys.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const WithMinMax: Story = {
  name: 'With min / max date',
  args: { minDate: MONTH_START, maxDate: MONTH_END },
  parameters: {
    docs: {
      description: {
        story: 'Constrains the calendar so users can only pick a range within `[minDate, maxDate]`. Defaults here lock both endpoints to the current month.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const PastRange: Story = {
  name: 'Past dates only',
  args: { maxDate: TODAY },
  parameters: {
    docs: {
      description: {
        story: 'Set `[maxDate]="today"` to lock the picker to past dates — typical for reporting periods.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const FutureRange: Story = {
  name: 'Future dates only',
  args: { minDate: TODAY },
  parameters: {
    docs: {
      description: {
        story: 'Set `[minDate]="today"` to lock the picker to future dates — typical for scheduling.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ start: TODAY, end: TWO_WEEKS_AHEAD }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const OuterLabel: Story = {
  name: 'Outer label',
  args: { outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Label rendered outside the Material form-field — set `outline="outer-label"` and project the label via `[dxLabel]`.',
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

export const Required: Story = {
  args: { required: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Marks the entire range as required. Pair with `Validators.required` on the outer control to enforce a non-empty range.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null, Validators.required) },
    template: FULL_TEMPLATE,
  }),
};

export const StartRequired: Story = {
  name: 'Start date required only',
  args: { startDateRequird: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Use `[startDateRequird]="true"` to enforce only the start endpoint — the end date stays optional. Useful when the field captures an "as of …" filter.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const EndRequired: Story = {
  name: 'End date required only',
  args: { endDateRequird: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Use `[endDateRequird]="true"` to enforce only the end endpoint — the start date stays optional. Useful for deadline-only inputs.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
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
    props: {
      ...args,
      control: new FormControl({
        value: { start: ONE_WEEK_AGO, end: TODAY },
        disabled: true,
      }),
    },
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
    props: {
      ...args,
      control: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
    },
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
    props: {
      ...args,
      control: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const NoBorder: Story = {
  name: 'Borderless',
  args: { noneBorder: true },
  parameters: {
    docs: {
      description: {
        story: '`[noneBorder]="true"` strips the Material outline border. Useful inside table cells or pre-bordered containers.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
    },
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
      noneFloatingControl: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
      floatingControl: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
      outerLabelControl: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-daterange [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Period</dx-label>
          </dx-daterange>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-daterange [formControl]="floatingControl" outline="floating">
            <dx-label>Period</dx-label>
          </dx-daterange>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-daterange [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel class="mb-0">Period</p>
          </dx-daterange>
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
        valueControl: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
        requiredControl,
        disabledControl: new FormControl({
          value: { start: ONE_WEEK_AGO, end: TODAY },
          disabled: true,
        }),
        viewOnlyControl: new FormControl({ start: ONE_WEEK_AGO, end: TODAY }),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-daterange [formControl]="defaultControl" outline="outer-label">
              <p dxLabel class="mb-0">Period</p>
            </dx-daterange>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-daterange [formControl]="valueControl" outline="outer-label">
              <p dxLabel class="mb-0">Period</p>
            </dx-daterange>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-daterange [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel class="mb-0">Period</p>
            </dx-daterange>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-daterange [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel class="mb-0">Period</p>
            </dx-daterange>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-daterange [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel class="mb-0">Period</p>
            </dx-daterange>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Period',
    labelText: 'Period',
    prefixIcon: 'date_range',
    suffixIcon: 'help',
    hintText: 'Pick a start and end date.',
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
      <dx-daterange
        [formControl]="control"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [startDateRequird]="startDateRequird"
        [endDateRequird]="endDateRequird"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder"
        [outline]="outline"
        [outerLabelErrorType]="outerLabelErrorType">
        <p dxLabel class="mb-0">{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-daterange>
    `,
  }),
};
