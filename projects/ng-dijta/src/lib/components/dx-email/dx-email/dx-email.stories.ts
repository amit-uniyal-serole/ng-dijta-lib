import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxEmailComponent } from './dx-email.component';
import { DxEmailModule } from '../dx-email.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Email/Email',
  component: DxEmailComponent,
  decorators: [
    moduleMetadata({
      imports: [DxEmailModule],
    }),
  ],
  argTypes: {
    emailsList: { control: 'object', description: 'Type: `any[]`.' },
    emailListType: { control: 'text', description: 'Type: `string`.' },
    onClickMenu: { action: 'onClickMenu' },
  },
  args: {
    emailsList: [],
    emailListType: 'Sample',
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
