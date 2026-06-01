import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabCloseablePipe } from './tab-closeable-pipe';
import { TabContentDirective } from './tab-content.directive';
import { TabTitleDirective } from './tab-title.directive';
import { DxTabComponent } from './tab.component';
import { DropDownModule } from '../dropdown';
import { DxTabsComponent } from './tabs.component';

@NgModule({
  imports: [CommonModule, DropDownModule],
  exports: [DxTabsComponent, DxTabComponent, TabTitleDirective, TabContentDirective],
  declarations: [DxTabsComponent, DxTabComponent, TabTitleDirective, TabContentDirective, TabCloseablePipe],
  providers: [],
})
export class DxTabsModule {}