import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxChipAutocompleteComponent } from './dx-chip-autocomplete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatChipsModule } from '@angular/material/chips';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    DxChipAutocompleteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatChipsModule,
    TranslocoModule
  ],
  exports: [DxChipAutocompleteComponent]
})
export class DxChipAutocompleteModule { }
