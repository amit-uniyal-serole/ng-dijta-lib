import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxTreeV2Component } from './dx-tree-v2.component';
import { NzTreeV2Component } from './nz-tree-v2.component';
import { TreeModule } from './angular-tree-component.module';



@NgModule({
  declarations: [
    DxTreeV2Component,
    NzTreeV2Component
  ],
  imports: [
    CommonModule,
    TreeModule
  ],
  exports: [DxTreeV2Component,
    NzTreeV2Component, TreeModule]
})
export class DxTreeV2Module { }
