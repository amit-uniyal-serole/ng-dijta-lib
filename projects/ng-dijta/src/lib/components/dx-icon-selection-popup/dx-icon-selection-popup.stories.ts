import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { of, type Observable } from 'rxjs';
import { DxIconSelectionPopupComponent } from './dx-icon-selection-popup.component';
import { DxIconSelectionPopupModule } from './dx-icon-selection-popup.module';
import { IconService } from './service/icon.service';
import type { IconConfig } from './model/icon.interface';
import type { PaginationRequest } from '../dx-config-table';

// ──────────────────────────────────────────────────────────────────────────
// Stub IconService — the dialog body fetches two endpoints on mount
// (`iconCategoryURL`, `iconListURL`). In Storybook we substitute a stub that
// returns canned categories + icons so the popup actually populates.
// ──────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { categoryKey: 'navigation', categoryName: 'Navigation' },
  { categoryKey: 'action',     categoryName: 'Actions' },
  { categoryKey: 'social',     categoryName: 'Social' },
  { categoryKey: 'communication', categoryName: 'Communication' },
];

const ICON_NAMES: Record<string, string[]> = {
  navigation:    ['home', 'menu', 'arrow_back', 'arrow_forward', 'chevron_left', 'chevron_right', 'expand_more', 'expand_less'],
  action:        ['edit', 'delete', 'save', 'add', 'remove', 'check', 'close', 'refresh', 'download', 'upload'],
  social:        ['person', 'group', 'share', 'thumb_up', 'thumb_down', 'star', 'favorite'],
  communication: ['email', 'call', 'chat', 'sms', 'forum', 'inbox', 'send'],
};

function buildIconRows() {
  let id = 1;
  return Object.entries(ICON_NAMES).flatMap(([categoryKey, names]) => {
    const category = CATEGORIES.find(c => c.categoryKey === categoryKey)!;
    return names.map(name => ({
      pkId: id++,
      iconKey: name,
      iconName: name,
      categoryKey,
      categoryName: category.categoryName,
      tags: name,
      sizesPx: 24,
    }));
  });
}

const ALL_ICONS = buildIconRows();

class StubIconService {
  fetchIconCategory(_config?: IconConfig): Observable<any> {
    return of(CATEGORIES);
  }

  fetchIconList(request: PaginationRequest, _config?: IconConfig): Observable<any> {
    // Honor the search filter the component composes
    // (`categoryKey:eq:<key>,tags:lk:<query>`)
    let rows = ALL_ICONS.slice();
    const search = request?.search ?? '';
    const tokens = search ? search.split(',') : [];
    for (const token of tokens) {
      const [field, operator, value] = token.split(':');
      if (!value) continue;
      if (field === 'categoryKey' && operator === 'eq') {
        rows = rows.filter(r => r.categoryKey === value);
      } else if (field === 'tags' && operator === 'lk') {
        const needle = value.toLowerCase();
        rows = rows.filter(r => (r.tags ?? '').toLowerCase().includes(needle));
      }
    }
    const pageNo   = request?.pageNo ?? 0;
    const pageSize = request?.pageSize ?? 50;
    const start = pageNo * pageSize;
    const slice = rows.slice(start, start + pageSize);
    return of({ content: slice, totalElements: rows.length, size: pageSize, number: pageNo });
  }
}

const SAMPLE_CONFIG: IconConfig = {
  iconCategoryURL: '/api/icons/categories',
  iconListURL:     '/api/icons/list',
};

// ──────────────────────────────────────────────────────────────────────────
// Inline render — the popup is a Material dialog body. Stub MatDialogRef so
// rendering directly doesn't crash; the user sees the visual chrome without
// the modal animation.
// ──────────────────────────────────────────────────────────────────────────

const stubDialogRef = {
  close: (_v?: unknown) => {},
} as unknown as MatDialogRef<DxIconSelectionPopupComponent>;

const inlineRender = (iconConfig: IconConfig = SAMPLE_CONFIG) => ({
  moduleMetadata: {
    providers: [
      { provide: MatDialogRef, useValue: stubDialogRef },
      { provide: IconService,  useClass: StubIconService },
    ],
  },
  props: { iconConfig },
  template: `
    <div style="max-width:720px; padding:0; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.08); background:#fff; overflow:hidden;">
      <dx-icon-selection-popup [iconConfig]="iconConfig"></dx-icon-selection-popup>
    </div>
  `,
});

