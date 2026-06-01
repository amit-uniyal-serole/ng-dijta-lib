import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import {
  DxFilter,
  DxTableSetting,
  DxTableColumn,
  OnAction,
  BulkActions,
  SelectedRowsConfig,
  SelectedCheckboxConfig,
  SubmenuActionModel,
  MenuAction,
  DxColumnSortMenuOption,
  DxSortDirection,
} from '../../interfaces/dx-table.interface';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Sort, MatSort } from '@angular/material/sort';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';
import { DxTableData, DxTableMenuAction, DxTableRowEdit, iconData } from '../../interfaces/dx-additional.interface';
import { MatTable } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { Skeleton, SkeletonLoaderModel } from '../../../dx-skeleton-loader/skeleton-loader.constant';
import { MultiViewTable, TABLE_VIEW_TYPES } from '../../../dx-table-view-wrapper/model/table-view-wrapper.interface';
import { PageSize } from '../dx-paginator/dx-paginator.component';
import { isEqual, sortBy } from 'lodash';
import { TableLookupDataModel } from '../../interfaces/dx-table-lookup.interface';
import { NgForm } from '@angular/forms';
import { GroupAction } from '../../../dx-card';
@Component({
  selector: 'dx-table',
  templateUrl: './dx-table.component.html',
  styleUrls: ['./dx-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({
          height: '0px',
          minHeight: '0',
          visibility: 'hidden',
          display: 'none',
        })
      ),
      state(
        'expanded',
        style({
          height: '*',
          visibility: 'visible',
          padding: '13px',
          display: 'content',
        })
      ),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DxTableComponent<T> implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @ViewChild('table') table!: MatTable<T>;
  @ViewChild(MatSort) matSort?: MatSort;
  @ViewChild('f') form: NgForm | undefined;
  @Input() type: 'classic' | 'default' | 'canvas' = 'default';
  @Input() dxEmptyTemplate?: string | TemplateRef<void> | null;
  @Input() columns: Array<DxTableColumn<T>> = [];
  @Input() dataSource: DxTableData<T>[] = [];
  @Input() templateRef!: TemplateRef<any>;
  @Input() recordTemplateRef!: TemplateRef<any>;
  @Input() extraHeaderTemplateRef!: TemplateRef<any>;
  @Input() isBusy: boolean = false;
  @Input() isHeaderBusy: boolean = false;
  @Input() isAvatar: boolean = false;
  @Input() multiViewTable!: MultiViewTable;
  @Input() pageSizeList!: BulkActions;
  @Input() setting!: DxTableSetting;
  @Input() SelectedRows!: SelectedRowsConfig<T>;
  @Input() SelectedCheckboxes!: SelectedCheckboxConfig<T>;
  @Input() tableHeight: string | undefined;
  @Input() showDefaultEmptyContent: boolean = false;
  @Input() isCheckBoxClearLogic: boolean = true; // this temporarily added to support prod.
  @Input() dxNotFoundImage: any = 'default';
  @Input() dxNotFoundContent?: string | TemplateRef<void> | null;
  @Input() dxNotFoundFooter?: string | TemplateRef<void>;
  @Input() isKanbanView: boolean = false;
  @Output() onAction: EventEmitter<OnAction<DxTableData<T>>> =
    new EventEmitter<OnAction<DxTableData<T>>>();
  @Output() onSort: EventEmitter<Sort> = new EventEmitter<Sort>();
  @Output() onCheckboxChange: EventEmitter<DxTableData<T>[]> =
    new EventEmitter<DxTableData<T>[]>();
  @Output() onFilterClick: EventEmitter<DxFilter> =
    new EventEmitter<DxFilter>();
  @Output() onPaginationClick: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();
  @Output() onEventChange: EventEmitter<DxTableData<T>> = new EventEmitter<
    DxTableData<T>
  >();
  @Output() onToggleEventChange: EventEmitter<DxTableData<T>> = new EventEmitter<DxTableData<T>>();
  @Output() onRowSelection: EventEmitter<DxTableData<T>[]> = new EventEmitter<
    DxTableData<T>[]
  >();
  @Output() onClickTableViewSwitcher: EventEmitter<TABLE_VIEW_TYPES> = new EventEmitter<
    TABLE_VIEW_TYPES
  >();
  @Output() onClickTablePageSize: EventEmitter<PageSize> = new EventEmitter<
    PageSize
  >();
  @Output() onClickMenuAction: EventEmitter<DxTableMenuAction<T>> = new EventEmitter<
    DxTableMenuAction<T>
  >();
  @Output() onClickChangeViewAction: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClickSubMenu: EventEmitter<SubmenuActionModel> = new EventEmitter<SubmenuActionModel>();
  @Output() onClickCreateCustomView: EventEmitter<void> = new EventEmitter<void>();
  list: Array<DxTableColumn<T>> = []
  @Output() onLeftDropDownSearch: EventEmitter<string> = new EventEmitter<string>();
  clickedRows: SelectionModel<DxTableData<T>> = new SelectionModel<
    DxTableData<T>
  >(false, []);
  @Output() onRowDrop: EventEmitter<DxTableData<T>[]> = new EventEmitter<DxTableData<T>[]>();
  selection: SelectionModel<DxTableData<T>> = new SelectionModel<
    DxTableData<T>
  >(true, []);
  @Output() onClickMarkAsDefault: EventEmitter<MenuAction> = new EventEmitter<MenuAction>();
  @Output() onClickEditRow: EventEmitter<DxTableRowEdit<T>> = new EventEmitter<DxTableRowEdit<T>>();
  @Output() onClickRow: EventEmitter<DxTableData<T>> = new EventEmitter<DxTableData<T>>();
  @Output() onClickLookupLink: EventEmitter<TableLookupDataModel<T>> = new EventEmitter<TableLookupDataModel<T>>();
  @Output() onCheckboxSelectionChange: EventEmitter<SelectionChange<DxTableData<T>>> = new EventEmitter<SelectionChange<DxTableData<T>>>();
  @Output() onTableRowIconClick: EventEmitter<iconData<T>> = new EventEmitter<iconData<T>>();
  @Output() activeTabChange = new EventEmitter<number | string>();
  @Output() onRowRefresh = new EventEmitter<DxTableData<T>>();
  @Output() onClickOverlayButton: EventEmitter<DxTableRowEdit<T>> = new EventEmitter<DxTableRowEdit<T>>();
  @Output() fileView: EventEmitter<{ file: any; element: HTMLImageElement }> = new EventEmitter<{ file: any; element: HTMLImageElement }>();
  subscription!: Subscription;
  private suppressCheckboxEmit: boolean = false;
  private isViewInitialized: boolean = false;
  private pendingDefaultSort?: Sort;
  private defaultSortApplied: boolean = false;
  activeSort: Sort = { active: '', direction: '' };
  selected: string[] = [];
  displayedColumns: string[] = [];
  displayedColumnsNames: string[] = [];
  expandedElement!: DxTableData<T> | undefined;
  footerColumns: DxTableColumn<T>[] = [];
  columnSortDirections: Record<string, Sort['direction']> = {};
  checkBoxLoader: SkeletonLoaderModel = Skeleton.CheckBox;
  rowSelectLoader: SkeletonLoaderModel = Skeleton.verticalLine;
  headerSkeleton: SkeletonLoaderModel = {
    ...Skeleton.Text,
    width: '200px',
  };


  ngOnInit(): void {
    this.subscription = this.selection.changed.subscribe(
      (selected: SelectionChange<DxTableData<T>>) => {
        if (this.suppressCheckboxEmit) {
          return;
        }
        this.onCheckboxSelectionChange.emit(selected)
        this.onCheckboxChange.emit(selected.source.selected);
      }
    );

    if (this.setting?.multiRowSelect) {
      this.clickedRows = new SelectionModel<
        DxTableData<T>
      >(true, []);
    }

    this.subscription = this.clickedRows.changed.subscribe(
      (selected: SelectionChange<DxTableData<T>>) => {
        this.onRowSelection.emit(selected.source.selected);
      }
    );
    this.checkedAllSelected();
  }

  ngAfterViewInit(): void {
    this.isViewInitialized = true;
    this.tryApplyDefaultSort();
  }

  tableOverlayRefresh(event: DxTableData<T>): void {
    this.onRowRefresh.emit(event)
  }

  ngOnChanges(changes: SimpleChanges): void {
    const columnsChanged: boolean =
      changes?.['columns']?.previousValue !==
      changes?.['columns']?.currentValue;
    const settingChanged: boolean = !!changes?.['setting'];
    if (this.isCheckBoxClearLogic) {
      if (!isEqual(sortBy(changes?.dataSource?.currentValue), sortBy(changes?.dataSource?.previousValue))) {
        this.runWithoutCheckboxEmit(() => this.selection?.clear());
      }
    }
    if (columnsChanged) {
      this.columns = this.columns && this.columns?.length > 0 ? this.columns : []
      this.updateSetting();
      this.displayedColumns = this.selected?.concat(
        this.getAllHeaderRef(this.columns)
      );
      this.displayedColumnsNames = this.getAllHeaderName(this.columns);
      this.footerColumns = this.columns?.filter((item: DxTableColumn<T>) => item?.footer)
      this.initializeColumnSortDirections();
    }
    if (changes?.dataSource?.previousValue != changes?.dataSource?.currentValue) {
      this.dataSource = this.dataSource;
      if (this.SelectedRows?.key && this.SelectedRows?.value) {
        const SELECTED_ROW: DxTableData<T> | undefined = this.dataSource?.find((src: DxTableData<T>) => src?.data?.[this.SelectedRows?.key] == this.SelectedRows?.value)
        this.clickedRows?.select(SELECTED_ROW!)
      }
      if (this.SelectedCheckboxes?.key && this.SelectedCheckboxes?.value) {
        const SELECTED_CHECKBOXES: DxTableData<T>[] =
          this.SelectedCheckboxes?.value?.map((item: NonNullable<T>[keyof T]) => {
            return this.findRowFromDataSource(this.SelectedCheckboxes?.key, item)
          }
          )?.filter(selectedCheckBox => selectedCheckBox)

        if (SELECTED_CHECKBOXES?.length) {
          this.runWithoutCheckboxEmit(() => this.selection?.select(...SELECTED_CHECKBOXES!));
        }
      }
    }
    if (changes?.pageSizeList?.previousValue != changes?.pageSizeList?.currentValue) {
      this.pageSizeList = {
        ...changes?.pageSizeList?.currentValue
      }
    }
    if (changes?.isKanbanView?.previousValue != changes?.isKanbanView?.currentValue) {
      this.isKanbanView = changes?.isKanbanView?.currentValue;
    }
    if ((columnsChanged || settingChanged) && this.columns?.length) {
      this.resolveDefaultSortConfig();
    }
  }
  findRowFromDataSource(key: keyof T, matchWith: NonNullable<T>[keyof T]): DxTableData<T> {
    return this.dataSource?.find(src => src?.data?.[key] === matchWith)!
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected: number = this.selection.selected.length;
    const numRows: number = this.dataSource.filter((source) => !source.multiCheckbox?.disable).length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.filter((source) => !source.multiCheckbox?.disable));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DxTableData<T>): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

  drop(event: CdkDragDrop<string[]>) {
    const prevIndex: number = this.dataSource.findIndex(
      (d) => d === event.item.data
    );
    moveItemInArray(this.dataSource, prevIndex, event.currentIndex);
    this.table.renderRows();
    this.onRowDrop.emit(this.dataSource)
  }

  announceSortChange(sortState: Sort): void {
    this.activeSort = sortState;
    if (sortState?.active) {
      this.setColumnSortDirection(sortState.active, sortState.direction);
    } else {
      this.resetAllColumnSortDirections();
    }
    this.onSort.emit(sortState);
  }

  applySortFromMenu(column: DxTableColumn<T>, direction: Sort['direction']): void {
    if (!column?.columnDef) {
      return;
    }
    if (!direction) {
      this.clearTableSorting(column.columnDef);
      return;
    }
    const sortState: Sort = { active: column.columnDef, direction };
    this.setColumnSortDirection(column.columnDef, direction);
    this.activeSort = sortState;
    if (this.matSort) {
      this.matSort.active = column.columnDef;
      this.matSort.direction = direction;
      this.matSort.sortChange.emit(sortState);
      return;
    }

    this.onSort.emit(sortState);
  }

  private clearTableSorting(columnDef?: string): void {
    const sortState: Sort = { active: '', direction: '' };
    this.activeSort = sortState;
    if (columnDef) {
      this.setColumnSortDirection(columnDef, '');
    } else {
      this.resetAllColumnSortDirections();
    }
    if (this.matSort) {
      this.matSort.active = '';
      this.matSort.direction = '';
      this.matSort.sortChange.emit(sortState);
      return;
    }
    this.onSort.emit(sortState);
  }

  isSortOptionSelected(column: DxTableColumn<T>, direction: Sort['direction']): boolean {
    if (!column?.columnDef) {
      return false;
    }
    const columnDirection: Sort['direction'] =
      this.columnSortDirections?.[column.columnDef] ?? '';
    const normalizedDirection: Sort['direction'] = direction ?? '';
    return columnDirection === normalizedDirection;
  }

  isSortOptionDisabled(column: DxTableColumn<T>, direction: Sort['direction']): boolean {
    if (direction) {
      return false;
    }
    const columnDirection: Sort['direction'] =
      this.columnSortDirections?.[column?.columnDef] ?? '';
    return !columnDirection;
  }

  getSortMenuOptions(column: DxTableColumn<T>): DxColumnSortMenuOption[] {
    const columnOptions: DxColumnSortMenuOption[] | undefined =
      column?.sortMenu?.options;
    return columnOptions && columnOptions.length > 0
      ? columnOptions
      : [];
  }

  trackSortMenuOption(index: number, option: DxColumnSortMenuOption): string {
    return `${option?.direction ?? 'none'}-${option?.label ?? index}`;
  }

  getSortOptionIcon(option: DxColumnSortMenuOption): string {
    if (option?.icon) {
      return option.icon;
    }
    switch (option?.direction) {
      case 'asc':
        return 'arrow_upward';
      case 'desc':
        return 'arrow_downward';
      default:
        return 'close';
    }
  }

  onFilter(event: DxFilter): void {
    this.onFilterClick.emit(event);
  }
  onPagination(event: PageEvent): void {
    this.onPaginationClick.emit(event);
  }

  onTableExpand(element?: DxTableData<T>): void {
    this.expandedElement = element;
  }

  action(event: OnAction<DxTableData<T>>): void {
    this.onAction.emit(event);
  }

  eventChange(event: DxTableData<T> | undefined, val: string): void {
    this.onEventChange.emit(event);
  }
  onToggleChange(event: DxTableData<T> | undefined): void {
    this.onToggleEventChange?.emit(event)
  }
  private getAllHeaderRef(columns: Array<DxTableColumn<T>>): string[] {
    return columns?.map((col: DxTableColumn<T>) => col?.columnDef);
  }
  private getAllHeaderName(columns: Array<DxTableColumn<T>>): string[] {
    return columns?.map((col: DxTableColumn<T>) => col?.title);
  }

  private updateSetting(): void {
    if (this.setting?.rowArrange) {
      this.pushSetting('dragHandler');
    }
    if (this.setting?.multiSelect) {
      this.pushSetting('select')
    }
    if (this.setting?.singleRowSelect) {
      this.pushSetting('radio');
    }
  }

  private pushSetting(key: 'dragHandler' | 'select' | 'radio'): void {
    if (!this.selected.includes(key)) {
      this.selected.push(key);
    }
  }

  private checkedAllSelected(): void {
    this.runWithoutCheckboxEmit(() => {
      this.dataSource.forEach((val: DxTableData<T>) => {
        if (val?.multiCheckbox?.checked) {
          this.selection.select(val);
        }
      });
    });
  }
  getTotal(field: string): number {
    return this.dataSource?.map((t: DxTableData<any>) => t?.data[field])?.reduce((acc: number | string, value: number | string) => Number(acc) + Number(value), 0);
  }
  onClickViewSwitcher(event: TABLE_VIEW_TYPES): void {
    this.onClickTableViewSwitcher.emit(event)
  }
  onClickPageSize(event: PageSize): void {
    this.onClickTablePageSize?.emit(event)
  }
  onMenuAction(event: DxTableMenuAction<T>): void {
    this.onClickMenuAction.emit(event)
  }
  onClickChangeView(event: string): void {
    this.onClickChangeViewAction.emit(event);
  }
  clickCreateCustomView(): void {
    this.onClickCreateCustomView.emit()
  }

  leftDropDownSearch(event: string): void {
    this.onLeftDropDownSearch.emit(event)
  }
  onSubMenuClick(event: SubmenuActionModel): void {
    this.onClickSubMenu.emit(event)
  }
  onMarkAsDefault(event: MenuAction): void {
    this.onClickMarkAsDefault.emit(event);
  }
  onEditRowAction(event: DxTableRowEdit<T>): void {
    this.onClickEditRow.emit(event)
  }
  onClickOverlayButtonAction(event: DxTableRowEdit<T>): void {
    this.onClickOverlayButton.emit(event)
  }
  onRowClick(data: DxTableData<T>): void {
    if (this.setting?.enableRowClick) {
      this.onClickRow.emit(data)
    }
  }

  onLookupLink(event: TableLookupDataModel<T>): void {
    this.onClickLookupLink.emit(event)
  }
  onRowIconClick(event: iconData<T>): void {
    this.onTableRowIconClick.emit(event)
  }
  onFileViewClick(event: { file: any; element: HTMLImageElement }): void {
    this.fileView.emit(event);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initializeColumnSortDirections(): void {
    const updatedState: Record<string, Sort['direction']> = {};
    const columnKeys =
      this.columns?.map((col: DxTableColumn<T>) => col?.columnDef) ?? [];
    columnKeys.forEach((key: string) => {
      updatedState[key] = this.columnSortDirections?.[key] ?? '';
    });
    this.columnSortDirections = updatedState;
  }

  private resetAllColumnSortDirections(): void {
    const updatedState: Record<string, Sort['direction']> = {};
    const columnKeys =
      this.columns?.map((col: DxTableColumn<T>) => col?.columnDef) ??
      Object.keys(this.columnSortDirections ?? {});
    columnKeys.forEach((key: string) => {
      updatedState[key] = '';
    });
    this.columnSortDirections = updatedState;
  }

  private setColumnSortDirection(
    columnDef: string,
    direction: Sort['direction']
  ): void {
    if (!columnDef) {
      return;
    }
    const normalizedDirection: Sort['direction'] = direction ?? '';
    const columnKeys = new Set<string>([
      ...(this.columns?.map((col: DxTableColumn<T>) => col?.columnDef) ?? []),
      columnDef,
    ]);
    const updatedState: Record<string, Sort['direction']> = {};
    columnKeys.forEach((key: string) => {
      updatedState[key] = key === columnDef ? normalizedDirection : '';
    });
    this.columnSortDirections = updatedState;
  }

  private resolveDefaultSortConfig(): void {
    if (!this.columns || !this.columns.length) {
      return;
    }
    const explicitDefault = this.setting?.defaultSort;
    let targetColumn: DxTableColumn<T> | undefined;
    let direction: DxSortDirection | undefined = explicitDefault?.direction;
    if (explicitDefault?.columnDef) {
      targetColumn = this.columns.find(
        (col: DxTableColumn<T>) => col?.columnDef === explicitDefault.columnDef
      );
    }
    if (!targetColumn && this.setting?.columnDefaultSorts) {
      targetColumn = this.columns.find(
        (col: DxTableColumn<T>) =>
          !!this.getColumnDefaultSortDirection(col?.columnDef)
      );
      if (targetColumn) {
        direction = this.getColumnDefaultSortDirection(targetColumn.columnDef);
      }
    }
    if (!targetColumn) {
      targetColumn = this.columns.find(
        (col: DxTableColumn<T>) => !!col?.sortMenu?.defaultDirection
      );
    }
    if (!targetColumn) {
      this.pendingDefaultSort = undefined;
      return;
    }
    if (!direction) {
      direction =
        targetColumn?.sortMenu?.defaultDirection
          ? targetColumn?.sortMenu?.defaultDirection
          : 'desc';
    }
    this.pendingDefaultSort = {
      active: targetColumn.columnDef,
      direction,
    };
    this.defaultSortApplied = false;
    this.tryApplyDefaultSort();
  }

  private getColumnDefaultSortDirection(columnDef: string): DxSortDirection | undefined {
    const configuredDirection: DxSortDirection | undefined =
      this.setting?.columnDefaultSorts?.[columnDef];
    if (configuredDirection === 'asc' || configuredDirection === 'desc') {
      return configuredDirection;
    }
    return undefined;
  }

  private tryApplyDefaultSort(): void {
    if (
      this.defaultSortApplied ||
      !this.pendingDefaultSort ||
      !this.isViewInitialized
    ) {
      return;
    }
    const targetColumn: DxTableColumn<T> | undefined = this.columns?.find(
      (col: DxTableColumn<T>) => col?.columnDef === this.pendingDefaultSort?.active
    );
    if (!targetColumn) {
      return;
    }
    setTimeout(() => {
      this.applySortFromMenu(targetColumn!, this.pendingDefaultSort!.direction);
      this.defaultSortApplied = true;
      this.pendingDefaultSort = undefined;
    });
  }

  private runWithoutCheckboxEmit(action: () => void): void {
    this.suppressCheckboxEmit = true;
    try {
      action();
    } finally {
      this.suppressCheckboxEmit = false;
    }
  }
}
