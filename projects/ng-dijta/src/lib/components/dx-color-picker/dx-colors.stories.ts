import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DxColorsComponent } from './dx-colors.component';
import { DxColorsModule } from './dx-colors.module';

const meta: Meta<any> = {
  title: 'Form Inputs/Color Picker',
  component: DxColorsComponent,
  decorators: [
    moduleMetadata({
      imports: [DxColorsModule, ReactiveFormsModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Color picker that anchors a floating panel to any trigger element via the ' +
          '`[dx-colors-trigger]` directive. The panel shows a default Material palette ' +
          '(with variants per swatch), a manual HSV picker, alpha + hue sliders, and a ' +
          'format-switchable text input (HEX / RGB / HSL). The trigger directive ' +
          'implements `ControlValueAccessor` so it plugs into reactive and template-driven ' +
          'forms via `[(color)]` two-way binding or `[formControl]`. The inner ' +
          '`<dx-colors-panel>` and `<dx-color-picker>` (HSV slider) components are ' +
          'internal variants — consumers compose with the trigger + `<dx-colors>` projection.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<any>;

const TRIGGER_BUTTON_STYLE = `
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #fff;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
`;

const SWATCH_STYLE = `
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Minimal trigger + panel. Click the button to open the picker. The ' +
          '`[(color)]` two-way binding keeps the swatch in sync with whatever the user ' +
          'selects in the panel.',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#1976d2' },
    template: `
      <button dx-colors-trigger [(color)]="selectedColor" style="${TRIGGER_BUTTON_STYLE}">
        <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
        <span>{{ selectedColor }}</span>
        <dx-colors></dx-colors>
      </button>
    `,
  }),
};

export const ReactiveForm: Story = {
  name: 'Reactive form integration',
  parameters: {
    docs: {
      description: {
        story:
          'The trigger directive implements `ControlValueAccessor`, so `[formControl]` ' +
          'binds the picker straight to a reactive form. Live readout of `value` / `dirty` ' +
          '/ `touched` shows the full wiring.',
      },
    },
  },
  render: () => {
    const control = new FormControl('#10b981');
    return {
      props: { control },
      template: `
        <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
          <div dx-colors-trigger [formControl]="control" style="${TRIGGER_BUTTON_STYLE}; width: fit-content;">
            <span [style.background]="control.value" style="${SWATCH_STYLE}"></span>
            <span>{{ control.value }}</span>
            <dx-colors></dx-colors>
          </div>
          <pre style="margin: 0; padding: 8px; background: #f5f5f5; border-radius: 4px; font-size: 12px;">
value:   {{ control.value }}
dirty:   {{ control.dirty }}
touched: {{ control.touched }}</pre>
        </div>
      `,
    };
  },
};

export const PopupAnimation: Story = {
  name: 'Popup animation',
  parameters: {
    docs: {
      description: {
        story:
          'Set `colorsAnimation="popup"` for the swatch entrance to scale-in rather than ' +
          'slide-in (default).',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#f59e0b' },
    template: `
      <button
        dx-colors-trigger
        [(color)]="selectedColor"
        colorsAnimation="popup"
        style="${TRIGGER_BUTTON_STYLE}">
        <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
        <span>{{ selectedColor }}</span>
        <dx-colors></dx-colors>
      </button>
    `,
  }),
};

export const CustomPalette: Story = {
  name: 'Custom palette',
  parameters: {
    docs: {
      description: {
        story:
          'Pass a custom flat palette via `[palette]`. Accepts either a `string[]` of ' +
          'hex/rgb/hsl values or the richer `DxColorsColor[]` shape (with `preview` + ' +
          '`variants`) used by the default Material palette.',
      },
    },
  },
  render: () => ({
    props: {
      selectedColor: '#ef4444',
      brandPalette: [
        '#ef4444', '#f59e0b', '#10b981', '#3b82f6',
        '#6366f1', '#8b5cf6', '#ec4899', '#14b8a6',
      ],
    },
    template: `
      <button
        dx-colors-trigger
        [(color)]="selectedColor"
        [palette]="brandPalette"
        style="${TRIGGER_BUTTON_STYLE}">
        <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
        <span>{{ selectedColor }}</span>
        <dx-colors></dx-colors>
      </button>
    `,
  }),
};

export const HexFormat: Story = {
  name: 'Locked to HEX format',
  parameters: {
    docs: {
      description: {
        story:
          'Set `format="hex"` to lock the text-input format. Other accepted values are ' +
          '`"rgba"` and `"hsla"`. When omitted, users can cycle formats via the format ' +
          'toggle in the panel.',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#3b82f6' },
    template: `
      <button
        dx-colors-trigger
        [(color)]="selectedColor"
        format="hex"
        style="${TRIGGER_BUTTON_STYLE}">
        <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
        <span>{{ selectedColor }}</span>
        <dx-colors></dx-colors>
      </button>
    `,
  }),
};

export const HideTextInput: Story = {
  name: 'Palette only (hide text input)',
  parameters: {
    docs: {
      description: {
        story: 'Hide the manual hex / rgb / hsl text input with `[hideTextInput]="true"`. Useful when users should only pick from the curated palette.',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#7c3aed' },
    template: `
      <button
        dx-colors-trigger
        [(color)]="selectedColor"
        [hideTextInput]="true"
        style="${TRIGGER_BUTTON_STYLE}">
        <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
        <span>{{ selectedColor }}</span>
        <dx-colors></dx-colors>
      </button>
    `,
  }),
};

export const HideHsvPicker: Story = {
  name: 'Palette only (hide HSV picker)',
  parameters: {
    docs: {
      description: {
        story: 'Hide the inner HSV slider picker with `[hideColorPicker]="true"`. Combine with `[hideTextInput]="true"` to lock the user to the swatch palette.',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#0ea5e9' },
    template: `
      <button
        dx-colors-trigger
        [(color)]="selectedColor"
        [hideColorPicker]="true"
        style="${TRIGGER_BUTTON_STYLE}">
        <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
        <span>{{ selectedColor }}</span>
        <dx-colors></dx-colors>
      </button>
    `,
  }),
};

export const NoAlpha: Story = {
  name: 'Without alpha slider',
  parameters: {
    docs: {
      description: {
        story:
          'Strip the alpha-channel slider from the HSV picker with ' +
          '`colorPickerControls="no-alpha"`. Use `"only-alpha"` for the inverse — just ' +
          'the alpha slider when adjusting transparency of a fixed hue.',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#dc2626' },
    template: `
      <button
        dx-colors-trigger
        [(color)]="selectedColor"
        colorPickerControls="no-alpha"
        style="${TRIGGER_BUTTON_STYLE}">
        <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
        <span>{{ selectedColor }}</span>
        <dx-colors></dx-colors>
      </button>
    `,
  }),
};

export const PositionTop: Story = {
  name: 'Position above trigger',
  parameters: {
    docs: {
      description: {
        story:
          'Force the panel to open above the trigger with `position="top"`. Default is ' +
          '`"bottom"`, with automatic flip when there\'s no room below.',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#22c55e' },
    template: `
      <div style="padding-top: 320px;">
        <button
          dx-colors-trigger
          [(color)]="selectedColor"
          position="top"
          style="${TRIGGER_BUTTON_STYLE}">
          <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
          <span>{{ selectedColor }}</span>
          <dx-colors></dx-colors>
        </button>
      </div>
    `,
  }),
};

export const CustomLabels: Story = {
  name: 'Custom Accept / Cancel labels',
  parameters: {
    docs: {
      description: {
        story:
          'Override the panel\'s action-button labels with `acceptLabel` and ' +
          '`cancelLabel`. Useful for localisation or matching domain language.',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#9333ea' },
    template: `
      <button
        dx-colors-trigger
        [(color)]="selectedColor"
        acceptLabel="Apply"
        cancelLabel="Discard"
        style="${TRIGGER_BUTTON_STYLE}">
        <span [style.background]="selectedColor" style="${SWATCH_STYLE}"></span>
        <span>{{ selectedColor }}</span>
        <dx-colors></dx-colors>
      </button>
    `,
  }),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Disable the trigger via the bound `FormControl` (`disabled: true`). The button ' +
          'is rendered at 50% opacity and clicks do not open the panel.',
      },
    },
  },
  render: () => {
    const control = new FormControl({ value: '#6b7280', disabled: true });
    return {
      props: { control },
      template: `
        <button
          dx-colors-trigger
          [formControl]="control"
          style="${TRIGGER_BUTTON_STYLE}">
          <span [style.background]="control.value" style="${SWATCH_STYLE}"></span>
          <span>{{ control.value }} (disabled)</span>
          <dx-colors></dx-colors>
        </button>
      `,
    };
  },
};

export const SwatchOnlyTrigger: Story = {
  name: 'Swatch-only trigger',
  parameters: {
    docs: {
      description: {
        story:
          'The trigger element is free-form — any host element with `[dx-colors-trigger]` ' +
          'works. Here it\'s just a colored circle.',
      },
    },
  },
  render: () => ({
    props: { selectedColor: '#0891b2' },
    template: `
      <div
        dx-colors-trigger
        [(color)]="selectedColor"
        [style.background]="selectedColor"
        style="display: inline-block; width: 36px; height: 36px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.15); cursor: pointer;">
        <dx-colors></dx-colors>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of every directive input.',
      },
    },
  },
  render: () => ({
    props: {
      defaultColor: '#1976d2',
      popupColor: '#f59e0b',
      paletteColor: '#ef4444',
      hexColor: '#3b82f6',
      noTextColor: '#7c3aed',
      noPickerColor: '#0ea5e9',
      noAlphaColor: '#dc2626',
      brandPalette: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6366f1', '#8b5cf6'],
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(200px, 1fr)); gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">Default</h4>
          <button dx-colors-trigger [(color)]="defaultColor" style="${TRIGGER_BUTTON_STYLE}">
            <span [style.background]="defaultColor" style="${SWATCH_STYLE}"></span>
            <span>{{ defaultColor }}</span>
            <dx-colors></dx-colors>
          </button>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Popup animation</h4>
          <button dx-colors-trigger [(color)]="popupColor" colorsAnimation="popup" style="${TRIGGER_BUTTON_STYLE}">
            <span [style.background]="popupColor" style="${SWATCH_STYLE}"></span>
            <span>{{ popupColor }}</span>
            <dx-colors></dx-colors>
          </button>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">Custom palette</h4>
          <button dx-colors-trigger [(color)]="paletteColor" [palette]="brandPalette" style="${TRIGGER_BUTTON_STYLE}">
            <span [style.background]="paletteColor" style="${SWATCH_STYLE}"></span>
            <span>{{ paletteColor }}</span>
            <dx-colors></dx-colors>
          </button>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">HEX-only</h4>
          <button dx-colors-trigger [(color)]="hexColor" format="hex" style="${TRIGGER_BUTTON_STYLE}">
            <span [style.background]="hexColor" style="${SWATCH_STYLE}"></span>
            <span>{{ hexColor }}</span>
            <dx-colors></dx-colors>
          </button>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">No text input</h4>
          <button dx-colors-trigger [(color)]="noTextColor" [hideTextInput]="true" style="${TRIGGER_BUTTON_STYLE}">
            <span [style.background]="noTextColor" style="${SWATCH_STYLE}"></span>
            <span>{{ noTextColor }}</span>
            <dx-colors></dx-colors>
          </button>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">No HSV picker</h4>
          <button dx-colors-trigger [(color)]="noPickerColor" [hideColorPicker]="true" style="${TRIGGER_BUTTON_STYLE}">
            <span [style.background]="noPickerColor" style="${SWATCH_STYLE}"></span>
            <span>{{ noPickerColor }}</span>
            <dx-colors></dx-colors>
          </button>
        </div>
      </div>
    `,
  }),
};
