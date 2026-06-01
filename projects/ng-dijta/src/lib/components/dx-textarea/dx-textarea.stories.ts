import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxTextareaComponent } from './dx-textarea.component';
import { DxTextareaModule } from './dx-textarea.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Textarea',
  component: DxTextareaComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTextareaModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-line text input wrapping `mat-form-field` + native `<textarea matInput>`. ' +
          'Enter inserts a newline (the component intercepts the keydown so an embedded form ' +
          'submit doesn\'t fire), `[row]` controls the visible row count, and `[maxLength]` ' +
          'pairs with a live "current / max" counter shown under the field. Supports ' +
          '`@jsverse/mentions` via `[mentionConfigDetails]`. Implements ' +
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
    readonly: { control: 'boolean', description: 'Render the textarea read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    row: { control: 'number', description: 'Visible row count for the textarea.' },
    minLength: { control: 'number', description: 'Minimum content length (`Validators.minLength`).' },
    maxLength: { control: 'number', description: 'Maximum content length (`Validators.maxLength`). Setting this also activates the live "x / y" counter.' },
    tooltip: { control: 'text', description: 'Placeholder / hover hint text.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    blur: { action: 'blur', description: 'Fires when the textarea loses focus.' },
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
    row: 4,
    minLength: 0,
    maxLength: 0,
    tooltip: 'Type your message…',
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const LONG_TEXT =
  'Angular Material textarea wrapped with the standard dx-* chrome.\n' +
  'Press Enter to insert a newline — the component intercepts the keydown so an embedded form\n' +
  'submit does not fire, then scrolls to keep the caret in view.\n' +
  'Use [row] to control the visible height and [maxLength] to enable the live counter.';

const FULL_TEMPLATE = `
  <dx-textarea
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
    [row]="row"
    [minLength]="minLength"
    [maxLength]="maxLength"
    [tooltip]="tooltip"
    [tabIndex]="tabIndex">
    <p dxLabel>Notes</p>
    <dx-label>Notes</dx-label>
  </dx-textarea>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty textarea, 4 rows visible.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected text',
  parameters: {
    docs: {
      description: {
        story: 'Initial multi-line value bound via `FormControl`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(LONG_TEXT) },
    template: FULL_TEMPLATE,
  }),
};

export const TallRows: Story = {
  name: 'More visible rows',
  args: { row: 8 },
  parameters: {
    docs: {
      description: {
        story: '`[row]="8"` doubles the visible height. Useful for long-form notes / descriptions.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const CharacterCounter: Story = {
  name: 'Character counter',
  args: { maxLength: 200 },
  parameters: {
    docs: {
      description: {
        story: 'Setting `[maxLength]` activates the built-in "current / max" counter rendered as a `mat-hint` aligned right.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('A short note…') },
    template: FULL_TEMPLATE,
  }),
};

export const LengthLimits: Story = {
  name: 'Min / max length',
  args: { minLength: 10, maxLength: 200 },
  parameters: {
    docs: {
      description: {
        story: '`[minLength]` / `[maxLength]` wire up `Validators.minLength` / `Validators.maxLength`.',
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
  args: { tooltip: 'e.g. Tell us what happened…' },
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
        story: 'Disabled control — the textarea is inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: LONG_TEXT, disabled: true }) },
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
    props: { ...args, control: new FormControl(LONG_TEXT) },
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
    props: { ...args, control: new FormControl(LONG_TEXT) },
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
    props: { ...args, control: new FormControl(LONG_TEXT) },
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
      noneFloatingControl: new FormControl(LONG_TEXT),
      floatingControl: new FormControl(LONG_TEXT),
      outerLabelControl: new FormControl(LONG_TEXT),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-textarea [formControl]="noneFloatingControl" outline="none-floating" [row]="4">
            <dx-label>Notes</dx-label>
          </dx-textarea>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-textarea [formControl]="floatingControl" outline="floating" [row]="4">
            <dx-label>Notes</dx-label>
          </dx-textarea>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-textarea [formControl]="outerLabelControl" outline="outer-label" [row]="4">
            <p dxLabel>Notes</p>
          </dx-textarea>
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
        valueControl: new FormControl(LONG_TEXT),
        requiredControl,
        disabledControl: new FormControl({ value: LONG_TEXT, disabled: true }),
        viewOnlyControl: new FormControl(LONG_TEXT),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-textarea [formControl]="defaultControl" outline="outer-label" [row]="3">
              <p dxLabel>Notes</p>
            </dx-textarea>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-textarea [formControl]="valueControl" outline="outer-label" [row]="3">
              <p dxLabel>Notes</p>
            </dx-textarea>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-textarea [formControl]="requiredControl" [required]="true" outline="outer-label" [row]="3">
              <p dxLabel>Notes</p>
            </dx-textarea>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-textarea [formControl]="disabledControl" [disabled]="true" outline="outer-label" [row]="3">
              <p dxLabel>Notes</p>
            </dx-textarea>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-textarea [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label" [row]="3">
              <p dxLabel>Notes</p>
            </dx-textarea>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Notes',
    labelText: 'Notes',
    prefixIcon: 'edit_note',
    suffixIcon: '',
    hintText: 'Press Enter for a new line.',
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
      <dx-textarea
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
        [row]="row"
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
      </dx-textarea>
    `,
  }),
};
