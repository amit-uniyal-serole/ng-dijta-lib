import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

import { MonitoringTile } from "../model/tile/monitoring-tile";
import { TileHeader } from "../model/tile/tile-core";

@Component({
    selector: 'dx-monitoring-tile',
    template: `
        <div class="tile-wrapper">
            <dx-tile-header *ngIf="header" [header]="header"></dx-tile-header>
            <div class="tile-content monitoring">
                <div class="details">
                    <span class="material-icons">
                        description
                    </span>
                    <h3 class="heading-3">33213</h3>
                </div>
                <div class="description">
                    <p>Hwllo</p>
                </div>
            </div>
        </div>
    `
})
export class NewMonitoringTileComponent implements OnChanges {
    @Input() data!: MonitoringTile;
    header!: TileHeader;
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data.currentValue !== changes.data.previousValue) {
            this.header = {
                headerIcon: this.data.headerIcon,
                headerTitle: this.data.headerTitle,
                headerSubTitle: this.data.headerSubTitle
            };
        }
    }
}