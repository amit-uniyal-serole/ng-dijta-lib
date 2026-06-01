import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { EmailComposeComponent } from './email-compose.component';
import { DxEmailModule } from '../dx-email.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Email/Email Compose',
  component: EmailComposeComponent,
  decorators: [
    moduleMetadata({
      imports: [DxEmailModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
