import { SelectionChange } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import lodash, { isArray, startCase } from 'lodash';
import { Observable, of, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PaginationRequest } from '../../dx-config-table';
import { LookupApiConfig, LookupModalService } from '../../dx-lookup';
import { BulkActions, DxFilter, DxTableColumn, DxTableColumnType, DxTableData, DxTableSetting, PageSize, SelectedCheckboxConfig, SelectedRowsConfig } from '../../dx-table';
import { MultiLookupModalActions, MultiLookupModalHeaderSettings, MultiLookupModuleDefinitionDto, MultiLookupModuleRecordModel, MultiLookupRecordSelectedIds, MultiLookupSelectedRecordsModel } from './interface/dx-mulit-lookup-interface';
@Component({
  selector: 'dx-multi-lookup-modal',
  templateUrl: './multi-lookup-modal.component.html',
  styleUrls: ['./multi-lookup-modal.component.scss']
})
export class MultiLookupModalComponent<T> implements OnInit {
  setting!: DxTableSetting;
  actions: MultiLookupModalActions = {
    enable: false
  }
  skeletonLoader$!: Observable<boolean>;
  lookUpHeaderSettings!: MultiLookupModalHeaderSettings;
  lookupApiConfig!: LookupApiConfig<T>;
  saveConfig!: {
    apiConfig?: LookupApiConfig<any>;
    payloadTransform?: any;
  };
  listTransform: any;
  columns!: DxTableColumn<T>[];
  dataSource: DxTableData<T>[] = [];
  searchControl: FormControl = new FormControl();
  moduleName!: string;
  lookupDataSubscription!: Subscription;
  moduleDefinitionSubscription!: Subscription;
  customViewSubscription!: Subscription;
  popupLoader$ = of(false);
  customViewloader$ = of(false)
  temparoryColumns: DxTableColumn<T>[] = [];
  //moduleDetails: any;
  moduleDetailsLoader$: Observable<boolean> = of(false);
  fieldType!: string;
  paginationRequest!: PaginationRequest | undefined;
  recordIdentifier: any;
  selectedRecords: DxTableData<any>[] = [];
  rootUrl: string | undefined;

  singleRowSelection: SelectedRowsConfig<any> | undefined;
  multiRowSelection: SelectedCheckboxConfig<any> | undefined;
  selectedItems: { key: string, value: string, pkId: string }[] = []
  multiRecordSelectionListPkIds: MultiLookupRecordSelectedIds[] = [];
  remainingIds: number[] | undefined = [];
  /**
   * If this dialog have closing issue.
   * Please check disableUpdatingMultiSelectionIds and disableUpdatingSingleSelectionId implementation
   */
  disableUpdatingMultiSelectionIds: boolean = false;
  selectedRecordsItems: DxTableData<any>[] = [];
  isEdit: boolean | undefined;
  unassignedList: DxTableData<any>[] = [];
  isAddMore: boolean = false;
  moduleDefinition: MultiLookupModuleDefinitionDto | undefined;
  isGenericService: boolean = false;
  config: any;
  enableTwoStepConfirmation: boolean = false;
  picklistLoading: boolean = false;
  pickListSubscription: any;
  pickListConfigList: any;
  customViewDetails: any;
  pageSizeList: BulkActions = {};
  tablePageSize: number | undefined;
  submitButtonTitle!: string;
  isLoading!: boolean;
  constructor(
    private readonly dialogRef: MatDialogRef<MultiLookupModalComponent<MultiLookupSelectedRecordsModel>>,
    private readonly lookupModalService: LookupModalService<T>
  ) { }

