import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DxCardComponent } from './dx-card.component';
import { DxCardModule } from './dx-card.module';

const meta: Meta<DxCardComponent> = {
  title: 'Data Display/Card',
  component: DxCardComponent,
  decorators: [
    moduleMetadata({
      imports: [DxCardModule, CommonModule, HttpClientModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Minimal card container with optional `[title]` header + content slot. Public card ' +
          'variants (`dx-card-content`, `dx-card-list-view`, `dx-details-card`, `dx-form-card`) ' +
          'and tile flavors (`dx-basic-launch-tile`, `dx-link-tile`, `dx-monitoring-tile`) are ' +
          'shown below. The `core/*` primitives that compose the variants are internal and not ' +
          'surfaced here.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Optional card title rendered in the header slot.' },
    borderNone: {
      control: 'boolean',
      description: 'Remove the default border / padding around the card.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    title: 'Card Title',
    borderNone: false,
  },
};

export default meta;
type Story = StoryObj<DxCardComponent>;

// ──────────────────────────────────────────────────────────────────────────
// dx-card wrapper
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  parameters: { docs: { description: { story: 'Baseline card — border + title + body.' } } },
  render: (args) => ({
    props: args,
    template: `<dx-card [title]="title" [borderNone]="borderNone"><p style="margin:0;">Card body content.</p></dx-card>`,
  }),
};

export const Borderless: Story = {
  args: { title: 'Borderless Card', borderNone: true },
  parameters: { docs: { description: { story: '`[borderNone]="true"` drops the outline / padding.' } } },
  render: (args) => ({
    props: args,
    template: `<dx-card [title]="title" [borderNone]="borderNone"><p style="margin:0;">No outline.</p></dx-card>`,
  }),
};

export const WithoutTitle: Story = {
  parameters: { docs: { description: { story: 'Bring your own header inside the content slot.' } } },
  render: () => ({
    template: `<dx-card><h4 style="margin:0 0 8px;">Custom heading</h4><p style="margin:0;">No title input — projected header.</p></dx-card>`,
  }),
};

// ──────────────────────────────────────────────────────────────────────────
// Variants (variant/*)
// ──────────────────────────────────────────────────────────────────────────

export const VariantCardContent: Story = {
  name: 'Variant: dx-card-content',
  parameters: { docs: { description: { story: 'Single-row renderer that dispatches to the right internal primitive based on `content.type` (`text` / `email` / `url` / `currency` / `date` / etc.). Renders a labeled value with optional click-to-copy.' } } },
  render: () => ({
    props: {
      textContent:  { label: 'Name',   value: 'Acme Inc.',           type: 'text' },
      emailContent: { label: 'Email',  value: 'alex@example.com',    type: 'email' },
      urlContent:   { label: 'Site',   value: 'https://example.com', type: 'url' },
      dateContent:  { label: 'Joined', value: new Date('2024-01-15'), type: 'date' },
    },
    template: `
      <div style="display:grid; gap:12px; max-width:360px;">
        <dx-card-content [content]="textContent"  [enableTextCopy]="true"></dx-card-content>
        <dx-card-content [content]="emailContent" [enableTextCopy]="true"></dx-card-content>
        <dx-card-content [content]="urlContent"   [enableTextCopy]="true"></dx-card-content>
        <dx-card-content [content]="dateContent"></dx-card-content>
      </div>
    `,
  }),
};

export const VariantFormCard: Story = {
  name: 'Variant: dx-form-card',
  parameters: { docs: { description: { story: 'Card-as-form-section — projects form fields inside a labeled card frame.' } } },
  render: () => ({
    template: `
      <dx-form-card title="Profile">
        <div style="display:grid; gap:12px; padding:8px 0;">
          <input style="padding:8px; border:1px solid #ccc; border-radius:4px;" value="Alex Morgan" />
          <input style="padding:8px; border:1px solid #ccc; border-radius:4px;" value="alex@example.com" />
        </div>
      </dx-form-card>
    `,
  }),
};

export const VariantCardListView: Story = {
  name: 'Variant: dx-card-list-view',
  parameters: { docs: { description: { story: 'List-style card composed of a profile header, description, tile strip, content listing, and an action group. Configured via `DxCardConfig.basicCardConfig`.' } } },
  render: () => ({
    props: {
      config: {
        basicCardConfig: {
          profile: {
            show: true,
            name: 'Ada Lovelace',
            src: 'https://i.pravatar.cc/64?img=12',
          },
          description: {
            title: { name: 'Senior Engineer', badge: 'Active', badgeColor: '#4CAF50' },
            subtitle: { label: 'Team', value: 'Platform' },
          },
          tiles: [
            { title: '12', subtitle: 'Open tasks',  bgColor: '#E3F2FD', txtColor: '#0D47A1' },
            { title: '34', subtitle: 'Closed',      bgColor: '#E8F5E9', txtColor: '#1B5E20' },
            { title: '4',  subtitle: 'In review',   bgColor: '#FFF3E0', txtColor: '#E65100' },
          ],
          contentListing: [
            { icon: 'email',   label: 'Email',  value: 'ada@example.com' },
            { icon: 'phone',   label: 'Phone',  value: '+1 415 555 0100' },
            { icon: 'location_on', label: 'City', value: 'San Francisco' },
          ],
        },
      },
      data: { id: 1, name: 'Ada Lovelace' },
    },
    template: `
      <div style="max-width:520px;">
        <dx-card-list-view [config]="config" [data]="data"></dx-card-list-view>
      </div>
    `,
  }),
};

export const VariantDetailsCard: Story = {
  name: 'Variant: dx-details-card',
  parameters: { docs: { description: { story: 'Full details-card composition: title, multi-column rows of typed values (`text` / `currency` / `date` / `email` / `url`). Layout columns use Bootstrap grid classes (`col-md-6`, `col-md-12`).' } } },
  render: () => ({
    props: {
      data: {
        col: 'col-md-12',
        cards: [{
          title: 'Account',
          col: 'col-md-6',
          enableTextCopy: true,
          content: [
            { label: 'Name',    fieldName: 'name',    value: 'Acme Inc.',                    type: 'text' },
            { label: 'Plan',    fieldName: 'plan',    value: 'Enterprise',                   type: 'text' },
            { label: 'ARR',     fieldName: 'arr',     value: 480000,                         type: 'currency', settings: { currency: { currencyCode: 'USD' } } },
            { label: 'Renewal', fieldName: 'renewal', value: new Date('2026-09-01'),         type: 'date' },
            { label: 'Owner',   fieldName: 'owner',   value: 'alex@example.com',             type: 'email' },
            { label: 'Website', fieldName: 'website', value: 'https://acme.example',         type: 'url' },
          ],
        }],
      },
    },
    template: `
      <div style="max-width:720px;">
        <dx-details-card [data]="data" [isBorder]="true"></dx-details-card>
      </div>
    `,
  }),
};

// ──────────────────────────────────────────────────────────────────────────
// Public tiles (tile/* — not tile/core/*)
// ──────────────────────────────────────────────────────────────────────────

export const TileBasicLaunch: Story = {
  name: 'Tile: dx-basic-launch-tile',
  parameters: { docs: { description: { story: 'Launcher tile composed of `dx-tile-header` + description + `dx-tile-footer`. Footer can be a currency / number metric.' } } },
  render: () => ({
    props: {
      data: {
        headerIcon: 'menu_book',
        headerTitle: 'Knowledge base',
        headerSubTitle: 'Articles, FAQs, runbooks',
        description: 'Search across teams.',
        footerTitle: 'Open',
        footerTitleColor: '#3498DB',
      },
    },
    template: `
      <div style="max-width:280px;">
        <dx-basic-launch-tile [data]="data"></dx-basic-launch-tile>
      </div>
    `,
  }),
};

export const TileLink: Story = {
  name: 'Tile: dx-link-tile',
  parameters: { docs: { description: { story: 'Header + clickable link body. Click triggers navigation — either `url` (with `openNewTab`) or `serviceUrl` (HTTP GET trigger).' } } },
  render: () => ({
    props: {
      data: {
        headerIcon: 'open_in_new',
        headerTitle: 'Status page',
        headerSubTitle: 'Live incident feed',
        linkTitle: 'Open status.example.com',
        linkColor: '#3498DB',
        url: 'https://status.example.com',
        openNewTab: true,
      },
    },
    template: `
      <div style="max-width:280px;">
        <dx-link-tile [data]="data"></dx-link-tile>
      </div>
    `,
  }),
};

export const TileMonitoring: Story = {
  name: 'Tile: dx-monitoring-tile',
  parameters: { docs: { description: { story: 'KPI tile — header + a primary metric with description.' } } },
  render: () => ({
    props: {
      data: {
        headerIcon: 'speed',
        headerTitle: 'API latency (p95)',
        headerSubTitle: 'Last 24 hours',
      },
    },
    template: `
      <div style="max-width:280px;">
        <dx-monitoring-tile [data]="data"></dx-monitoring-tile>
      </div>
    `,
  }),
};

// ──────────────────────────────────────────────────────────────────────────
// Composition
// ──────────────────────────────────────────────────────────────────────────

export const Grid: Story = {
  name: 'Card grid',
  parameters: { docs: { description: { story: 'Cards composed into a dashboard grid.' } } },
  render: () => ({
    template: `
      <div style="display:grid; grid-template-columns: repeat(3, minmax(220px, 1fr)); gap:16px;">
        <dx-card title="Open tickets"><p style="margin:0;">120 — up 12 this week.</p></dx-card>
        <dx-card title="Resolved"><p style="margin:0;">340 — last 7 days.</p></dx-card>
        <dx-card title="Backlog"><p style="margin:0;">42 older than 30 days.</p></dx-card>
        <dx-card title="SLA breaches"><p style="margin:0;">3 tickets past deadline.</p></dx-card>
        <dx-card title="Customers"><p style="margin:0;">1,284 active.</p></dx-card>
        <dx-card title="CSAT"><p style="margin:0;">4.6 / 5 — last 30d.</p></dx-card>
      </div>
    `,
  }),
};
