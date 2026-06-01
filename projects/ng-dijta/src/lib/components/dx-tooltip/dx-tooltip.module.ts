import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxOutletModule } from '../../core/outlet/outlet.module';
import { DxOverlayModule } from '../../core/overlay/nz-overlay.module';
import { DxNoAnimationModule } from '../../core/no-animation/dx-no-animation.module';
import { DxToolTipComponent, DxTooltipDirective } from './dx-tooltip';
@NgModule({
    declarations: [DxToolTipComponent, DxTooltipDirective],
    exports: [DxToolTipComponent, DxTooltipDirective],
    imports: [BidiModule, CommonModule, OverlayModule, DxOutletModule, DxOverlayModule, DxNoAnimationModule]
})
export class DxToolTipModule { }
