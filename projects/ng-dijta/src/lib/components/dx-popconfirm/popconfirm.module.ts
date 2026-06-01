import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DxOutletModule } from '../../core/outlet/outlet.module';
import { DxOverlayModule } from '../../core/overlay/nz-overlay.module';
import { DxNoAnimationModule } from '../../core/no-animation/dx-no-animation.module';

// import { NzPopconfirmComponent, NzPopconfirmDirective } from './popconfirm';

@NgModule({
    //   declarations: [NzPopconfirmComponent, NzPopconfirmDirective],
    //   exports: [NzPopconfirmComponent, NzPopconfirmDirective],
    imports: [
        BidiModule,
        CommonModule,
        OverlayModule,
        DxOutletModule,
        DxOverlayModule,
        DxNoAnimationModule,
        // NzToolTipModule,
        A11yModule
    ]
})
export class DxPopconfirmModule { }
