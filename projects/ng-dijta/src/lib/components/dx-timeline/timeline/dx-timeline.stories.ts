import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxTimelineComponent } from './dx-timeline.component';
import { DxTimelineModule } from '../timeline.module';

const meta: Meta<any> = {
  title: 'Data Display/Timeline/Inner Timeline',
  component: DxTimelineComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTimelineModule],
    }),
  ],
  argTypes: {
    dxMode: { control: 'object', description: 'Type: `DxTimelineMode`.' },
    dxReverse: { control: 'boolean', description: 'Type: `boolean`.' },
    outline: { control: { type: 'inline-radio' }, options: ["calender","timeline-detail-view","none"], description: 'Type: `\'calender\' | \'timeline-detail-view\' | \'none\'`.' },
  },
  args: {
    dxMode: {},
    dxPending: 'Sample',
    dxPendingDot: 'Sample',
    dxReverse: false,
    outline: 'none',
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
