import { Component } from "@angular/core";


@Component({
    selector: 'dx-vertical-layout',
    template: `
    <ng-content select="extra-header"></ng-content>
    <dx-layout class="layout">
        <dx-layout-header>
            <ng-content select="header"></ng-content>
        </dx-layout-header>
        <ng-content select="content"></ng-content>
    </dx-layout>
    `
})
export class VerticalLayoutComponent {

}