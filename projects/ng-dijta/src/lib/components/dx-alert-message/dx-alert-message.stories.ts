import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxAlertMessageComponent } from './dx-alert-message.component';
import { DxAlertMessageModule } from './dx-alert-message.module';

const meta: Meta<DxAlertMessageComponent> = {
  title: 'Feedback/Alert Message',
  component: DxAlertMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [DxAlertMessageModule],
    }),
  ],
  argTypes: {
    type: {
      control: { type: 'inline-radio' },
      options: ['success', 'info', 'warning', 'error'],
      description: 'Severity of the alert.',
      table: { defaultValue: { summary: 'info' } },
    },
    message: { control: 'text', description: 'Primary message content.' },
    description: { control: 'text', description: 'Secondary description below the message.' },
    showIcon: { control: 'boolean', description: 'Show the severity icon.', table: { defaultValue: { summary: 'false' } } },
    iconType: { control: 'text', description: 'Override the Material icon name.' },
    closeable: { control: 'boolean', description: 'Show a close button.', table: { defaultValue: { summary: 'false' } } },
    closeText: { control: 'text', description: 'Custom close text (instead of the close icon).' },
    banner: { control: 'boolean', description: 'Edge-to-edge banner mode.', table: { defaultValue: { summary: 'false' } } },
    msg: { table: { disable: true } },
    onClose: { action: 'onClose', description: 'Emitted when the alert is closed.' },
  },
  args: {
    type: 'info',
    message: 'This is an alert message.',
    showIcon: false,
    closeable: false,
    banner: false,
  },
};

export default meta;
type Story = StoryObj<DxAlertMessageComponent>;

/** Minimal usage. */
export const Default: Story = {};

/** All four severities side by side. */
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <dx-alert-message type="success" [showIcon]="true" message="Operation completed successfully."></dx-alert-message>
        <dx-alert-message type="info" [showIcon]="true" message="A new version is available."></dx-alert-message>
        <dx-alert-message type="warning" [showIcon]="true" message="Your session expires soon."></dx-alert-message>
        <dx-alert-message type="error" [showIcon]="true" message="Something went wrong. Please try again."></dx-alert-message>
      </div>
    `,
  }),
};

/** With the leading severity icon. */
export const WithIcon: Story = {
  args: { type: 'success', message: 'Saved successfully.', showIcon: true },
};

/** Message plus a secondary description (message reads as a bold title). */
export const WithDescription: Story = {
  args: {
    type: 'warning',
    message: 'Action required',
    description: 'Your billing details are incomplete. Update them to avoid service interruption.',
    showIcon: true,
  },
};

/** Closable alert — the close button removes it and emits `onClose`. */
export const Closable: Story = {
  args: { type: 'info', message: 'Dismiss me with the × button.', showIcon: true, closeable: true },
};

/** Closable with custom close text instead of the icon. */
export const CloseText: Story = {
  args: { type: 'warning', message: 'Heads up — review the changes.', closeable: true, closeText: 'Dismiss' },
};

/** Banner mode — edge-to-edge, square corners, icon shown by default. */
export const Banner: Story = {
  args: { type: 'warning', message: 'Scheduled maintenance tonight 22:00–23:00 UTC.', banner: true },
};

/** Alert with a projected action slot (`[dx-alert-action]`). */
export const WithAction: Story = {
  render: () => ({
    template: `
      <dx-alert-message type="info" [showIcon]="true" message="A new update is ready to install.">
        <button dx-alert-action mat-button color="primary">Update now</button>
      </dx-alert-message>
    `,
  }),
};
