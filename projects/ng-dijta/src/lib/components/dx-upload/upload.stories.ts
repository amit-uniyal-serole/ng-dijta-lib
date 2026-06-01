import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxUploadComponent } from './upload.component';
import { DxUploadModule } from './dx-upload.module';
import type { DxUploadFile } from './interface';

const meta: Meta<any> = {
  title: 'Form Inputs/Upload',
  component: DxUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [DxUploadModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'File uploader with three trigger styles: `select` (button), `drag` (drop zone), and ' +
          'picture-card grid (`dxListType="picture-card"`). Supports multi-file, directory upload, ' +
          'size and type filtering, custom request handlers, preview / download / remove icons, ' +
          'and a configurable secondary-action menu (e.g. "WorkDrive"). The picker button and ' +
          'list components (`dx-upload-btn` and `dx-upload-list`) used to live as their own ' +
          'sidebar entries — they\'re now absorbed here as variants since they are not used ' +
          'in isolation.',
      },
    },
  },
  argTypes: {
    dxType: {
      control: { type: 'inline-radio' },
      options: ['select', 'drag'],
      description: 'Trigger style. `select` renders a button; `drag` renders a full drop zone.',
    },
    dxListType: {
      control: { type: 'inline-radio' },
      options: ['text', 'picture', 'picture-card'],
      description: 'How uploaded items are rendered in the list.',
    },
    dxAccept: { control: 'text', description: 'MIME or extension allow-list passed through to the underlying `<input>` (e.g. `image/*,.pdf`).' },
    dxFileType: { control: 'text', description: 'Comma-separated MIME allow-list applied as a client-side filter (post-pick).' },
    dxLimit: { control: 'number', description: 'When `dxMultiple` is on, keep at most N most recent files (0 = no limit).' },
    dxSize: { control: 'number', description: 'Max per-file size in KB (0 = no limit).' },
    dxFileMaxCount: { control: 'number', description: 'Total file count limit enforced by the button component.' },
    dxMultiple: { control: 'boolean', description: 'Allow multiple files per pick.' },
    dxDirectory: { control: 'boolean', description: 'Pick directories (Chromium-only).' },
    dxOpenFileDialogOnClick: { control: 'boolean', description: 'When `false`, suppresses the file-dialog open on click — useful when the trigger is also wired to a secondary picker.' },
    dxShowUploadList: { control: 'boolean', description: 'Show the uploaded-file list under the trigger.' },
    dxShowButton: { control: 'boolean', description: 'Show the picker button itself.' },
    dxDisabled: { control: 'boolean', description: 'Disable the picker.' },
    dxName: { control: 'text', description: 'Form-field name used by the underlying request.' },
    dxAction: { control: 'text', description: 'Upload endpoint URL (or function returning one).' },
    dxFileList: { control: 'object', description: 'Bound file list (`DxUploadFile[]`).' },
    dxUploadAction: { control: 'object', description: 'Secondary-action menu entries shown beside the picker (e.g. "WorkDrive").' },
    dxChange: { action: 'dxChange', description: 'Fires on every state transition (`start` / `progress` / `success` / `error` / `removed`).' },
    dxFileListChange: { action: 'dxFileListChange', description: 'Fires when the bound file list mutates.' },
    dxOtherAction: { action: 'dxOtherAction', description: 'Fires when the user picks an entry from `dxUploadAction`.' },
  },
  args: {
    dxType: 'select',
    dxListType: 'text',
    dxAccept: '',
    dxFileType: '',
    dxLimit: 0,
    dxSize: 0,
    dxFileMaxCount: 0,
    dxMultiple: false,
    dxDirectory: false,
    dxOpenFileDialogOnClick: true,
    dxShowUploadList: true,
    dxShowButton: true,
    dxDisabled: false,
    dxName: 'file',
    dxAction: '/api/upload',
    dxFileList: [],
    dxUploadAction: [],
  },
};

export default meta;
type Story = StoryObj<any>;

const SAMPLE_FILES: DxUploadFile[] = [
  { uid: '1', name: 'design-spec.pdf', filename: 'design-spec.pdf', size: 245_000, type: 'application/pdf', status: 'done' } as DxUploadFile,
  { uid: '2', name: 'preview.png', filename: 'preview.png', size: 88_000, type: 'image/png', status: 'done' } as DxUploadFile,
];

const UPLOADING_FILE: DxUploadFile[] = [
  { uid: '1', name: 'large-archive.zip', filename: 'large-archive.zip', size: 5_242_880, type: 'application/zip', status: 'uploading', percent: 42 } as DxUploadFile,
];

const ERROR_FILE: DxUploadFile[] = [
  { uid: '1', name: 'rejected.exe', filename: 'rejected.exe', size: 1_000_000, type: 'application/octet-stream', status: 'error', error: { message: 'File type not allowed' } } as DxUploadFile,
];

