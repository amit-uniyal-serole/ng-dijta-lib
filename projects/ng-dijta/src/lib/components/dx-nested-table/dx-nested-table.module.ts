import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { TreetableComponent } from './component/treetable.component';
import { FlexTableModule } from '../dx-table';
import { TranslocoModule } from '@jsverse/transloco';
import { DxEmptyModule } from '../dx-empty';
import { LoadingModule } from '../loading';
import { DxDirectiveModule } from '../../directive';


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
    LoadingModule,
    DxDirectiveModule
  ],
  exports: [
    TreetableComponent
  ]
})
export class TreetableModule { }