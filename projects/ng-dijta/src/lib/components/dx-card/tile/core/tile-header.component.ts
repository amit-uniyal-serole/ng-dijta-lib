import { Component, Input } from "@angular/core";
import { TileHeader } from "../../model/tile/tile-core";

@Component({
    selector: 'dx-tile-header',
    template: `
       <div class="tile-header">
            <span class="material-icons-round title-header-icon" *ngIf="header?.headerIcon">
                {{header.headerIcon}}
            </span>
            <div>
                <h3 class="heading-6 fw-medium title" *ngIf="header?.headerTitle">{{header.headerTitle | transloco}}</h3>
                <p class="body sub-title" *ngIf="header?.headerSubTitle">{{header.headerSubTitle | transloco}}</p>
            </div>
       </div>
    `
})
export class DxTileHeaderComponent {
    @Input() header!: TileHeader;
}