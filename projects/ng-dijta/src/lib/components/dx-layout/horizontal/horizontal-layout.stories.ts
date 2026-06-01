import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { HorizontalLayoutComponent } from './horizontal-layout.component';
import { DxLayoutModule } from '../layout.module';

const meta: Meta<any> = {
  title: 'Layout/Layout/Horizontal Layout',
  component: HorizontalLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [DxLayoutModule],
    }),
  ],
  argTypes: {

  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
