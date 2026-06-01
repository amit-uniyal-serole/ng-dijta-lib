import { formatCurrency, formatNumber, getCurrencySymbol, getLocaleCurrencyCode } from '@angular/common';
import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../../core/UI/service/input/ui-component.config';
import { CurrencyDefault, DisplayDigitsType } from '../../../core/UI/constant/currency-default';

@Injectable()
export class DxCurrencyService {
  _defaultCurrencyCode = 'USD'
  constructor(
    @Inject(LOCALE_ID) public locale: string,
    @Optional()
    @Inject(UI_COMPONENT_CONFIG) public config: UIConfigWrapper) {
  }

  transform(
    value: number,
    currencyCode?: string | undefined,
    display: DisplayDigitsType | string = this.getDisplay(),
    digitsInfo: string | undefined = this.getDigitsInfo(),
    locale: string = this.locale,
  ): string {
    if (!currencyCode) {
      currencyCode = this.getCurrencyCode();
    }
    if (!display) {
      display = this.getDisplay();
    }
    currencyCode = currencyCode + ' ';
    return formatCurrency(
      value,
      locale,
      this.getDisplayType(currencyCode, locale, display),
      currencyCode,
      digitsInfo
    );
  }
  transformNumber(
    value: number | string,
    digitsInfo: string | undefined = this.getDigitsInfo(),
    locale: string = this.getLocal(),
  ): string {
    if (value || value === 0) {
      const converatedVal = this.removeSparetorForString(value);
      if (converatedVal?.toString() !== 'NaN') {
        if (digitsInfo) {
          return formatNumber(
            converatedVal,
            locale,
            digitsInfo
          );
        }
        return converatedVal.toLocaleString();
      }
    }
    return ''

  }

  transformNumberWithoutFormat(
    value: number | string,
    precision?: number,
    locale: string = this.getLocal(),
  ): string {
    if (value) {
      const converatedVal = this.removeSparetorForString(value);
      if (converatedVal?.toString() !== 'NaN') {
        if (precision) {
          return converatedVal.toLocaleString(locale, {
            minimumFractionDigits: precision, maximumFractionDigits: precision,
            useGrouping: false
          });
        }
        return this.removeSparetorForString(converatedVal.toLocaleString(locale)).toString();
      }
    }
    return ''

  }
  getSymbol(): string {
    return getCurrencySymbol(this.getCurrencyCode(), 'narrow', this.getLocal());
  }

  getDisplayType(currencyCode: string = this.getCurrencyCode(), locale: string = this.getLocal(), display: DisplayDigitsType | string = this.getDisplay()): string {
    let currency: string = currencyCode;
    if (display !== 'code') {
      if (display === 'symbol' || display === 'symbol-narrow') {
        currency = getCurrencySymbol(currencyCode, display === 'symbol' ? 'wide' : 'narrow', locale);
      } else {
        currency = display;
      }
    }

    return currency
  }

  getCurrencyCode(): string {
    return this.config?.value?.currency?.currencyCode ? this.config?.value?.currency?.currencyCode : getLocaleCurrencyCode(this.getLocal()) ?? CurrencyDefault.DEFAULT_CURRENCY_CODE;
  }
  private getDigitsInfo(): string | undefined {
    return this.config?.value?.currency?.digitsInfo;
  }
  private getDisplay(): DisplayDigitsType | string {
    return this.config?.value?.currency?.display ? this.config?.value?.currency?.display : CurrencyDefault.DEFAULT_DISPLAY;
  }
  private getLocal(): DisplayDigitsType | string {
    return this.config?.value?.locale ? this.config?.value?.locale : this.locale;
  }

  private removeSparetorForString(value: string | number): number {
    return isNaN(value as number) ? parseFloat((value as string).replace(/,/g, '')) : Number(value);
  }
}
