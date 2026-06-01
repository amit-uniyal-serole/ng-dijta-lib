import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs'
import { DxTabGroupComponent } from './dx-tab-group.component';
import { TabComponent } from './tab/tab.component';
import { TabHeaderComponent } from './tab-header/tab-header.component';
import { TabContentComponent } from './tab-content/tab-content.component';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';

@NgModule({
  declarations: [DxTabGroupComponent, TabComponent, TabHeaderComponent, TabContentComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    TranslocoModule
  ],
  exports: [DxTabGroupComponent, TabComponent, TabHeaderComponent, TabContentComponent, MatTabsModule]
})
export class DxTabGroupModule { }
