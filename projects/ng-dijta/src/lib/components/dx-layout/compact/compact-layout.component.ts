import { Component } from "@angular/core";
@Component({
    selector: 'dx-compact-layout',
    template: `
    <dx-layout class="layout">
        <dx-layout-header>
            <ng-content select="header"></ng-content>
        </dx-layout-header>
        <ng-content select="content"></ng-content>
    </dx-layout>
    `,
    styles: [
        `
        .menu-coll {
            position: absolute;
            z-index: 999;
            top: 46px;
            background: var(--primary-base);
            padding: 5px;
            color: var(--primary-on-base);
            border-radius: 50%;
            left: 3px;
        }
        `
    ]
})
export class CompactLayoutComponent {

    constructor() { }

}