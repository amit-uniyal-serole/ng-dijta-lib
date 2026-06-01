import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxAutocompleteSelectComponent } from './dx-autocomplete-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DxMatSelectSearchModule } from './mat-select-search/ngx-mat-select-search.module';
import { TranslocoModule } from '@jsverse/transloco';
import { AbilityModule } from '@casl/angular';
import { DxOptionBackgroundColorDirective } from './dx-option-background-color.directive';

@NgModule({
  declarations: [DxAutocompleteSelectComponent,DxOptionBackgroundColorDirective],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslocoModule,
    DxMatSelectSearchModule,
    AbilityModule
  ],
  exports: [DxAutocompleteSelectComponent],
})
export class DxAutocompleteSelectModule { }
