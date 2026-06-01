import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxTimelineDetailViewComponent } from './dx-timeline-detail-view.component';
import { DxTimelineModule } from '../../timeline.module';

const meta: Meta<any> = {
  title: 'Data Display/Timeline/Timeline Detail View',
  component: DxTimelineDetailViewComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTimelineModule],
    }),
  ],
  argTypes: {
    data: { control: 'object', description: 'Type: `TimelineDetailsView[]`.' },
  },
  args: {
    data: [],
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
