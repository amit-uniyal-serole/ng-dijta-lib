import { Component, EventEmitter, Injector, Input, Output, SimpleChanges } from '@angular/core';
import { Skeleton, SkeletonLoaderModel } from '../../../dx-skeleton-loader';
import { DxTableData, DxTableMenuAction, DxTableRowEdit, iconData } from '../../interfaces/dx-additional.interface';
import { DxTableColumn, MenuAction, OnAction } from '../../interfaces/dx-table.interface';
import { TableLookupDataModel } from '../../interfaces/dx-table-lookup.interface';

@Component({
  selector: 'dx-table-field-wrapper',
  templateUrl: './dx-table-field-wrapper.component.html',
  styleUrls: ['./dx-table-field-wrapper.component.scss']
})
export class DxTableFieldWrapperComponent<T> {

  @Input() column!: DxTableColumn<T>;
  @Input() source!: DxTableData<T>;
  @Input() expandData!: DxTableData<T>;
  @Input() isBusy!: boolean
  @Output() onExpand: EventEmitter<DxTableData<T>> = new EventEmitter<DxTableData<T>>();
  @Output() onAction: EventEmitter<OnAction<DxTableData<T>>> = new EventEmitter<OnAction<DxTableData<T>>>();
  @Output() onEventChange: EventEmitter<DxTableData<T>> = new EventEmitter<DxTableData<T>>();
  @Output() onToggleEventChange: EventEmitter<DxTableData<T>> = new EventEmitter<DxTableData<T>>();
  @Output() onMenuAction: EventEmitter<DxTableMenuAction<T>> = new EventEmitter<DxTableMenuAction<T>>();
  @Output() onEditRowAction: EventEmitter<DxTableRowEdit<T>> = new EventEmitter<DxTableRowEdit<T>>();
  @Output() onClickLookupLink: EventEmitter<TableLookupDataModel<T>> = new EventEmitter<TableLookupDataModel<T>>();
  @Output() onRowIconClick: EventEmitter<iconData<T>> = new EventEmitter<iconData<T>>();

  TextSkeleton: SkeletonLoaderModel = Skeleton.Text
  AvatarSkeleton: SkeletonLoaderModel = Skeleton.Avatar
  checkBoxLoader: SkeletonLoaderModel = Skeleton.CheckBox;
  chipSkeleton: SkeletonLoaderModel = Skeleton.chip;
  iconTextSkeleton: SkeletonLoaderModel = Skeleton.IconText
  // cache injectors for each row + column
  private injectorCache = new WeakMap<object, Map<string, Injector>>();
  private readonly primitiveInjectorCache = new Map<string, Injector>();

  constructor(private readonly injector: Injector) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['column'] || changes['source']) {
      this.injectorCache = new WeakMap(); // reset when inputs change
    }
  }
  onExpandToggle(data?: DxTableData<T>): void {
    this.onExpand.emit(data);
  }
  externalAction(event: OnAction<DxTableData<T>>): void {
    this.onAction.emit(event);
  }
  updateInput(): void {
    this.onEventChange.emit(this.source)
  }
  onClickRowAction(event:MenuAction):void{
    const payload:DxTableMenuAction<T>={
      data:this.source,
      event:event
    }
   this.onMenuAction.emit(payload)
  }
  onToggleChange():void{    
    this.onToggleEventChange.emit(this.source)
  }
  onClickEditRowAction(event:string,data:DxTableData<T>):void{
    const payload:DxTableRowEdit<T>={
      type:event,
      data:data
    }
    this.onEditRowAction.emit(payload)
  }

  onLookupLink(data:TableLookupDataModel<T>):void{
    this.onClickLookupLink.emit(data);
  }

  onIconClick(event:string):void{
    this.onRowIconClick.emit({data:this.source,type:event})
  }

  getInjector(row: any, column: DxTableColumn<any>): Injector {
    if (row && typeof row === 'object') {
      let rowMap = this.injectorCache.get(row);
      if (!rowMap) {
        rowMap = new Map();
        this.injectorCache.set(row, rowMap);
      }
      if (!rowMap.has(column.columnDef)) {
        rowMap.set(column.columnDef, this.create(row, column));
      }
      return rowMap.get(column.columnDef)!;
    } else {
      // fallback for primitives
      const key = String(row) + '::' + column.columnDef;
      if (!this.primitiveInjectorCache.has(key)) {
        this.primitiveInjectorCache.set(key, this.create(row, column));
      }
      return this.primitiveInjectorCache.get(key)!;
    }
  }

  private create(row: any, column: DxTableColumn<any>): Injector {
    return Injector.create({
      providers: [
        { provide: 'ROW_DATA', useValue: row },
        { provide: 'COLUMN_DEF', useValue: column },
      ],
      parent: this.injector,
    });
  }
}
