import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxNumberComponent } from './dx-number.component';
import { DxNumberModule } from './dx-number.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Number',
  component: DxNumberComponent,
  decorators: [
    moduleMetadata({
      imports: [DxNumberModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Numeric input wrapping `mat-form-field` + `matInput type="number"`. Adds the ' +
          '`appNumberInput` directive for digit-only entry, precision-based decimal capping, ' +
          'optional thousand-separator formatting, and shorthand currency suffixes ' +
          '(K / M / B / T / Q). Built-in validator enforces the pattern ' +
          '`^[KMTQ0-9]\\d*(\\.\\d+)?$` plus optional `minLength` / `maxLength`. Implements ' +
          '`ControlValueAccessor` + `Validator` and shares the standard `dx-*` outline / ' +
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
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render the input as read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    seprater: { control: 'boolean', description: 'Insert thousand separators (e.g. `1,234,567`) via the `appNumberInput` directive.' },
    precision: { control: 'number', description: 'Maximum decimal digits enforced by the `appNumberInput` directive. `0` = integer only.' },
    minLength: { control: 'number', description: 'Minimum digit length (applies `Validators.minLength`).' },
    maxLength: { control: 'number', description: 'Maximum digit length capped by the directive and `Validators.maxLength`.' },
    tooltip: { control: 'text', description: 'Native placeholder text inside the input.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
  },
  args: {
    outline: 'outer-label',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    noneBorder: false,
    seprater: false,
    precision: 0,
    minLength: 0,
    maxLength: 0,
    tooltip: 'Enter a number',
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-number
    [formControl]="control"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [noneBorder]="noneBorder"
    [seprater]="seprater"
    [precision]="precision"
    [minLength]="minLength"
    [maxLength]="maxLength"
    [tooltip]="tooltip"
    [tabIndex]="tabIndex">
    <p dxLabel>Amount</p>
    <dx-label>Amount</dx-label>
  </dx-number>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty numeric input — integer only (`precision=0`).',
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
        story: 'Initial value bound via `FormControl(1250)`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1250) },
    template: FULL_TEMPLATE,
  }),
};

export const WithDecimals: Story = {
  name: 'With decimals (precision)',
  args: { precision: 2 },
  parameters: {
    docs: {
      description: {
        story: '`[precision]="2"` lets the user enter up to two decimal places. `precision=0` would block the decimal point entirely.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1234.56) },
    template: FULL_TEMPLATE,
  }),
};

export const ThousandSeparator: Story = {
  name: 'Thousand separator',
  args: { seprater: true, precision: 2 },
  parameters: {
    docs: {
      description: {
        story: '`[seprater]="true"` enables thousand separators (`1,234,567.89`) via the `appNumberInput` directive.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1234567.89) },
    template: FULL_TEMPLATE,
  }),
};

export const ShorthandSuffix: Story = {
  name: 'Shorthand suffixes (K/M/B)',
  parameters: {
    docs: {
      description: {
        story: 'The built-in pattern (`^[KMTQ0-9]\\d*(\\.\\d+)?$`) accepts shorthand suffixes — `K` (thousand), `M` (million), `B` (billion), `T` (trillion), `Q` (quadrillion).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('5M') },
    template: FULL_TEMPLATE,
  }),
};

export const LengthLimits: Story = {
  name: 'Min / max length',
  args: { minLength: 3, maxLength: 8 },
  parameters: {
    docs: {
      description: {
        story: '`[minLength]` / `[maxLength]` wire up `Validators.minLength` / `Validators.maxLength`. The directive also caps typing at `maxLength`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('') },
    template: FULL_TEMPLATE,
  }),
};

export const WithTooltip: Story = {
  name: 'With placeholder hint',
  args: { tooltip: 'e.g. 1500' },
  parameters: {
    docs: {
      description: {
        story: '`[tooltip]` is forwarded as the native placeholder.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
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
        story: 'Disabled control — the input is inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: 1250, disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — focusable but the value cannot be changed.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1250) },
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
    props: { ...args, control: new FormControl(1250) },
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
    props: { ...args, control: new FormControl(1250) },
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
      noneFloatingControl: new FormControl(1250),
      floatingControl: new FormControl(1250),
      outerLabelControl: new FormControl(1250),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-number [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Amount</dx-label>
          </dx-number>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-number [formControl]="floatingControl" outline="floating">
            <dx-label>Amount</dx-label>
          </dx-number>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-number [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel>Amount</p>
          </dx-number>
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
        valueControl: new FormControl(1250),
        requiredControl,
        disabledControl: new FormControl({ value: 1250, disabled: true }),
        viewOnlyControl: new FormControl(1250),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-number [formControl]="defaultControl" outline="outer-label">
              <p dxLabel>Amount</p>
            </dx-number>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-number [formControl]="valueControl" outline="outer-label">
              <p dxLabel>Amount</p>
            </dx-number>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-number [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel>Amount</p>
            </dx-number>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-number [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel>Amount</p>
            </dx-number>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-number [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Amount</p>
            </dx-number>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Amount',
    labelText: 'Amount',
    prefixIcon: 'attach_money',
    suffixIcon: 'percent',
    hintText: 'Whole numbers only.',
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
        story: 'Demonstrates the label / prefix / suffix / hint / error projection slots.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-number
        [formControl]="control"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder"
        [seprater]="seprater"
        [precision]="precision"
        [minLength]="minLength"
        [maxLength]="maxLength"
        [tooltip]="tooltip"
        [tabIndex]="tabIndex">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true" *ngIf="prefixIcon">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true" *ngIf="suffixIcon">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-number>
    `,
  }),
};
