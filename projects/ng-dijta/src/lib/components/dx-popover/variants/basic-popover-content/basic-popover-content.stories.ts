import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BasicPopoverContentComponent } from './basic-popover-content.component';
import { DxPopoverModule } from '../../popover.module';

const meta: Meta<any> = {
  title: 'Overlays/Popover/Basic Popover Content',
  component: BasicPopoverContentComponent,
  decorators: [
    moduleMetadata({
      imports: [DxPopoverModule],
    }),
  ],
  argTypes: {
    popoverConfigName: { control: 'text', description: 'Type: `string`.' },
  },
  args: {
    popoverConfigName: 'Sample',
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
