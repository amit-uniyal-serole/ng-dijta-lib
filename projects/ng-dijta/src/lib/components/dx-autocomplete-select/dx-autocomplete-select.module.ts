import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxAutocompleteSelectComponent } from './dx-autocomplete-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslocoModule } from '@ngneat/transloco';
import { AbilityModule } from '@casl/angular';
@NgModule({
  declarations: [DxAutocompleteSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TranslocoModule,
    AbilityModule
  ],
  exports: [DxAutocompleteSelectComponent],
})
export class DxAutocompleteSelectModule { }
