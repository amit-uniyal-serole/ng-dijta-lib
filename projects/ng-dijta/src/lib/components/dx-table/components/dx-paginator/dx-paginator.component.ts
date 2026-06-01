import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { isEqual, sortBy } from 'lodash';
import { ButtonActionTransform } from '../../../../utils/transform/button-actions.transform';
import { CustomLabelColor } from '../../../dx-button/dx-button.model';
import { MultiViewTable, TABLE_VIEW_TYPES } from '../../../dx-table-view-wrapper/model/table-view-wrapper.interface';
import { BulkActions, DxFilter, DxPaginationTab, DxTableSetting, FilterType, MenuAction, SubmenuActionModel } from '../../interfaces/dx-table.interface';
import { PaginatorData } from './paginator.data';
export interface PageSize {
  pageSize: number | string
}
@Component({
  selector: 'dx-paginator',
  templateUrl: './dx-paginator.component.html',
  styleUrls: ['./dx-paginator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxPaginatorComponent<T> implements OnInit, OnChanges {
  @Input() setting!: DxTableSetting;
  @Input() selection!: SelectionModel<T>;
  @Input() pageSize: string | number | undefined;
  @Input() isAllSelected!: boolean;
  @Input() multiViewTable!: MultiViewTable;
  @Input() showSeparator!: boolean;
  @Input() pageSizeList!: BulkActions;
  @Output() onFilter: EventEmitter<DxFilter> = new EventEmitter<DxFilter>();
  @Output() onPagination: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @Output() masterToggle: EventEmitter<void> = new EventEmitter<void>();
  @Output() onClickChangeView: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClickViewSwitcher: EventEmitter<TABLE_VIEW_TYPES> = new EventEmitter<TABLE_VIEW_TYPES>();
  @Output() onClickPageSize: EventEmitter<PageSize> = new EventEmitter<PageSize>();
  @Output() onClickCreateCustomView: EventEmitter<void> = new EventEmitter<void>();
  @Output() onLeftDropDownSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSubMenuClick: EventEmitter<SubmenuActionModel> = new EventEmitter<SubmenuActionModel>();
  @Output() onMarkAsDefault: EventEmitter<MenuAction> = new EventEmitter<MenuAction>();
  @Output() activeTabChange = new EventEmitter<number | string>();
  links = ['First', 'Second', 'Third', 'First', 'Second', 'Third'];
  mobileDevice: boolean = false
  pageSizeSelection: BulkActions = PaginatorData?.PageSize
  show: boolean = true;
  tabsData: DxPaginationTab[] | undefined = []
  menusData: DxPaginationTab[] | undefined = []

  onEvent(event: FilterType): void {
    this.onFilter.emit({
      type: event
    })
  }
  onPaginate(event: PageEvent): void {
    this.onPagination.emit(event)
  }

  @HostListener('window:resize', ['$event'])
  onWindowScroll() {
    let tabs = this.setting?.tabConfig?.tabs
    this.mobileDevice = window.outerWidth <= 600;
    this.tabsData = this.mobileDevice ? this.filterTabs('=', this.setting?.tabConfig?.activeTab) : tabs
    this.menusData = this.filterTabs('!',this.setting?.tabConfig?.activeTab)
  }

  ngOnInit(): void {
    this.onWindowScroll()
    this.updatePageSizeSelection();
    // this.show = !!(this.setting.colArrange && this.setting.download && this.setting.filter && this.setting.pagination)

  }

  onTabChange(tabEvent: string): void {
    this.tabsData = this.filterTabs('=', tabEvent)
    this.menusData = this.filterTabs('!', tabEvent)
    this.activeTabChange.emit(tabEvent)
    this.setting.tabConfig!.activeTab = tabEvent
  }

  filterTabs(operator: string, tabEvent: string | boolean | undefined): DxPaginationTab[] | undefined {
    if (operator === '=') {
      return this.setting?.tabConfig?.tabs?.filter((tab: DxPaginationTab) => tab?.event === tabEvent)
    }
    else {
      return this.setting?.tabConfig?.tabs?.filter((tab: DxPaginationTab) => tab?.event !== tabEvent)
    }
  }

  changeView(event: MenuAction): void {
    this.onClickChangeView?.emit(event?.type);
  }
  fillLabelColor(color: string): CustomLabelColor {
    const customColor: CustomLabelColor = {
      color: color
    }
    return customColor
  }
  onMasterToggle(): void {
    this.masterToggle?.emit()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!isEqual(sortBy(changes?.selection?.currentValue), sortBy(changes?.selection?.previousValue))) {
      this.selection?.clear()
    }

    if (changes?.setting?.previousValue !== changes?.setting?.currentValue) {
      this.setting.multiActionButtonSettings = ButtonActionTransform.updateActionSettings(this.setting.multiActionButtonSettings!)
    }
    if (changes?.pageSizeList?.previousValue !== changes?.pageSizeList?.currentValue) {
      this.updatePageSizeSelection();
    }
    if (changes?.pageSize?.previousValue && changes?.pageSize?.currentValue) {
      this.updatePageSizeSelection();
    }
  }
  private updatePageSizeSelection(): void {
    this.pageSizeSelection = {
      ...this.pageSizeSelection,
      label: this.setting?.pageSize?.toString() ?? this.pageSizeList?.label ?? PaginatorData?.defaultPageSizeDropdown?.defaultSize,
      actions: this.pageSizeList?.actions ?? PaginatorData?.defaultPageSizeDropdown?.actions
    }
  }
  onClickSelectView(viewType: TABLE_VIEW_TYPES): void {
    this.multiViewTable.selectedView = viewType
    this.onClickViewSwitcher?.emit(viewType)
  }
  onSelectPageSize(event: string): void {
    this.pageSizeSelection = {
      ...this.pageSizeSelection,
      label: this.setting?.pageSize?.toString() ?? this.pageSizeList?.label ?? PaginatorData?.defaultPageSizeDropdown?.defaultSize,
      actions: this.pageSizeList?.actions ?? PaginatorData?.defaultPageSizeDropdown?.actions
    }
    this.onClickPageSize?.emit({
      pageSize: event
    })
  }
  clickCreateCustomView(): void {
    this.onClickCreateCustomView.emit()
  }
  leftDropDownSearch(event: string): void {
    this.onLeftDropDownSearch.emit(event)
  }
  onBulkActionSubMenuClick(event: SubmenuActionModel): void {
    this.onSubMenuClick.emit(event)
  }
  onClickMarkAsDefault(event: MenuAction): void {
    this.onMarkAsDefault.emit(event)
  }
}
