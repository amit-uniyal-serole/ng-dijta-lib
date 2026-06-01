import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxChipAutocompleteComponent } from './dx-chip-autocomplete.component';
import { DxChipAutocompleteModule } from './dx-chip-autocomplete.module';

const TAG_OPTIONS = [
  { keyTt: 'angular', valueTt: 'Angular' },
  { keyTt: 'react', valueTt: 'React' },
  { keyTt: 'vue', valueTt: 'Vue' },
  { keyTt: 'svelte', valueTt: 'Svelte' },
  { keyTt: 'solid', valueTt: 'Solid' },
  { keyTt: 'qwik', valueTt: 'Qwik' },
  { keyTt: 'preact', valueTt: 'Preact' },
];

const COUNTRY_GROUPS = [
  {
    label: 'Europe',
    options: [
      { keyTt: 'fr', valueTt: 'France' },
      { keyTt: 'de', valueTt: 'Germany' },
      { keyTt: 'es', valueTt: 'Spain' },
      { keyTt: 'it', valueTt: 'Italy' },
    ],
  },
  {
    label: 'Asia',
    options: [
      { keyTt: 'in', valueTt: 'India' },
      { keyTt: 'jp', valueTt: 'Japan' },
      { keyTt: 'sg', valueTt: 'Singapore' },
    ],
  },
  {
    label: 'Americas',
    options: [
      { keyTt: 'us', valueTt: 'United States' },
      { keyTt: 'ca', valueTt: 'Canada' },
      { keyTt: 'br', valueTt: 'Brazil' },
    ],
  },
];

const meta: Meta<any> = {
  title: 'Form Inputs/Chip Autocomplete',
  component: DxChipAutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [DxChipAutocompleteModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Multi-select autocomplete that renders chosen values as removable Material chips. ' +
          'Wraps `mat-select` + `mat-chip-listbox` with an inline search input, optional ' +
          '"create new option" action, grouped options (`[groups]`), country-flag styling, ' +
          'three label-layout variants (`floating` / `none-floating` / `outer-label`), and ' +
          '`ControlValueAccessor` so it plugs into reactive and template-driven forms.',
      },
    },
  },
  argTypes: {
    options: { control: 'object', description: 'Flat list of selectable options. Each item needs `keyTt` (value) and `valueTt` (display label). Mutually exclusive with `groups`.' },
    groups: { control: 'object', description: 'Grouped options: an array of `{ label, options }`. Use when options have a categorical hierarchy (regions, departments, etc.).' },
    loading: { control: 'boolean', description: 'Show a Material spinner inside the panel while options are loading.' },
    disabled: { control: 'boolean', description: 'Disable the control — chips become non-removable and the panel cannot open.' },
    required: { control: 'boolean', description: 'Mark the field as required. Renders the asterisk in `outer-label` mode.' },
    viewOnly: { control: 'boolean', description: 'View-only display mode — strips the form-field chrome and shows just the selected chips.' },
    noErrorSpace: { control: 'boolean', description: 'Collapses the space reserved for the validation error message.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot (the `[dxLabel]` projection).' },
    showToolTip: { control: 'boolean', description: 'Show a tooltip with the full chip label when it overflows.' },
    country: { control: 'boolean', description: 'Render each option with a country-flag glyph using `keyTt` as the ISO code.' },
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
    createOption: { control: 'object', description: 'Inline "create new" action shown at the bottom of the panel. `{ isShow: true, label: "…" }`. Emits `(onClickCreateOption)`.' },
    onSelectChange: { action: 'onSelectChange', description: 'Fires when the chip selection changes.' },
    onautoCompleteSelect: { action: 'onautoCompleteSelect', description: 'Fires on every keystroke in the inline search input.' },
    onClickCreateOption: { action: 'onClickCreateOption', description: 'Fires when the "create new option" row is clicked.' },
  },
  args: {
    loading: false,
    required: false,
    options: TAG_OPTIONS,
    groups: [],
    disabled: false,
    showToolTip: true,
    country: false,
    noneLabel: false,
    labelPosition: 'top',
    viewOnly: false,
    noErrorSpace: false,
    outline: 'none-floating',
    outerLabelErrorType: 'filled-error',
    createOption: {},
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-chip-autocomplete
    [formControl]="control"
    [loading]="loading"
    [required]="required"
    [options]="options"
    [groups]="groups"
    [disabled]="disabled"
    [showToolTip]="showToolTip"
    [country]="country"
    [noneLabel]="noneLabel"
    [labelPosition]="labelPosition"
    [viewOnly]="viewOnly"
    [noErrorSpace]="noErrorSpace"
    [outline]="outline"
    [outerLabelErrorType]="outerLabelErrorType"
    [createOption]="createOption">
    <p dxLabel>Tags</p>
    <dx-label>Tags</dx-label>
  </dx-chip-autocomplete>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline multi-select. Pick multiple options from the panel — each selection renders as a removable chip in the field.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected values',
  parameters: {
    docs: {
      description: {
        story: 'Initial selection bound via `FormControl([…])`. Chips render in the order of the array.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl([
        { keyTt: 'angular', valueTt: 'Angular' },
        { keyTt: 'react', valueTt: 'React' },
      ]),
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
        story: 'Outer label placed to the left of the field. Useful for dense, label-aligned form layouts.',
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
        story: 'Disabled control — chips are non-removable and the panel will not open.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({
        value: [
          { keyTt: 'angular', valueTt: 'Angular' },
          { keyTt: 'react', valueTt: 'React' },
        ],
        disabled: true,
      }),
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
        story: 'View-only display — typically used in summary screens to show previously-saved chips without any interaction.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl([
        { keyTt: 'angular', valueTt: 'Angular' },
        { keyTt: 'svelte', valueTt: 'Svelte' },
        { keyTt: 'vue', valueTt: 'Vue' },
      ]),
    },
    template: FULL_TEMPLATE,
  }),
};

