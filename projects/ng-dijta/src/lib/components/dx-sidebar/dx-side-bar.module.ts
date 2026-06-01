import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { DxDirectiveModule } from '../../directive';
import { TranslocoModule } from '@jsverse/transloco';
import { DxToolTipModule } from '../dx-tooltip';
import { DxPopoverModule } from '../dx-popover';
import { MatSidenavModule } from '@angular/material/sidenav';
import { OverlayModule } from '@angular/cdk/overlay';
import { DxFlexMenuComponent } from './dx-flex-menu/dx-flex-menu.component';
import { FilterBy } from '../../pipe/filter-by.pipe';
import { ShortBy } from '../../pipe/short-by.pipe';
import { MatRippleModule } from '@angular/material/core';
import { DxSkeletonLoaderModule } from '../dx-skeleton-loader';
import { AbilityModule } from '@casl/angular';

@NgModule({
  declarations: [
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
    DxDirectiveModule,
    TranslocoModule,
    DxToolTipModule,
    DxPopoverModule,
    MatSidenavModule,
    OverlayModule,
    FilterBy,
    ShortBy,
    MatRippleModule,
    DxSkeletonLoaderModule,
    AbilityModule
  ],
  providers: [
    NavService
  ],
  exports: [DxMenuItemComponent, DxHorizontalComponent, MenuListItemComponent,
    DxVerticalComponent, DxFlexMenuComponent]
})
export class DxSideBarModule { }
