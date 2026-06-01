import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxInputIconComponent } from './dx-input-icon.component';
import { DxInputIconModule } from './dx-input-icon.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Input Icon',
  component: DxInputIconComponent,
  decorators: [
    moduleMetadata({
      imports: [DxInputIconModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Icon-picker form field. Clicking the input opens a Material dialog with the ' +
          'Material Icons palette; the picked icon name is written to the bound form control ' +
          'as a string (e.g. `"home"`). Use this when capturing an icon reference for status, ' +
          'category, or navigation configuration. Implements `ControlValueAccessor` + ' +
          '`Validator` and follows the same `outline` / `labelPosition` / outer-label chrome ' +
          'as the rest of the `dx-*` form controls.',
      },
    },
  },
  argTypes: {
    icon: { control: 'text', description: 'Material Icons name shown as the suffix icon — clickable affordance that opens the picker. Default `"search"`.' },
    placeholder: { control: 'text', description: 'Placeholder text shown when no icon is picked. Default `"Select Icon"`.' },
    iconConfig: { control: 'object', description: 'Optional `IconConfig` passed to the dialog — restricts the palette to a subset (e.g. only outlined icons, only a specific category).' },
    mask: { control: 'text', description: 'Optional input mask applied to the visible value.' },
    disabled: { control: 'boolean', description: 'Disable the control — the dialog cannot be opened.' },
    readonly: { control: 'boolean', description: 'Render as read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode — Material chrome stripped.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
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
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
  },
  args: {
    icon: 'search',
    placeholder: 'Select Icon',
    iconConfig: undefined,
    mask: '',
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-input-icon
    [formControl]="control"
    [icon]="icon"
    [placeholder]="placeholder"
    [iconConfig]="iconConfig"
    [mask]="mask"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType">
    <p dxLabel>Icon</p>
    <dx-label>Icon</dx-label>
  </dx-input-icon>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline icon picker. Click to open the icon selection dialog.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected icon',
  parameters: {
    docs: {
      description: {
        story: 'Initial icon name (`"home"`) bound via the FormControl. The text input shows the icon name; clicking opens the picker to change it.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('home') },
    template: FULL_TEMPLATE,
  }),
};

export const CustomTriggerIcon: Story = {
  name: 'Custom trigger icon',
  args: { icon: 'palette' },
  parameters: {
    docs: {
      description: {
        story: 'Override `[icon]` to change the suffix glyph that opens the picker dialog. Any Material Icons name works.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const CustomPlaceholder: Story = {
  name: 'Custom placeholder',
  args: { placeholder: 'Pick a category icon…' },
  parameters: {
    docs: {
      description: {
        story: '`[placeholder]` sets the empty-state hint text.',
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
        story: 'Label rendered outside the Material form-field — set `outline="outer-label"` and project via `[dxLabel]`.',
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
        story: 'Marks the field as required. Pair with `Validators.required` on the bound control to enforce a value.',
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
        story: 'Disabled control — clicking does not open the picker.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: 'home', disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — focusable but the picker cannot be opened.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('settings') },
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
    props: { ...args, control: new FormControl('star') },
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
      noneFloatingControl: new FormControl('home'),
      floatingControl: new FormControl('home'),
      outerLabelControl: new FormControl('home'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-input-icon [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Icon</dx-label>
          </dx-input-icon>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-input-icon [formControl]="floatingControl" outline="floating">
            <dx-label>Icon</dx-label>
          </dx-input-icon>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-input-icon [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel>Icon</p>
          </dx-input-icon>
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
        valueControl: new FormControl('home'),
        requiredControl,
        disabledControl: new FormControl({ value: 'lock', disabled: true }),
        viewOnlyControl: new FormControl('star'),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-input-icon [formControl]="defaultControl" outline="outer-label">
              <p dxLabel>Icon</p>
            </dx-input-icon>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-input-icon [formControl]="valueControl" outline="outer-label">
              <p dxLabel>Icon</p>
            </dx-input-icon>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-input-icon [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel>Icon</p>
            </dx-input-icon>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-input-icon [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel>Icon</p>
            </dx-input-icon>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-input-icon [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Icon</p>
            </dx-input-icon>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Icon',
    labelText: 'Icon',
    hintText: 'Click the field to open the icon picker.',
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
        story: 'Demonstrates outer label, inner label, hint, and error projection slots.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-input-icon
        [formControl]="control"
        [icon]="icon"
        [placeholder]="placeholder"
        [iconConfig]="iconConfig"
        [mask]="mask"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-input-icon>
    `,
  }),
};
