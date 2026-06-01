import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { FlexTableCellComponent } from '../flex-table-cell/flex-table-cell.component';

@Component({
    selector: 'dx-flex-table-button-cell',
    templateUrl: './flex-table-button-cell.component.html'
})
export class FlexTableButtonCellComponent<T> extends FlexTableCellComponent<T> {
    @HostBinding('class.w-100')
    @Input() w100Class: boolean = true;
    @Input() class: string | undefined;
    @Input() icon: string | undefined;
    @Input() label: string | undefined;
    @Output() readonly buttonClick: EventEmitter<T> = new EventEmitter<T>();

    onClick($event: MouseEvent): void {
        this.buttonClick.emit(this.coreData);
    }
}