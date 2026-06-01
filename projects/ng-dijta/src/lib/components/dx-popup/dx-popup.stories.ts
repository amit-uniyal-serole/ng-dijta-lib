import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslocoModule } from '@jsverse/transloco';
import { DxPopupComponent } from './dx-popup.component';

// ──────────────────────────────────────────────────────────────────────────
// `<dx-popup>` is a Material dialog body: a translated title, a close icon,
// and a numbered list of `description` lines. It is opened via
// `MatDialog.open(DxPopupComponent)`, after which `title` (a translation key
// or literal) and `description` (string[]) are assigned on the instance.
//
// Two ways to view it:
//   • inline render — the dialog body rendered in a framed card (no modal
//     animation). MatDialogRef is stubbed so it doesn't crash standalone.
//   • launcher — opens the real MatDialog so the open/close lifecycle is real.
// ──────────────────────────────────────────────────────────────────────────

const SAMPLE_TITLE = 'How to complete this form';
const SAMPLE_DESCRIPTION = [
  'Upload a clear copy of the document.',
  'Ensure every required field is filled in.',
  'Review the summary before submitting.',
];

const stubDialogRef = {
  close: (_v?: unknown) => {},
} as unknown as MatDialogRef<DxPopupComponent>;

// `title` / `description` are plain instance properties (not @Inputs) — a
// consumer assigns them on the dialog `componentInstance`. This host mirrors
// that: it frames the popup and pushes the values onto the child after view
// init, so the inline stories reflect real usage.
@Component({
  selector: 'dx-popup-host',
  template: `
    <div style="max-width:480px; padding:16px 20px; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.08); background:#fff;">
      <dx-popup></dx-popup>
    </div>
  `,
  providers: [{ provide: MatDialogRef, useValue: stubDialogRef }],
})
export class DxPopupHost implements AfterViewInit {
  @Input() title = '';
  @Input() description: string[] = [];
  @ViewChild(DxPopupComponent) popup!: DxPopupComponent;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.popup.title = this.title;
    this.popup.description = this.description;
    this.cdr.detectChanges();
  }
}

const inlineRender = (title: string, description: string[]) => ({
  props: { title, description },
  template: `<dx-popup-host [title]="title" [description]="description"></dx-popup-host>`,
});

// ──────────────────────────────────────────────────────────────────────────
// Launcher — opens the real MatDialog and assigns title / description on the
// instance, exactly as a consumer would.
// ──────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'dx-popup-launcher',
  template: `
    <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
      <button mat-raised-button color="primary" (click)="open()">Show instructions</button>
      <p style="margin:0; color:#666;">Opens the real <code>MatDialog</code>. Close via the × icon (Enter / Space also work when focused).</p>
    </div>
  `,
})
export class DxPopupLauncher {
  constructor(@Inject(MatDialog) private readonly dialog: MatDialog) {}

  open(): void {
    const ref = this.dialog.open(DxPopupComponent, { width: '480px' });
    ref.componentInstance.title = SAMPLE_TITLE;
    ref.componentInstance.description = SAMPLE_DESCRIPTION;
  }
}

const meta: Meta<DxPopupComponent> = {
  title: 'Overlays/Popup',
  component: DxPopupComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatDialogModule, MatButtonModule, TranslocoModule],
      declarations: [DxPopupComponent, DxPopupLauncher, DxPopupHost],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A simple `MatDialog` body that shows a translated `title`, a close icon, and a numbered ' +
          'list of `description` lines. Open it with `MatDialog.open(DxPopupComponent)` and assign ' +
          '`componentInstance.title` (a translation key or literal) and ' +
          '`componentInstance.description` (`string[]`). The close icon (and Enter / Space on it) ' +
          'calls `MatDialogRef.close()`. The stories render the body inline in a framed card; the ' +
          'last story opens the real dialog via a launcher button.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Translation key (or literal) shown as the dialog title. Type: `string`.' },
    description: { control: 'object', description: 'Lines rendered as a numbered list in the body. Type: `string[]`.' },
  },
};

export default meta;
type Story = StoryObj<DxPopupComponent>;

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  parameters: { docs: { description: { story: 'The dialog body with a title and three instruction lines, rendered inline (no modal chrome).' } } },
  render: () => inlineRender(SAMPLE_TITLE, SAMPLE_DESCRIPTION),
};

export const SingleLine: Story = {
  name: 'Single line',
  parameters: { docs: { description: { story: 'A minimal popup with one descriptive line.' } } },
  render: () => inlineRender('Heads up', ['Your session will expire in 5 minutes.']),
};

export const ManyLines: Story = {
  name: 'Many lines',
  parameters: { docs: { description: { story: 'A longer numbered list — the body scrolls within the dialog when content overflows.' } } },
  render: () =>
    inlineRender('Terms and conditions', [
      'Read all terms carefully before proceeding.',
      'Your data is processed according to the privacy policy.',
      'You may withdraw consent at any time.',
      'Contact support if anything is unclear.',
      'These terms are subject to periodic review.',
    ]),
};

export const LiveDialog: Story = {
  name: 'Live dialog (launcher)',
  parameters: { docs: { description: { story: 'Opens the real `MatDialog` via a launcher button — the genuine open / close lifecycle.' } } },
  render: () => ({ template: `<dx-popup-launcher></dx-popup-launcher>` }),
};
