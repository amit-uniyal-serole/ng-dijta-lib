import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxTreeComponent } from './dx-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@ngneat/transloco';



@NgModule({
  declarations: [
    DxTreeComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    //

    CdkTableModule,
    CdkTreeModule,
    DragDropModule,
    TranslocoModule
  ],
  exports: [DxTreeComponent]
})
export class DxTreeModule { }
