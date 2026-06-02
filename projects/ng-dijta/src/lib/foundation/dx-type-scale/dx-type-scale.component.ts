import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface TypeLevel {
  label: string;
  cssClass: string;
  /** Matches the value of --dx-font-size-{scssKey} in _default.scss. */
  size: string;
  sizeToken: string;
  letterSpacing: string;
  lineHeight: string;
  scssKey: string;
}

export interface FontWeight {
  label: string;
  value: number;
  cssClass: string;
}

/**
 * Interactive type-scale explorer showing all heading, body, and caption
 * levels of the ng-dijta Manrope type system with live weight preview.
 *
 * @example
 * ```html
 * <dx-type-scale></dx-type-scale>
 * ```
 */
@Component({
  selector: 'dx-type-scale',
  templateUrl: './dx-type-scale.component.html',
  styleUrls: ['./dx-type-scale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxTypeScaleComponent {
  readonly fontFamilies: string[] = ['Manrope', 'Inter'];

  readonly levels: TypeLevel[] = [
    { label: 'H1',        cssClass: 'heading-1', size: '32.44px', sizeToken: '--dx-font-size-h1',        letterSpacing: '0.15px', lineHeight: '1', scssKey: 'h1'        },
    { label: 'H2',        cssClass: 'heading-2', size: '28.83px', sizeToken: '--dx-font-size-h2',        letterSpacing: '0px',    lineHeight: '1', scssKey: 'h2'        },
    { label: 'H3',        cssClass: 'heading-3', size: '25.63px', sizeToken: '--dx-font-size-h3',        letterSpacing: '0px',    lineHeight: '1', scssKey: 'h3'        },
    { label: 'H4',        cssClass: 'heading-4', size: '22.78px', sizeToken: '--dx-font-size-h4',        letterSpacing: '0.25px', lineHeight: '1', scssKey: 'h4'        },
    { label: 'H5',        cssClass: 'heading-5', size: '20.25px', sizeToken: '--dx-font-size-h5',        letterSpacing: '0px',    lineHeight: '1', scssKey: 'h5'        },
    { label: 'H6',        cssClass: 'heading-6', size: '18px',    sizeToken: '--dx-font-size-h6',        letterSpacing: '0.15px', lineHeight: '1', scssKey: 'h6'        },
    { label: 'Body',      cssClass: 'body',      size: '16px',    sizeToken: '--dx-font-size-body',      letterSpacing: '0.1px',  lineHeight: '1', scssKey: 'body'      },
    { label: 'SubBody',   cssClass: 'subbody',   size: '14px',    sizeToken: '--dx-font-size-subbody',   letterSpacing: '0.1px',  lineHeight: '1', scssKey: 'subbody'   },
    { label: 'Paragraph', cssClass: 'paragraph', size: '12px',    sizeToken: '--dx-font-size-paragraph', letterSpacing: '0.46px', lineHeight: '1', scssKey: 'paragraph' },
  ];

  readonly weights: FontWeight[] = [
    { label: 'ExtraLight 200', value: 200, cssClass: 'fw-extralight' },
    { label: 'Light 300',      value: 300, cssClass: 'fw-light' },
    { label: 'Regular 400',    value: 400, cssClass: 'fw-regular' },
    { label: 'Medium 500',     value: 500, cssClass: 'fw-medium' },
    { label: 'SemiBold 600',   value: 600, cssClass: 'fw-semibold' },
    { label: 'Bold 700',       value: 700, cssClass: 'fw-bold' },
    { label: 'ExtraBold 800',  value: 800, cssClass: 'fw-extrabold' },
  ];

  selectedFamily = 'Manrope';
  selectedLevelKey = 'heading-1';

  get selectedLevel(): TypeLevel | null {
    return this.levels.find(l => l.cssClass === this.selectedLevelKey) ?? null;
  }

  get classSnippet(): string {
    const l = this.selectedLevel;
    if (!l) return '';
    return `<div class="dx-typography">\n  <p class="${l.cssClass}">Your text here</p>\n</div>`;
  }

  get scssSnippet(): string {
    const l = this.selectedLevel;
    if (!l) return '';
    return `.my-element {\n  font-size: var(${l.sizeToken}, ${l.size});\n  letter-spacing: ${l.letterSpacing};\n  line-height: ${l.lineHeight};\n}`;
  }
}
