import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxCanvasComponent } from './components/dx-canvas.component';
import { DxCanvasModule } from './dx-canvas.module';
import { DxCanvas } from './data';

const meta: Meta<any> = {
  title: 'Data Display/Canvas',
  component: DxCanvasComponent,
  decorators: [
    moduleMetadata({
      imports: [DxCanvasModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Card-canvas data view — renders `DxCanvasData<T>[]` as a configurable grid of three-section cards ' +
          '(left avatar / center title-body-footer / right actions). Three layout flavors are bundled: ' +
          '`canvas-1` (flat), `canvas-2` (column / stacked), and `canvas-3` (mixed). Supports multi-select, ' +
          'sticky cards, header / per-row actions, pagination, and a view-switcher that toggles between ' +
          'canvas / table layouts. The five internal sub-components (`dx-canvas-one`, `-two`, `-three`, ' +
          '`dx-canvas-field-wrapper`, `dx-canvas-label-value-wrapper`, `dx-canvas-layout-wrapper`) used ' +
          'to be separate sidebar entries — they\'re internal layout primitives and are now folded in here.',
      },
    },
  },
  argTypes: {
    canvasDataSource: { control: 'object', description: 'Card payload (`DxCanvasData<T>[]`).' },
    canvasSetting: { control: 'object', description: '`DxCanvasSetting` — `viewType`, `pagination`, `pageSize`, `totalItems`, `multiSelect`, `toggleStickySettings`, `leftSectionAvatar`, `rightSectionAvatar`, `multiActionButtonSettings`, etc.' },
    cardActions: { control: 'object', description: '`DxTableColumn<T>` for the per-card action menu.' },
    multiViewTable: { control: 'object', description: 'View-switcher config (canvas / table toggles).' },
    onCanvasCheckboxChange: { action: 'onCanvasCheckboxChange' },
    onCanvasPaginationClick: { action: 'onCanvasPaginationClick' },
    onClickCanvasHeaderAction: { action: 'onClickCanvasHeaderAction' },
    onClickCanvasAction: { action: 'onClickCanvasAction' },
    onClickCanvasViewSwitcher: { action: 'onClickCanvasViewSwitcher' },
    onClickCanvasPageSize: { action: 'onClickCanvasPageSize' },
  },
  args: {
    canvasDataSource: DxCanvas.CardListData,
    canvasSetting: DxCanvas.MockSetting,
    cardActions: DxCanvas.CardActions,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <div style="max-width: 1100px;">
    <dx-canvas
      [canvasDataSource]="canvasDataSource"
      [canvasSetting]="canvasSetting"
      [cardActions]="cardActions"
      [multiViewTable]="multiViewTable">
    </dx-canvas>
  </div>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Mixed-layout canvas (`canvas-3`) with the bundled three-card sample and the per-card action menu.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const FlatLayout: Story = {
  name: 'Flat layout (canvas-1)',
  args: { canvasSetting: { ...DxCanvas.MockSetting, viewType: 'canvas-1' } },
  parameters: {
    docs: {
      description: {
        story: '`viewType: \'canvas-1\'` — the flat single-row layout, useful when the right action panel is unused.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const ColumnLayout: Story = {
  name: 'Column layout (canvas-2)',
  args: { canvasSetting: { ...DxCanvas.MockSetting, viewType: 'canvas-2' } },
  parameters: {
    docs: {
      description: {
        story: '`viewType: \'canvas-2\'` — stacks the three sections vertically; ideal for narrow containers / mobile.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const MixedLayout: Story = {
  name: 'Mixed layout (canvas-3)',
  args: { canvasSetting: { ...DxCanvas.MockSetting, viewType: 'canvas-3' } },
  parameters: {
    docs: {
      description: {
        story: '`viewType: \'canvas-3\'` — the bundled mixed layout that combines a wide left + center with a compact right action area.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const StatusAvatars: Story = {
  name: 'With status avatars + badges',
  args: { canvasDataSource: DxCanvas.testData },
  parameters: {
    docs: {
      description: {
        story: 'Rich sample (`DxCanvas.testData`) showing avatar status dots, position overrides, title badges, and a sticky card.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const NoPagination: Story = {
  name: 'No pagination',
  args: { canvasSetting: { ...DxCanvas.MockSetting, pagination: false } },
  parameters: {
    docs: {
      description: {
        story: '`pagination: false` hides the bottom pager — useful when the list is short or pagination is handled upstream.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const NoMultiSelect: Story = {
  name: 'No multi-select',
  args: { canvasSetting: { ...DxCanvas.MockSetting, multiSelect: false } },
  parameters: {
    docs: {
      description: {
        story: '`multiSelect: false` removes the checkbox column for read-only lists.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const StickyToggle: Story = {
  name: 'Sticky toggle',
  args: {
    canvasDataSource: DxCanvas.testData,
    canvasSetting: { ...DxCanvas.MockSetting, toggleStickySettings: true },
  },
  parameters: {
    docs: {
      description: {
        story: '`toggleStickySettings: true` exposes the pin toggle on each card — picking a new "sticky" card unsticks the previous one.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Empty: Story = {
  name: 'Empty list',
  args: { canvasDataSource: [] },
  parameters: {
    docs: {
      description: {
        story: 'Edge case — bound list is empty.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const AllLayouts: Story = {
  name: 'All three layouts',
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of `canvas-1` / `canvas-2` / `canvas-3` using a two-card sample so the visual differences are clear.',
      },
    },
  },
  render: () => ({
    props: {
      data: DxCanvas.CardListData.slice(0, 2),
      flatSetting: { ...DxCanvas.MockSetting, viewType: 'canvas-1', pagination: false, multiSelect: false },
      columnSetting: { ...DxCanvas.MockSetting, viewType: 'canvas-2', pagination: false, multiSelect: false },
      mixedSetting: { ...DxCanvas.MockSetting, viewType: 'canvas-3', pagination: false, multiSelect: false },
      actions: DxCanvas.CardActions,
    },
    template: `
      <div style="display: grid; grid-template-columns: 1fr; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px;">canvas-1 (flat)</h4>
          <dx-canvas [canvasDataSource]="data" [canvasSetting]="flatSetting" [cardActions]="actions"></dx-canvas>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">canvas-2 (column)</h4>
          <dx-canvas [canvasDataSource]="data" [canvasSetting]="columnSetting" [cardActions]="actions"></dx-canvas>
        </div>
        <div>
          <h4 style="margin: 0 0 8px;">canvas-3 (mixed)</h4>
          <dx-canvas [canvasDataSource]="data" [canvasSetting]="mixedSetting" [cardActions]="actions"></dx-canvas>
        </div>
      </div>
    `,
  }),
};
