import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxInputUrlComponent } from './dx-input-url.component';
import { DxInputUrlModule } from './dx-input-url.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Input Url',
  component: DxInputUrlComponent,
  decorators: [
    moduleMetadata({
      imports: [DxInputUrlModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'URL input with a built-in link icon prefix and `dxUrlValidator` directive. ' +
          'Accepts `http(s)://` / `ftp://` URLs and reports `urlInvalid` on the bound ' +
          '`FormControl` when the value does not match. Strips leading/trailing spaces ' +
          'via `dxNoLeadingTrailingSpaces`. Implements `ControlValueAccessor` + `Validator` ' +
          'and shares the same `outline` / `labelPosition` / outer-label chrome as the ' +
          'other `dx-*` form controls.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render the input read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    mask: { control: 'text', description: 'Optional input mask (passed through to the underlying input).' },
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
    customUrlValidation: {
      control: 'boolean',
      description: 'Use the relaxed URL pattern (allows underscores, spaces, query params, fragments). Default uses the standard pattern.',
    },
    tooltip: { control: 'text', description: 'Placeholder / hover hint text.' },
    minLength: { control: 'number', description: 'Minimum allowed length.' },
    maxLength: { control: 'number', description: 'Maximum allowed length.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    onClickOption: { action: 'onClickOption', description: 'Fires when an option chip is clicked.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
  },
  args: {
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    mask: '',
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    customUrlValidation: false,
    tooltip: 'https://example.com',
    minLength: 0,
    maxLength: 0,
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-input-url
    [formControl]="control"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [mask]="mask"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [customUrlValidation]="customUrlValidation"
    [tooltip]="tooltip"
    [minLength]="minLength"
    [maxLength]="maxLength"
    [tabIndex]="tabIndex">
    <p dxLabel>Website</p>
    <dx-label>Website</dx-label>
  </dx-input-url>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty URL input. The link icon prefix is built-in.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected URL',
  parameters: {
    docs: {
      description: {
        story: 'Initial value bound via `FormControl("https://example.com")`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('https://example.com') },
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
    props: { ...args, control: new FormControl({ value: 'https://example.com', disabled: true }) },
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
    props: { ...args, control: new FormControl('https://example.com') },
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
    props: { ...args, control: new FormControl('https://docs.example.com/getting-started') },
    template: FULL_TEMPLATE,
  }),
};

export const InvalidUrl: Story = {
  name: 'Invalid URL error',
  parameters: {
    docs: {
      description: {
        story: 'Triggers the built-in `dxUrlValidator` — the inline error reads "URL Invalid". Initial value is intentionally malformed.',
      },
    },
  },
  render: (args) => {
    const control = new FormControl('not a url');
    control.markAsTouched();
    return {
      props: { ...args, control },
      template: FULL_TEMPLATE,
    };
  },
};

export const LeadingTrailingSpaces: Story = {
  name: 'Leading/trailing space error',
  parameters: {
    docs: {
      description: {
        story: 'The `dxNoLeadingTrailingSpaces` directive flags surrounding whitespace with a dedicated message: "Please remove any extra spaces from the start or end of your URL."',
      },
    },
  },
  render: (args) => {
    const control = new FormControl('  https://example.com  ');
    control.markAsTouched();
    return {
      props: { ...args, control },
      template: FULL_TEMPLATE,
    };
  },
};

export const CustomUrlValidation: Story = {
  name: 'Relaxed URL validation',
  args: { customUrlValidation: true },
  parameters: {
    docs: {
      description: {
        story: '`[customUrlValidation]="true"` enables the relaxed regex that requires a scheme (`http(s)://` or `ftp://`) and accepts underscores, spaces, query params and fragments. Default mode uses a simpler pattern where the scheme is optional.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('https://example.com/path?q=hello world&tag=v1.0#anchor') },
    template: FULL_TEMPLATE,
  }),
};

export const LengthLimits: Story = {
  name: 'Min / max length',
  args: { minLength: 10, maxLength: 60, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: '`[minLength]` and `[maxLength]` wire up `Validators.minLength` / `Validators.maxLength` on the bound control.',
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
  args: { tooltip: 'e.g. https://docs.example.com' },
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
      noneFloatingControl: new FormControl('https://example.com'),
      floatingControl: new FormControl('https://example.com'),
      outerLabelControl: new FormControl('https://example.com'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-input-url [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Website</dx-label>
          </dx-input-url>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-input-url [formControl]="floatingControl" outline="floating">
            <dx-label>Website</dx-label>
          </dx-input-url>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-input-url [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel>Website</p>
          </dx-input-url>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, with value, required (touched), invalid, disabled, view-only.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl(null, Validators.required);
    requiredControl.markAsTouched();
    const invalidControl = new FormControl('not a url');
    invalidControl.markAsTouched();
    return {
      props: {
        defaultControl: new FormControl(null),
        valueControl: new FormControl('https://example.com'),
        requiredControl,
        invalidControl,
        disabledControl: new FormControl({ value: 'https://example.com', disabled: true }),
        viewOnlyControl: new FormControl('https://docs.example.com/getting-started'),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-input-url [formControl]="defaultControl" outline="outer-label">
              <p dxLabel>Website</p>
            </dx-input-url>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-input-url [formControl]="valueControl" outline="outer-label">
              <p dxLabel>Website</p>
            </dx-input-url>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-input-url [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel>Website</p>
            </dx-input-url>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Invalid</h4>
            <dx-input-url [formControl]="invalidControl" outline="outer-label">
              <p dxLabel>Website</p>
            </dx-input-url>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-input-url [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel>Website</p>
            </dx-input-url>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-input-url [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Website</p>
            </dx-input-url>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Website',
    labelText: 'Website',
    hintText: 'Include the full URL with scheme (https://).',
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
        story: 'Demonstrates the label / hint / error projection slots. The link icon prefix is fixed; a `dx-suffix` slot is also available.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-input-url
        [formControl]="control"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [mask]="mask"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [customUrlValidation]="customUrlValidation"
        [tooltip]="tooltip"
        [minLength]="minLength"
        [maxLength]="maxLength"
        [tabIndex]="tabIndex">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-input-url>
    `,
  }),
};
