import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface RadiusToken {
  name: 'sm' | 'md' | 'lg' | 'circle';
  token: string | null;
  value: string;
  px: number | null;
  usage: string;
}

export interface RadiusGroup {
  property: string;
  cssProperty: string;
  prefix: string;
}

export type RadiusDirection = 'all' | 'top' | 'bottom' | 'start' | 'end';

/**
 * Interactive border-radius scale explorer showing sm/md/lg/circle tokens,
 * live directional demos applied to buttons, chips, inputs and cards,
 * and a complete `.dx-rounded-*` utility-class reference.
 *
 * @example
 * ```html
 * <dx-border-radius></dx-border-radius>
 * ```
 */
@Component({
  selector: 'dx-border-radius',
  templateUrl: './dx-border-radius.component.html',
  styleUrls: ['./dx-border-radius.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxBorderRadiusComponent {
  selectedSize: 'sm' | 'md' | 'lg' | 'circle' = 'md';
  selectedDirection: RadiusDirection = 'all';
  copiedClass: string | null = null;

  readonly tokens: RadiusToken[] = [
    { name: 'sm',     token: '--dx-radius-sm',     value: '0.25rem', px: 5,    usage: 'Chips · small inputs'    },
    { name: 'md',     token: '--dx-radius-md',     value: '0.5rem',  px: 10,   usage: 'Cards · buttons'         },
    { name: 'lg',     token: '--dx-radius-lg',     value: '1rem',    px: 20,   usage: 'Modals · large surfaces' },
    { name: 'circle', token: '--dx-radius-circle', value: '50%',     px: null, usage: 'Avatars · icons · dots'  },
  ];

  readonly directions: { name: RadiusDirection; label: string; corners: string }[] = [
    { name: 'all',    label: 'All',    corners: '◤◥◣◢' },
    { name: 'top',    label: 'Top',    corners: '◤◥' },
    { name: 'bottom', label: 'Bottom', corners: '◣◢' },
    { name: 'start',  label: 'Start',  corners: '◤◣' },
    { name: 'end',    label: 'End',    corners: '◥◢' },
  ];

  readonly radiusNames = ['0', 'sm', 'md', 'lg', 'circle'];

  readonly radiusGroups: RadiusGroup[] = [
    { property: 'all corners',    cssProperty: 'border-radius',                            prefix: 'dx-rounded'        },
    { property: 'top corners',    cssProperty: 'border-top-left + border-top-right',       prefix: 'dx-rounded-top'    },
    { property: 'bottom corners', cssProperty: 'border-bottom-left + border-bottom-right', prefix: 'dx-rounded-bottom' },
    { property: 'start (left)',   cssProperty: 'border-top-left + border-bottom-left',     prefix: 'dx-rounded-start'  },
    { property: 'end (right)',    cssProperty: 'border-top-right + border-bottom-right',   prefix: 'dx-rounded-end'    },
  ];

  get selected(): RadiusToken {
    return this.tokens.find(t => t.name === this.selectedSize)!;
  }

  get demoClass(): string {
    const dir = this.selectedDirection === 'all' ? '' : `-${this.selectedDirection}`;
    return `dx-rounded${dir}-${this.selectedSize}`;
  }

  get demoStyles(): Record<string, string> {
    const val = this.radiusStyle(this.selected);
    const d = this.selectedDirection;
    return {
      'border-top-left-radius':     (d === 'all' || d === 'top'    || d === 'start') ? val : '0',
      'border-top-right-radius':    (d === 'all' || d === 'top'    || d === 'end')   ? val : '0',
      'border-bottom-left-radius':  (d === 'all' || d === 'bottom' || d === 'start') ? val : '0',
      'border-bottom-right-radius': (d === 'all' || d === 'bottom' || d === 'end')   ? val : '0',
    };
  }

  select(name: 'sm' | 'md' | 'lg' | 'circle'): void { this.selectedSize = name; }
  selectDirection(dir: RadiusDirection): void { this.selectedDirection = dir; }

  radiusStyle(token: RadiusToken): string {
    return token.token ? `var(${token.token})` : token.value;
  }

  copyClass(cls: string): void {
    navigator.clipboard?.writeText(cls).then(() => {
      this.copiedClass = cls;
      setTimeout(() => (this.copiedClass = null), 1500);
    });
  }
}
