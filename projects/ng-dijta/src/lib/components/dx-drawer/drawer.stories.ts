import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Component, Input } from '@angular/core';
import { DxDrawerComponent } from './drawer.component';
import { DxDrawerModule } from './drawer.module';
import { MatButtonModule } from '@angular/material/button';

// ──────────────────────────────────────────────────────────────────────────
// Launcher — `<dx-drawer>` is an overlay container. Toggling `[nzVisible]`
// from outside is the standard way to open / close it. Inline rendering
// would leave it permanently mounted; the launcher exposes a button so the
// open/close lifecycle is observable.
// ──────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'dx-drawer-launcher',
  template: `
    <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
      <button mat-raised-button color="primary" (click)="visible = true">{{ openLabel }}</button>
      <p style="margin:0; color:#666;">{{ helper }}</p>

      <dx-drawer
        [nzVisible]="visible"
        [dxTitle]="title"
        [dxExtra]="extra"
        [dxFooter]="footer"
        [dxPlacement]="placement"
        [dxSize]="size"
        [dxWidth]="width"
        [dxHeight]="height"
        [dxMask]="mask"
        [dxMaskClosable]="maskClosable"
        [dxClosable]="closable"
        [dxKeyboard]="keyboard"
        [dxNoAnimation]="noAnimation"
        [dxZIndex]="zIndex"
        [dxOffsetX]="offsetX"
        [dxOffsetY]="offsetY"
        [dxWrapClassName]="wrapClassName"
        (dxOnClose)="visible = false"
        (dxVisibleChange)="onVisibleChange($event)">
        <dx-drawer-content>
          <div style="padding:16px; line-height:1.6;">
            <p style="margin-top:0;"><strong>{{ title || 'Drawer body' }}</strong></p>
            <p>{{ body }}</p>
            <p style="margin:0;">Place anything inside <code>&lt;dx-drawer-content&gt;</code> — forms, tables, summaries.</p>
          </div>
        </dx-drawer-content>
      </dx-drawer>
    </div>
  `,
})
export class DxDrawerLauncher {
  @Input() openLabel = 'Open drawer';
  @Input() helper = 'Click to slide the drawer in. Click the backdrop, the × icon, or press Esc to close.';
  @Input() title = 'Drawer title';
  @Input() extra = '';
  @Input() footer = '';
  @Input() placement: 'left' | 'right' | 'top' | 'bottom' = 'right';
  @Input() size: 'default' | 'large' = 'default';
  @Input() width: number | string = '';
  @Input() height: number | string = '';
  @Input() mask = true;
  @Input() maskClosable = true;
  @Input() closable = true;
  @Input() keyboard = true;
  @Input() noAnimation = false;
  @Input() zIndex = 1000;
  @Input() offsetX = 0;
  @Input() offsetY = 0;
  @Input() wrapClassName = '';
  @Input() body = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

  visible = false;

  onVisibleChange(v: boolean): void {
    this.visible = v;
  }
}

const meta: Meta<DxDrawerLauncher> = {
  title: 'Overlays/Drawer',
  component: DxDrawerLauncher,
  decorators: [
    moduleMetadata({
      imports: [DxDrawerModule, MatButtonModule],
      declarations: [DxDrawerLauncher],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Slide-in overlay container (`<dx-drawer>`). Open / close via the `[nzVisible]` two-way ' +
          'binding (or via `DxDrawerService.create()` when you need a programmatic API). Configure ' +
          'placement (`left` / `right` / `top` / `bottom`), size (`default` / `large` or explicit ' +
          '`[dxWidth]` / `[dxHeight]`), backdrop behavior (`[dxMask]`, `[dxMaskClosable]`, ' +
          '`[dxKeyboard]`), title / extra / footer slots, and z-index / offsets. The drawer body ' +
          'goes inside `<dx-drawer-content>`. The stories below all wrap the drawer in a small ' +
          'launcher button so the open / close cycle is observable.',
      },
    },
  },
  argTypes: {
    placement: { control: { type: 'inline-radio' }, options: ['left', 'right', 'top', 'bottom'], description: 'Slide-in edge.' },
    size:      { control: { type: 'inline-radio' }, options: ['default', 'large'], description: '`default` = 256px, `large` = 736px on horizontal placements (vice versa for vertical).' },
    width:     { control: 'text', description: 'Explicit `dxWidth` override (e.g. `"420px"`, `"50%"`). Wins over `dxSize`.' },
    height:    { control: 'text', description: 'Explicit `dxHeight` override.' },
    mask:        { control: 'boolean', description: 'Show the dimmed backdrop behind the drawer.' },
    maskClosable:{ control: 'boolean', description: 'Click backdrop closes the drawer.' },
    closable:    { control: 'boolean', description: 'Show the × icon in the header.' },
    keyboard:    { control: 'boolean', description: 'Esc key closes the drawer.' },
    noAnimation: { control: 'boolean', description: 'Skip the slide animation.' },
    zIndex:      { control: 'number', description: 'CSS z-index (default 1000).' },
    offsetX:     { control: 'number', description: 'Horizontal offset from the edge (left/right placement).' },
    offsetY:     { control: 'number', description: 'Vertical offset from the edge (top/bottom placement).' },
    title:       { control: 'text' },
    extra:       { control: 'text', description: 'Right-aligned slot in the header (extra action / label).' },
    footer:      { control: 'text', description: 'Fixed footer slot.' },
    body:        { control: 'text', description: 'Demo body text rendered inside `<dx-drawer-content>`.' },
    wrapClassName:{ control: 'text', description: 'Extra class applied to the drawer wrapper.' },
  },
};

