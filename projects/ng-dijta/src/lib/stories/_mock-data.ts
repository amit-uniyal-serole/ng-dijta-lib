/**
 * Shared mock fixtures for stories. Generated stories import from here when
 * the generator detects an input name/type that matches a known fixture
 * (see scripts/generate-stories.mjs#pickFixture). Hand-written stories can
 * import any of these directly via:
 *
 *   import { mockOptions, mockRows } from '../../stories/_mock-data';
 *
 * Add a new fixture here when you hand-tune a story and notice a shape
 * that several components share.
 */

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: 'active' | 'pending' | 'blocked';
}

export const mockUser: MockUser = {
  id: 'u-1',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  avatar: 'https://i.pravatar.cc/64?img=12',
  role: 'Engineering Lead',
  status: 'active',
};

export const mockUsers: MockUser[] = [
  mockUser,
  { id: 'u-2', name: 'Priya Shah', email: 'priya@example.com', avatar: 'https://i.pravatar.cc/64?img=32', role: 'Designer', status: 'active' },
  { id: 'u-3', name: 'Sam Carter', email: 'sam@example.com', avatar: 'https://i.pravatar.cc/64?img=8',  role: 'PM',       status: 'pending' },
  { id: 'u-4', name: 'Jin Tanaka', email: 'jin@example.com',  avatar: 'https://i.pravatar.cc/64?img=15', role: 'QA',       status: 'blocked' },
];

export interface MockOption {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  icon?: string;
}

export const mockOptions: MockOption[] = [
  { id: 'opt-1', label: 'Draft',     value: 'draft' },
  { id: 'opt-2', label: 'In review', value: 'in-review' },
  { id: 'opt-3', label: 'Approved',  value: 'approved' },
  { id: 'opt-4', label: 'Archived',  value: 'archived', disabled: true },
];

export const mockBooleanOptions = [
  { id: 'yes', label: 'Yes', value: true },
  { id: 'no',  label: 'No',  value: false },
];

export interface MockColumn {
  field: string;
  header: string;
  label: string;
  type?: 'text' | 'number' | 'date' | 'currency' | 'link' | 'tag' | 'avatar';
  sortable?: boolean;
  width?: string;
}

export const mockColumns: MockColumn[] = [
  { field: 'name',     header: 'Name',     label: 'Name',     type: 'text',     sortable: true, width: '240px' },
  { field: 'email',    header: 'Email',    label: 'Email',    type: 'link',     sortable: true, width: '280px' },
  { field: 'role',     header: 'Role',     label: 'Role',     type: 'tag' },
  { field: 'joinedAt', header: 'Joined',   label: 'Joined',   type: 'date',     sortable: true },
  { field: 'salary',   header: 'Salary',   label: 'Salary',   type: 'currency', sortable: true },
];

export interface MockRow {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
  salary: number;
  status: 'active' | 'pending' | 'blocked';
}

export const mockRows: MockRow[] = [
  { id: 'r-1', name: 'Alex Morgan', email: 'alex@example.com', role: 'Lead',     joinedAt: '2023-01-12', salary: 145_000, status: 'active' },
  { id: 'r-2', name: 'Priya Shah',  email: 'priya@example.com', role: 'Designer', joinedAt: '2022-09-03', salary: 110_000, status: 'active' },
  { id: 'r-3', name: 'Sam Carter',  email: 'sam@example.com',   role: 'PM',       joinedAt: '2024-04-22', salary: 130_000, status: 'pending' },
  { id: 'r-4', name: 'Jin Tanaka',  email: 'jin@example.com',   role: 'QA',       joinedAt: '2021-11-15', salary: 95_000,  status: 'blocked' },
];

export interface MockMenuItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  disabled?: boolean;
  children?: MockMenuItem[];
}

export const mockMenuItems: MockMenuItem[] = [
  { id: 'm-1', label: 'Dashboard',  icon: 'dashboard', route: '/dashboard' },
  { id: 'm-2', label: 'Reports',    icon: 'description', route: '/reports', children: [
    { id: 'm-2a', label: 'Daily',   route: '/reports/daily' },
    { id: 'm-2b', label: 'Weekly',  route: '/reports/weekly' },
  ] },
  { id: 'm-3', label: 'Settings',   icon: 'settings', route: '/settings' },
  { id: 'm-4', label: 'Help',       icon: 'help', disabled: true },
];

export interface MockBreadcrumb { label: string; route?: string; }
export const mockBreadcrumbs: MockBreadcrumb[] = [
  { label: 'Home',     route: '/' },
  { label: 'Reports',  route: '/reports' },
  { label: 'Q4 2025' },
];

export interface MockKanbanCard {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
  tags?: string[];
  priority?: 'low' | 'medium' | 'high';
  dueDate?: string;
}

export const mockKanbanCard: MockKanbanCard = {
  id: 'k-1',
  title: 'Wire OAuth flow',
  description: 'Connect Google + Microsoft identity providers.',
  assignee: 'Alex Morgan',
  tags: ['auth', 'security'],
  priority: 'high',
  dueDate: '2026-06-12',
};

