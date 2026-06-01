import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DxDualListboxComponent } from './dx-dual-listbox.component';
import { DxDualListboxModule } from './dx-dual-listbox.module';
import type { DualListConfig } from './dual-list.model';

interface Person {
  id: string;
  name: string;
  subtitle?: string;
  src?: string;
}

const PEOPLE: Person[] = [
  { id: 'ada', name: 'Ada Lovelace', subtitle: 'ada@example.com' },
  { id: 'alan', name: 'Alan Turing', subtitle: 'alan@example.com' },
  { id: 'grace', name: 'Grace Hopper', subtitle: 'grace@example.com' },
  { id: 'linus', name: 'Linus Torvalds', subtitle: 'linus@example.com' },
  { id: 'guido', name: 'Guido van Rossum', subtitle: 'guido@example.com' },
  { id: 'denis', name: 'Dennis Ritchie', subtitle: 'denis@example.com' },
  { id: 'james', name: 'James Gosling', subtitle: 'james@example.com' },
  { id: 'brendan', name: 'Brendan Eich', subtitle: 'brendan@example.com' },
];

const SIMPLE_STRINGS = ['Red', 'Green', 'Blue', 'Yellow', 'Magenta', 'Cyan', 'Orange', 'Purple'];

const BASE_CONFIG: DualListConfig = {
  key: 'id',
  display: 'name',
  height: '260px',
  filter: false,
  sort: false,
};

