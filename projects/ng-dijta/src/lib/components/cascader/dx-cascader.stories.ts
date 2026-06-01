import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxCascadeInputComponent } from './dx-cascader.component';
import { CascaderModule } from './cascader.module';
import type { CascaderItem } from './cascader.type';

const SAMPLE_OPTIONS: CascaderItem[] = [
  {
    label: 'North America',
    value: 'na',
    children: [
      {
        label: 'United States',
        value: 'us',
        children: [
          { label: 'California', value: 'ca', isLeaf: true },
          { label: 'New York', value: 'ny', isLeaf: true },
          { label: 'Texas', value: 'tx', isLeaf: true },
        ],
      },
      {
        label: 'Canada',
        value: 'canada',
        children: [
          { label: 'Ontario', value: 'on', isLeaf: true },
          { label: 'Quebec', value: 'qc', isLeaf: true },
        ],
      },
    ],
  },
  {
    label: 'Europe',
    value: 'eu',
    children: [
      {
        label: 'United Kingdom',
        value: 'uk',
        children: [
          { label: 'London', value: 'london', isLeaf: true },
          { label: 'Manchester', value: 'manchester', isLeaf: true },
        ],
      },
      {
        label: 'Germany',
        value: 'de',
        children: [
          { label: 'Berlin', value: 'berlin', isLeaf: true },
          { label: 'Munich', value: 'munich', isLeaf: true },
        ],
      },
    ],
  },
  {
    label: 'Asia',
    value: 'asia',
    children: [
      {
        label: 'India',
        value: 'in',
        children: [
          { label: 'Delhi', value: 'delhi', isLeaf: true },
          { label: 'Mumbai', value: 'mumbai', isLeaf: true },
        ],
      },
      {
        label: 'Japan',
        value: 'jp',
        children: [
          { label: 'Tokyo', value: 'tokyo', isLeaf: true },
          { label: 'Osaka', value: 'osaka', isLeaf: true },
        ],
      },
    ],
  },
];

const LAZY_ROOTS: CascaderItem[] = [
  { label: 'Engineering', value: 'eng' },
  { label: 'Design', value: 'design' },
  { label: 'Operations', value: 'ops' },
];

const lazyLoadChildren = (item: CascaderItem) =>
  of<CascaderItem[]>([
    { label: `${item.label} - Team A`, value: `${item.value}-a`, isLeaf: true },
    { label: `${item.label} - Team B`, value: `${item.value}-b`, isLeaf: true },
    { label: `${item.label} - Team C`, value: `${item.value}-c`, isLeaf: true },
  ]).pipe(delay(400));

