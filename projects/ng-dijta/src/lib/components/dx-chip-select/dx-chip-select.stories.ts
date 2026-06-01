import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxChipSelectComponent } from './dx-chip-select.component';
import { DxChipSelectModule } from './dx-chip-select.module';

const PRIORITY_OPTIONS = [
  { keyTt: 'low', valueTt: 'Low' },
  { keyTt: 'med', valueTt: 'Medium' },
  { keyTt: 'high', valueTt: 'High' },
  { keyTt: 'urgent', valueTt: 'Urgent' },
];

const CATEGORY_OPTIONS = [
  { keyTt: 'bug', valueTt: 'Bug' },
  { keyTt: 'feature', valueTt: 'Feature' },
  { keyTt: 'docs', valueTt: 'Docs' },
  { keyTt: 'chore', valueTt: 'Chore' },
  { keyTt: 'security', valueTt: 'Security' },
];

const COLORED_OPTIONS = [
  { keyTt: 'todo', valueTt: 'To do', color: '#6b7280' },
  { keyTt: 'doing', valueTt: 'In progress', color: '#f59e0b' },
  { keyTt: 'review', valueTt: 'In review', color: '#3b82f6' },
  { keyTt: 'done', valueTt: 'Done', color: '#10b981' },
  { keyTt: 'blocked', valueTt: 'Blocked', color: '#ef4444' },
];

const meta: Meta<any> = {
  title: 'Form Inputs/Chip Select',
  component: DxChipSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [DxChipSelectModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Chip-based selection input — renders each option as a clickable button-style label. ' +
          'Supports single- or multi-select via native `<input type="radio|checkbox">` controls, ' +
          'custom per-option `color`, and three label-layout variants ' +
          '(`floating` / `none-floating` / `outer-label`). Implements `ControlValueAccessor` ' +
          'for reactive and template-driven forms. Use this when the list is short and chips ' +
          'are more scannable than a dropdown; for searchable/long lists use `dx-chip-autocomplete`.',
      },
    },
  },
  argTypes: {
    options: { control: 'object', description: 'List of selectable options. Each item needs `keyTt` (value) and `valueTt` (display label). Optional `color` (hex) tints the chip via `[changeChipColor]`.' },
    multiSelect: { control: 'boolean', description: 'Allow multiple chips to be selected at once. Renders each chip as a checkbox instead of a radio.' },
    multi: { control: 'boolean', description: 'Alias for `multiSelect` — kept for backward compatibility.' },
    disabled: { control: 'boolean', description: 'Disable the control — chips become non-interactive.' },
    readonly: { control: 'boolean', description: 'Render as read-only — focusable but not toggleable.' },
    viewOnly: { control: 'boolean', description: 'View-only display mode — shows the current selection without any interaction affordance.' },
    required: { control: 'boolean', description: 'Mark the field as required. Renders the asterisk in `outer-label` mode.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot (the `[dxLabel]` projection).' },
    name: { control: 'text', description: 'Form control `name` attribute — used as a radio-group identifier when `multi` is false.' },
    outline: {
      control: { type: 'inline-radio' },
      options: ['floating', 'none-floating', 'outer-label'],
      description: 'Field label / outline style. `outer-label` projects the label outside the Material form-field via `[dxLabel]`.',
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
    tabIndex: { control: 'number', description: 'Tab order index applied to the underlying input controls.' },
  },
  args: {
    options: PRIORITY_OPTIONS,
    multiSelect: false,
    multi: false,
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    name: 'priority',
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-chip-select
    [formControl]="control"
    [options]="options"
    [multiSelect]="multiSelect"
    [multi]="multi"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [name]="name"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [tabIndex]="tabIndex">
    <p dxLabel>Priority</p>
    <dx-label>Priority</dx-label>
  </dx-chip-select>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Single-select chips. Tap a chip to select it — the previous selection is automatically cleared (radio behavior).',
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
        story: 'Initial selection bound through the `FormControl`. For single-select the value is a string; for multi-select the value is a comma-separated string of selected keys.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('high') },
    template: FULL_TEMPLATE,
  }),
};

