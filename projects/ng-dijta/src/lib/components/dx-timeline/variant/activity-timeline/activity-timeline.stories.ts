import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ActivityTimelineComponent } from './activity-timeline.component';
import { DxTimelineModule } from '../../timeline.module';

const meta: Meta<any> = {
  title: 'Data Display/Timeline/Activity Timeline',
  component: ActivityTimelineComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTimelineModule],
    }),
  ],
  argTypes: {
    data: { control: 'object', description: 'Type: `TimelineItem[]`.' },
    uniqueBy: { control: 'text', description: 'Type: `string`.' },
    timelinesItems: { control: 'object', description: 'Type: `ActivityTimeLine[]`.' },
    height: { control: 'text', description: 'Type: `string`.' },
    onScrollEvent: { action: 'onScrollEvent' },
  },
  args: {
    data: [],
    uniqueBy: 'displayDate',
    timelinesItems: [],
    height: '400px',
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
