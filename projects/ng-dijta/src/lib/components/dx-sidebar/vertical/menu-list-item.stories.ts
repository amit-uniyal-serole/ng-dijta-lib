import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MenuListItemComponent } from './menu-list-item.component';
import { DxSideBarModule } from '../dx-side-bar.module';

const meta: Meta<any> = {
  title: 'Layout/Sidebar/Menu List Item',
  component: MenuListItemComponent,
  decorators: [
    moduleMetadata({
      imports: [DxSideBarModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    item: { control: 'object', description: 'Type: `Menu`.' },
    depth: { control: 'number', description: 'Type: `number`.' },
    index: { control: 'number', description: 'Type: `number`.' },
    list: { control: 'object', description: 'Type: `SubMenu[]`.' },
    vartical: { control: 'boolean', description: 'Type: `boolean`.' },
    disableDispalyConditions: { control: 'boolean', description: 'Type: `boolean`.' },
    onMenuSelection: { action: 'onMenuSelection' },
  },
  args: {
    item: {},
    depth: 1,
    index: 0,
    list: [],
    vartical: false,
    disableDispalyConditions: true,
  },
};

export default meta;
type Story = StoryObj<any>;


export const Default: Story = {};
