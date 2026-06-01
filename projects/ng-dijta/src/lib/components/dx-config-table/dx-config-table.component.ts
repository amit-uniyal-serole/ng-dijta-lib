import {
    Component,
    EventEmitter,
    Input, OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable, Subscription } from 'rxjs';
import { GenericService } from '../../core/UI/service/generic-service/generic-service.service';
import { DxFilter, DxTableData, OnAction } from '../dx-table';
import { DxTableFilterComponent } from '../dx-table-filter/dx-table-filter.component';
import { DxTableFilterSettings } from '../dx-table-filter/model/dx-table-filter.model';
import { DxTableConfig, DxConfigTableSettings, FilterResult } from './model/dx-config-table';
import { TableServiceService } from './table-service.service';
import { ConfigTableTransform } from './transform/config-data-tranform';


@Component({
  selector: 'dx-config-table',
  templateUrl: './dx-config-table.component.html',
  styleUrls: ['./dx-config-table.component.css'],
})
export class DxConfigTableComponent<T> implements OnInit, OnDestroy {
  @Input() configUrl!: string;
  @Output() onAction: EventEmitter<OnAction<DxTableData<T>>> = new EventEmitter<
    OnAction<DxTableData<T>>
  >();
  @Output() onFilterClick: EventEmitter<DxFilter> =
    new EventEmitter<DxFilter>();
  @Output() onCheckboxChange: EventEmitter<DxTableData<T>[]> = new EventEmitter<
    DxTableData<T>[]
  >();

  data$!: Observable<T>;
  tableConfig!: DxConfigTableSettings<T>;
  subscription!: Subscription;
  filterSubscription!: Subscription;
  dataSource: any;
  setPreviousFilterValues!: FilterResult;
  constructor(
    private readonly tableServiceService: TableServiceService,
    private readonly genericService: GenericService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getTableConfig(this.configUrl);
  }
  /**
   *
   * @param configUrl table  config (settings,columns,pageable and pageSizeList)
   */
  private getTableConfig(configUrl: string): void {
    this.subscription = this.tableServiceService
      .getTableConfig(configUrl)
      .subscribe((tableConfig: DxTableConfig<T>) => {
        this.tableConfig = tableConfig?.tableConfig;
        if (this.tableConfig?.pageSizeList && this.tableConfig?.pageable) {
          this.tableConfig.pageSizeList.label =
            this.tableConfig?.pageSizeList?.actions?.find(
              (action) => action?.defaultPageSize
            )?.type! ?? undefined;
          this.tableConfig.pageable.pageSize = Number(
            this.tableConfig?.pageSizeList?.label ?? 10
          );
        }
        this.getTableData(this.tableConfig);
      });
  }
  /**
   *
   * @param config to get data from dataUrl
   */
  private getTableData(config: DxConfigTableSettings<T>): void {
    if (config?.dataUrl) {
      if (config?.pageable) {
        config.dataUrl = this.genericService?.queryStringParamsBuilder(config);
      }
      this.tableServiceService.getTableData(config.dataUrl).subscribe((res) => {
        if (this.tableConfig?.setting) {
          this.tableConfig.setting.totalItems = res?.totalElements;
          this.tableConfig.setting.pageSize = res?.size;
        }
        this.data$ = ConfigTableTransform.dataTransform(res, this.tableConfig);
      });
    }
  }
  /**
   *
   * @param event PageEvent on pagination
   */
  onPaginationClick(event: PageEvent): void {
    if (this.tableConfig.pageable) {
      this.tableConfig.pageable.pageNo = event?.pageIndex;
      this.getTableData(this.tableConfig);
    }
  }

  /**
   *
   * @param event PageEvent on paginator bar page size change
   */
  onClickTablePageSize(event: PageEvent): void {
    if (this.tableConfig?.pageable) {
      this.tableConfig.pageable.pageSize = event?.pageSize;
      this.getTableData(this.tableConfig);
    }
  }
  /**
   *
   * @param event DxFilter Emits on click of paginator bar actions (except refresh)
   */
  onClickHeaderActions(event: DxFilter): void {  
    if (event.type === 'refresh') {
      this.getTableData(this.tableConfig);
    } else if (event.type === 'filter') {
      this.filterTableData();
    } else {
      this.onFilterClick?.emit(event);
    }
  }
  /**
   *
   * @param event Sort on column sort
   */
  onSort(event: Sort): void {
    if (this.tableConfig?.pageable) {
      this.tableConfig.pageable.sortOrder = event?.direction;
      this.tableConfig.pageable.sortBy = event?.active;
      this.getTableData(this.tableConfig);
    }
  }
  /**
   *
   * @param event OnAction<DxTableData<T>> Emits on row actions
   */
  onSelectAction(event: OnAction<DxTableData<T>> | undefined): void {
    this.onAction?.emit(event);
  }
  /**
   *
   * @param event DxTableData<T>[] emits on change of chekbox
   */
  onClickCheckbox(event: DxTableData<T>[] | undefined): void {
    this.onCheckboxChange?.emit(event);
  }

  /**
   * @description filter table data based on filter pop up data
   */
  private filterTableData(): void {
    const dialogRef: MatDialogRef<DxTableFilterComponent> = this.dialog.open(
      DxTableFilterComponent,
      {
        panelClass: 'custom-dialog-container',
      }
    );
    this.previousFilterData()
    dialogRef.componentInstance.filterSettings =
      this.tableConfig?.filterSettings;
    this.filterSubscription = dialogRef
      .afterClosed()
      .subscribe((result:FilterResult) => {
        if (result) {
          this.setPreviousFilterValues = result;        
          this.tableConfig.pageable = this.genericService.onSearch(
            result,
            this.tableConfig?.pageable
          );
          this.getTableData(this.tableConfig);
        }
      });
  }
  /**
   * @description set previous filtered data
   */
  private previousFilterData():void{
    if (this.setPreviousFilterValues && this.tableConfig.filterSettings) {
      for (const key in this.setPreviousFilterValues) {
        this.tableConfig.filterSettings.forEach((item:DxTableFilterSettings) => {
          if (item && item.name === key) {
            item.defaultValue = this.setPreviousFilterValues[key];
          }
        });
      }
    }

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
