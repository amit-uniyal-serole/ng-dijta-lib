import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxKanbanViewComponent } from './dx-kanban-view.component';
import { DxKanbanViewModule } from './dx-kanban-view.module';
import type { KanbanViewColumnContent, KanbanViewModel } from './model/dx-kanban-view.model';

const meta: Meta<any> = {
  title: 'Data Display/Kanban View',
  component: DxKanbanViewComponent,
  decorators: [
    moduleMetadata({
      imports: [DxKanbanViewModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Drag-and-drop kanban board built on `@angular/cdk/drag-drop`. ' +
          'Each column has a name + color + content list; cards have a header (title + actions), ' +
          'body (`DxDetailsCardContent[]`), and footer. Dragging within a column emits ' +
          '`(onSequenceChange)`; moving across columns emits `(onColumnChange)`. Card-level ' +
          'actions emit `(onKanbanCardAction)`. The three internal sub-components ' +
          '(`kanban-board-card`, `kanban-board-card-wrapper`, `kanban-onscroll-render`) used to ' +
          'have their own sidebar entries and are now absorbed under this single menu.',
      },
    },
  },
  argTypes: {
    dataSource: { control: 'object', description: '`KanbanViewModel` — `{ name, columns: [{ id, name, color, sequence, variant, content }] }`.' },
    onColumnChange: { action: 'onColumnChange', description: 'Fires when a card is dropped into a different column.' },
    onSequenceChange: { action: 'onSequenceChange', description: 'Fires when cards are reordered within the same column.' },
    onKanbanCardAction: { action: 'onKanbanCardAction', description: 'Fires when a card header action is clicked.' },
  },
};

export default meta;
type Story = StoryObj<any>;

// ──────────────────────────────────────────────────────────────────────────
// Seed payloads
// ──────────────────────────────────────────────────────────────────────────

const ticketCard = (id: number, seq: number, title: string, owner: string, priority: 'Low' | 'Med' | 'High'): KanbanViewColumnContent => ({
  id,
  sequence: seq,
  header: {
    title,
    actions: [
      { label: 'Edit',   type: 'edit',   icon: 'edit' },
      { label: 'Delete', type: 'delete', icon: 'delete', iconColor: '#EF5350' },
    ],
  },
  data: [
    { label: 'Owner',    value: owner,    type: 'text' as const },
    { label: 'Priority', value: priority, type: 'text' as const },
  ],
  footer: { title: `#${id}` },
});

const TICKET_BOARD: KanbanViewModel = {
  name: 'Support tickets',
  columns: [
    {
      id: 'col-todo', name: 'Backlog', sequence: 1, variant: 'standard', color: '#9E9E9E',
      content: [
        ticketCard(101, 1, 'Investigate signup latency', 'Ada Lovelace',      'High'),
        ticketCard(102, 2, 'Refresh marketing copy',      'Grace Hopper',      'Low'),
        ticketCard(103, 3, 'Q3 OKR draft',                'Margaret Hamilton', 'Med'),
      ],
    },
    {
      id: 'col-progress', name: 'In progress', sequence: 2, variant: 'standard', color: '#3498DB',
      content: [
        ticketCard(104, 1, 'OAuth provider rotation', 'Linus Torvalds', 'High'),
        ticketCard(105, 2, 'New onboarding emails',   'Grace Hopper',   'Med'),
      ],
    },
    {
      id: 'col-review', name: 'In review', sequence: 3, variant: 'standard', color: '#F1C40F',
      content: [
        ticketCard(106, 1, 'Mobile push notifications', 'Margaret Hamilton', 'Med'),
      ],
    },
    {
      id: 'col-done', name: 'Done', sequence: 4, variant: 'standard', color: '#2ECC71',
      content: [
        ticketCard(107, 1, 'Fix payment receipt locale', 'Ada Lovelace',   'High'),
        ticketCard(108, 2, 'Audit log retention',        'Linus Torvalds', 'Low'),
      ],
    },
  ],
};

const ORDER_BOARD: KanbanViewModel = {
  name: 'Order fulfillment',
  columns: [
    { id: 'col-new',      name: 'New',      sequence: 1, variant: 'standard', color: '#9E9E9E', content: [
      { id: 1, sequence: 1, header: { title: 'INV-2001' }, data: [{ label: 'Customer', value: 'Acme Inc.', type: 'text' as const }, { label: 'Amount', value: 12450, type: 'currency' as const }] },
      { id: 2, sequence: 2, header: { title: 'INV-2002' }, data: [{ label: 'Customer', value: 'Globex Corp.', type: 'text' as const }, { label: 'Amount', value: 8200, type: 'currency' as const }] },
    ]},
    { id: 'col-packed',   name: 'Packed',   sequence: 2, variant: 'standard', color: '#3498DB', content: [
      { id: 3, sequence: 1, header: { title: 'INV-2003' }, data: [{ label: 'Customer', value: 'Initech', type: 'text' as const }, { label: 'Amount', value: 540, type: 'currency' as const }] },
    ]},
    { id: 'col-shipped',  name: 'Shipped',  sequence: 3, variant: 'standard', color: '#9B59B6', content: [
      { id: 4, sequence: 1, header: { title: 'INV-2004' }, data: [{ label: 'Customer', value: 'Soylent Corp.', type: 'text' as const }, { label: 'Amount', value: 22000, type: 'currency' as const }] },
    ]},
    { id: 'col-delivered',name: 'Delivered',sequence: 4, variant: 'standard', color: '#2ECC71', content: [
      { id: 5, sequence: 1, header: { title: 'INV-2005' }, data: [{ label: 'Customer', value: 'Umbrella Corp.', type: 'text' as const }, { label: 'Amount', value: 3400, type: 'currency' as const }] },
    ]},
  ],
};

const SINGLE_BOARD: KanbanViewModel = {
  name: 'Inbox',
  columns: [
    { id: 'col-inbox', name: 'Inbox', sequence: 1, variant: 'standard', color: '#3498DB', content: [
      { id: 1, sequence: 1, header: { title: 'Welcome to the team' },   data: [{ label: 'From', value: 'HR',         type: 'text' as const }] },
      { id: 2, sequence: 2, header: { title: 'Q4 planning thread' },     data: [{ label: 'From', value: 'Leadership', type: 'text' as const }] },
      { id: 3, sequence: 3, header: { title: 'Security training due' },  data: [{ label: 'From', value: 'Compliance', type: 'text' as const }] },
    ]},
  ],
};

const EMPTY_BOARD: KanbanViewModel = {
  name: 'Empty board',
  columns: [
    { id: 'col-a', name: 'To do',       sequence: 1, variant: 'standard', color: '#9E9E9E', content: [] },
    { id: 'col-b', name: 'In progress', sequence: 2, variant: 'standard', color: '#3498DB', content: [] },
    { id: 'col-c', name: 'Done',        sequence: 3, variant: 'standard', color: '#2ECC71', content: [] },
  ],
};

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

const FULL_TEMPLATE = `
  <div style="width:100%; padding:16px; border:1px solid #e0e0e0; border-radius:8px; box-sizing:border-box; overflow-x:auto;">
    <dx-kanban-view
      [dataSource]="dataSource"
      (onColumnChange)="onColumnChange($event)"
      (onSequenceChange)="onSequenceChange($event)"
      (onKanbanCardAction)="onKanbanCardAction($event)">
    </dx-kanban-view>
  </div>
`;

export const Default: Story = {
  name: 'Support tickets board',
  args: { dataSource: TICKET_BOARD },
  parameters: { docs: { description: { story: 'Four-column ticket board with cards in every stage. Drag a card across columns to fire `(onColumnChange)`; reorder within a column to fire `(onSequenceChange)`.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const OrdersBoard: Story = {
  name: 'Orders board (currency footers)',
  args: { dataSource: ORDER_BOARD },
  parameters: { docs: { description: { story: 'Different domain — uses `currency`-typed values in the card body.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const SingleColumn: Story = {
  name: 'Single column (inbox)',
  args: { dataSource: SINGLE_BOARD },
  parameters: { docs: { description: { story: 'Minimum config — a single column. Cards reorder within the column.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Empty: Story = {
  name: 'Empty columns',
  args: { dataSource: EMPTY_BOARD },
  parameters: { docs: { description: { story: 'Three empty columns — useful as a starter state for first-run flows.' } } },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};
