import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TabContentComponent } from './tab-content.component';
import { DxTabGroupModule } from '../dx-tab-group.module';

const meta: Meta<any> = {
  title: 'Navigation/Tab Group/Tab Content',
  component: TabContentComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTabGroupModule],
    }),
  ],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
