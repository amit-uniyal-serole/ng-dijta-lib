import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { DxConfirmComponent } from './dx-confirm.component';
import { DxButtonModule } from '../dx-button/dx-button.module';

// ──────────────────────────────────────────────────────────────────────────
// Shared payload shape — what gets passed via MAT_DIALOG_DATA
// ──────────────────────────────────────────────────────────────────────────

type ConfirmPayload = {
  header?: {
    title?: string;
    closeIcon?: boolean;
    icon?: { isShow: boolean; icon: string; color: string };
  };
  content?: { message?: string };
  actions?: {
    primary?: { title?: string };
    secondary?: { title?: string };
  };
};

const stubDialogRef = {
  close: () => {},
} as unknown as MatDialogRef<DxConfirmComponent>;

// ──────────────────────────────────────────────────────────────────────────
// Inline render — drops the component on the canvas inside a card-shaped
// host. This is the "design preview" mode: shows what the dialog body
// looks like without actually opening MatDialog.
// ──────────────────────────────────────────────────────────────────────────

const inlineRender = (data: ConfirmPayload) => ({
  moduleMetadata: {
    providers: [
      { provide: MAT_DIALOG_DATA, useValue: data },
      { provide: MatDialogRef,    useValue: stubDialogRef },
    ],
  },
  template: `
    <div style="max-width:420px; padding:16px; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.08); background:#fff;">
      <dx-confirm></dx-confirm>
    </div>
  `,
});

// ──────────────────────────────────────────────────────────────────────────
// Launcher — opens the real MatDialog so click flow + close event are
// observable end-to-end.
// ──────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'dx-confirm-launcher',
  template: `
    <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
      <button mat-raised-button color="primary" (click)="open()">Open confirm dialog</button>
      <div *ngIf="lastResult !== null; else hint" style="font-family:monospace; font-size:12px; background:#f5f5f5; padding:10px 14px; border-radius:6px;">
        Last result: <strong>{{ lastResult }}</strong>
      </div>
      <ng-template #hint>
        <p style="margin:0; color:#666;">Click the button to open the dialog; the close payload (true / false) appears here.</p>
      </ng-template>
    </div>
  `,
})
export class DxConfirmLauncher {
  data: ConfirmPayload = {
    header: { title: 'Confirm action', closeIcon: true, icon: { isShow: true, icon: 'help_outline', color: '#1d6cc0' } },
    content: { message: 'Are you sure you want to continue?' },
    actions: { primary: { title: 'Confirm' }, secondary: { title: 'Cancel' } },
  };
  lastResult: boolean | null = null;

  constructor(@Inject(MatDialog) private readonly dialog: MatDialog) {}

  open(): void {
    const ref = this.dialog.open(DxConfirmComponent, { data: this.data, width: '420px' });
    ref.afterClosed().subscribe((result: boolean) => { this.lastResult = result === true; });
  }
}