export const mockKanbanCards: MockKanbanCard[] = [
  mockKanbanCard,
  { id: 'k-2', title: 'Redesign empty states', description: 'Add helpful illustrations.', assignee: 'Priya Shah', tags: ['ux'], priority: 'medium', dueDate: '2026-06-30' },
  { id: 'k-3', title: 'Migrate to ng18',         description: 'Adopt signals where safe.',  assignee: 'Sam Carter',  tags: ['tech-debt'], priority: 'low', dueDate: '2026-08-01' },
];

export interface MockTag { id: string; label: string; color?: string; }
export const mockTags: MockTag[] = [
  { id: 't-1', label: 'security', color: '#bd3232' },
  { id: 't-2', label: 'ux',       color: '#1d6cc0' },
  { id: 't-3', label: 'planning', color: '#0a8a4a' },
];

export interface MockChartPoint { name: string; value: number; }
export const mockChartData: MockChartPoint[] = [
  { name: 'Jan', value: 120 }, { name: 'Feb', value: 132 }, { name: 'Mar', value: 101 },
  { name: 'Apr', value: 134 }, { name: 'May', value: 90 },  { name: 'Jun', value: 230 },
];

export interface MockTimelineEvent {
  id: string;
  title: string;
  description?: string;
  timestamp: string;
  icon?: string;
}
export const mockTimelineEvents: MockTimelineEvent[] = [
  { id: 'e-1', title: 'Created',  description: 'Record opened by Alex.', timestamp: '2026-05-22T09:14:00Z', icon: 'add' },
  { id: 'e-2', title: 'Reviewed', description: 'Approved by manager.',   timestamp: '2026-05-22T11:32:00Z', icon: 'check' },
  { id: 'e-3', title: 'Closed',   description: 'No further action.',     timestamp: '2026-05-22T16:48:00Z', icon: 'lock' },
];

export interface MockFile { id: string; name: string; size: number; type: string; url?: string; }
export const mockFile: MockFile = {
  id: 'f-1', name: 'evidence.pdf', size: 248_592, type: 'application/pdf', url: 'https://example.com/files/evidence.pdf',
};
export const mockFiles: MockFile[] = [
  mockFile,
  { id: 'f-2', name: 'snapshot.png', size: 56_421, type: 'image/png',  url: 'https://i.pravatar.cc/200' },
  { id: 'f-3', name: 'notes.txt',    size: 1_204,  type: 'text/plain' },
];

export interface MockNotification { id: string; title: string; message: string; type: 'info' | 'success' | 'warning' | 'error'; read?: boolean; timestamp: string; }
export const mockNotifications: MockNotification[] = [
  { id: 'n-1', title: 'Deployment complete', message: 'v18.5.21 is live in production.', type: 'success', timestamp: '2026-05-22T09:00:00Z' },
  { id: 'n-2', title: 'Disk usage high',     message: 'Cache volume at 92%.',             type: 'warning', timestamp: '2026-05-22T11:00:00Z' },
  { id: 'n-3', title: 'Backup failed',       message: 'Nightly job exited non-zero.',     type: 'error',   timestamp: '2026-05-22T03:00:00Z' },
];

export const mockDate = new Date('2026-05-22T10:30:00Z');
export const mockMinDate = new Date('2026-05-01T00:00:00Z');
export const mockMaxDate = new Date('2026-05-31T23:59:59Z');
export const mockDateRange = { start: mockMinDate, end: mockMaxDate };

export const mockCoordinates = { latitude: 28.6139, longitude: 77.2090 }; // New Delhi

export const mockCurrency = { code: 'USD', symbol: '$', amount: 12_345.67 };

export const mockAddress = {
  street: '221B Baker Street',
  city: 'London',
  state: 'Greater London',
  zip: 'NW1 6XE',
  country: 'United Kingdom',
};

export const mockText = {
  short:  'Lorem ipsum dolor sit amet.',
  medium: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras varius, eros vel ullamcorper.',
  long:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis tempus orci, eget hendrerit augue. Suspendisse potenti. Praesent at finibus risus, in efficitur urna. Donec dignissim, lacus a aliquam mollis, sapien dui imperdiet odio.',
};

// Fallback object — used by the generator when no specific fixture matches
// a required complex input. Lets the component render past ngOnInit even
// when downstream code dereferences a couple of typical fields.
export const mockGeneric = {
  id: 'g-1',
  name: 'Sample',
  label: 'Sample',
  title: 'Sample',
  description: 'Sample description.',
  value: 'sample',
  status: 'active',
  type: 'default',
  enabled: true,
  disabled: false,
  data: {},
  items: [],
  options: [],
  children: [],
  fields: [],
  columns: [],
  rows: [],
  config: {},
  meta: {},
  url: 'https://example.com',
  htmlView: '<span>Sample</span>',
  fileName: 'sample.txt',
  decimalSeparator: '.',
  thousandSeparator: ',',
  permission: { permission: '', apiName: '' },
};
