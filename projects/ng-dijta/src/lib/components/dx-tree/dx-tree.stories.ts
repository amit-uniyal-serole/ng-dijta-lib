import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxTreeComponent } from './dx-tree.component';
import { DxTreeModule } from './dx-tree.module';
import type { TREE_MODEL } from './tree.model';

const meta: Meta<DxTreeComponent<any>> = {
  title: 'Data Display/Tree',
  component: DxTreeComponent,
  decorators: [
    moduleMetadata({
      imports: [DxTreeModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Material-CDK flat tree (`dx-tree`) — renders a hierarchical list from `TREE_MODEL<T>[]` ' +
          '(`{ keyTt, labelTt, matIcon?, imgSrc?, isActive?, isCompleted?, children?, … }`). ' +
          'Supports drag-and-drop reorder (`[draggable]`), default expand-all (`[isExpanded]`), ' +
          'border chrome (`[isBorder]`), an expand/collapse-all button (`[isAllCollapseBtn]`), ' +
          'per-node icon hiding (`[hideIcons]`), and indent control (`[treeNodePadding]`). ' +
          'Node clicks emit `(nodeClick)`; reorders emit `(onTreeChange)`.',
      },
    },
  },
  argTypes: {
    treeDataSource: { control: 'object', description: '`TREE_MODEL<T>[]` — `{ keyTt, labelTt, matIcon?, imgSrc?, isActive?, children?, … }`.' },
    draggable: { control: 'boolean', description: 'Enable drag-and-drop reorder.' },
    isExpanded: { control: 'boolean', description: 'Expand all nodes on mount.' },
    hideIcons: { control: 'boolean', description: 'Hide the per-node icons.' },
    treeNodePadding: { control: 'number', description: 'Indent (in `px`) per nesting level.' },
    isBorder: { control: 'boolean', description: 'Draw a border around the tree.' },
    isAllCollapseBtn: { control: 'boolean', description: 'Show the master expand / collapse button.' },
    selected: { control: 'text', description: 'Selected node key (highlights the matching node).' },
    nodeClick: { action: 'nodeClick' },
    onTreeChange: { action: 'onTreeChange' },
  },
};

export default meta;
type Story = StoryObj<DxTreeComponent<any>>;

// ──────────────────────────────────────────────────────────────────────────
// Seed datasets
// ──────────────────────────────────────────────────────────────────────────

const FILE_TREE: TREE_MODEL<any>[] = [
  { keyTt: 'src', labelTt: 'src', matIcon: 'folder', isParentNode: true, children: [
    { keyTt: 'app', labelTt: 'app', matIcon: 'folder', children: [
      { keyTt: 'app.component.ts', labelTt: 'app.component.ts', matIcon: 'description' },
      { keyTt: 'app.module.ts',    labelTt: 'app.module.ts',    matIcon: 'description' },
      { keyTt: 'features',         labelTt: 'features',         matIcon: 'folder', children: [
        { keyTt: 'users',   labelTt: 'users',   matIcon: 'folder' },
        { keyTt: 'orders',  labelTt: 'orders',  matIcon: 'folder' },
        { keyTt: 'reports', labelTt: 'reports', matIcon: 'folder' },
      ]},
    ]},
    { keyTt: 'assets',      labelTt: 'assets', matIcon: 'folder', children: [
      { keyTt: 'logo.svg',  labelTt: 'logo.svg', matIcon: 'image' },
    ]},
    { keyTt: 'styles.scss', labelTt: 'styles.scss', matIcon: 'palette' },
  ]},
  { keyTt: 'public', labelTt: 'public', matIcon: 'folder', children: [
    { keyTt: 'index.html', labelTt: 'index.html', matIcon: 'language' },
    { keyTt: 'favicon.ico',labelTt: 'favicon.ico',matIcon: 'image' },
  ]},
  { keyTt: 'package.json', labelTt: 'package.json', matIcon: 'description' },
];

const ORG_TREE: TREE_MODEL<any>[] = [
  { keyTt: 'eng', labelTt: 'Engineering', matIcon: 'engineering', children: [
    { keyTt: 'platform', labelTt: 'Platform', matIcon: 'apps', children: [
      { keyTt: 'ada',   labelTt: 'Ada Lovelace', matIcon: 'person' },
      { keyTt: 'grace', labelTt: 'Grace Hopper', matIcon: 'person' },
    ]},
    { keyTt: 'product', labelTt: 'Product', matIcon: 'inventory', children: [
      { keyTt: 'margaret', labelTt: 'Margaret Hamilton', matIcon: 'person' },
      { keyTt: 'linus',    labelTt: 'Linus Torvalds',    matIcon: 'person' },
    ]},
  ]},
  { keyTt: 'design', labelTt: 'Design', matIcon: 'palette', children: [
    { keyTt: 'brendan', labelTt: 'Brendan Eich', matIcon: 'person' },
  ]},
];

const CHECKLIST_TREE: TREE_MODEL<any>[] = [
  { keyTt: 'launch', labelTt: 'Launch checklist', matIcon: 'rocket_launch', children: [
    { keyTt: 'pr-merged',  labelTt: 'PR merged',       matIcon: 'check_circle', isCompleted: true },
    { keyTt: 'ci-green',   labelTt: 'CI green',         matIcon: 'check_circle', isCompleted: true },
    { keyTt: 'release-note',labelTt: 'Release notes',   matIcon: 'pending' },
    { keyTt: 'announce',   labelTt: 'Announcement',     matIcon: 'pending' },
  ]},
];

const FLAT_TREE: TREE_MODEL<any>[] = [
  { keyTt: 'inbox',  labelTt: 'Inbox',  matIcon: 'inbox' },
  { keyTt: 'sent',   labelTt: 'Sent',   matIcon: 'send' },
  { keyTt: 'drafts', labelTt: 'Drafts', matIcon: 'drafts' },
  { keyTt: 'spam',   labelTt: 'Spam',   matIcon: 'report' },
  { keyTt: 'trash',  labelTt: 'Trash',  matIcon: 'delete' },
];

const FULL_TEMPLATE = `
  <div style="width:100%; padding:16px; border:1px solid #e0e0e0; border-radius:8px; box-sizing:border-box; max-width:480px;">
    <dx-tree
      [treeDataSource]="treeDataSource"
      [draggable]="draggable"
      [isExpanded]="isExpanded"
      [hideIcons]="hideIcons"
      [treeNodePadding]="treeNodePadding"
      [isBorder]="isBorder"
      [isAllCollapseBtn]="isAllCollapseBtn"
      [selected]="selected"
      (nodeClick)="nodeClick($event)"
      (onTreeChange)="onTreeChange($event)">
    </dx-tree>
  </div>
`;

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Folder tree',
  args: { treeDataSource: FILE_TREE, isExpanded: true, treeNodePadding: 7 } as any,
  parameters: { docs: { description: { story: 'File-system style tree, expanded by default. Per-node `matIcon` controls the leading icon.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Collapsed: Story = {
  name: 'Collapsed by default',
  args: { treeDataSource: FILE_TREE, isExpanded: false } as any,
  parameters: { docs: { description: { story: '`[isExpanded]="false"` collapses all top-level nodes on mount.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const WithBorder: Story = {
  name: 'Bordered + master collapse button',
  args: { treeDataSource: ORG_TREE, isBorder: true, isAllCollapseBtn: true, isExpanded: true } as any,
  parameters: { docs: { description: { story: '`[isBorder]="true"` wraps the tree in a panel; `[isAllCollapseBtn]="true"` shows the expand-/collapse-all toggle.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Draggable: Story = {
  name: 'Drag-and-drop reorder',
  args: { treeDataSource: FILE_TREE, draggable: true } as any,
  parameters: { docs: { description: { story: '`[draggable]="true"` enables CDK drag-drop. The drop area is detected via cursor position (above / center / below) and emits `(onTreeChange)` with the new forest.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const NoIcons: Story = {
  name: 'Hide icons',
  args: { treeDataSource: FILE_TREE, hideIcons: true } as any,
  parameters: { docs: { description: { story: '`[hideIcons]="true"` suppresses every per-node icon — useful for text-only outlines.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const TightPadding: Story = {
  name: 'Tight indent (2px / level)',
  args: { treeDataSource: FILE_TREE, treeNodePadding: 2 } as any,
  parameters: { docs: { description: { story: '`[treeNodePadding]` controls the per-level indent in px. Lower values make deep trees fit narrower viewports.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Selected: Story = {
  name: 'Pre-selected node',
  args: { treeDataSource: ORG_TREE, selected: 'grace', isExpanded: true } as any,
  parameters: { docs: { description: { story: '`[selected]` highlights the node whose `keyTt` matches.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const FlatList: Story = {
  name: 'Flat list (no children)',
  args: { treeDataSource: FLAT_TREE, hideIcons: false } as any,
  parameters: { docs: { description: { story: 'Single-level data — useful when `dx-tree` is used as a side-nav list rather than a tree.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Checklist: Story = {
  name: 'Checklist (isCompleted)',
  args: { treeDataSource: CHECKLIST_TREE, isExpanded: true } as any,
  parameters: { docs: { description: { story: 'Each node carries `isCompleted` — completed items render with a strikethrough.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Empty: Story = {
  name: 'Empty tree',
  args: { treeDataSource: [] } as any,
  parameters: { docs: { description: { story: 'Bound to `[]` — the tree renders nothing.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};
