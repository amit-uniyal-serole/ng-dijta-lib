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
import { TranslocoModule } from '@ngneat/transloco';
import { AbilityModule } from '@casl/angular';

@NgModule({
  declarations: [DxButtonComponent, DxConfirmComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    DxDirectiveModule,
    DxPopoverModule,
    DxToolTipModule,
    TranslocoModule,
    AbilityModule
  ],
  exports: [DxButtonComponent],
})
export class DxButtonModule { }
