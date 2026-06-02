import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DxIconFontSet, DxIconSize } from './dx-icon.component';

export interface IconSizeToken {
  name: DxIconSize;
  rem: string;
  px: number;
  usage: string;
}

export interface IconFontSetOption {
  name: DxIconFontSet;
  label: string;
  description: string;
}

/**
 * Interactive foundation explorer for the `dx-icon` primitive.
 * Shows all size steps, font-set variants, accessibility patterns, and a
 * searchable gallery of common Material icon names with copy-to-clipboard.
 *
 * @example
 * ```html
 * <dx-icon-explorer></dx-icon-explorer>
 * ```
 */
@Component({
  selector: 'dx-icon-explorer',
  templateUrl: './dx-icon-explorer.component.html',
  styleUrls: ['./dx-icon-explorer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxIconExplorerComponent {
  selectedSize: DxIconSize = 'md';
  selectedFontSet: DxIconFontSet = 'filled';
  searchQuery = '';
  copiedIcon: string | null = null;

  readonly sizes: IconSizeToken[] = [
    { name: 'xs', rem: '1rem',    px: 16, usage: 'Dense lists, breadcrumbs, inline labels' },
    { name: 'sm', rem: '1.25rem', px: 20, usage: 'Form field adornments, compact actions'  },
    { name: 'md', rem: '1.5rem',  px: 24, usage: 'Default — buttons, menu items, cards'    },
    { name: 'lg', rem: '2rem',    px: 32, usage: 'Section headers, feature callouts'        },
    { name: 'xl', rem: '3rem',    px: 48, usage: 'Empty states, hero illustrations'         },
  ];

  readonly fontSets: IconFontSetOption[] = [
    { name: 'filled',   label: 'Filled',   description: 'Solid form — default, highest contrast' },
    { name: 'outlined', label: 'Outlined', description: 'Stroked form — lighter, structural'      },
    { name: 'rounded',  label: 'Rounded',  description: 'Soft corners — friendly, consumer UIs'   },
    { name: 'sharp',    label: 'Sharp',    description: 'Angular corners — technical, data-heavy'  },
  ];

  readonly sampleIcons = [
    'star', 'favorite', 'home', 'settings', 'notifications',
    'search', 'close', 'check', 'add', 'delete',
  ];

  readonly allIcons: string[] = [
    // Actions
    'search', 'add', 'close', 'check', 'delete', 'edit', 'more_vert', 'more_horiz',
    'settings', 'tune', 'filter_list', 'sort', 'refresh', 'sync', 'done', 'done_all',
    'block', 'report', 'flag', 'bookmark', 'star', 'favorite', 'share', 'send',
    'copy_all', 'content_copy', 'content_cut', 'content_paste', 'undo', 'redo',
    // Navigation
    'home', 'menu', 'arrow_back', 'arrow_forward', 'arrow_upward', 'arrow_downward',
    'chevron_left', 'chevron_right', 'expand_more', 'expand_less', 'open_in_new',
    'launch', 'first_page', 'last_page', 'navigate_before', 'navigate_next',
    // Communication
    'email', 'phone', 'chat', 'message', 'notifications', 'notifications_none',
    'person', 'people', 'group', 'account_circle', 'contact_mail', 'call',
    // Files
    'folder', 'folder_open', 'insert_drive_file', 'description', 'article',
    'attach_file', 'link', 'download', 'upload', 'cloud_upload', 'cloud_download',
    // Alerts
    'info', 'info_outline', 'warning', 'error', 'error_outline',
    'check_circle', 'check_circle_outline', 'cancel', 'help', 'help_outline',
    // Media
    'image', 'photo', 'play_arrow', 'pause', 'stop', 'skip_next', 'skip_previous',
    'volume_up', 'volume_off', 'music_note', 'mic', 'camera',
    // Visibility
    'visibility', 'visibility_off', 'lock', 'lock_open', 'vpn_key',
    // Data
    'bar_chart', 'pie_chart', 'show_chart', 'table_chart', 'dashboard',
    'trending_up', 'trending_down', 'insights', 'analytics',
  ];

  get filteredIcons(): string[] {
    const q = this.searchQuery.trim().toLowerCase();
    return q ? this.allIcons.filter(n => n.includes(q)) : this.allIcons;
  }

  get selected(): IconSizeToken {
    return this.sizes.find(s => s.name === this.selectedSize) ?? this.sizes[2];
  }

  selectSize(size: DxIconSize): void { this.selectedSize = size; }
  selectFontSet(fs: DxIconFontSet): void { this.selectedFontSet = fs; }

  copyIcon(name: string): void {
    navigator.clipboard?.writeText(name).then(() => {
      this.copiedIcon = name;
      setTimeout(() => (this.copiedIcon = null), 1500);
    });
  }
}
