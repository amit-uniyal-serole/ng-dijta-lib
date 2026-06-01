import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HorizontalContentComponent } from './horizontal-content.component';
import { DxLayoutModule } from '../layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Horizontal Content',
  component: HorizontalContentComponent,
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
