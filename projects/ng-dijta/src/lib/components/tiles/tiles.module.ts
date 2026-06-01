import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MonitoringTileComponent } from "./monitoring-tile/monitoring-tile.component";
import { TileFooterComponent } from "./monitoring-tile/tile-footer/tile-footer.component";
import { TileHeaderComponent } from "./monitoring-tile/tile-header/tile-header.component";
import { DxTileHeaderComponent } from './core/dx-tile-header/dx-tile-header.component';
import { DxTileFooterComponent } from './core/dx-tile-footer/dx-tile-footer.component';
import { DxTileWrapperComponent } from './core/dx-tile-wrapper/dx-tile-wrapper.component';
import { KpiTileComponent } from './variant/kpi-tile/kpi-tile.component';
import { DxChartModule } from "../dx-chart";

@NgModule({
    declarations: [
        TileHeaderComponent,
        TileFooterComponent,
        MonitoringTileComponent,
        DxTileHeaderComponent,
        DxTileFooterComponent,
        DxTileWrapperComponent,
        KpiTileComponent
    ],
    imports: [
        CommonModule,
        DxChartModule
    ],
    exports: [
        TileHeaderComponent,
        TileFooterComponent,
        MonitoringTileComponent,
        DxTileHeaderComponent,
        DxTileFooterComponent,
        DxTileWrapperComponent,
        KpiTileComponent
    ]
})
export class TilesModule { }