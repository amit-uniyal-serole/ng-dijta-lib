import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxCheckboxComponent } from './dx-checkbox.component';
import { DxCheckboxModule } from './dx-checkbox.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Checkbox',
  component: DxCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [DxCheckboxModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Form-integrated boolean control wrapping Angular Material `mat-checkbox`. ' +
          'Implements `ControlValueAccessor` + `Validator` so it plugs into reactive and ' +
          'template-driven forms. Label and validation message are projected through the ' +
          '`<dx-label>` and `<dx-error>` slots.',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Disable the checkbox — pointer events are blocked and Material applies the disabled style.' },
    readonly: { control: 'boolean', description: 'Render as read-only — kept focusable but not toggleable.' },
    viewOnly: { control: 'boolean', description: 'Static viewing state — shows the current value with no interaction affordance.' },
    required: { control: 'boolean', description: 'Mark the field as required. Pair with `<dx-error>` to surface the validation message when the form control is touched.' },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'right', 'top'],
      description: 'Where the projected `<dx-label>` sits relative to the checkbox box. `left` and `right` map to Material\'s `labelPosition="before|after"`; `top` stacks the label above using a flex column.',
    },
    tabIndex: { control: 'number', description: 'Tab order index for keyboard navigation.' },
    id: { control: false, description: 'DOM id. Auto-generated as `dx-checkbox-{N}` when omitted.' },
    onInputChange: { action: 'onInputChange', description: 'Fires when the checked state changes. Payload is the new boolean value.' },
    blur: { action: 'blur', description: 'Fires when the checkbox loses focus.' },
  },
  args: {
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    labelPosition: 'right',
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline checkbox with a projected label. The label goes through `<dx-label>` — passing raw text directly leaves the Material label slot empty.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(false) },
    template: `
      <dx-checkbox
        [formControl]="control"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [labelPosition]="labelPosition">
        <dx-label>Accept terms and conditions</dx-label>
      </dx-checkbox>
    `,
  }),
};

export const LabelPositions: Story = {
  name: 'Label positions',
  parameters: {
    docs: {
      description: {
        story:
          'Project the label on any side of the checkbox via `[labelPosition]`. ' +
          '`right` (default) and `left` use Material\'s built-in `before`/`after`; ' +
          '`top` stacks the label above the box using a flex column.',
      },
    },
  },
  render: () => ({
    props: {
      rightControl: new FormControl(true),
      leftControl: new FormControl(true),
      topControl: new FormControl(true),
    },
    template: `
      <div style="display: flex; gap: 48px; align-items: flex-start;">
        <dx-checkbox [formControl]="rightControl" labelPosition="right">
          <dx-label>Right (default)</dx-label>
        </dx-checkbox>
        <dx-checkbox [formControl]="leftControl" labelPosition="left">
          <dx-label>Left</dx-label>
        </dx-checkbox>
        <dx-checkbox [formControl]="topControl" labelPosition="top">
          <dx-label>Top</dx-label>
        </dx-checkbox>
      </div>
    `,
  }),
};

