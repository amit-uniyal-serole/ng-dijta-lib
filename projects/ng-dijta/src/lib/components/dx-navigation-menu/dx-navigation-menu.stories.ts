import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxNavigationMenuComponent } from './dx-navigation-menu.component';
import { DxNavigationMenuModule } from './dx-navigation-menu.module';

const meta: Meta<any> = {
  title: 'Navigation/Navigation Menu',
  component: DxNavigationMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [DxNavigationMenuModule],
    }),
  ],
  argTypes: {
    menu: { control: 'object', description: 'Type: `DxNavigationMenu[]`.' },
    config: { control: 'object', description: 'Type: `NavigationMenuConfig`.' },
    onClickMenu: { action: 'onClickMenu' },
  },
  args: {
    menu: [],
    config: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
