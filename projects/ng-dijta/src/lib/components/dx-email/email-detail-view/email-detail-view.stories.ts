import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EmailDetailViewComponent } from './email-detail-view.component';
import { DxEmailModule } from '../dx-email.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Email/Email Detail View',
  component: EmailDetailViewComponent,
  decorators: [
    moduleMetadata({
      imports: [DxEmailModule],
    }),
  ],
  argTypes: {
    email: { control: 'object', description: 'Type: `any`.' },
  },
  args: {
    email: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
