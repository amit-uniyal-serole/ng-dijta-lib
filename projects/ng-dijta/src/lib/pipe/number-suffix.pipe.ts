import { Pipe, PipeTransform, inject, LOCALE_ID, Optional, Inject } from '@angular/core';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../core/UI/service/input/ui-component.config';
import { DisplayDigitsType } from '../core/UI/constant/currency-default';
type Unit = { threshold: number; suffix: '' | 'K' | 'M' | 'B' | 'T'; divisor: number };

@Pipe({
  name: 'numberSuffix',
  pure: true,
  standalone: true,
//   providers: [DecimalPipe],
})
export class NumberSuffixPipe implements PipeTransform {
  private defaultLocale = inject(LOCALE_ID);

  // Units ordered from largest → smallest
  private units: Unit[] = [
    { threshold: 1e12, suffix: 'T', divisor: 1e12 }, // Trillions
    { threshold: 1e9,  suffix: 'B', divisor: 1e9  }, // Billions
    { threshold: 1e6,  suffix: 'M', divisor: 1e6  }, // Millions
    { threshold: 1e3,  suffix: 'K', divisor: 1e3  }, // Thousands
    { threshold: 0,    suffix: '',  divisor: 1    }, // Less than 1000 → no suffix
  ];

  constructor(
    @Optional()
    @Inject(UI_COMPONENT_CONFIG) public config: UIConfigWrapper
  ) {}

  /**
   * Transforms a number into a compact format with suffix (K, M, B, T).
   *
   * Examples:
   *   1234       → 1.23K
   *   1234567.44 → 1.2346M
   *   987654321  → 987.65M
   *
   * @param value        Number to format
   * @param locale       Optional locale (default = app locale)
   * @param minDecimals  Minimum decimals (default = smart adaptive)
   * @param maxDecimals  Maximum decimals (default = smart adaptive)
   */
  transform(
    value: number | null | undefined,
    locale?: string,
    minDecimals?: number,
    maxDecimals?: number
  ): string {
    if (value === null || value === undefined || isNaN(value)) return '';

    const usedLocale = (locale  || this.getLocal()) || this.defaultLocale;
    const sign = value < 0 ? '-' : '';
    const abs = Math.abs(value);

    // Pick appropriate unit (largest whose threshold <= value)
    let unit = this.units.find(u => abs >= u.threshold)!;
    let scaled = value / unit.divisor;

    // Smart decimals:
    // < 10 → up to 4 decimals
    // < 100 → up to 3 decimals
    // >= 100 → up to 1 decimal
    let min = minDecimals ?? (Math.abs(scaled) < 10 ? 2 : Math.abs(scaled) < 100 ? 2 : 1);
    let max = maxDecimals ?? (Math.abs(scaled) < 10 ? 4 : Math.abs(scaled) < 100 ? 3 : 1);

    // Handle rounding edge case:
    // e.g., 999.95K → bump to 1.00M
    const bumpCheck = Number(scaled.toFixed(max));
    if (unit.suffix !== 'T' && bumpCheck >= 1000) {
      const idx = this.units.indexOf(unit);
      const next = this.units[Math.max(0, idx - 1)];
      if (next && next.suffix) {
        unit = next;
        scaled = value / unit.divisor;

        // Recalculate smart decimals if not explicitly provided
        if (minDecimals === undefined || maxDecimals === undefined) {
          min = Math.abs(scaled) < 10 ? 2 : Math.abs(scaled) < 100 ? 2 : 1;
          max = Math.abs(scaled) < 10 ? 4 : Math.abs(scaled) < 100 ? 3 : 1;
        }
      }
    }

    // Intl formatter handles locale-aware grouping and decimal separator
    const formatter = new Intl.NumberFormat(usedLocale, {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    });

    // No suffix (value < 1000) → show full number with grouping
    if (unit.suffix === '') {
      return sign + formatter.format(abs);
    }
    // Return formatted scaled number + suffix
    return sign + formatter.format(Math.abs(scaled)) + unit.suffix;
  }

  private getLocal(): DisplayDigitsType | string {
    return this.config?.value?.locale ? this.config?.value?.locale : this.defaultLocale;
  }

}
