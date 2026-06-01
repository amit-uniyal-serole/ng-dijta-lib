import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxTimePickerInputComponent } from './dx-time-picker-input/dx-time-picker-input.component';
import { DxTimepickerModule } from './dx-timepicker.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Time Picker',
  component: DxTimePickerInputComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTimepickerModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Time-of-day input that opens an analog-clock dialog. The display field is read-only — ' +
          'clicking the clock icon triggers the `matTimepicker` dialog which lets the user pick hours, ' +
          'minutes, and (in 12-hour mode) AM/PM. The selected value is emitted on the bound ' +
          '`FormControl` as a `HH:mm:ss` string via `moment`. Supports `[mode]` (12h/24h), ' +
          '`[minDate]`/`[maxDate]` bounds, custom button labels, and the standard `dx-*` outline / ' +
          'labelPosition / outer-label chrome.',
      },
    },
  },
  argTypes: {
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
    mode: {
      control: { type: 'inline-radio' },
      options: ['12h', '24h'],
      description: 'Clock mode — `12h` adds the AM/PM toggle, `24h` removes it.',
    },
    color: {
      control: { type: 'inline-radio' },
      options: ['primary', 'accent', 'warn'],
      description: 'Material theme palette for the clock dialog.',
    },
    okLabel: { control: 'text', description: 'Confirm-button label inside the clock dialog.' },
    cancelLabel: { control: 'text', description: 'Cancel-button label inside the clock dialog.' },
    anteMeridiemAbbreviation: { control: 'text', description: 'Override for the AM abbreviation.' },
    postMeridiemAbbreviation: { control: 'text', description: 'Override for the PM abbreviation.' },
    disableDialogOpenOnClick: { control: 'boolean', description: 'When `true` (default) tapping the input does not open the dialog — only the clock icon does.' },
    strict: { control: 'boolean', description: 'Enforce 24-hour bounds when parsing typed input.' },
    minDate: { control: 'text', description: 'Earliest selectable time, expressed as `HH:mm` (the component normalizes to a `Date` on the same day).' },
    tooltip: { control: 'text', description: 'Placeholder / hover hint text.' },
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render as read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
  },
  args: {
    outline: 'outer-label',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    mode: '12h',
    color: 'primary',
    okLabel: 'Ok',
    cancelLabel: 'Cancel',
    anteMeridiemAbbreviation: 'am',
    postMeridiemAbbreviation: 'pm',
    disableDialogOpenOnClick: true,
    strict: true,
    minDate: '',
    tooltip: 'HH:MM',
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    noneBorder: false,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-time-picker-input
    [formControl]="control"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [mode]="mode"
    [color]="color"
    [okLabel]="okLabel"
    [cancelLabel]="cancelLabel"
    [anteMeridiemAbbreviation]="anteMeridiemAbbreviation"
    [postMeridiemAbbreviation]="postMeridiemAbbreviation"
    [disableDialogOpenOnClick]="disableDialogOpenOnClick"
    [strict]="strict"
    [minDate]="minDate || null"
    [tooltip]="tooltip"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [noneBorder]="noneBorder">
    <p dxLabel>Time</p>
    <dx-label>Time</dx-label>
  </dx-time-picker-input>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty 12-hour time picker. Click the clock icon to open the picker dialog.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected time',
  parameters: {
    docs: {
      description: {
        story: 'Initial value bound as a `HH:mm:ss` string (`09:30:00`). The component parses it via moment into a `Date` for the dialog.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('09:30:00') },
    template: FULL_TEMPLATE,
  }),
};

export const Mode24h: Story = {
  name: '24-hour mode',
  args: { mode: '24h' },
  parameters: {
    docs: {
      description: {
        story: '`[mode]="24h"` switches to a 24-hour clock dial and removes the AM/PM toggle.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('18:15:00') },
    template: FULL_TEMPLATE,
  }),
};

export const CustomLabels: Story = {
  name: 'Custom button + AM/PM labels',
  args: {
    okLabel: 'Set time',
    cancelLabel: 'Back',
    anteMeridiemAbbreviation: 'AM',
    postMeridiemAbbreviation: 'PM',
  },
  parameters: {
    docs: {
      description: {
        story: 'All button labels are localizable — useful for internationalization.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('14:00:00') },
    template: FULL_TEMPLATE,
  }),
};

export const AccentTheme: Story = {
  name: 'Accent palette',
  args: { color: 'accent' },
  parameters: {
    docs: {
      description: {
        story: '`[color]="accent"` paints the clock dial and active marker with the Material accent palette.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('10:00:00') },
    template: FULL_TEMPLATE,
  }),
};

export const OpenOnClick: Story = {
  name: 'Open dialog on field tap',
  args: { disableDialogOpenOnClick: false },
  parameters: {
    docs: {
      description: {
        story: '`[disableDialogOpenOnClick]="false"` opens the picker when the user taps the input itself — by default only the clock icon opens it.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const MinTime: Story = {
  name: 'Minimum time bound',
  args: { minDate: '09:00' },
  parameters: {
    docs: {
      description: {
        story: '`[minDate]` accepts an `HH:mm` string — the component normalizes it to today\'s date at that hour. Times before the bound are disabled in the dialog.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('09:30:00') },
    template: FULL_TEMPLATE,
  }),
};

export const OuterLabel: Story = {
  name: 'Outer label',
  args: { outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Label rendered outside the Material form-field — `outline="outer-label"` + `[dxLabel]`.',
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
        story: 'Outer label placed to the left of the field — for dense form layouts.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Required: Story = {
  args: { required: true },
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
        story: 'Disabled control — both the input and the clock icon are inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: '09:30:00', disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — the value is visible but the dialog cannot be opened.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('09:30:00') },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true },
  parameters: {
    docs: {
      description: {
        story: 'Display-only mode for summary screens.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('09:30:00') },
    template: FULL_TEMPLATE,
  }),
};

export const NoBorder: Story = {
  name: 'Borderless',
  args: { noneBorder: true },
  parameters: {
    docs: {
      description: {
        story: '`[noneBorder]="true"` hides the Material outline — use inside dense rows or tables.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('09:30:00') },
    template: FULL_TEMPLATE,
  }),
};

export const NoLabelSlot: Story = {
  name: 'No label slot',
  args: { noneLabel: true },
  parameters: {
    docs: {
      description: {
        story: '`[noneLabel]="true"` collapses the outer-label slot.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const AsteriskError: Story = {
  name: 'Outer label — asterisk error style',
  args: { outerLabelErrorType: 'astrict-error', required: true },
  parameters: {
    docs: {
      description: {
        story: '`[outerLabelErrorType]="astrict-error"` renders validation state as a red asterisk next to the label.',
      },
    },
  },
  render: (args) => {
    const control = new FormControl(null, Validators.required);
    control.markAsTouched();
    return {
      props: { ...args, control },
      template: FULL_TEMPLATE,
    };
  },
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
      noneFloatingControl: new FormControl('09:30:00'),
      floatingControl: new FormControl('09:30:00'),
      outerLabelControl: new FormControl('09:30:00'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-time-picker-input [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Time</dx-label>
          </dx-time-picker-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-time-picker-input [formControl]="floatingControl" outline="floating">
            <dx-label>Time</dx-label>
          </dx-time-picker-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-time-picker-input [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel>Time</p>
          </dx-time-picker-input>
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
        valueControl: new FormControl('09:30:00'),
        requiredControl,
        disabledControl: new FormControl({ value: '09:30:00', disabled: true }),
        viewOnlyControl: new FormControl('14:15:00'),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-time-picker-input [formControl]="defaultControl" outline="outer-label">
              <p dxLabel>Time</p>
            </dx-time-picker-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-time-picker-input [formControl]="valueControl" outline="outer-label">
              <p dxLabel>Time</p>
            </dx-time-picker-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-time-picker-input [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel>Time</p>
            </dx-time-picker-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-time-picker-input [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel>Time</p>
            </dx-time-picker-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-time-picker-input [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Time</p>
            </dx-time-picker-input>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Time',
    labelText: 'Time',
    prefixIcon: 'schedule',
    suffixIcon: '',
    hintText: 'Pick a time from the clock dialog.',
    errorText: '',
    outline: 'outer-label',
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '`<p dxLabel>` outer-label text. Clear to hide.', table: { category: 'Slots' } },
    labelText: { control: 'text', description: '`<dx-label>` inline label text. Clear to hide.', table: { category: 'Slots' } },
    prefixIcon: { control: 'text', description: '`<dx-prefix>` Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    suffixIcon: { control: 'text', description: '`<dx-suffix>` Material Icons name (alongside the built-in clock icon). Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '`<dx-hint>` helper text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '`<dx-error>` error text. Set a value to show.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the label / prefix / suffix / hint / error projection slots. The clock icon is built-in alongside the `dx-suffix` slot.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-time-picker-input
        [formControl]="control"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [mode]="mode"
        [color]="color"
        [okLabel]="okLabel"
        [cancelLabel]="cancelLabel"
        [anteMeridiemAbbreviation]="anteMeridiemAbbreviation"
        [postMeridiemAbbreviation]="postMeridiemAbbreviation"
        [disableDialogOpenOnClick]="disableDialogOpenOnClick"
        [strict]="strict"
        [minDate]="minDate || null"
        [tooltip]="tooltip"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true" *ngIf="prefixIcon">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true" *ngIf="suffixIcon">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-time-picker-input>
    `,
  }),
};
