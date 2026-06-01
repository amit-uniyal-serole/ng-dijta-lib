import { Component, Input } from '@angular/core';
import { CurrencyConfig } from '../../../../core/UI/constant/currency-default';

@Component({
  selector: 'dx-card-currency',
  templateUrl: './dx-card-currency.component.html',
  styleUrls: ['./dx-card-currency.component.css']
})
export class DxCardCurrencyComponent {
  @Input() data!: number;
  @Input() currencyCode?: string;
  @Input() display?: 'code' | 'symbol' | 'symbol-narrow' = 'symbol-narrow';
  @Input() digitsInfo?: string;
  @Input() locale?: string;
  @Input() setting?: CurrencyConfig;
}
