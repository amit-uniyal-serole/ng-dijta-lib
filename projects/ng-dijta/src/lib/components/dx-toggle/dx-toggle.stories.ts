import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxToggleComponent } from './dx-toggle.component';
import { DxToggleModule } from './dx-toggle.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Toggle',
  component: DxToggleComponent,
  decorators: [
    moduleMetadata({
      imports: [DxToggleModule, FormsModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Boolean on/off switch wrapping `mat-slide-toggle`. Two label modes: ' +
          '`[labelTouchSensitive]="true"` (default) puts the label inside the toggle so tapping ' +
          'either part flips it, while `[labelTouchSensitive]="false"` renders the label outside ' +
          '(via the `.outLabel` projection slot) and only the switch handle reacts to taps. ' +
          'Implements `ControlValueAccessor` + `Validator` — for "required" semantics, the ' +
          'control is invalid until the toggle is on.',
      },
    },
  },
  argTypes: {
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['before', 'after'],
      description: 'Label placement relative to the switch — `before` puts the label on the left, `after` on the right (default).',
    },
    labelTouchSensitive: { control: 'boolean', description: 'When `true` the label is inside the toggle (whole row toggles). When `false` the label is rendered via `.outLabel` outside and only the switch flips it.' },
    disabled: { control: 'boolean', description: 'Disable the toggle.' },
    readonly: { control: 'boolean', description: 'Read-only (rendered with `aria-readonly`).' },
    required: { control: 'boolean', description: 'Toggle must be on for the field to be valid.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    blur: { action: 'blur', description: 'Fires when the toggle loses focus.' },
  },
  args: {
    labelPosition: 'after',
    labelTouchSensitive: true,
    disabled: false,
    readonly: false,
    required: false,
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-toggle
    [formControl]="control"
    [labelPosition]="labelPosition"
    [labelTouchSensitive]="labelTouchSensitive"
    [disabled]="disabled"
    [readonly]="readonly"
    [required]="required"
    [tabIndex]="tabIndex">
    <dx-label>Enable notifications</dx-label>
    <span class="outLabel">Enable notifications</span>
  </dx-toggle>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline toggle in the off state. Click the switch (or its inline label) to flip it.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(false) },
    template: FULL_TEMPLATE,
  }),
};

