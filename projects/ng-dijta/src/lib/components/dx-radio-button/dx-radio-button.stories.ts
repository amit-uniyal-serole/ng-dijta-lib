import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxRadioButtonComponent } from './dx-radio-button.component';
import { DxRadioButtonModule } from './dx-radio-button.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Radio Button',
  component: DxRadioButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [DxRadioButtonModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Single-choice radio group wrapping `mat-radio-group`. Renders one `mat-radio-button` ' +
          'per item in `[options]` (using the `KeyValueModel` shape `{ keyTt, valueTt, subtitle?, ' +
          'permission? }`). Options can be laid out horizontally or vertically, support an ' +
          'optional subtitle, and can be filtered via CASL `permission`. The selected option ' +
          'key is written onto the bound `FormControl` via `ControlValueAccessor`.',
      },
    },
  },
  argTypes: {
    options: { control: 'object', description: 'List of `KeyValueModel` items: `{ keyTt, valueTt, subtitle?, permission? }`.' },
    displayType: {
      control: { type: 'inline-radio' },
      options: ['horizantal', 'vertical'],
      description: 'Layout direction. `horizantal` (default) lays buttons side-by-side; `vertical` stacks them.',
    },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    disabled: { control: 'boolean', description: 'Disable the whole group.' },
    readonly: { control: 'boolean', description: 'Render read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    onRadioChange: { action: 'onRadioChange', description: 'Fires with the picked `{ value }` when the selection changes.' },
  },
  args: {
    options: [
      { keyTt: 'option-1', valueTt: 'Option 1' },
      { keyTt: 'option-2', valueTt: 'Option 2' },
      { keyTt: 'option-3', valueTt: 'Option 3' },
    ],
    displayType: 'horizantal',
    required: false,
    disabled: false,
    readonly: false,
    viewOnly: false,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-radio-button
    [formControl]="control"
    [options]="options"
    [displayType]="displayType"
    [required]="required"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly">
    <dx-label>Preference</dx-label>
  </dx-radio-button>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline horizontal radio group, nothing selected.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected option',
  parameters: {
    docs: {
      description: {
        story: 'Initial value matching one of the option keys (`option-2`).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('option-2') },
    template: FULL_TEMPLATE,
  }),
};

export const Vertical: Story = {
  name: 'Vertical layout',
  args: { displayType: 'vertical' },
  parameters: {
    docs: {
      description: {
        story: '`[displayType]="vertical"` stacks each option in its own row.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const WithSubtitles: Story = {
  name: 'With option subtitles',
  args: {
    displayType: 'vertical',
    options: [
      { keyTt: 'free', valueTt: 'Free', subtitle: 'Up to 3 projects, community support.' },
      { keyTt: 'pro', valueTt: 'Pro', subtitle: 'Unlimited projects, priority email support.' },
      { keyTt: 'enterprise', valueTt: 'Enterprise', subtitle: 'SSO, audit logs, dedicated CSM.' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Each option can carry a `subtitle` for plan/feature explanations under the label.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('pro') },
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
        story: 'Disabled — the whole group is inert.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: 'option-2', disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — buttons are focusable but the selection cannot be changed.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('option-2') },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true },
  parameters: {
    docs: {
      description: {
        story: 'Display-only mode for summary screens (adds the `.display-view` class to the wrapper).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('option-2') },
    template: FULL_TEMPLATE,
  }),
};

export const TwoOptions: Story = {
  name: 'Yes / No',
  args: {
    options: [
      { keyTt: 'yes', valueTt: 'Yes' },
      { keyTt: 'no', valueTt: 'No' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Common binary choice — two side-by-side radios.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('yes') },
    template: FULL_TEMPLATE,
  }),
};

export const ManyOptions: Story = {
  name: 'Many options (vertical)',
  args: {
    displayType: 'vertical',
    options: [
      { keyTt: 'sun', valueTt: 'Sunday' },
      { keyTt: 'mon', valueTt: 'Monday' },
      { keyTt: 'tue', valueTt: 'Tuesday' },
      { keyTt: 'wed', valueTt: 'Wednesday' },
      { keyTt: 'thu', valueTt: 'Thursday' },
      { keyTt: 'fri', valueTt: 'Friday' },
      { keyTt: 'sat', valueTt: 'Saturday' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Long option list — vertical layout keeps each row legible.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('wed') },
    template: FULL_TEMPLATE,
  }),
};

export const AllLayouts: Story = {
  name: 'Both layouts',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of `horizantal` vs `vertical` layouts.',
      },
    },
  },
  render: () => ({
    props: {
      options: [
        { keyTt: 'option-1', valueTt: 'Option 1' },
        { keyTt: 'option-2', valueTt: 'Option 2' },
        { keyTt: 'option-3', valueTt: 'Option 3' },
      ],
      horizontalControl: new FormControl('option-2'),
      verticalControl: new FormControl('option-2'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">horizantal (default)</h4>
          <dx-radio-button [formControl]="horizontalControl" [options]="options" displayType="horizantal">
            <dx-label>Preference</dx-label>
          </dx-radio-button>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">vertical</h4>
          <dx-radio-button [formControl]="verticalControl" [options]="options" displayType="vertical">
            <dx-label>Preference</dx-label>
          </dx-radio-button>
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
        options: [
          { keyTt: 'option-1', valueTt: 'Option 1' },
          { keyTt: 'option-2', valueTt: 'Option 2' },
          { keyTt: 'option-3', valueTt: 'Option 3' },
        ],
        defaultControl: new FormControl(null),
        valueControl: new FormControl('option-2'),
        requiredControl,
        disabledControl: new FormControl({ value: 'option-2', disabled: true }),
        viewOnlyControl: new FormControl('option-2'),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-radio-button [formControl]="defaultControl" [options]="options">
              <dx-label>Preference</dx-label>
            </dx-radio-button>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-radio-button [formControl]="valueControl" [options]="options">
              <dx-label>Preference</dx-label>
            </dx-radio-button>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-radio-button [formControl]="requiredControl" [options]="options" [required]="true">
              <dx-label>Preference</dx-label>
              <dx-error>Please pick an option.</dx-error>
            </dx-radio-button>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-radio-button [formControl]="disabledControl" [options]="options" [disabled]="true">
              <dx-label>Preference</dx-label>
            </dx-radio-button>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-radio-button [formControl]="viewOnlyControl" [options]="options" [viewOnly]="true">
              <dx-label>Preference</dx-label>
            </dx-radio-button>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    labelText: 'Preference',
    errorText: 'Please pick an option.',
  },
  argTypes: {
    labelText: { control: 'text', description: '`<dx-label>` group label text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '`<dx-error>` error text. Shown when the control is required, touched, and empty.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the group `<dx-label>` and `<dx-error>` projection slots. The error renders only when the bound control is required, touched, and empty.',
      },
    },
  },
  render: (args) => {
    const control = new FormControl(null, Validators.required);
    control.markAsTouched();
    return {
      props: { ...args, required: true, control },
      template: `
        <dx-radio-button
          [formControl]="control"
          [options]="options"
          [displayType]="displayType"
          [required]="required"
          [disabled]="disabled"
          [readonly]="readonly"
          [viewOnly]="viewOnly">
          <dx-label>{{ labelText }}</dx-label>
          <dx-error>{{ errorText }}</dx-error>
        </dx-radio-button>
      `,
    };
  },
};
