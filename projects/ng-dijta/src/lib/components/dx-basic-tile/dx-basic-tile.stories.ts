import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DxBasicTileComponent } from './dx-basic-tile.component';
import { DxBasicTileModule } from './dx-basic-tile.module';
import type { tile } from './basic-tile.model';

const meta: Meta<any> = {
  title: 'Data Display/Basic Tile',
  component: DxBasicTileComponent,
  decorators: [
    moduleMetadata({
      imports: [DxBasicTileModule],
      providers: [provideAnimations()],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Dashboard tile composed of `dx-title` (icon + heading), `dx-content` (description), ' +
          'and `dx-footer` (metric / trend block from the underlying `tile` data). The whole ' +
          'card surface is clickable — `(tileClick)` emits the bound `tile` payload for routing ' +
          'or drill-in behavior.',
      },
    },
  },
  argTypes: {
    tile: { control: 'object', description: '`tile` payload: `titleTt`, `applicationIcon`, `descriptionTt`, `footerTt`, `footerValue`, `openNewTabFg`, `tileSize`, `type`.' },
    tileClick: { action: 'tileClick', description: 'Fires with the `tile` payload when the user clicks the card.' },
  },
  args: {
    tile: {
      titleTt: 'Open tickets',
      applicationIcon: 'confirmation_number',
      descriptionTt: 'Tickets still waiting for first response across all queues.',
      footerTt: 'vs last week',
      footerValue: 12,
      tileSize: 'medium',
      type: 'basic',
    } as tile,
  },
};

export default meta;
type Story = StoryObj<any>;

const FULL_TEMPLATE = `
  <div style="max-width: 320px;">
    <dx-basic-tile [tile]="tile" (tileClick)="tileClick($event)"></dx-basic-tile>
  </div>
`;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Baseline tile with icon, title, description, and a footer metric.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const TitleOnly: Story = {
  name: 'Title only',
  args: { tile: { titleTt: 'Quick view', applicationIcon: 'visibility' } as tile },
  parameters: {
    docs: {
      description: {
        story: 'Minimal tile — just an icon and a heading.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const WithDescription: Story = {
  name: 'With description (no footer)',
  args: {
    tile: {
      titleTt: 'Knowledge base',
      applicationIcon: 'menu_book',
      descriptionTt: 'Search articles, FAQs, and runbooks across teams.',
    } as tile,
  },
  parameters: {
    docs: {
      description: {
        story: 'Drops the footer — useful for navigation/launcher tiles where there\'s no associated metric.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const PositiveTrend: Story = {
  name: 'Positive trend',
  args: {
    tile: {
      titleTt: 'Resolved this week',
      applicationIcon: 'task_alt',
      descriptionTt: 'Tickets closed by your team in the last 7 days.',
      footerTt: 'vs prior week',
      footerValue: 24,
      type: 'basic',
    } as tile,
  },
  parameters: {
    docs: {
      description: {
        story: 'Positive `footerValue` renders the up-arrow / success styling in the footer.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const NegativeTrend: Story = {
  name: 'Negative trend',
  args: {
    tile: {
      titleTt: 'Backlog',
      applicationIcon: 'pending_actions',
      descriptionTt: 'Tickets older than 30 days that are still open.',
      footerTt: 'vs prior week',
      footerValue: -8,
      type: 'basic',
    } as tile,
  },
  parameters: {
    docs: {
      description: {
        story: 'Negative `footerValue` renders the down-arrow / warning styling.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const LargeTile: Story = {
  name: 'Large size',
  args: {
    tile: {
      titleTt: 'Active customers',
      applicationIcon: 'groups',
      descriptionTt: 'Total active customers across all regions.',
      footerTt: 'YoY',
      footerValue: 5,
      tileSize: 'large',
    } as tile,
  },
  parameters: {
    docs: {
      description: {
        story: '`tileSize: \'large\'` increases padding / typography weight.',
      },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 420px;">
        <dx-basic-tile [tile]="tile" (tileClick)="tileClick($event)"></dx-basic-tile>
      </div>
    `,
  }),
};

export const OpensNewTab: Story = {
  name: 'Opens in new tab',
  args: {
    tile: {
      titleTt: 'Open the status page',
      applicationIcon: 'open_in_new',
      descriptionTt: 'External link — opens in a new tab.',
      openNewTabFg: true,
    } as tile,
  },
  parameters: {
    docs: {
      description: {
        story: '`openNewTabFg: true` flags external destinations — consumers read it off the `tileClick` payload to decide whether to `window.open` instead of routing.',
      },
    },
  },
  render: (args) => ({ props: args, template: FULL_TEMPLATE }),
};

export const Grid: Story = {
  name: 'Dashboard grid',
  parameters: {
    docs: {
      description: {
        story: 'How the tile composes inside a dashboard grid.',
      },
    },
  },
  render: () => ({
    props: {
      tiles: [
        { titleTt: 'Open tickets',    applicationIcon: 'confirmation_number', descriptionTt: 'Awaiting first response.',     footerTt: 'vs last week', footerValue: 12 },
        { titleTt: 'Resolved',        applicationIcon: 'task_alt',            descriptionTt: 'Closed in the last 7 days.',   footerTt: 'vs last week', footerValue: 24 },
        { titleTt: 'Backlog',         applicationIcon: 'pending_actions',     descriptionTt: 'Older than 30 days.',          footerTt: 'vs last week', footerValue: -8 },
        { titleTt: 'SLA breaches',    applicationIcon: 'warning',             descriptionTt: 'Tickets past SLA deadline.',   footerTt: 'this week',    footerValue: -3 },
        { titleTt: 'Active customers',applicationIcon: 'groups',              descriptionTt: 'Customers with activity.',     footerTt: 'YoY',          footerValue: 5 },
        { titleTt: 'CSAT',            applicationIcon: 'sentiment_satisfied', descriptionTt: 'Average satisfaction.',        footerTt: 'last 30d',     footerValue: 2 },
      ],
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, minmax(220px, 1fr)); gap: 16px;">
        <dx-basic-tile *ngFor="let t of tiles" [tile]="t"></dx-basic-tile>
      </div>
    `,
  }),
};
