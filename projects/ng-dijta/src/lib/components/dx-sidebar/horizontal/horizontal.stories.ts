import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxHorizontalComponent } from './horizontal.component';
import { DxSideBarModule } from '../dx-side-bar.module';

const meta: Meta<any> = {
  title: 'Layout/Sidebar/Horizontal',
  component: DxHorizontalComponent,
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
