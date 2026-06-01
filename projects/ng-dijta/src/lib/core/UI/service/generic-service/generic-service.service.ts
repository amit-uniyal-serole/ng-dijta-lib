import { Injectable } from '@angular/core';
import { DxConfigTableSettings, PaginationRequest } from '../../../../components/dx-config-table/model/dx-config-table';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  constructor() { }
  queryStringParamsBuilder(config: DxConfigTableSettings<any>): string {
    return config?.dataUrl?.split("?")[0] + '?' + Object.entries(config?.pageable!)?.map(req => req?.join("=")).join("&")
  }

  prepareSearchFromFilter(result): string {
    let search: string = '';
    let keys = Object.keys(result);
    keys.forEach((ele) => {
      if (result[ele] && result[ele] != '' && result[ele] != ' ') {
        if (Array.isArray(result[ele])) {
          // convert obj list to string list based on keyTt
          const ObjToString: string[] = [];
          if (
            Object.prototype.toString.call(result[ele][0]) === '[object Object]'
          ) {
            result[ele].forEach((item) => {
              if (item.keyTt) {
                ObjToString.push(item.keyTt);
              }
            });
            result[ele] = ObjToString;
          }
          //
          let str = result[ele].toString();
          str = str.replaceAll(',', '-');
          if (search == '') {
            search = ele + ':in:' + str;
          } else {
            search = search + ',' + ele + ':in:' + str;
          }
        } else {
          if (search == '') {
            search = ele + ':eq:' + result[ele];
          } else {
            search = search + ',' + ele + ':eq:' + result[ele];
          }
        }
      }
    });
    return search;
  }
  onSearch(result, pageable, search?): PaginationRequest {
    let pagination: PaginationRequest = {};
    pagination.pageNo = 0;
    pagination.sortBy = pageable.sortBy;
    pagination.sortOrder = pageable.sortOrder;
    pagination.pageSize = pageable.pageSize;
    if (search) {
      pagination.search = search;
      pagination.search += '&' + this.prepareSearchFromFilter(result);
    } else {
      pagination.search = this.prepareSearchFromFilter(result);
    }
    return pagination;
  }
}
