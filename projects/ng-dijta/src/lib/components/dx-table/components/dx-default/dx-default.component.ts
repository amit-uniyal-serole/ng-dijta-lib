import { Component, Input } from "@angular/core";

@Component({
    selector: 'dx-default',
    template: `
        <span *ngIf="show">
        -
        </span>
    `
})
export class DxDefaultComponent {
    @Input() show: boolean = false;
}