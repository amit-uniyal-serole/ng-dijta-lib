import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxTilesHeaderComponent } from './dx-tile-header.component';
import { TilesModule } from '../../tiles.module';

const meta: Meta<any> = {
  title: 'Data Display/Tiles/Tile Header',
  component: DxTilesHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [TilesModule],
    }),
  ],
  argTypes: {
    header: { control: 'object', description: 'Type: `TileHeaderDto | undefined`.' },
  },
  args: {
    header: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
