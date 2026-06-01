import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { startCase } from 'lodash';
import { Observable, Subscription, of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AdditionalFilter, FormBuilderModuleDefinitionDto, LookupApiConfig, LookupModalActions, LookupModalHeaderSettings, ModuleRecordModel, MultiRecordSelectedIds, SearchParams, SelectedRecordsModel } from './model/dx-lookup-interface';
import { LookupModalService } from './service/lookup-modal.service';

import { isArray, pickBy, startsWith } from 'lodash';
import { PaginationRequest } from '../../dx-config-table';
import { BulkActions, DxFilter, DxTableColumn, DxTableColumnType, DxTableComponent, DxTableData, DxTableSetting, PageSize, SelectedCheckboxConfig, SelectedRowsConfig } from '../../dx-table';
import { DxGlobalConfigService } from '../../../service/global-config/dx-global-config.service';
import { DxDijtaGlobalConfig } from '../../../interface/config.detail.model';
@Component({
  selector: 'dx-lookup-modal',
  templateUrl: './lookup-modal.component.html',
  styleUrls: ['./lookup-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LookupModalComponent<T> implements OnInit {
  @ViewChild('table') tableRef!: DxTableComponent<any>;
  tableSettings!: DxTableSetting;
  actions: LookupModalActions = {
    enable: false
  }
  skeletonLoader$!: Observable<boolean>;
  lookUpHeaderSettings!: LookupModalHeaderSettings;
  lookupApiConfig!: LookupApiConfig<T>;
  selectedItems: { key: string, value: string, pkId: string }[] = []
  listTransform: any;
  columns!: DxTableColumn<T>[];
  dataSource: DxTableData<T>[] = [];
  originalDataSource: DxTableData<T>[] = [];
  searchControl: FormControl = new FormControl();
  lookupDataSubscription!: Subscription;
  moduleDefinitionSubscription!: Subscription;
  customViewSubscription!: Subscription;
  popupLoader$ = of(false);
  customViewloader$ = of(false)
  temparoryColumns: DxTableColumn<T>[] = [];
  moduleDetailsLoader$: Observable<boolean> = of(false);

  isGenericService: boolean = false;
  paginationRequest: PaginationRequest = {};
  recordIdentifier: any;
  selectedRecords: DxTableData<any>[] = [];
  singleRowSelection: SelectedRowsConfig<any> | undefined;
  multiRowSelection: SelectedCheckboxConfig<any> | undefined;
  multiRecordSelectionListPkIds: MultiRecordSelectedIds[] = [];
  remainingIds: number[] | undefined = [];
  config: any;
  additionalFilter: AdditionalFilter[] = []
  /**
   * If this dialog have closing issue.
   * Please check disableUpdatingMultiSelectionIds and disableUpdatingSingleSelectionId implementation
   */
  /**
   * @deprecated `Auto close dialog removed` 
   * Don't use disableUpdatingMultiSelectionIds
   */
  disableUpdatingMultiSelectionIds: boolean = false;
  /**
   *  @deprecated `Auto close dialog removed`
   * Don't use disableUpdatingSingleSelectionId
   */
  disableUpdatingSingleSelectionId: boolean = false;

  /**
   * FormGroup for filter
   */
  filterFg: FormGroup = new FormGroup({});
  showForm: boolean = false;
  singleRecordPayload!: { data: NonNullable<T>; recordIdentifier: any; };
  customViewDetails: any;
  pageSizeList: BulkActions = {};
  tablePageSize: number | undefined;
  submitButtonTitle!: string;
  @Output() actionEmitted: EventEmitter<DxFilter> = new EventEmitter<DxFilter>();
  constructor(
    private readonly dialogRef: MatDialogRef<LookupModalComponent<T>>,
    private readonly lookupModalService: LookupModalService<T>,
    private readonly fb: FormBuilder,
    private readonly dxGlobalConfigService: DxGlobalConfigService
  ) { }

  ngOnInit(): void {

    this.paginationRequest = this.lookupApiConfig?.body?.paginationRequest ?? this.lookupApiConfig?.paginationRequest;
    if (this.lookupApiConfig.newSearchFilter) {
      this.prepareSearch();
    }
    this.checkConfig();

  }

  private async checkConfig(): Promise<any> {
    const configDetails: DxDijtaGlobalConfig = await this.dxGlobalConfigService.getConfigDetails();
    if (configDetails && this.dxGlobalConfigService.getPageSize() && !this.lookupApiConfig.disableInitialCall) {
      if (this.paginationRequest) {
        this.paginationRequest.pageSize = this.dxGlobalConfigService.getPageSize();
      }
      if (this.isGenericService) {
        this.getLookUpList()
      } else {
        this.getModuleDefinition()
      }
    }

  }

  onClose(): void {
    this.dialogRef.close();
  }
  onPaginate(event: PageEvent): void {

    if (this.paginationRequest) {
      this.paginationRequest.pageNo = event?.pageIndex;
      this.paginationRequest.pageSize = event?.pageSize;
      this.tablePageSize = event?.pageSize;
    }
    this.getLookUpList();
  }

  onFilterSearch(): void {

    const search = this.additionalFilter.filter((item: AdditionalFilter) => item.value !== '' || !!item.value).map((item: AdditionalFilter) => {
      return `${item.field}:${item.operator}:${item.value}`
    }).join(",");
    if (this.lookupApiConfig.customSearchWithGenriceService) {
      this.paginationRequest.search = search;
      this.paginationRequest.pageNo = 0;
    } else {
      this.lookupApiConfig = {
        ... this.lookupApiConfig,
        paginationRequest: {
          ...this.lookupApiConfig.paginationRequest,
          search: search
        }
      };
    }


    this.getLookUpList()
  }

  onFilterReset(): void {
    this.additionalFilter = this.additionalFilter.map((item: AdditionalFilter) => {
      return {
        ...item,
        value: ''
      }
    });
    if (this.lookupApiConfig.customSearchWithGenriceService) {
      this.paginationRequest.search = undefined;
    } else {
      this.lookupApiConfig = {
        ... this.lookupApiConfig,
        paginationRequest: {
          ...this.lookupApiConfig.paginationRequest,
          search: ''
        }
      };
    }

    this.getLookUpList()
  }

  onHeaderActionClick(event: DxFilter): void {
    if (event.type === 'refresh') {
      if (this.tableSettings.pagination) {
        this.paginationRequest = {
          ...this.paginationRequest,
          pageSize: this.tableSettings.pageSize,
        };
      }

      this.getLookUpList();
    } else {
      this.actionEmitted.emit(event);
    }
  }

  onSort(event: Sort): void {
    if (event && this.paginationRequest) {
      this.paginationRequest.sortBy = event?.active;
      this.paginationRequest.sortOrder = event?.direction;

      this.getLookUpList();
    }
    if (event && this.isGenericService) {
      this.lookupApiConfig = {
        ... this.lookupApiConfig,
        paginationRequest: {
          sortBy: event?.active,
          sortOrder: event?.direction
        }
      }
      this.getLookUpList()
    }
  }
  onClickTablePageSize(event: PageSize | any): void {
    if (event.pageSize && this.paginationRequest) {
      this.tableSettings.pageSize = event?.pageSize;
      this.paginationRequest.pageSize = event.pageSize;
      this.tablePageSize = event?.pageSize;
      this.getLookUpList();
    }
  }

  onSelect(event: DxTableData<T>[]): void {

    if (this.singleRowSelection && event[0]?.data) {
      this.singleRowSelection.value = event[0]?.data[this.singleRowSelection?.key!]
    }

    if (event[0]?.data) {
      this.singleRecordPayload = {
        data: event[0]?.data,
        recordIdentifier: this.recordIdentifier
      }
    }

  }

  clear(): void {
    this.searchControl?.setValue('');
    this.search();
  }

  search(): void {
    const searchControl = this.searchControl?.value?.trim();
    this.paginationRequest.search = '';
    if (this.paginationRequest && this.lookupApiConfig?.searchBasedOn) {
      this.paginationRequest.search = searchControl && searchControl != '' ?
        [this.lookupApiConfig?.searchBasedOn] + `:${this.lookupApiConfig?.searchBasedOperator ?? 'lk'}:` + searchControl : '';
      this.paginationRequest.pageNo = 0;
      this.getLookUpList();
    }
  }

  onSearch(): void {
    if (this.filterFg.valid) {

      if (this.lookupApiConfig.newSearchFilter?.isServerSearch) {
        if (this.lookupApiConfig?.transformPayload) {
          this.lookupApiConfig = this.lookupApiConfig?.transformPayload(this)
        } else {
          this.paginationRequest = {
            ...this.paginationRequest,
            search: ''
          };
          const searches = Object.keys(this.cleanObject(this.filterFg.value)).map((key: string) => {
            const operators = this.lookupApiConfig.newSearchFilter?.searchParams.find((search) => search.field === key)?.search;
            return `${key}:${operators ?? 'lk'}:${this.filterFg.value[key]}`
          });
          this.paginationRequest.search = searches.join(',');
          this.paginationRequest.pageNo = 0;
        }

        this.getLookUpList();
      } else {
        this.dataSource = this.filterArray(this.originalDataSource, this.cleanObject(this.filterFg.value));
      }
    }

  }
  reset(): void {
    this.filterFg.reset();
    if (this.lookupApiConfig.newSearchFilter?.isServerSearch) {
      this.paginationRequest.search = undefined;
      this.paginationRequest.pageNo = 0;
      this.getLookUpList();
    } else {
      this.dataSource = this.originalDataSource;
    }
  }

  private filterArray<T>(array: DxTableData<T>[], filterObject: Partial<T>): DxTableData<T>[] {
    return array.filter(item =>
      Object.keys(filterObject).every(key => {
        const searchField: SearchParams<any> | undefined =
          this.lookupApiConfig.newSearchFilter?.searchParams.find(search => search.field === key);

        if (searchField?.search === 'lk') {
          return item.data[key]?.toString().toLowerCase().includes(filterObject[key]?.toString().toLowerCase());
        }

        return item.data[key] == filterObject[key];
      })
    );
  }
  private cleanObject(obj: Partial<T>): Partial<any> {
    return pickBy(obj, value => {
      // Exclude empty strings, undefined, null, and empty arrays
      return !(value === '' || value === undefined || value === null || (isArray(value) && value.length === 0));
    });
  }

  getLookUpList(): void {
    this.lookupDataSubscription?.unsubscribe();
    if (this.paginationRequest && this.tableSettings.pagination) {
      this.paginationRequest.pageSize = this.tablePageSize ?? this.customViewDetails?.listSize ?? this.paginationRequest?.pageSize ?? 10;
      if (this.lookupApiConfig?.staticSearch) {
        this.paginationRequest.search = this.paginationRequest.search?.split(',')
          ?.filter(searchItem => searchItem != this.lookupApiConfig?.staticSearch)?.join(',');
        this.paginationRequest.search = this.paginationRequest.search
          ? `${this.lookupApiConfig?.staticSearch},${this.paginationRequest.search}`
          : this.lookupApiConfig?.staticSearch;
      }
    }
    this.skeletonLoader$ = of(true);
    this.lookupApiConfig = {
      ...this.lookupApiConfig,
      body: {
        ...this.lookupApiConfig?.body,
        paginationRequest: this.tableSettings.pagination ? this.paginationRequest : undefined
      }
    };
    this.lookupDataSubscription = this.lookupModalService.getLookupServiceRequest(this.lookupApiConfig).subscribe(
      {
        next: (response: ModuleRecordModel) => {
          if (response) {
            const moduleResponse = response?.response ?? response
            this.tableSettings.totalItems = moduleResponse?.totalElements;
            this.tableSettings.pageIndex = moduleResponse?.number;
            this.tableSettings.pageSize = moduleResponse?.size;
            if (this.listTransform) {
              this.dataSource = this.listTransform(moduleResponse, this.config, this);
            } else {
              this.dataSource = moduleResponse?.content?.map((item: any) => {
                const additionalRecord = this.selectedItems?.find((record) => record.pkId === item.pkId);
                let additionObj: any;
                if (additionalRecord && additionalRecord.key) {
                  additionObj = {
                    [additionalRecord?.key!]: [additionalRecord?.value!]
                  }
                }
                return {
                  data: {
                    ...this.getValue(item),
                    ...additionObj
                  },
                };
              }) as DxTableData<any>[];
            }
            this.originalDataSource = this.dataSource;
            this.skeletonLoader$ = of(false);
          }
        },
        error: (error) => {
          this.skeletonLoader$ = of(false);
        }
      }
    );
  }

  private getValue(src: any): { [key: string]: any } {
    let tempObject: any = {}
    Object.keys(src).forEach((key: string) => {
      const value = typeof src[key] === 'object' ? src[key]?.['name'] : src[key];
      tempObject[key] = value;
    });
    return tempObject
  }



  /**
   * @description Module Defintion
   */
  private getModuleDefinition(): void {
    const moduleDefinition: LookupApiConfig<T> = {
      method: 'GET',
      api: `${this.lookupApiConfig?.rootUrl}/v1/module/settings?module=${this.lookupApiConfig?.body?.module}`,
    }
    this.popupLoader$ = of(true);
    this.moduleDefinitionSubscription = this.lookupModalService.getLookupServiceRequest(moduleDefinition)
      .pipe(filter((data: FormBuilderModuleDefinitionDto) => !!data)).subscribe(
        (moduleDefinition: FormBuilderModuleDefinitionDto) => {
          if (moduleDefinition) {
            const recordIdentifier: string | undefined = this.finalRecordIdentifier(moduleDefinition?.recordIdentifier);
            this.recordIdentifier = this.recordIdentifier ?? recordIdentifier;
            this.lookupApiConfig.searchBasedOn = this.recordIdentifier as any;
            this.lookUpHeaderSettings.title = `${this.lookUpHeaderSettings?.titlePrefix ?? 'Select'} ${moduleDefinition?.modulePluralName}`;
            if (this.lookUpHeaderSettings?.isServiceDefined) {
              this.lookUpHeaderSettings.title = `${this.lookUpHeaderSettings?.titlePrefix ?? 'Select'} ${moduleDefinition?.modulePluralName}`;
              this.lookUpHeaderSettings.searchInputLabel = `Search ${startCase(this.recordIdentifier)}`;
            }
            this.temparoryColumns = [
              {
                field: this.recordIdentifier as any,
                columnDef: this.recordIdentifier as any,
                title: `${this.recordIdentifier}`,
                type: 'text',
              }
            ];
            this.getModuleCustomView(moduleDefinition?.customViewList?.defaultView?.customViewId!)
          }
          this.popupLoader$ = of(false);
        },
        (error) => {
          this.popupLoader$ = of(false);
        }
      )

  }

  /**
   * @description Module Custom View 
   */
  private getModuleCustomView(customViewId: number): void {
    if (customViewId) {
      const customViewSettings: LookupApiConfig<T> = {
        method: 'GET',
        api: `${this.lookupApiConfig?.rootUrl}/v1/settings/customView/getViewDetails?customViewId=${customViewId}`,
      }
      this.customViewloader$ = of(true);
      this.customViewSubscription = this.lookupModalService.getLookupServiceRequest(customViewSettings)
        .pipe(filter(data => !!data)).subscribe(
          (viewResponse) => {
            if (viewResponse) {
              this.pageSizeList = {
                label: viewResponse?.listSize ? viewResponse?.listSize?.toString() : '10'
              };
              this.customViewDetails = viewResponse;
              this.columns = []
              this.columns = this.prepareTableColums(viewResponse?.fields);
              this.getLookUpList();
            }
            this.customViewloader$ = of(false);
          },
          (error) => {
            this.customViewloader$ = of(false);
          }
        )
    } else {
      this.getLookUpList();
    }
  }

  private prepareTableColums(src: any[]): DxTableColumn<T>[] {
    return src?.map((item: any) => {
      return {
        field: item?.fieldName!,
        columnDef: item?.fieldName!,
        title: item?.displayLabel!,
        type: this?.getCoumnDataType(item?.columnDataType!)!,
      };
    });
  }
  private getCoumnDataType(columType: string): DxTableColumnType | undefined {
    switch (columType) {
      case 'AutoNumber':
        return 'text';
      case 'Number':
        return 'text';
      case 'Text':
        return 'text';
      case 'DateTime':
        return 'datetime';
      case 'Date':
        return 'date';
      case 'Currency':
        return 'currency';
      case 'Tag':
        return 'tag';
      case 'Percentage':
        return 'percentage' as any;
      case 'Picklist':
        return 'text'
      case 'MultiPicklist':
        return 'dropdown'
      case 'URL':
        return 'URL';
      case 'Email':
        return 'email';
      case 'ContactNumber':
        return 'contact';
      case 'Lookup':
      case 'MultiModuleLookup':
      case 'User':
        return 'lookup';
      case 'RtfEditor':
        return 'ONLY_HTML';
      case 'TextArea':
        return 'ONLY_HTML'
      default:
        return 'text';
    }
  }

  public onCheckboxChange(event: DxTableData<any>[]): void {
    this.remainingIds = this.multiRowSelection?.value?.filter((id: number) => !!!event?.find((e: DxTableData<any>) => id === e?.data?.pkId));
    const index: number = this.multiRecordSelectionListPkIds?.findIndex((item: MultiRecordSelectedIds) => item?.page === this.paginationRequest?.pageNo);
    let obj: MultiRecordSelectedIds = {
      page: this.paginationRequest?.pageNo,
      ids: event?.map((data: DxTableData<any>) => data?.data?.pkId),
      data: event?.map((data: DxTableData<any>) => data)
    }

    if (index != -1) {
      this.multiRecordSelectionListPkIds[index] = {
        ...this.multiRecordSelectionListPkIds[index],
        ids: obj?.ids,
        data: obj?.data
      }
    } else {
      this.multiRecordSelectionListPkIds.push(obj)
    }

    if (this.multiRowSelection) {
      this.multiRowSelection.value = [
        ...this.remainingIds ?? [],
        ...this.multiRecordSelectionListPkIds?.map((data: MultiRecordSelectedIds) => data?.ids)?.flat(),
      ]
    }

    this.selectedRecords = this.multiRecordSelectionListPkIds?.map((data: MultiRecordSelectedIds) => data?.data!)?.flat() ?? [];

  }
  public onClickSave(): void {
    if (this.tableSettings?.singleRowSelect) {
      this.dialogRef.close(this.singleRecordPayload);
    } else {
      const data: SelectedRecordsModel = {
        selectedRecords: this.selectedRecords,
        recordIdentifier: this.recordIdentifier
      }
      this.dialogRef.close(data);
    }
  }

  private finalRecordIdentifier(src: string | undefined): string | undefined {
    const namePopedFieldName: string[] | undefined = src?.split(" ");
    namePopedFieldName?.pop();
    return src?.split(' ').join('')
  }

  private prepareSearch(): void {
    const formGroupConfig = {};

    for (const control of this.lookupApiConfig.newSearchFilter?.searchParams ?? []) {
      if (control.field) {
        formGroupConfig[control.field as string] = [
          control.value,
        ];
      }
    }
    this.filterFg = this.fb.group(formGroupConfig);
  }


  ngOnDestroy(): void {
    this.lookupDataSubscription?.unsubscribe();
    this.moduleDefinitionSubscription?.unsubscribe();
    this.customViewSubscription?.unsubscribe();
  }
}
