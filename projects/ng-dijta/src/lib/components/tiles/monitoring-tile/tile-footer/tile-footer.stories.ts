import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { TileFooterComponent } from './tile-footer.component';
import { TilesModule } from '../../tiles.module';

const meta: Meta<any> = {
  title: 'Data Display/Tiles/Monitoring Tile Footer',
  component: TileFooterComponent,
  decorators: [
    moduleMetadata({
      imports: [TilesModule],
    }),
  ],
  argTypes: {
    footer: { control: 'object', description: 'Type: `MFooter | undefined`.' },
    isContentHeightSmall: { control: 'boolean', description: 'Type: `boolean`.' },
  },
  args: {
    footer: {},
    isContentHeightSmall: false,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
