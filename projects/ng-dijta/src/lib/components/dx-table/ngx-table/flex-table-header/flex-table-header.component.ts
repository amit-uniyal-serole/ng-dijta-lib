import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DxTableColumn } from '../../interfaces/dx-table.interface';

@Component({
    selector: 'dx-flex-table-header',
    templateUrl: './flex-table-header.component.html',
    styleUrls: ['./flex-table-header.component.scss']
})
export class FlexTableHeaderComponent<T> {
    @Input() columns: Array<DxTableColumn<T>> = [];

    ascending: boolean = true;
    activeColumn: DxTableColumn<T> | undefined;


    trackByFn(index: number): number {
        return index;
    }
}
