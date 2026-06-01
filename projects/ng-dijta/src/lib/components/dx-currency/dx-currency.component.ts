import { Component, Input, Optional, Inject, OnChanges, SimpleChanges } from '@angular/core';
import { UIConfigWrapper, UI_COMPONENT_CONFIG } from '../../core/UI/service/input/ui-component.config';
import { DisplayDigitsType, NumberFormatVariant } from '../../core/UI/constant/currency-default';
@Component({
  selector: 'dx-currency',
  template: `
  @if(displayAmount !== undefined && displayAmount !== null) {
   
    @if(appCurrencyConfig) {
      <div class="w-fit" dxTooltipTitle="{{currencyCode}} {{ displayAmount | localizedNumber:appCurrencyConfig: decimal }}"
      dx-tooltip >
      @if(appCurrencyConfig?.compactNumberNotations) {
        {{currencyCode}} {{
          displayAmount | numberSuffix:appCurrencyConfig?.locale:decimal:decimal
        }}
        
      } @else {
        {{currencyCode}} {{ displayAmount | localizedNumber:appCurrencyConfig: decimal }}
       
      }
      </div>
    } @else {
      <div class="w-fit" dxTooltipTitle="{{currencyCode}} {{ displayAmount | localizedNumber:appCurrencyConfig: decimal }}"
      dx-tooltip >
      {{displayAmount| dxcurrency: currencyCode: display: digitsInfo: locale}}
      </div>
    }
  } @else {
    <span class="dx-currency-placeholder">-</span>
  }
  
  `
})
export class DxCurrencyComponent implements OnChanges {


  @Input() amount!: number;
  @Input() currencyCode: string | undefined;
  @Input() display: DisplayDigitsType | undefined;
  @Input() digitsInfo: string | undefined;
  @Input() locale: string | undefined;
  @Input() appCurrencyConfig?: NumberFormatVariant;
  @Input() decimal?: number;
  displayAmount !: number;
  copyText = 'Click to copy';

  constructor(@Optional()
  @Inject(UI_COMPONENT_CONFIG) public config: UIConfigWrapper) { }


  ngOnChanges(_changes: SimpleChanges): void {
    this.displayAmount = this.amount;
  }

}
