import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxNavigationMenuComponent } from './dx-navigation-menu.component';
import { DxMenuAccordianComponent } from './core/dx-menu-accordian/dx-menu-accordian.component';
import { DxMenuAccordianContentComponent } from './core/dx-menu-accordian-content/dx-menu-accordian-content.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';


@NgModule({
  declarations: [
    DxNavigationMenuComponent,
    DxMenuAccordianComponent,
    DxMenuAccordianContentComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    RouterModule,
    TranslocoModule
  ],
  exports: [DxNavigationMenuComponent, DxMenuAccordianComponent,
    DxMenuAccordianContentComponent]
})
export class DxNavigationMenuModule { }
