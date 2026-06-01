import { SelectionChange } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { isArray, startCase } from 'lodash';
import { Observable, of, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { KeyValueModel } from '../../../core/UI/model/keyValue';
import { DxFileDownloadService } from '../../../service/file-download/dx-file-download.service';
import { DxGlobalConfigService } from '../../../service/global-config/dx-global-config.service';
import { PaginationRequest } from '../../dx-config-table';
import { AdditionalFilter, FileUploadConfig, LookupApiConfig, LookupModalService } from '../../dx-lookup';
import { BulkActions, DxFilter, DxTableColumn, DxTableColumnType, DxTableComponent, DxTableData, DxTableSetting, PageSize, SelectedCheckboxConfig, SelectedRowsConfig } from '../../dx-table';
import { ToastrService } from '../../dx-toastr';
import { MultiLookupModalActions, MultiLookupModalHeaderSettings, MultiLookupModuleDefinitionDto, MultiLookupModuleRecordModel, MultiLookupRecordSelectedIds, MultiLookupSelectedRecordsModel } from './interface/dx-mulit-lookup-interface';
import { MultiLookupModalHelperService } from './multi-lookup-modal.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'dx-multi-lookup-modal',
  templateUrl: './multi-lookup-modal.component.html',
  styleUrls: ['./multi-lookup-modal.component.scss']
})
export class MultiLookupModalComponent<T> implements OnInit {
  @ViewChild('table') tableRef!: DxTableComponent<any>;
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
    successMessage?: string;
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
  paginationRequest: PaginationRequest = {};
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
  additionalFilter: AdditionalFilter[] = [];
  selectAll: boolean | undefined;
  customSelection: boolean = true;
  customViewId: number | undefined;
  newEndPointUrl: boolean = false;
  bluckAction: boolean = true;

  tabs: any[] = [];
  selectedTabIndex: number = 0;
  criteria: any;

  mode: 'manual' | 'file' = 'manual';
  modeOptions: KeyValueModel[] = [
    { keyTt: 'manual', valueTt: 'Manual' },
    { keyTt: 'file', valueTt: 'CSV Upload' },
  ];
  fileUploadConfig?: FileUploadConfig;
  selectedFile?: File;
  fileUploadLoading: boolean = false;
  sampleDownloading: boolean = false;
  isDragOver: boolean = false;
  fileError?: string;
  uploadStatus: 'idle' | 'uploaded' | 'failed' = 'idle';
  private fileUploadSubscription?: Subscription;
  private sampleDownloadSubscription?: Subscription;
  constructor(
    private readonly dialogRef: MatDialogRef<MultiLookupModalComponent<MultiLookupSelectedRecordsModel>>,
    private readonly lookupModalService: LookupModalService<T>,
    private readonly toastrService: ToastrService,
    private readonly dxGlobalConfigService: DxGlobalConfigService,
    private readonly multiLookupModalHelperService: MultiLookupModalHelperService,
    private readonly fileDownload: DxFileDownloadService
  ) { }

  ngOnInit(): void {

    if (this.enableTwoStepConfirmation) {
      this.isEdit = !!this.multiRowSelection?.value?.length;
    };
    this.paginationRequest = this.lookupApiConfig?.body?.paginationRequest ?? this.lookupApiConfig?.paginationRequest;
    if (this.criteria?.queryExpression) {
      this.additionalFilter = this.additionalFilter.map((filter) => {
        return {
          ...filter,
          value: (this.criteria.queryCriteria ?? []).find((val) => val.fieldName === filter.field)?.value
        }
      });
      const search = this.multiLookupModalHelperService.buildAdvancedSearchQuery(this.additionalFilter);
      this.paginationRequest = {
        ...this.paginationRequest,
        search: search
      };
    }
    this.checkConfig();
  }

  private async checkConfig(): Promise<void> {
    // const configDetails: DxDijtaGlobalConfig = await this.dxGlobalConfigService.getConfigDetails();
    if (true && this.dxGlobalConfigService.getPageSize()) {
      this.paginationRequest.pageSize = this.dxGlobalConfigService.getPageSize();
    }
    if (this.isGenericService) {
      this.getLookUpList()
    } else {
      if (this.tabs?.length > 0) {
        const { lookupApiConfig, saveConfig, submitButtonTitle, fileUploadConfig } = this.tabs[0];
        this.lookupApiConfig = lookupApiConfig;
        this.saveConfig = saveConfig;
        this.submitButtonTitle = submitButtonTitle;
        this.fileUploadConfig = fileUploadConfig ?? this.fileUploadConfig;
      }
      this.getModuleDefinition()
    }
  }

