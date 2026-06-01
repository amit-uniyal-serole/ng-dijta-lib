import { Component, Input } from '@angular/core';
import { CurrencyConfig } from '../../../../core/UI/constant/currency-default';
import { DxTableColumn } from '../../interfaces/dx-table.interface';
import { FlexTableCellComponent } from '../../ngx-table/flex-table-cell/flex-table-cell.component';
import { CurrencySetting } from '../../interfaces/dx-additional.interface';
@Component({
  selector: 'dx-table-currency',
  templateUrl: './dx-table-currency.component.html',
  styleUrls: ['./dx-table-currency.component.css']
})
export class DxTableCurrencyComponent<T> extends FlexTableCellComponent<number> {
  @Input() data!: number;
  @Input() currencySetting?: CurrencySetting;
  @Input() currencyCode?: string;
  @Input() display?: 'code' | 'symbol' | 'symbol-narrow' = 'symbol-narrow';
  @Input() digitsInfo?: string;
  @Input() locale?: string;
  @Input() setting?: CurrencyConfig;
  @Input() column!: DxTableColumn<T>;
  @Input() config: CurrencySetting | undefined;

}
