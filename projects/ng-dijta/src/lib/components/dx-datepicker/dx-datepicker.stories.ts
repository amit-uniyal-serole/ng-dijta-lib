import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxDatepickerComponent } from './dx-datepicker.component';
import { DxDatepickerModule } from './dx-datepicker.module';

const TODAY = new Date();
const ONE_WEEK_AGO = new Date(TODAY.getTime() - 7 * 24 * 60 * 60 * 1000);
const ONE_MONTH_AHEAD = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, TODAY.getDate());
const MIN_RANGE = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
const MAX_RANGE = new Date(TODAY.getFullYear(), TODAY.getMonth() + 1, 0);

const meta: Meta<any> = {
  title: 'Form Inputs/Datepicker',
  component: DxDatepickerComponent,
  decorators: [
    moduleMetadata({
      imports: [DxDatepickerModule, ReactiveFormsModule, DxLabelDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Single-date input built on Angular Material `mat-datepicker`. Wraps the Material ' +
          'primitive with the shared `dx-*` field chrome (three label layouts, outer-label ' +
          'placement, error styling) and reactive-form validation via `ControlValueAccessor` + ' +
          '`Validator`. Reads the default date format (e.g. `YYYY/MM/DD`) from the library-wide ' +
          '`UI_COMPONENT_CONFIG` provider. Use `[minDate]` / `[maxDate]` to enforce a date range.',
      },
    },
  },
  argTypes: {
    minDate: { control: 'date', description: 'Earliest selectable date. Dates before this are disabled in the calendar.' },
    maxDate: { control: 'date', description: 'Latest selectable date. Dates after this are disabled in the calendar.' },
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render as read-only — focusable but the picker can\'t be opened.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode — strips the Material chrome.' },
    required: { control: 'boolean', description: 'Mark as required. Renders the asterisk in `outer-label` mode.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot (the `[dxLabel]` projection).' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    outline: {
      control: { type: 'inline-radio' },
      options: ['floating', 'none-floating', 'outer-label'],
      description: 'Field label / outline style.',
    },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'top'],
      description: 'Outer-label placement. Only effective with `outline="outer-label"`.',
    },
    outerLabelErrorType: {
      control: { type: 'inline-radio' },
      options: ['astrict-error', 'filled-error'],
      description: 'Validation-error treatment in `outer-label` mode.',
    },
    tooltip: { control: 'text', description: 'Tooltip / placeholder text.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    id: { control: false, description: 'DOM id. Auto-generated as `dx-input-date-{N}` when omitted.' },
    onDateChange: { action: 'onDateChange', description: 'Fires when the picker value changes.' },
  },
  args: {
    minDate: undefined,
    maxDate: undefined,
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    noneBorder: false,
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    tooltip: 'Pick a date',
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-datepicker
    [formControl]="control"
    [minDate]="minDate"
    [maxDate]="maxDate"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [noneBorder]="noneBorder"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [tooltip]="tooltip"
    [tabIndex]="tabIndex">
    <p dxLabel class="mb-0">Date</p>
    <dx-label>Date</dx-label>
  </dx-datepicker>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline single-date input. Click the calendar icon to open the picker.',
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
        story: 'Initial date supplied via the bound `FormControl`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(TODAY) },
    template: FULL_TEMPLATE,
  }),
};

export const WithRange: Story = {
  name: 'With min / max date',
  args: { minDate: MIN_RANGE, maxDate: MAX_RANGE },
  parameters: {
    docs: {
      description: {
        story:
          'Constrains the calendar to a date range — dates outside `[minDate, maxDate]` ' +
          'are disabled. Defaults here cap the picker to the current calendar month.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const PastDatesOnly: Story = {
  name: 'Past dates only',
  args: { maxDate: TODAY },
  parameters: {
    docs: {
      description: {
        story: 'Set `[maxDate]="today"` to lock the picker to past dates (e.g. date-of-birth, "from" filters).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(ONE_WEEK_AGO) },
    template: FULL_TEMPLATE,
  }),
};

export const FutureDatesOnly: Story = {
  name: 'Future dates only',
  args: { minDate: TODAY },
  parameters: {
    docs: {
      description: {
        story: 'Set `[minDate]="today"` to lock the picker to future dates (e.g. delivery date, scheduled event).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(ONE_MONTH_AHEAD) },
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

export const LabelLeft: Story = {
  name: 'Outer label — left position',
  args: { outline: 'outer-label', labelPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Outer label placed to the left of the field. Useful in dense form layouts.',
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
        story: 'Required field. Pair with `Validators.required` on the bound control to enforce a value.',
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
        story: 'Disabled control — the calendar icon and input are inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: TODAY, disabled: true }) },
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
    props: { ...args, control: new FormControl(TODAY) },
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
    props: { ...args, control: new FormControl(TODAY) },
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
    props: { ...args, control: new FormControl(TODAY) },
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
      noneFloatingControl: new FormControl(TODAY),
      floatingControl: new FormControl(TODAY),
      outerLabelControl: new FormControl(TODAY),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-datepicker [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Date</dx-label>
          </dx-datepicker>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-datepicker [formControl]="floatingControl" outline="floating">
            <dx-label>Date</dx-label>
          </dx-datepicker>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-datepicker [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel class="mb-0">Date</p>
          </dx-datepicker>
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
        valueControl: new FormControl(TODAY),
        requiredControl,
        disabledControl: new FormControl({ value: TODAY, disabled: true }),
        viewOnlyControl: new FormControl(TODAY),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-datepicker [formControl]="defaultControl" outline="outer-label">
              <p dxLabel class="mb-0">Date</p>
            </dx-datepicker>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-datepicker [formControl]="valueControl" outline="outer-label">
              <p dxLabel class="mb-0">Date</p>
            </dx-datepicker>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-datepicker [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel class="mb-0">Date</p>
            </dx-datepicker>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-datepicker [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel class="mb-0">Date</p>
            </dx-datepicker>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-datepicker [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel class="mb-0">Date</p>
            </dx-datepicker>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Date',
    labelText: 'Date',
    prefixIcon: 'event',
    suffixIcon: 'help',
    hintText: 'Pick a date from the calendar.',
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
      <dx-datepicker
        [formControl]="control"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [tooltip]="tooltip"
        [tabIndex]="tabIndex">
        <p dxLabel class="mb-0">{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-datepicker>
    `,
  }),
};
