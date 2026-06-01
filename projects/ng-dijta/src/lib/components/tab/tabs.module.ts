import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxTabCloseablePipe } from './tab-closeable-pipe';
import { NgxTabContentDirective } from './tab-content.directive';
import { NgxTabTitleDirective } from './tab-title.directive';
import { NgxTabComponent } from './tab.component';
import { NgxTabsComponent } from './tabs.component';
import { DropDownModule } from '../dropdown';

@NgModule({
  imports: [CommonModule, DropDownModule],
  exports: [NgxTabsComponent, NgxTabComponent, NgxTabTitleDirective, NgxTabContentDirective],
  declarations: [NgxTabsComponent, NgxTabComponent, NgxTabTitleDirective, NgxTabContentDirective, NgxTabCloseablePipe],
  providers: [],
})
export class TabsModule {}