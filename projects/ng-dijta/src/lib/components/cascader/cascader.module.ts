import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CascaderLiComponent } from './cascader-li.component';
import { CascaderComponent } from './cascader.component';
import { TagsModule } from '../dx-tag';
import { SelectModule } from '../select';
import { DropDownModule } from '../dropdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DxCascadeInputComponent } from './dx-cascader.component';

@NgModule({
  declarations: [
    CascaderComponent,
    CascaderLiComponent,
    DxCascadeInputComponent,
  ],
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    DropDownModule,
    TagsModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  exports: [CascaderComponent, DxCascadeInputComponent],
})
export class CascaderModule { }
