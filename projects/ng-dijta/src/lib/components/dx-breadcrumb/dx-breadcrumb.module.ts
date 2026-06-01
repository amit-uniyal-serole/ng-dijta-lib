import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DxBreadcrumbComponent } from './dx-breadcrumb.component';

@NgModule({
  declarations: [DxBreadcrumbComponent],
  imports: [CommonModule, RouterModule, MatIconModule],
  exports: [DxBreadcrumbComponent],
})
export class DxBreadcrumbModule {}
