import { Component, HostBinding } from '@angular/core';
import { FlexTableRowComponent } from '../flex-table-row/flex-table-row.component';

@Component({
    selector: 'dx-flex-table-header-row',
    templateUrl: './flex-table-header-row.component.html',
    styleUrls: ['./flex-table-header-row.component.scss']
})
export class FlexTableHeaderRowComponent<T> extends FlexTableRowComponent<T> {
    @HostBinding('class.no-hover')
    discFlexTableRowStyle: boolean = true;
}
