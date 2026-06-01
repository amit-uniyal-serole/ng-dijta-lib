import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxBasicTileComponent } from './dx-basic-tile.component';
import { DxTitleModule } from '../dx-title/dx-title.module';
import { DxContentModule } from '../dx-content/dx-content.module';
import { DxFooterModule } from '../dx-footer/dx-footer.module';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [DxBasicTileComponent],
  imports: [
    CommonModule,
    DxTitleModule,
    DxContentModule,
    MatTooltipModule,
    DxFooterModule,
  ],
  exports: [DxBasicTileComponent],
})
export class DxBasicTileModule {}
