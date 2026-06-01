import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxContentMenuAccrodianComponent } from './dx-content-menu-accrodian.component';
import { DxpagecontentmenuModule } from './dx-pagecontentmenu/dx-pagecontentmenu.module';
import type { ContentMenu } from './model/pagecontent.model';

const meta: Meta<DxContentMenuAccrodianComponent> = {
  title: 'Layout/Page Content Menu/Content Menu Accrodian',
  component: DxContentMenuAccrodianComponent,
  decorators: [
    moduleMetadata({
      imports: [DxpagecontentmenuModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    item: { control: 'object', description: 'Type: `ContentMenu` — the menu item to render.' },
    showContent: { control: 'boolean', description: 'Whether the child accordion is expanded.' },
    onClickMenu: { action: 'onClickMenu', description: 'Emitted with the `ContentMenu` when the item is clicked.' },
  },
};

export default meta;
type Story = StoryObj<DxContentMenuAccrodianComponent>;

const leafItem: ContentMenu = { id: 'overview', label: 'Overview', path: '/overview' };

const parentItem: ContentMenu = {
  id: 'policy',
  label: 'Policy',
  path: '/policy',
  children: [
    { id: 'policy-summary', label: 'Summary', path: '/policy/summary' },
    { id: 'policy-coverage', label: 'Coverage', path: '/policy/coverage' },
  ],
};

/** A single leaf item with no children. */
export const Default: Story = {
  args: {
    item: leafItem,
    showContent: false,
  },
};

/** An item with children, collapsed (chevron shown). */
export const WithChildren: Story = {
  args: {
    item: parentItem,
    showContent: false,
  },
};

/** An item with children, expanded to reveal the child routes. */
export const Expanded: Story = {
  args: {
    item: parentItem,
    showContent: true,
  },
};
