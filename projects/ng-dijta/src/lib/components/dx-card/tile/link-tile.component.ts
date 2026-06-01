import { trigger, state, style, transition, animate } from "@angular/animations";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { LinkTile } from "../model/tile/link-tile";
import { TileHeader } from "../model/tile/tile-core";

@Component({
    selector: 'dx-link-tile',
    template: `
        <div class="tile-wrapper">
            <dx-tile-header *ngIf="header" [header]="header"></dx-tile-header>
            <div class="tile-content link-tile">
                <p [style.color]="data?.linkColor" class="body link" (click)="navigation()">{{data?.linkTitle}}</p>
                <p  [@widthGrow]="errorState" class="error label" *ngIf="error">{{error?.message}}</p>
            </div>
        </div>
    `,
    animations: [
        trigger('widthGrow', [
            state('closed', style({
                width: 0,
                height: 0,
            })),
            state('open', style({
                width: 400,
                height: 'auto',
            })),
            transition('* => *', animate(150))
        ]),
    ]
})
export class BasicLinkTileComponent implements OnChanges {
    @Input() data!: LinkTile;
    header!: TileHeader;
    error!: HttpErrorResponse;
    errorState = "closed";

    constructor(private http: HttpClient) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data.currentValue !== changes.data.previousValue) {
            this.header = {
                headerIcon: this.data.headerIcon,
                headerTitle: this.data.headerTitle,
                headerSubTitle: this.data.headerSubTitle
            };
        }
    }

    navigation(): void {
        if (this.data.serviceUrl) {
            this.dataUrlTrigger();
        } else if (this.data.openNewTab) {
            if (this.data.url) {
                window.open(this.data.url, '_blank');
            } else {
                console.warn('Url not available')
            }
        } else {
            if (this.data.url) {
                window.location.href = this.data.url;
            } else {
                console.warn('Url not available')
            }
        }
    }

    dataUrlTrigger(): void {
        if (this.data.serviceUrl) {
            this.http.get(this.data.serviceUrl).subscribe((_x) => {
            }, (error: HttpErrorResponse) => {
                this.error = error;
                this.changeState();
                this.hiddenErrorOneMin();
            });
        }
    }

    changeState(): void {
        this.errorState = this.errorState == "closed" ? "open" : "closed";
    }

    private hiddenErrorOneMin(): void {
        setTimeout(() => {
            this.changeState();
        }, 10000);
    }
}