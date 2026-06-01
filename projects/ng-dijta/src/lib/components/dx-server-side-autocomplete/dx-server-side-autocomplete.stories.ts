import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxServerSideAutocompleteComponent } from './dx-server-side-autocomplete.component';
import { DxServerSideAutocompleteModule } from './dx-server-side-autocomplete.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Server Side Autocomplete',
  component: DxServerSideAutocompleteComponent,
  decorators: [
    moduleMetadata({
      imports: [DxServerSideAutocompleteModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Form-bound autocomplete that fetches options from a server. Type to filter (debounced, 2s); ' +
          'pick a row from the dropdown or click the magnifier to open the full lookup modal ' +
          '(`LookupModalComponent` for single, `MultiLookupModalComponent` for multi). Supports ' +
          'multi-select chips via `lookupModalConfig.tableSettings.multiSelect`. Implements ' +
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
    readonly: { control: 'boolean', description: 'Render the field as read-only.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    noneBorder: { control: 'boolean', description: 'Hide the Material outline border.' },
    hideLookup: { control: 'boolean', description: 'Hide the magnifier trigger button so only the inline autocomplete is available.' },
    row: { control: 'number', description: 'Maximum visible rows for the chip strip in multi-select mode.' },
    emptyOption: { control: 'boolean', description: 'Show a "None" / empty option at the top of the dropdown.' },
    disableAutoCompleteSearch: { control: 'boolean', description: 'Disable inline typeahead — force the user into the lookup modal.' },
    standardDropdown: { control: 'boolean', description: 'Use a standard parameter-based search payload instead of paginationRequest filters.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    lookupModalConfig: { control: 'object', description: 'Lookup configuration: `lookupApiConfig`, `tableSettings`, `columns`, `idName`, `recordIdentifier`, etc.' },
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
    hideLookup: false,
    row: 2,
    emptyOption: false,
    disableAutoCompleteSearch: false,
    standardDropdown: false,
    tabIndex: 0,
    lookupModalConfig: undefined,
  },
};

export default meta;
type Story = StoryObj<any>;

const SINGLE_SELECT_CONFIG = {
  isGenericService: true,
  idName: { id: 'pkId', name: 'name', subtitle: 'code' },
  columns: [
    { field: 'pkId', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'code', header: 'Code' },
  ],
  lookUpHeaderSettings: { title: 'Select a record' },
  lookupApiConfig: { url: '/api/sample/list', method: 'POST', body: {} },
  tableSettings: { pageSize: 10, sortable: true, multiSelect: false },
  additionalFilter: [],
};

const MULTI_SELECT_CONFIG = {
  ...SINGLE_SELECT_CONFIG,
  lookUpHeaderSettings: { title: 'Select records' },
  tableSettings: { ...SINGLE_SELECT_CONFIG.tableSettings, multiSelect: true },
};

const FULL_TEMPLATE = `
  <dx-server-side-autocomplete
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
    [hideLookup]="hideLookup"
    [row]="row"
    [emptyOption]="emptyOption"
    [disableAutoCompleteSearch]="disableAutoCompleteSearch"
    [standardDropdown]="standardDropdown"
    [tabIndex]="tabIndex"
    [lookupModalConfig]="lookupModalConfig">
    <p dxLabel>Reference</p>
    <dx-label>Reference</dx-label>
  </dx-server-side-autocomplete>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty autocomplete with no lookup config — the magnifier is hidden and the dropdown will be empty until a config is provided.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const SingleSelect: Story = {
  name: 'Single select',
  args: { lookupModalConfig: SINGLE_SELECT_CONFIG },
  parameters: {
    docs: {
      description: {
        story: '`tableSettings.multiSelect = false` — the autocomplete writes a single `KeyValueModel` (`{keyTt, valueTt, subtitle?}`) onto the bound control. Clicking the magnifier opens the single-select `LookupModalComponent`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const MultiSelect: Story = {
  name: 'Multi-select',
  args: { lookupModalConfig: MULTI_SELECT_CONFIG },
  parameters: {
    docs: {
      description: {
        story: '`tableSettings.multiSelect = true` — picks accumulate as chips. The magnifier opens the multi-row `MultiLookupModalComponent`.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected (single)',
  args: { lookupModalConfig: SINGLE_SELECT_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Initial value bound as a `KeyValueModel` object.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.', subtitle: 'ACME', data: { pkId: 42, name: 'Acme Inc.', code: 'ACME' } }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const PreselectedMulti: Story = {
  name: 'Preselected (multi)',
  args: { lookupModalConfig: MULTI_SELECT_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Multi-select initial value bound as a `KeyValueModel[]`. Each value renders as a removable chip.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl([
        { keyTt: 42, valueTt: 'Acme Inc.', subtitle: 'ACME' },
        { keyTt: 43, valueTt: 'Globex Corp.', subtitle: 'GLBX' },
        { keyTt: 44, valueTt: 'Initech', subtitle: 'INI' },
      ]),
    },
    template: FULL_TEMPLATE,
  }),
};

export const HideLookup: Story = {
  name: 'Inline only (hide lookup)',
  args: { lookupModalConfig: SINGLE_SELECT_CONFIG, hideLookup: true },
  parameters: {
    docs: {
      description: {
        story: '`[hideLookup]="true"` removes the magnifier trigger; only the inline typeahead dropdown is available.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const DisableInlineSearch: Story = {
  name: 'Lookup only (disable typeahead)',
  args: { lookupModalConfig: SINGLE_SELECT_CONFIG, disableAutoCompleteSearch: true },
  parameters: {
    docs: {
      description: {
        story: '`[disableAutoCompleteSearch]="true"` forces the user to open the lookup modal — typing into the field does not query the server.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const WithEmptyOption: Story = {
  name: 'With "None" option',
  args: { lookupModalConfig: SINGLE_SELECT_CONFIG, emptyOption: true },
  parameters: {
    docs: {
      description: {
        story: '`[emptyOption]="true"` adds a "None" choice at the top of the dropdown so the user can clear the selection without losing focus.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const StandardDropdown: Story = {
  name: 'Standard (param-based) search',
  args: {
    lookupModalConfig: {
      ...SINGLE_SELECT_CONFIG,
      lookupApiConfig: { ...SINGLE_SELECT_CONFIG.lookupApiConfig, searchBasedOn: 'q' },
    },
    standardDropdown: true,
  },
  parameters: {
    docs: {
      description: {
        story: '`[standardDropdown]="true"` switches to query-param search (`?q=...`) instead of the `paginationRequest.search` payload. Useful for legacy endpoints.',
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
  args: { outline: 'outer-label', lookupModalConfig: SINGLE_SELECT_CONFIG },
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
  args: { outline: 'floating', lookupModalConfig: SINGLE_SELECT_CONFIG },
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
  args: { outline: 'outer-label', labelPosition: 'left', lookupModalConfig: SINGLE_SELECT_CONFIG },
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
  args: { required: true, lookupModalConfig: SINGLE_SELECT_CONFIG },
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
  args: { disabled: true, lookupModalConfig: SINGLE_SELECT_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Disabled control — autocomplete and lookup trigger are inert.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ value: { keyTt: 42, valueTt: 'Acme Inc.' }, disabled: true }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true, lookupModalConfig: SINGLE_SELECT_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — the value is visible but cannot be changed.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.' }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, lookupModalConfig: SINGLE_SELECT_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Display-only mode for summary screens.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.' }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const NoLabelSlot: Story = {
  name: 'No label slot',
  args: { noneLabel: true, lookupModalConfig: SINGLE_SELECT_CONFIG },
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

export const NoBorder: Story = {
  name: 'Borderless',
  args: { noneBorder: true, lookupModalConfig: SINGLE_SELECT_CONFIG },
  parameters: {
    docs: {
      description: {
        story: '`[noneBorder]="true"` hides the Material outline — use inside dense rows or tables.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.' }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const AsteriskError: Story = {
  name: 'Outer label — asterisk error style',
  args: { outerLabelErrorType: 'astrict-error', required: true, lookupModalConfig: SINGLE_SELECT_CONFIG },
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

export const ChipRowsCap: Story = {
  name: 'Chip row cap (multi)',
  args: { lookupModalConfig: MULTI_SELECT_CONFIG, row: 1 },
  parameters: {
    docs: {
      description: {
        story: '`[row]` caps the visible chip rows in multi-select mode. Excess chips collapse into a "+N more" indicator.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl([
        { keyTt: 1, valueTt: 'Acme Inc.' },
        { keyTt: 2, valueTt: 'Globex Corp.' },
        { keyTt: 3, valueTt: 'Initech' },
        { keyTt: 4, valueTt: 'Soylent Corp.' },
        { keyTt: 5, valueTt: 'Umbrella Corp.' },
        { keyTt: 6, valueTt: 'Stark Industries' },
      ]),
    },
    template: FULL_TEMPLATE,
  }),
};

export const AllVariants: Story = {
  name: 'All label variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every supported `outline` value, with a configured lookup so the magnifier is visible.',
      },
    },
  },
  render: () => ({
    props: {
      lookupModalConfig: SINGLE_SELECT_CONFIG,
      noneFloatingControl: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.' }),
      floatingControl: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.' }),
      outerLabelControl: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.' }),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-server-side-autocomplete [formControl]="noneFloatingControl" [lookupModalConfig]="lookupModalConfig" outline="none-floating">
            <dx-label>Reference</dx-label>
          </dx-server-side-autocomplete>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-server-side-autocomplete [formControl]="floatingControl" [lookupModalConfig]="lookupModalConfig" outline="floating">
            <dx-label>Reference</dx-label>
          </dx-server-side-autocomplete>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-server-side-autocomplete [formControl]="outerLabelControl" [lookupModalConfig]="lookupModalConfig" outline="outer-label">
            <p dxLabel>Reference</p>
          </dx-server-side-autocomplete>
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
        lookupModalConfig: SINGLE_SELECT_CONFIG,
        defaultControl: new FormControl(null),
        valueControl: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.' }),
        requiredControl,
        disabledControl: new FormControl({ value: { keyTt: 42, valueTt: 'Acme Inc.' }, disabled: true }),
        viewOnlyControl: new FormControl({ keyTt: 42, valueTt: 'Acme Inc.' }),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-server-side-autocomplete [formControl]="defaultControl" [lookupModalConfig]="lookupModalConfig" outline="outer-label">
              <p dxLabel>Reference</p>
            </dx-server-side-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With value</h4>
            <dx-server-side-autocomplete [formControl]="valueControl" [lookupModalConfig]="lookupModalConfig" outline="outer-label">
              <p dxLabel>Reference</p>
            </dx-server-side-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-server-side-autocomplete [formControl]="requiredControl" [lookupModalConfig]="lookupModalConfig" [required]="true" outline="outer-label">
              <p dxLabel>Reference</p>
            </dx-server-side-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-server-side-autocomplete [formControl]="disabledControl" [lookupModalConfig]="lookupModalConfig" [disabled]="true" outline="outer-label">
              <p dxLabel>Reference</p>
            </dx-server-side-autocomplete>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-server-side-autocomplete [formControl]="viewOnlyControl" [lookupModalConfig]="lookupModalConfig" [viewOnly]="true" outline="outer-label">
              <p dxLabel>Reference</p>
            </dx-server-side-autocomplete>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Reference',
    labelText: 'Reference',
    prefixIcon: 'business',
    suffixIcon: '',
    hintText: 'Type at least 2 characters to search the directory.',
    errorText: '',
    lookupModalConfig: SINGLE_SELECT_CONFIG,
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '`<p dxLabel>` outer-label text. Clear to hide.', table: { category: 'Slots' } },
    labelText: { control: 'text', description: '`<dx-label>` inline label text. Clear to hide.', table: { category: 'Slots' } },
    prefixIcon: { control: 'text', description: '`<dx-prefix>` Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    suffixIcon: { control: 'text', description: '`<dx-suffix>` Material Icons name (alongside the magnifier trigger). Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '`<dx-hint>` helper text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '`<dx-error>` error text. Set a value to show.', table: { category: 'Slots' } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the label / prefix / suffix / hint / error projection slots. The magnifier trigger is built-in alongside the `dx-suffix` slot.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-server-side-autocomplete
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
        [hideLookup]="hideLookup"
        [row]="row"
        [emptyOption]="emptyOption"
        [disableAutoCompleteSearch]="disableAutoCompleteSearch"
        [standardDropdown]="standardDropdown"
        [tabIndex]="tabIndex"
        [lookupModalConfig]="lookupModalConfig">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true" *ngIf="suffixIcon">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-server-side-autocomplete>
    `,
  }),
};
