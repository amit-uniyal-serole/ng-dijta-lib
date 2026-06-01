import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxInputComponent } from './dx-input.component';
import { DxInputModule } from './dx-input.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Input',
  component: DxInputComponent,
  decorators: [
    moduleMetadata({
      imports: [DxInputModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Generic single-line text/number input with the standard `dx-*` chrome: ' +
          '`outline` (floating / none-floating / outer-label), prefix / suffix / hint / error ' +
          'projection slots, native masking via `ngx-mask`, leading/trailing space stripping, ' +
          'optional trim, and required/disabled/readonly/view-only states. Implements ' +
          '`ControlValueAccessor` + `Validator`.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['text', 'number'],
      description: 'Native input type. `number` switches to a numeric keypad on mobile.',
    },
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
    readonly: { control: 'boolean', description: 'Render the input read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    applyTrim: { control: 'boolean', description: 'Trim whitespace from the value on input via `dxTrimInput`.' },
    dropSpecialCharacters: { control: 'boolean', description: 'When using a mask, drop special characters from the emitted value.' },
    tooltip: { control: 'text', description: 'Placeholder / hover hint text.' },
    minLength: { control: 'number', description: 'Minimum allowed length.' },
    maxLength: { control: 'number', description: 'Maximum allowed length.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    onClickOption: { action: 'onClickOption', description: 'Fires when an autocomplete option is clicked.' },
    onEnter: { action: 'onEnter', description: 'Fires when Enter is pressed in the input.' },
    onInputChange: { action: 'onInputChange', description: 'Fires on native `change` with the current string value.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
  },
  args: {
    type: 'text',
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    noneBorder: false,
    applyTrim: false,
    dropSpecialCharacters: false,
    tooltip: '',
    minLength: 50,
    maxLength: 50,
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-input
    [formControl]="control"
    [type]="type"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [noneBorder]="noneBorder"
    [applyTrim]="applyTrim"
    [dropSpecialCharacters]="dropSpecialCharacters"
    [tooltip]="tooltip"
    [minLength]="minLength"
    [maxLength]="maxLength"
    [tabIndex]="tabIndex">
    <p dxLabel>Field label</p>
    <dx-label>Field label</dx-label>
  </dx-input>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty text input.',
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
        story: 'Initial value bound via `FormControl("Acme Inc.")`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('Acme Inc.') },
    template: FULL_TEMPLATE,
  }),
};

export const NumberType: Story = {
  name: 'Number type',
  args: { type: 'number', tooltip: '0' },
  parameters: {
    docs: {
      description: {
        story: '`[type]="number"` switches to the numeric input and triggers the numeric keypad on mobile.',
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
        story: 'Disabled control — the input is inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: 'Acme Inc.', disabled: true }) },
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
    props: { ...args, control: new FormControl('Acme Inc.') },
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
    props: { ...args, control: new FormControl('Acme Inc.') },
    template: FULL_TEMPLATE,
  }),
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
    props: { ...args, control: new FormControl('Acme Inc.') },
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
  name: 'With placeholder hint',
  args: { tooltip: 'e.g. Acme Inc.' },
  parameters: {
    docs: {
      description: {
        story: '`[tooltip]` is forwarded as the native placeholder — useful as a format hint.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const LengthLimits: Story = {
  name: 'Min / max length',
  args: { minLength: 50, maxLength: 50, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: '`[minLength]` / `[maxLength]` map to the native `minlength` / `maxlength` attributes.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('') },
    template: FULL_TEMPLATE,
  }),
};

export const WithMask: Story = {
  name: 'With input mask',
  args: { tooltip: '555-123-4567', dropSpecialCharacters: false },
  argTypes: {
    mask: { control: 'text', description: '`ngx-mask` pattern (e.g. `000-000-0000`).' },
  },
  parameters: {
    docs: {
      description: {
        story: '`[mask]` uses `ngx-mask` patterns (e.g. `000-000-0000`). Toggle `[dropSpecialCharacters]` to strip dashes/parens from the emitted value.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, mask: (args as any).mask ?? '000-000-0000', control: new FormControl(null) },
    template: `
      <dx-input
        [formControl]="control"
        [type]="type"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder"
        [applyTrim]="applyTrim"
        mask="{{ mask }}"
        [dropSpecialCharacters]="dropSpecialCharacters"
        [tooltip]="tooltip"
        [tabIndex]="tabIndex">
        <p dxLabel>Phone</p>
        <dx-label>Phone</dx-label>
      </dx-input>
    `,
  }),
};

export const ApplyTrim: Story = {
  name: 'Trim whitespace',
  args: { applyTrim: true },
  parameters: {
    docs: {
      description: {
        story: '`[applyTrim]="true"` activates the `dxTrimInput` directive — whitespace is stripped from the emitted value.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('  trimmed value  ') },
    template: FULL_TEMPLATE,
  }),
};

export const LeadingTrailingSpaces: Story = {
  name: 'Leading/trailing space error',
  parameters: {
    docs: {
      description: {
        story: 'The `dxNoLeadingTrailingSpaces` directive flags surrounding whitespace with a dedicated message: "Please remove any extra spaces from the start or end of your input."',
      },
    },
  },
  render: (args) => {
    const control = new FormControl('  Acme Inc.  ');
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
      noneFloatingControl: new FormControl('Acme Inc.'),
      floatingControl: new FormControl('Acme Inc.'),
      outerLabelControl: new FormControl('Acme Inc.'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-input [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Field label</dx-label>
          </dx-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-input [formControl]="floatingControl" outline="floating">
            <dx-label>Field label</dx-label>
          </dx-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-input [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel>Field label</p>
          </dx-input>
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
        valueControl: new FormControl('Acme Inc.'),
        requiredControl,
        disabledControl: new FormControl({ value: 'Acme Inc.', disabled: true }),
        viewOnlyControl: new FormControl('Acme Inc.'),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-input [formControl]="defaultControl" outline="outer-label">
              <p dxLabel>Field label</p>
            </dx-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-input [formControl]="valueControl" outline="outer-label">
              <p dxLabel>Field label</p>
            </dx-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-input [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel>Field label</p>
            </dx-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-input [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel>Field label</p>
            </dx-input>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-input [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Field label</p>
            </dx-input>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Field label',
    labelText: 'Field label',
    prefixIcon: 'home',
    suffixIcon: 'help',
    hintText: 'Helper text for the field.',
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
      <dx-input
        [formControl]="control"
        [type]="type"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder"
        [applyTrim]="applyTrim"
        [dropSpecialCharacters]="dropSpecialCharacters"
        [tooltip]="tooltip"
        [minLength]="minLength"
        [maxLength]="maxLength"
        [tabIndex]="tabIndex">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-input>
    `,
  }),
};