export default meta;
type Story = StoryObj<DxDrawerLauncher>;

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Right (default)',
  args: { placement: 'right', size: 'default', title: 'Settings' },
  parameters: { docs: { description: { story: 'Standard right-side drawer at the default 256px size.' } } },
  render: (args) => ({ props: args }),
};

export const LeftPlacement: Story = {
  name: 'Left placement',
  args: { placement: 'left', title: 'Navigation' },
  parameters: { docs: { description: { story: '`dxPlacement="left"` — slides in from the left edge (common for nav drawers).' } } },
  render: (args) => ({ props: args }),
};

export const TopPlacement: Story = {
  name: 'Top placement',
  args: { placement: 'top', title: 'Notifications' },
  parameters: { docs: { description: { story: '`dxPlacement="top"` — drops in from the top edge.' } } },
  render: (args) => ({ props: args }),
};

export const BottomPlacement: Story = {
  name: 'Bottom placement',
  args: { placement: 'bottom', title: 'Quick actions' },
  parameters: { docs: { description: { story: '`dxPlacement="bottom"` — slides up from the bottom edge (good for mobile-style sheets).' } } },
  render: (args) => ({ props: args }),
};

export const LargeSize: Story = {
  name: 'Large size',
  args: { size: 'large', title: 'User profile' },
  parameters: { docs: { description: { story: '`dxSize="large"` widens the drawer to 736px (or 50% on small viewports).' } } },
  render: (args) => ({ props: args }),
};

export const CustomWidth: Story = {
  name: 'Custom width',
  args: { width: '50%', title: 'Filters', body: 'Wide drawer — useful when the body hosts a multi-column form.' },
  parameters: { docs: { description: { story: '`[dxWidth]` overrides `dxSize`. Accepts any CSS width — number (px), percent, or named unit.' } } },
  render: (args) => ({ props: args }),
};

export const WithExtraAndFooter: Story = {
  name: 'Title + extra + footer slots',
  args: {
    title: 'Edit record',
    extra: 'Last saved · 2 min ago',
    footer: 'Cancel  |  Save',
    body: 'The footer stays pinned to the bottom of the drawer; the extra slot sits in the top-right next to the close button.',
  },
  parameters: { docs: { description: { story: 'All three text slots — `[dxTitle]`, `[dxExtra]`, `[dxFooter]` — populated.' } } },
  render: (args) => ({ props: args }),
};

export const NoMask: Story = {
  name: 'No backdrop',
  args: { mask: false, title: 'Inline drawer', body: 'Click outside is still allowed — the rest of the page remains interactive.' },
  parameters: { docs: { description: { story: '`[dxMask]="false"` removes the dimmed backdrop. Useful when the drawer should overlay without blocking surrounding interactions.' } } },
  render: (args) => ({ props: args }),
};

export const NotClosable: Story = {
  name: 'Not closable (no ×, no Esc, no backdrop click)',
  args: { closable: false, keyboard: false, maskClosable: false, title: 'Wizard step 2', body: 'Forced flow — user must complete the action via the footer.' },
  parameters: { docs: { description: { story: '`[dxClosable]="false"` + `[dxKeyboard]="false"` + `[dxMaskClosable]="false"` together force the user through an action inside the drawer.' } } },
  render: (args) => ({ props: args }),
};

export const NoAnimation: Story = {
  name: 'No animation',
  args: { noAnimation: true, title: 'Quick open' },
  parameters: { docs: { description: { story: '`[dxNoAnimation]="true"` — the drawer appears / disappears without the slide transition. Use sparingly; helps with reduced-motion preferences.' } } },
  render: (args) => ({ props: args }),
};

export const Offset: Story = {
  name: 'Offset from edge',
  args: { offsetX: 32, title: 'Nudged drawer', body: '`dxOffsetX` shifts the drawer 32px away from the right edge.' },
  parameters: { docs: { description: { story: '`[dxOffsetX]` / `[dxOffsetY]` push the drawer away from its anchor edge — useful when a persistent header / sidenav already occupies that space.' } } },
  render: (args) => ({ props: args }),
};
