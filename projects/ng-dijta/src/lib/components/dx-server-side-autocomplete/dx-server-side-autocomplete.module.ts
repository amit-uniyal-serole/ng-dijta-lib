import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { LoadingModule } from '../loading';
import { DxServerSideAutocompleteComponent } from './dx-server-side-autocomplete.component';



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
    MatCheckboxModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,   
    FormsModule,
    LoadingModule
  ],
  exports:[DxServerSideAutocompleteComponent]
})
export class DxServerSideAutocompleteModule { }
