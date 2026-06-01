import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DxCanvasData, DxCanvasSetting } from '../dx-canvas';
import { PageSize } from '../dx-table/components/dx-paginator/dx-paginator.component';
import { DxTableData } from '../dx-table/interfaces/dx-additional.interface';
import { DxTableColumn, OnAction, DxFilter, DxTableSetting } from '../dx-table/interfaces/dx-table.interface';
import { MultiViewTable, TABLE_VIEW_TYPES } from './model/table-view-wrapper.interface';

@Component({
  selector: 'dx-table-view-wrapper',
  templateUrl: './dx-table-view-wrapper.component.html',
  styleUrls: ['./dx-table-view-wrapper.component.scss'],
})
export class DxTableViewWrapperComponent<T> implements OnInit {
  //self
  @Input() multiViewTable!: MultiViewTable;
  // Dx-Table
  @Input() columns: Array<DxTableColumn<T>> = [];
  @Input() dataSource: Array<DxTableData<T>> = [];
  @Input() templateRef!: TemplateRef<any>;
  @Input() isBusy: boolean = false;
  @Input() isAvatar: boolean = false
  @Output() onTableViewAction: EventEmitter<OnAction<DxTableData<T>>> =
    new EventEmitter<OnAction<DxTableData<T>>>();
  @Output() onTableViewSort: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() onTableViewCheckboxChange: EventEmitter<DxTableData<T>[]> =
    new EventEmitter<DxTableData<T>[]>();
  @Output() onTableViewFilterClick: EventEmitter<DxFilter> =
    new EventEmitter<DxFilter>();
  @Output() onTableViewPaginationClick: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Input() setting!: DxTableSetting;
  @Output() onTableViewEventChange: EventEmitter<DxTableData<T>> = new EventEmitter<
    DxTableData<T>
  >();
  @Output() onTableViewRowSelection: EventEmitter<DxTableData<T>[]> = new EventEmitter<
    DxTableData<T>[]
  >();
  @Output() onTablePageSizeChange: EventEmitter<PageSize> =
    new EventEmitter<PageSize>();
  // Dx-Canvas
  @Input() canvasDataSource!: DxCanvasData<T>[]
  @Input() canvasSetting!: DxCanvasSetting;
  @Input() cardActions!: DxTableColumn<T>;
  @Output() onCanvasViewCheckboxChange: EventEmitter<DxCanvasData<T>[]> =
    new EventEmitter<DxCanvasData<T>[]>();
  @Output() onCanvasViewPaginationClick: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Output() onClickCanvasViewHeaderAction: EventEmitter<DxFilter> =
    new EventEmitter<DxFilter>();
  @Output() onClickCanvasViewAction: EventEmitter<OnAction<T>> =
    new EventEmitter<OnAction<T>>();
  @Output() onCanvasPageSizeChange: EventEmitter<PageSize> =
    new EventEmitter<PageSize>();
  constructor() { }

  ngOnInit(): void {
  }

  //dx-table  Emitters
  onCheckboxChange(event: DxTableData<T>[]): void {
    this.onTableViewCheckboxChange.emit(event)
  }
  onRowSelection(event: DxTableData<T>[]): void {
    this.onTableViewRowSelection.emit(event)
  }
  onSort(event: Sort): void {
    this.onTableViewSort.emit(event)
  }
  onFilterClick(event: DxFilter): void {
    this.onTableViewFilterClick.emit(event)
  }
  onAction(event: OnAction<DxTableData<T>>): void {
    this.onTableViewAction.emit(event)
  }
  onEventChange(event: DxTableData<T>): void {
    this.onTableViewEventChange.emit(event)
  }
  onPaginationClick(event: PageEvent): void {
    this.onTableViewPaginationClick.emit(event)
  }
  onClickTablePageSize(event: PageSize): void {
    this.onTablePageSizeChange?.emit(event)
  }
  // dx-canvas Emitters
  onClickCanvasAction(event: OnAction<T>): void {
    this.onClickCanvasViewAction?.emit(event)
  }
  onClickCanvasHeaderAction(event: DxFilter) {
    this.onClickCanvasViewHeaderAction?.emit(event)
  }
  onCanvasPaginationClick(page: PageEvent): void {
    this.onCanvasViewPaginationClick?.emit(page)
  }
  onCanvasCheckboxChange(selected: DxCanvasData<T>[]): void {
    this.onCanvasViewCheckboxChange?.emit(selected)
  }
  onClickCanvasPageSize(event: PageSize): void {
    this.onCanvasPageSizeChange?.emit(event)
  }
  // self
  onClickViewSwitcher(viewType: TABLE_VIEW_TYPES): void {
    if (viewType) {
      this.multiViewTable.selectedView = viewType
    }
  }

}
