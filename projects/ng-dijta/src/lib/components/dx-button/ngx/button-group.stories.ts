import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ButtonGroupComponent } from './button-group.component';
import { ButtonModule } from './button.module';

const meta: Meta<any> = {
  title: 'Utilities/Button/Button Group',
  component: ButtonGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonModule],
    }),
  ],
  argTypes: {
    size: { control: 'object', description: 'Type: `IButtonGroupSize`.' },
  },
  args: {
    size: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
