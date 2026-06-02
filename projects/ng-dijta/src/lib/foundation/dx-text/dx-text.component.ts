import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface TextColorToken {
  label: string;
  token: string;
  cssVar: string;
  hex: string;
}

export interface TypeScaleRow {
  label: string;
  key: string;
  sizeToken: string;
  sizePx: string;
  defaultWeight: number;
}

/**
 * Text color and type-scale explorer — shows every text color token from
 * the design-system palette applied across all type-scale size levels.
 *
 * @example
 * ```html
 * <dx-text></dx-text>
 * ```
 */
@Component({
  selector: 'dx-text',
  templateUrl: './dx-text.component.html',
  styleUrls: ['./dx-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DxTextComponent {
  selectedColorToken = '--dx-on-surface';
  selectedWeight = 400;

  /** All text colors sourced from the design-system palette tokens only. */
  readonly colors: TextColorToken[] = [
    { label: 'Primary',   token: '--dx-on-surface',         cssVar: 'var(--dx-on-surface, #2f2f2f)',         hex: '#2f2f2f' },
    { label: 'Muted',     token: '--dx-on-surface-variant', cssVar: 'var(--dx-on-surface-variant, #667085)', hex: '#667085' },
    { label: 'Brand',     token: '--dx-primary',            cssVar: 'var(--dx-primary, #1f3bb3)',            hex: '#1f3bb3' },
    { label: 'Error',     token: '--dx-error',              cssVar: 'var(--dx-error, #bd3232)',              hex: '#bd3232' },
    { label: 'Success',   token: '--alert-success',         cssVar: 'var(--alert-success, #28a745)',         hex: '#28a745' },
    { label: 'Warning',   token: '--alert-warning',         cssVar: 'var(--alert-warning, #ffa500)',         hex: '#ffa500' },
    { label: 'Info',      token: '--alert-information',     cssVar: 'var(--alert-information, #007bff)',     hex: '#007bff' },
  ];

  readonly weights: { label: string; value: number }[] = [
    { label: '200 — ExtraLight', value: 200 },
    { label: '300 — Light',      value: 300 },
    { label: '400 — Regular',    value: 400 },
    { label: '500 — Medium',     value: 500 },
    { label: '600 — SemiBold',   value: 600 },
    { label: '700 — Bold',       value: 700 },
    { label: '800 — ExtraBold',  value: 800 },
  ];

  /** Mirrors the canonical $fontsize map in theme/typography/_variables.scss. */
  readonly scale: TypeScaleRow[] = [
    { label: 'H1',        key: 'h1',        sizeToken: '--dx-font-size-h1',        sizePx: '32.44px', defaultWeight: 700 },
    { label: 'H2',        key: 'h2',        sizeToken: '--dx-font-size-h2',        sizePx: '28.83px', defaultWeight: 700 },
    { label: 'H3',        key: 'h3',        sizeToken: '--dx-font-size-h3',        sizePx: '25.63px', defaultWeight: 600 },
    { label: 'H4',        key: 'h4',        sizeToken: '--dx-font-size-h4',        sizePx: '22.78px', defaultWeight: 600 },
    { label: 'H5',        key: 'h5',        sizeToken: '--dx-font-size-h5',        sizePx: '20.25px', defaultWeight: 600 },
    { label: 'H6',        key: 'h6',        sizeToken: '--dx-font-size-h6',        sizePx: '18px',    defaultWeight: 600 },
    { label: 'Body',      key: 'body',      sizeToken: '--dx-font-size-body',      sizePx: '16px',    defaultWeight: 400 },
    { label: 'SubBody',   key: 'subbody',   sizeToken: '--dx-font-size-subbody',   sizePx: '14px',    defaultWeight: 400 },
    { label: 'Paragraph', key: 'paragraph', sizeToken: '--dx-font-size-paragraph', sizePx: '12px',    defaultWeight: 400 },
  ];

  get selectedColor(): TextColorToken {
    return this.colors.find(c => c.token === this.selectedColorToken) ?? this.colors[0];
  }

  selectColor(token: string): void {
    this.selectedColorToken = token;
  }

  selectWeight(value: number): void {
    this.selectedWeight = value;
  }
}
