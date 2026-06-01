import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxSiderTriggerComponent } from './sider-trigger.component';
import { DxLayoutModule } from './layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Sider Trigger',
  component: DxSiderTriggerComponent,
  decorators: [
    moduleMetadata({
      imports: [DxLayoutModule],
    }),
  ],
  argTypes: {
    nzCollapsed: { control: 'object' },
    nzReverseArrow: { control: 'object' },
    matchBreakPoint: { control: 'object' },
    nzCollapsedWidth: { control: 'object', description: 'Type: `number | null`.' },
    siderWidth: { control: 'object', description: 'Type: `string | null`.' },
    nzBreakpoint: { control: 'object', description: 'Type: `NzBreakpointKey | null`.' },
  },
  args: {
    nzCollapsed: false,
    nzReverseArrow: false,
    matchBreakPoint: false,
    nzCollapsedWidth: 0,
    siderWidth: 'Sample',
    nzBreakpoint: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
