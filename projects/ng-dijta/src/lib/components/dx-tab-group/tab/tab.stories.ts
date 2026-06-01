import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TabComponent } from './tab.component';
import { DxTabGroupModule } from '../dx-tab-group.module';

const meta: Meta<any> = {
  title: 'Navigation/Tab Group/Tab',
  component: TabComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTabGroupModule],
    }),
  ],
  argTypes: {
    title: { control: 'text', description: 'Type: `string`.' },
    disabled: { control: 'boolean', description: 'Type: `boolean`.' },
    isActive: { control: 'boolean', description: 'Type: `boolean`.' },
  },
  args: {
    title: '',
    disabled: false,
    isActive: false,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
