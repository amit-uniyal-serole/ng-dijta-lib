import { KeyValueModel } from "../../../../core/UI/model/keyValue";
import { PaginationRequest } from "../../../dx-config-table";
import { DxTableColumn, DxTableData, DxTableSetting } from "../../../dx-table";

export interface LookupModalHeaderSettings {
  title?: string;
  searchInputLabel?: string;
  // Applicable  for service defined title
  titlePrefix?: string;
  isServiceDefined?: boolean;
}
export interface LookupApiConfig<T> {
  method: 'POST' | 'GET' | 'DELETE'
  rootUrl?: string;
  api: string;
  paginationRequest?: PaginationRequest;
  params?: {
    [key: string]: any
  };
  searchBasedOn?: keyof T;
  newSearchFilter?: SearchFilter<T>;
  body?: any;
  customSearchWithGenriceService?: boolean;
  headers?: {
    [name: string]: string | string[];
  };
  staticSearch?: string;
  responseType?:any;
  observe?: 'body' | 'response';
}
export interface SearchParams<T> {
  field: T;
  label: string;
  value?: string | boolean | number;
  type?: 'TEXT' | 'SELECT';
  option?: KeyValueModel[];
  search?: 'eq' | 'sw' | string;
}
export interface SearchFilter<T> {
  isServerSearch: boolean;
  searchParams: SearchParams<T>[];
}


export type ModuleRecordModel = {
  module: string
  action: string
  paginationRequest: {
    search: string
    pageNo: number
    pageSize: number
    sortBy: string
    sortOrder: string
  }
  response: ResponseContent
}
export interface ResponseContent {
  content: Array<any>
  pageable: {
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
  }
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  numberOfElements: number
  sort: {
    unsorted: boolean
    sorted: boolean
    empty: boolean
  }
  size: number
  number: number
  empty: boolean
};


export interface FormBuilderModuleDefinitionDto {
  apiName?: string;
  customViewList?: DxCustomViewList;
  layout?: any;
  moduleLabel?: string;
  moduleName?: string;
  modulePluralName?: string;
  recordIdentifier?: string;
}
interface DxCustomViewList {
  customView?: Array<CustomViewList>;
  defaultView?: CustomViewList;
}

interface CustomViewList {
  customViewId?: number;
  customViewName?: string;
}

export interface LookupModalActions {
  enable?: boolean;
}


export interface SelectedRecordsModel {
  selectedRecords: DxTableData<any>[];
  recordIdentifier: string;
}

export interface MultiRecordSelectedIds {
  page?: number;
  ids?: number[];
  data?: DxTableData<any>[];
}



export interface DxLookupModalConfig {
  idName: IdNameModel | 'CUSTOM_MODULE';
  lookupApiConfig: LookupApiConfig<any> | undefined;
  tableSettings: DxTableSetting | undefined;
  isGenericService?: boolean;
  columns?: DxTableColumn<any>[];
  lookUpHeaderSettings?: LookupModalHeaderSettings | undefined;
  listTransform?: any;
  additionalFilter?: AdditionalFilter[];
  config?: {
    [key: string]: any;
  }
  dropdownContentTransform?: any;
  recordIdentifier?: string;
  recordIdentifierId?: string;
  recordIdentifierSubtitle?: string;
  submitButtonTitle?: string;
  saveConfig?: {
    apiConfig?: LookupApiConfig<any>;
    payloadTransform?: any;
  };
}

export interface AdditionalFilter {
  label?: string;
  operator?: string;
  field?: string;
  type: 'TEXT' | 'SELECT';
  options?: KeyValueModel[];
  value: string;
}
export interface IdNameModel {
  id: string;
  name: string;
  subtitle?: string;
}