const meta: Meta<any> = {
  title: 'Form Inputs/Dual Listbox',
  component: DxDualListboxComponent,
  decorators: [
    moduleMetadata({
      imports: [DxDualListboxModule],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Side-by-side dual-list "transfer" widget. Items move between an *Available* list ' +
          'and a *Selected* (confirmed) list via individual click, drag-and-drop, or bulk ' +
          'transfer buttons. The bound `[destination]` array is the canonical selection ' +
          'value — it stays in sync as the user moves items across.\n\n' +
          'Drive layout, sorting, filtering, titles, and bulk-transfer buttons through the ' +
          '`[config]: DualListConfig` object.',
      },
    },
  },
  argTypes: {
    source: { control: 'object', description: 'Master pool of available items. Each item is either a primitive or an object keyed by `config.key`.' },
    destination: { control: 'object', description: 'Currently selected items (the "confirmed" list). Stays in sync as the user moves items across; emits via `(onDestinationChange)`.' },
    config: { control: 'object', description: '`DualListConfig` driving layout, filter, sort, titles, height, drag-and-drop direction, bulk-transfer buttons, and avatar rendering.' },
    compare: { control: false, description: 'Optional `(a, b) => number` sorter applied to both lists. Auto-set to a `_name` comparator when `config.sort === true`.' },
    displaySelectedCount: { control: 'object', description: 'Overrides the visible selection count text. Type: `SelectedCount`.' },
    id: { control: false, description: 'DOM id. Auto-generated as `dual-list-{N}` when omitted.' },
    onDestinationChange: { action: 'onDestinationChange', description: 'Fires whenever an item moves into / out of the `destination` list.' },
    onServiceFilterChange: { action: 'onServiceFilterChange', description: 'Fires when the user types in the server-filter search box (only emits when `config.serverFilter` is true).' },
  },
  args: {
    source: PEOPLE,
    destination: [PEOPLE[0], PEOPLE[2]],
    config: BASE_CONFIG,
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline two-column transfer list with a small preselection. Click an item then a chevron to move it across.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const WithFilter: Story = {
  name: 'With search filter',
  parameters: {
    docs: {
      description: {
        story: '`config.filter = true` shows a search box above each list. Filtering is purely client-side against the `display` field.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[0]],
      config: { ...BASE_CONFIG, filter: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const Sorted: Story = {
  parameters: {
    docs: {
      description: {
        story: '`config.sort = true` keeps both lists alphabetically sorted by the `display` field. Pass a custom `[compare]` to override the default `_name` comparator.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[1], PEOPLE[3]],
      config: { ...BASE_CONFIG, sort: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const BulkTransfer: Story = {
  name: 'With bulk-transfer buttons',
  parameters: {
    docs: {
      description: {
        story: '`config.enableBulkTransfer = true` exposes "move all" arrows that transfer every item between lists in one click.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [],
      config: { ...BASE_CONFIG, enableBulkTransfer: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const CustomTitles: Story = {
  name: 'Custom list titles',
  parameters: {
    docs: {
      description: {
        story: 'Use `config.availableListTitle` and `config.confirmedListTitle` to match the field semantics (Roles → Assigned, Skills → Picked, etc.).',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[0], PEOPLE[2]],
      config: {
        ...BASE_CONFIG,
        availableListTitle: 'Team members',
        confirmedListTitle: 'Project owners',
      },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const WithAvatars: Story = {
  name: 'With avatars + email subtitle',
  parameters: {
    docs: {
      description: {
        story:
          '`config.showAvatar = true` renders an avatar for each row (initials are derived from the `display` field). Each item can carry a `subtitle` (rendered under the name) — useful for `name + email` directories.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[0]],
      config: { ...BASE_CONFIG, showAvatar: true, subtitleAsEmailFg: true, filter: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const RightToLeft: Story = {
  name: 'Right-to-left direction',
  parameters: {
    docs: {
      description: {
        story: 'Set `config.format.direction = "right-to-left"` to flip the *Selected* list to the left side of the transfer widget.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[0], PEOPLE[1]],
      config: { ...BASE_CONFIG, format: { direction: 'right-to-left', draggable: true } },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const NotDraggable: Story = {
  name: 'Click-only (no drag-and-drop)',
  parameters: {
    docs: {
      description: {
        story: 'Set `config.format.draggable = false` to disable drag-and-drop and force the user to use the chevron buttons.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [],
      config: { ...BASE_CONFIG, format: { draggable: false, direction: 'left-to-right' } },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const StringItems: Story = {
  name: 'Primitive string items',
  parameters: {
    docs: {
      description: {
        story: 'When `source` is a flat string array, omit `key` and `display` in `config` (or set them to identity functions). Items are matched and rendered by their string value.',
      },
    },
  },
  render: () => ({
    props: {
      source: SIMPLE_STRINGS,
      destination: ['Red', 'Blue'],
      config: { ...BASE_CONFIG, key: undefined as any, display: undefined as any, filter: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const SortableSelected: Story = {
  name: 'Reorderable selected list',
  parameters: {
    docs: {
      description: {
        story: '`config.enableSingleItemSort = true` exposes up/down arrows on each item in the *Selected* list so users can reorder. The bound `destination` array reflects the new order.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[0], PEOPLE[1], PEOPLE[2]],
      config: { ...BASE_CONFIG, enableSingleItemSort: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const PinnableItems: Story = {
  name: 'Pinnable items',
  parameters: {
    docs: {
      description: {
        story: '`config.enableColumnPinning = true` adds a pin/unpin affordance on each *Selected* row. Pinned items float to the top and stay there during sort operations.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[0], PEOPLE[1]],
      config: { ...BASE_CONFIG, enableColumnPinning: true, enableSingleItemSort: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const ServerFilter: Story = {
  name: 'Server-side filter',
  parameters: {
    docs: {
      description: {
        story: '`config.serverFilter = true` switches the search box from client filtering to emitting `(onServiceFilterChange)` events — wire that to your backend to fetch a filtered `source` list.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [],
      config: { ...BASE_CONFIG, filter: true, serverFilter: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config" (onServiceFilterChange)="serverFilterFn?.($event)"></dx-dual-listbox>`,
  }),
};

export const TallList: Story = {
  name: 'Tall list (custom height)',
  parameters: {
    docs: {
      description: {
        story: 'Use `config.height` to set the visible height of both columns. Items beyond that height scroll within the column.',
      },
    },
  },
  render: () => ({
    props: {
      source: [...PEOPLE, ...PEOPLE.map((p) => ({ ...p, id: p.id + '2', name: p.name + ' (alt)' }))],
      destination: [],
      config: { ...BASE_CONFIG, height: '420px', filter: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      description: {
        story: '`config.disabled = true` disables transfer interactions entirely. Useful in summary screens or while the parent form is locked.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[0], PEOPLE[1]],
      config: { ...BASE_CONFIG, disabled: true },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};

export const KitchenSink: Story = {
  name: 'Kitchen sink (everything on)',
  parameters: {
    docs: {
      description: {
        story: 'Composes the most common configuration: avatars + subtitle, filter, sort, bulk transfer, reorder, and pinning. Use as a starting point for full-featured pickers.',
      },
    },
  },
  render: () => ({
    props: {
      source: PEOPLE,
      destination: [PEOPLE[0], PEOPLE[1], PEOPLE[2]],
      config: {
        ...BASE_CONFIG,
        availableListTitle: 'Available team',
        confirmedListTitle: 'Project owners',
        showAvatar: true,
        subtitleAsEmailFg: true,
        filter: true,
        sort: false,
        enableBulkTransfer: true,
        enableSingleItemSort: true,
        enableColumnPinning: true,
        height: '320px',
      },
    },
    template: `<dx-dual-listbox [source]="source" [destination]="destination" [config]="config"></dx-dual-listbox>`,
  }),
};
