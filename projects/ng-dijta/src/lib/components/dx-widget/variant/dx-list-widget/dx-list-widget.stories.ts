import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxListWidgetComponent } from './dx-list-widget.component';
import { DxWidgetModule } from '../../dx-widget.module';

const meta: Meta<any> = {
  title: 'Data Display/Widget/List Widget',
  component: DxListWidgetComponent,
  decorators: [
    moduleMetadata({
      imports: [DxWidgetModule],
    }),
  ],
  argTypes: {
    outline: { control: { type: 'inline-radio' }, options: ["list","none"], description: 'Type: `\'list\' | \'none\'`.' },
    widgetSource: { control: 'object', description: 'Type: `WidgetModel`.' },
    onClickAction: { action: 'onClickAction' },
  },
  args: {
    outline: 'list',
    widgetSource: {},
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
