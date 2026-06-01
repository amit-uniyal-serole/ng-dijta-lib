import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSelectComponent } from './dx-select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DxChipSelectModule } from '../dx-chip-select';
import { OptionBackgroundColorDirective } from './app-option-background-color.directive';
import { MatInputModule } from '@angular/material/input';
import { AbilityModule } from '@casl/angular';
@NgModule({
  declarations: [DxSelectComponent, OptionBackgroundColorDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, DxChipSelectModule, MatInputModule, AbilityModule],
  exports: [DxSelectComponent],
})
export class DxSelectModule { }
