import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Menu } from '../model/model';
@Component({
    selector: 'dx-vertical',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <dx-menu-list-item *ngFor="let item of menu" [vartical]="true" [item]="item"></dx-menu-list-item>
    `
})
export class DxVerticalComponent {
    show: boolean = false;
    @Input() menu: Menu[] = [];

}