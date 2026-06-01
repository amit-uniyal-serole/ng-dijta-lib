import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DxConfigTableComponent } from './dx-config-table.component';
import { FlexTableModule } from '../dx-table';
import { MatDialogModule } from '@angular/material/dialog';
import { DxTableFilterModule } from '../dx-table-filter';
import { TranslocoModule } from '@jsverse/transloco';

@NgModule({
  declarations: [
    DxConfigTableComponent,
  ],
  imports: [
    CommonModule,
    FlexTableModule,
    MatDialogModule,
    DxTableFilterModule,
    TranslocoModule
  ],
  exports: [
    DxConfigTableComponent
  ],
  providers: [DatePipe]
})
export class DxConfigTableModule { }
