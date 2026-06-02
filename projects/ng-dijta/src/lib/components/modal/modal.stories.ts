import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module';

// `d-modal-container` injects the `ModalComponent` host (`public modalInstance`).
// To render it in isolation we provide a `ModalComponent` at this host's level so
// DI resolves — mirroring how the shell hosts the container in production.
@Component({
  standalone: true,
  imports: [ModalModule],
  selector: 'd-modal-anatomy-container',
  template: `
    <div style="width:480px; border:1px solid #ececec; border-radius:6px; overflow:hidden;">
      <d-modal-container
        [title]="title"
        [content]="content"
        [maxHeight]="'240px'"
        [buttons]="buttons"
        [showCloseBtn]="true"
        [onClose]="noop"
        [onMaximize]="noop">
      </d-modal-container>
    </div>
  `,
  providers: [ModalComponent],
})
export class DModalAnatomyContainer {
  @Input() title = 'Modal title';
  @Input() content =
    'The container stacks the header, a scrollable body, and the footer into the complete modal panel.';
  @Input() buttons = [
    { text: 'Cancel', cssClass: 'common', disabled: false, handler: () => {} },
    { text: 'Confirm', cssClass: 'primary', disabled: false, handler: () => {} },
  ];
  noop = () => {};
}

// ──────────────────────────────────────────────────────────────────────────
// `<d-modal>` is the modal shell. In production it is created imperatively by
// `ModalService.open({ component, ... })`, which injects content into the
// modal's container host and calls `show()`. For Storybook we render it
// directly with a `[contentTemplate]` (the same projection slot the shell
// supports) and call `show()` after view init, so each story shows a complete,
// styled modal without the service machinery.
//
// `showAnimation` is left on, so the backdrop fades in; the demo content lives
// in a `<ng-template>` whose context exposes the live `modalInstance`, letting
// the Cancel / × controls call `modal.hide()`.
// ──────────────────────────────────────────────────────────────────────────

@Component({
  standalone: true,
  imports: [CommonModule, ModalModule],
  selector: 'd-modal-demo',
  template: `
    <ng-template #content let-modal="modalInstance">
      <div id="d-modal-header"
           style="display:flex; align-items:center; justify-content:space-between; padding:16px 20px; border-bottom:1px solid #ececec; cursor:inherit;">
        <strong style="font-size:16px;">{{ heading }}</strong>
        <span style="display:inline-flex; align-items:center; gap:4px;">
          <button *ngIf="showMaximize" type="button" aria-label="Maximize" (click)="modal.maximize()"
                  style="border:none; background:none; cursor:pointer; font-size:16px; line-height:1; color:#575d6c;">{{ modal?.maximized ? '🗗' : '🗖' }}</button>
          <button type="button" aria-label="Close" (click)="modal.hide()"
                  style="border:none; background:none; cursor:pointer; font-size:20px; line-height:1; color:#575d6c;">×</button>
        </span>
      </div>
      <div class="modal-body">{{ body }}</div>
      <div class="modal-footer" style="display:flex; justify-content:flex-end; gap:8px;">
        <button class="d-btn" type="button" (click)="modal.hide()"
                style="border:1px solid #d0d0d0; background:#fff; padding:6px 16px; border-radius:4px;">Cancel</button>
        <button class="d-btn" type="button" (click)="modal.hide()"
                style="border:none; background:#c8102e; color:#fff; padding:6px 16px; border-radius:4px;">Confirm</button>
      </div>
    </ng-template>

    <d-modal
      [showAnimation]="true"
      [width]="width"
      [placement]="placement"
      [backdropCloseable]="backdropCloseable"
      [escapable]="escapable"
      [draggable]="draggable"
      [offsetY]="offsetY">
    </d-modal>
  `,
})
export class DModalDemo implements AfterViewInit {
  @Input() heading = 'Modal title';
  @Input() body =
    'This is the modal body. Replace it with any component or template — forms, detail views, wizards, confirmations.';
  @Input() width = '480px';
  @Input() placement: 'center' | 'top' | 'bottom' = 'center';
  @Input() backdropCloseable = true;
  @Input() escapable = true;
  @Input() draggable = false;
  @Input() offsetY = '';
  @Input() showMaximize = false;

  // `contentTemplate` is a plain property on ModalComponent (not an @Input) —
  // ModalService assigns it via `assign()`, so we mirror that here rather than
  // binding it in the template.
  @ViewChild('content', { static: true }) contentTpl!: TemplateRef<unknown>;
  @ViewChild(ModalComponent, { static: true }) modal!: ModalComponent;

  ngAfterViewInit(): void {
    // Defer so the assignment + animateState land outside the just-completed
    // CD pass (mirrors how ModalService configures then calls show()).
    setTimeout(() => {
      if (!this.modal) return;
      this.modal.contentTemplate = this.contentTpl;
      this.modal.show();
    });
  }
}

