import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DxCriteriaFilterComponent } from './dx-criteria-filter.component';
import { DxCriteriaFilterModule } from '../../dx-criteria-filter.module';

const meta: Meta<any> = {
  title: 'Data Display/Criteria Filter/Criteria Filter',
  component: DxCriteriaFilterComponent,
  decorators: [
    moduleMetadata({
      imports: [DxCriteriaFilterModule, ReactiveFormsModule],
    }),
  ],
  argTypes: {
    operatorsToHideValueField: { control: 'object' },
    columns: { control: 'object', description: 'Type: `KeyValueModel[]`.' },
    operators: { control: 'object' },
    readonlyCriteria: { control: 'boolean', description: 'Type: `boolean`.' },
    rootUrl: { control: 'object', description: 'Type: `string | undefined`.' },
    enablePattern: { control: 'boolean', description: 'Type: `boolean`.' },
    maxConditions: { control: 'number', description: 'Type: `number`.' },
    singleSelection: { control: 'boolean', description: 'Type: `boolean`.' },
    userModalConfig: { control: 'object', description: 'Type: `DxLookupModalConfig | undefined`.' },
  },
  args: {
    columns: [],
    readonlyCriteria: false,
    rootUrl: 'Sample',
    enablePattern: false,
    maxConditions: 0,
    singleSelection: false,
    userModalConfig: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {
  render: (args) => ({
    props: { ...args, control: new FormControl(null) },
    template: `<dx-criteria-filter [formControl]="control" [operatorsToHideValueField]="operatorsToHideValueField" [columns]="columns" [operators]="operators" [readonlyCriteria]="readonlyCriteria" [rootUrl]="rootUrl" [enablePattern]="enablePattern" [maxConditions]="maxConditions" [singleSelection]="singleSelection" [userModalConfig]="userModalConfig"></dx-criteria-filter>`,
  }),
};
