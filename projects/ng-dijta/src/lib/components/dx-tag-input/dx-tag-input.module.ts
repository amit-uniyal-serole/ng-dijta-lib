import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DxTagInputComponent } from './dx-tag-input.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { DxColorsModule } from '../dx-color-picker';
import { MatIconModule } from '@angular/material/icon';
import { DxTagComponent } from './view/dx-tag.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DxDirectiveModule } from '../../directive';

@NgModule({
  declarations: [DxTagInputComponent, DxTagComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatListModule,
    MatMenuModule,
    DxColorsModule,
    MatIconModule,
    MatAutocompleteModule,
    DxDirectiveModule,
    MatIconModule
  ],
  exports: [DxTagInputComponent, DxTagComponent, MatChipsModule]
})
export class DxTagInputModule { }
