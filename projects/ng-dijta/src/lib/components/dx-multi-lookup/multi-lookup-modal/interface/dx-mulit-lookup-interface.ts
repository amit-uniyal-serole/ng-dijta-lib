import { PaginationRequest } from "../../../dx-config-table";
import { DxTableData } from "../../../dx-table";

export interface MultiLookupModalHeaderSettings {
  title?: string;
  // Applicable  for service defined title
  titlePrefix?: string;
  searchInputLabel?: string;
  isServiceDefined?: boolean;
}
// export interface LookupModalTableSettings<T> {
//   method: 'POST' | 'GET'
//   roorUrl: string;
//   paginationRequest?: PaginationRequest;
//   searchBasedOn?: keyof T;
//   body?: any;
//   fieldName?: string;
// }


export type MultiLookupModuleRecordModel = {
  module: string
  action: string
  paginationRequest: {
    search: string
    pageNo: number
    pageSize: number
    sortBy: string
    sortOrder: string
  }
  response: MultiResponseContent
}
export interface MultiResponseContent {
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


export interface MultiLookupModuleDefinitionDto {
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

export interface MultiLookupModalActions {
  enable?: boolean;
}


export interface MultiLookupSelectedRecordsModel {
  recordIdentifier: string;
  selectedRecords?: DxTableData<any>[];  
  type?: 'UNASSIGN' | 'ADD_MORE';
  unassignedList?: DxTableData<any>[];
  criteria?: any;
}

export interface MultiLookupRecordSelectedIds {
  page?: number;
  ids?: number[];
  data?: DxTableData<any>[];
  isPageUnknown?:boolean;
}