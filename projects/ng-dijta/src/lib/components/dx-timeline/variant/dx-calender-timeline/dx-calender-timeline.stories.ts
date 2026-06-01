import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxCalenderTimelineComponent } from './dx-calender-timeline.component';
import { DxTimelineModule } from '../../timeline.module';

const meta: Meta<any> = {
  title: 'Data Display/Timeline/Calender Timeline',
  component: DxCalenderTimelineComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTimelineModule],
    }),
  ],
  argTypes: {
    sortTimeLineBy: { control: 'object', description: 'Type: `SORT_TIMELINE_BY`.' },
    data: { control: 'object', description: 'Type: `TimeLineCalenderModel[]`.' },
  },
  args: {
    sortTimeLineBy: {},
    data: [],
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
