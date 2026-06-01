import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxLoaderComponent } from './dx-loader.component';
import { DxLoaderModule } from './dx-loader.module';

const meta: Meta<DxLoaderComponent> = {
  title: 'Feedback/Loader',
  component: DxLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [DxLoaderModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    show: { control: 'boolean', description: 'Show/hide the loader overlay.', table: { defaultValue: { summary: 'false' } } },
    type: {
      control: 'select',
      options: ['ball-clip-rotate', 'ball-pulse', 'ball-spin', 'ball-scale-multiple', 'cog', 'pacman', 'line-scale', 'square-jelly-box'],
      description: 'Spinner animation type (load-awesome).',
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'medium', 'large'],
      description: 'Spinner size.',
      table: { defaultValue: { summary: 'large' } },
    },
    color: { control: 'color', description: 'Spinner colour.' },
    bdColor: { control: 'text', description: 'Backdrop colour (RGBA).' },
    fullScreen: { control: 'boolean', description: 'Cover the whole viewport vs. the parent container.', table: { defaultValue: { summary: 'true' } } },
    zIndex: { control: 'number', description: 'Overlay z-index.' },
    name: { control: 'text', description: 'Unique spinner name (keyed in the loader service).' },
    template: { control: 'text', description: 'Custom HTML to render instead of the built-in spinner.' },
    showSpinner: { table: { disable: true } },
    disableAnimation: { control: 'boolean', description: 'Disable the fade animation.' },
  },
  args: {
    show: true,
    type: 'ball-clip-rotate',
    size: 'medium',
    color: '#ffffff',
    bdColor: 'rgba(0, 0, 0, 0.55)',
    fullScreen: false,
    zIndex: 1,
    name: 'story-default',
  },
  parameters: {
    docs: {
      description: {
        component:
          'Overlay loading spinner (load-awesome based). Toggle with the `show` input or ' +
          'the loader service. Use `fullScreen` for a viewport overlay or place it in a ' +
          '`position: relative` container for a contained overlay. The demos below are ' +
          'contained.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<DxLoaderComponent>;

const box = (inner: string) =>
  `<div style="position: relative; height: 180px; border: 1px solid #e6e6e6; border-radius: 6px;">${inner}</div>`;

/** Contained loader with the default spinner. */
export const Default: Story = {
  render: (args) => ({
    props: args,
    template: box(
      `<dx-loader [show]="show" [type]="type" [size]="size" [color]="color"
                  [bdColor]="bdColor" [fullScreen]="fullScreen" [zIndex]="zIndex" [name]="name"></dx-loader>`
    ),
  }),
};

/** All three sizes side by side. */
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;">
        ${['small', 'medium', 'large']
          .map(
            (s) => `
          <div>
            <div style="font-size: 11px; color: #666; margin-bottom: 4px;">${s}</div>
            ${box(
              `<dx-loader show="true" type="ball-clip-rotate" size="${s}" color="#ffffff"
                          bdColor="rgba(0,0,0,0.55)" [fullScreen]="false" [zIndex]="1" name="size-${s}"></dx-loader>`
            )}
          </div>`
          )
          .join('')}
      </div>
    `,
  }),
};

/** A selection of spinner animation types. */
export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
        ${['ball-clip-rotate', 'ball-pulse', 'ball-spin', 'ball-scale-multiple', 'cog', 'pacman', 'line-scale', 'square-jelly-box']
          .map(
            (t) => `
          <div>
            <div style="font-size: 11px; color: #666; margin-bottom: 4px;">${t}</div>
            ${box(
              `<dx-loader show="true" type="${t}" size="medium" color="#ffffff"
                          bdColor="rgba(0,0,0,0.55)" [fullScreen]="false" [zIndex]="1" name="type-${t}"></dx-loader>`
            )}
          </div>`
          )
          .join('')}
      </div>
    `,
  }),
};

/** Loader with a projected loading message. */
export const WithText: Story = {
  render: () => ({
    template: box(
      `<dx-loader show="true" type="ball-clip-rotate" size="medium" color="#ffffff"
                  bdColor="rgba(0,0,0,0.55)" [fullScreen]="false" [zIndex]="1" name="with-text">
         <span style="color: #fff;">Loading…</span>
       </dx-loader>`
    ),
  }),
};
