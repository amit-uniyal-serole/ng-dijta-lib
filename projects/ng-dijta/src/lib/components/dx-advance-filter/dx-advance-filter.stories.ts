import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { DxAdvanceFilterComponent } from './dx-advance-filter.component';
import { DxAdvanceFilterModule } from './dx-advance-filter.module';
import type { FilterButtons, FilterData } from './model';

const meta: Meta<any> = {
  title: 'Data Display/Advance Filter',
  component: DxAdvanceFilterComponent,
  decorators: [
    moduleMetadata({
      imports: [DxAdvanceFilterModule, ReactiveFormsModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Grouped query builder for complex filter expressions. Each row picks a `column`, a ' +
          '`condition` (operator), and a `criteria` value; rows can be joined within a section by ' +
          'AND/OR (`groupSectionBy`) and sections by AND/OR (`groupBy`) to express nested ' +
          'boolean queries. The internal `dx-filter-add-button` adds new rows / sections / groups ' +
          'via a small +menu — it used to have its own sidebar entry and is now absorbed here ' +
          'as a variant.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Header label rendered above the builder.' },
    filterData: { control: 'object', description: 'Column + condition catalog (`FilterData`).' },
    filterButtons: { control: 'object', description: 'Primary / secondary action button settings (`FilterButtons`).' },
    onClickAction: { action: 'onClickAction', description: 'Fires with the final form value (or a string action name from the action bar).' },
  },
  args: {
    title: 'Advance filter',
  },
};

export default meta;
type Story = StoryObj<any>;

const STRING_CONDITIONS = [
  { keyTt: 'eq', valueTt: 'equals' },
  { keyTt: 'ne', valueTt: 'does not equal' },
  { keyTt: 'lk', valueTt: 'contains' },
  { keyTt: 'nlk', valueTt: 'does not contain' },
  { keyTt: 'sw', valueTt: 'starts with' },
  { keyTt: 'ew', valueTt: 'ends with' },
];

const NUMBER_CONDITIONS = [
  { keyTt: 'eq', valueTt: 'equals' },
  { keyTt: 'ne', valueTt: 'does not equal' },
  { keyTt: 'gt', valueTt: 'greater than' },
  { keyTt: 'gte', valueTt: 'greater or equal' },
  { keyTt: 'lt', valueTt: 'less than' },
  { keyTt: 'lte', valueTt: 'less or equal' },
];

const DATE_CONDITIONS = [
  { keyTt: 'on', valueTt: 'on' },
  { keyTt: 'before', valueTt: 'before' },
  { keyTt: 'after', valueTt: 'after' },
  { keyTt: 'between', valueTt: 'between' },
];

const DEMO_FILTER_DATA: FilterData = {
  columns: [
    { keyTt: 'name', valueTt: 'Name', conditions: STRING_CONDITIONS },
    { keyTt: 'status', valueTt: 'Status', conditions: STRING_CONDITIONS },
    { keyTt: 'priority', valueTt: 'Priority', conditions: NUMBER_CONDITIONS },
    { keyTt: 'createdOn', valueTt: 'Created on', conditions: DATE_CONDITIONS },
    { keyTt: 'owner', valueTt: 'Owner', conditions: STRING_CONDITIONS },
  ],
};

const DEFAULT_BUTTONS: FilterButtons = {
  primaryBtn: { show: true, title: 'Apply' },
  secondaryBtn: { show: true, title: 'Reset' },
};

const FULL_TEMPLATE = `
  <dx-advance-filter
    [title]="title"
    [filterData]="filterData"
    [filterButtons]="filterButtons"
    (onClickAction)="onClickAction($event)">
  </dx-advance-filter>
`;

export const Default: Story = {
  args: { filterData: DEMO_FILTER_DATA, filterButtons: DEFAULT_BUTTONS },
  parameters: {
    docs: {
      description: {
        story: 'Baseline builder with five columns, full operator menus per type, and Apply / Reset action buttons.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const SingleColumn: Story = {
  name: 'Single column',
  args: {
    filterData: { columns: [DEMO_FILTER_DATA.columns[0]] },
    filterButtons: DEFAULT_BUTTONS,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal config — one column, used as a quick-filter sidebar.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const PrimaryOnly: Story = {
  name: 'Primary button only',
  args: {
    filterData: DEMO_FILTER_DATA,
    filterButtons: { primaryBtn: { show: true, title: 'Apply filter' }, secondaryBtn: { show: false, title: '' } },
  },
  parameters: {
    docs: {
      description: {
        story: '`filterButtons.secondaryBtn.show=false` hides the Reset button.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const CustomActionLabels: Story = {
  name: 'Custom action labels',
  args: {
    filterData: DEMO_FILTER_DATA,
    filterButtons: {
      primaryBtn: { show: true, title: 'Run query' },
      secondaryBtn: { show: true, title: 'Clear' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Override `primaryBtn.title` / `secondaryBtn.title` for localized or domain-specific verbs.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const NoTitle: Story = {
  name: 'Without title',
  args: { title: '', filterData: DEMO_FILTER_DATA, filterButtons: DEFAULT_BUTTONS },
  parameters: {
    docs: {
      description: {
        story: 'Clear `[title]` for embedded usage where a surrounding header already exists.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const MixedConditionTypes: Story = {
  name: 'Mixed condition types',
  args: {
    filterData: {
      columns: [
        { keyTt: 'name', valueTt: 'Name', conditions: STRING_CONDITIONS },
        { keyTt: 'priority', valueTt: 'Priority', conditions: NUMBER_CONDITIONS },
        { keyTt: 'createdOn', valueTt: 'Created on', conditions: DATE_CONDITIONS },
      ],
    },
    filterButtons: DEFAULT_BUTTONS,
  },
  parameters: {
    docs: {
      description: {
        story: 'Picking a different column re-populates the operator menu — string columns offer `contains`, number columns offer `greater than`, dates offer `between`, etc.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const FilterAddButton: Story = {
  name: 'Add-row button (`dx-filter-add-button`)',
  parameters: {
    docs: {
      description: {
        story: 'The standalone +menu used internally to add rows / sections / groups. It emits `{ actionType, isAddNew }` — used by the filter builder to decide whether to push a new section into the current group (`AND`/`OR`) or split off a new group. Previously had its own menu entry and is shown here as a variant.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, max-content); column-gap: 32px; row-gap: 16px; align-items: center;">
        <span>Main "+":</span>
        <dx-filter-add-button [isMainBtn]="true" class="primary"></dx-filter-add-button>

        <span>Row "+":</span>
        <dx-filter-add-button [isMainBtn]="false" class="secondary"></dx-filter-add-button>

        <span>Pressed state:</span>
        <dx-filter-add-button [isMainBtn]="true" btnType="AND" class="primary"></dx-filter-add-button>
      </div>
    `,
  }),
};

export const EmptyData: Story = {
  name: 'Empty column catalog',
  args: { filterData: { columns: [] }, filterButtons: DEFAULT_BUTTONS },
  parameters: {
    docs: {
      description: {
        story: 'Edge case — when `filterData.columns` is empty the builder still renders its chrome but offers no operators.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};
