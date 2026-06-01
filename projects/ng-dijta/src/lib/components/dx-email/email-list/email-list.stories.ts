import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { EmailListComponent } from './email-list.component';
import { DxEmailModule } from '../dx-email.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Email/Email List',
  component: EmailListComponent,
  decorators: [
    moduleMetadata({
      imports: [DxEmailModule],
    }),
  ],
  argTypes: {
    title: { control: 'object', description: 'Type: `any`.' },
    emailsList: { control: 'object', description: 'Type: `any[]`.' },
    selectedEmail: { action: 'selectedEmail' },
    toggleMenu: { action: 'toggleMenu' },
  },
  args: {
    title: {},
    emailsList: [],
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
