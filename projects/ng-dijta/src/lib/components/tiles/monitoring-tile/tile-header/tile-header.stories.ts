import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TileHeaderComponent } from './tile-header.component';
import { TilesModule } from '../../tiles.module';

const meta: Meta<any> = {
  title: 'Data Display/Tiles/Monitoring Tile Header',
  component: TileHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [TilesModule],
    }),
  ],
  argTypes: {
    header: { control: 'object', description: 'Type: `MHeader`.' },
    isContentHeightSmall: { control: 'boolean', description: 'Type: `boolean`.' },
  },
  args: {
    header: {},
    isContentHeightSmall: false,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
