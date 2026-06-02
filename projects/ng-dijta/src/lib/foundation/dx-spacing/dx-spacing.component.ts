import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface SpacingStep {
  index: number;
  value: number;
  label: string;
  px: number;
  token: string | null;
}

export interface UtilityGroup {
  property: string;
  cssProperty: string;
  prefix: string;
}

/**
 * Interactive spacing-scale explorer showing the 6-step Bootstrap-compatible
 * `$spacers` scale with live padding, margin, and gap visualisation,
 * plus a complete utility-class reference table.
 *
 * @example
 * ```html
 * <dx-spacing></dx-spacing>
 * ```
 */
@Component({
  selector: 'dx-spacing',
  templateUrl: './dx-spacing.component.html',
  styleUrls: ['./dx-spacing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxSpacingComponent {
  activeType: 'padding' | 'margin' | 'gap' = 'padding';
  selectedStep = 3;
  copiedClass: string | null = null;

  readonly steps: SpacingStep[] = [
    { index: 0, value: 0,    label: '0',       px: 0,  token: null },
    { index: 1, value: 0.25, label: '0.25rem', px: 5,  token: '--dx-spacing-xs' },
    { index: 2, value: 0.5,  label: '0.5rem',  px: 10, token: '--dx-spacing-sm' },
    { index: 3, value: 1,    label: '1rem',    px: 20, token: '--dx-spacing-md' },
    { index: 4, value: 1.5,  label: '1.5rem',  px: 30, token: '--dx-spacing-lg' },
    { index: 5, value: 2,    label: '2rem',    px: 40, token: '--dx-spacing-xl' },
  ];

  readonly utilityGroups: UtilityGroup[] = [
    { property: 'padding',        cssProperty: 'padding',                      prefix: 'p'          },
    { property: 'padding-x',      cssProperty: 'padding-left + padding-right', prefix: 'px'         },
    { property: 'padding-y',      cssProperty: 'padding-top + padding-bottom', prefix: 'py'         },
    { property: 'padding-top',    cssProperty: 'padding-top',                  prefix: 'pt'         },
    { property: 'padding-bottom', cssProperty: 'padding-bottom',               prefix: 'pb'         },
    { property: 'padding-start',  cssProperty: 'padding-left',                 prefix: 'ps'         },
    { property: 'padding-end',    cssProperty: 'padding-right',                prefix: 'pe'         },
    { property: 'margin',         cssProperty: 'margin',                       prefix: 'm'          },
    { property: 'margin-x',       cssProperty: 'margin-left + margin-right',   prefix: 'mx'         },
    { property: 'margin-y',       cssProperty: 'margin-top + margin-bottom',   prefix: 'my'         },
    { property: 'margin-top',     cssProperty: 'margin-top',                   prefix: 'mt'         },
    { property: 'margin-bottom',  cssProperty: 'margin-bottom',                prefix: 'mb'         },
    { property: 'margin-start',   cssProperty: 'margin-left',                  prefix: 'ms'         },
    { property: 'margin-end',     cssProperty: 'margin-right',                 prefix: 'me'         },
    { property: 'gap',            cssProperty: 'gap',                          prefix: 'gap'        },
    { property: 'row-gap',        cssProperty: 'row-gap',                      prefix: 'row-gap'    },
    { property: 'column-gap',     cssProperty: 'column-gap',                   prefix: 'column-gap' },
  ];

  get selected(): SpacingStep { return this.steps[this.selectedStep]; }

  get demoClass(): string {
    const prefix = this.activeType === 'padding' ? 'p'
                 : this.activeType === 'margin'  ? 'm'
                 : 'gap';
    return `${prefix}-${this.selectedStep}`;
  }

  selectStep(index: number): void { this.selectedStep = index; }

  copyClass(cls: string): void {
    navigator.clipboard?.writeText(cls).then(() => {
      this.copiedClass = cls;
      setTimeout(() => (this.copiedClass = null), 1500);
    });
  }
}
