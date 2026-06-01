import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxMenuAccordianContentComponent } from './dx-menu-accordian-content.component';
import { DxNavigationMenuModule } from '../../dx-navigation-menu.module';

const meta: Meta<any> = {
  title: 'Navigation/Navigation Menu/Menu Accordian Content',
  component: DxMenuAccordianContentComponent,
  decorators: [
    moduleMetadata({
      imports: [DxNavigationMenuModule],
    }),
  ],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
