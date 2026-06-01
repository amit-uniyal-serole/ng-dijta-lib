import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxAutocompleteSelectComponent } from './dx-autocomplete-select.component';
import { DxAutocompleteSelectModule } from './dx-autocomplete-select.module';

const COUNTRY_OPTIONS = [
  { keyTt: 'us', valueTt: 'United States' },
  { keyTt: 'ca', valueTt: 'Canada' },
  { keyTt: 'mx', valueTt: 'Mexico' },
  { keyTt: 'gb', valueTt: 'United Kingdom' },
  { keyTt: 'de', valueTt: 'Germany' },
  { keyTt: 'fr', valueTt: 'France' },
  { keyTt: 'in', valueTt: 'India' },
  { keyTt: 'jp', valueTt: 'Japan' },
  { keyTt: 'au', valueTt: 'Australia' },
  { keyTt: 'br', valueTt: 'Brazil' },
];

const SUBTITLE_OPTIONS = [
  { keyTt: 'eng', valueTt: 'Engineering', subtitle: 'Software, hardware, QA' },
  { keyTt: 'design', valueTt: 'Design', subtitle: 'Product, UX, brand' },
  { keyTt: 'mkt', valueTt: 'Marketing', subtitle: 'Growth, content, ops' },
  { keyTt: 'ops', valueTt: 'Operations', subtitle: 'Finance, IT, people' },
];

const SIMPLE_OPTIONS = [
  { keyTt: 'option-1', valueTt: 'Option 1' },
  { keyTt: 'option-2', valueTt: 'Option 2' },
  { keyTt: 'option-3', valueTt: 'Option 3' },
  { keyTt: 'option-4', valueTt: 'Option 4' },
];

