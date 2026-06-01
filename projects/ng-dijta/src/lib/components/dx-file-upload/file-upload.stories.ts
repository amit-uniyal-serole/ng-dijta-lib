import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FileUploadComponent } from './components/multiple-file-upload/file-upload.component';
import { DxFileUploadModule } from './dx-file-upload.module';
import { FileUploadControl } from './helpers/control.class';
import { FileUploadValidators } from './helpers/validators.class';

const meta: Meta<any> = {
  title: 'Form Inputs/File Upload',
  component: FileUploadComponent,
  decorators: [
    moduleMetadata({
      imports: [DxFileUploadModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Drop-zone-style file upload with two selectors: `<file-upload>` (multi-file with ' +
          'in-zone list, drag-and-drop, animations) and `<file-upload simple>` (compact ' +
          'single-button uploader). Both implement `ControlValueAccessor` and accept a ' +
          '`FileUploadControl` instance for fine-grained control: pre-set value, programmatic ' +
          'add/remove, validators (max size, accepted types, total count), enable/disable, ' +
          'clear, and observables on file events.',
      },
    },
  },
  argTypes: {
    tabIndex: { control: 'number', description: 'Tab order index applied to the host.' },
    animation: { control: 'boolean', description: 'Toggle the file-list zoom-in/zoom-out animations. Default `true`.' },
  },
  args: {
    tabIndex: 0,
    animation: true,
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline multi-file uploader. Click the drop-zone or drag files in. The selected list renders inside the zone with a delete affordance per file.',
      },
    },
  },
  render: () => ({
    props: { uploadControl: new FileUploadControl() },
    template: `
      <file-upload [control]="uploadControl"></file-upload>
    `,
  }),
};

export const SingleFile: Story = {
  name: 'Single-file (simple) uploader',
  parameters: {
    docs: {
      description: {
        story:
          'Use the attribute-based selector `<file-upload simple>` to render the compact ' +
          'single-file uploader — a flat button rather than a full drop zone. Best for ' +
          'replace-existing-file UX where the surrounding form already has the labelling.',
      },
    },
  },
  render: () => ({
    props: { uploadControl: new FileUploadControl({}, [FileUploadValidators.filesLimit(1)]) },
    template: `
      <file-upload simple [control]="uploadControl"></file-upload>
    `,
  }),
};

export const Multiple: Story = {
  name: 'Allow multiple files',
  parameters: {
    docs: {
      description: {
        story: 'Set `[multiple]="true"` to let the native picker select more than one file at a time. Combine with `FileUploadValidators.filesLimit(n)` to cap the total.',
      },
    },
  },
  render: () => ({
    props: { uploadControl: new FileUploadControl({}, [FileUploadValidators.filesLimit(5)]) },
    template: `
      <file-upload [control]="uploadControl" [multiple]="true"></file-upload>
    `,
  }),
};

export const AcceptImagesOnly: Story = {
  name: 'Accept images only',
  parameters: {
    docs: {
      description: {
        story:
          'Use `FileUploadValidators.accept([…])` to restrict to specific MIME types or ' +
          'extensions. The native picker honors the same `accept` value via the underlying ' +
          '`<input type="file">`.',
      },
    },
  },
  render: () => ({
    props: {
      uploadControl: new FileUploadControl({}, [
        FileUploadValidators.accept(['image/*']),
      ]),
    },
    template: `
      <file-upload [control]="uploadControl" [multiple]="true" accept="image/*"></file-upload>
    `,
  }),
};

export const MaxFileSize: Story = {
  name: 'Max file size — 2 MB',
  parameters: {
    docs: {
      description: {
        story:
          '`FileUploadValidators.fileSize(maxBytes)` rejects files larger than the limit. ' +
          'Errors surface via `control.invalid` and on the file item itself.',
      },
    },
  },
  render: () => ({
    props: {
      uploadControl: new FileUploadControl({}, [
        FileUploadValidators.fileSize(2 * 1024 * 1024) as any,
      ]),
    },
    template: `
      <file-upload [control]="uploadControl" [multiple]="true"></file-upload>
    `,
  }),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Disable the control via `FileUploadControl.disable()` (or bind through a disabled `FormControl`). Pointer events on the zone are inert.',
      },
    },
  },
  render: () => {
    const uploadControl = new FileUploadControl();
    uploadControl.disable();
    return {
      props: { uploadControl },
      template: `<file-upload [control]="uploadControl"></file-upload>`,
    };
  },
};