// ──────────────────────────────────────────────────────────────────────────
// Launcher — opens the real MatDialog with the stubbed service so the close
// payload is observable.
// ──────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'dx-icon-selection-launcher',
  template: `
    <div style="display:flex; flex-direction:column; gap:12px; align-items:flex-start;">
      <button mat-raised-button color="primary" (click)="open()">Open icon picker</button>
      <div *ngIf="picked !== null; else hint"
           style="font-family:monospace; font-size:12px; background:#f5f5f5; padding:10px 14px; border-radius:6px; display:flex; align-items:center; gap:8px;">
        <span>Picked:</span>
        <span class="material-icons" style="vertical-align:middle;">{{ picked }}</span>
        <strong>{{ picked }}</strong>
      </div>
      <ng-template #hint>
        <p style="margin:0; color:#666;">Click the button to open the icon picker. The chosen icon name appears here.</p>
      </ng-template>
    </div>
  `,
})
export class DxIconSelectionLauncher {
  picked: string | null = null;
  constructor(@Inject(MatDialog) private readonly dialog: MatDialog) {}

  open(): void {
    const ref = this.dialog.open(DxIconSelectionPopupComponent, { width: '720px' });
    ref.componentInstance.iconConfig = SAMPLE_CONFIG;
    ref.afterClosed().subscribe((iconName: string | undefined) => {
      if (iconName) this.picked = iconName;
    });
  }
}

const meta: Meta<DxIconSelectionPopupComponent> = {
  title: 'Overlays/Icon Selection Popup',
  component: DxIconSelectionPopupComponent,
  decorators: [
    moduleMetadata({
      imports: [DxIconSelectionPopupModule, MatDialogModule, MatButtonModule],
      declarations: [DxIconSelectionLauncher],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Material-dialog body that lets users pick an icon from a server-backed catalog. ' +
          'On mount it calls `IconService.fetchIconCategory(iconConfig)` to populate the category ' +
          'chips, then `fetchIconList(paginationRequest, iconConfig)` for the icon grid. The search ' +
          'box composes `field:operator:value` query tokens (`categoryKey:eq:<key>,tags:lk:<q>`) so ' +
          'the upstream API can filter server-side. Clicking an icon resolves the `MatDialogRef` ' +
          'with the chosen `iconName`. The stories below stub `IconService` with an in-memory ' +
          'catalog so the popup renders without a backend.',
      },
    },
  },
  argTypes: {
    iconConfig: { control: 'object', description: '`IconConfig` — `{ iconCategoryURL, iconListURL }`.' },
  },
};

export default meta;
type Story = StoryObj<DxIconSelectionPopupComponent>;

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default picker',
  parameters: { docs: { description: { story: 'Full popup rendered inline (no modal chrome). Categories + 32 icons across 4 groups. Type in the search box to filter by tag.' } } },
  render: () => inlineRender(),
};

export const NavigationOnly: Story = {
  name: 'Single category',
  parameters: { docs: { description: { story: 'Same picker — preselect "Navigation" in the dropdown to see how the grid responds to category changes.' } } },
  render: () => inlineRender(),
};

export const CustomURLs: Story = {
  name: 'Custom config URLs',
  parameters: { docs: { description: { story: '`iconConfig: { iconCategoryURL, iconListURL }` — point at a different backend. The stub service ignores the URLs but the prop wiring is the same as production.' } } },
  render: () => inlineRender({
    iconCategoryURL: '/api/v2/icons/categories',
    iconListURL:     '/api/v2/icons/list',
  }),
};

export const LiveDialog: Story = {
  name: 'Live dialog (launcher)',
  parameters: { docs: { description: { story: 'Opens the real `MatDialog`. Pick any icon → `afterClosed()` payload (icon name) is shown in the canvas.' } } },
  decorators: [
    moduleMetadata({ providers: [{ provide: IconService, useClass: StubIconService }] }),
  ],
  render: () => ({ template: `<dx-icon-selection-launcher></dx-icon-selection-launcher>` }),
};