const meta: Meta<DxConfirmComponent> = {
  title: 'Overlays/Confirm',
  component: DxConfirmComponent,
  decorators: [
    moduleMetadata({
      imports: [DxButtonModule, MatDialogModule, MatButtonModule],
      declarations: [DxConfirmLauncher],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Material-dialog body (`dx-confirm`) used as the standard confirmation prompt. ' +
          'The body reads `MAT_DIALOG_DATA: { header: { title, icon, closeIcon }, content: { message }, ' +
          'actions: { primary, secondary } }` and closes the `MatDialogRef` with `true` (primary) or ' +
          '`false` (secondary / close icon). Stories below render the component inline against a ' +
          'stub `MatDialogRef` for visual preview; the **Live dialog (launcher)** story opens the ' +
          'real `MatDialog` so the close-event flow is observable.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

// ──────────────────────────────────────────────────────────────────────────
// Inline variants — design previews
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default confirm',
  parameters: { docs: { description: { story: 'Standard question — info-blue icon, "Confirm" / "Cancel".' } } },
  render: () => inlineRender({
    header: { title: 'Confirm action', closeIcon: true, icon: { isShow: true, icon: 'help_outline', color: '#1d6cc0' } },
    content: { message: 'Are you sure you want to continue?' },
    actions: { primary: { title: 'Confirm' }, secondary: { title: 'Cancel' } },
  }),
};

export const Destructive: Story = {
  name: 'Destructive (delete)',
  parameters: { docs: { description: { story: 'Red icon + "Delete" CTA — confirms a destructive action.' } } },
  render: () => inlineRender({
    header: { title: 'Delete invoice?', closeIcon: true, icon: { isShow: true, icon: 'delete_outline', color: '#E74C3C' } },
    content: { message: 'INV-1234 will be permanently removed. This action cannot be undone.' },
    actions: { primary: { title: 'Delete' }, secondary: { title: 'Keep' } },
  }),
};

export const Warning: Story = {
  name: 'Warning',
  parameters: { docs: { description: { story: 'Amber icon — alerts the user to a risky but recoverable action.' } } },
  render: () => inlineRender({
    header: { title: 'Discard changes?', closeIcon: true, icon: { isShow: true, icon: 'warning_amber', color: '#F39C12' } },
    content: { message: 'You have unsaved edits. Leaving will discard them.' },
    actions: { primary: { title: 'Discard' }, secondary: { title: 'Stay' } },
  }),
};

export const Success: Story = {
  name: 'Success',
  parameters: { docs: { description: { story: 'Green icon — typically used to confirm completion of a multi-step flow.' } } },
  render: () => inlineRender({
    header: { title: 'Account created', closeIcon: false, icon: { isShow: true, icon: 'check_circle_outline', color: '#16A085' } },
    content: { message: 'Your workspace is ready. Continue to the dashboard?' },
    actions: { primary: { title: 'Open dashboard' }, secondary: { title: 'Later' } },
  }),
};

export const NoIcon: Story = {
  name: 'No icon',
  parameters: { docs: { description: { story: '`header.icon.isShow=false` (or omit `icon`) — text-only prompt.' } } },
  render: () => inlineRender({
    header: { title: 'Send invitation?', closeIcon: true },
    content: { message: 'An email will be sent to alex@example.com inviting them to your workspace.' },
    actions: { primary: { title: 'Send' }, secondary: { title: 'Cancel' } },
  }),
};

export const NoCloseIcon: Story = {
  name: 'No close icon (forced decision)',
  parameters: { docs: { description: { story: '`header.closeIcon=false` hides the × in the corner so the user must pick one of the two actions.' } } },
  render: () => inlineRender({
    header: { title: 'Accept terms?', closeIcon: false, icon: { isShow: true, icon: 'gavel', color: '#9B59B6' } },
    content: { message: 'You must accept the updated Terms of Service to continue using the app.' },
    actions: { primary: { title: 'I accept' }, secondary: { title: 'Decline' } },
  }),
};

export const LongMessage: Story = {
  name: 'Long message',
  parameters: { docs: { description: { story: 'Tests the body when the message wraps over multiple lines.' } } },
  render: () => inlineRender({
    header: { title: 'Switch billing plan?', closeIcon: true, icon: { isShow: true, icon: 'attach_money', color: '#3498DB' } },
    content: { message: 'Switching from Enterprise to Pro will reduce your monthly seat count to 25 and remove SSO. Pending exports will continue to completion. Custom dashboards configured before the switch will be retained but may be limited by the new feature set.' },
    actions: { primary: { title: 'Switch plan' }, secondary: { title: 'Keep current plan' } },
  }),
};

export const NoTitle: Story = {
  name: 'No title (message only)',
  parameters: { docs: { description: { story: 'Drop `header.title` for a quick yes/no prompt.' } } },
  render: () => inlineRender({
    content: { message: 'Mark this thread as resolved?' },
    actions: { primary: { title: 'Yes' }, secondary: { title: 'No' } },
  }),
};

// ──────────────────────────────────────────────────────────────────────────
// Live dialog launcher
// ──────────────────────────────────────────────────────────────────────────

export const LiveDialog: Story = {
  name: 'Live dialog (launcher)',
  parameters: { docs: { description: { story: 'Opens the real `MatDialog` so you can see the overlay backdrop, click "Confirm" / "Cancel" / ×, and observe the close payload (`true` / `false`).' } } },
  render: () => ({ template: `<dx-confirm-launcher></dx-confirm-launcher>` }),
};
