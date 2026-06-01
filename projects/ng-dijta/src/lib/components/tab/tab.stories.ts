import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NgxTabComponent } from './tab.component';
import { TabsModule } from './tabs.module';

const meta: Meta<NgxTabComponent> = {
  title: 'Navigation/Tab/Tab',
  component: NgxTabComponent,
  decorators: [
    moduleMetadata({
      imports: [TabsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A single tab (`d-tab`) — a child of `d-tabs`. It carries a `title`, an `id` ' +
          '(via `tabId`) and a `disabled` flag, and projects its panel content as child markup. ' +
          'See `Navigation/Tab/Tabs` for the full container and its variants.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Tab label.' },
    disabled: { control: 'boolean', description: 'Disables the tab.', table: { defaultValue: { summary: 'false' } } },
  },
  args: {
    title: 'Profile',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<NgxTabComponent>;

/** A single `d-tab` shown inside its `d-tabs` container (it is invisible on its own). */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <d-tabs>
        <d-tab [tabId]="0" [title]="title" [disabled]="disabled">
          <div style="padding:16px;">Panel content for the "{{ title }}" tab.</div>
        </d-tab>
        <d-tab [tabId]="1" title="Other">
          <div style="padding:16px;">A second tab for context.</div>
        </d-tab>
      </d-tabs>
    `,
  }),
};