export const MultiSelect: Story = {
  name: 'Multi-select',
  args: { multiSelect: true, options: CATEGORY_OPTIONS, name: 'categories' },
  parameters: {
    docs: {
      description: {
        story: 'Set `[multiSelect]="true"` (or the `[multi]` alias) to switch chips from radio to checkbox behavior. Multiple chips can be selected at once.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(['bug', 'docs']) },
    template: FULL_TEMPLATE.replace('<p dxLabel>Priority</p>', '<p dxLabel>Categories</p>').replace('<dx-label>Priority</dx-label>', '<dx-label>Categories</dx-label>'),
  }),
};

export const ColoredChips: Story = {
  name: 'Colored chips',
  args: { options: COLORED_OPTIONS, name: 'status' },
  parameters: {
    docs: {
      description: {
        story:
          'Each option can carry a `color` (hex). When selected the chip fills with the color; when unselected it shows only a colored border. Useful for status pickers, priorities, and traffic-light states.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('doing') },
    template: FULL_TEMPLATE.replace('<p dxLabel>Priority</p>', '<p dxLabel>Status</p>').replace('<dx-label>Priority</dx-label>', '<dx-label>Status</dx-label>'),
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
        story: 'Floating Material label that animates into the outline border on focus.',
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
        story: 'Outer label placed to the left of the field — useful for dense, label-aligned form layouts.',
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
        story: 'Marks the field as required. Pair with `Validators.required` on the bound control to enforce a selection.',
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
        story: 'Disabled control — all chips become non-interactive. Preserves the visual selection.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: 'med', disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true },
  parameters: {
    docs: {
      description: {
        story: 'Read-only control — chips stay focusable for screen-reader announcement but cannot be toggled.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('high') },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'View-only display — typically used in summary screens to show a previously-saved selection without any interaction affordance.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('urgent') },
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
      options: PRIORITY_OPTIONS,
      noneFloatingControl: new FormControl('med'),
      floatingControl: new FormControl('med'),
      outerLabelControl: new FormControl('med'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-chip-select [formControl]="noneFloatingControl" [options]="options" outline="none-floating">
            <dx-label>Priority</dx-label>
          </dx-chip-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-chip-select [formControl]="floatingControl" [options]="options" outline="floating">
            <dx-label>Priority</dx-label>
          </dx-chip-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-chip-select [formControl]="outerLabelControl" [options]="options" outline="outer-label">
            <p dxLabel>Priority</p>
          </dx-chip-select>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, preselected, multi-select, required, disabled, view-only.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl(null, Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        options: PRIORITY_OPTIONS,
        defaultControl: new FormControl(null),
        preselectedControl: new FormControl('high'),
        multiControl: new FormControl(['low', 'med']),
        requiredControl,
        disabledControl: new FormControl({ value: 'med', disabled: true }),
        viewOnlyControl: new FormControl('urgent'),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-chip-select [formControl]="defaultControl" [options]="options" outline="outer-label">
              <p dxLabel>Priority</p>
            </dx-chip-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Preselected</h4>
            <dx-chip-select [formControl]="preselectedControl" [options]="options" outline="outer-label">
              <p dxLabel>Priority</p>
            </dx-chip-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Multi-select</h4>
            <dx-chip-select [formControl]="multiControl" [options]="options" [multiSelect]="true" outline="outer-label">
              <p dxLabel>Priority</p>
            </dx-chip-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-chip-select [formControl]="requiredControl" [options]="options" [required]="true" outline="outer-label">
              <p dxLabel>Priority</p>
            </dx-chip-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-chip-select [formControl]="disabledControl" [options]="options" [disabled]="true" outline="outer-label">
              <p dxLabel>Priority</p>
            </dx-chip-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-chip-select [formControl]="viewOnlyControl" [options]="options" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Priority</p>
            </dx-chip-select>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Priority',
    labelText: 'Priority',
    suffixIcon: 'flag',
    hintText: 'Pick one of the available priorities.',
    errorText: '',
    outline: 'outer-label',
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '`<p dxLabel>` outer-label text. Visible when outline = "outer-label". Clear to hide.', table: { category: 'Slots' } },
    labelText: { control: 'text', description: '`<dx-label>` inline label text. Clear to hide.', table: { category: 'Slots' } },
    suffixIcon: { control: 'text', description: '`<dx-suffix>` Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '`<dx-hint>` helper text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '`<dx-error>` error text. Set a value to show.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates every content-projection slot: outer label, inner label, suffix icon, hint, and error. Toggle each slot text live from Controls.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-chip-select
        [formControl]="control"
        [options]="options"
        [multiSelect]="multiSelect"
        [multi]="multi"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [name]="name"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [tabIndex]="tabIndex">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-chip-select>
    `,
  }),
};
