import { getLocaleCurrencyCode } from "@angular/common";
import { Component, Inject, Input, LOCALE_ID, OnChanges, SimpleChanges } from "@angular/core";
import { TileFooter } from "../../model/tile/tile-core";

@Component({
    selector: 'dx-tile-footer',
    template: `
       <div class="tile-footer">
            <div class="tile-footer-area">
                <div class="tile-footer-left">
                    <span class="body extra" *ngIf="footer?.footerTitlePrefix">{{footer?.footerTitlePrefix}}</span>
                    <p class="heading-5" [ngStyle]="{ color: footer?.footerTitleColor }" *ngIf="footer?.footerTitle">{{displayTitle | transloco}}</p>
                    <span class="body extra" *ngIf="footer?.footerTitleSuffix">{{footer?.footerTitleSuffix}}</span>
                </div>
                <div class="tile-footer-right">
                    <span class="material-icons-round navigation" *ngIf="!footer?.openNewTab">
                        arrow_forward
                    </span>
                    <span class="material-icons-round navigation" *ngIf="footer?.openNewTab">
                        open_in_new
                    </span>
                </div>
            </div>
       </div>
    `
})
export class DxTileFooterComponent implements OnChanges {
    @Input() footer!: TileFooter;
    displayTitle: string = '';
    constructor(@Inject(LOCALE_ID) public locale: string) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.footer.currentValue !== changes.footer.previousValue) {
            if (this.footer.footerTitle) {
                this.displayTitle = this.getFooterTitleFormat(this.footer.footerTitle, this.footer.footerTitleType)
            }
        }
    }


    private getFooterTitleFormat(val: string, type: string | undefined): string {
        if (type === 'currency') {

            let formatter = new Intl.NumberFormat(`${this.locale}`, {
                style: 'currency',
                currency: getLocaleCurrencyCode(this.locale) ?? 'USD',
            });

            return formatter.format(Number(this.footer.footerTitle))
        } else if (type === 'number') {

            let formatter = new Intl.NumberFormat(`${this.locale}`, {
                style: 'decimal',
                currency: getLocaleCurrencyCode(this.locale) ?? 'USD',
            });
            return formatter.format(Number(this.footer.footerTitle))
        } else {
            return val
        }
    }
}