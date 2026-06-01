import { Component } from "@angular/core";

type LAYOUT = 'COMPACT';

@Component({
    selector: 'dx-layout-wrapper',
    template: `
        <ng-container *ngIf="layoutType === 'COMPACT'">
            <dx-compact-layout>
                <header>
                    <ng-content select="layout-header"></ng-content>
                </header>
                <content>
                    <dx-compact-content [menu]="menu">
                        <ng-content></ng-content>
                    </dx-compact-content>
                </content>
            </dx-compact-layout>
        </ng-container>
    `
})
export class LayoutWrapperComponent {
    layoutType: LAYOUT = 'COMPACT';
    layoutBoolean: boolean = false;
}