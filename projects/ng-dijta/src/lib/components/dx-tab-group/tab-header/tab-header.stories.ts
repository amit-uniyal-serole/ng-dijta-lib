import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TabHeaderComponent } from './tab-header.component';
import { DxTabGroupModule } from '../dx-tab-group.module';

const meta: Meta<any> = {
  title: 'Navigation/Tab Group/Tab Header',
  component: TabHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTabGroupModule],
    }),
  ],
  argTypes: {
    title: { control: 'text', description: 'Type: `string`.' },
    icon: { control: 'object', description: 'Type: `string | undefined`.' },
    tabView: { control: { type: 'inline-radio' }, options: ["top_bottom","line_border_flat_icon"], description: 'Type: `\'top_bottom\' | \'line_border_flat_icon\'`.' },
    data: { control: 'object', description: 'Type: `any`.' },
  },
  args: {
    title: '',
    icon: 'Sample',
    tabView: 'line_border_flat_icon',
    data: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
