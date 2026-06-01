---
category: Components
type: Data Display
title: Avatar
---

A user / entity avatar with a fallback chain across image sources (custom image, social IDs, Gravatar) and an automatic initials fallback. Supports status badges, a footer badge, image upload, and a companion `DxAvatarGroupComponent` for stacked groups.

## When To Use

- Showing the current user's profile image in headers, menus, and lists.
- Displaying a contact / assignee avatar in tables and cards.
- Falling back gracefully from a missing image to initials or a default logo.
- Rendering a status indicator (online / off / warning) on the avatar.

## API

```html
<ndx-avatar
  [name]="user.name"
  [src]="user.photoUrl"
  [avatarSettings]="{ size: 40, round: true }">
</ndx-avatar>
```

### ndx-avatar

| Parameter | Description | Type | Default |
|-----------|-------------|------|---------|
| `[avatarSettings]` | Size, color, shape, and style config | `NgDxAvatarSettings` | - |
| `[footerBadge]` | Badge shown on the bottom of the avatar | `DxAvatarFooterBadge` | - |
| `[avatarStatus]` | Status dot / icon and position | `AvatarStatus` | - |
| `[src]` | Custom image URL (highest priority) | `string \| null` | - |
| `[icon]` | Material icon to render as the avatar | `string \| null` | - |
| `[name]` | Display name used to derive initials | `string \| null` | - |
| `[value]` | Key used for deterministic color hashing | `string \| null` | - |
| `[isCompanyLogo]` | Use the default company-logo fallback | `boolean` | `false` |
| `[isRecordProfile]` | Record-profile layout (non-round corners) | `boolean` | `false` |
| `[facebookId]` | Facebook source id | `string \| null` | - |
| `[twitterId]` | Twitter source id | `string \| null` | - |
| `[googleId]` | Google source id | `string \| null` | - |
| `[instagramId]` | Instagram source id | `string \| null` | - |
| `[vkontakteId]` | VKontakte source id | `string \| null` | - |
| `[skypeId]` | Skype source id | `string \| null` | - |
| `[gravatarId]` | Gravatar hash / email | `string \| null` | - |
| `[githubId]` | GitHub source id | `string \| null` | - |

### Events

| Event | Description | Type |
|-------|-------------|------|
| `(clickOnAvatar)` | Emitted when the avatar is clicked; payload is the resolved `Source` | `EventEmitter<Source>` |
| `(onImageUpload)` | Emitted with the selected `FileList` when image upload is enabled | `EventEmitter<FileList>` |

### Methods

| Method | Description | Signature |
|--------|-------------|-----------|
| `open()` | Opens the image preview for the current avatar | `(): void` |

### Types

```typescript
interface NgDxAvatarSettings {
  round?: boolean;
  size?: string | number;
  textSizeRatio?: number;
  bgColor?: string;
  fgColor?: string;
  borderColor?: string;
  style?: Partial<CSSStyleDeclaration>;
  cornerRadius?: string | number;
  placeholder?: string;
  initialsSize?: string | number;
  avatarSrc?: string;
  isImageUpload?: boolean;
}

interface AvatarStatus {
  color?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  icon?: string;    // material icon name
  toolTip?: string;
}

interface DxAvatarFooterBadge {
  title: string;
  backgroundColor: string;
  color?: string;
  borderRadius?: string;
}
```

## Examples

### Image with initials fallback

```html
<ndx-avatar
  [name]="user.fullName"
  [src]="user.photoUrl"
  [avatarSettings]="{ size: 48, round: true, fgColor: '#fff' }">
</ndx-avatar>
```

### With status indicator

```html
<ndx-avatar
  [name]="user.fullName"
  [avatarStatus]="{ color: '#22c55e', position: 'bottom-right', toolTip: 'Online' }"
  [avatarSettings]="{ size: 40 }">
</ndx-avatar>
```

### Company logo with footer badge

```html
<ndx-avatar
  [src]="company.logoUrl"
  [isCompanyLogo]="true"
  [footerBadge]="{ title: 'PRO', backgroundColor: '#0f766e', color: '#fff' }"
  [avatarSettings]="{ size: 64, round: false, cornerRadius: 8 }">
</ndx-avatar>
```

### Image upload

```html
<ndx-avatar
  [name]="user.fullName"
  [avatarSettings]="{ size: 96, isImageUpload: true }"
  (onImageUpload)="handleUpload($event)">
</ndx-avatar>
```

## Import

```typescript
import { DxAvatarModule } from '@ngdx/dijta';

@NgModule({ imports: [DxAvatarModule] })
export class YourModule { }
```
