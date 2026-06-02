import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface BorderToken {
  name: 'none' | 'sm' | 'md' | 'lg';
  token: string;
  value: string;
  px: number;
  usage: string;
}

export type BorderStyle = 'solid' | 'dashed' | 'dotted';
export type BorderColor = 'outline' | 'primary' | 'error';

/**
 * Interactive border-width scale explorer showing none/sm/md/lg tokens,
 * live style and color controls applied to buttons, chips, inputs and cards,
 * and a complete `.dx-border-*` utility-class reference.
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

  readonly tokens: BorderToken[] = [
    { name: 'none', token: '--dx-border-none', value: '0px',  px: 0, usage: 'No border'           },
    { name: 'sm',   token: '--dx-border-sm',   value: '1px',  px: 1, usage: 'Inputs · cards'      },
    { name: 'md',   token: '--dx-border-md',   value: '2px',  px: 2, usage: 'Focus rings · accents'},
    { name: 'lg',   token: '--dx-border-lg',   value: '4px',  px: 4, usage: 'Emphasis · selected' },
  ];

  readonly styles: { name: BorderStyle; label: string }[] = [
    { name: 'solid',  label: 'Solid'  },
    { name: 'dashed', label: 'Dashed' },
    { name: 'dotted', label: 'Dotted' },
  ];

  readonly colors: { name: BorderColor; label: string; cssVar: string }[] = [
    { name: 'outline', label: 'Outline', cssVar: 'var(--dx-outline, #e0e0e0)'  },
    { name: 'primary', label: 'Primary', cssVar: 'var(--dx-primary, #1f3bb3)' },
    { name: 'error',   label: 'Error',   cssVar: 'var(--dx-error, #bd3232)'   },
  ];

  readonly borderNames = ['none', 'sm', 'md', 'lg'];

  get selected(): BorderToken {
    return this.tokens.find(t => t.name === this.selectedSize)!;
  }

  get selectedColorCss(): string {
    return this.colors.find(c => c.name === this.selectedColor)!.cssVar;
  }

  get demoStyle(): Record<string, string> {
    return {
      'border-width': `var(${this.selected.token}, ${this.selected.value})`,
      'border-style': this.selectedStyle,
      'border-color': this.selectedColorCss,
    };
  }

  get demoClass(): string {
    return `dx-border-${this.selectedSize}`;
  }

  select(name: 'none' | 'sm' | 'md' | 'lg'): void { this.selectedSize = name; }
  selectStyle(style: BorderStyle): void { this.selectedStyle = style; }
  selectColor(color: BorderColor): void { this.selectedColor = color; }

  copyClass(cls: string): void {
    navigator.clipboard?.writeText(cls).then(() => {
      this.copiedClass = cls;
      setTimeout(() => (this.copiedClass = null), 1500);
    });
  }
}
