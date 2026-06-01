import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxInputPhoneComponent } from './dx-input-phone.component';
import { DxInputPhoneModule } from './dx-input-phone.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Input Phone',
  component: DxInputPhoneComponent,
  decorators: [
    moduleMetadata({
      imports: [DxInputPhoneModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'International phone-number input with a country-code picker. The field accepts ' +
          'a number, formats it according to the selected country\'s rules, and emits the ' +
          'normalized value via the bound `FormControl`. Country dialog supports a search ' +
          'box, a `preferredCountries` list (pinned at the top), and an `onlyCountries` ' +
          'allow-list. Implements `ControlValueAccessor` + `Validator` and follows the same ' +
          '`outline` / `labelPosition` / outer-label chrome as the other `dx-*` form controls.',
      },
    },
  },
  argTypes: {
    preferredCountries: { control: 'object', description: 'ISO country codes (lowercase, e.g. `["us", "gb", "in"]`) pinned at the top of the country picker.' },
    onlyCountries: { control: 'object', description: 'Restrict the picker to this allow-list of ISO codes. Empty = all countries.' },
    enableSearch: { control: 'boolean', description: 'Show a search box inside the country picker dialog.' },
    searchPlaceholder: { control: 'text', description: 'Placeholder for the country-picker search box.' },
    enablePlaceholder: { control: 'boolean', description: 'Show the format hint as a native placeholder inside the input.' },
    inputPlaceholder: { control: 'text', description: 'Override the auto-generated placeholder.' },
    format: {
      control: { type: 'inline-radio' },
      options: ['default', 'national', 'international'],
      description: 'Output formatting style: `default` (E.164), `national`, or `international`.',
    },
    cssClass: { control: 'text', description: 'Extra CSS class applied to the country trigger.' },
    name: { control: 'text', description: 'Form control name attribute.' },
    invalidErrorMessage: { control: 'text', description: 'Error message shown when the entered number is invalid for the selected country.' },
    errorMessage: { control: 'text', description: 'Generic error message text.' },
    tooltip: { control: 'text', description: 'Tooltip / hover text.' },
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render as read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
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
      description: 'Outer-label placement (only effective with `outline="outer-label"`).',
    },
    outerLabelErrorType: {
      control: { type: 'inline-radio' },
      options: ['astrict-error', 'filled-error'],
      description: 'Validation-error treatment in `outer-label` mode.',
    },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
    countryChanged: { action: 'countryChanged', description: 'Fires when the user picks a different country from the dialog.' },
  },
  args: {
    preferredCountries: [],
    onlyCountries: [],
    enableSearch: false,
    searchPlaceholder: 'Search country',
    enablePlaceholder: true,
    inputPlaceholder: undefined,
    format: 'default',
    cssClass: undefined,
    name: 'phone',
    invalidErrorMessage: '',
    errorMessage: '',
    tooltip: '',
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    noneBorder: false,
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-input-phone
    [formControl]="control"
    [preferredCountries]="preferredCountries"
    [onlyCountries]="onlyCountries"
    [enableSearch]="enableSearch"
    [searchPlaceholder]="searchPlaceholder"
    [enablePlaceholder]="enablePlaceholder"
    [inputPlaceholder]="inputPlaceholder"
    [format]="format"
    [cssClass]="cssClass"
    [name]="name"
    [invalidErrorMessage]="invalidErrorMessage"
    [errorMessage]="errorMessage"
    [tooltip]="tooltip"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [noneBorder]="noneBorder"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [tabIndex]="tabIndex">
    <p dxLabel>Phone</p>
    <dx-label>Phone</dx-label>
  </dx-input-phone>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty phone input. Click the country flag to open the country picker.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected number',
  parameters: {
    docs: {
      description: {
        story: 'Initial number bound via `FormControl("+14155552671")`. The country code is auto-detected and the flag is set accordingly.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('+14155552671') },
    template: FULL_TEMPLATE,
  }),
};

export const PreferredCountries: Story = {
  name: 'Preferred countries',
  args: { preferredCountries: ['us', 'gb', 'in', 'au'] },
  parameters: {
    docs: {
      description: {
        story: '`[preferredCountries]` pins a small set of ISO codes at the top of the picker, above the alphabetical list. Use for the most common choices in your audience.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const OnlySomeCountries: Story = {
  name: 'Allow-listed countries',
  args: { onlyCountries: ['us', 'ca', 'mx', 'gb'] },
  parameters: {
    docs: {
      description: {
        story: '`[onlyCountries]` restricts the picker to a fixed allow-list — every other country is hidden. Useful for region-locked products.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const WithSearch: Story = {
  name: 'With country search',
  args: { enableSearch: true, searchPlaceholder: 'Find a country' },
  parameters: {
    docs: {
      description: {
        story: '`[enableSearch]="true"` adds a search box inside the country picker dialog. Useful when the global list is overwhelming.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const InternationalFormat: Story = {
  name: 'International format',
  args: { format: 'international' },
  parameters: {
    docs: {
      description: {
        story: '`[format]="international"` emits the number in the international human-readable format (e.g. `+1 415 555 2671`).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('+14155552671') },
    template: FULL_TEMPLATE,
  }),
};

export const NationalFormat: Story = {
  name: 'National format',
  args: { format: 'national' },
  parameters: {
    docs: {
      description: {
        story: '`[format]="national"` strips the country code and emits the local format (e.g. `(415) 555-2671`).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('+14155552671') },
    template: FULL_TEMPLATE,
  }),
};

export const CustomPlaceholder: Story = {
  name: 'Custom placeholder',
  args: { inputPlaceholder: 'e.g. +1 415 555 2671' },
  parameters: {
    docs: {
      description: {
        story: '`[inputPlaceholder]` overrides the auto-generated country-format placeholder. Set `[enablePlaceholder]="false"` to hide it entirely.',
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
        story: 'Disabled control — both the input and the country trigger are inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: '+14155552671', disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — focusable but the value cannot be changed and the country picker won\'t open.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('+442071234567') },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Display-only mode for summary screens.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('+918012345678') },
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
      noneFloatingControl: new FormControl('+14155552671'),
      floatingControl: new FormControl('+14155552671'),
      outerLabelControl: new FormControl('+14155552671'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-input-phone [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Phone</dx-label>
          </dx-input-phone>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-input-phone [formControl]="floatingControl" outline="floating">
            <dx-label>Phone</dx-label>
          </dx-input-phone>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-input-phone [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel>Phone</p>
          </dx-input-phone>
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
        valueControl: new FormControl('+14155552671'),
        requiredControl,
        disabledControl: new FormControl({ value: '+442071234567', disabled: true }),
        viewOnlyControl: new FormControl('+918012345678'),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-input-phone [formControl]="defaultControl" outline="outer-label">
              <p dxLabel>Phone</p>
            </dx-input-phone>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-input-phone [formControl]="valueControl" outline="outer-label">
              <p dxLabel>Phone</p>
            </dx-input-phone>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-input-phone [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel>Phone</p>
            </dx-input-phone>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-input-phone [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel>Phone</p>
            </dx-input-phone>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-input-phone [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Phone</p>
            </dx-input-phone>
          </div>
        </div>
      `,
    };
  },
};

export const NoBorder: Story = {
  name: 'Borderless',
  args: { noneBorder: true },
  parameters: {
    docs: {
      description: {
        story: '`[noneBorder]="true"` hides the Material outline. Use inside dense rows or tables where the field should blend with its container.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('+14155552671') },
    template: FULL_TEMPLATE,
  }),
};

export const NoLabelSlot: Story = {
  name: 'No label slot',
  args: { noneLabel: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: '`[noneLabel]="true"` collapses the outer-label slot — use when the field is grouped under a section heading already.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const WithTooltip: Story = {
  name: 'With tooltip',
  args: { tooltip: 'Include country code, e.g. +1 415 555 2671' },
  parameters: {
    docs: {
      description: {
        story: '`[tooltip]` text shown on hover/focus of the field, useful for format hints.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const InvalidNumber: Story = {
  name: 'Invalid number error',
  args: { invalidErrorMessage: 'Enter a valid phone number for the selected country.', outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Validation triggers when the number does not match the selected country format. `[invalidErrorMessage]` overrides the default "Enter valid contact number" message.',
      },
    },
  },
  render: (args) => {
    const control = new FormControl('+1 123');
    control.markAsTouched();
    return {
      props: { ...args, control },
      template: FULL_TEMPLATE,
    };
  },
};

export const CustomErrorMessage: Story = {
  name: 'Custom error message',
  args: { errorMessage: 'Phone is required for SMS verification.', required: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: '`[errorMessage]` replaces the inline error text when the bound control is invalid.',
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

export const AsteriskError: Story = {
  name: 'Outer label — asterisk error style',
  args: { outline: 'outer-label', outerLabelErrorType: 'astrict-error', required: true },
  parameters: {
    docs: {
      description: {
        story: '`[outerLabelErrorType]="astrict-error"` renders validation state as a red asterisk next to the label instead of a filled error block.',
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

export const CountryChangeEvent: Story = {
  name: 'Country change event',
  args: { preferredCountries: ['us', 'gb', 'in'] },
  parameters: {
    docs: {
      description: {
        story: 'Pick a different country in the flag dialog — `(countryChanged)` fires with the selected `Country` payload (visible in the Actions panel).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnlyWithFlag: Story = {
  name: 'View-only display',
  args: { viewOnly: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Read-only summary rendering with the country flag and formatted national number. Use on detail/summary screens — replaces the legacy standalone `dx-phone-view` component.',
      },
    },
  },
  render: () => ({
    props: {
      usControl: new FormControl('+14155552671'),
      gbControl: new FormControl('+442071234567'),
      inControl: new FormControl('+918012345678'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(220px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">US</h4>
          <dx-input-phone [formControl]="usControl" [viewOnly]="true" outline="outer-label">
            <p dxLabel>Phone</p>
          </dx-input-phone>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">UK</h4>
          <dx-input-phone [formControl]="gbControl" [viewOnly]="true" outline="outer-label">
            <p dxLabel>Phone</p>
          </dx-input-phone>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">India</h4>
          <dx-input-phone [formControl]="inControl" [viewOnly]="true" outline="outer-label">
            <p dxLabel>Phone</p>
          </dx-input-phone>
        </div>
      </div>
    `,
  }),
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Phone',
    labelText: 'Phone',
    hintText: 'Pick your country, then enter your number.',
    errorText: '',
    outline: 'outer-label',
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '`<p dxLabel>` outer-label text. Clear to hide.', table: { category: 'Slots' } },
    labelText: { control: 'text', description: '`<dx-label>` inline label text. Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '`<dx-hint>` helper text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '`<dx-error>` error text. Set a value to show.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the label / hint / error projection slots.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-input-phone
        [formControl]="control"
        [preferredCountries]="preferredCountries"
        [onlyCountries]="onlyCountries"
        [enableSearch]="enableSearch"
        [searchPlaceholder]="searchPlaceholder"
        [enablePlaceholder]="enablePlaceholder"
        [inputPlaceholder]="inputPlaceholder"
        [format]="format"
        [cssClass]="cssClass"
        [name]="name"
        [invalidErrorMessage]="invalidErrorMessage"
        [errorMessage]="errorMessage"
        [tooltip]="tooltip"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [tabIndex]="tabIndex">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-input-phone>
    `,
  }),
};
