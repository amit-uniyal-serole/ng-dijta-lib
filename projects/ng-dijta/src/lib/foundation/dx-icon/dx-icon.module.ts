import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DxIconComponent } from './dx-icon.component';
import { DxIconExplorerComponent } from './dx-icon-explorer.component';

@NgModule({
  declarations: [DxIconComponent, DxIconExplorerComponent],
  imports: [CommonModule, FormsModule, MatIconModule],
  exports: [DxIconComponent, DxIconExplorerComponent],
})
export class DxIconModule {}