  addKeyword(filter: any, event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (
      value &&
      Array.isArray(filter.value) &&
      !filter.value.includes(value)
    ) {
      if (!filter.maxLength || filter.value.length < filter.maxLength) {
        filter.value.push(value);
      } else {
        console.warn('Max item limit reached');
      }
    }

    filter.tempKeyword = '';
    event.chipInput?.clear();
  }

  removeKeyword(filter: any, keyword: string): void {
    const index = filter.value.indexOf(keyword);
    if (index >= 0) {
      filter.value.splice(index, 1);
    }
  }

  handlePaste(filter: any, event: ClipboardEvent): void {
    const pastedText = event.clipboardData?.getData('text/plain') ?? '';
    const pastedItems = pastedText.split(/[,;]/); // Split by comma or semicolon

    pastedItems.forEach(item => {
      const trimmedItem = item.trim();
      const maxReached = filter.maxLength && filter.value.length >= filter.maxLength;
      if (
        trimmedItem &&
        Array.isArray(filter.value) &&
        !filter.value.includes(trimmedItem) &&
        !maxReached
      ) {
        filter.value.push(trimmedItem);
      }
    });

    filter.tempKeyword = '';
    event.preventDefault();
  }



  onClose(): void {
    this.dialogRef.close();
  }
  onPaginate(event: PageEvent): void {
    if (this.paginationRequest) {
      this.paginationRequest.pageNo = event?.pageIndex;
      this.paginationRequest.pageSize = event?.pageSize;
      this.tablePageSize = event?.pageSize;
      // this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;

    }
    this.getLookUpList();
  }

  onHeaderActionClick(event: DxFilter): void {
    if (event.type === 'refresh') {
      this.paginationRequest = {
        ...this.paginationRequest,
        pageSize: this.setting.pageSize,
      };
      // this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;

      this.getLookUpList();
    }
  }