  ngOnInit(): void {
    if (this.enableTwoStepConfirmation) {
      this.isEdit = !!this.multiRowSelection?.value?.length;
    };
    this.paginationRequest = this.lookupApiConfig?.body?.paginationRequest ?? this.lookupApiConfig?.paginationRequest;
    if (this.isGenericService) {
      this.getLookUpList()
    } else {
      this.getModuleDefinition()
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
  onPaginate(event: PageEvent): void {

    if (this.paginationRequest) {
      this.paginationRequest.pageNo = event?.pageIndex;
      this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;

    }
    this.getLookUpList();
  }

  onHeaderActionClick(event: DxFilter): void {
    if (event.type === 'refresh') {
      this.paginationRequest = {
        ...this.paginationRequest,
        pageSize: this.setting.pageSize,
      };
      this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;

      this.getLookUpList();
    }
  }

  onSort(event: Sort): void {
    if (event && this.paginationRequest) {
      this.paginationRequest.sortBy = event?.active;
      this.paginationRequest.sortOrder = event?.direction;
      this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;

      this.getLookUpList();
    }
  }
  onClickTablePageSize(event: PageSize | any): void {
    if (event.pageSize && this.paginationRequest) {
      this.setting.pageSize = event?.pageSize;
      this.paginationRequest.pageSize = event.pageSize;
      this.tablePageSize = event?.pageSize;
      this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;

      this.getLookUpList();
    }
  }

  onSelect(event: DxTableData<T>[]): void {

    const payload = {
      data: event[0].data,
      recordIdentifier: this.recordIdentifier
    }
    this.dialogRef.close(payload);

  }

  onClickBack(): void {
    this.selectedRecordsItems = [];
  }
  onClickNext(): void {
    this.selectedRecordsItems = this.selectedRecords;
  }


  clear(): void {
    this.searchControl?.setValue('');
    this.search();
  }

  search(): void {
    const searchControl = this.searchControl?.value?.trim();
    this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;
    if (this.paginationRequest) {
      this.paginationRequest.search = '';
    }
    if (this.paginationRequest && this.lookupApiConfig?.searchBasedOn) {
      this.paginationRequest.search = searchControl && searchControl != '' ?
        [this.lookupApiConfig?.searchBasedOn] + ':sw:' + searchControl : '';
      this.paginationRequest.pageNo = 0;
      this.getLookUpList();
    }
  }

  private getLookUpList(): void {
    if (this.paginationRequest) {
      this.paginationRequest.pageSize = this.tablePageSize ?? this.customViewDetails?.listSize ?? this.paginationRequest?.pageSize ?? 10;
      if (this.lookupApiConfig?.staticSearch) {
        this.paginationRequest.search = this.paginationRequest.search?.split(',')
          ?.filter(searchItem => searchItem != this.lookupApiConfig?.staticSearch)?.join(',');
        this.paginationRequest.search = this.paginationRequest.search
          ? `${this.lookupApiConfig?.staticSearch},${this.paginationRequest.search}`
          : this.lookupApiConfig?.staticSearch;
      }
    };
    this.skeletonLoader$ = of(true);
    this.lookupApiConfig = {
      ...this.lookupApiConfig,
      body: {
        ...this.lookupApiConfig?.body,
        paginationRequest: this.paginationRequest
      }
    };
    this.lookupDataSubscription = this.lookupModalService.getLookupServiceRequest(this.lookupApiConfig).subscribe(
      (response: MultiLookupModuleRecordModel) => {
        if (response) {
          const moduleResponse: any = response?.response ?? response
          this.setting.totalItems = moduleResponse?.totalElements;
          this.setting.pageIndex = moduleResponse?.number;
          if (this.listTransform) {
            this.dataSource = this.listTransform(moduleResponse, this.config);
          } else {
            this.dataSource = moduleResponse?.content?.map((item: any) => {
              const additionalRecord = this.selectedItems.find((record) => record.pkId === item.pkId);
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
                dropdown: this.getRecordDropdownValues(item, this.pickListConfigList!),
              };
            });
          }
          this.skeletonLoader$ = of(false);
        }
      },
      (error) => {
        this.skeletonLoader$ = of(false);
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
      .pipe(filter((data: MultiLookupModuleDefinitionDto) => !!data)).subscribe(
        (moduleDefinition: MultiLookupModuleDefinitionDto) => {
          if (moduleDefinition) {
            this.moduleDefinition = moduleDefinition;
            const recordIdentifier: string | undefined = this.finalRecordIdentifier(moduleDefinition?.recordIdentifier);
            this.recordIdentifier = this.recordIdentifier ?? recordIdentifier
            this.lookupApiConfig.searchBasedOn = this.recordIdentifier as any;
            if (this.lookUpHeaderSettings?.isServiceDefined) {
              this.lookUpHeaderSettings.title = `${this.lookUpHeaderSettings?.titlePrefix ?? 'Select'} ${moduleDefinition?.modulePluralName}`;
              this.lookUpHeaderSettings.searchInputLabel = `Search ${startCase(this.recordIdentifier)}`;
            }
            if (this.isEdit) {
              this.lookUpHeaderSettings.title = `Assigned ${moduleDefinition?.modulePluralName}`
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

  private finalRecordIdentifier(src: string | undefined): string | undefined {
    const namePopedFieldName: string[] | undefined = src?.split(" ");
    namePopedFieldName?.pop();
    return src?.split(' ').join('')
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
              this.loadModuleData(viewResponse?.fields);
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
  private loadModuleData(fields: any): void {
    const isPickList: boolean | undefined = fields?.some(field => field?.columnDataType === 'Picklist');
    if (!isPickList) {
      this.getLookUpList();
    } else {
      this.getPickListByModuleName();
    }
  }
  private getPickListByModuleName(): void {
    const module = this.lookupApiConfig?.body?.module;
    if (module) {
      this.picklistLoading = true;
      this.pickListSubscription = this.lookupModalService.getLookupServiceRequest({
        method: 'GET',
        api: `${this.lookupApiConfig?.rootUrl}/v1/settings/module/picklist/getByModuleNameAndFieldName`,
        params: {
          module: module!
        }
      }).pipe(filter((data: any) => !!data)).subscribe({
        next: response => {
          if (response) {
            this.pickListConfigList = response;
            this.getLookUpList();
          }
        },
        error: () => {
          this.picklistLoading = false;
        },
        complete: () => {
          this.picklistLoading = false;
        }
      });
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
      case 'Text':
        return 'text';
      case 'DateTime':
        return 'date';
      case 'Date':
        return 'date';
      case 'Currency':
        return 'currency';
      case 'MultiPicklist':
      case 'Picklist':
        return 'dropdown'
      default:
        return 'text';
    }
  }

  public onCheckboxChange(event: DxTableData<any>[], isEdit?: boolean): void {
    if (isEdit) {
      this.unassignedList = event?.map((data: DxTableData<any>) => data?.data)
    } else {
      if (!this.disableUpdatingMultiSelectionIds) {
        this.remainingIds = this.multiRowSelection?.value?.filter((id: number) => !!!event?.find((e: DxTableData<any>) => id == e?.data?.[this.multiRowSelection?.key!]));
        const index: number = this.multiRecordSelectionListPkIds?.findIndex((item: MultiLookupRecordSelectedIds) => item?.page == this.paginationRequest?.pageNo);
        let obj: MultiLookupRecordSelectedIds = {
          page: this.paginationRequest?.pageNo,
          ids: event?.map((data: DxTableData<any>) => data?.data?.[this.multiRowSelection?.key!]),
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
        const ids = this.multiRecordSelectionListPkIds?.map((data: MultiLookupRecordSelectedIds) => data?.ids)?.flat();

        if (this.multiRowSelection) {
          this.multiRowSelection.value = [
            ...this.remainingIds ?? [],
            ...ids,
          ];
          this.multiRowSelection.value = lodash.uniq(this.multiRowSelection.value)?.filter(data => !!data);
        }
        this.selectedRecords = this.multiRecordSelectionListPkIds?.map((data: MultiLookupRecordSelectedIds) => data?.data!)?.flat() ?? [];
        if (!this.enableTwoStepConfirmation) {
          const key = this.multiRowSelection?.key as string;
          const uniqBy = `data.${key}`
          this.selectedRecords = lodash.uniqBy(this.selectedRecords, uniqBy);
          this.selectedRecords = this.selectedRecords
            ?.filter(record => !!this.multiRowSelection?.value?.find(val => val === record?.data?.[key]));
        }
      }

      this.disableUpdatingMultiSelectionIds = false;
    }
  }

  onCheckboxSelectionChange(event: SelectionChange<DxTableData<T>>): void {
    if (this.multiRowSelection?.value && !this.disableUpdatingMultiSelectionIds && !this.enableTwoStepConfirmation) {
      this.multiRowSelection.value = this.multiRowSelection.value
        ?.filter(val => !event?.removed?.find(item => item?.data?.[this.multiRowSelection?.key!] == val))
    }
  }

  public onClickConfirm(): void {

    const data: MultiLookupSelectedRecordsModel = {
      selectedRecords: this.selectedRecords,
      recordIdentifier: this.recordIdentifier,
      type: this.isAddMore ? 'ADD_MORE' : undefined
    }
    if (this.saveConfig) {
      let selectedIds = this.selectedRecords.map((record: DxTableData<any>) => record?.data?.pkId)
      if (this.saveConfig.payloadTransform) {
        this.saveConfig.apiConfig = {
          ...this.saveConfig.apiConfig,
          ...this.saveConfig.payloadTransform(selectedIds, this.saveConfig?.apiConfig)
        }
      }
      this.isLoading = true;
      this.lookupModalService.getLookupServiceRequest(this.saveConfig.apiConfig!).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: () => {
          this.isLoading = false;
          this.dialogRef.close()
        },
        complete: () => {
          this.isLoading = false;
          this.dialogRef.close()
        }
      })
    } else {
      this.dialogRef.close(data);
    }
  }

  onUnassignAll(): void {
    this.dialogRef.close(undefined);
  }

  unAssignedRecords(): void {
    const payload: MultiLookupSelectedRecordsModel = {
      type: 'UNASSIGN',
      unassignedList: this.unassignedList,
      recordIdentifier: this.recordIdentifier
    }
    this.dialogRef.close(payload);
  }
  onClickAddMore(): void {
    if (this.lookupApiConfig.body && this.lookupApiConfig.body.paginationRequest) {
      this.lookupApiConfig.body.paginationRequest.search = this.lookupApiConfig.body.paginationRequest.search?.replace("in", "nin");
    }
    this.lookUpHeaderSettings.title = `${this.lookUpHeaderSettings?.titlePrefix ?? 'Select'} ${this.moduleDefinition?.modulePluralName}`;
    this.isEdit = false;
    this.isAddMore = true;
    this.getLookUpList();
  }
  private getRecordDropdownValues(src: any, pickListConfig: any): any {
    let dropdownList: any = {}
    Object.keys(src).forEach((key: string) => {
      const PICKLIST_VALUES: any | undefined = pickListConfig;
      let option: any[] = [];
      PICKLIST_VALUES?.forEach((item: any) => {
        const fieldName: string = item?.['fieldName']
        if (fieldName === key && src[key] === item?.actualValue) {
          let option: any[] = []
          option.push({
            keyTt: item?.actualValue,
            color: (item as any)?.colorCode,
            valueTt: item?.displayValue,
          });
          dropdownList[key] = option
        }
        if (fieldName === key && isArray(src[key])) {
          src[key]?.forEach((plOption: string) => {
            if (plOption === item?.actualValue) {
              option.push({
                keyTt: item?.actualValue,
                color: item?.colorCode,
                valueTt: item?.displayValue,
              });
            }
          })
          dropdownList[key] = option
        }
      })

    });
    return dropdownList
  }
  ngOnDestroy(): void {
    this.lookupDataSubscription?.unsubscribe();
    this.moduleDefinitionSubscription?.unsubscribe();
    this.customViewSubscription?.unsubscribe();
  }

}
