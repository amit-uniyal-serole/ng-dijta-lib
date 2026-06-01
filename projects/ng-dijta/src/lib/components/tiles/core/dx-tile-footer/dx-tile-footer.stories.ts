import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxTilesFooterComponent } from './dx-tile-footer.component';
import { DxCardModule } from '../../../dx-card/dx-card.module';

const meta: Meta<any> = {
  title: 'Data Display/Tiles/Tile Footer',
  component: DxTilesFooterComponent,
  decorators: [
    moduleMetadata({
      imports: [DxCardModule],
    }),
  ],
  argTypes: {
    footer: { control: 'object', description: 'Type: `TileFooterDto | undefined`.' },
  },
  args: {
    footer: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