  onSort(event: Sort): void {
    if (this.mode === 'file') { return; }
    if (event && this.paginationRequest) {
      this.paginationRequest.sortBy = event?.active;
      this.paginationRequest.sortOrder = event?.direction;
      // this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;

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
    // this.disableUpdatingMultiSelectionIds = !!this.multiRowSelection?.value?.length;
    if (this.paginationRequest) {
      this.paginationRequest.search = '';
    }
    if (this.paginationRequest && this.lookupApiConfig?.searchBasedOn) {
      this.paginationRequest.search = searchControl && searchControl != '' ?
        [this.lookupApiConfig?.searchBasedOn] + `:${this.lookupApiConfig?.searchBasedOperator ?? 'lk'}:` + searchControl : '';
      this.paginationRequest.pageNo = 0;
      this.getLookUpList();
    }
  }

  private getLookUpList(): void {
    this.lookupDataSubscription?.unsubscribe();
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
    if (this.lookupApiConfig.method === 'GET') {
      this.lookupApiConfig = {
        ...this.lookupApiConfig,
        paginationRequest: this.paginationRequest
      };
    } else {
      this.lookupApiConfig = {
        ...this.lookupApiConfig,
        body: {
          ...this.lookupApiConfig?.body,
          customViewId: this.customViewId,
          paginationRequest: this.paginationRequest
        }
      };
    }
    this.lookupDataSubscription = this.lookupModalService.getLookupServiceRequest(this.lookupApiConfig)
      .pipe(filter(data => !!data)).subscribe(
        {
          next: (response: MultiLookupModuleRecordModel) => {
            if (response) {
              const moduleResponse: any = response?.response ?? response
              this.setting.totalItems = moduleResponse?.totalElements;
              this.setting.pageIndex = moduleResponse?.number;
              this.setting.pageSize = moduleResponse?.size;

              if (this.listTransform) {
                this.dataSource = this.listTransform(moduleResponse, this.config, this);
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
              if (this.criteria?.queryExpression === '(1)') {
                this.onCheckboxChange(this.dataSource, false);
                setTimeout(() => {
                  this.selectAll = false;
                }, 500);
              }

              this.skeletonLoader$ = of(false);
            }
          },
          error: (err) => {
            this.skeletonLoader$ = of(false);
          },
        },

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
    if (this.tabs?.length > 0 && !this.lookupApiConfig?.body?.module) {
      this.recordIdentifier = this.lookupApiConfig?.searchBasedOn;
      if (this.lookUpHeaderSettings?.isServiceDefined) {
        this.lookUpHeaderSettings.title = `${this.lookUpHeaderSettings?.titlePrefix ?? 'Select'} Records`;
        this.lookUpHeaderSettings.searchInputLabel = `Search ${startCase(this.recordIdentifier)}`;
      }
      this.getLookUpList();
      return;
    }
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
            this.customViewId = moduleDefinition?.customViewList?.defaultView?.customViewId;
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
      const endpoint = this.newEndPointUrl
        ? `/v1/settings/custom-views/details/${customViewId}`
        : `/v1/settings/customView/getViewDetails?customViewId=${customViewId}`;
      const customViewSettings: LookupApiConfig<T> = {
        method: 'GET',
        api: `${this.lookupApiConfig?.rootUrl}${endpoint}`,
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
    this.selectAll = true;
    if (isEdit) {
      this.unassignedList = this.multiLookupModalHelperService.mapUnassignedList(event);
      return;
    }

    if (!this.disableUpdatingMultiSelectionIds) {
      this.remainingIds = this.multiLookupModalHelperService.calculateRemainingIds(event, this.multiRowSelection);
      const pageSelection: MultiLookupRecordSelectedIds = this.multiLookupModalHelperService.buildPageSelection(
        event,
        this.multiRowSelection?.key as string | undefined,
        this.paginationRequest?.pageNo
      );
      this.multiRecordSelectionListPkIds = this.multiLookupModalHelperService.upsertPageSelection(
        this.multiRecordSelectionListPkIds,
        pageSelection
      );
      const aggregatedIds: number[] = this.multiLookupModalHelperService.collectSelectionIds(this.multiRecordSelectionListPkIds);

      if (this.multiRowSelection) {
        this.multiRowSelection.value = this.multiLookupModalHelperService.mergeSelectionValues(this.remainingIds, aggregatedIds);
      }

      this.selectedRecords = this.multiLookupModalHelperService.mergeSelectedRecords(this.multiRecordSelectionListPkIds);

      if (!this.enableTwoStepConfirmation) {
        this.selectedRecords = this.multiLookupModalHelperService.dedupeSelectedRecords(
          this.selectedRecords,
          this.multiRowSelection
        );
      }
    }
    this.disableUpdatingMultiSelectionIds = false;
  }

  onCheckboxSelectionChange(event: SelectionChange<DxTableData<T>>): void {
    if (this.multiRowSelection?.value && !this.disableUpdatingMultiSelectionIds && !this.enableTwoStepConfirmation) {
      this.multiRowSelection.value = this.multiRowSelection.value
        ?.filter(val => !event?.removed?.find(item => item?.data?.[this.multiRowSelection?.key!] == val))
    }
  }

  public onClickConfirm(): void {
    let selectedIds = this.selectedRecords.map((record: DxTableData<any>) => record?.data?.pkId);
    let maxRecord;
    if (this.bluckAction && this.mode !== 'file') {
      let filter: any;
      if (!this.selectAll && this.paginationRequest.search) {
        filter = this.multiLookupModalHelperService.parseFiltersForCriteria(this.additionalFilter);
      }
      if (!this.selectAll && !this.paginationRequest.search) {
        filter = [
          {
            "fieldIndex": 1,
            "fieldName": "siteCode",
            "comparator": "is not empty",
            "value": ""
          }
        ]
      }

      maxRecord = {
        "queryCriteria": !this.selectAll ? filter : undefined,
        "queryExpression": !this.selectAll ? "(" + filter.map((f: any) => f.fieldIndex).join("and") + ")" : undefined
      }
    }


    const data: MultiLookupSelectedRecordsModel = {
      selectedRecords: this.selectedRecords,
      recordIdentifier: this.recordIdentifier,
      type: this.isAddMore ? 'ADD_MORE' : undefined,
      criteria: maxRecord
    }
    if (this.saveConfig) {

      if (this.saveConfig.payloadTransform) {
        this.saveConfig.apiConfig = {
          ...this.saveConfig.apiConfig,
          ...this.saveConfig.payloadTransform(selectedIds, this.saveConfig?.apiConfig, this.paginationRequest, this.selectAll, this.additionalFilter)
        }
      }
      this.isLoading = true;
      this.lookupModalService.getLookupServiceRequest(this.saveConfig.apiConfig!).subscribe({
        next: (response) => {
          if (this.saveConfig?.successMessage) {
            this.toastrService.success(this.saveConfig.successMessage);
          }
          this.isLoading = false;
          this.dialogRef.close(response);
        },
        error: (error) => {
          this.isLoading = false;
          this.dialogRef.close(error);
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


  onFilterSearch(forceToStop?: boolean): void {

    const search = this.multiLookupModalHelperService.buildAdvancedSearchQuery(this.additionalFilter);
    if (this.lookupApiConfig.customSearchWithGenriceService && this.paginationRequest) {
      this.paginationRequest.search = search;
      this.paginationRequest.pageNo = 0;
    } else if (this.saveConfig?.apiConfig) {
      this.saveConfig = {
        ...this.saveConfig,
        apiConfig: {
          ...this.saveConfig.apiConfig,
          body: {
            ...this.saveConfig.apiConfig.body,
            search: search
          }
        }
      };
      this.paginationRequest = {
        ...this.paginationRequest,
        search: search
      }
    } else {
      this.lookupApiConfig = {
        ... this.lookupApiConfig,
        paginationRequest: {
          ...this.lookupApiConfig.paginationRequest,
          search: search
        }
      };
    }

    if (!forceToStop) {
      this.getLookUpList()
    }
  }

  onFilterReset(isTabChange: boolean = false): void {
    if (this.additionalFilter?.length) {
      this.additionalFilter = this.additionalFilter.map((item: AdditionalFilter) => ({
        ...item,
        value: Array.isArray(item.value) ? [] : '',
        tempKeyword: ''
      }));
    }

    if (this.lookupApiConfig.customSearchWithGenriceService && this.paginationRequest) {
      this.paginationRequest.search = undefined;
    } else if (this.saveConfig?.apiConfig) {
      this.saveConfig = {
        ...this.saveConfig,
        apiConfig: {
          ...this.saveConfig.apiConfig,
          body: {
            ...this.saveConfig.apiConfig.body,
            search: undefined
          }
        }
      }

      this.paginationRequest = {
        ...this.paginationRequest,
        search: undefined
      }
    } else {
      this.lookupApiConfig = {
        ... this.lookupApiConfig,
        paginationRequest: {
          ...this.lookupApiConfig.paginationRequest,
          search: ''
        }
      };
    }

    if (this.searchControl) {
      this.searchControl.setValue('');
    }

    if (!isTabChange) {
      this.getLookUpList()
    }
  }
  onTabChange(tab: any): void {
    this.selectedTabIndex = tab.index;
    const { lookupApiConfig, saveConfig, submitButtonTitle, fileUploadConfig } = this.tabs[tab.index];
    this.lookupApiConfig = lookupApiConfig;
    this.saveConfig = saveConfig;
    this.submitButtonTitle = submitButtonTitle;
    if (this.mode === 'file') {
      this.selectedFile = undefined;
      this.uploadStatus = 'idle';
      this.mode = 'manual';
      this.fileUploadSubscription?.unsubscribe();
      this.fileUploadLoading = false;
      this.restoreManualSettings();
    }
    this.fileUploadConfig = fileUploadConfig;
    this.clearSelections();
    this.onFilterReset(true)
    this.getModuleDefinition()
  }
  protected onFileSelected(input: HTMLInputElement): void {
    const file: File | undefined = input.files?.[0];
    input.value = '';
    if (file) {
      this.acceptFile(file);
    }
  }

  protected onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  protected onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  protected onFileDropped(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    const file: File | undefined = event.dataTransfer?.files?.[0];
    if (file) {
      this.acceptFile(file);
    }
  }

  protected formatFileSize(bytes?: number): string {
    if (bytes === undefined || bytes === null) {
      return '';
    }
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  private acceptFile(file: File): void {
    if (!this.fileUploadConfig) {
      return;
    }

    const accept: string = this.fileUploadConfig.accept ?? '.csv';
    const maxSize: number = this.fileUploadConfig.maxSize ?? 10 * 1024 * 1024;

    if (!this.isAcceptedFile(file, accept)) {
      this.fileError = `Invalid file type. Expected ${accept}.`;
      this.selectedFile = undefined;
      return;
    }
    if (file.size > maxSize) {
      this.fileError = `File too large. Max ${maxSize / 1024 / 1024} MB.`;
      this.selectedFile = undefined;
      return;
    }

    // Clear any prior results so the table doesn't show stale data after picking a new file
    this.dataSource = [];
    this.setting.totalItems = 0;

    this.fileError = undefined;
    this.uploadStatus = 'idle';
    this.selectedFile = file;
  }

  protected onUploadFile(): void {
    if (!this.selectedFile || !this.fileUploadConfig) {
      return;
    }

    const file: File = this.selectedFile;
    const body: unknown = this.fileUploadConfig.payloadTransform
      ? this.fileUploadConfig.payloadTransform(file, this.fileUploadConfig.apiConfig)
      : (() => {
        const fd: FormData = new FormData();
        fd.append(this.fileUploadConfig!.fileFieldName ?? 'file', file);
        return fd;
      })();

    this.fileUploadLoading = true;
    this.fileUploadSubscription?.unsubscribe();
    this.fileUploadSubscription = this.lookupModalService
      .getLookupServiceRequest({ ...this.fileUploadConfig.apiConfig, body } as LookupApiConfig<T>)
      .pipe(filter((r: any) => !!r))
      .subscribe({
        next: (response: MultiLookupModuleRecordModel) => {
          this.applyFileUploadResponse(response);
          this.uploadStatus = 'uploaded';
          this.fileUploadLoading = false;
        },
        error: () => {
          this.toastrService.error('Failed to process the uploaded file.');
          this.uploadStatus = 'failed';
          this.fileUploadLoading = false;
        }
      });
  }

  protected onModeChange(newMode: string): void {
    // Shared cleanup — runs regardless of direction.
    this.selectedFile = undefined;
    this.fileError = undefined;
    this.uploadStatus = 'idle';
    this.fileUploadSubscription?.unsubscribe();
    this.fileUploadLoading = false;
    this.clearSelections();

    if (newMode === 'file') {
      this.onFilterReset(true);
      this.dataSource = [];
      this.setting.totalItems = 0;
      this.mode = 'file';
    } else {
      this.restoreManualSettings();
      this.mode = 'manual';
      this.getLookUpList();
    }
  }


  protected onDownloadTemplate(): void {
    const sample = this.fileUploadConfig?.sampleFile;
    if (!sample?.url) {
      return;
    }
    this.sampleDownloading = true;
    this.sampleDownloadSubscription?.unsubscribe();
    this.sampleDownloadSubscription = this.fileDownload
      .download({
        url: sample.url,
        fileName: sample.fileName,
        defaultExtension: this.deriveDefaultExtension(),
      })
      .subscribe({
        next: () => {
          this.sampleDownloading = false;
        },
        error: () => {
          this.toastrService.error('Failed to download the file.');
          this.sampleDownloading = false;
        },
      });
  }

  private deriveDefaultExtension(): string | undefined {
    const accept: string | undefined = this.fileUploadConfig?.accept;
    return accept
      ?.split(',')
      .map((token: string) => token.trim())
      .find((token: string) => token.startsWith('.'));
  }

  protected onRemoveFile(): void {
    this.selectedFile = undefined;
    this.fileError = undefined;
    this.uploadStatus = 'idle';
    this.dataSource = [];
    this.setting.totalItems = 0;
    this.clearSelections();
    // mode stays 'file', toolbar stays hidden — user can immediately upload another
  }

  private clearSelections(): void {
    this.selectedRecords = [];
    this.multiRecordSelectionListPkIds = [{ data: [], isPageUnknown: true }];
    if (this.multiRowSelection) {
      this.multiRowSelection.value = [];
    }
    this.selectAll = undefined;
  }

  private applyFileUploadResponse(response: MultiLookupModuleRecordModel): void {
    const moduleResponse: any = response?.response ?? response;

    const items: any[] = Array.isArray(moduleResponse)
      ? moduleResponse
      : Array.isArray(moduleResponse?.content)
        ? moduleResponse.content
        : [];

    this.dataSource = this.listTransform
      ? this.listTransform({ content: items }, this.config, this)
      : items.map((item: any) => ({
        data: this.getValue(item),
        dropdown: this.getRecordDropdownValues(item, this.pickListConfigList!)
      }));

    this.setting.totalItems = this.dataSource.length;
    this.setting.pageSize = this.dataSource.length || 1;
    this.setting.pageIndex = 0;
    this.setting.hideToolbar = true;

    this.selectAll = true;
    this.onCheckboxChange(this.dataSource, false);
  }

  private restoreManualSettings(): void {
    this.setting.hideToolbar = false;
  }

  private isAcceptedFile(file: File, accept: string): boolean {
    const tokens: string[] = accept.split(',').map((t: string) => t.trim().toLowerCase()).filter(Boolean);
    if (!tokens.length) {
      return true;
    }
    const name: string = file.name.toLowerCase();
    const type: string = file.type.toLowerCase();
    return tokens.some((t: string) => (t.startsWith('.') ? name.endsWith(t) : type === t));
  }

  ngOnDestroy(): void {
    this.lookupDataSubscription?.unsubscribe();
    this.moduleDefinitionSubscription?.unsubscribe();
    this.customViewSubscription?.unsubscribe();
    this.fileUploadSubscription?.unsubscribe();
    this.sampleDownloadSubscription?.unsubscribe();
  }

}
