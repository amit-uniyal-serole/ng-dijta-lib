import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxChipSelectComponent } from './dx-chip-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxDirectiveModule } from '../../directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChipSelectComponent } from './chip-select/chip-select.component';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@jsverse/transloco';


@NgModule({
  declarations: [DxChipSelectComponent, ChipSelectComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DxDirectiveModule, MatFormFieldModule, MatInputModule, TranslocoModule],
  exports: [DxChipSelectComponent, ChipSelectComponent],
})
export class DxChipSelectModule { }
