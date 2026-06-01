import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DropDownModule } from './dropdown.module';

// `dDropDown` is a directive primitive (not a previewable standalone
// component), so each story is template-driven: a trigger element + a menu
// element, both inside the host that wears the directive.
const meta: Meta<unknown> = {
  title: 'Navigation/Dropdown',
  decorators: [
    moduleMetadata({
      imports: [DropDownModule, MatButtonModule, MatIconModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'CDK-Overlay-based dropdown primitive exposed as a set of directives ' +
          '(`dDropDown`, `dDropDownToggle`, `dDropDownMenu`, `dDropDownMenuItem`). ' +
          'Wrap any trigger element and a menu element to compose Material-styled menus, ' +
          'context popovers, or hover flyouts. Use `appendToBody` to escape overflow clipping.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<unknown>;

export const Default: Story = {
  name: 'Click trigger',
  render: () => ({
    template: `
      <div dDropDown trigger="click" appendToBody style="display: inline-block;">
        <button dDropDownToggle mat-stroked-button>
          Actions
          <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
        </button>
        <ul dDropDownMenu>
          <li dDropDownMenuItem>Edit</li>
          <li dDropDownMenuItem>Duplicate</li>
          <li dDropDownMenuItem>Archive</li>
          <li dDropDownMenuItem>Delete</li>
        </ul>
      </div>
    `,
  }),
};

export const HoverTrigger: Story = {
  name: 'Hover trigger',
  render: () => ({
    template: `
      <div dDropDown trigger="hover" appendToBody style="display: inline-block;">
        <button dDropDownToggle mat-flat-button color="primary">
          Hover me
          <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
        </button>
        <ul dDropDownMenu>
          <li dDropDownMenuItem>Rename</li>
          <li dDropDownMenuItem>Move</li>
          <li dDropDownMenuItem>Share</li>
        </ul>
      </div>
    `,
  }),
};

export const IconButtonTrigger: Story = {
  name: 'Icon-button trigger',
  render: () => ({
    template: `
      <div dDropDown trigger="click" appendToBody style="display: inline-block;">
        <button dDropDownToggle mat-icon-button aria-label="More actions">
          <mat-icon>more_vert</mat-icon>
        </button>
        <ul dDropDownMenu>
          <li dDropDownMenuItem>
            <mat-icon aria-hidden="true">edit</mat-icon>
            <span>Edit</span>
          </li>
          <li dDropDownMenuItem>
            <mat-icon aria-hidden="true">content_copy</mat-icon>
            <span>Copy</span>
          </li>
          <li dDropDownMenuItem>
            <mat-icon aria-hidden="true">delete</mat-icon>
            <span>Delete</span>
          </li>
        </ul>
      </div>
    `,
  }),
};

export const WithDisabledItems: Story = {
  name: 'With disabled item',
  parameters: {
    docs: {
      description: {
        story: 'Use `[disabled]="true"` on `dDropDownMenuItem` — the click is swallowed, `aria-disabled` is set, and the row tab-stops out.',
      },
    },
  },
  render: () => ({
    template: `
      <div dDropDown trigger="click" appendToBody style="display: inline-block;">
        <button dDropDownToggle mat-stroked-button>
          Menu
          <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
        </button>
        <ul dDropDownMenu>
          <li dDropDownMenuItem>Available</li>
          <li dDropDownMenuItem [disabled]="true">Disabled action</li>
          <li dDropDownMenuItem>Another option</li>
        </ul>
      </div>
    `,
  }),
};

export const WithDivider: Story = {
  name: 'With divider',
  parameters: {
    docs: {
      description: {
        story: 'Use `<li dxDropdownDivider>` to group related items — the directive renders a `role="separator"` rule.',
      },
    },
  },
  render: () => ({
    template: `
      <div dDropDown trigger="click" appendToBody style="display: inline-block;">
        <button dDropDownToggle mat-stroked-button>
          File
          <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
        </button>
        <ul dDropDownMenu>
          <li dDropDownMenuItem>New</li>
          <li dDropDownMenuItem>Open</li>
          <li dDropDownMenuItem>Save</li>
          <li dxDropdownDivider></li>
          <li dDropDownMenuItem>Export</li>
          <li dDropDownMenuItem>Print</li>
          <li dxDropdownDivider></li>
          <li dDropDownMenuItem [disabled]="true">Sign out (offline)</li>
        </ul>
      </div>
    `,
  }),
};

export const Submenu: Story = {
  name: 'Nested submenu',
  parameters: {
    docs: {
      description: {
        story:
          'Compose nested menus by wrapping any menu row in another `[dDropDown]`. ' +
          'Each level gets its own `DropDownService` instance so open/close state and ' +
          'document-click bookkeeping are independent. Pass a custom `ConnectedPosition` ' +
          'array via `[appendToBodyDirections]` to flow submenus sideways (right of the ' +
          'trigger, with a leftward fallback when the viewport runs out of room).',
      },
    },
  },
  render: () => ({
    props: {
      // Side-flowing positions: overlay's left edge attaches to trigger's right edge,
      // both top-aligned. Fallback: overlay's right edge attaches to trigger's left
      // edge when the viewport runs out of room on the right.
      submenuPositions: [
        { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top' },
        { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top' },
      ],
    },
    template: `
      <div dDropDown trigger="click" appendToBody style="display: inline-block;">
        <button dDropDownToggle mat-stroked-button>
          Share
          <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
        </button>
        <ul dDropDownMenu>
          <li dDropDownMenuItem>Copy link</li>
          <li dDropDownMenuItem>Email link</li>

          <li dDropDown trigger="hover" appendToBody
              [appendToBodyDirections]="submenuPositions"
              class="dx-dropdown-item dx-dropdown-submenu">
            <span dDropDownToggle>
              <span style="flex: 1;">More options</span>
              <mat-icon style="font-size: 20px; width: 20px; height: 20px;">chevron_right</mat-icon>
            </span>
            <ul dDropDownMenu>
              <li dDropDownMenuItem>Slack</li>
              <li dDropDownMenuItem>Microsoft Teams</li>
              <li dDropDownMenuItem>Discord</li>

              <li dDropDown trigger="hover" appendToBody
                  [appendToBodyDirections]="submenuPositions"
                  class="dx-dropdown-item dx-dropdown-submenu">
                <span dDropDownToggle>
                  <span style="flex: 1;">Social</span>
                  <mat-icon style="font-size: 20px; width: 20px; height: 20px;">chevron_right</mat-icon>
                </span>
                <ul dDropDownMenu>
                  <li dDropDownMenuItem>X / Twitter</li>
                  <li dDropDownMenuItem>LinkedIn</li>
                  <li dDropDownMenuItem>Facebook</li>
                </ul>
              </li>
            </ul>
          </li>

          <li dxDropdownDivider></li>
          <li dDropDownMenuItem [disabled]="true">Export (Pro only)</li>
        </ul>
      </div>
    `,
  }),
};

export const StayOpenOnClick: Story = {
  name: 'Stay open on item click',
  parameters: {
    docs: {
      description: {
        story: 'By default the menu auto-closes on item click (matches `nzClickHide`). Set `[clickHide]="false"` to keep it open — useful for multi-select toggles or quick-action panels.',
      },
    },
  },
  render: () => ({
    template: `
      <div dDropDown trigger="click" appendToBody [clickHide]="false" style="display: inline-block;">
        <button dDropDownToggle mat-stroked-button>
          Filters
          <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
        </button>
        <ul dDropDownMenu>
          <li dDropDownMenuItem>Active</li>
          <li dDropDownMenuItem>Archived</li>
          <li dDropDownMenuItem>Draft</li>
        </ul>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  name: 'Disabled trigger',
  render: () => ({
    template: `
      <div dDropDown trigger="click" appendToBody [disabled]="true" style="display: inline-block;">
        <button dDropDownToggle mat-stroked-button disabled>
          Disabled
          <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
        </button>
        <ul dDropDownMenu>
          <li dDropDownMenuItem>You should not see this</li>
        </ul>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of the supported trigger styles.',
      },
    },
  },
  render: () => ({
    template: `
      <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
        <div dDropDown trigger="click" appendToBody>
          <button dDropDownToggle mat-stroked-button>
            Stroked
            <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
          </button>
          <ul dDropDownMenu>
            <li dDropDownMenuItem>Edit</li>
            <li dDropDownMenuItem>Delete</li>
          </ul>
        </div>

        <div dDropDown trigger="click" appendToBody>
          <button dDropDownToggle mat-flat-button color="primary">
            Flat
            <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
          </button>
          <ul dDropDownMenu>
            <li dDropDownMenuItem>Edit</li>
            <li dDropDownMenuItem>Delete</li>
          </ul>
        </div>

        <div dDropDown trigger="click" appendToBody>
          <button dDropDownToggle mat-icon-button aria-label="More">
            <mat-icon>more_vert</mat-icon>
          </button>
          <ul dDropDownMenu>
            <li dDropDownMenuItem>Edit</li>
            <li dDropDownMenuItem>Delete</li>
          </ul>
        </div>

        <div dDropDown trigger="hover" appendToBody>
          <button dDropDownToggle mat-button>
            Hover
            <mat-icon iconPositionEnd>arrow_drop_down</mat-icon>
          </button>
          <ul dDropDownMenu>
            <li dDropDownMenuItem>Edit</li>
            <li dDropDownMenuItem>Delete</li>
          </ul>
        </div>
      </div>
    `,
  }),
};
