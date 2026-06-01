import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { KpiTileComponent } from './kpi-tile.component';
import { TilesModule } from '../../tiles.module';

const meta: Meta<any> = {
  title: 'Data Display/Tiles/Kpi Tile',
  component: KpiTileComponent,
  decorators: [
    moduleMetadata({
      imports: [TilesModule],
    }),
  ],
  argTypes: {
    tileData: { control: 'object', description: 'Type: `KPI | undefined`.' },
  },
  args: {
    tileData: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
