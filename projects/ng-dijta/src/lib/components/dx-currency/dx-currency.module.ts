import { DxCurrencyComponent } from './dx-currency.component';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxCurrencyPipe } from './pipe/dxCurrency.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxCurrencyService } from './service/dx-currency.service';
import { DxInputCurrencyComponent } from './dx-input-currency.component';
import { DxCurrencyInputDirective } from './directive/currency-input.directive';
import { DxNumberInputDirective } from './directive/currency-input-no-symbol.directive';

@NgModule({
  declarations: [
    DxCurrencyComponent,
    DxCurrencyPipe,
    DxInputCurrencyComponent,
    DxCurrencyInputDirective,
    DxNumberInputDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule
  ],
  providers: [
    DxCurrencyService,
    CurrencyPipe
  ],
  exports: [
    DxCurrencyComponent,
    DxCurrencyPipe,
    DxInputCurrencyComponent,
    DxCurrencyInputDirective,
    DxNumberInputDirective
  ],

})
export class DxCurrencyModule { }