export const Checked: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Initial checked state — drive the value through the bound `FormControl` (or `[(ngModel)]`).',
      },
    },
  },
  render: () => ({
    props: { control: new FormControl(true) },
    template: `
      <dx-checkbox [formControl]="control">
        <dx-label>Subscribe to product updates</dx-label>
      </dx-checkbox>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox. Both the `[disabled]` input and `FormControl({ value, disabled: true })` produce the same Material disabled style.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(true) },
    template: `
      <dx-checkbox [formControl]="control" [disabled]="disabled">
        <dx-label>Feature locked — upgrade to unlock</dx-label>
      </dx-checkbox>
    `,
  }),
};

export const Required: Story = {
  args: { required: true },
  parameters: {
    docs: {
      description: {
        story: 'Required checkbox — renders the Material required asterisk. Combine with `Validators.requiredTrue` on the bound control to enforce "must be checked".',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl(false, Validators.requiredTrue),
    },
    template: `
      <dx-checkbox [formControl]="control" [required]="required">
        <dx-label>I have read and agree to the terms</dx-label>
      </dx-checkbox>
    `,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only checkbox — focusable for screen-reader announcement, but the value cannot be changed by user interaction.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(true) },
    template: `
      <dx-checkbox [formControl]="control" [readonly]="readonly">
        <dx-label>Auto-renewal (set by admin)</dx-label>
      </dx-checkbox>
    `,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true },
  parameters: {
    docs: {
      description: {
        story: 'View-only mode — typically used inside summary screens to show a previously-saved boolean value without any interaction affordance.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(true) },
    template: `
      <dx-checkbox [formControl]="control" [viewOnly]="viewOnly">
        <dx-label>Two-factor authentication enabled</dx-label>
      </dx-checkbox>
    `,
  }),
};

export const WithError: Story = {
  name: 'With error message',
  parameters: {
    docs: {
      description: {
        story:
          'Error message is projected through `<dx-error>`. It renders when the bound control has the `required` error AND is `touched` — the story pre-touches the control so the message is visible on first paint.',
      },
    },
  },
  render: () => {
    const control = new FormControl(false, Validators.requiredTrue);
    control.markAsTouched();
    return {
      props: { control },
      template: `
        <dx-checkbox [formControl]="control" [required]="true">
          <dx-label>I accept the privacy policy</dx-label>
          <dx-error>You must accept the privacy policy to continue.</dx-error>
        </dx-checkbox>
      `,
    };
  },
};

export const ReactiveForm: Story = {
  name: 'Reactive form integration',
  parameters: {
    docs: {
      description: {
        story:
          'Drives the checkbox through a `FormControl` and reads its value live. Demonstrates the full reactive-forms wiring: value binding, validity, dirty/touched state.',
      },
    },
  },
  render: () => {
    const control = new FormControl(false);
    return {
      props: { control },
      template: `
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 360px;">
          <dx-checkbox [formControl]="control">
            <dx-label>Send me marketing emails</dx-label>
          </dx-checkbox>
          <pre style="margin: 0; padding: 8px; background: #f5f5f5; border-radius: 4px; font-size: 12px;">
value:   {{ control.value }}
valid:   {{ control.valid }}
touched: {{ control.touched }}
dirty:   {{ control.dirty }}</pre>
        </div>
      `,
    };
  },
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every interaction state.',
      },
    },
  },
  render: () => ({
    props: {
      defaultControl: new FormControl(false),
      checkedControl: new FormControl(true),
      disabledControl: new FormControl({ value: true, disabled: true }),
      readonlyControl: new FormControl(true),
      viewOnlyControl: new FormControl(true),
      requiredControl: new FormControl(false, Validators.requiredTrue),
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <dx-checkbox [formControl]="defaultControl">
          <dx-label>Default — unchecked</dx-label>
        </dx-checkbox>
        <dx-checkbox [formControl]="checkedControl">
          <dx-label>Default — checked</dx-label>
        </dx-checkbox>
        <dx-checkbox [formControl]="disabledControl" [disabled]="true">
          <dx-label>Disabled</dx-label>
        </dx-checkbox>
        <dx-checkbox [formControl]="readonlyControl" [readonly]="true">
          <dx-label>Read-only</dx-label>
        </dx-checkbox>
        <dx-checkbox [formControl]="viewOnlyControl" [viewOnly]="true">
          <dx-label>View only</dx-label>
        </dx-checkbox>
        <dx-checkbox [formControl]="requiredControl" [required]="true">
          <dx-label>Required</dx-label>
        </dx-checkbox>
      </div>
    `,
  }),
};

export const Group: Story = {
  name: 'Checkbox group',
  parameters: {
    docs: {
      description: {
        story: 'For a list of independent boolean options, render `dx-checkbox` once per option. For an "n-of-many" pattern bound to a single array value, prefer `dx-chip-select` or `mat-selection-list`.',
      },
    },
  },
  render: () => ({
    props: {
      emailControl: new FormControl(true),
      smsControl: new FormControl(false),
      pushControl: new FormControl(true),
    },
    template: `
      <fieldset style="border: 1px solid #e0e0e0; border-radius: 4px; padding: 16px; max-width: 320px;">
        <legend style="padding: 0 8px; font-size: 14px; color: rgba(0, 0, 0, 0.6);">Notification channels</legend>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <dx-checkbox [formControl]="emailControl">
            <dx-label>Email</dx-label>
          </dx-checkbox>
          <dx-checkbox [formControl]="smsControl">
            <dx-label>SMS</dx-label>
          </dx-checkbox>
          <dx-checkbox [formControl]="pushControl">
            <dx-label>Push notifications</dx-label>
          </dx-checkbox>
        </div>
      </fieldset>
    `,
  }),
};
