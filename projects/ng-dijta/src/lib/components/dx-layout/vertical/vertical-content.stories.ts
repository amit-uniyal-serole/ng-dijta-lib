import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { VerticalContentComponent } from './vertical-content.component';
import { DxLayoutModule } from '../layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Vertical Content',
  component: VerticalContentComponent,
  decorators: [
    moduleMetadata({
      imports: [DxLayoutModule],
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
