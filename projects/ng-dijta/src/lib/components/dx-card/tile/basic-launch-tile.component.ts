import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { BasicTile } from "../model/tile/basic-tile";
import { TileFooter, TileHeader } from "../model/tile/tile-core";

@Component({
    selector: 'dx-basic-launch-tile',
    template: `
        <div class="tile-wrapper">
            <dx-tile-header *ngIf="header" [header]="header"></dx-tile-header>
            <div class="tile-content">
                <p class="paragraph">{{data.description}}</p>
            </div>
            <dx-tile-footer *ngIf="footer" [footer]="footer"></dx-tile-footer>
        </div>
    `
})
export class BasicLaunchTileComponent implements OnChanges {
    @Input() data!: BasicTile;
    header!: TileHeader;
    footer!: TileFooter;
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data.currentValue !== changes.data.previousValue) {
            this.header = {
                headerIcon: this.data.headerIcon,
                headerTitle: this.data.headerTitle,
                headerSubTitle: this.data.headerSubTitle
            };
            this.footer = {
                footerTitleColor: this.data.footerTitleColor,
                navigation: this.data.navigation,
                openNewTab: this.data.openNewTab,
                footerTitle: this.data.footerTitle,
                footerTitleType: this.data.footerTitleType,
                footerTitlePrefix: this.data.footerTitlePrefix,
                footerTitleSuffix: this.data.footerTitleSuffix
            }
        }
    }
}