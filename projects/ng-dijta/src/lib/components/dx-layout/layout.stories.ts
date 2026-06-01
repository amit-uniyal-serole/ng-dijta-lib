import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxLayoutComponent } from './layout.component';
import { DxLayoutModule } from './layout.module';
import type { Menu } from '../dx-sidebar';

const meta: Meta<DxLayoutComponent> = {
  title: 'Layout/Layout',
  component: DxLayoutComponent,
  decorators: [
    moduleMetadata({
      imports: [DxLayoutModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Application shell layout. Composes a header with one of three navigation ' +
          'variants — a collapsible compact sidebar, a horizontal top menu, or a vertical ' +
          'sidebar. The demos below use a flat menu (no sub-menus).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DxLayoutComponent>;

/**
 * Flat navigation menu — no `children`, so no sub-menus are rendered.
 */
const menu: Menu[] = [
  { label: 'Home', code: 'HOME', icon: 'home', route: { path: '/home' } },
  { label: 'Quote', code: 'QUOTE', icon: 'request_quote', route: { path: '/quote' } },
  { label: 'Policy', code: 'POLICY', icon: 'policy', route: { path: '/policy' } },
  { label: 'Payment', code: 'PAYMENT', icon: 'payments', route: { path: '/payment' } },
  { label: 'Reports', code: 'REPORTS', icon: 'assessment', route: { path: '/reports' } },
  { label: 'Settings', code: 'SETTINGS', icon: 'settings', route: { path: '/settings' }, position: 'bottom' },
];

const header = `
  <div style="display:flex;align-items:center;gap:12px;height:56px;padding:0 16px;
              background:var(--primary-base, #00828e);color:var(--primary-on-base, #fff);font-weight:600;">
    <span>Acme Insurance</span>
  </div>
`;

const body = `
  <div style="padding:24px;">
    <h3 style="margin-top:0;">Main content</h3>
    <p>Page content renders here, beside the navigation rail / menu.</p>
  </div>
`;

/** Compact, collapsible sidebar rail (icon-first) with a flat menu. */
export const CompactSidebar: Story = {
  name: 'Compact sidebar',
  render: () => ({
    props: { menu },
    template: `
      <dx-layout class="layout" style="height:520px;">
        <dx-layout-header>${header}</dx-layout-header>
        <dx-compact-content [menu]="menu" [isMenusLoading]="false">
          ${body}
        </dx-compact-content>
      </dx-layout>
    `,
  }),
};

/** Horizontal top-bar navigation with a flat menu. */
export const Horizontal: Story = {
  render: () => ({
    props: { menu },
    template: `
      <dx-layout class="layout" style="height:520px;">
        <dx-layout-header>${header}</dx-layout-header>
        <dx-horizontal-content [menu]="menu">
          ${body}
        </dx-horizontal-content>
      </dx-layout>
    `,
  }),
};

/** Vertical sidebar navigation with a flat menu. */
export const Vertical: Story = {
  render: () => ({
    props: { menu },
    template: `
      <dx-layout class="layout" style="height:520px;">
        <dx-layout-header>${header}</dx-layout-header>
        <dx-vertical-content [menu]="menu">
          ${body}
        </dx-vertical-content>
      </dx-layout>
    `,
  }),
};