export const OnByDefault: Story = {
  name: 'On by default',
  parameters: {
    docs: {
      description: {
        story: 'Initial value bound via `FormControl(true)`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(true) },
    template: FULL_TEMPLATE,
  }),
};

export const LabelBefore: Story = {
  name: 'Label before',
  args: { labelPosition: 'before' },
  parameters: {
    docs: {
      description: {
        story: '`[labelPosition]="before"` puts the label to the left of the switch — handy when aligning a column of toggle settings flush right.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(true) },
    template: FULL_TEMPLATE,
  }),
};

export const ExternalLabel: Story = {
  name: 'External label (`.outLabel`)',
  args: { labelTouchSensitive: false },
  parameters: {
    docs: {
      description: {
        story: '`[labelTouchSensitive]="false"` projects the `.outLabel` slot beside the switch. The label is decorative — only the switch toggles the value (use when the label is also a clickable link / button).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(false) },
    template: FULL_TEMPLATE,
  }),
};

export const Required: Story = {
  args: { required: true },
  parameters: {
    docs: {
      description: {
        story: 'Marks the toggle as required — the control is invalid until the switch is on (paired with `Validators.required`).',
      },
    },
  },
  render: (args) => {
    const control = new FormControl(false, Validators.required);
    control.markAsTouched();
    return {
      props: { ...args, control },
      template: `
        <dx-toggle
          [formControl]="control"
          [labelPosition]="labelPosition"
          [labelTouchSensitive]="labelTouchSensitive"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [tabIndex]="tabIndex">
          <dx-label>I accept the terms</dx-label>
          <dx-error>You must accept to continue.</dx-error>
        </dx-toggle>
      `,
    };
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled toggle — inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: true, disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: '`[readonly]="true"` blocks interaction and exposes `aria-readonly` for assistive tech.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(true) },
    template: FULL_TEMPLATE,
  }),
};

export const WithHint: Story = {
  name: 'With helper hint',
  parameters: {
    docs: {
      description: {
        story: 'A `<dx-hint>` is shown when the control is valid.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(false) },
    template: `
      <dx-toggle
        [formControl]="control"
        [labelPosition]="labelPosition"
        [labelTouchSensitive]="labelTouchSensitive"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [tabIndex]="tabIndex">
        <dx-label>Auto-save drafts</dx-label>
        <dx-hint>Saves your work every 30 seconds.</dx-hint>
      </dx-toggle>
    `,
  }),
};

export const TogglesGroup: Story = {
  name: 'Settings list',
  parameters: {
    docs: {
      description: {
        story: 'A common settings-page layout — labels on the left, toggles flush right (`labelPosition="before"`).',
      },
    },
  },
  render: () => ({
    props: {
      notificationsControl: new FormControl(true),
      twoFactorControl: new FormControl(false),
      autoSaveControl: new FormControl(true),
      marketingControl: new FormControl(false),
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 420px;">
        <dx-toggle [formControl]="notificationsControl" labelPosition="before">
          <dx-label>Email notifications</dx-label>
        </dx-toggle>
        <dx-toggle [formControl]="twoFactorControl" labelPosition="before">
          <dx-label>Two-factor authentication</dx-label>
        </dx-toggle>
        <dx-toggle [formControl]="autoSaveControl" labelPosition="before">
          <dx-label>Auto-save drafts</dx-label>
        </dx-toggle>
        <dx-toggle [formControl]="marketingControl" labelPosition="before">
          <dx-label>Marketing emails</dx-label>
        </dx-toggle>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: off, on, required (touched, off), disabled, readonly.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl(false, Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        offControl: new FormControl(false),
        onControl: new FormControl(true),
        requiredControl,
        disabledControl: new FormControl({ value: true, disabled: true }),
        readonlyControl: new FormControl(true),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(260px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Off</h4>
            <dx-toggle [formControl]="offControl"><dx-label>Setting</dx-label></dx-toggle>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">On</h4>
            <dx-toggle [formControl]="onControl"><dx-label>Setting</dx-label></dx-toggle>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required (invalid)</h4>
            <dx-toggle [formControl]="requiredControl" [required]="true">
              <dx-label>Accept terms</dx-label>
              <dx-error>Required.</dx-error>
            </dx-toggle>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-toggle [formControl]="disabledControl" [disabled]="true"><dx-label>Setting</dx-label></dx-toggle>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Readonly</h4>
            <dx-toggle [formControl]="readonlyControl" [readonly]="true"><dx-label>Setting</dx-label></dx-toggle>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    labelText: 'Enable notifications',
    outLabelText: 'Enable notifications',
    hintText: 'Email and in-app alerts will be turned on.',
    errorText: 'Required.',
  },
  argTypes: {
    labelText: { control: 'text', description: '`<dx-label>` inline label (used when `labelTouchSensitive=true`). Clear to hide.', table: { category: 'Slots' } },
    outLabelText: { control: 'text', description: '`.outLabel` external label (used when `labelTouchSensitive=false`). Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '`<dx-hint>` helper text shown when valid. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '`<dx-error>` error text shown when invalid + touched.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the label / `.outLabel` / hint / error projection slots.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(false) },
    template: `
      <dx-toggle
        [formControl]="control"
        [labelPosition]="labelPosition"
        [labelTouchSensitive]="labelTouchSensitive"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [tabIndex]="tabIndex">
        <dx-label>{{ labelText }}</dx-label>
        <span class="outLabel">{{ outLabelText }}</span>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-toggle>
    `,
  }),
};
