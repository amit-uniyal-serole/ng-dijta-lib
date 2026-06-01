import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxTimelineItemComponent } from './dx-timeline-item.component';
import { DxTimelineModule } from '../timeline.module';

const meta: Meta<any> = {
  title: 'Data Display/Timeline/Timeline Item',
  component: DxTimelineItemComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTimelineModule],
    }),
  ],
  argTypes: {
    dxPosition: { control: 'object', description: 'Type: `DxTimelinePosition`.' },
    dxColor: { control: 'object', description: 'Type: `DxTimelineItemColor | string`.' },
    calenderData: { control: 'object', description: 'Type: `TimeLineCalenderBoxModel`.' },
    timelineItemTileLabel: { control: 'text', description: 'Type: `string`.' },
    backgroundNone: { control: 'boolean', description: 'Type: `boolean`.' },
  },
  args: {
    dxPosition: {},
    dxColor: {},
    dxDot: 'Sample',
    dxCustom: 'Sample',
    dxLabel: 'Sample',
    calenderData: {},
    timelineItemTileLabel: '',
    backgroundNone: false,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
