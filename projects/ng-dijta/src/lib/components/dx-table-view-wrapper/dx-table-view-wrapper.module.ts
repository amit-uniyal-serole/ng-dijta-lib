import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxTableViewWrapperComponent } from './dx-table-view-wrapper.component';
import { FlexTableModule } from '../dx-table/dx-table.module';
import { DxCanvasModule } from '../dx-canvas/dx-canvas.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DxTableViewWrapperComponent
  ],
  imports: [
    CommonModule,
    FlexTableModule,
    DxCanvasModule,
    FormsModule
  ],
  exports: [DxTableViewWrapperComponent]
})
export class DxTableViewWrapperModule { }
