import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { ImagePreviewModule } from './image-preview.module';
import { ImagePreviewDirective } from './image-preview.directive';
import { ModalModule } from '../modal';

// ──────────────────────────────────────────────────────────────────────────
// Host launcher — the image-preview is a modal opened by the `dImagePreview`
// directive. Rendering `<d-image-preview>` directly isn't useful; you need a
// gallery wrapped in the directive. Clicking any `<img>` inside the host
// element opens the fullscreen preview.
// ──────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'dx-image-preview-launcher',
  template: `
    <div [class.dx-image-preview-container]="true"
         dImagePreview
         [disableDefault]="disableDefault"
         [customSub]="customSub"
         style="display:grid; grid-template-columns:repeat(3,minmax(120px,1fr)); gap:12px;">
      <img *ngFor="let src of images"
           [src]="src"
           [alt]="src"
           style="width:100%; height:140px; object-fit:cover; border-radius:6px; cursor:zoom-in;" />
    </div>
    <p style="margin:12px 0 0; color:#666; font-size:13px;">{{ helperText }}</p>
  `,
})
export class DxImagePreviewLauncher {
  @Input() images: string[] = [];
  @Input() disableDefault = false;
  @Input() customSub?: Subject<HTMLElement>;
  @Input() helperText = 'Click any image to open the fullscreen preview.';
}

const meta: Meta<DxImagePreviewLauncher> = {
  title: 'Data Display/Image Preview',
  component: DxImagePreviewLauncher,
  decorators: [
    moduleMetadata({
      imports: [ImagePreviewModule, ModalModule],
      declarations: [DxImagePreviewLauncher],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Fullscreen image-preview overlay (`d-image-preview`) opened by the `[dImagePreview]` ' +
          'directive. The directive listens for `<img>` clicks inside its host element and opens ' +
          'the preview modal with all sibling images for navigation. The overlay supports prev / ' +
          'next, zoom in / out, rotate, fit-to-screen vs original-size toggle, jump-to-page input, ' +
          'and open/download original. Keyboard ← → arrows navigate between images. ' +
          '`[customSub]: Subject<HTMLElement>` lets the parent open the preview ' +
          'programmatically for a specific image element.',
      },
    },
  },
  argTypes: {
    images: { control: 'object', description: 'URLs rendered as a gallery — click any one to open the preview.' },
    disableDefault: { control: 'boolean', description: 'When `true` the directive ignores `<img>` clicks (use with `customSub`).' },
    helperText: { control: 'text', description: 'Helper line shown beneath the gallery.' },
  },
  args: { disableDefault: false, helperText: 'Click any image to open the fullscreen preview.' },
};

export default meta;
type Story = StoryObj<DxImagePreviewLauncher>;

const NATURE_IMAGES = [
  'https://picsum.photos/seed/dx-img-1/800/600',
  'https://picsum.photos/seed/dx-img-2/800/600',
  'https://picsum.photos/seed/dx-img-3/800/600',
  'https://picsum.photos/seed/dx-img-4/800/600',
  'https://picsum.photos/seed/dx-img-5/800/600',
  'https://picsum.photos/seed/dx-img-6/800/600',
];

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Gallery',
  args: { images: NATURE_IMAGES },
  parameters: { docs: { description: { story: 'Six-image gallery. Click any tile → fullscreen preview with prev / next / zoom / rotate / download.' } } },
  render: (args) => ({ props: args }),
};

export const SingleImage: Story = {
  name: 'Single image',
  args: { images: ['https://picsum.photos/seed/dx-single/1200/800'], helperText: 'Click the image to open the preview.' },
  parameters: { docs: { description: { story: 'One image in the host — preview opens for it; prev / next are still wired but only one image is available.' } } },
  render: (args) => ({ props: args }),
};

export const ProgrammaticTrigger: Story = {
  name: 'Programmatic (customSub)',
  parameters: {
    docs: {
      description: {
        story: '`[disableDefault]="true"` + `[customSub]: Subject<HTMLElement>` lets the parent emit an `HTMLElement` to open the preview for that specific image — useful when the host already has its own click handlers.',
      },
    },
  },
  render: () => {
    const customSub = new Subject<HTMLElement>();
    return {
      props: {
        images: NATURE_IMAGES,
        disableDefault: true,
        customSub,
        helperText: 'Default click is disabled. Use the button to open the first image programmatically.',
        openFirst: () => {
          const first = document.querySelector('dx-image-preview-launcher img') as HTMLElement | null;
          if (first) customSub.next(first);
        },
      },
      template: `
        <button type="button"
                style="margin-bottom:12px; padding:8px 14px; border-radius:6px; border:1px solid #ccc; background:#fff; cursor:pointer;"
                (click)="openFirst()">Open first image</button>
        <dx-image-preview-launcher
          [images]="images"
          [disableDefault]="disableDefault"
          [customSub]="customSub"
          [helperText]="helperText">
        </dx-image-preview-launcher>
      `,
    };
  },
};

export const PortraitImages: Story = {
  name: 'Portrait orientation',
  args: {
    images: [
      'https://picsum.photos/seed/dx-portrait-1/600/900',
      'https://picsum.photos/seed/dx-portrait-2/600/900',
      'https://picsum.photos/seed/dx-portrait-3/600/900',
    ],
    helperText: 'Portrait images — the preview\'s "fit" mode adjusts to either orientation.',
  },
  parameters: { docs: { description: { story: 'Tall images — confirms the fit-to-screen / original toggle handles both orientations.' } } },
  render: (args) => ({ props: args }),
};

export const MixedSizes: Story = {
  name: 'Mixed sizes (jump-to-page input)',
  args: {
    images: [
      'https://picsum.photos/seed/dx-mix-1/400/300',
      'https://picsum.photos/seed/dx-mix-2/1600/900',
      'https://picsum.photos/seed/dx-mix-3/800/1200',
      'https://picsum.photos/seed/dx-mix-4/1200/800',
      'https://picsum.photos/seed/dx-mix-5/600/600',
    ],
    helperText: 'Mixed dimensions. Inside the preview, use the page-number input to jump between images.',
  },
  parameters: { docs: { description: { story: 'Images of varying sizes. The preview shows the current/total count and lets you jump via the numeric input.' } } },
  render: (args) => ({ props: args }),
};
