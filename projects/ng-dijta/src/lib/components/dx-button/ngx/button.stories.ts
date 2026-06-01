import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

const meta: Meta<any> = {
  title: 'Utilities/Button/Ngx Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [ButtonModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    id: { control: 'text', description: 'Type: `string`.' },
    type: { control: 'object', description: 'Type: `IButtonType`.' },
    bsStyle: { control: 'object', description: 'Type: `IButtonStyle`.' },
    shape: { control: 'object', description: 'Type: `\'circle\'`.' },
    bsSize: { control: 'object', description: 'Type: `IButtonSize`.' },
    bsPosition: { control: 'object', description: 'Type: `IButtonPosition`.' },
    bordered: { control: 'boolean', description: 'Type: `boolean`.' },
    icon: { control: 'text', description: 'Type: `string`.' },
    disabled: { control: 'object' },
    showLoading: { control: 'object' },
    width: { control: 'text', description: 'Type: `string`.' },
    autofocus: { control: 'object' },
    btnClick: { action: 'btnClick' },
  },
  args: {
    id: 'Sample',
    type: {},
    bsStyle: {},
    shape: 'circle',
    bsSize: {},
    bsPosition: {},
    bordered: false,
    icon: 'Sample',
    disabled: false,
    showLoading: false,
    width: 'Sample',
    autofocus: false,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
