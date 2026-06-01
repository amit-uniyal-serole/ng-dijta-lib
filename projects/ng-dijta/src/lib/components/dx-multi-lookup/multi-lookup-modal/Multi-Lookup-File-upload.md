# File-upload mode for `MultiLookupModalComponent`

> **Status:** ✅ Shipped on the library side as of **2026-05-05**. Manual browser smoke + parent-app wiring of `available.fileUploadConfig` are the only outstanding steps. Library build is green (`Built @ngdx/dijta`).

This document describes the **current** design and behavior. For the chronological history of how it got here, see the [Change log](#change-log) at the bottom.

---

## Context

The roster Bulk Assign flow opens a `MultiLookupModalComponent` instance that lets users pick site records to associate with a roster. Originally the modal only supported **manual filtering** (Site Type, State, Site Functions, Site Classification, Site Code chip + filter form). For large rosters this is tedious: users with a list of site codes in a spreadsheet had to enter them one by one or paste them as comma-separated chips.

This feature adds a second selection mode: **CSV upload**. The user picks a CSV file → reviews it → clicks Upload → the backend matches rows in the file against site records → the modal renders all matched rows preselected → user un-checks any unwanted rows → confirms → existing `saveConfig` (`associateRosterToSites`) fires.

The two modes are **mutually exclusive** and switched via a radio toggle. Switching between them resets the opposing state.

The feature lives inside the library's generic `MultiLookupModalComponent`. It surfaces on a tab when that tab's config (or the top-level config) provides a `fileUploadConfig`. In the roster flow it's enabled on the **Available Site** tab only; the Assigned Site tab opts out by simply not declaring `fileUploadConfig`.

No service changes were needed — [`LookupModalService.getLookupServiceRequest()`](../dx-lookup/lookup-modal/service/lookup-modal.service.ts) already passes `body` straight to `HttpClient.request()`, which natively accepts `FormData`.

---

## Architecture overview

### State machine

```
                        mode: 'manual' (default)
                              │
                              │  (user picks "CSV Upload")
                              ▼
                        mode: 'file'
                              │
                              │  uploadStatus: 'idle'      (default in CSV mode, no file)
                              │  uploadStatus: 'idle'      (file picked, not yet uploaded)
                              │  uploadStatus: 'uploaded'  (upload succeeded — ✓ badge)
                              │  uploadStatus: 'failed'    (upload errored — ✗ label + Retry)
```

Resets:
- Pick a new file → `uploadStatus = 'idle'`, prior `dataSource` cleared
- Click ✕ Remove (any sub-state) → file cleared, `uploadStatus = 'idle'`, mode stays `'file'`
- Toggle Manual ⇄ CSV → file cleared, `uploadStatus = 'idle'`, manual list reloaded if going to Manual
- Tab change while in `'file'` mode → resets to `'manual'` on the new tab

### UI layers (CSV mode)

```
┌─────────────────────────────────────────────────────────────┐
│  ◉ Manual    ○ CSV Upload                                    │  ← <dx-radio-button>
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            ↑ cloud_upload icon                       │    │
│  │            [ Browse ]                                │    │  ← drop zone
│  │            drop a file here                          │    │     (when !selectedFile)
│  │            *File supported: .csv only (max 10 MB)    │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│              ─── OR (after file pick) ───                    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 📄 site-codes.csv  76 B    [✕ Remove] [↻ Fetch]     │    │  ← file card (idle)
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 📄 site-codes.csv  76 B  ✓ Uploaded  [✕ Remove]     │    │  ← file card (uploaded)
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 📄 site-codes.csv  76 B  ✗ Failed [✕ Remove][↻Retry]│    │  ← file card (failed)
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
│  N of M items selected  (banner — visible only when uploaded│
│                          AND totalItems > 0; empty-result    │
│                          banner is currently commented out)  │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  table (gated on uploadStatus === 'uploaded')        │    │
│  │  toolbar hidden via setting.hideToolbar = true       │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

In Manual mode the toggle is shown but everything below it is the original filter form + table (unchanged from pre-feature behavior).

---

## Public API

### `FileUploadConfig`

Defined in [`../dx-lookup/lookup-modal/model/dx-lookup-interface.ts`](../dx-lookup/lookup-modal/model/dx-lookup-interface.ts) and re-exported via the `@ngdx/dijta` barrel.

```ts
export interface FileUploadConfig {
  /** Endpoint that accepts the uploaded file and returns matching records. */
  apiConfig: LookupApiConfig<any>;
  /** Form-data field name for the file. @default 'file' */
  fileFieldName?: string;
  /** Accept attribute for <input type="file">. @default '.csv' */
  accept?: string;
  /** Max file size in bytes. @default 10 * 1024 * 1024 (10 MB) */
  maxSize?: number;
  /** Optional payload builder. Receives the file + apiConfig, returns the body
   *  used for the upload request (FormData by default if omitted). */
  payloadTransform?: (file: File, apiConfig: LookupApiConfig<any>) => unknown;
  /** Helper text (currently NOT rendered in the new drop-zone layout — kept for backward compat). */
  helperText?: string;
  /** Browse-button label in older flows (NOT used in current drop-zone layout — Browse is hardcoded). */
  buttonLabel?: string;
  /** Optional sample file users can download to see the expected upload format.
   *  When provided, a "Download sample" link renders in the drop-zone empty state.
   *  The library opens `url` via a synthesized `<a href download>` — no Blob, no body building. */
  sampleFile?: {
    /** URL pointing at the sample file. Typically provided by the backend (signed URL, CDN, static asset). */
    url: string;
    /** Optional suggested download filename — sets the `download` attribute on the anchor.
     *  When omitted, the browser uses Content-Disposition or the URL's last path segment. */
    fileName?: string;
  };
}
```

### `DxLookupModalConfig` extension

```ts
export interface DxLookupModalConfig {
  // ...existing fields...
  fileUploadConfig?: FileUploadConfig;        // top-level (non-tabbed flows)
  tabs?: {
    title: string;
    submitButtonTitle?: string;
    lookupApiConfig: LookupApiConfig<any>;
    saveConfig?: { apiConfig?: LookupApiConfig<any>; payloadTransform?: any; successMessage?: string };
    fileUploadConfig?: FileUploadConfig;       // per-tab (tabbed flows)
  }[];
}
```

### `DxTableSetting.hideToolbar`

Added to [`../dx-table/interfaces/dx-table.interface.ts`](../dx-table/interfaces/dx-table.interface.ts):

```ts
export interface DxTableSetting {
  // ...existing fields...
  /** Hide the entire toolbar row (left actions, paginator, right actions). @default false */
  hideToolbar?: boolean;
}
```

`dx-table` honors this via `<dx-paginator *ngIf="setting && !setting.hideToolbar" ...>` — when set, the entire paginator subtree (refresh, page-size dropdown, paginator arrows, bulk actions, view-switcher) doesn't render. Backward-compatible: undefined → renders as before.

---

## Component state

In [`multi-lookup-modal/multi-lookup-modal.component.ts`](multi-lookup-modal/multi-lookup-modal.component.ts):

```ts
// Mode picker (toggle UI)
mode: 'manual' | 'file' = 'manual';
modeOptions: KeyValueModel[] = [
  { keyTt: 'manual', valueTt: 'Manual' },
  { keyTt: 'file',   valueTt: 'CSV Upload' },
];

// File-upload state
fileUploadConfig?: FileUploadConfig;
selectedFile?: File;                                    // (renamed from `uploadedFile`)
fileUploadLoading: boolean = false;
isDragOver: boolean = false;                            // for drop-zone visual feedback
fileError?: string;                                     // inline validation error
uploadStatus: 'idle' | 'uploaded' | 'failed' = 'idle';
private fileUploadSubscription?: Subscription;
```

---

## User flows

### Manual mode (default, unchanged from pre-feature behavior)

1. Modal opens → "Manual" radio selected, filter form + table visible.
2. User sets filters → clicks Search → `getLookUpList()` fires → table fills.
3. User selects rows → clicks Assign Site → existing `saveConfig` fires.

### CSV mode

1. User clicks "CSV Upload" radio → `onModeChange('file')` runs:
   - Filter values cleared, table emptied
   - `mode = 'file'`, `uploadStatus = 'idle'`, `selectedFile = undefined`
   - Manual filters hidden (hide-not-disable), drop zone visible, table hidden
2. User picks a CSV (Browse OR drag-and-drop) → `onFileSelected()` / `onFileDropped()` route through `acceptFile()`:
   - Validates extension (`accept`) and size (`maxSize`)
   - On reject: sets `fileError`, drop zone shows red error inline
   - On accept: clears `dataSource`, sets `selectedFile`, `uploadStatus = 'idle'`
   - Drop zone is replaced by file card showing `[✕ Remove] [↻ Fetch]`
3. User clicks **Fetch** → `onUploadFile()` fires (method name unchanged):
   - Builds body (FormData by default; override via `payloadTransform`)
   - `lookupModalService.getLookupServiceRequest({ ...apiConfig, body })`
   - Sets `fileUploadLoading = true`, `setting.hideToolbar = true`
   - On success: `applyFileUploadResponse(response)` → table fills, `uploadStatus = 'uploaded'`, file card shows ✓ Uploaded badge + `[✕ Remove]` only
   - On 0 rows: table shows its "No Data" placeholder; no count banner (gated on `totalItems > 0`). An empty-result banner exists in the template but is currently commented out.
   - On error: `uploadStatus = 'failed'` → file card shows ✗ Failed + `[✕ Remove] [↻ Retry]`
4. User un-checks unwanted rows → clicks Assign Site → existing `saveConfig` fires with the remaining `selectedIds`.

### State-reset matrix

| Trigger | `selectedFile` | `dataSource` | `uploadStatus` | `selectedRecords` | `mode` | `setting.hideToolbar` |
|---|---|---|---|---|---|---|
| Mode → Manual | cleared | cleared, then reloaded | `'idle'` | **cleared** | `'manual'` | `false` |
| Mode → CSV | cleared | cleared | `'idle'` | **cleared** | `'file'` | (left as-is) |
| Pick file | new file | cleared | `'idle'` | unchanged | unchanged | unchanged |
| Click Upload (success) | unchanged | filled | `'uploaded'` | filled (preselect-all) | unchanged | `true` |
| Click Upload (error) | unchanged | unchanged | `'failed'` | unchanged | unchanged | unchanged |
| Click ✕ Remove | cleared | cleared | `'idle'` | cleared | unchanged | unchanged |
| Tab change (any mode) | cleared (if was `'file'`) | (handled by tab init) | `'idle'` | **cleared** | `'manual'` | `false` (if was `'file'`) |

> Note on `selectedRecords` — this column also tracks the related selection-bookkeeping fields (`multiRecordSelectionListPkIds`, `multiRowSelection.value`, and `selectAll`). They're cleared together as a unit in every "**cleared**" entry above.

---

## Implementation details

### Mode toggle

In the template (`multi-lookup-modal.component.html`), gated on `fileUploadConfig`:

```html
@if (fileUploadConfig) {
  <div class="row mt-2 dx-mode-picker-row">
    <dx-radio-button [options]="modeOptions" displayType="horizantal"
                     [(ngModel)]="mode"
                     (onRadioChange)="onModeChange($event.value)"
                     name="lookupMode"></dx-radio-button>
  </div>
}
```

Backward-compatible: consumers that don't set `fileUploadConfig` see no picker and the original manual-only flow renders.

`DxRadioButtonModule` + `FormsModule` are imported in [`dx-multi-lookup.module.ts`](dx-multi-lookup.module.ts).

### Drop zone + drag-and-drop

The drop zone renders only when `!selectedFile`:

```html
<div class="dx-file-drop-zone"
     [class.dx-file-drop-zone--dragover]="isDragOver"
     [class.dx-file-drop-zone--error]="!!fileError"
     (dragover)="onDragOver($event)"
     (dragleave)="onDragLeave($event)"
     (drop)="onFileDropped($event)">
  <!-- empty state: cloud icon, [Browse] button, "drop a file here", format hint -->
  @if (fileError) { <inline error block /> }
</div>
```

Both browse and drop route into `acceptFile(file)`:

```ts
private acceptFile(file: File): void {
  if (!this.fileUploadConfig) return;
  const accept = this.fileUploadConfig.accept ?? '.csv';
  const maxSize = this.fileUploadConfig.maxSize ?? 10 * 1024 * 1024;
  if (!this.isAcceptedFile(file, accept)) {
    this.fileError = `Invalid file type. Expected ${accept}.`;
    this.selectedFile = undefined;
    return;
  }
  if (file.size > maxSize) {
    this.fileError = `File too large. Max ${maxSize / 1024 / 1024} MB.`;
    this.selectedFile = undefined;
    return;
  }
  this.dataSource = [];
  this.setting.totalItems = 0;
  this.fileError = undefined;
  this.uploadStatus = 'idle';
  this.selectedFile = file;
}
```

Validation errors are **inline** (set on `fileError`, displayed in the drop zone), not toastr — closer to the spec's "inline error" UX requirement.

### Sample file download

When `fileUploadConfig.sampleFile` is provided, a "Download sample" link renders inline next to the format hint in the drop-zone empty state. Click handler `onDownloadSample()` delegates to the shared `DxFileDownloadService` (re-exported from `@ngdx/dijta`). The service:

1. Calls `HttpClient.get(url, { responseType: 'blob', observe: 'response' })` so the consuming app's HTTP interceptor attaches `Authorization: Bearer <token>` / cookies automatically — anchor clicks cannot do this, which is why the previous `<a href>` approach broke against auth-protected backends.
2. Resolves a download filename in this order:
   1. `options.fileName` — explicit caller-supplied suggestion (multi-lookup passes `sampleFile.fileName`).
   2. `Content-Disposition` response header — parses both `filename="..."` and RFC-5987 `filename*=UTF-8''...` forms.
   3. URL's last non-empty path segment — e.g. `/v1/site/sample-file` → `sample-file`.
   4. Literal `'download'` fallback.
3. Appends `options.defaultExtension` when the resolved name has no extension. multi-lookup derives this from `fileUploadConfig.accept` (first dotted token) so a URL like `/v1/site/sample-file` lands as `sample-file.csv` instead of bare `sample-file`.
4. Synthesises an `<a download>` anchor pointing at `URL.createObjectURL(blob)`, clicks it, then defers `URL.revokeObjectURL` to `setTimeout(0)` so the browser has time to start the download before the object URL becomes invalid (avoids Chrome's "File wasn't available on site" warning).

The download button is disabled while `fileUploadLoading` (the same flag the file-upload submit uses), so users can't trigger a sample mid-upload or fire multiple sample requests concurrently. On HTTP error or empty body the user sees a toast (`Failed to download the sample file.`).

Consumers outside `multi-lookup-modal` can import the service directly:

```ts
import { DxFileDownloadService } from '@ngdx/dijta';

private readonly fileDownload = inject(DxFileDownloadService);

this.fileDownload
  .download({ url: '/api/v1/site/sample-file', defaultExtension: '.csv' })
  .subscribe();
```

### File card with three sub-states

Renders when `selectedFile` is set:

```html
<div class="dx-file-card" role="status">
  <mat-icon>description</mat-icon>
  <div class="dx-file-card__info">
    <span class="dx-file-card__name">{{ selectedFile.name }}</span>
    <span class="dx-file-card__size">{{ formatFileSize(selectedFile.size) }}</span>
  </div>

  @if (uploadStatus === 'uploaded') {
    <span class="dx-file-card__badge dx-file-card__badge--success">
      <mat-icon>check_circle</mat-icon> Uploaded
    </span>
  }
  @if (uploadStatus === 'failed') {
    <span class="dx-file-card__badge dx-file-card__badge--error">
      <mat-icon>error_outline</mat-icon> Failed
    </span>
  }

  <div class="dx-file-card__actions">
    <button mat-stroked-button color="warn" (click)="onRemoveFile()">
      <mat-icon>close</mat-icon> Remove
    </button>
    @if (uploadStatus === 'idle') {
      <dx-button title="Fetch" icon="sync"
                 [disabled]="fileUploadLoading" [isLoading]="fileUploadLoading"
                 (onActionSelect)="onUploadFile()"></dx-button>
    }
    @if (uploadStatus === 'failed') {
      <dx-button title="Retry" icon="refresh"
                 [disabled]="fileUploadLoading" [isLoading]="fileUploadLoading"
                 (onActionSelect)="onUploadFile()"></dx-button>
    }
  </div>
</div>
```

Buttons:
- **Remove** = `<button mat-stroked-button color="warn">` — Material's standard red palette
- **Fetch / Retry** = `<dx-button>` (default class `'dxBtn'`) — primary teal

`MatButtonModule` was added to `dx-multi-lookup.module.ts` so `mat-stroked-button` resolves.

### Two-step upload

`onFileSelected()` only stores the file. The API call lives in a separate method:

```ts
protected onUploadFile(): void {
  if (!this.selectedFile || !this.fileUploadConfig) return;

  const file = this.selectedFile;
  const body = this.fileUploadConfig.payloadTransform
    ? this.fileUploadConfig.payloadTransform(file, this.fileUploadConfig.apiConfig)
    : (() => {
        const fd = new FormData();
        fd.append(this.fileUploadConfig!.fileFieldName ?? 'file', file);
        return fd;
      })();

  this.fileUploadLoading = true;
  this.fileUploadSubscription?.unsubscribe();
  this.fileUploadSubscription = this.lookupModalService
    .getLookupServiceRequest({ ...this.fileUploadConfig.apiConfig, body } as LookupApiConfig<T>)
    .pipe(filter(r => !!r))
    .subscribe({
      next: (response: MultiLookupModuleRecordModel) => {
        this.applyFileUploadResponse(response);
        this.uploadStatus = 'uploaded';
        this.fileUploadLoading = false;
      },
      error: () => {
        this.toastrService.error('Failed to process the uploaded file.');
        this.uploadStatus = 'failed';
        this.fileUploadLoading = false;
      }
    });
}
```

### Backend response normalization

The roster endpoint returns a **flat array** of records (not the paginated `{content[]}` wrapper used by the manual list). `applyFileUploadResponse()` handles both:

```ts
private applyFileUploadResponse(response: MultiLookupModuleRecordModel): void {
  const moduleResponse: any = response?.response ?? response;
  const items: any[] = Array.isArray(moduleResponse)
    ? moduleResponse
    : Array.isArray(moduleResponse?.content)
      ? moduleResponse.content
      : [];

  this.dataSource = this.listTransform
    ? this.listTransform({ content: items }, this.config, this)
    : items.map((item: any) => ({
        data: this.getValue(item),
        dropdown: this.getRecordDropdownValues(item, this.pickListConfigList!)
      }));

  this.setting.totalItems = this.dataSource.length;
  this.setting.pageSize = this.dataSource.length || 1;
  this.setting.pageIndex = 0;
  this.setting.hideToolbar = true;

  this.selectAll = true;
  this.onCheckboxChange(this.dataSource, false);
}
```

If `listTransform` is provided, it's still called but with a wrapped `{ content: items }` shape so existing transforms keep working.

### Hide-not-disable for manual controls

Earlier patches added `[disabled]="mode === 'file'"` to filter inputs. With the explicit mode toggle, this was replaced with `@if (mode === 'manual') { ... }` wrappers around:
- Simple-search row
- Additional-filter form (`additionalFilter`)
- New-search-filter form (`lookupApiConfig.newSearchFilter`)

The `[disabled]="mode === 'file'"` bindings on `dx-input`, `dx-autocomplete-select`, chip `<input matChipInputFor>`, Reset, and Search were all removed.

### Table visibility gate

The `<div class="lookup-modal-table mb-4">` block is wrapped in:

```html
@if (mode === 'manual' || (mode === 'file' && uploadStatus === 'uploaded')) {
  ...table block...
}
```

Hides the empty `0 of 0 / No Data` placeholder pre-upload in CSV mode. Visible after upload regardless of result count (per UX call — even 0-result case shows the table with its "No Data" placeholder). The empty-result banner referenced in earlier iterations of this design is currently commented out in the template, so 0-row uploads display only the placeholder.

### Toolbar hide via `setting.hideToolbar`

In CSV mode after upload, the entire `dx-paginator` row would be confusing (refresh button refetches the manual list, page-size is meaningless when `pageSize === totalItems`). Setting `hideToolbar = true` in `applyFileUploadResponse()` removes the entire toolbar subtree. `restoreManualSettings()` (called from `onModeChange('manual')` and `onTabChange` file→manual reset) puts it back.

### Sort handler guard

`onSort()` keeps an `if (this.mode === 'file') { return; }` guard. Column-header sort is reachable from `<th mat-sort-header>` in the table itself (not part of the toolbar), so without the guard, sorting in CSV mode would refetch the manual list and wipe uploaded results.

### Selection count banner

Below the table actions (above the table itself):

```html
@if (mode === 'file' && selectedFile && uploadStatus === 'uploaded') {
  @if ((setting?.totalItems ?? 0) > 0) {
    <div class="text-wrapper-checkbox body d-flex justify-content-center align-items-center p-2">
      <span>{{ selectedRecords?.length ?? 0 }} of {{ setting?.totalItems }} items selected</span>
    </div>
  } 
  <!-- @else {
    <div class="text-wrapper-checkbox body d-flex justify-content-center align-items-center p-2 dx-csv-empty-msg">
      <span>No valid site codes found in the uploaded file.</span>
    </div>
  } -->
}
```

---

## Files modified

### Library

- [`../dx-lookup/lookup-modal/model/dx-lookup-interface.ts`](../dx-lookup/lookup-modal/model/dx-lookup-interface.ts) — added `FileUploadConfig`, added `fileUploadConfig?` to `DxLookupModalConfig` (top-level + per-tab)
- [`../dx-table/interfaces/dx-table.interface.ts`](../dx-table/interfaces/dx-table.interface.ts) — added `hideToolbar?: boolean` to `DxTableSetting`
- [`../dx-table/components/dx-table/dx-table.component.html`](../dx-table/components/dx-table/dx-table.component.html) — `<dx-paginator *ngIf="setting && !setting.hideToolbar" ...>`
- [`multi-lookup-modal/multi-lookup-modal.component.ts`](multi-lookup-modal/multi-lookup-modal.component.ts) — all the new state + handlers (see "Component state" + "Implementation details")
- [`multi-lookup-modal/multi-lookup-modal.component.html`](multi-lookup-modal/multi-lookup-modal.component.html) — mode picker, drop zone, file card, table gate, banner
- [`multi-lookup-modal/multi-lookup-modal.component.scss`](multi-lookup-modal/multi-lookup-modal.component.scss) — `.dx-file-drop-zone`, `.dx-file-card` (+ badges), drop-zone height cap
- [`multi-lookup-modal/multi-lookup-modal.component.spec.ts`](multi-lookup-modal/multi-lookup-modal.component.spec.ts) — restructured for two-step + drag-drop; covers picking, validation rejection, upload success (paginated and flat-array), upload error, remove, mode/tab change
- [`dx-multi-lookup.module.ts`](dx-multi-lookup.module.ts) — added `DxRadioButtonModule`, `MatButtonModule`

### Out of scope (separate fixes)

- `mat-hint align="end"` on chip-filter counter (fixes a duplicate-hint Material error)

---

## Verification

1. `npx ng build ng-dijta` — must stay green. ✅ green as of 2026-05-05.
2. `npm run lint` — currently blocked by a **pre-existing** `.eslintrc.json` config error (`no-empty: false` is invalid severity); not introduced by this work.
3. `npx ng test ng-dijta` — currently blocked by **two pre-existing** broken specs (`modal/modal.spec.ts` strict-null errors + `tiles/core/dx-tile-header/dx-tile-header.component.spec.ts` wrong import name). The new `multi-lookup-modal.component.spec.ts` compiles clean; karma's bundle just can't start because of those unrelated specs.
4. **Manual smoke** in `practice` (`npm start`) for the roster Bulk Assign flow:
   - Open modal → "Manual" radio selected by default, filter form visible.
   - Toggle to "CSV Upload" → filter form hidden, drop zone visible.
   - Pick a CSV (Browse OR drag-and-drop) → drop zone replaced by file card with `[✕ Remove] [↻ Fetch]`.
   - Click Fetch → table fills with all rows preselected, toolbar hidden, file card shows `✓ Uploaded` badge + `[✕ Remove]` only.
   - Force an upload error → file card shows `✗ Failed` + `[✕ Remove] [↻ Retry]`. Click Retry → fires same API.
   - Upload succeeds with 0 rows → file card shows `✓ Uploaded`; no count banner; table shows its "No Data" placeholder. (Empty-result banner is currently commented out in the template.)
   - Click ✕ Remove (any state) → back to drop zone, table hidden, mode stays `'file'`.
   - Pick wrong-extension or oversize file → red inline error in drop zone, no API call.
   - Toggle to Manual → drop zone gone, filter form back, manual list reloads, toolbar restored.
   - Switch tabs while in CSV mode → mode resets to Manual on the new tab; uploaded file cleared.
   - Open modal **without** `fileUploadConfig` → no mode picker, manual flow unchanged (regression check).
   - Click a column header in CSV mode → no manual-list refetch (sort guard).
   - With `sampleFile: { url, fileName }` set → format-hint row reads `*File supported: .csv only (max 10 MB) · ⬇ Download sample`. Click → `HttpClient` fetches the blob (auth header attached by interceptor), file downloads with the suggested `fileName`.
   - With `sampleFile: { url }` only → click downloads using the response's `Content-Disposition` header, or the URL's last path segment as fallback (`/v1/site/sample-file` → `sample-file`), or `sample.csv` as last resort.
   - With `sampleFile` omitted entirely → no sample link renders (regression check).
   - On HTTP error (401, 403, 5xx) or empty body → toast `Failed to download the sample file.`, no anchor click, no navigation away from the SPA.

---

## Open risks (carried forward)

- **Re-using `getValue()` / `getRecordDropdownValues()` private helpers** — these are currently `private`. Either keep `applyFileUploadResponse` next to them (no visibility change) or promote to `protected` if a future split is needed.
- **Pre-existing branch breakage** — lint config + two unrelated specs block green lint/karma; not this feature's scope.
- **Manual-mode `selectAll = true` edge case** — when the user clicks "Select all" in Manual mode without any active search/filter, the same `criteria.queryCriteria === undefined` situation occurs (the 2026-05-06 CSV fix only short-circuits file mode). Pre-existing, broader scope; not addressed here.

---

## Parent-app side (informational, no library code change)

To enable in the existing roster `onClickMenuAction`:

```ts
if (available) {
  available.lookupApiConfig.api = `/${environment.sdr}/v1/module/record`;
  available.fileUploadConfig = {
    apiConfig: {
      method: 'POST',
      api: `/${environment.sdr}/v1/module/record/file-lookup`,   // example
    },
    accept: '.csv',
    fileFieldName: 'file',
    maxSize: 10 * 1024 * 1024,
    sampleFile: {
      url: '/assets/samples/site-codes-sample.csv',  // or a backend-supplied URL
      fileName: 'site-codes-sample.csv',
    },
  };
  // ...existing saveConfig wiring...
}
```

The Assigned Site tab does **not** get `fileUploadConfig`, so no mode picker and no upload UI render there.

`buttonLabel` and `helperText` fields on `FileUploadConfig` are no longer used by the new drop-zone layout — the Browse button label is hardcoded and the format hint is computed from `accept` + `maxSize`. The fields remain on the interface for backward compatibility with consumers that might still pass them.

---

## Change log

Chronological record of how the feature evolved. Most recent first.

### 2026-05-06 (second) — Selection state leak across mode/tab changes

- **Reported bug:** select rows in Manual mode → toggle to CSV mode → Assign Site button stayed enabled (because `selectedRecords?.length === 0` was the only disable condition, and `selectedRecords` wasn't cleared by `onModeChange`).
- Root cause: only `onRemoveFile()` was clearing `selectedRecords` / `multiRecordSelectionListPkIds` / `multiRowSelection.value` / `selectAll`. `onModeChange()` and `onTabChange()` left them populated, so picks from the previous mode/tab leaked into the next workflow.
- **Fix:** clear all four selection-bookkeeping fields in:
  - `onModeChange('file')` — Manual → CSV
  - `onModeChange('manual')` — CSV → Manual
  - `onTabChange()` — every tab change (clears unconditionally; preserves the existing intent of starting fresh on each tab)
- Updated the state-reset matrix in this doc to add a `selectedRecords` column so future edits don't miss it.

### 2026-05-06 — `criteria` undefined-fields fix in CSV mode

- In `onClickConfirm()`, gated the `bluckAction` block on `mode !== 'file'`. Previously in CSV mode, `selectAll = true` skipped both inner filter branches and produced `criteria = { queryCriteria: undefined, queryExpression: undefined }` — a defined-but-empty object that consumers' shallow null-checks (`if (criteria)`) treated as truthy and then NPE'd on field access.
- After the fix, `data.criteria` is `undefined` in CSV mode (file uploads carry truth in `selectedIds`); consumers' top-level null-check correctly skips. No interface change to `MultiLookupSelectedRecordsModel`.
- Removed the corresponding entry from "Open risks". Manual-mode `selectAll === true` edge case left as a separate carry-forward risk.

### 2026-05-05 — `dx-table-multi-select` overflow badge clipped (out of scope, separate component)

- Names + `+N` overflow badge now render in separate flex slots so the badge has its own DOM element and isn't clipped by `text-overflow: ellipsis`.
- Files: [`../dx-table/components/dx-table-multi-select/`](../dx-table/components/dx-table-multi-select/) (.ts, .html, .scss).

### 2026-05-05 — Hide table in CSV mode until upload completes

- Wrapped table block in `@if (mode === 'manual' || (mode === 'file' && uploadStatus === 'uploaded'))`.
- Pre-upload modal is ~200px shorter; no misleading "0 of 0 / No Data" sitting empty.
- Per user clarification: the gate also covers the 0-results case (table stays visible with "No Data" placeholder beneath the empty-result banner).

### 2026-05-04 (fourth) — File-card button colors

- Remove → `<button mat-stroked-button color="warn">` (Material's standard red).
- Upload / Retry → `<dx-button>` with default `'dxBtn'` class (primary teal).
- Added `MatButtonModule` to `dx-multi-lookup.module.ts`.

### 2026-05-04 (third) — File-uploader UX overhaul (file card + states)

- Drop zone now only for the empty state. After file pick, a compact file card replaces it.
- Three sub-states on the card: idle (`[✕ Remove] [↑ Upload]`), uploaded (`✓ Uploaded` badge + `[✕ Remove]`), failed (`✗ Failed` + `[✕ Remove] [↻ Retry]`).
- Empty-result handling: still shows `✓ Uploaded` on the card; banner reads "No valid site codes found in the uploaded file."
- Drop-zone height capped (`min-height: 150px; max-height: 200px`).
- Helper text simplified to `*File supported: .csv only (max 10 MB)`.
- New `uploadStatus` state field; reset/set across `acceptFile`, `onRemoveFile`, `onModeChange`, `onTabChange`, `onUploadFile`.

### 2026-05-04 (second) — Two small UX fixes

- Added `align="end"` to the chip-filter counter `<mat-hint>` (fixes Material's `getMatFormFieldDuplicatedHintError`).
- Added a CSV-mode `"X of Y items selected"` count banner.

### 2026-05-04 — Drop-zone polish (intermediate, before file-card overhaul)

- Hardcoded "Browse" as the picker button label (consumer's `fileUploadConfig.buttonLabel` no longer used in the new layout).
- ✓ tick removed from selected state (file presence without an error already implies validity).
- × remove icon switched from `cancel` (filled circle) → `close` (clean X) for clearer affordance.
- Inline error block centered with red color (`#d32f2f`) instead of left-aligned neutral.

(Most of these were superseded shortly after by the file-card overhaul, which restructured the selected-state UI entirely.)

### 2026-05-04 — Drag-and-drop file uploader

- Replaced the small button + chip layout with a proper drop zone (dashed border, cloud icon, Browse button + drag-and-drop handlers).
- Validation errors moved from toastr to inline (`fileError` field rendered in the drop zone, red).
- New methods: `onDragOver`, `onDragLeave`, `onFileDropped`, `formatFileSize`. Private `acceptFile()` shared between browse + drop.

### 2026-05-01 (second) — Two-step CSV upload

- Renamed `uploadedFile` → `selectedFile` (semantic accuracy: the field is set at pick time, not just after upload).
- Split `onFileSelected()` (validate + store; no API call) from new `onUploadFile()` (extracts the API call).
- New explicit `[Upload]` button on the file card; user can review/replace before triggering the call.
- Spec restructured: `onFileSelected` tests assert pick-only behavior; new `onUploadFile` test block covers success / flat-array / error / no-file paths.

### 2026-05-01 — Explicit Manual / CSV mode toggle

- Added `<dx-radio-button>` mode picker; `mode: 'manual' | 'file'` field; `onModeChange()` handler.
- Hide-not-disable: removed all `[disabled]="mode === 'file'"` bindings; wrapped manual sections in `@if (mode === 'manual')`.
- Old auto mode-flip behavior gone (mode is set exclusively by the toggle and tab change, not by upload outcome).
- `MatButtonModule`, `DxRadioButtonModule`, `FormsModule` imports added.

### 2026-04-30 (second) — Refresh / page-size triggered manual refetch in file mode

- Reported bug: clicking the table's refresh icon or changing page-size in CSV mode silently fired `getLookUpList()` and replaced the uploaded results with the manual list.
- Added defensive guards to `onPaginate`, `onHeaderActionClick`, `onSort`, `onClickTablePageSize` (return early when `mode === 'file'`).
- Set `setting.pagination = false` in `applyFileUploadResponse()` to hide the `<mat-paginator>` (and its page-size dropdown) — restored to `true` in `onRemoveFile()` / `onTabChange` reset. Refresh icon button itself stayed visible (no `setting.*` flag for it at this point) but the guard made it a safe no-op.

### 2026-04-30 (third) — Hide refresh / left-actions in file mode (later superseded by `hideToolbar`)

- Investigation revealed the refresh icon is rendered by `dx-paginator` from `setting.leftActions`, not by `dx-table` directly.
- Captured + cleared `setting.leftActions` / `setting.rightActions` in `applyFileUploadResponse`; restored in `onRemoveFile` / `onTabChange` via a new `restoreManualSettings()` helper that also re-enabled pagination.
- Result: refresh button + paginator + page-size all hidden in CSV mode. But the empty `.dx-pagination` wrapper still rendered as a thin strip (it had its own `*ngIf` independent of contents).

### 2026-04-30 (fourth) — `hideToolbar` flag on `DxTableSetting`

- To collapse the empty wrapper without `::ng-deep`, added `hideToolbar?: boolean` to `DxTableSetting`; `dx-table` template skips `<dx-paginator>` entirely when `true`.
- Replaced the manual leftActions/rightActions clearing logic with a single `setting.hideToolbar = true` toggle (cleaner; original `leftActions`/`rightActions` arrays no longer mutated).
- Three of the four handler guards (`onPaginate`, `onHeaderActionClick`, `onClickTablePageSize`) became unreachable in CSV mode and were removed. `onSort` guard kept (column-header sort is still reachable from `<th mat-sort-header>`, which isn't part of the toolbar).

### 2026-04-30 — Backend response shape fix

- The roster endpoint returns a flat array, not the paginated `{ content[] }` wrapper. `applyFileUploadResponse` now normalizes both shapes to a single `items: any[]`.
- Spec gained a flat-array success test case alongside the paginated one.

### 2026-04-28 — Initial implementation (Phases 0–5)

- Phase 0: `FileUploadConfig` interface + `fileUploadConfig?` field on `DxLookupModalConfig` (top-level + per-tab).
- Phase 1: Component state (`mode`, `uploadedFile`, `fileUploadLoading`, `fileUploadSubscription`); handlers (`onFileSelected` — initial single-step; `onRemoveFile`; `applyFileUploadResponse`; `isAcceptedFile`); wiring in `checkConfig`, `onTabChange`, `ngOnDestroy`.
- Phase 2: Template — upload row with hidden file input + button + chip; disabled filter inputs in file mode; hidden simple search row; banner gating.
- Phase 3: SCSS — basic chip + helper text styles using `currentColor` (no hardcoded colors introduced).
- Phase 4: Karma spec.
- Phase 5: Verification + parent-app wiring example.

### Naming change (early in the work)

- Renamed throughout from `bulk upload` → `file upload` to keep the field generic (`fileUploadConfig` works for any "upload a file → get records" lookup, not just the specific bulk-assign roster flow).
- Mappings: `BulkUploadConfig` → `FileUploadConfig`, `bulkUploadConfig` → `fileUploadConfig`, `mode: 'manual' | 'bulk'` → `mode: 'manual' | 'file'`, `onBulkFileSelected` → `onFileSelected`, etc.

