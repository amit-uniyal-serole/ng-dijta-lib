import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VerticalLayoutComponent } from './vertical-layout.component';
import { DxLayoutModule } from '../layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Vertical Layout',
  component: VerticalLayoutComponent,
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
