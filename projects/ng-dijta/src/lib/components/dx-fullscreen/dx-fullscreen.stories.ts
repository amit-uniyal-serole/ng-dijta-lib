import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxFullscreenComponent } from './dx-fullscreen.component';
import { DxFullscreenModule } from './dx-fullscreen.module';

const meta: Meta<DxFullscreenComponent> = {
  title: 'Overlays/Fullscreen',
  component: DxFullscreenComponent,
  decorators: [
    moduleMetadata({ imports: [DxFullscreenModule] }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '`<dx-fullscreen>` is a container with two projection slots: a `[fullscreen-launch]` trigger ' +
          '(any clickable element) and a `[fullscreen-target]` block (the element to expand). Toggle ' +
          'modes via `[mode]`: `"immersive"` uses the browser Fullscreen API ' +
          '(`requestFullscreen` / `exitFullscreen`); `"normal"` adds a `.fullscreen` class to the ' +
          'target so it fills its containing element. Esc exits in both modes. Use `[beforeChange]` ' +
          'to guard (returns `boolean | Promise | Observable`) and listen to `(fullscreenLaunch)` ' +
          'for `{ isFullscreen }` state changes.',
      },
    },
  },
  argTypes: {
    mode:   { control: { type: 'inline-radio' }, options: ['immersive', 'normal'], description: '`immersive` → Fullscreen API; `normal` → CSS class toggle.' },
    zIndex: { control: 'number', description: 'z-index applied to the fullscreen target (default 10).' },
    fullscreenLaunch: { action: 'fullscreenLaunch', description: 'Fires with `{ isFullscreen }` on enter / exit.' },
  },
};

export default meta;
type Story = StoryObj<DxFullscreenComponent>;

const sampleContent = `
  <div fullscreen-target class="dx-fullscreen-demo"
       style="padding:24px; background:linear-gradient(135deg,#3498DB,#9B59B6); color:#fff; border-radius:8px; min-height:240px;">
    <h3 style="margin:0 0 12px;">Fullscreen target</h3>
    <p style="margin:0 0 8px;">This card is the element passed via the <code>[fullscreen-target]</code> slot.</p>
    <p style="margin:0;">Press the button above (or Esc once expanded) to toggle fullscreen.</p>
  </div>
`;

export const Immersive: Story = {
  name: 'Immersive (browser API)',
  args: { mode: 'immersive', zIndex: 10 } as any,
  parameters: { docs: { description: { story: '`mode="immersive"` — calls the browser Fullscreen API on the document element. Hides browser chrome too.' } } },
  render: (args) => ({
    props: args,
    template: `
      <dx-fullscreen [mode]="mode" [zIndex]="zIndex" (fullscreenLaunch)="fullscreenLaunch($event)">
        <button fullscreen-launch
                style="margin-bottom:12px; padding:8px 14px; border:1px solid #ccc; border-radius:6px; background:#fff; cursor:pointer;">
          Enter immersive fullscreen
        </button>
        ${sampleContent}
      </dx-fullscreen>
    `,
  }),
};

export const Normal: Story = {
  name: 'Normal (CSS fullscreen)',
  args: { mode: 'normal', zIndex: 100 } as any,
  parameters: { docs: { description: { story: '`mode="normal"` — adds a `.fullscreen` class so the target fills the viewport / parent. No browser API call.' } } },
  render: (args) => ({
    props: args,
    template: `
      <dx-fullscreen [mode]="mode" [zIndex]="zIndex" (fullscreenLaunch)="fullscreenLaunch($event)">
        <button fullscreen-launch
                style="margin-bottom:12px; padding:8px 14px; border:1px solid #ccc; border-radius:6px; background:#fff; cursor:pointer;">
          Toggle CSS fullscreen
        </button>
        ${sampleContent}
      </dx-fullscreen>
    `,
  }),
};