const meta: Meta<DModalDemo> = {
  title: 'Overlays/Modal',
  component: DModalDemo,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ModalModule, DModalDemo, DModalAnatomyContainer],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Configurable modal shell (`<d-modal>`). In an app it is opened imperatively via ' +
          '`ModalService.open({ component, width, placement, backdropCloseable, escapable, ... })`, ' +
          'which injects a component into the shell and calls `show()`. `DialogService` builds a ' +
          'button-based confirmation dialog on the same primitive. Supports `center` / `top` / ' +
          '`bottom` placement, an explicit `width`, backdrop-click and ESC closing, a draggable ' +
          'header, and `beforeHidden` close guards. The stories render the shell directly with a ' +
          'projected `contentTemplate`; the × and Cancel buttons call `modalInstance.hide()`.',
      },
    },
  },
  argTypes: {
    width: { control: 'text', description: 'Modal width (any CSS width, e.g. `"480px"`).' },
    placement: { control: { type: 'inline-radio' }, options: ['center', 'top', 'bottom'], description: 'Vertical placement.' },
    backdropCloseable: { control: 'boolean', description: 'Clicking the backdrop closes the modal.' },
    escapable: { control: 'boolean', description: 'Pressing ESC closes the modal.' },
    draggable: { control: 'boolean', description: 'Allow dragging the modal by its header.' },
    offsetY: { control: 'text', description: 'Vertical offset from the chosen placement (e.g. `"40px"`).' },
    showMaximize: { control: 'boolean', description: 'Show a maximize / restore toggle in the header (calls `modalInstance.maximize()`).' },
    heading: { control: 'text', description: 'Demo header text.' },
    body: { control: 'text', description: 'Demo body text.' },
  },
  args: {
    heading: 'Modal title',
    width: '480px',
    placement: 'center',
    backdropCloseable: true,
    escapable: true,
    draggable: false,
    offsetY: '',
  },
  render: (args) => ({ props: args }),
};

export default meta;
type Story = StoryObj<DModalDemo>;

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Center (default)',
  parameters: { docs: { description: { story: 'Standard centered modal at 480px with a backdrop, ESC and backdrop-click closing.' } } },
};

export const TopPlacement: Story = {
  name: 'Top placement',
  args: { placement: 'top', heading: 'Top-anchored modal' },
  parameters: { docs: { description: { story: '`placement="top"` anchors the dialog to the top of the viewport.' } } },
};

export const BottomPlacement: Story = {
  name: 'Bottom placement',
  args: { placement: 'bottom', heading: 'Bottom-anchored modal' },
  parameters: { docs: { description: { story: '`placement="bottom"` anchors the dialog to the bottom (sheet-style).' } } },
};

export const WideModal: Story = {
  name: 'Wide modal',
  args: {
    width: '720px',
    heading: 'Wide modal',
    body: 'A wider modal — useful when the body hosts a multi-column form or a detail table.',
  },
  parameters: { docs: { description: { story: '`width="720px"` — the width input accepts any CSS width.' } } },
};

export const NotBackdropCloseable: Story = {
  name: 'Backdrop / ESC disabled',
  args: {
    backdropCloseable: false,
    escapable: false,
    heading: 'Forced action',
    body: 'Backdrop click and ESC are disabled — the user must use a button to dismiss.',
  },
  parameters: { docs: { description: { story: '`[backdropCloseable]="false"` + `[escapable]="false"` force the user through an explicit action.' } } },
};

export const Draggable: Story = {
  name: 'Draggable',
  args: { draggable: true, heading: 'Drag me by the header' },
  parameters: { docs: { description: { story: '`[draggable]="true"` lets the user reposition the modal by dragging its header.' } } },
};

export const Maximize: Story = {
  name: 'Maximize / restore',
  args: {
    showMaximize: true,
    heading: 'Maximizable modal',
    body: 'Use the maximize toggle in the header to expand the modal to full width (and restore it back).',
  },
  parameters: { docs: { description: { story: 'The header maximize toggle calls `modalInstance.maximize()`, which expands the modal to `100vw` (matching ng-devui\'s maximize demo) and restores the original width on the next click.' } } },
};

// ──────────────────────────────────────────────────────────────────────────
// Anatomy — the modal's three sub-components (header / container / footer)
// rendered in isolation, so each piece can be inspected without the shell.
// These replace the former `Overlays/Modal/*` sub-folder entries.
// ──────────────────────────────────────────────────────────────────────────

export const HeaderAnatomy: Story = {
  name: 'Anatomy: header',
  parameters: { docs: { description: { story: 'The `d-modal-header` sub-component — the translated title plus optional close / maximize controls.' } } },
  render: () => ({
    props: { title: 'Modal title' },
    template: `
      <div style="width:480px; border:1px solid #ececec; border-radius:6px; overflow:hidden;">
        <d-modal-header [title]="title" [showCloseBtn]="true" [showMaximizeBtn]="true"></d-modal-header>
      </div>`,
  }),
};

export const ContentAnatomy: Story = {
  name: 'Anatomy: content (container)',
  parameters: { docs: { description: { story: 'The `d-modal-container` sub-component — stacks the header, a scrollable body, and the footer into the complete panel.' } } },
  render: () => ({ template: `<d-modal-anatomy-container></d-modal-anatomy-container>` }),
};

export const FooterAnatomy: Story = {
  name: 'Anatomy: footer',
  parameters: { docs: { description: { story: 'The `d-modal-footer` sub-component — renders an action button row from a `buttons` array.' } } },
  render: () => ({
    props: {
      buttons: [
        { text: 'Cancel', cssClass: 'common', disabled: false, handler: () => {} },
        { text: 'Confirm', cssClass: 'primary', disabled: false, handler: () => {} },
      ],
    },
    template: `
      <div style="width:480px; border:1px solid #ececec; border-radius:6px; overflow:hidden;">
        <d-modal-footer [buttons]="buttons"></d-modal-footer>
      </div>`,
  }),
};
