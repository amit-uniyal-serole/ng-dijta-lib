import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxMenuItemComponent } from './menu-item.component';
import { DxSideBarModule } from '../dx-side-bar.module';

const meta: Meta<any> = {
  title: 'Layout/Sidebar/Menu Item',
  component: DxMenuItemComponent,
  decorators: [
    moduleMetadata({
      imports: [DxSideBarModule],
    }),
  ],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
