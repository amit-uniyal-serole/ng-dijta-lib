import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'dx-flex-table-cell',
    templateUrl: './flex-table-cell.component.html',
    styleUrls: ['./flex-table-cell.component.scss']
})
export class FlexTableCellComponent<T> {
    @HostBinding('attr.hoverCell')
    @Input()
    hoverCell: boolean = false;
    @Input()
  private _coreData: T | undefined;
  public get coreData(): T | undefined {
    return this._coreData;
  }
  public set coreData(value: T | undefined) {
    this._coreData = value;
  }

    // ************ Style Bindings ************ */
    @HostBinding('class.body-1')
    @Input() body1Class: boolean = true;

    @Input() discFlexTableCellClass: boolean = true;

    @HostBinding('class.disc-flex-table-cell')
    get isDiscFlexTableCellClass(): boolean {
        return this.discFlexTableCellClass
            && !this.hoverCell;
    }
}
