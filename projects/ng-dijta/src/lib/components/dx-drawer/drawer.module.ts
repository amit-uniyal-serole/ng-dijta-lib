import { BidiModule } from '@angular/cdk/bidi';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DxOutletModule } from '../../core/outlet/outlet.module';
import { DxDrawerContentDirective } from './drawer-content.directive';
import { DxDrawerComponent } from './drawer.component';
import { DxDrawerServiceModule } from './drawer.service.module';
import { TranslocoModule } from '@jsverse/transloco';
import { DxToolTipModule } from '../dx-tooltip';
import { DxDirectiveModule } from '../../directive';

@NgModule({
    imports: [
        BidiModule,
        CommonModule,
        OverlayModule,
        PortalModule,
        DxOutletModule,
        DxDrawerServiceModule,
        TranslocoModule,
        DxToolTipModule,
        DxDirectiveModule
    ],
    exports: [DxDrawerComponent, DxDrawerContentDirective],
    declarations: [DxDrawerComponent, DxDrawerContentDirective]
})
export class DxDrawerModule { }