export const Loading: Story = {
  args: { loading: true, options: [] },
  parameters: {
    docs: {
      description: {
        story: 'Loading state — empty `options` + `loading=true` shows a Material spinner inside the panel. Pair with a server-driven `(onautoCompleteSelect)` handler.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const GroupedOptions: Story = {
  name: 'Grouped options',
  args: { options: [], groups: COUNTRY_GROUPS },
  parameters: {
    docs: {
      description: {
        story:
          'Use `[groups]` instead of `[options]` when items have a categorical hierarchy. Each group is rendered as a `mat-optgroup` with its own search filtering.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const WithCreateOption: Story = {
  name: 'Create new option',
  args: {
    createOption: { isShow: true, label: 'Add new tag' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Inline "+ Add new" footer row at the bottom of the panel. Click emits `(onClickCreateOption)` — typical use is to open a creation dialog and push the new value into `[options]`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const NoErrorSpace: Story = {
  name: 'No error space',
  args: { noErrorSpace: true },
  parameters: {
    docs: {
      description: {
        story: 'Collapses the reserved space below the field that normally holds the validation error message. Use in dense layouts where the gap is unwanted.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
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
      options: TAG_OPTIONS,
      noneFloatingControl: new FormControl([]),
      floatingControl: new FormControl([]),
      outerLabelControl: new FormControl([]),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-chip-autocomplete [formControl]="noneFloatingControl" [options]="options" outline="none-floating">
            <dx-label>Tags</dx-label>
          </dx-chip-autocomplete>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-chip-autocomplete [formControl]="floatingControl" [options]="options" outline="floating">
            <dx-label>Tags</dx-label>
          </dx-chip-autocomplete>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-chip-autocomplete [formControl]="outerLabelControl" [options]="options" outline="outer-label">
            <p dxLabel>Tags</p>
          </dx-chip-autocomplete>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, preselected, required, disabled, view-only, loading.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl([], Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        options: TAG_OPTIONS,
        defaultControl: new FormControl([]),
        preselectedControl: new FormControl([
          { keyTt: 'angular', valueTt: 'Angular' },
          { keyTt: 'react', valueTt: 'React' },
        ]),
        requiredControl,
        disabledControl: new FormControl({
          value: [{ keyTt: 'angular', valueTt: 'Angular' }],
          disabled: true,
        }),
        viewOnlyControl: new FormControl([
          { keyTt: 'angular', valueTt: 'Angular' },
          { keyTt: 'vue', valueTt: 'Vue' },
        ]),
        loadingControl: new FormControl([]),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-chip-autocomplete [formControl]="defaultControl" [options]="options" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-chip-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Preselected</h4>
            <dx-chip-autocomplete [formControl]="preselectedControl" [options]="options" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-chip-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-chip-autocomplete [formControl]="requiredControl" [options]="options" [required]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-chip-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-chip-autocomplete [formControl]="disabledControl" [options]="options" [disabled]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-chip-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-chip-autocomplete [formControl]="viewOnlyControl" [options]="options" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-chip-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Loading</h4>
            <dx-chip-autocomplete [formControl]="loadingControl" [options]="[]" [loading]="true" outline="outer-label">
              <p dxLabel>Tags</p>
            </dx-chip-autocomplete>
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
    suffixIcon: 'sell',
    hintText: 'Pick one or more technology tags.',
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
    props: { ...args, control: new FormControl([]) },
    template: `
      <dx-chip-autocomplete
        [formControl]="control"
        [loading]="loading"
        [required]="required"
        [options]="options"
        [groups]="groups"
        [disabled]="disabled"
        [showToolTip]="showToolTip"
        [country]="country"
        [noneLabel]="noneLabel"
        [labelPosition]="labelPosition"
        [viewOnly]="viewOnly"
        [noErrorSpace]="noErrorSpace"
        [outline]="outline"
        [outerLabelErrorType]="outerLabelErrorType"
        [createOption]="createOption">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-chip-autocomplete>
    `,
  }),
};
