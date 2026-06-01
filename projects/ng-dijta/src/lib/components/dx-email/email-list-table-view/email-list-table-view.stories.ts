import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EmailListTableViewComponent } from './email-list-table-view.component';
import { DxEmailModule } from '../dx-email.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Email/Email List Table View',
  component: EmailListTableViewComponent,
  decorators: [
    moduleMetadata({
      imports: [DxEmailModule],
    }),
  ],
  argTypes: {
    emailsList: { control: 'object', description: 'Type: `any`.' },
  },
  args: {
    emailsList: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
