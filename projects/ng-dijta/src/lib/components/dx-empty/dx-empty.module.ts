import { BidiModule } from '@angular/cdk/bidi';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DxEmptyDefaultComponent } from './partial/default';
import { DxEmptySimpleComponent } from './partial/simple';
import { DxEmbedEmptyComponent } from './dx-embed-empty.component';
import { DxEmptyComponent } from './dx-empty.component';
import { DxOutletModule } from '../../core/outlet/outlet.module';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
    imports: [BidiModule, CommonModule, PortalModule, DxOutletModule, TranslocoModule],
    declarations: [
        DxEmptyComponent,
        DxEmbedEmptyComponent,
        DxEmptyDefaultComponent,
        DxEmptySimpleComponent,
    ],
    exports: [DxEmptyComponent, DxEmbedEmptyComponent],
})
export class DxEmptyModule { }
