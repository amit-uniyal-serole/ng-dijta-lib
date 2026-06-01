import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxVerticalComponent } from './vertical.component';
import { DxSideBarModule } from '../dx-side-bar.module';

const meta: Meta<any> = {
  title: 'Layout/Sidebar/Vertical',
  component: DxVerticalComponent,
  decorators: [
    moduleMetadata({
      imports: [DxSideBarModule],
    }),
  ],
  argTypes: {
    menu: { control: 'object', description: 'Type: `Menu[]`.' },
  },
  args: {
    menu: [],
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
