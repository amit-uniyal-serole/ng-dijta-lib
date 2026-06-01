import { CommonModule, CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CurrencyInputDirective } from '../../core/UI/core/currency/directive/dx-currency.directive';
import { DxInputComponent } from './dx-input.component';
import { DxDirectiveModule } from '../../directive/public-api';
import { TranslocoModule } from '@jsverse/transloco';
import { NgxMaskDirective } from 'ngx-mask';
@NgModule({
  declarations: [DxInputComponent, CurrencyInputDirective],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatAutocompleteModule,
    MatTooltipModule,
    DxDirectiveModule,
    TranslocoModule,
  ],
  providers: [
    CurrencyPipe,
    DecimalPipe,

  ],
  exports: [DxInputComponent],
})
export class DxInputModule { }
