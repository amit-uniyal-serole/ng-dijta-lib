import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LayoutWrapperComponent } from './layout-wrapper.component';
import { DxLayoutModule } from './layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Layout Wrapper',
  component: LayoutWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [DxLayoutModule],
    }),
  ],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
