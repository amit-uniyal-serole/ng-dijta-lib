import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxSideBarComponent } from './dx-side-bar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DxMenuItemComponent } from './horizontal/menu-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { DxHorizontalComponent } from './horizontal/horizontal.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MenuListItemComponent } from './vertical/menu-list-item.component';
import { NavService } from './vertical/nav.service';
import { DxVerticalComponent } from './vertical/vertical.component';
import { MatListModule } from '@angular/material/list';
import { DxFlexMenuComponent } from './components/dx-flex-menu/dx-flex-menu.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { TranslocoModule } from '@ngneat/transloco';
import { DxDirectiveModule } from '../../directive';
import { DxToolTipModule } from '../dx-tooltip';
import { AbilityModule } from '@casl/angular';

@NgModule({
  declarations: [
    DxSideBarComponent,
    DxMenuItemComponent,
    DxHorizontalComponent,
    MenuListItemComponent,
    DxVerticalComponent,
    DxFlexMenuComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    CdkAccordionModule,
    TranslocoModule,
    DxDirectiveModule,
    DxToolTipModule,
    AbilityModule
  ],
  providers: [
    NavService
  ],
  exports: [DxSideBarComponent, DxMenuItemComponent, DxHorizontalComponent, MenuListItemComponent,
    DxVerticalComponent, DxFlexMenuComponent]
})
export class DxSideBarModule { }
