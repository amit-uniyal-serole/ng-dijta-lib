import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { LoadingModule } from '../loading';
import { DxServerSideAutocompleteComponent } from './dx-server-side-autocomplete.component';
import { DxMatSelectSearchModule } from '../dx-autocomplete-select/mat-select-search/ngx-mat-select-search.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    DxServerSideAutocompleteComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatAutocompleteModule,
    DxMatSelectSearchModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingModule,
    MatIconModule
  ],
  exports: [DxServerSideAutocompleteComponent]
})
export class DxServerSideAutocompleteModule { }
