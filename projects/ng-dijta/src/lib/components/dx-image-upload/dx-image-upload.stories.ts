import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DxLabelDirective } from '../../directive/label/label.directive';
import { DxImageUploadV1Component } from './varient/dx-image-upload-v1/dx-image-upload-v1.component';
import { DxImageUploadModule } from './dx-image-upload.module';

// `provideHttpClient()` lives at the application-config level in preview.ts —
// don't add it to component-scope `providers` here (it returns
// `EnvironmentProviders` which Angular rejects with NG0207).

const meta: Meta<any> = {
  title: 'Form Inputs/Image Upload',
  component: DxImageUploadV1Component,
  decorators: [
    moduleMetadata({
      imports: [DxImageUploadModule, ReactiveFormsModule, DxLabelDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Image / file uploader with four cooperating selectors:\n\n' +
          '- **`<dx-image-upload-v1>`** — full drop-zone uploader with thumbnail previews, ' +
          'progress, and per-file actions. The default surface.\n' +
          '- **`<dx-image-input>`** — form-field-styled input (Material `mat-form-field`) ' +
          'that opens the picker via the standard `dx-*` label / outline chrome.\n' +
          '- **`<dx-image>`** — `mat-form-field`-compatible single-image picker that opens ' +
          'the v1 uploader in a Material dialog.\n' +
          '- **`<dx-impage-upload-popup>`** — pre-built popup wrapper around v1, opened ' +
          'programmatically via `MatDialog`.\n\n' +
          'Common inputs across the variants: `fileTypes` (accept list), `fileMaxSize` (MB), ' +
          '`fileMaxCount`, `totalMaxSize`, `enableCropper`, `uploadType` (`single` | `multi`), ' +
          'and `adapterData` (server-upload config).',
      },
    },
  },
  argTypes: {
    files: { control: false, description: 'Initial preview list. Each item: `FilePreviewModel` with `fileName`, `fileSize`, `type`, optional `src` thumbnail.' },
    enableCropper: { control: 'boolean', description: 'Open a cropper dialog after the user selects an image. Default `false`.' },
    uploadType: {
      control: { type: 'inline-radio' },
      options: ['single', 'multi'],
      description: '`single` = replace-on-pick, `multi` = append to list.',
    },
    fileMaxSize: { control: 'number', description: 'Per-file max size in MB. Files larger are rejected with a `validationError` event.' },
    fileMaxCount: { control: 'number', description: 'Max number of files in multi-upload mode.' },
    totalMaxSize: { control: 'number', description: 'Combined max size of all selected files in MB.' },
    fileTypes: { control: 'object', description: 'Allowlist of MIME types (e.g. `["image/png", "image/jpeg"]`). Empty array accepts anything.' },
    accept: { control: 'text', description: 'Native `<input accept>` value applied to the file picker dialog.' },
    enableAutoUpload: { control: 'boolean', description: 'Upload immediately on file pick. Set `false` to defer until your handler calls `upload()`.' },
    adapterData: { control: 'object', description: 'Server-upload adapter config (URL, headers, params). Required when `enableAutoUpload` is true.' },
    fileAdded: { action: 'fileAdded', description: 'Fires after a file passes validation and is added to the list.' },
    fileRemoved: { action: 'fileRemoved', description: 'Fires when a file is removed from the list.' },
    validationError: { action: 'validationError', description: 'Fires when a picked file fails type / size / count validation.' },
  },
  args: {
    files: [],
    enableCropper: false,
    uploadType: 'multi',
    fileMaxSize: undefined,
    fileMaxCount: undefined,
    totalMaxSize: undefined,
    fileTypes: [],
    accept: undefined,
    enableAutoUpload: false,
    adapterData: undefined,
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline `<dx-image-upload-v1>` — full drop-zone uploader. Click or drop files in to add them.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <dx-image-upload-v1
        [files]="files"
        [enableCropper]="enableCropper"
        [uploadType]="uploadType"
        [fileMaxSize]="fileMaxSize"
        [fileMaxCount]="fileMaxCount"
        [totalMaxSize]="totalMaxSize"
        [fileTypes]="fileTypes"
        [accept]="accept"
        [enableAutoUpload]="enableAutoUpload"
        [adapterData]="adapterData"
        (fileAdded)="fileAdded?.($event)"
        (fileRemoved)="fileRemoved?.($event)"
        (validationError)="validationError?.($event)">
      </dx-image-upload-v1>
    `,
  }),
};

export const SingleImage: Story = {
  name: 'Single image (replace-on-pick)',
  args: { uploadType: 'single' },
  parameters: {
    docs: {
      description: {
        story: '`[uploadType]="single"` replaces the existing image when the user picks a new one — typical for avatars / profile photos.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <dx-image-upload-v1
        [files]="files"
        [uploadType]="uploadType"
        [fileMaxSize]="fileMaxSize"
        [fileMaxCount]="1"
        [fileTypes]="['image/png','image/jpeg','image/webp']"
        accept="image/*">
      </dx-image-upload-v1>
    `,
  }),
};

