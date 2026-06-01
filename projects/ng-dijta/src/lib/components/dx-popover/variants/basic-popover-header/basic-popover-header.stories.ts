import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { BasicPopoverHeaderComponent } from './basic-popover-header.component';
import { DxPopoverModule } from '../../popover.module';

const meta: Meta<any> = {
  title: 'Overlays/Popover/Basic Popover Header',
  component: BasicPopoverHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [DxPopoverModule],
    }),
  ],
  argTypes: {
    openInNew: { action: 'openInNew' },
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
