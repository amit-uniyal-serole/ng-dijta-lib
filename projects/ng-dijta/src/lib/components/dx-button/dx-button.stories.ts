import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxButtonComponent } from './dx-button.component';
import { DxButtonModule } from './dx-button.module';
import { variantMatrix } from '../../stories/_story-helpers';

const meta: Meta<DxButtonComponent<unknown>> = {
  title: 'Buttons/Button',
  component: DxButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [DxButtonModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    title: { control: 'text', description: 'Button label text.' },
    size: {
      control: { type: 'inline-radio' },
      options: ['small', '', 'big'],
      description: 'Visual size of the button.',
      table: { defaultValue: { summary: "''" } },
    },
    dxType: {
      control: { type: 'inline-radio' },
      options: ['primary', 'default'],
      description: 'Primary vs default visual treatment.',
      table: { defaultValue: { summary: 'primary' } },
    },
    disabled: { control: 'boolean', description: 'Disable the button.' },
    isLoading: { control: 'boolean', description: 'Show inline loader.' },
    loaderType: {
      control: { type: 'inline-radio' },
      options: ['semi-circle'],
      description: 'Loader visual when isLoading is true.',
    },
    icon: { control: 'text', description: 'Icon name to render alongside the label.' },
    show: { control: 'boolean', description: 'Hide the button when false.' },
    onActionSelect: { action: 'onActionSelect' },
    onClickMenuAction: { action: 'onClickMenuAction' },
  },
  args: {
    title: 'Click me',
    size: '',
    dxType: 'primary',
    disabled: false,
    isLoading: false,
    show: true,
  },
};

export default meta;
type Story = StoryObj<DxButtonComponent<unknown>>;

export const Default: Story = {};

export const Primary: Story = { args: { dxType: 'primary', title: 'Primary' } };
export const Secondary: Story = { args: { dxType: 'default', title: 'Default' } };

export const AllSizes: Story = {
  render: () => ({
    template: variantMatrix('dx-button', 'size', ['small', '', 'big'], '', 'title="Click me"'),
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: variantMatrix(
      'dx-button',
      'dxType',
      ['primary', 'default'],
      '',
      'title="Click me"'
    ),
  }),
};

export const States: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <dx-button title="Enabled"></dx-button>
        <dx-button title="Disabled" [disabled]="true"></dx-button>
        <dx-button title="Loading" [isLoading]="true"></dx-button>
      </div>
    `,
  }),
};

export const WithIcon: Story = {
  args: { title: 'Save', icon: 'save', dxType: 'primary' },
};
