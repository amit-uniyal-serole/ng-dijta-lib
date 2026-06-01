import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSkeletonLoaderComponent } from './dx-skeleton-loader.component';
import { NgxSkeletonLoaderConfig, NGX_SKELETON_LOADER_CONFIG } from './dx-skeleton-loader-config.types';



@NgModule({
  declarations: [
    DxSkeletonLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DxSkeletonLoaderComponent]
})
export class DxSkeletonLoaderModule {
  static forRoot(config?: Partial<NgxSkeletonLoaderConfig>): ModuleWithProviders<DxSkeletonLoaderModule> {
    return {
      ngModule: DxSkeletonLoaderModule,
      providers: [{ provide: NGX_SKELETON_LOADER_CONFIG, useValue: config }],
    };
  }
}
