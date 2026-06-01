import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxSelectComponent } from './dx-select.component';
import { DxSelectModule } from './dx-select.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Select',
  component: DxSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [DxSelectModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Single- or multi-select dropdown wrapping `mat-select`. Renders one `mat-option` per ' +
          'item in `[options]` using the `KeyValueModel` shape `{ keyTt, valueTt, color?, ' +
          'permission? }`. Multi-select mode adds an inline search box and pill-style chips with ' +
          'optional background color from `option.color`. CASL `permission` filters options at ' +
          'render time. Implements `ControlValueAccessor` + `Validator` and shares the standard ' +
          '`dx-*` outline / labelPosition / outer-label chrome.',
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
    options: { control: 'object', description: 'List of `KeyValueModel` items: `{ keyTt, valueTt, color?, permission? }`.' },
    multiSelect: { control: 'boolean', description: 'Allow multiple selections — adds chip rendering and an inline search box.' },
    emptyOption: { control: 'boolean', description: 'Add a "None" option at the top of the single-select dropdown.' },
    disabled: { control: 'boolean', description: 'Disable the control.' },
    readonly: { control: 'boolean', description: 'Render as read-only (options cannot be opened).' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    onSelectChange: { action: 'onSelectChange', description: 'Fires with `{ value }` when the selection changes.' },
    onUserChange: { action: 'onUserChange', description: 'Fires with the picked value when the user clicks an option (single-select only).' },
  },
  args: {
    outline: 'outer-label',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
    options: [
      { keyTt: 'option-1', valueTt: 'Option 1' },
      { keyTt: 'option-2', valueTt: 'Option 2' },
      { keyTt: 'option-3', valueTt: 'Option 3' },
    ],
    multiSelect: false,
    emptyOption: false,
    disabled: false,
    readonly: false,
    viewOnly: false,
    required: false,
    noneLabel: false,
    noneBorder: false,
  },
};

export default meta;
type Story = StoryObj<any>;

const COUNTRY_OPTIONS = [
  { keyTt: 'us', valueTt: 'United States' },
  { keyTt: 'gb', valueTt: 'United Kingdom' },
  { keyTt: 'in', valueTt: 'India' },
  { keyTt: 'au', valueTt: 'Australia' },
  { keyTt: 'ca', valueTt: 'Canada' },
  { keyTt: 'de', valueTt: 'Germany' },
  { keyTt: 'fr', valueTt: 'France' },
  { keyTt: 'jp', valueTt: 'Japan' },
];

const STATUS_OPTIONS = [
  { keyTt: 'draft', valueTt: 'Draft', color: '#9E9E9E' },
  { keyTt: 'review', valueTt: 'In review', color: '#FF9800' },
  { keyTt: 'approved', valueTt: 'Approved', color: '#4CAF50' },
  { keyTt: 'archived', valueTt: 'Archived', color: '#607D8B' },
];

const FULL_TEMPLATE = `
  <dx-select
    [formControl]="control"
    [options]="options"
    [multiSelect]="multiSelect"
    [emptyOption]="emptyOption"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [noneBorder]="noneBorder">
    <p dxLabel>Choice</p>
    <dx-label>Choice</dx-label>
  </dx-select>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty single-select.',
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

export const WithEmptyOption: Story = {
  name: 'With "None" option',
  args: { emptyOption: true },
  parameters: {
    docs: {
      description: {
        story: '`[emptyOption]="true"` adds a "None" choice at the top so the user can clear the selection.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('option-2') },
    template: FULL_TEMPLATE,
  }),
};

export const MultiSelect: Story = {
  name: 'Multi-select',
  args: { multiSelect: true, options: COUNTRY_OPTIONS },
  parameters: {
    docs: {
      description: {
        story: '`[multiSelect]="true"` enables multiple selections. The trigger renders each picked value as a pill, and an inline search box filters the option list.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(['us', 'gb', 'in']) },
    template: FULL_TEMPLATE,
  }),
};

export const ColoredOptions: Story = {
  name: 'Colored options (status)',
  args: { options: STATUS_OPTIONS },
  parameters: {
    docs: {
      description: {
        story: '`option.color` paints the option background via the `appOptionBackgroundColor` directive — handy for status-style selectors.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('review') },
    template: FULL_TEMPLATE,
  }),
};

export const MultiSelectColored: Story = {
  name: 'Multi-select colored chips',
  args: { multiSelect: true, options: STATUS_OPTIONS },
  parameters: {
    docs: {
      description: {
        story: 'In multi-select mode `option.color` also paints each selected chip in the trigger area.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(['draft', 'review', 'approved']) },
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
        story: 'Disabled control — the dropdown cannot be opened.',
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
        story: 'Read-only — the value is visible but the dropdown cannot be opened.',
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
        story: 'Display-only mode for summary screens.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('option-2') },
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
    props: { ...args, control: new FormControl('option-2') },
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

export const ManyOptions: Story = {
  name: 'Long option list',
  args: { options: COUNTRY_OPTIONS },
  parameters: {
    docs: {
      description: {
        story: 'Single-select with a long option list — `mat-select` scrolls naturally inside the panel.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('gb') },
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
      options: [
        { keyTt: 'option-1', valueTt: 'Option 1' },
        { keyTt: 'option-2', valueTt: 'Option 2' },
        { keyTt: 'option-3', valueTt: 'Option 3' },
      ],
      noneFloatingControl: new FormControl('option-2'),
      floatingControl: new FormControl('option-2'),
      outerLabelControl: new FormControl('option-2'),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-select [formControl]="noneFloatingControl" [options]="options" outline="none-floating">
            <dx-label>Choice</dx-label>
          </dx-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-select [formControl]="floatingControl" [options]="options" outline="floating">
            <dx-label>Choice</dx-label>
          </dx-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-select [formControl]="outerLabelControl" [options]="options" outline="outer-label">
            <p dxLabel>Choice</p>
          </dx-select>
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
            <dx-select [formControl]="defaultControl" [options]="options" outline="outer-label">
              <p dxLabel>Choice</p>
            </dx-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-select [formControl]="valueControl" [options]="options" outline="outer-label">
              <p dxLabel>Choice</p>
            </dx-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-select [formControl]="requiredControl" [options]="options" [required]="true" outline="outer-label">
              <p dxLabel>Choice</p>
            </dx-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-select [formControl]="disabledControl" [options]="options" [disabled]="true" outline="outer-label">
              <p dxLabel>Choice</p>
            </dx-select>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-select [formControl]="viewOnlyControl" [options]="options" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Choice</p>
            </dx-select>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Choice',
    labelText: 'Choice',
    prefixIcon: 'category',
    suffixIcon: '',
    hintText: 'Pick the option that best fits.',
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
      <dx-select
        [formControl]="control"
        [options]="options"
        [multiSelect]="multiSelect"
        [emptyOption]="emptyOption"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [noneBorder]="noneBorder">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true" *ngIf="prefixIcon">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true" *ngIf="suffixIcon">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-select>
    `,
  }),
};