const meta: Meta<any> = {
  title: 'Form Inputs/Cascader',
  component: DxCascadeInputComponent,
  decorators: [
    moduleMetadata({
      imports: [CascaderModule, ReactiveFormsModule, DxLabelDirective],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    options: { control: 'object', description: 'Hierarchical list of cascader items. Type: `CascaderItem[]`.' },
    multi: { control: 'boolean', description: 'Allow selecting multiple values. Type: `boolean`.' },
    multiSelect: { control: 'boolean', description: 'Alias for multi-select mode. Type: `boolean`.' },
    noneLabel: { control: 'boolean', description: 'Hide the outer label slot. Type: `boolean`.' },
    disabled: { control: 'boolean', description: 'Disable the input. Type: `boolean`.' },
    viewOnly: { control: 'boolean', description: 'Render in view-only display mode. Type: `boolean`.' },
    required: { control: 'boolean', description: 'Mark the field as required. Type: `boolean`.' },
    name: { control: 'text', description: 'Form control name. Type: `string | undefined`.' },
    outline: {
      control: { type: 'inline-radio' },
      options: ['floating', 'none-floating', 'outer-label'],
      description: 'Field label / outline style.',
    },
    labelPosition: {
      control: { type: 'inline-radio' },
      options: ['left', 'top'],
      description: 'Outer-label placement (only effective with outline = `outer-label`).',
    },
    outerLabelErrorType: {
      control: { type: 'inline-radio' },
      options: ['astrict-error', 'filled-error'],
      description: 'Error-display style for outer-label mode.',
    },
    loadChildrenFn: { control: false, description: 'Async loader for lazy child nodes.' },
  },
  args: {
    options: SAMPLE_OPTIONS,
    multi: false,
    multiSelect: false,
    noneLabel: false,
    disabled: false,
    viewOnly: false,
    required: false,
    name: 'region',
    outline: 'none-floating',
    labelPosition: 'top',
    outerLabelErrorType: 'filled-error',
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <dx-cascader-input
    [formControl]="control"
    [options]="options"
    [multi]="multi"
    [multiSelect]="multiSelect"
    [noneLabel]="noneLabel"
    [disabled]="disabled"
    [viewOnly]="viewOnly"
    [required]="required"
    [name]="name"
    [outline]="outline"
    [labelPosition]="labelPosition"
    [outerLabelErrorType]="outerLabelErrorType"
    [loadChildrenFn]="loadChildrenFn">
    <div dxLabel>Region</div>
    <dx-label>Region</dx-label>
  </dx-cascader-input>
`;

export const Default: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const MultiSelect: Story = {
  name: 'Multi select',
  args: { multi: true },
  render: (args) => ({
    props: { ...args, control: new FormControl([]) },
    template: FULL_TEMPLATE,
  }),
};

export const OuterLabel: Story = {
  name: 'Outer label',
  args: { outline: 'outer-label' },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const FloatingLabel: Story = {
  name: 'Floating label',
  args: { outline: 'floating' },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const LabelLeft: Story = {
  name: 'Outer label - left position',
  args: { outline: 'outer-label', labelPosition: 'left' },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: FULL_TEMPLATE,
  }),
};

export const Required: Story = {
  args: { required: true, outline: 'outer-label' },
  render: (args) => ({
    props: { ...args, control: new FormControl(null, Validators.required) },
    template: FULL_TEMPLATE,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: { ...args, control: new FormControl({ value: null, disabled: true }) },
    template: FULL_TEMPLATE,
  }),
};

export const ViewOnly: Story = {
  name: 'View only',
  args: { viewOnly: true },
  render: (args) => ({
    props: { ...args, control: new FormControl(['na', 'us', 'ca']) },
    template: FULL_TEMPLATE,
  }),
};

export const LazyLoad: Story = {
  name: 'Lazy loaded children',
  args: { options: LAZY_ROOTS },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl(null),
      loadChildrenFn: lazyLoadChildren,
    },
    template: FULL_TEMPLATE,
  }),
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every supported `outline` value.',
      },
    },
  },
  render: (args) => ({
    props: {
      ...args,
      options: SAMPLE_OPTIONS,
      noneFloatingControl: new FormControl(null),
      floatingControl: new FormControl(null),
      outerLabelControl: new FormControl(null),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">none-floating (default)</h4>
          <dx-cascader-input [formControl]="noneFloatingControl" [options]="options" outline="none-floating">
            <dx-label>Region</dx-label>
          </dx-cascader-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">floating</h4>
          <dx-cascader-input [formControl]="floatingControl" [options]="options" outline="floating">
            <dx-label>Region</dx-label>
          </dx-cascader-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">outer-label</h4>
          <dx-cascader-input [formControl]="outerLabelControl" [options]="options" outline="outer-label">
            <div dxLabel>Region</div>
          </dx-cascader-input>
        </div>
      </div>
    `,
  }),
};

export const States: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Common interaction states: default, required, disabled, view-only.',
      },
    },
  },
  render: () => ({
    props: {
      options: SAMPLE_OPTIONS,
      defaultControl: new FormControl(null),
      requiredControl: new FormControl(null, Validators.required),
      disabledControl: new FormControl({ value: null, disabled: true }),
      viewOnlyControl: new FormControl(['na', 'us', 'ca']),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, minmax(280px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">Default</h4>
          <dx-cascader-input [formControl]="defaultControl" [options]="options" outline="outer-label">
            <div dxLabel>Region</div>
          </dx-cascader-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Required</h4>
          <dx-cascader-input [formControl]="requiredControl" [options]="options" [required]="true" outline="outer-label">
            <div dxLabel>Region</div>
          </dx-cascader-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Disabled</h4>
          <dx-cascader-input [formControl]="disabledControl" [options]="options" [disabled]="true" outline="outer-label">
            <div dxLabel>Region</div>
          </dx-cascader-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">View only</h4>
          <dx-cascader-input [formControl]="viewOnlyControl" [options]="options" [viewOnly]="true" [multi]="true" outline="outer-label">
            <div dxLabel>Region</div>
          </dx-cascader-input>
        </div>
      </div>
    `,
  }),
};

export const WithSlots: Story = {
  name: 'With content slots',
  args: {
    outerLabelText: 'Region',
    labelText: 'Region',
    prefixIcon: 'public',
    suffixIcon: 'expand_more',
    hintText: 'Pick a region to continue.',
    errorText: '',
    outline: 'outer-label',
  },
  argTypes: {
    outerLabelText: { control: 'text', description: '<p dxLabel> outer-label text. Visible when outline = "outer-label". Clear to hide.', table: { category: 'Slots' } },
    labelText: { control: 'text', description: '<dx-label> inline label text. Clear to hide.', table: { category: 'Slots' } },
    prefixIcon: { control: 'text', description: '<dx-prefix> Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    suffixIcon: { control: 'text', description: '<dx-suffix> Material Icons name. Clear to hide.', table: { category: 'Slots' } },
    hintText: { control: 'text', description: '<dx-hint> helper text. Clear to hide.', table: { category: 'Slots' } },
    errorText: { control: 'text', description: '<dx-error> error text. Set a value to show.', table: { category: 'Slots' } },
  },
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `
      <dx-cascader-input
        [formControl]="control"
        [options]="options"
        [multi]="multi"
        [multiSelect]="multiSelect"
        [noneLabel]="noneLabel"
        [disabled]="disabled"
        [viewOnly]="viewOnly"
        [required]="required"
        [name]="name"
        [outline]="outline"
        [labelPosition]="labelPosition"
        [outerLabelErrorType]="outerLabelErrorType">
        <div dxLabel>{{ outerLabelText }}</div>
        <dx-label>{{ labelText }}</dx-label>
        <dx-prefix><span class="material-icons" aria-hidden="true">{{ prefixIcon }}</span></dx-prefix>
        <dx-suffix><span class="material-icons" aria-hidden="true">{{ suffixIcon }}</span></dx-suffix>
        <dx-hint>{{ hintText }}</dx-hint>
        <dx-error>{{ errorText }}</dx-error>
      </dx-cascader-input>
    `,
  }),
};
