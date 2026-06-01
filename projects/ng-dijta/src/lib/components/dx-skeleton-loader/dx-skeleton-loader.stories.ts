import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxSkeletonLoaderComponent } from './dx-skeleton-loader.component';
import { DxSkeletonLoaderModule } from './dx-skeleton-loader.module';

const meta: Meta<DxSkeletonLoaderComponent> = {
  title: 'Feedback/Skeleton Loader',
  component: DxSkeletonLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [DxSkeletonLoaderModule],
      providers: [provideAnimations()],
    }),
  ],
  argTypes: {
    count: { control: 'number', description: 'Number of skeleton items to render.', table: { defaultValue: { summary: '1' } } },
    appearance: {
      control: 'inline-radio',
      options: ['line', 'circle', ''],
      description: "Shape of each item (`'circle'` needs a square theme).",
      table: { defaultValue: { summary: 'line' } },
    },
    animation: {
      control: 'select',
      options: ['progress', 'progress-dark', 'pulse', 'false'],
      description: 'Shimmer animation.',
      table: { defaultValue: { summary: 'progress' } },
    },
    theme: { control: 'object', description: 'ngStyle object applied to each item (width/height/border-radius/…).' },
    loadingText: { control: 'text', description: 'Text exposed to assistive tech (aria-valuetext).' },
    ariaLabel: { control: 'text', description: 'Accessible label for each item.' },
  },
  args: {
    count: 1,
    appearance: 'line',
    animation: 'progress',
    loadingText: 'Loading...',
    ariaLabel: 'loading',
    theme: { width: '100%', height: '20px', 'border-radius': '4px' },
  },
};

export default meta;
type Story = StoryObj<DxSkeletonLoaderComponent>;

/** Single line skeleton. */
export const Default: Story = {};

/** Several lines stacked (e.g. a paragraph placeholder). */
export const MultipleLines: Story = {
  args: {
    count: 4,
    theme: { width: '100%', height: '16px', 'border-radius': '4px', 'margin-bottom': '8px' },
  },
};

/** Circle appearance (avatar placeholder). */
export const Circle: Story = {
  args: {
    appearance: 'circle',
    theme: { width: '48px', height: '48px' },
  },
};

/** Every animation mode side by side. */
export const Animations: Story = {
  render: () => ({
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 560px;">
        ${['progress', 'progress-dark', 'pulse', 'false']
          .map(
            (a) => `
          <div>
            <div style="font-size: 11px; color: #666; margin-bottom: 4px;">animation = "${a}"</div>
            <dx-skeleton-loader animation="${a}" [theme]="{ width: '100%', height: '20px', 'border-radius': '4px' }"></dx-skeleton-loader>
          </div>`
          )
          .join('')}
      </div>
    `,
  }),
};

/** Realistic card placeholder: avatar + title + lines. */
export const CardSkeleton: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; max-width: 420px; padding: 16px; border: 1px solid #eee; border-radius: 8px;">
        <dx-skeleton-loader appearance="circle" [theme]="{ width: '56px', height: '56px' }"></dx-skeleton-loader>
        <div style="flex: 1;">
          <dx-skeleton-loader [theme]="{ width: '60%', height: '18px', 'border-radius': '4px', 'margin-bottom': '10px' }"></dx-skeleton-loader>
          <dx-skeleton-loader [count]="3" [theme]="{ width: '100%', height: '12px', 'border-radius': '4px', 'margin-bottom': '8px' }"></dx-skeleton-loader>
        </div>
      </div>
    `,
  }),
};
