import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxButtonComponent } from './dx-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { DxDirectiveModule } from '../../directive';
import { DxPopoverModule } from '../dx-popover';
import { DxToolTipModule } from '../dx-tooltip/dx-tooltip.module';
import { DxConfirmComponent } from '../dx-confirm/dx-confirm.component';
import { MatSelectModule } from '@angular/material/select';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { AbilityModule } from '@casl/angular';
import { MenuPanelComponent } from './menu-panel/menu-panel.component';

@NgModule({
  declarations: [DxButtonComponent, DxConfirmComponent, MenuPanelComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    DxDirectiveModule,
    DxPopoverModule,
    DxToolTipModule,
    MatSelectModule,
    OverlayModule,
    MatIconModule,
    TranslocoModule,
    TranslocoModule,
    AbilityModule
  ],
  exports: [DxButtonComponent, DxConfirmComponent, MenuPanelComponent],
})
export class DxButtonModule { }
