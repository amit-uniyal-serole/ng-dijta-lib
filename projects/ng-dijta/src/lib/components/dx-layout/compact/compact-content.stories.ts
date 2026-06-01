import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CompactContentComponent } from './compact-content.component';
import { DxLayoutModule } from '../layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Compact Content',
  component: CompactContentComponent,
  decorators: [
    moduleMetadata({
      imports: [DxLayoutModule],
    }),
  ],
  argTypes: {
    menu: { control: 'object', description: 'Type: `Menu[]`.' },
    isMenusLoading: { control: 'boolean', description: 'Type: `boolean`.' },
    disableDispalyConditions: { control: 'boolean', description: 'Type: `boolean`.' },
    expandMenu: { control: 'boolean', description: 'Type: `boolean`.' },
  },
  args: {
    menu: [],
    isMenusLoading: false,
    disableDispalyConditions: true,
    expandMenu: false,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
