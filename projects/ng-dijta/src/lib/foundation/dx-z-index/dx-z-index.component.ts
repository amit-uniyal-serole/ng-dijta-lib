import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface ZIndexToken {
  name: string;
  token: string;
  value: number;
  usage: string;
}

export type UsageMode = 'variable' | 'class';

/**
 * Interactive z-index scale explorer showing all 14 `--dx-z-*` stacking
 * layers — from `hide` (-1) to `notification` (1200) — with a live stacking
 * demo and a dual CSS-variable / utility-class reference table.
 *
 * @example
 * ```html
 * <dx-z-index></dx-z-index>
 * ```
 */
@Component({
  selector: 'dx-z-index',
  templateUrl: './dx-z-index.component.html',
  styleUrls: ['./dx-z-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxZIndexComponent {
  selectedToken = 'modal';
  usageMode: UsageMode = 'variable';
  copiedItem: string | null = null;

  readonly tokens: ZIndexToken[] = [
    { name: 'hide',               token: '--dx-z-hide',               value:   -1, usage: 'Visually hidden below stacking context'  },
    { name: 'base',               token: '--dx-z-base',               value:    1, usage: 'Default stacked element'                 },
    { name: 'dropdown',           token: '--dx-z-dropdown',           value: 1000, usage: 'Dropdowns · floating menus'              },
    { name: 'sticky',             token: '--dx-z-sticky',             value: 1020, usage: 'Sticky headers / columns'               },
    { name: 'fixed',              token: '--dx-z-fixed',              value: 1030, usage: 'Fixed positioned bars'                  },
    { name: 'offcanvas-backdrop', token: '--dx-z-offcanvas-backdrop', value: 1040, usage: 'Offcanvas overlay backdrop'             },
    { name: 'offcanvas',          token: '--dx-z-offcanvas',          value: 1045, usage: 'Offcanvas panel'                        },
    { name: 'modal-backdrop',     token: '--dx-z-modal-backdrop',     value: 1050, usage: 'Modal overlay backdrop'                 },
    { name: 'modal',              token: '--dx-z-modal',              value: 1055, usage: 'Modal dialog'                           },
    { name: 'popover',            token: '--dx-z-popover',            value: 1070, usage: 'Popovers'                               },
    { name: 'tooltip',            token: '--dx-z-tooltip',            value: 1080, usage: 'Tooltips'                               },
    { name: 'toast',              token: '--dx-z-toast',              value: 1090, usage: 'Toast / snackbar notifications'         },
    { name: 'loader',             token: '--dx-z-loader',             value: 1100, usage: 'Full-page loading overlay'              },
    { name: 'notification',       token: '--dx-z-notification',       value: 1200, usage: 'System-level notification banner'       },
  ];

  get selected(): ZIndexToken {
    return this.tokens.find(t => t.name === this.selectedToken) ?? this.tokens[8];
  }

  get stackLayers(): ZIndexToken[] {
    return this.tokens.filter(t => t.value > 0).slice(0, 7);
  }

  /** CSS property snippet for the selected token */
  get variableSnippet(): string {
    return `z-index: var(${this.selected.token});`;
  }

  /** HTML class snippet for the selected token */
  get classSnippet(): string {
    return `<div class="dx-z-${this.selected.name}">`;
  }

  select(name: string): void { this.selectedToken = name; }
  setMode(mode: UsageMode): void { this.usageMode = mode; }

  copy(text: string): void {
    navigator.clipboard?.writeText(text).then(() => {
      this.copiedItem = text;
      setTimeout(() => (this.copiedItem = null), 1500);
    });
  }

  isCopied(text: string): boolean { return this.copiedItem === text; }

  cssVarOf(token: ZIndexToken): string { return `z-index: var(${token.token})`; }
  classOf(token: ZIndexToken): string  { return `dx-z-${token.name}`; }
}
