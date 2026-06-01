import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxInputCurrencyComponent } from './dx-input-currency.component';
import { DxCurrencyModule } from './dx-currency.module';
import type { NumberFormatVariant } from '../../core/UI/constant/currency-default';

const US_FORMAT: NumberFormatVariant = {
  decimalSeparator: 'Period',
  numeralSystem: 'international',
  thousand_separator: 'Comma',
  locale: 'en-US',
};

const EU_FORMAT: NumberFormatVariant = {
  decimalSeparator: 'Comma',
  numeralSystem: 'international',
  thousand_separator: 'Period',
  locale: 'de-DE',
};

const INDIA_FORMAT: NumberFormatVariant = {
  decimalSeparator: 'Period',
  numeralSystem: 'indian',
  thousand_separator: 'Comma',
  locale: 'en-IN',
};

const meta: Meta<any> = {
  title: 'Form Inputs/Currency',
  component: DxInputCurrencyComponent,
  decorators: [
    moduleMetadata({
      imports: [DxCurrencyModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Currency-aware numeric input. Wraps a Material `mat-form-field` with an inline ' +
          'currency symbol, locale-aware thousand and decimal separators, optional ' +
          'compact-notation shortcuts (typing `5K`, `2M`, `3B`, `1T` auto-expands to the ' +
          'scaled number), and configurable min/max length + precision. Implements ' +
          '`ControlValueAccessor` + `Validator` for reactive and template-driven forms, with ' +
          'three label layouts (`floating` / `none-floating` / `outer-label`). For ' +
          'read-only display of a formatted amount use `<dx-currency>`.',
      },
    },
  },
  argTypes: {
    appCurrencyConfig: { control: 'object', description: 'Localized number-format config. When set, switches the input to the localized formatter (Indian numbering / Period+Comma swap / etc.). Type: `NumberFormatVariant`.' },
    currencySymbol: { control: 'object', description: 'Currency symbol shown as a `matTextPrefix` before the input (e.g. `$`, `€`, `₹`).' },
    decimalPlaces: { control: 'number', description: 'Maximum number of fractional digits accepted by the localized formatter.' },
    precision: { control: 'number', description: 'Maximum number of total digits accepted by the non-localized formatter.' },
    seprater: { control: 'boolean', description: 'Render the thousands separator while typing. Default `true`.' },
    standard: { control: 'boolean', description: 'When no `currencySymbol` is provided, render the configured default symbol as a `matSuffix`. Disabled in view-only mode.' },
    minLength: { control: 'number', description: 'Minimum input length — wired to `Validators.minLength`.' },
    maxLength: { control: 'number', description: 'Maximum input length — wired to `Validators.maxLength`.' },
    disabled: { control: 'boolean', description: 'Disable the control. Both `[disabled]` and `FormControl({ disabled: true })` are honored.' },
    readonly: { control: 'boolean', description: 'Render as read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode — Material chrome stripped.' },
    required: { control: 'boolean', description: 'Mark as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
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
    id: { control: false, description: 'DOM id. Auto-generated as `dx-input-currency-{N}` when omitted.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
  },
  args: {
    appCurrencyConfig: null,
    currencySymbol: null,
    decimalPlaces: 2,
    precision: 0,
    seprater: true,
    standard: false,
    minLength: 0,
    maxLength: 0,
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    noneBorder: false,
    outline: 'outer-label',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    tooltip: 'Enter amount',
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-input-currency
    [formControl]="control"
    [appCurrencyConfig]="appCurrencyConfig"
    [currencySymbol]="currencySymbol"
    [decimalPlaces]="decimalPlaces"
    [precision]="precision"
    [seprater]="seprater"
    [standard]="standard"
    [minLength]="minLength"
    [maxLength]="maxLength"
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
    <p dxLabel>Amount</p>
    <dx-label>Amount</dx-label>
  </dx-input-currency>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline currency input — type a number and the thousands separator is inserted automatically.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const WithSymbol: Story = {
  name: 'With currency symbol',
  args: { currencySymbol: '$' as any },
  parameters: {
    docs: {
      description: {
        story: 'Prefix the input with a fixed currency symbol via `[currencySymbol]`. Material renders it as a non-editable `matTextPrefix`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1500) },
    template: FULL_TEMPLATE,
  }),
};

export const EuroFormat: Story = {
  name: 'European format (€ — period thousands, comma decimal)',
  args: { currencySymbol: '€' as any, appCurrencyConfig: EU_FORMAT },
  parameters: {
    docs: {
      description: {
        story: 'European format — `1.234,56`. Set via `[appCurrencyConfig]` with `decimalSeparator: "Comma"` and `thousand_separator: "Period"`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1234.56) },
    template: FULL_TEMPLATE,
  }),
};

export const IndianFormat: Story = {
  name: 'Indian numbering (₹ — lakhs / crores)',
  args: { currencySymbol: '₹' as any, appCurrencyConfig: INDIA_FORMAT },
  parameters: {
    docs: {
      description: {
        story: 'Indian numbering system — `12,34,56,789` (3-2-2-2 grouping). Set via `[appCurrencyConfig].numeralSystem = "indian"`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(123456789) },
    template: FULL_TEMPLATE,
  }),
};

export const CompactNotation: Story = {
  name: 'Compact notation (K / M / B / T)',
  parameters: {
    docs: {
      description: {
        story:
          'Type `5K`, `2.5M`, `3B`, or `1T` and the input auto-expands to the scaled ' +
          'number (`5K` → `5000`). Useful when capturing large amounts quickly.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null), tooltip: 'Try typing 5K or 2.5M' },
    template: FULL_TEMPLATE,
  }),
};

export const Precision: Story = {
  name: 'Precision-limited',
  args: { precision: 4 },
  parameters: {
    docs: {
      description: {
        story: '`[precision]="4"` caps the input at 4 total digits — useful for codes / short numeric IDs that look like currency in the UI.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1234) },
    template: FULL_TEMPLATE,
  }),
};

export const NoSeparator: Story = {
  name: 'Without thousand separator',
  args: { seprater: false },
  parameters: {
    docs: {
      description: {
        story: '`[seprater]="false"` disables the thousands grouping — the value is shown as a raw integer.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1234567) },
    template: FULL_TEMPLATE,
  }),
};

export const MinMaxLength: Story = {
  name: 'With min / max length',
  args: { minLength: 3, maxLength: 9 },
  parameters: {
    docs: {
      description: {
        story: '`[minLength]` and `[maxLength]` are wired to `Validators.minLength` / `Validators.maxLength` on the bound control.',
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
        story: 'Outer label projected via `[dxLabel]` outside the Material form-field.',
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
        story: 'Outer label placed to the left of the field.',
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
        story: 'Required field. Pair with `Validators.required` on the bound control.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null, Validators.required) },
    template: FULL_TEMPLATE,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, currencySymbol: '$' as any },
  parameters: {
    docs: {
      description: {
        story: 'Disabled control. Both `[disabled]` and `FormControl({ disabled: true })` produce the same Material disabled style.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: 1500, disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true, currencySymbol: '$' as any },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — focusable but not editable.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1500) },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, currencySymbol: '$' as any },
  parameters: {
    docs: {
      description: {
        story: 'Display-only mode for summary screens. Material chrome stripped.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1500) },
    template: FULL_TEMPLATE,
  }),
};

export const NoBorder: Story = {
  name: 'Borderless',
  args: { noneBorder: true, currencySymbol: '$' as any },
  parameters: {
    docs: {
      description: {
        story: '`[noneBorder]="true"` strips the Material outline border. Useful inside table cells or pre-bordered containers.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(1500) },
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
      noneFloatingControl: new FormControl(1500),
      floatingControl: new FormControl(1500),
      outerLabelControl: new FormControl(1500),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-input-currency [formControl]="noneFloatingControl" outline="none-floating" currencySymbol="$">
            <dx-label>Amount</dx-label>
          </dx-input-currency>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-input-currency [formControl]="floatingControl" outline="floating" currencySymbol="$">
            <dx-label>Amount</dx-label>
          </dx-input-currency>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-input-currency [formControl]="outerLabelControl" outline="outer-label" currencySymbol="$">
            <p dxLabel>Amount</p>
          </dx-input-currency>
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
        valueControl: new FormControl(1500.5),
        requiredControl,
        disabledControl: new FormControl({ value: 999, disabled: true }),
        viewOnlyControl: new FormControl(2500),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-input-currency [formControl]="defaultControl" outline="outer-label" currencySymbol="$">
              <p dxLabel>Amount</p>
            </dx-input-currency>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-input-currency [formControl]="valueControl" outline="outer-label" currencySymbol="$">
              <p dxLabel>Amount</p>
            </dx-input-currency>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-input-currency [formControl]="requiredControl" [required]="true" outline="outer-label" currencySymbol="$">
              <p dxLabel>Amount</p>
            </dx-input-currency>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-input-currency [formControl]="disabledControl" [disabled]="true" outline="outer-label" currencySymbol="$">
              <p dxLabel>Amount</p>
            </dx-input-currency>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-input-currency [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label" currencySymbol="$">
              <p dxLabel>Amount</p>
            </dx-input-currency>
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
    prefixIcon: 'payments',
    suffixIcon: 'help',
    hintText: 'Enter the gross amount in the local currency.',
    errorText: '',
    outline: 'outer-label',
    currencySymbol: '$' as any,
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
        story: 'Demonstrates every content-projection slot: outer label, inner label, prefix icon, suffix icon, hint, and error. Toggle each slot text live from Controls.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-input-currency
        [formControl]="control"
        [appCurrencyConfig]="appCurrencyConfig"
        [currencySymbol]="currencySymbol"
        [decimalPlaces]="decimalPlaces"
        [precision]="precision"
        [seprater]="seprater"
        [standard]="standard"
        [minLength]="minLength"
        [maxLength]="maxLength"
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
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-input-currency>
    `,
  }),
};