const FULL_TEMPLATE = `
  <dx-upload
    [dxType]="dxType"
    [dxListType]="dxListType"
    [dxAccept]="dxAccept"
    [dxFileType]="dxFileType"
    [dxLimit]="dxLimit"
    [dxSize]="dxSize"
    [dxFileMaxCount]="dxFileMaxCount"
    [dxMultiple]="dxMultiple"
    [dxDirectory]="dxDirectory"
    [dxOpenFileDialogOnClick]="dxOpenFileDialogOnClick"
    [dxShowUploadList]="dxShowUploadList"
    [dxShowButton]="dxShowButton"
    [dxDisabled]="dxDisabled"
    [dxName]="dxName"
    [dxAction]="dxAction"
    [dxFileList]="dxFileList"
    [dxUploadAction]="dxUploadAction">
  </dx-upload>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline button picker — single file, text list under the trigger.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const Multiple: Story = {
  args: { dxMultiple: true },
  parameters: {
    docs: {
      description: {
        story: '`[dxMultiple]="true"` lets the user pick more than one file per click.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const DragDrop: Story = {
  name: 'Drag-and-drop zone',
  args: { dxType: 'drag', dxMultiple: true },
  parameters: {
    docs: {
      description: {
        story: '`[dxType]="drag"` swaps the button for a full drop zone that highlights on dragover.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const PictureList: Story = {
  name: 'Picture list',
  args: { dxListType: 'picture', dxMultiple: true, dxFileList: SAMPLE_FILES },
  parameters: {
    docs: {
      description: {
        story: '`[dxListType]="picture"` shows each uploaded item as a thumbnail row.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const PictureCard: Story = {
  name: 'Picture-card grid',
  args: { dxListType: 'picture-card', dxMultiple: true, dxFileList: SAMPLE_FILES },
  parameters: {
    docs: {
      description: {
        story: '`[dxListType]="picture-card"` renders a tile grid — the picker button becomes a tile alongside the existing files.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const ImagesOnly: Story = {
  name: 'Accept images only',
  args: { dxAccept: 'image/*', dxFileType: 'image/png,image/jpeg,image/webp' },
  parameters: {
    docs: {
      description: {
        story: '`[dxAccept]` filters the native picker by MIME (`image/*`). `[dxFileType]` adds a post-pick allow-list filter so files dragged in are also screened.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const SizeLimit: Story = {
  name: 'Per-file size limit (1 MB)',
  args: { dxSize: 1024 },
  parameters: {
    docs: {
      description: {
        story: '`[dxSize]` (in KB) drops files larger than the threshold via the built-in `size` filter.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const CountLimit: Story = {
  name: 'Keep most recent 3',
  args: { dxMultiple: true, dxLimit: 3, dxFileList: SAMPLE_FILES },
  parameters: {
    docs: {
      description: {
        story: '`[dxLimit]` keeps only the N most recent files when multiple selection is on.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const DirectoryUpload: Story = {
  name: 'Directory upload',
  args: { dxDirectory: true, dxMultiple: true },
  parameters: {
    docs: {
      description: {
        story: '`[dxDirectory]="true"` enables folder picking (Chromium-only — sets the native `webkitdirectory` attribute).',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const HiddenList: Story = {
  name: 'Hide the list (`dx-upload-btn` only)',
  args: { dxShowUploadList: false },
  parameters: {
    docs: {
      description: {
        story: '`[dxShowUploadList]="false"` hides the file list — replicates what the standalone `dx-upload-btn` used to demo.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const HiddenButton: Story = {
  name: 'List only (`dx-upload-list` only)',
  args: { dxShowButton: false, dxFileList: SAMPLE_FILES },
  parameters: {
    docs: {
      description: {
        story: '`[dxShowButton]="false"` hides the picker so only the file list renders — replicates the standalone `dx-upload-list` demo.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const WithExistingFiles: Story = {
  name: 'Pre-populated list',
  args: { dxMultiple: true, dxFileList: SAMPLE_FILES },
  parameters: {
    docs: {
      description: {
        story: 'Initial files bound via `[dxFileList]` — useful for edit/review screens.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const UploadingState: Story = {
  name: 'Uploading (progress)',
  args: { dxFileList: UPLOADING_FILE },
  parameters: {
    docs: {
      description: {
        story: 'List rendering for a file in flight — shows percentage and a cancel affordance.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const ErrorState: Story = {
  name: 'Error state',
  args: { dxFileList: ERROR_FILE },
  parameters: {
    docs: {
      description: {
        story: 'Failed upload — the list row shows the error tag plus the file metadata.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const Disabled: Story = {
  args: { dxDisabled: true, dxFileList: SAMPLE_FILES },
  parameters: {
    docs: {
      description: {
        story: 'Disabled picker — existing files remain visible but neither removable nor downloadable.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const SecondaryActions: Story = {
  name: 'With secondary actions',
  args: {
    dxUploadAction: [
      { label: 'WorkDrive', event: 'WORKDRIVE' },
      { label: 'From URL', event: 'URL' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '`[dxUploadAction]` adds extra entries next to the picker — useful for "import from cloud storage" flows. The chosen entry fires `(dxOtherAction)`.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: FULL_TEMPLATE,
  }),
};

export const Variants: Story = {
  name: 'All trigger styles',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of the three trigger / list combinations.',
      },
    },
  },
  render: () => ({
    props: {
      files: SAMPLE_FILES,
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(260px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">Select + text list</h4>
          <dx-upload dxType="select" dxListType="text" [dxFileList]="files" [dxMultiple]="true"></dx-upload>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Drag zone</h4>
          <dx-upload dxType="drag" [dxMultiple]="true"></dx-upload>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Picture-card grid</h4>
          <dx-upload dxType="select" dxListType="picture-card" [dxFileList]="files" [dxMultiple]="true"></dx-upload>
        </div>
      </div>
    `,
  }),
};
