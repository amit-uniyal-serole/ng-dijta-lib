import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxLayoutHeaderComponent } from './header.component';
import { DxLayoutModule } from './layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Header',
  component: DxLayoutHeaderComponent,
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
