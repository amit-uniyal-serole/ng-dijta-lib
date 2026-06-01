import { BulkActions, DxTableColumn, DxTableData, DxTableSetting } from "../../dx-table";
import { DxTableFilterSettings } from "../../dx-table-filter/model/dx-table-filter.model";
export interface DxTableConfig<T>{
    tableConfig:DxConfigTableSettings<T>
}
export interface DxConfigTableSettings<T> {
    col: DxTableColumn<T>[];
    data?: DxTableData<T>[];
    setting?: DxTableSetting;
    dataUrl?: string;
    pageable?:PaginationRequest;
    pageSizeList?:BulkActions;
    filterSettings?:DxTableFilterSettings[]
}
export interface PaginationRequest {
    pageNo?: number;
    pageSize?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }
  
  export interface FilterResult { [x: string]: string | any }