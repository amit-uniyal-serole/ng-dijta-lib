import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Component, Inject } from '@angular/core';
import { DxTableFilterComponent } from './dx-table-filter.component';
import { DxTableFilterModule } from './dx-table-filter.module';
import type { DxTableFilterSettings } from './model/dx-table-filter.model';

// ──────────────────────────────────────────────────────────────────────────
// Host launcher — opens the filter dialog and shows the result payload.
// `DxTableFilterComponent` lives inside a MatDialog (it depends on
// MatDialogRef in its constructor), so rendering it standalone doesn't make
// sense. The launcher mirrors how `dx-config-table` actually invokes it.
// ──────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'dx-table-filter-launcher',
  template: `
    <div style="display:flex; flex-direction:column; gap:16px; align-items:flex-start;">
      <button mat-raised-button color="primary" (click)="openFilter()">Open table filter</button>
      <div *ngIf="lastResult; else noResult" style="font-family:monospace; font-size:12px; background:#f5f5f5; padding:12px; border-radius:6px;">
        <strong>Last filter result:</strong><br>
        <pre style="margin:8px 0 0; white-space:pre-wrap;">{{ lastResult | json }}</pre>
      </div>
      <ng-template #noResult>
        <p style="margin:0; color:#666;">Click "Open table filter" — the dialog payload appears here on submit.</p>
      </ng-template>
    </div>
  `,
})
export class DxTableFilterLauncher {
  filterSettings: DxTableFilterSettings[] | undefined;
  title: string = 'Filter';
  lastResult: unknown = null;

  constructor(@Inject(MatDialog) private readonly dialog: MatDialog) {}

  openFilter(): void {
    const ref = this.dialog.open(DxTableFilterComponent, {
      panelClass: 'custom-dialog-container',
      width: '720px',
    });
    ref.componentInstance.filterSettings = this.filterSettings;
    ref.componentInstance.title = this.title;
    ref.afterClosed().subscribe(result => {
      this.lastResult = result ?? '(dialog dismissed)';
    });
  }
}

const meta: Meta<DxTableFilterLauncher> = {
  title: 'Data Display/Table Filter',
  component: DxTableFilterLauncher,
  decorators: [
    moduleMetadata({
      imports: [DxTableFilterModule, MatDialogModule, MatButtonModule],
      declarations: [DxTableFilterLauncher],
    }),
    applicationConfig({ providers: [provideAnimations()] }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          '`dx-table-filter` is a dialog body — it depends on `MatDialogRef` in its constructor, ' +
          'so it must be opened via `MatDialog.open(DxTableFilterComponent)`. Settings (`filterSettings: DxTableFilterSettings[]`) ' +
          'and `title` are pushed onto the `componentInstance` before the dialog renders. Field types ' +
          'supported by the template: `input`, `number`, `select`, `date`. Each field renders the matching ' +
          '`dx-*` component inside a Bootstrap-grid column (`col-md-4` by default; override via `field.width`). ' +
          'On submit, `MatDialogRef.close()` returns the form value; on clear, returns the reset form. ' +
          'The stories below wrap the dialog in a small launcher button so you can see the open / close cycle.',
      },
    },
  },
  argTypes: {
    filterSettings: { control: 'object', description: '`DxTableFilterSettings[]` — one entry per field.' },
    title: { control: 'text', description: 'Dialog header text (passed through `transloco`).' },
  },
};

export default meta;
type Story = StoryObj<DxTableFilterLauncher>;

const FULL_SETTINGS: DxTableFilterSettings[] = [
  { name: 'name',      label: 'Name',      type: 'input',  width: 'col-md-6' },
  { name: 'email',     label: 'Email',     type: 'input',  width: 'col-md-6' },
  { name: 'priority',  label: 'Priority',  type: 'number', width: 'col-md-4' },
  { name: 'status',    label: 'Status',    type: 'select', width: 'col-md-4',
    options: [
      { keyTt: 'active',   valueTt: 'Active' },
      { keyTt: 'pending',  valueTt: 'Pending' },
      { keyTt: 'archived', valueTt: 'Archived' },
    ],
  },
  { name: 'createdOn', label: 'Created on', type: 'date',  width: 'col-md-4' },
];

const COMPACT_SETTINGS: DxTableFilterSettings[] = [
  { name: 'q', label: 'Search', type: 'input', width: 'col-md-12' },
];

const PREFILLED_SETTINGS: DxTableFilterSettings[] = FULL_SETTINGS.map(s =>
  s.name === 'status' ? { ...s, defaultValue: 'active' } :
  s.name === 'name'   ? { ...s, defaultValue: 'Ada' }    :
  s,
);

// ──────────────────────────────────────────────────────────────────────────
// Stories
// ──────────────────────────────────────────────────────────────────────────

export const Default: Story = {
  name: 'Standard filter form',
  args: { filterSettings: FULL_SETTINGS, title: 'Filter users' },
  parameters: { docs: { description: { story: 'Five fields of mixed types (text / number / select / date). Click the button to open the dialog; submit returns the form value via `MatDialogRef.close`.' } } },
  render: (args) => ({ props: args }),
};

export const SingleSearch: Story = {
  name: 'Single search field',
  args: { filterSettings: COMPACT_SETTINGS, title: 'Search' },
  parameters: { docs: { description: { story: 'Minimum config — one `col-md-12` search input.' } } },
  render: (args) => ({ props: args }),
};

export const PrefilledValues: Story = {
  name: 'Prefilled defaults',
  args: { filterSettings: PREFILLED_SETTINGS, title: 'Filter users' },
  parameters: { docs: { description: { story: 'Each field reads `defaultValue` from its setting — the dialog opens with values already populated.' } } },
  render: (args) => ({ props: args }),
};

export const EmptySettings: Story = {
  name: 'No settings (empty state)',
  args: { filterSettings: [], title: 'Filter' },
  parameters: { docs: { description: { story: '`filterSettings: []` → the dialog renders the "No Filter Settings" empty-state message.' } } },
  render: (args) => ({ props: args }),
};

export const CustomTitle: Story = {
  name: 'Custom dialog title',
  args: { filterSettings: COMPACT_SETTINGS, title: 'Advanced search' },
  parameters: { docs: { description: { story: 'Title is passed through the `transloco` pipe — works as a literal here since the missing-key handler returns the key.' } } },
  render: (args) => ({ props: args }),
};