export const PreselectedFiles: Story = {
  name: 'Preselected files',
  parameters: {
    docs: {
      description: {
        story: 'Seed the control with files at construction time via `setValue([…])`. Useful for "edit existing record" flows.',
      },
    },
  },
  render: () => {
    const uploadControl = new FileUploadControl();
    uploadControl.setValue([
      new File([new Blob(['sample-content'])], 'requirements.pdf', { type: 'application/pdf' }),
      new File([new Blob(['sample-image-bytes'])], 'screenshot.png', { type: 'image/png' }),
    ]);
    return {
      props: { uploadControl },
      template: `<file-upload [control]="uploadControl" [multiple]="true"></file-upload>`,
    };
  },
};

export const ReactiveFormBinding: Story = {
  name: 'Reactive form integration',
  parameters: {
    docs: {
      description: {
        story:
          'The component implements `ControlValueAccessor`, so it binds straight to a ' +
          '`FormControl` (no `[control]` input needed). The form-control value is the ' +
          'underlying `File[]`.',
      },
    },
  },
  render: () => {
    const formControl = new FormControl<File[] | null>(null);
    return {
      props: { formControl },
      template: `
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <file-upload [formControl]="formControl" [multiple]="true"></file-upload>
          <pre style="margin: 0; padding: 8px; background: #f5f5f5; border-radius: 4px; font-size: 12px;">value count: {{ formControl.value?.length ?? 0 }}</pre>
        </div>
      `,
    };
  },
};

export const NoAnimation: Story = {
  name: 'Without animation',
  parameters: {
    docs: {
      description: {
        story: '`[animation]="false"` disables the zoom-in/zoom-out transition between the empty zone and the file list — useful for SSR or low-end devices.',
      },
    },
  },
  render: () => ({
    props: { uploadControl: new FileUploadControl() },
    template: `<file-upload [control]="uploadControl" [animation]="false" [multiple]="true"></file-upload>`,
  }),
};

export const CustomPlaceholder: Story = {
  name: 'Custom placeholder template',
  parameters: {
    docs: {
      description: {
        story:
          'Override the empty-zone content via a `<ng-template #placeholder>` projected into the host. The template receives an implicit boolean indicating whether drag-and-drop is supported.',
      },
    },
  },
  render: () => ({
    props: { uploadControl: new FileUploadControl() },
    template: `
      <file-upload [control]="uploadControl" [multiple]="true">
        <ng-template #placeholder let-isDragDropAvailable>
          <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 24px;">
            <span class="material-icons" style="font-size: 36px; color: #6b7280;">cloud_upload</span>
            <strong>Drop your designs here</strong>
            <span style="font-size: 12px; color: #6b7280;">
              {{ isDragDropAvailable ? 'or click to browse' : 'click to browse' }}
            </span>
          </div>
        </ng-template>
      </file-upload>
    `,
  }),
};

export const CustomListItem: Story = {
  name: 'Custom file-item template',
  parameters: {
    docs: {
      description: {
        story:
          'Override how each selected file is rendered inside the zone via a `<ng-template #item>`. The template gets the `File` as `$implicit`, plus `index`, `control`, and a `remove` callback.',
      },
    },
  },
  render: () => {
    const uploadControl = new FileUploadControl();
    uploadControl.setValue([
      new File([new Blob(['sample'])], 'budget.xlsx', { type: 'application/vnd.ms-excel' }),
      new File([new Blob(['sample'])], 'proposal.docx', { type: 'application/msword' }),
    ]);
    return {
      props: { uploadControl },
      template: `
        <file-upload [control]="uploadControl" [multiple]="true">
          <ng-template #item let-file let-i="index" let-c="control">
            <div style="display: flex; align-items: center; gap: 8px; padding: 6px 12px; border: 1px solid #e5e7eb; border-radius: 4px;">
              <span class="material-icons" style="color: #6b7280;">description</span>
              <span style="flex: 1;">{{ file.name }}</span>
              <span style="font-size: 12px; color: #6b7280;">{{ (file.size / 1024).toFixed(1) }} KB</span>
              <button type="button" (click)="c.removeFile(file)" style="border: none; background: none; cursor: pointer; color: #ef4444;">
                <span class="material-icons">close</span>
              </button>
            </div>
          </ng-template>
        </file-upload>
      `,
    };
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison: full drop-zone uploader vs the compact `simple` button vs a disabled instance.',
      },
    },
  },
  render: () => ({
    props: {
      defaultControl: new FileUploadControl(),
      simpleControl: new FileUploadControl({}, [FileUploadValidators.filesLimit(1)]),
      disabledControl: (() => {
        const c = new FileUploadControl();
        c.disable();
        return c;
      })(),
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(220px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">Default (drop zone)</h4>
          <file-upload [control]="defaultControl" [multiple]="true"></file-upload>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Simple (single)</h4>
          <file-upload simple [control]="simpleControl"></file-upload>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Disabled</h4>
          <file-upload [control]="disabledControl"></file-upload>
        </div>
      </div>
    `,
  }),
};
