import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

export type DxIconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type DxIconFontSet = 'filled' | 'outlined' | 'rounded' | 'sharp';

/**
 * Token-aligned wrapper around `mat-icon` that standardises sizing,
 * font-set selection, and aria-hidden handling across the library.
 * Decorative icons are hidden from assistive technology by default;
 * pass `ariaLabel` to make an icon semantic.
 *
 * @example
 * ```html
 * <!-- Decorative (aria-hidden applied automatically) -->
 * <dx-icon name="close"></dx-icon>
 *
 * <!-- Semantic — screen-reader visible -->
 * <dx-icon name="notifications" [ariaLabel]="'dx.aria.notifications' | transloco"></dx-icon>
 *
 * <!-- Size and font-set -->
 * <dx-icon name="star" size="lg" fontSet="outlined"></dx-icon>
 *
 * <!-- SVG icon registered with MatIconRegistry -->
 * <dx-icon svgIcon="dx-logo" size="xl"></dx-icon>
 * ```
 */
@Component({
  selector: 'dx-icon',
  templateUrl: './dx-icon.component.html',
  styleUrls: ['./dx-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dx-icon' },
})
export class DxIconComponent {
  /** Material icon ligature name (e.g. `"close"`, `"notifications"`). @default '' */
  @Input() name = '';

  /** SVG icon key registered with `MatIconRegistry`. Mutually exclusive with `name`. @default '' */
  @Input() svgIcon = '';

  /**
   * Icon font variant. Maps to the `material-icons-*` CSS class family.
   * Use `'filled'` for the default solid style; `'outlined'` for stroked icons.
   * @default 'filled'
   */
  @Input() fontSet: DxIconFontSet = 'filled';

  /**
   * Token-based size step. Keeps icons in rhythm with the spacing scale.
   * xs=16px · sm=20px · md=24px · lg=32px · xl=48px
   * @default 'md'
   */
  @Input() size: DxIconSize = 'md';

  /**
   * Accessible label for semantic (non-decorative) icons.
   * When provided the icon is announced by assistive technology and
   * `aria-hidden` is removed from the host element.
   * Use the Transloco pipe: `[ariaLabel]="'dx.aria.key' | transloco"`.
   */
  @Input() ariaLabel: string | undefined;

  /** Decorative icons are hidden by default; providing ariaLabel lifts the restriction. */
  @HostBinding('attr.aria-hidden')
  get hostAriaHidden(): string | null {
    return this.ariaLabel ? null : 'true';
  }

  @HostBinding('attr.aria-label')
  get hostAriaLabel(): string | null {
    return this.ariaLabel ?? null;
  }

  get resolvedFontSet(): string {
    return this.fontSet === 'filled' ? '' : `material-icons-${this.fontSet}`;
  }
}