const meta: Meta<any> = {
  title: 'Form Inputs/Autocomplete Select',
  component: DxAutocompleteSelectComponent,
  decorators: [
    moduleMetadata({
      imports: [DxAutocompleteSelectModule, ReactiveFormsModule, DxLabelDirective],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Searchable single- or multi-select wrapping `mat-select` with an inline search input, ' +
          'optional "create new" action, loading spinner, country-flag styling, subtitle support, ' +
          'and three label-layout variants (`floating` / `none-floating` / `outer-label`). ' +
          'Implements `ControlValueAccessor` for reactive and template-driven forms.',
      },
    },
  },
  argTypes: {
    options: { control: 'object', description: 'List of selectable options. Each item needs `keyTt` (value) and `valueTt` (display label); optional `subtitle`, `color`, and `permission` are supported.' },
    loading: { control: 'boolean', description: 'Show a Material spinner inside the panel while options are loading.' },
    multiple: { control: 'boolean', description: 'Enable multi-select with Material checkboxes per option.' },
    disabled: { control: 'boolean', description: 'Disable the control. Honored through both `[disabled]` input and the `FormControl.disabled` flag.' },
    required: { control: 'boolean', description: 'Marks the field as required and renders the asterisk in the outer-label layout.' },
    readonly: { control: 'boolean', description: 'Render as read-only — the control still focuses but the panel cannot be opened.' },
    viewOnly: { control: 'boolean', description: 'View-only display mode — strips the form-field chrome and shows just the selected value.' },
    noneBorder: { control: 'boolean', description: 'Remove the Material form-field outline border.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot (the `[dxLabel]` projection).' },
    showToolTip: { control: 'boolean', description: 'Show a `matTooltip` with the full option label when the option text is truncated.' },
    country: { control: 'boolean', description: 'Render each option with a country-flag glyph using the `keyTt` as the ISO code (e.g. `us`, `gb`).' },
    emptyOption: { control: 'boolean', description: 'Inject a "None" option at the top of the panel to clear the selection. Ignored when `multiple` is true.' },
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
    value: { control: 'text', description: 'Currently selected value (the option\'s `keyTt`). For reactive forms, prefer `[formControl]`.' },
    tabIndex: { control: 'number', description: 'Tab index on the inner control.' },
    id: { control: false, description: 'DOM id. Auto-generated as `dx-autoselect-{N}` if omitted.' },
    onSelectChange: { action: 'onSelectChange', description: 'Fires when the selected value changes.' },
    onUserChange: { action: 'onUserChange', description: 'Fires only when the change is user-initiated (not programmatic).' },
    onBlur: { action: 'onBlur', description: 'Fires when the control loses focus with the current value.' },
    onautoCompleteSelect: { action: 'onautoCompleteSelect', description: 'Fires on every keystroke in the inline search input.' },
    onClickCreateOption: { action: 'onClickCreateOption', description: 'Fires when the "create new option" row is clicked. Use to open a creation dialog.' },
  },
  args: {
    loading: false,
    options: SIMPLE_OPTIONS,
    showToolTip: true,
    country: false,
    emptyOption: false,
    noneLabel: false,
    viewOnly: false,
    noneBorder: false,
    multiple: false,
    disabled: false,
    required: false,
    outline: 'none-floating',
    outerLabelErrorType: 'filled-error',
    labelPosition: 'top',
    createOption: {},
    value: '',
    tabIndex: 0,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-autocomplete-select
    [formControl]="control"
    [loading]="loading"
    [options]="options"
    [showToolTip]="showToolTip"
    [country]="country"
    [emptyOption]="emptyOption"
    [noneLabel]="noneLabel"
    [viewOnly]="viewOnly"
    [noneBorder]="noneBorder"
    [outline]="outline"
    [outerLabelErrorType]="outerLabelErrorType"
    [labelPosition]="labelPosition"
    [createOption]="createOption"
    [value]="value"
    [tabIndex]="tabIndex"
    [disabled]="disabled"
    [required]="required"
    [multiple]="multiple">
    <p dxLabel>Country</p>
    <dx-label>Country</dx-label>
  </dx-autocomplete-select>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline searchable single-select with the inline Material search input above the option list.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Multiple: Story = {
  name: 'Multi-select',
  args: { multiple: true },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select mode renders Material checkboxes next to each option. The control value becomes an array of `keyTt`s.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const OuterLabel: Story = {
  name: 'Outer label',
  args: { outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Label rendered outside the Material form-field — use `outline="outer-label"` and project the label via the `[dxLabel]` attribute (not `<dx-label>`).',
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
        story: 'Outer label placed to the left of the field. Useful for dense form layouts.',
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
        story: 'Marks the field as required. In `outer-label` mode an asterisk is rendered next to the label; in floating/none-floating modes Material handles the required affordance.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null, Validators.required) },
    template: FULL_TEMPLATE,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, value: 'option-2' },
  parameters: {
    docs: {
      description: {
        story: 'Disabled control — pointer events are blocked and Material applies the disabled styling. Setting `FormControl({ value, disabled: true })` produces the same result.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: 'option-2', disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, outline: 'outer-label' },
  parameters: {
    docs: {
      description: {
        story: 'Display-only rendering — Material chrome is stripped; only the selected value is shown. Useful in summary screens.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('option-1') },
    template: FULL_TEMPLATE,
  }),
};

export const Loading: Story = {
  args: { loading: true, options: [] },
  parameters: {
    docs: {
      description: {
        story: 'Loading state — a Material spinner renders inside the panel until options arrive. Pair with a server-driven `(onautoCompleteSelect)` handler that re-feeds `[options]`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Country: Story = {
  name: 'Country flags',
  args: { country: true, options: COUNTRY_OPTIONS },
  parameters: {
    docs: {
      description: {
        story:
          'Set `[country]="true"` to render a flag glyph before each option using `keyTt` as the ISO-3166 country code. Requires a flag-icon CSS (e.g. `flag-icons`) to be loaded by the host application.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const EmptyOption: Story = {
  name: 'With "None" option',
  args: { emptyOption: true },
  parameters: {
    docs: {
      description: {
        story: 'Adds a leading "None" option that clears the current selection. Ignored when `multiple` is true (multi-select already supports deselection via the checkboxes).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl('option-2') },
    template: FULL_TEMPLATE,
  }),
};

export const WithCreateOption: Story = {
  name: 'Create new option',
  args: {
    createOption: { isShow: true, label: 'Add new category' },
    options: SUBTITLE_OPTIONS,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Inline "+ Add new" footer row. Click emits `(onClickCreateOption)` — typical use is to open a creation dialog and push the new value back into `[options]`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const WithSubtitle: Story = {
  name: 'With subtitles',
  args: { options: SUBTITLE_OPTIONS },
  parameters: {
    docs: {
      description: {
        story: 'Each option can carry a `subtitle` field — rendered on a second line under the main label, useful for descriptions or org-chart paths.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const NoneBorder: Story = {
  name: 'Borderless',
  args: { noneBorder: true },
  parameters: {
    docs: {
      description: {
        story: 'Hides the Material outline border. Useful when embedding inside a table cell or pre-bordered container.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
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
      options: SIMPLE_OPTIONS,
      noneFloatingControl: new FormControl(null),
      floatingControl: new FormControl(null),
      outerLabelControl: new FormControl(null),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-autocomplete-select [formControl]="noneFloatingControl" [options]="options" outline="none-floating">
            <dx-label>Field label</dx-label>
          </dx-autocomplete-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-autocomplete-select [formControl]="floatingControl" [options]="options" outline="floating">
            <dx-label>Field label</dx-label>
          </dx-autocomplete-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-autocomplete-select [formControl]="outerLabelControl" [options]="options" outline="outer-label">
            <p dxLabel>Field label</p>
          </dx-autocomplete-select>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, required, disabled, view-only, loading.',
      },
    },
  },
  render: () => ({
    props: {
      options: SIMPLE_OPTIONS,
      defaultControl: new FormControl(null),
      requiredControl: new FormControl(null, Validators.required),
      disabledControl: new FormControl({ value: 'option-2', disabled: true }),
      viewOnlyControl: new FormControl('option-1'),
      loadingControl: new FormControl(null),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">Default</h4>
          <dx-autocomplete-select [formControl]="defaultControl" [options]="options" outline="outer-label">
            <p dxLabel>Field label</p>
          </dx-autocomplete-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Required</h4>
          <dx-autocomplete-select [formControl]="requiredControl" [options]="options" [required]="true" outline="outer-label">
            <p dxLabel>Field label</p>
          </dx-autocomplete-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Disabled</h4>
          <dx-autocomplete-select [formControl]="disabledControl" [options]="options" [disabled]="true" outline="outer-label">
            <p dxLabel>Field label</p>
          </dx-autocomplete-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">View only</h4>
          <dx-autocomplete-select [formControl]="viewOnlyControl" [options]="options" [viewOnly]="true" outline="outer-label">
            <p dxLabel>Field label</p>
          </dx-autocomplete-select>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Loading</h4>
          <dx-autocomplete-select [formControl]="loadingControl" [options]="[]" [loading]="true" outline="outer-label">
            <p dxLabel>Field label</p>
          </dx-autocomplete-select>
        </div>
      </div>
    `,
  }),
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Country',
    labelText: 'Country',
    suffixIcon: 'public',
    hintText: 'Pick the country where you currently reside.',
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
        story: 'Demonstrates every content-projection slot: outer label, inner label, suffix icon, hint, and error. Toggle each slot text in the Controls panel.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-autocomplete-select
        [formControl]="control"
        [loading]="loading"
        [options]="options"
        [showToolTip]="showToolTip"
        [country]="country"
        [emptyOption]="emptyOption"
        [noneLabel]="noneLabel"
        [viewOnly]="viewOnly"
        [noneBorder]="noneBorder"
        [outline]="outline"
        [outerLabelErrorType]="outerLabelErrorType"
        [labelPosition]="labelPosition"
        [createOption]="createOption"
        [value]="value"
        [tabIndex]="tabIndex"
        [disabled]="disabled"
        [required]="required"
        [multiple]="multiple">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-autocomplete-select>
    `,
  }),
};