export const ImagesOnly: Story = {
  name: 'Images only',
  parameters: {
    docs: {
      description: {
        story: 'Constrain via both `[fileTypes]` (MIME allowlist, used by the in-app validator) and the native `accept` attribute (filters the OS picker dialog).',
      },
    },
  },
  render: () => ({
    props: {
      fileTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'],
    },
    template: `
      <dx-image-upload-v1
        [fileTypes]="fileTypes"
        accept="image/*">
      </dx-image-upload-v1>
    `,
  }),
};

export const WithSizeLimit: Story = {
  name: 'Per-file 2 MB limit',
  args: { fileMaxSize: 2 },
  parameters: {
    docs: {
      description: {
        story: '`[fileMaxSize]="2"` rejects any individual file larger than 2 MB. The rejection fires through `(validationError)`.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <dx-image-upload-v1
        [fileMaxSize]="fileMaxSize"
        (validationError)="validationError?.($event)">
      </dx-image-upload-v1>
    `,
  }),
};

export const WithFileCountLimit: Story = {
  name: 'Max 3 files',
  args: { fileMaxCount: 3 },
  parameters: {
    docs: {
      description: {
        story: '`[fileMaxCount]="3"` caps multi-upload mode at three files. Picking a fourth rejects via `(validationError)`.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <dx-image-upload-v1
        [fileMaxCount]="fileMaxCount"
        (validationError)="validationError?.($event)">
      </dx-image-upload-v1>
    `,
  }),
};

export const WithTotalSizeLimit: Story = {
  name: 'Combined 10 MB limit',
  args: { totalMaxSize: 10 },
  parameters: {
    docs: {
      description: {
        story: '`[totalMaxSize]="10"` caps the sum of all selected file sizes at 10 MB.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <dx-image-upload-v1
        [totalMaxSize]="totalMaxSize"
        (validationError)="validationError?.($event)">
      </dx-image-upload-v1>
    `,
  }),
};

export const WithCropper: Story = {
  name: 'With cropper',
  args: { enableCropper: true },
  parameters: {
    docs: {
      description: {
        story: '`[enableCropper]="true"` opens a Material cropper dialog after the user picks an image, letting them adjust the crop before the file is added to the list.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <dx-image-upload-v1
        [enableCropper]="enableCropper"
        [uploadType]="'single'"
        [fileMaxCount]="1"
        accept="image/*">
      </dx-image-upload-v1>
    `,
  }),
};

export const ImageInputField: Story = {
  name: '<dx-image-input> form-field variant',
  parameters: {
    docs: {
      description: {
        story: 'The `<dx-image-input>` variant wraps the picker in a Material `mat-form-field` so it matches the rest of the `dx-*` form controls (outline, outer label, error treatment). Use this inside reactive forms.',
      },
    },
  },
  render: () => ({
    props: { control: new FormControl(null) },
    template: `
      <dx-image-input [formControl]="control" outline="outer-label" uploadBtnTitle="Upload images">
        <p dxLabel class="mb-0">Profile photo</p>
        <dx-label>Profile photo</dx-label>
      </dx-image-input>
    `,
  }),
};

export const ImageDialogTrigger: Story = {
  name: '<dx-image> dialog trigger',
  parameters: {
    docs: {
      description: {
        story:
          'The `<dx-image>` variant exposes a thumbnail trigger inside `mat-form-field` chrome — clicking it opens the v1 uploader inside a Material dialog. Use when you want the picker to take over the screen instead of expanding inline.',
      },
    },
  },
  render: () => ({
    props: { control: new FormControl([]) },
    template: `
      <dx-image [formControl]="control"></dx-image>
    `,
  }),
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of the four public variants: `dx-image-upload-v1` (drop zone), `dx-image-input` (form-field input), `dx-image` (dialog trigger), and a single-mode upload-v1.',
      },
    },
  },
  render: () => ({
    props: {
      imageInputControl: new FormControl(null),
      imageControl: new FormControl([]),
    },
    template: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 32px;">
        <div>
          <h4 style="margin: 0 0 8px;">&lt;dx-image-upload-v1&gt; — multi</h4>
          <dx-image-upload-v1 uploadType="multi"></dx-image-upload-v1>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">&lt;dx-image-upload-v1&gt; — single</h4>
          <dx-image-upload-v1 uploadType="single" [fileMaxCount]="1" accept="image/*"></dx-image-upload-v1>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">&lt;dx-image-input&gt;</h4>
          <dx-image-input [formControl]="imageInputControl" outline="outer-label">
            <p dxLabel class="mb-0">Image</p>
          </dx-image-input>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">&lt;dx-image&gt;</h4>
          <dx-image [formControl]="imageControl"></dx-image>
        </div>
      </div>
    `,
  }),
};
