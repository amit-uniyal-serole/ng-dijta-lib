import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EmailMenuComponent } from './email-menu.component';
import { DxEmailModule } from '../dx-email.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Email/Email Menu',
  component: EmailMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [DxEmailModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    title: { control: 'text', description: 'Type: `string`.' },
    toggleMenu: { action: 'toggleMenu' },
    menuItemClicked: { action: 'menuItemClicked' },
    newEmail: { action: 'newEmail' },
  },
  args: {
    title: 'Mailbox',
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
