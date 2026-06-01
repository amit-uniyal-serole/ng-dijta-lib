import { Subscription } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { DxTableData, DxTableMenuAction, DxTableRowEdit } from './../../interfaces/dx-additional.interface';
import { DxTableColumn, DxTableSetting, OnAction } from './../../interfaces/dx-table.interface';
import { Component, Input, ViewChild, TemplateRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dx-table-two',
  templateUrl: './dx-table-two.component.html',
  styleUrls: ['./dx-table-two.component.css']
})
export class DxTableTwoComponent<T>  {
  @ViewChild('table') table!: MatTable<T>;
  @Input() columns: Array<DxTableColumn<T>> = [];
  @Input() dataSource: DxTableData<T>[] = [];
  @Input() templateRef!: TemplateRef<any>;
  @Input() isBusy = false;
  @Input() isAvatar = false;
  @Input() setting!: DxTableSetting;
  @Output() onAction: EventEmitter<OnAction<DxTableData<T>>> =
    new EventEmitter<OnAction<DxTableData<T>>>();
  @Output() onEventChange: EventEmitter<DxTableData<T>> = new EventEmitter<
    DxTableData<T>
  >();
  @Output() onToggleEventChange: EventEmitter<DxTableData<T>> = new EventEmitter<DxTableData<T>>();
  @Output() onClickMenuAction: EventEmitter<DxTableMenuAction<T>> = new EventEmitter<
    DxTableMenuAction<T>
  >();
  @Output() onClickEditRow: EventEmitter<DxTableRowEdit<T>> = new EventEmitter<DxTableRowEdit<T>>();
  subscription!: Subscription;
  selected: string[] = [];
  displayedColumns: string[] = [];
  displayedColumnsNames: string[] = [];
  expandedElement!: DxTableData<T> | undefined;
  footerColumns: DxTableColumn<T>[] = [];
  onTableExpand(element?: DxTableData<T>): void {
    this.expandedElement = element;
  }

  action(event: OnAction<DxTableData<T>>): void {
    this.onAction.emit(event);
  }

  eventChange(event: DxTableData<T> | undefined): void {
    this.onEventChange.emit(event);
  }
  onToggleChange(event: DxTableData<T> | undefined): void {
    this.onToggleEventChange?.emit(event)
  }
  onMenuAction(event: DxTableMenuAction<T>): void {
    this.onClickMenuAction.emit(event)
  }
  onEditRowAction(event: DxTableRowEdit<T>): void {
    this.onClickEditRow.emit(event)
  }
}

