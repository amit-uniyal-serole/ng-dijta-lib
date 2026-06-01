import { Component, Input, Optional, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../core/UI/service/input/ui-component.config';
import { DisplayDigitsType } from '../../core/UI/constant/currency-default';
@Component({
  selector: 'dx-currency',
  template: `
  {{displayAmount| dxcurrency: currencyCode: display: digitsInfo: locale}}
  `
})
export class DxCurrencyComponent implements OnChanges {


  @Input() amount!: number;
  @Input() currencyCode: string | undefined;
  @Input() display: DisplayDigitsType | undefined;
  @Input() digitsInfo: string | undefined;
  @Input() locale: string | undefined;
  displayAmount !: number;
  copyText = 'Click to copy';

  constructor(@Optional()
  @Inject(UI_COMPONENT_CONFIG) public config: UIConfigWrapper) { }


  ngOnChanges(_changes: SimpleChanges): void {
    this.displayAmount = this.amount;
  }

}
