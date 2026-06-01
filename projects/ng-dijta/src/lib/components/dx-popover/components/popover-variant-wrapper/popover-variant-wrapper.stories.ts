import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PopoverVariantWrapperComponent } from './popover-variant-wrapper.component';
import { DxPopoverModule } from '../../popover.module';

const meta: Meta<any> = {
  title: 'Overlays/Popover/Popover Variant Wrapper',
  component: PopoverVariantWrapperComponent,
  decorators: [
    moduleMetadata({
      imports: [DxPopoverModule],
    }),
  ],
  argTypes: {
    section: { control: { type: 'inline-radio' }, options: ["HEADER","CONTENT"], description: 'Type: `\'HEADER\' | \'CONTENT\'`.' },
    popoverContent: { control: 'object' },
    popoverTitleConfig: { control: 'object' },
    popoverConfigName: { control: 'text', description: 'Type: `string`.' },
    onPopoverAction: { action: 'onPopoverAction' },
  },
  args: {
    section: 'HEADER',
    popoverConfigName: 'Sample',
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
