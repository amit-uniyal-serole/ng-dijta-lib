import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TreetableComponent } from './treetable.component';
import { TreetableModule } from '../dx-nested-table.module';

const meta: Meta<any> = {
  title: 'Data Display/Nested Table/Treetable',
  component: TreetableComponent,
  decorators: [
    moduleMetadata({
      imports: [TreetableModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    tree: { control: 'object', description: 'Type: `Node<T> | Node<T>[]`.' },
    options: { control: 'object', description: 'Type: `Options<T>`.' },
    columns: { control: 'object', description: 'Type: `Array<DxTableColumn<T>>`.' },
    isBusy: { control: 'boolean', description: 'Type: `boolean`.' },
    height: { control: 'number', description: 'Type: `number`.' },
    footer: { control: 'boolean', description: 'Type: `boolean`.' },
    nodeClicked: { action: 'nodeClicked' },
  },
  args: {
    tree: [],
    options: {},
    columns: [],
    isBusy: false,
    height: 400,
    footer: false,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
