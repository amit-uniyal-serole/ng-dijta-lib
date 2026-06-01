import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxLayoutSiderComponent } from './sider.component';
import { DxLayoutModule } from './layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Sider',
  component: DxLayoutSiderComponent,
  decorators: [
    moduleMetadata({
      imports: [DxLayoutModule],
    }),
  ],
  argTypes: {
    nzWidth: { control: 'object', description: 'Type: `string | number`.' },
    nzTheme: { control: { type: 'inline-radio' }, options: ["light","dark"], description: 'Type: `\'light\' | \'dark\'`.' },
    nzCollapsedWidth: { control: 'object' },
    nzBreakpoint: { control: 'object', description: 'Type: `NzBreakpointKey | null`.' },
    nzCollapsedChange: { action: 'nzCollapsedChange' },
  },
  args: {
    nzWidth: 'Sample',
    nzTheme: 'dark',
    nzCollapsedWidth: 80,
    nzBreakpoint: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
