import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxFlexMenuComponent } from './dx-flex-menu.component';
import { DxSideBarModule } from '../dx-side-bar.module';

const meta: Meta<any> = {
  title: 'Layout/Sidebar/Flex Menu',
  component: DxFlexMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [DxSideBarModule],
    }),
  ],
  argTypes: {
    logo: { control: 'object', description: 'Type: `any`.' },
    subMenu: { control: 'object', description: 'Type: `SUB_MENU_TYPE`.' },
    width: { control: 'number', description: 'Type: `number`.' },
    isMenusLoading: { control: 'object' },
    disableDispalyConditions: { control: 'boolean', description: 'Type: `boolean`.' },
    sidebarToggle: { action: 'sidebarToggle' },
    onMenuPin: { action: 'onMenuPin' },
  },
  args: {
    logo: {},
    subMenu: {},
    width: 0,
    isMenusLoading: true,
    disableDispalyConditions: true,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
