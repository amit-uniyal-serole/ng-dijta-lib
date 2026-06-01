import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'dx-flex-table-row',
    templateUrl: './flex-table-row.component.html',
    styleUrls: ['./flex-table-row.component.scss']
})
export class FlexTableRowComponent<T> {
    @HostBinding('class.disc-flex-table-row')
    discFlexTableRowStyle: boolean = true;
}
