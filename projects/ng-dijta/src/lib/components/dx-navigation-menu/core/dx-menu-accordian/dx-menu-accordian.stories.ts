import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxMenuAccordianComponent } from './dx-menu-accordian.component';
import { DxNavigationMenuModule } from '../../dx-navigation-menu.module';

const meta: Meta<any> = {
  title: 'Navigation/Navigation Menu/Menu Accordian',
  component: DxMenuAccordianComponent,
  decorators: [
    moduleMetadata({
      imports: [DxNavigationMenuModule],
    }),
  ],
  argTypes: {
    title: { control: 'text', description: 'Type: `string`.' },
    showTooltip: { control: 'boolean', description: 'Type: `boolean`.' },
    tooltipPosition: { control: 'object', description: 'Type: `TOOLTIP_POSTION`.' },
    hideArrows: { control: 'boolean', description: 'Type: `boolean`.' },
  },
  args: {
    title: 'Sample',
    showTooltip: false,
    tooltipPosition: {},
    hideArrows: false,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
