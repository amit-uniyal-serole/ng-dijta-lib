import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxEmptyComponent } from './dx-empty.component';
import { DxEmptyModule } from './dx-empty.module';

const meta: Meta<DxEmptyComponent> = {
  title: 'Feedback/Empty',
  component: DxEmptyComponent,
  decorators: [
    moduleMetadata({
      imports: [DxEmptyModule],
    }),
  ],
  argTypes: {
    dxNotFoundImage: {
      control: 'select',
      options: ['default', 'simple'],
      description: "Built-in image (`'default'` | `'simple'`) or an image URL string.",
      table: { defaultValue: { summary: 'default' } },
    },
    dxNotFoundContent: { control: 'text', description: 'Description text (or `null` to hide it).' },
    dxNotFoundFooter: { control: 'text', description: 'Optional footer content below the description.' },
  },
  args: {
    dxNotFoundImage: 'default',
  },
};

export default meta;
type Story = StoryObj<DxEmptyComponent>;

/** Default built-in illustration with the fallback "No Data" description. */
export const Default: Story = {};

/** The simpler built-in illustration. */
export const SimpleImage: Story = {
  args: { dxNotFoundImage: 'simple' },
};

/** A custom description in place of the default. */
export const CustomDescription: Story = {
  args: { dxNotFoundContent: 'No results found' },
};

/** Description plus a footer (e.g. a call to action). */
export const WithFooter: Story = {
  args: {
    dxNotFoundContent: 'No projects yet',
    dxNotFoundFooter: 'Create your first project to get started.',
  },
};

/** A custom image supplied as an image URL string (here an inline data URI). */
export const CustomImage: Story = {
  args: {
    dxNotFoundImage:
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="60"><rect width="80" height="60" rx="6" fill="#e6f7ff" stroke="#91d5ff"/><text x="40" y="36" font-size="12" text-anchor="middle" fill="#0958d9">empty</text></svg>'
      ),
    dxNotFoundContent: 'Nothing here',
  },
};

// ── Embed Empty (dx-embed-empty) ─────────────────────────────────────────────
// dx-embed-empty selects the empty-state size from its host component name and
// can have its content overridden. Surfaced here as variants of Empty.

/** Embedded empty with no host name → default-size illustration. */
export const EmbedDefault: Story = {
  name: 'Embed: default',
  render: () => ({ template: `<dx-embed-empty></dx-embed-empty>` }),
};

/** Embedded empty as used inside a table/list (normal size). */
export const EmbedNormal: Story = {
  name: 'Embed: normal',
  render: () => ({ template: `<dx-embed-empty nzComponentName="table"></dx-embed-empty>` }),
};

/** Embedded empty as used inside a select/cascader (small size). */
export const EmbedSmall: Story = {
  name: 'Embed: small',
  render: () => ({ template: `<dx-embed-empty nzComponentName="select"></dx-embed-empty>` }),
};

/** Embedded empty with a custom string overriding the built-in content. */
export const EmbedCustomContent: Story = {
  name: 'Embed: custom content',
  render: () => ({ template: `<dx-embed-empty specificContent="Nothing to show here"></dx-embed-empty>` }),
};
