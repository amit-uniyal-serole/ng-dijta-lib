import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DxTableColumn } from '../../interfaces/dx-table.interface';

@Component({
    selector: 'dx-flex-table',
    templateUrl: './flex-table.component.html',
    styleUrls: ['./flex-table.component.scss']
})
export class FlexTableComponent<T> {
    @HostBinding('class.disc-flex-table') readonly defaultClass: boolean = true;
    @Input()
    busy: boolean = false;
    /**
     * Table row max height
     */
    @Input() maxHeight: string = '';
    @Input()
    columns: Array<DxTableColumn<T>> = [];

    constructor(private readonly sanitizer: DomSanitizer) {
    }

    @HostBinding('style')
    get style(): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(`max-height: ${this.maxHeight}`);
    }
}
