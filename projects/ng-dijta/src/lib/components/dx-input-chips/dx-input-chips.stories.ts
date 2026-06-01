import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxInputChipsComponent } from './dx-input-chips.component';
import { DxInputChipsModule } from './dx-input-chips.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Input Chips',
  component: DxInputChipsComponent,
  decorators: [
    moduleMetadata({
      imports: [DxInputChipsModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Free-form chip input built on Angular Material `mat-chip-grid`. Users type a ' +
          'value and press **Enter** or **Comma** to add it as a removable chip. The bound ' +
          'form-control value is a `string[]`. Useful for capturing tags, email lists, ' +
          'keyword filters, and other ad-hoc multi-value entries. Implements ' +
          '`ControlValueAccessor` for reactive and template-driven forms, with three label ' +
          'layouts (`floating` / `none-floating` / `outer-label`).',
      },
    },
  },
  argTypes: {
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render as read-only — chips remain visible but can\'t be added or removed.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode — strips the Material chrome.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    addOnBlur: { control: 'boolean', description: 'Add the current input value as a chip when the field loses focus. Default `true`.' },
    selectable: { control: 'boolean', description: 'Allow chips to be selected (click). Mostly cosmetic — selection has no business effect here.' },
    removable: { control: 'boolean', description: 'Show the `×` button on each chip so users can delete it. Default `true`.' },
    visible: { control: 'boolean', description: 'Toggle chip visibility (rarely needed).' },
    noErrorSpace: { control: 'boolean', description: 'Collapse the space reserved for validation errors.' },
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
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    noneBorder: false,
    addOnBlur: true,
    selectable: true,
    removable: true,
    visible: true,
    noErrorSpace: false,
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-input-chips
    [formControl]="control"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [noneBorder]="noneBorder"
    [addOnBlur]="addOnBlur"
    [selectable]="selectable"
    [removable]="removable"
    [visible]="visible"
    [noErrorSpace]="noErrorSpace"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType">
    <p dxLabel>Tags</p>
    <dx-label>Tags</dx-label>
  </dx-input-chips>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty chip input. Type a value and press **Enter** or **,** to add it.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected chips',
  parameters: {
    docs: {
      description: {
        story: 'Initial chips bound via `FormControl(["…", "…"])`. The value is always a `string[]`.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl(['angular', 'typescript', 'storybook']),
    },
    template: FULL_TEMPLATE,
  }),
};

export const NoAddOnBlur: Story = {
  name: 'No add-on-blur',
  args: { addOnBlur: false },
  parameters: {
    docs: {
      description: {
        story: '`[addOnBlur]="false"` requires the user to explicitly press **Enter** or **,** — leaving the field without pressing one of those keys discards the typed text. Useful when partial typing is common.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(['react']) },
    template: FULL_TEMPLATE,
  }),
};

export const NotRemovable: Story = {
  name: 'Locked chips (not removable)',
  args: { removable: false },
  parameters: {
    docs: {
      description: {
        story: '`[removable]="false"` hides the `×` button on chips. Users can still add new chips but cannot delete existing ones — useful for fixed default tags.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl(['locked', 'fixed', 'permanent']),
    },
    template: FULL_TEMPLATE,
  }),
};

export const OuterLabel: Story = {
  name: 'Outer label',
  args: { outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Label rendered outside the Material form-field — set `outline="outer-label"` and project the label via `[dxLabel]`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
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
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const LabelLeft: Story = {
  name: 'Outer label — left position',
  args: { outline: 'outer-label', labelPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Outer label placed to the left of the field — useful in dense layouts.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const Required: Story = {
  args: { required: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Required field — renders the asterisk in `outer-label` mode. Pair with `Validators.required` on the bound control.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([], Validators.required) },
    template: FULL_TEMPLATE,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled control — chips render but cannot be added, edited, or removed.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({
        value: ['locked', 'tag', 'list'],
        disabled: true,
      }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only control — focusable for screen readers but chips can\'t be added or removed.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl(['read', 'only', 'tags']),
    },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Display-only mode — typically used in summary screens to render previously-saved chips without any interaction affordance.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl(['design', 'review', 'approved']),
    },
    template: FULL_TEMPLATE,
  }),
};

export const NoBorder: Story = {
  name: 'Borderless',
  args: { noneBorder: true },
  parameters: {
    docs: {
      description: {
        story: '`[noneBorder]="true"` strips the Material outline border — useful inside table cells or pre-bordered containers.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl(['borderless']),
    },
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
      noneFloatingControl: new FormControl(['alpha', 'beta']),
      floatingControl: new FormControl(['alpha', 'beta']),
      outerLabelControl: new FormControl(['alpha', 'beta']),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-input-chips [formControl]="noneFloatingControl" outline="none-floating">
            <dx-label>Tags</dx-label>
          </dx-input-chips>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-input-chips [formControl]="floatingControl" outline="floating">
            <dx-label>Tags</dx-label>
          </dx-input-chips>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-input-chips [formControl]="outerLabelControl" outline="outer-label">
            <p dxLabel>Tags</p>
          </dx-input-chips>
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
    const requiredControl = new FormControl([], Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        defaultControl: new FormControl([]),
        valueControl: new FormControl(['tag1', 'tag2', 'tag3']),
        requiredControl,
        disabledControl: new FormControl({
          value: ['tag1', 'tag2'],
          disabled: true,
        }),
        viewOnlyControl: new FormControl(['design', 'review']),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-input-chips [formControl]="defaultControl" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-input-chips>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-input-chips [formControl]="valueControl" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-input-chips>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-input-chips [formControl]="requiredControl" [required]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-input-chips>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-input-chips [formControl]="disabledControl" [disabled]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-input-chips>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-input-chips [formControl]="viewOnlyControl" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-input-chips>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Tags',
    labelText: 'Tags',
    prefixIcon: 'sell',
    suffixIcon: 'help',
    hintText: 'Press Enter or comma to add a tag.',
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
        story: 'Demonstrates every content-projection slot: outer label, inner label, prefix icon, suffix icon, hint, and error.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(['react', 'angular']) },
    template: `
      <dx-input-chips
        [formControl]="control"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder"
        [addOnBlur]="addOnBlur"
        [selectable]="selectable"
        [removable]="removable"
        [visible]="visible"
        [noErrorSpace]="noErrorSpace"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-input-chips>
    `,
  }),
};
