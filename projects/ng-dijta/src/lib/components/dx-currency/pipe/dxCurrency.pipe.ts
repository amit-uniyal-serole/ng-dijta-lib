import { Pipe, PipeTransform } from '@angular/core';
import { DisplayDigitsType } from '../../../core/UI/constant/currency-default';
import { DxCurrencyService } from '../service/dx-currency.service';

@Pipe({
  name: 'dxcurrency',
})
export class DxCurrencyPipe implements PipeTransform {

  constructor(private readonly dxCurrencyService: DxCurrencyService) { }

  transform(
    value: number | undefined,
    currencyCode: string | undefined,
    display: DisplayDigitsType | undefined,
    digitsInfo: string | undefined,
    locale: string | undefined,
  ): string | null {
    if (value === undefined) {
      return '-'
    }
    return this.dxCurrencyService.transform(
      value,
      currencyCode,
      display,
      digitsInfo,
      locale
    )
  }

}
