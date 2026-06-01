import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxInputIconComponent } from './dx-input-icon.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputMaskModule } from '../../core/UI/core/input-mask/input-mask.module';
import { DxIconSelectionPopupModule } from '../dx-icon-selection-popup';
import { CoreUiModule } from '../../core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [DxInputIconComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    InputMaskModule,
    CoreUiModule,
    DxIconSelectionPopupModule,
    MatIconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule
  ],
  exports: [DxInputIconComponent],
})
export class DxInputIconModule { }
