import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Lib403Component } from './403.component';
import { DxStandardPageModule } from '../dx-standard-page.module';

const meta: Meta<any> = {
  title: 'Layout/Page/403',
  component: Lib403Component,
  decorators: [
    moduleMetadata({
      imports: [DxStandardPageModule],
    }),
  ],
  argTypes: {
    isNewUI: { control: 'boolean', description: 'Type: `boolean`.' },
  },
  args: {
    isNewUI: true,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
