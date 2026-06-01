import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompactContentComponent } from './compact/compact-content.component';
import { CompactLayoutComponent } from './compact/compact-layout.component';
import { DxLayoutContentComponent } from './content.component';
import { DxLayoutFooterComponent } from './footer.component';
import { DxLayoutHeaderComponent } from './header.component';
import { DxLayoutComponent } from './layout.component';
import { DxSiderTriggerComponent } from './sider-trigger.component';
import { DxLayoutSiderComponent } from './sider.component';
import { DxSideBarModule } from '../dx-side-bar/dx-side-bar.module';
import { LayoutWrapperComponent } from './layout-wrapper.component';
import { HorizontalLayoutComponent } from './horizontal/horizontal-layout.component';
import { HorizontalContentComponent } from './horizontal/horizontal-content.component';
import { VerticalContentComponent } from './vertical/vertical-content.component';
import { VerticalLayoutComponent } from './vertical/vertical-layout.component';
import { LayoutServiceService } from './layout-service.service';
@NgModule({
    declarations: [
        DxLayoutComponent,
        DxLayoutHeaderComponent,
        DxLayoutContentComponent,
        DxLayoutFooterComponent,
        DxLayoutSiderComponent,
        DxSiderTriggerComponent,
        CompactLayoutComponent,
        CompactContentComponent,
        LayoutWrapperComponent,
        HorizontalLayoutComponent,
        HorizontalContentComponent,
        VerticalContentComponent,
        VerticalLayoutComponent,
    ],
    exports: [
        DxLayoutComponent,
        DxLayoutHeaderComponent,
        HorizontalContentComponent,
        HorizontalLayoutComponent,
        LayoutWrapperComponent,
        DxLayoutContentComponent,
        DxLayoutFooterComponent,
        DxLayoutSiderComponent,
        CompactLayoutComponent,
        CompactContentComponent,
        VerticalContentComponent,
        VerticalLayoutComponent
    ],
    imports: [
        BidiModule,
        CommonModule,
        DxSideBarModule,
        LayoutModule,
        PlatformModule,
    ]
})
export class DxLayoutModule { }
