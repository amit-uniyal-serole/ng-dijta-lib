import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DxUploadFilePopupComponent } from './dx-upload-file-popup.component';
import { DxUploadFilePopupModule } from './dx-upload-file-popup.module';
import type { fileObject } from './upload-file.model';

// ──────────────────────────────────────────────────────────────────────────
// `<dx-upload-file-popup>` is a Material dialog body for selecting, validating
// and confirming file attachments. It shows a drag-and-drop zone, validates
// each file's size and extension, lists chosen files in a summary table, and
// resolves the `MatDialogRef` with the raw `FileList` on Upload.
//
// In production it is opened via `MatDialog.open(DxUploadFilePopupComponent)`
// and configured with `Object.assign(ref.componentInstance, { ... })`. The
// stories mirror that: a host frames the body and pushes config onto the child
// after view init; the last story opens the real dialog via a launcher.
// ──────────────────────────────────────────────────────────────────────────

type PopupConfig = Partial<
  Pick<DxUploadFilePopupComponent, 'title' | 'hint' | 'defaultFileSize' | 'fileFormat' | 'files'>
>;

const stubDialogRef = {
  close: (_v?: unknown) => {},
} as unknown as MatDialogRef<DxUploadFilePopupComponent>;

const SAMPLE_FILES: fileObject[] = [
  { file_name: 'passport-scan.pdf', file_type: 'application/pdf', file_size: '1.2 MB' },
  { file_name: 'profile-photo.png', file_type: 'image/png', file_size: '480 KB' },
];

// `title` / `hint` / `fileFormat` etc. are plain instance properties assigned
// on the dialog `componentInstance`. This host reproduces that: it frames the
// popup and assigns config onto the child after view init, re-running ngOnInit
// so `acceptFormat` is recomputed from the supplied `fileFormat`.
@Component({
  selector: 'dx-upload-file-popup-host',
  template: `
    <div style="max-width:560px; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.08); background:#fff; overflow:hidden;">
      <dx-upload-file-popup></dx-upload-file-popup>
    </div>
  `,
  providers: [{ provide: MatDialogRef, useValue: stubDialogRef }],
})
export class DxUploadFilePopupHost implements AfterViewInit {
  @Input() config: PopupConfig = {};
  @ViewChild(DxUploadFilePopupComponent) popup!: DxUploadFilePopupComponent;

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (!this.popup) return;
    Object.assign(this.popup, this.config);
    this.popup.ngOnInit();
    this.cdr.detectChanges();
  }
}

// Launcher — opens the real MatDialog and configures it via Object.assign,
// exactly as a consumer would, then logs the returned FileList.
@Component({
  selector: 'dx-upload-file-popup-launcher',
  template: `
    <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
      <button mat-raised-button color="primary" (click)="open()">Attach files</button>
      <p style="margin:0; color:#666;">Opens the real <code>MatDialog</code>. Drop files (PDF / JPG / PNG, ≤ 15 MB), review the table, then Upload — the returned <code>FileList</code> is logged to the Actions panel.</p>
    </div>
  `,
})
export class DxUploadFilePopupLauncher {
  constructor(@Inject(MatDialog) private readonly dialog: MatDialog) {}

  open(): void {
    const ref = this.dialog.open(DxUploadFilePopupComponent, { width: '560px' });
    Object.assign(ref.componentInstance, {
      title: 'Upload Document',
      hint: 'PDF, JPG or PNG up to 15 MB',
      defaultFileSize: 15 * 1024 * 1024,
      fileFormat: ['pdf', 'jpg', 'png'],
    } satisfies PopupConfig);
  }
}

const meta: Meta<DxUploadFilePopupComponent> = {
  title: 'Overlays/Upload File Popup',
  component: DxUploadFilePopupComponent,
  decorators: [
    moduleMetadata({
      imports: [DxUploadFilePopupModule, MatDialogModule, MatButtonModule],
      declarations: [DxUploadFilePopupHost, DxUploadFilePopupLauncher],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Material-dialog body for selecting, validating and confirming file attachments. Shows a ' +
          'drag-and-drop zone, validates each file against `defaultFileSize` (bytes) and `fileFormat` ' +
          '(allowed extensions), lists chosen files in a summary table, and resolves the ' +
          '`MatDialogRef` with the raw `FileList` on Upload. Configure it after opening via ' +
          '`Object.assign(ref.componentInstance, { title, hint, defaultFileSize, fileFormat })`. ' +
          'The stories frame the body inline; the last opens the real dialog via a launcher.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Dialog title. Type: `string`. @default `"Upload File"`.' },
    hint: { control: 'text', description: 'Helper text under the drop zone. Type: `string`.' },
    defaultFileSize: { control: 'number', description: 'Maximum file size in bytes. Type: `number`.' },
    fileFormat: { control: 'object', description: 'Allowed extensions without the dot, e.g. `["pdf","png"]`. Type: `string[]`.' },
  },
};

export default meta;
type Story = StoryObj<DxUploadFilePopupComponent>;

const inlineRender = (config: PopupConfig) => ({
  props: { config },
  template: `<dx-upload-file-popup-host [config]="config"></dx-upload-file-popup-host>`,
});

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default (drop zone)',
  parameters: { docs: { description: { story: 'The empty drop zone with the default "Upload File" title — the state before any file is chosen.' } } },
  render: () => inlineRender({}),
};

export const WithConstraints: Story = {
  name: 'With hint + constraints',
  parameters: { docs: { description: { story: 'Configured with a title, a footer hint, a 15 MB size cap and PDF/JPG/PNG-only formats — chosen files are validated against these.' } } },
  render: () =>
    inlineRender({
      title: 'Upload Document',
      hint: 'PDF, JPG or PNG up to 15 MB',
      defaultFileSize: 15 * 1024 * 1024,
      fileFormat: ['pdf', 'jpg', 'png'],
    }),
};

export const WithSelectedFiles: Story = {
  name: 'Files selected (summary table)',
  parameters: { docs: { description: { story: 'Once files are chosen the drop zone is replaced by a summary table of name / type / size. Pre-populated here to show that state.' } } },
  render: () =>
    inlineRender({
      title: 'Upload Document',
      files: SAMPLE_FILES,
    }),
};

export const LiveDialog: Story = {
  name: 'Live dialog (launcher)',
  parameters: { docs: { description: { story: 'Opens the real `MatDialog` via a launcher button — the genuine open / validate / upload / close lifecycle.' } } },
  render: () => ({ template: `<dx-upload-file-popup-launcher></dx-upload-file-popup-launcher>` }),
};
