import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MonitoringTileComponent } from './monitoring-tile.component';
import { TilesModule } from '../tiles.module';

const meta: Meta<any> = {
  title: 'Data Display/Tiles/Monitoring Tile',
  component: MonitoringTileComponent,
  decorators: [
    moduleMetadata({
      imports: [TilesModule],
    }),
  ],
  argTypes: {
    data: { control: 'object', description: 'Type: `MonitoringTileDto`.' },
  },
  args: {
    data: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
