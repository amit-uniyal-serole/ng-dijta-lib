import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { LoadingComponent } from './loading.component';
import { LoadingModule } from './loading.module';
// LoadingBackdropComponent (d-loading-backdrop) is exported by LoadingModule and
// shown here as variants rather than a separate sidebar entry.

const meta: Meta<LoadingComponent> = {
  title: 'Feedback/Loading',
  component: LoadingComponent,
  decorators: [
    moduleMetadata({
      imports: [LoadingModule],
    }),
  ],
  argTypes: {
    loadingStyle: {
      control: 'inline-radio',
      options: ['default', 'infinity'],
      description: 'Spinner style.',
      table: { defaultValue: { summary: 'default' } },
    },
    message: { control: 'text', description: 'Optional text shown next to the spinner.' },
    top: { control: 'text', description: 'CSS `top` of the spinner wrapper.' },
    left: { control: 'text', description: 'CSS `left` of the spinner wrapper.' },
    customPosition: { control: 'boolean', description: 'Skip the centring transform and use `top`/`left` as-is.' },
    zIndex: { control: 'number', description: 'z-index of the spinner.' },
    target: { control: false, description: 'Host element; `BODY` switches to full-screen.' },
    loadingTemplateRef: { control: false, description: 'Custom spinner template.' },
  },
  args: {
    loadingStyle: 'default',
    message: 'Loading...',
    top: '50%',
    left: '50%',
    customPosition: false,
    zIndex: 1,
  },
};

export default meta;
type Story = StoryObj<LoadingComponent>;

const box = (inner: string) =>
  `<div style="position: relative; height: 200px; border: 1px solid #e6e6e6; border-radius: 6px;">${inner}</div>`;

/** Default bar spinner with a message, centred in its container. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: box(
      `<d-loading [loadingStyle]="loadingStyle" [message]="message" [top]="top" [left]="left"
                  [customPosition]="customPosition" [zIndex]="zIndex"></d-loading>`
    ),
  }),
};

/** Spinner only, no message. */
export const NoMessage: Story = {
  render: () => ({
    template: box(`<d-loading loadingStyle="default" top="50%" left="50%"></d-loading>`),
  }),
};

/** The "infinity" SVG spinner style. */
export const Infinity: Story = {
  render: () => ({
    template: box(`<d-loading loadingStyle="infinity" message="Processing…" top="50%" left="50%"></d-loading>`),
  }),
};

/** Both spinner styles side by side. */
export const Styles: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
        <div>
          <div style="font-size: 11px; color: #666; margin-bottom: 4px;">default</div>
          ${box(`<d-loading loadingStyle="default" message="Loading…" top="50%" left="50%"></d-loading>`)}
        </div>
        <div>
          <div style="font-size: 11px; color: #666; margin-bottom: 4px;">infinity</div>
          ${box(`<d-loading loadingStyle="infinity" message="Loading…" top="50%" left="50%"></d-loading>`)}
        </div>
      </div>
    `,
  }),
};

// ── Loading Backdrop (d-loading-backdrop) ────────────────────────────────────
// The dimming backdrop that pairs with the loading overlay. Surfaced here as
// variants of Loading instead of a separate sidebar entry.

const backdropScene = (inner: string) => `
  <div style="position: relative; height: 200px; border: 1px solid #e6e6e6; border-radius: 6px; overflow: hidden;">
    <div style="padding: 16px;">
      <h3 style="margin: 0 0 8px;">Card content</h3>
      <p style="margin: 0; color: #555;">This content sits behind the loading backdrop.</p>
    </div>
    ${inner}
  </div>
`;

/** Backdrop covering its (relatively positioned) container. */
export const Backdrop: Story = {
  name: 'Backdrop: shown',
  render: () => ({
    template: backdropScene(`<d-loading-backdrop [backdrop]="true" [zIndex]="1"></d-loading-backdrop>`),
  }),
};

/** Backdrop hidden (`backdrop = false`) — content shows unobscured. */
export const BackdropHidden: Story = {
  name: 'Backdrop: hidden',
  render: () => ({
    template: backdropScene(`<d-loading-backdrop [backdrop]="false" [zIndex]="1"></d-loading-backdrop>`),
  }),
};
