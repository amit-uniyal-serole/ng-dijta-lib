import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxTreeV2Component } from './dx-tree-v2.component';
import { DxTreeV2Module } from './dx-tree-v2.module';

const meta: Meta<DxTreeV2Component> = {
  title: 'Data Display/Tree V2',
  component: DxTreeV2Component,
  decorators: [
    moduleMetadata({
      imports: [DxTreeV2Module],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Hierarchical tree built on `angular-tree-component` (`<tree-root>`). Pass a node ' +
          'forest via `[nodes]` and behavior via `[options]: ITreeOptions` (`getChildren`, ' +
          '`displayField`, `idField`, `isExpandedField`, `allowDrag`, `allowDrop`, `actionMapping`, ' +
          '`useCheckbox`, `useTriState`, …). Enable `[showLine]` to draw connection lines between ' +
          'nodes. The full event surface (`onToggleExpanded` / `onActivate` / `onSelect` / ' +
          '`onMoveNode` / `onLoadNodeChildren` / `onStateChange` / etc.) is forwarded through ' +
          'the parent component. The 9 internal sub-components (`tree-node`, `tree-node-children`, ' +
          '`tree-node-wrapper`, `tree-viewport`, `tree-node-collection`, `tree-node-checkbox`, ' +
          '`tree-node-expander`, `loading`, `tree`) are not surfaced — only `dx-tree-v2` is public.',
      },
    },
  },
  argTypes: {
    nodes: { control: 'object', description: 'Forest of `{ id?, name, children?, isExpanded?, … }` nodes.' },
    options: { control: 'object', description: '`ITreeOptions` — `getChildren`, `displayField`, `idField`, `isExpandedField`, `allowDrag`, `allowDrop`, `useCheckbox`, `useTriState`, `actionMapping`, …' },
    showLine: { control: 'boolean', description: 'Draw connector lines between nodes.' },
    onToggleExpanded: { action: 'onToggleExpanded' },
    onActivate: { action: 'onActivate' },
    onDeactivate: { action: 'onDeactivate' },
    onSelect: { action: 'onSelect' },
    onDeselect: { action: 'onDeselect' },
    onMoveNode: { action: 'onMoveNode' },
    onLoadNodeChildren: { action: 'onLoadNodeChildren' },
    onChangeFilter: { action: 'onChangeFilter' },
    onStateChange: { action: 'onStateChange' },
    onInitialized: { action: 'onInitialized' },
  },
};

export default meta;
type Story = StoryObj<DxTreeV2Component>;

const FILE_TREE = [
  { id: 'src', name: 'src', isExpanded: true, children: [
    { id: 'app', name: 'app', isExpanded: true, children: [
      { id: 'app.component.ts',   name: 'app.component.ts' },
      { id: 'app.module.ts',      name: 'app.module.ts' },
      { id: 'features', name: 'features', children: [
        { id: 'users',    name: 'users' },
        { id: 'orders',   name: 'orders' },
        { id: 'reports',  name: 'reports' },
      ]},
    ]},
    { id: 'assets',     name: 'assets', children: [{ id: 'logo.svg', name: 'logo.svg' }] },
    { id: 'styles.scss',name: 'styles.scss' },
  ]},
  { id: 'public', name: 'public', children: [
    { id: 'index.html', name: 'index.html' },
    { id: 'favicon.ico',name: 'favicon.ico' },
  ]},
  { id: 'package.json', name: 'package.json' },
];

const ORG_TREE = [
  { id: 1, name: 'Engineering', isExpanded: true, children: [
    { id: 11, name: 'Platform',   children: [{ id: 111, name: 'Ada Lovelace' }, { id: 112, name: 'Grace Hopper' }] },
    { id: 12, name: 'Product',    children: [{ id: 121, name: 'Margaret Hamilton' }, { id: 122, name: 'Linus Torvalds' }] },
  ]},
  { id: 2, name: 'Design',        children: [{ id: 21, name: 'Brendan Eich' }] },
  { id: 3, name: 'Operations',    children: [{ id: 31, name: 'On-call rotation' }] },
];

const FLAT_TREE = [
  { id: 1, name: 'Inbox' },
  { id: 2, name: 'Sent' },
  { id: 3, name: 'Drafts' },
  { id: 4, name: 'Spam' },
  { id: 5, name: 'Trash' },
];

const FULL_TEMPLATE = `
  <div style="width:100%; padding:16px; border:1px solid #e0e0e0; border-radius:8px; box-sizing:border-box; max-width:520px;">
    <dx-tree-v2
      [nodes]="nodes"
      [options]="options"
      [showLine]="showLine"
      (onToggleExpanded)="onToggleExpanded($event)"
      (onActivate)="onActivate($event)"
      (onSelect)="onSelect($event)"
      (onMoveNode)="onMoveNode($event)"
      (onStateChange)="onStateChange($event)">
    </dx-tree-v2>
  </div>
`;

export const Default: Story = {
  name: 'Folder tree',
  args: { nodes: FILE_TREE, options: {}, showLine: false } as any,
  parameters: { docs: { description: { story: 'File-system style tree with pre-expanded top folders.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const WithLines: Story = {
  name: 'Connector lines',
  args: { nodes: FILE_TREE, options: {}, showLine: true } as any,
  parameters: { docs: { description: { story: '`[showLine]="true"` adds vertical / horizontal connectors between parents and children.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const OrgChart: Story = {
  name: 'Org chart (numeric ids)',
  args: { nodes: ORG_TREE, options: {}, showLine: true } as any,
  parameters: { docs: { description: { story: 'Different domain — org-chart with numeric ids.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const FlatList: Story = {
  name: 'Flat list (no children)',
  args: { nodes: FLAT_TREE, options: {}, showLine: false } as any,
  parameters: { docs: { description: { story: 'Single-level nodes — useful when the tree is used as a sidebar list.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const WithCheckboxes: Story = {
  name: 'With checkboxes (tri-state)',
  args: { nodes: FILE_TREE, options: { useCheckbox: true, useTriState: true } as any, showLine: false } as any,
  parameters: { docs: { description: { story: '`options.useCheckbox=true` + `useTriState=true` — partial selection marks the parent as indeterminate.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const DragAndDrop: Story = {
  name: 'Drag-and-drop reorder',
  args: { nodes: FILE_TREE, options: { allowDrag: true, allowDrop: true } as any, showLine: false } as any,
  parameters: { docs: { description: { story: '`options.allowDrag` + `options.allowDrop` enable node reordering. Drops emit `(onMoveNode)`.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const CustomFields: Story = {
  name: 'Custom display + id fields',
  args: {
    nodes: [
      { recordId: 'a1', label: 'Alpha',   childrenList: [{ recordId: 'a2', label: 'Alpha child' }] },
      { recordId: 'b1', label: 'Bravo',   childrenList: [{ recordId: 'b2', label: 'Bravo child' }] },
      { recordId: 'c1', label: 'Charlie', childrenList: [] },
    ] as any,
    options: { displayField: 'label', idField: 'recordId', childrenField: 'childrenList' } as any,
    showLine: false,
  } as any,
  parameters: { docs: { description: { story: 'Override `displayField` / `idField` / `childrenField` to consume any node shape — no need to remap the upstream data.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Empty: Story = {
  name: 'Empty tree',
  args: { nodes: [], options: {}, showLine: false } as any,
  parameters: { docs: { description: { story: 'Bound to an empty forest — the tree renders nothing.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};
