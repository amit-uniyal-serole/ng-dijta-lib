
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@jsverse/transloco';
import { DxNoAnimationModule } from '../../core/no-animation/dx-no-animation.module';
import { DxOutletModule } from '../../core/outlet/outlet.module';
import { DxOverlayModule } from '../../core/overlay/nz-overlay.module';
import { DxToolTipModule } from '../dx-tooltip/dx-tooltip.module';
import { PopoverVariantWrapperComponent } from './components/popover-variant-wrapper/popover-variant-wrapper.component';
import { DxPopoverComponent, DxPopoverDirective } from './popover';
import { BasicPopoverContentComponent } from './variants/basic-popover-content/basic-popover-content.component';
import { BasicPopoverHeaderComponent } from './variants/basic-popover-header/basic-popover-header.component';

@NgModule({
  declarations: [DxPopoverDirective, DxPopoverComponent, BasicPopoverContentComponent, BasicPopoverHeaderComponent, PopoverVariantWrapperComponent],
  imports: [
    BidiModule,
    CommonModule,
    OverlayModule,
    DxOutletModule,
    DxOverlayModule,
    DxNoAnimationModule,
    DxToolTipModule,
    MatIconModule,
    TranslocoModule
  ],
  exports: [DxPopoverDirective, DxPopoverComponent, BasicPopoverContentComponent, BasicPopoverHeaderComponent, PopoverVariantWrapperComponent],
})
export class DxPopoverModule { }
