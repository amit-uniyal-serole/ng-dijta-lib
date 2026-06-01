import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxPageContentMenuComponent } from './dx-page-content-menu.component';
import { DxpagecontentmenuModule } from './dx-pagecontentmenu/dx-pagecontentmenu.module';
import type { ContentMenu } from './model/pagecontent.model';

const meta: Meta<DxPageContentMenuComponent> = {
  title: 'Layout/Page Content Menu',
  component: DxPageContentMenuComponent,
  decorators: [
    moduleMetadata({
      imports: [DxpagecontentmenuModule],
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Heading shown above the menu (bound via the `menuTitle` alias).',
    },
    menuList: { control: 'object', description: 'Type: `ContentMenu[]` — the items to render.' },
    onClickMenu: { action: 'onClickMenu', description: 'Emitted with the `ContentMenu` when an item is clicked.' },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Vertical in-page navigation menu with an optional title. Each item is an ' +
          'accordion that expands to reveal child routes. Renders a "No Records" empty ' +
          'state when `menuList` is empty.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DxPageContentMenuComponent>;

/** Flat list of single-level items. */
const flatMenu: ContentMenu[] = [
  { id: 'overview', label: 'Overview', path: '/overview' },
  { id: 'details', label: 'Details', path: '/details' },
  { id: 'documents', label: 'Documents', path: '/documents' },
  { id: 'history', label: 'History', path: '/history' },
];

/** Items with expandable child routes. */
const nestedMenu: ContentMenu[] = [
  {
    id: 'policy',
    label: 'Policy',
    path: '/policy',
    children: [
      { id: 'policy-summary', label: 'Summary', path: '/policy/summary' },
      { id: 'policy-coverage', label: 'Coverage', path: '/policy/coverage' },
      { id: 'policy-premium', label: 'Premium', path: '/policy/premium' },
    ],
  },
  {
    id: 'claims',
    label: 'Claims',
    path: '/claims',
    children: [
      { id: 'claims-open', label: 'Open claims', path: '/claims/open' },
      { id: 'claims-closed', label: 'Closed claims', path: '/claims/closed' },
    ],
  },
  { id: 'billing', label: 'Billing', path: '/billing' },
  { id: 'settings', label: 'Settings', path: '/settings' },
];

/** Minimal usage: a title and a flat list of items. */
export const Default: Story = {
  args: {
    title: 'Sections',
    menuList: flatMenu,
  },
};

/** Items with expandable child routes (click an item to toggle its accordion). */
export const WithChildren: Story = {
  args: {
    title: 'Policy navigation',
    menuList: nestedMenu,
  },
};

/** No title — the menu renders without a heading. */
export const WithoutTitle: Story = {
  args: {
    title: '',
    menuList: flatMenu,
  },
};

/** Empty `menuList` shows the "No Records" empty state. */
export const Empty: Story = {
  args: {
    title: 'Sections',
    menuList: [],
  },
};
