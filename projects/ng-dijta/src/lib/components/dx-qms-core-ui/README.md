---
category: Components
type: Data Entry
title: Evidence Upload
---

An evidence-file upload panel used for QMS quote and endorsement workflows. Handles multiple file uploads per verification item, file-size/type validation, inline status editing, downloading (including multi-file ZIP), and deletion through a configurable backend.

## When To Use

- When a business workflow requires attaching supporting documents against a list of verification items (e.g. quotes, endorsements).
- When users must edit file status, comments, and verification metadata inline.
- When sales or agent users need different views (filtered vs. full) of the same evidence list.

## API

```html
<dx-evidence-upload
  [evidenceList]="evidenceList"
  [statusList]="statusList"
  [rootUrl]="rootUrl"
  [quoteNr]="quoteNr"
  [actions]="['UPLOAD', 'DOWNLOAD', 'EDIT', 'DELETE']"
  (evidenceListEmit)="onEvidenceUpdated($event)">
</dx-evidence-upload>
```

### dx-evidence-upload

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[evidenceList]` | Master list of evidence items to upload | `EvidenceModel[]` | `[]` |
| `[statusList]` | Available status values for each evidence row | `KeyValueModel[]` | - |
| `[rootUrl]` | Base URL for evidence upload/download/delete endpoints | `string` | - |
| `[quoteNr]` | Identifier of the owning quote/endorsement record | `string` | - |
| `[productCd]` | Product code routing payloads to the correct backend | `string` | - |
| `[initialEvidenceUploadStatus]` | Default status applied to newly uploaded files | `string` | `'TBVD'` |
| `[evidenceTitle]` | Heading shown above the evidence list | `string` | `''` |
| `[showFilteredUploadedEvidenceList]` | Show only rows that have an uploaded file | `boolean` | `true` |
| `[disabledEvidenceUpload]` | Disables file upload controls | `boolean` | `false` |
| `[disabledUploadLater]` | Disables the "upload later" checkbox | `boolean` | `false` |
| `[uploadLaterVisible]` | Shows the "upload later" checkbox | `boolean` | `false` |
| `[fileSizeinByte]` | Maximum allowed file size in bytes | `number` | `10485760` |
| `[isAgent]` | Applies agent-specific filtering | `boolean` | `false` |
| `[isSales]` | Applies sales-user behavior (auto-verify, filtered view) | `boolean` | `false` |
| `[loginUser]` | Current user id, stamped on save/edit operations | `string` | - |
| `[actions]` | Action permissions available on each row | `DxEvidenceActionPermission[]` | - |
| `[quote]` | Quote DTO used to patch the attachment form | `any` | - |
| `[customNoEvidenceMsg]` | Message shown when no evidence rows are present | `string` | - |
| `[specialDocTypes]` | Values of `valueTt` treated as multi-file document types | `string[]` | - |
| `[mandatoryDocTypes]` | Values of `valueTt` that are mandatory uploads | `string[]` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(evidenceListEmit)` | Emits the current evidence list after uploads/edits/deletes | `EventEmitter<KeyValueModel[]>` |
| `(sendUploadCheckbox)` | Emits the checked state of the "upload later" checkbox | `EventEmitter<boolean>` |

### Types

```typescript
type DxEvidenceActionPermission = 'EDIT' | 'SAVE' | 'UPLOAD' | 'DELETE' | 'DOWNLOAD';

interface EvidenceModel extends KeyValueModel {
  fileObject?: any;
  statusCd?: string;
  comments?: string;
  verifiedBy?: string;
  verifiedDate?: string;
  descriptionTt?: string;
  groupId?: string;
  gEId?: number;
}
```

## Examples

### Basic upload panel

```html
<dx-evidence-upload
  [evidenceList]="evidenceList"
  [statusList]="statusList"
  [rootUrl]="apiRootUrl"
  [quoteNr]="quoteNumber"
  [loginUser]="currentUserId"
  [actions]="['UPLOAD', 'DOWNLOAD']"
  (evidenceListEmit)="onEvidenceUpdated($event)">
</dx-evidence-upload>
```

### Agent view with upload-later option

```html
<dx-evidence-upload
  [evidenceList]="evidenceList"
  [statusList]="statusList"
  [rootUrl]="apiRootUrl"
  [quoteNr]="quoteNumber"
  [isAgent]="true"
  [uploadLaterVisible]="true"
  (sendUploadCheckbox)="onUploadLaterChange($event)">
</dx-evidence-upload>
```

## Import

```typescript
import { DxQmsCoreUiModule } from '@ngdx/dijta';

@NgModule({
  imports: [DxQmsCoreUiModule]
})
export class YourModule { }
```
