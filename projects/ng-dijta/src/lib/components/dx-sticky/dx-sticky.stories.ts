import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxStickyComponent } from './dx-sticky.component';
import { DxStickyModule } from './dx-sticky.module';

const meta: Meta<DxStickyComponent> = {
  title: 'Layout/Sticky',
  component: DxStickyComponent,
  decorators: [
    moduleMetadata({
      imports: [DxStickyModule],
    }),
  ],
  argTypes: {
    zIndex: { control: 'number', description: 'Stacking order applied to the sticky wrapper.' },
    backgroundColor: { control: 'text', description: 'Background applied while the element is in the `follow` (fixed) state.' },
    boxShadow: { control: 'text', description: 'Box-shadow applied while the element is in the `follow` (fixed) state.' },
    view: { control: 'object', description: 'Offsets (`{ top?, bottom? }`, px) kept between the element and the viewport edges.' },
    container: { control: false, description: 'Scroll-bounds element. Defaults to the parent node.' },
    scrollTarget: { control: false, description: 'Scroll source. Defaults to the window.' },
    statusChange: { action: 'statusChange', description: 'Emitted when the sticky status changes (`normal` | `follow` | `stay` | `remain`).' },
  },
  args: {
    zIndex: 10,
    backgroundColor: '#00828e',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    view: { top: 0 },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Makes its projected content stick to the top of the viewport while the user ' +
          'scrolls through the surrounding container, releasing again at the container ' +
          'bottom. Scroll the canvas to see the toolbar follow.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DxStickyComponent>;

const filler = (label: string) => `
  <div style="padding: 16px;">
    <h3 style="margin: 0 0 8px;">${label}</h3>
    <p style="margin: 0 0 24px; color: #555;">
      Scroll down — the toolbar above sticks to the top of the viewport until the
      end of this section, then releases.
    </p>
    ${Array.from({ length: 12 }, (_, i) => `<p style="margin: 0 0 16px;">Paragraph ${i + 1} — scrollable body content.</p>`).join('')}
  </div>
`;

/** Sticky toolbar inside a tall scrollable section. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 1400px;">
        <dx-sticky
          [zIndex]="zIndex"
          [backgroundColor]="backgroundColor"
          [boxShadow]="boxShadow"
          [view]="view"
          (statusChange)="statusChange($event)">
          <div style="padding: 12px 16px; background: ${'#00828e'}; color: #fff; font-weight: 600;">
            Sticky toolbar
          </div>
        </dx-sticky>
        ${filler('Section content')}
      </div>
    `,
  }),
};

/** Sticks with a 24px gap below the top of the viewport (`view.top`). */
export const WithTopOffset: Story = {
  args: {
    view: { top: 24 },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 1400px;">
        <dx-sticky
          [zIndex]="zIndex"
          [backgroundColor]="backgroundColor"
          [boxShadow]="boxShadow"
          [view]="view"
          (statusChange)="statusChange($event)">
          <div style="padding: 12px 16px; background: #00828e; color: #fff; font-weight: 600;">
            Sticky toolbar (24px offset)
          </div>
        </dx-sticky>
        ${filler('Section content')}
      </div>
    `,
  }),
};
