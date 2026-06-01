import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TreetableComponent } from './component/treetable.component';
import { FlexTableModule } from '../dx-table';
import { TranslocoModule } from '@ngneat/transloco';
import { DxEmptyModule } from '../dx-empty';
import { LoadingModule } from '../loading';


@NgModule({
  declarations: [
    TreetableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    FlexTableModule,
    TranslocoModule,
    DxEmptyModule,
    LoadingModule
  ],
  exports: [
    TreetableComponent
  ]
})
export class TreetableModule { }