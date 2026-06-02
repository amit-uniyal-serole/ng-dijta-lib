import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface BorderToken {
  name: 'none' | 'sm' | 'md' | 'lg';
  token: string;
  value: string;
  px: number;
  usage: string;
}

export type BorderStyle = 'solid' | 'dashed' | 'dotted';
export type BorderColor = 'outline' | 'primary' | 'error' | 'success' | 'warning';
export type BorderSide = 'top' | 'right' | 'bottom' | 'left';

/**
 * Interactive border-width scale explorer showing none/sm/md/lg tokens,
 * live style, color and per-side controls applied to buttons, chips, inputs and cards,
 * and a complete `.dx-border-*` and `.dx-border-{side}-*` utility-class reference.
 *
 * @example
 * ```html
 * <dx-border></dx-border>
 * ```
 */
@Component({
  selector: 'dx-border',
  templateUrl: './dx-border.component.html',
  styleUrls: ['./dx-border.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxBorderComponent {
  selectedSize: 'none' | 'sm' | 'md' | 'lg' = 'sm';
  selectedStyle: BorderStyle = 'solid';
  selectedColor: BorderColor = 'outline';
  copiedClass: string | null = null;

  sides: Record<BorderSide, boolean> = {
    top: true, right: true, bottom: true, left: true,
  };

  readonly tokens: BorderToken[] = [
    { name: 'none', token: '--dx-border-none', value: '0px', px: 0, usage: 'No border'            },
    { name: 'sm',   token: '--dx-border-sm',   value: '1px', px: 1, usage: 'Inputs · cards'       },
    { name: 'md',   token: '--dx-border-md',   value: '2px', px: 2, usage: 'Focus rings · accents' },
    { name: 'lg',   token: '--dx-border-lg',   value: '4px', px: 4, usage: 'Emphasis · selected'  },
  ];

  readonly styles: { name: BorderStyle; label: string }[] = [
    { name: 'solid',  label: 'Solid'  },
    { name: 'dashed', label: 'Dashed' },
    { name: 'dotted', label: 'Dotted' },
  ];

  /** All colors come from the design-system token palette — no hardcoded values. */
  readonly colors: { name: BorderColor; label: string; cssVar: string }[] = [
    { name: 'outline', label: 'Outline', cssVar: 'var(--dx-outline, #e0e0e0)'    },
    { name: 'primary', label: 'Primary', cssVar: 'var(--dx-primary, #1f3bb3)'    },
    { name: 'error',   label: 'Error',   cssVar: 'var(--dx-error, #bd3232)'      },
    { name: 'success', label: 'Success', cssVar: 'var(--alert-success, #28a745)' },
    { name: 'warning', label: 'Warning', cssVar: 'var(--alert-warning, #ffa500)' },
  ];

  readonly sideKeys: { key: BorderSide; label: string }[] = [
    { key: 'top',    label: 'Top'    },
    { key: 'right',  label: 'Right'  },
    { key: 'bottom', label: 'Bottom' },
    { key: 'left',   label: 'Left'   },
  ];

  readonly borderNames = ['none', 'sm', 'md', 'lg'] as const;

  get selected(): BorderToken {
    return this.tokens.find(t => t.name === this.selectedSize)!;
  }

  get selectedColorCss(): string {
    return this.colors.find(c => c.name === this.selectedColor)!.cssVar;
  }

  get allSidesActive(): boolean {
    return this.sides.top && this.sides.right && this.sides.bottom && this.sides.left;
  }

  get noSidesActive(): boolean {
    return !this.sides.top && !this.sides.right && !this.sides.bottom && !this.sides.left;
  }

  get demoStyle(): Record<string, string> {
    const w = `var(${this.selected.token}, ${this.selected.value})`;
    const off = '0px';
    return {
      'border-top-width':    this.sides.top    ? w : off,
      'border-right-width':  this.sides.right  ? w : off,
      'border-bottom-width': this.sides.bottom ? w : off,
      'border-left-width':   this.sides.left   ? w : off,
      'border-style': this.selectedStyle,
      'border-color': this.selectedColorCss,
    };
  }

  get demoClass(): string {
    if (this.noSidesActive) return 'dx-border-none';
    if (this.allSidesActive) return `dx-border-${this.selectedSize}`;
    const active = this.sideKeys.filter(s => this.sides[s.key]);
    return active.map(s => `dx-border-${s.key}-${this.selectedSize}`).join(' ');
  }

  select(name: 'none' | 'sm' | 'md' | 'lg'): void { this.selectedSize = name; }
  selectStyle(style: BorderStyle): void            { this.selectedStyle = style; }
  selectColor(color: BorderColor): void            { this.selectedColor = color; }

  toggleSide(side: BorderSide): void {
    this.sides = { ...this.sides, [side]: !this.sides[side] };
  }

  toggleAll(): void {
    const next = !this.allSidesActive;
    this.sides = { top: next, right: next, bottom: next, left: next };
  }

  copyClass(cls: string): void {
    navigator.clipboard?.writeText(cls).then(() => {
      this.copiedClass = cls;
      setTimeout(() => (this.copiedClass = null), 1500);
    });
  }
}
