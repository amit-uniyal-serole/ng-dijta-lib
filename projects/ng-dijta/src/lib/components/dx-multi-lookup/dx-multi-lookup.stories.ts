import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxMultiLookupComponent } from './dx-multi-lookup.component';
import { DxMultiLookupModule } from './dx-multi-lookup.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Multi Lookup',
  component: DxMultiLookupComponent,
  decorators: [
    moduleMetadata({
      imports: [DxMultiLookupModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Form-bound read-only field that opens a `MultiLookupModalComponent` dialog with ' +
          'multi-row selection. The picked rows are joined into comma-separated `id` / `name` ' +
          'strings on the bound `FormControl` value `{ id, name, data }`. The trigger button only ' +
          'renders when `[lookupModalConfig]` provides both `lookupApiConfig` and `tableSettings`. ' +
          'Implements `ControlValueAccessor` + `Validator` and shares the standard `dx-*` ' +
          'outline / labelPosition / outer-label chrome.',
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
    readonly: { control: 'boolean', description: 'Render the field as read-only and hide the lookup trigger button.' },
    viewOnly: { control: 'boolean', description: 'Display-only mode for summary screens.' },
    required: { control: 'boolean', description: 'Mark the field as required.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer-label slot.' },
    tooltip: { control: 'text', description: 'Placeholder / hover hint text.' },
    tabIndex: { control: 'number', description: 'Tab order index.' },
    lookupModalConfig: { control: 'object', description: 'Modal config: `lookupApiConfig`, `tableSettings`, `columns`, `idName`, etc.' },
    blur: { action: 'blur', description: 'Fires when the input loses focus.' },
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
    tooltip: 'Click the search icon to pick records',
    tabIndex: 0,
    lookupModalConfig: undefined,
  },
};

export default meta;
type Story = StoryObj<any>;

const SAMPLE_LOOKUP_CONFIG = {
  isGenericService: true,
  idName: { id: 'pkId', name: 'name' },
  columns: [
    { field: 'pkId', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'code', header: 'Code' },
  ],
  lookUpHeaderSettings: { title: 'Select records' },
  lookupApiConfig: { url: '/api/sample/list', method: 'POST', body: {} },
  tableSettings: { pageSize: 10, sortable: true },
  additionalFilter: [],
};

const FULL_TEMPLATE = `
  <dx-multi-lookup
    [formControl]="control"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [disabled]="disabled"
    [readonly]="readonly"
    [viewOnly]="viewOnly"
    [required]="required"
    [noneLabel]="noneLabel"
    [tooltip]="tooltip"
    [tabIndex]="tabIndex"
    [lookupModalConfig]="lookupModalConfig">
    <p dxLabel>References</p>
    <dx-label>References</dx-label>
  </dx-multi-lookup>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline empty multi-lookup. No modal config provided — the trigger button is hidden.',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const WithLookupConfig: Story = {
  name: 'With lookup config',
  args: { lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
  parameters: {
    docs: {
      description: {
        story: '`[lookupModalConfig]` with `lookupApiConfig` + `tableSettings` reveals the magnifier trigger button. Clicking it opens the `MultiLookupModalComponent` at runtime (illustrative endpoint).',
      },
    },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Preselected: Story = {
  name: 'Preselected values',
  args: { lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Initial value with comma-joined `id` / `name`. The display input shows the joined `name` string with overflow handling.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ id: '42,43,44', name: 'Acme Inc., Globex Corp., Initech', data: undefined }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const OuterLabel: Story = {
  name: 'Outer label',
  args: { outline: 'outer-label', lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
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
  args: { outline: 'floating', lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
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
  args: { outline: 'outer-label', labelPosition: 'left', lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
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
  args: { required: true, lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
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
  args: { disabled: true, lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Disabled control — both the display input and the lookup trigger are inert.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ value: { id: '42,43', name: 'Acme Inc., Globex Corp.' }, disabled: true }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const Readonly: Story = {
  args: { readonly: true, lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Read-only — the value is visible but the lookup trigger button is hidden so the user cannot change the selection.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ id: '42,43', name: 'Acme Inc., Globex Corp.' }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true, lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
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
      control: new FormControl({ id: '42,43,44', name: 'Acme Inc., Globex Corp., Initech' }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const NoLabelSlot: Story = {
  name: 'No label slot',
  args: { noneLabel: true, lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
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
  args: { outerLabelErrorType: 'astrict-error', required: true, lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
  parameters: {
    docs: {
      description: {
        story: '`[outerLabelErrorType]="astrict-error"` renders validation state as a red asterisk next to the label instead of a filled error block.',
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

export const Overflow: Story = {
  name: 'Long selection (overflow)',
  args: { lookupModalConfig: SAMPLE_LOOKUP_CONFIG },
  parameters: {
    docs: {
      description: {
        story: 'Many selected names truncate via the `.multi-lookup-overflow-text` class on the inner input.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({
        id: '1,2,3,4,5,6,7,8',
        name: 'Acme Inc., Globex Corp., Initech, Soylent Corp., Umbrella Corp., Stark Industries, Wayne Enterprises, Wonka Industries',
      }),
    },
    template: FULL_TEMPLATE,
  }),
};

export const AllVariants: Story = {
  name: 'All label variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every supported `outline` value, with a configured lookup so the trigger is visible.',
      },
    },
  },
  render: () => ({
    props: {
      lookupModalConfig: SAMPLE_LOOKUP_CONFIG,
      noneFloatingControl: new FormControl({ id: '42,43', name: 'Acme Inc., Globex Corp.' }),
      floatingControl: new FormControl({ id: '42,43', name: 'Acme Inc., Globex Corp.' }),
      outerLabelControl: new FormControl({ id: '42,43', name: 'Acme Inc., Globex Corp.' }),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-multi-lookup [formControl]="noneFloatingControl" [lookupModalConfig]="lookupModalConfig" outline="none-floating">
            <dx-label>References</dx-label>
          </dx-multi-lookup>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-multi-lookup [formControl]="floatingControl" [lookupModalConfig]="lookupModalConfig" outline="floating">
            <dx-label>References</dx-label>
          </dx-multi-lookup>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-multi-lookup [formControl]="outerLabelControl" [lookupModalConfig]="lookupModalConfig" outline="outer-label">
            <p dxLabel>References</p>
          </dx-multi-lookup>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, with values, required (touched), disabled, view-only.',
      },
    },
  },
  render: () => {
    const requiredControl = new FormControl(null, Validators.required);
    requiredControl.markAsTouched();
    return {
      props: {
        lookupModalConfig: SAMPLE_LOOKUP_CONFIG,
        defaultControl: new FormControl(null),
        valueControl: new FormControl({ id: '42,43', name: 'Acme Inc., Globex Corp.' }),
        requiredControl,
        disabledControl: new FormControl({ value: { id: '42,43', name: 'Acme Inc., Globex Corp.' }, disabled: true }),
        viewOnlyControl: new FormControl({ id: '42,43,44', name: 'Acme Inc., Globex Corp., Initech' }),
      },
      template: `
        <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
          <div>
            <h4 style="margin: 0 0 8px;">Default</h4>
            <dx-multi-lookup [formControl]="defaultControl" [lookupModalConfig]="lookupModalConfig" outline="outer-label">
              <p dxLabel>References</p>
            </dx-multi-lookup>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">With values</h4>
            <dx-multi-lookup [formControl]="valueControl" [lookupModalConfig]="lookupModalConfig" outline="outer-label">
              <p dxLabel>References</p>
            </dx-multi-lookup>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Required</h4>
            <dx-multi-lookup [formControl]="requiredControl" [lookupModalConfig]="lookupModalConfig" [required]="true" outline="outer-label">
              <p dxLabel>References</p>
            </dx-multi-lookup>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">Disabled</h4>
            <dx-multi-lookup [formControl]="disabledControl" [lookupModalConfig]="lookupModalConfig" [disabled]="true" outline="outer-label">
              <p dxLabel>References</p>
            </dx-multi-lookup>
          </div>
          <div>
            <h4 style="margin: 0 0 8px;">View only</h4>
            <dx-multi-lookup [formControl]="viewOnlyControl" [lookupModalConfig]="lookupModalConfig" [viewOnly]="true" outline="outer-label">
              <p dxLabel>References</p>
            </dx-multi-lookup>
          </div>
        </div>
      `,
    };
  },
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'References',
    labelText: 'References',
    prefixIcon: 'business',
    suffixIcon: '',
    hintText: 'Use the search icon to pick one or more records.',
    errorText: '',
    lookupModalConfig: SAMPLE_LOOKUP_CONFIG,
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '`<p dxLabel>` outer-label text. Clear to hide.', table: { category: 'Slots' } },
    labelText: { control: 'text', description: '`<dx-label>` inline label text. Clear to hide.', table: { category: 'Slots' } },
    prefixIcon: { control: 'text', description: '`<dx-prefix>` Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    suffixIcon: { control: 'text', description: '`<dx-suffix>` Material Icons name (alongside the built-in magnifier trigger). Clear to hide.', table: { category: 'Slots' } },
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
      <dx-multi-lookup
        [formControl]="control"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType"
        [disabled]="disabled"
        [readonly]="readonly"
        [viewOnly]="viewOnly"
        [required]="required"
        [noneLabel]="noneLabel"
        [tooltip]="tooltip"
        [tabIndex]="tabIndex"
        [lookupModalConfig]="lookupModalConfig">
        <p dxLabel>{{ outerLabelText }}</p>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true" *ngIf="suffixIcon">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-multi-lookup>
    `,
  }),
};
