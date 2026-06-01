import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxBreadcrumbComponent } from './dx-breadcrumb.component';
import { DxBreadcrumbModule } from './dx-breadcrumb.module';
import type { DxBreadcrumb } from './breadcrumb.model';

const trail: DxBreadcrumb[] = [
  { label: 'Home', url: '/' },
  { label: 'Products', url: '/products' },
  { label: 'Laptops', url: '' }, // empty url → current page (not linked)
];

const meta: Meta<DxBreadcrumbComponent> = {
  title: 'Navigation/Breadcrumb',
  component: DxBreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [DxBreadcrumbModule],
    }),
  ],
  argTypes: {
    items: { control: 'object', description: 'Explicit breadcrumb trail (overrides route-derived breadcrumbs).' },
    align: {
      control: 'inline-radio',
      options: ['left', 'center', 'right'],
      description: 'Horizontal alignment of the trail.',
      table: { defaultValue: { summary: 'left' } },
    },
    separatorIcon: { control: 'text', description: 'Material icon used between items.', table: { defaultValue: { summary: 'chevron_right' } } },
  },
  args: {
    items: trail,
    align: 'left',
    separatorIcon: 'chevron_right',
  },
};

export default meta;
type Story = StoryObj<DxBreadcrumbComponent>;

/** Default — left aligned, chevron separators, themed colours/typography. */
export const Default: Story = {};

/** Centre aligned. */
export const Center: Story = {
  args: { align: 'center' },
};

/** Right aligned. */
export const Right: Story = {
  args: { align: 'right' },
};

/** All three alignments stacked. */
export const Alignments: Story = {
  render: () => ({
    props: { trail },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div><div style="font-size:11px;color:#666;margin-bottom:4px;">left</div>
          <dx-breadcrumb [items]="trail" align="left"></dx-breadcrumb></div>
        <div><div style="font-size:11px;color:#666;margin-bottom:4px;">center</div>
          <dx-breadcrumb [items]="trail" align="center"></dx-breadcrumb></div>
        <div><div style="font-size:11px;color:#666;margin-bottom:4px;">right</div>
          <dx-breadcrumb [items]="trail" align="right"></dx-breadcrumb></div>
      </div>
    `,
  }),
};

/** A custom separator icon. */
export const CustomSeparator: Story = {
  args: { separatorIcon: 'arrow_forward_ios' },
};

/** A single (current) item. */
export const SingleItem: Story = {
  args: { items: [{ label: 'Dashboard', url: '' }] },
};
