import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxStatusComponent } from './dx-status.component';
import { DxSkeletonLoaderModule } from '../../components/dx-skeleton-loader';
import { DxStatusChipDirective } from './dx-status-chip.directive';



@NgModule({
  declarations: [DxStatusComponent,DxStatusChipDirective],
  imports: [
    CommonModule,
    DxSkeletonLoaderModule
  ],
  exports:[DxStatusComponent,DxStatusChipDirective]
})
export class DxStatusModule { }