export const CustomZIndex: Story = {
  name: 'Custom z-index',
  args: { mode: 'normal', zIndex: 2000 } as any,
  parameters: { docs: { description: { story: '`[zIndex]="2000"` — sits above other overlays (dialogs, popovers) the page might already have.' } } },
  render: (args) => ({
    props: args,
    template: `
      <dx-fullscreen [mode]="mode" [zIndex]="zIndex">
        <button fullscreen-launch
                style="margin-bottom:12px; padding:8px 14px; border:1px solid #ccc; border-radius:6px; background:#fff; cursor:pointer;">
          Expand (z-index 2000)
        </button>
        ${sampleContent}
      </dx-fullscreen>
    `,
  }),
};

export const WithBeforeChangeGuard: Story = {
  name: 'beforeChange guard',
  parameters: { docs: { description: { story: '`[beforeChange]` returns `boolean | Promise<boolean> | Observable<boolean>`. Returning `false` cancels the transition — useful for "unsaved changes" prompts.' } } },
  render: () => ({
    props: {
      mode: 'normal',
      beforeChange: (isFullscreen: boolean, trigger: string) =>
        window.confirm(`Currently ${isFullscreen ? 'expanded' : 'collapsed'}. Trigger: ${trigger}. Proceed?`),
    },
    template: `
      <dx-fullscreen [mode]="mode" [beforeChange]="beforeChange">
        <button fullscreen-launch
                style="margin-bottom:12px; padding:8px 14px; border:1px solid #ccc; border-radius:6px; background:#fff; cursor:pointer;">
          Toggle (with confirm)
        </button>
        ${sampleContent}
      </dx-fullscreen>
    `,
  }),
};

export const WithCustomLauncher: Story = {
  name: 'Custom launcher (icon button)',
  parameters: { docs: { description: { story: 'The `[fullscreen-launch]` slot accepts any element — here an icon-only button typical for toolbars.' } } },
  render: () => ({
    props: { mode: 'normal' },
    template: `
      <dx-fullscreen [mode]="mode">
        <button fullscreen-launch
                aria-label="Toggle fullscreen"
                style="margin-bottom:12px; display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; padding:0; border:1px solid #ccc; border-radius:50%; background:#fff; cursor:pointer;">
          <span class="material-icons">fullscreen</span>
        </button>
        ${sampleContent}
      </dx-fullscreen>
    `,
  }),
};

export const ChartCard: Story = {
  name: 'Chart card (real-world)',
  parameters: { docs: { description: { story: 'Typical dashboard pattern — a chart card with an "expand" icon in its header. Clicking it puts the chart into fullscreen.' } } },
  render: () => ({
    props: { mode: 'normal' },
    template: `
      <dx-fullscreen [mode]="mode">
        <div fullscreen-target
             style="background:#fff; border:1px solid #e0e0e0; border-radius:8px; padding:16px; min-height:220px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px;">
            <strong>API latency · p95</strong>
            <button fullscreen-launch
                    aria-label="Expand"
                    style="display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; padding:0; border:none; background:transparent; cursor:pointer;">
              <span class="material-icons">fullscreen</span>
            </button>
          </div>
          <div style="height:180px; background:linear-gradient(0deg, rgba(52,152,219,0.18), rgba(52,152,219,0.02)); border-radius:4px; display:flex; align-items:flex-end; justify-content:space-around; padding:8px;">
            <div style="width:8%; height:38%; background:#3498DB; border-radius:3px;"></div>
            <div style="width:8%; height:55%; background:#3498DB; border-radius:3px;"></div>
            <div style="width:8%; height:42%; background:#3498DB; border-radius:3px;"></div>
            <div style="width:8%; height:68%; background:#3498DB; border-radius:3px;"></div>
            <div style="width:8%; height:50%; background:#3498DB; border-radius:3px;"></div>
            <div style="width:8%; height:78%; background:#3498DB; border-radius:3px;"></div>
            <div style="width:8%; height:62%; background:#3498DB; border-radius:3px;"></div>
          </div>
        </div>
      </dx-fullscreen>
    `,
  }),
};
