import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IconConfig } from '../model/icon.interface';
import { IconData } from '../data/icon.data';
import { PaginationRequest } from '../../dx-config-table';

@Injectable()
export class IconService {
  iconConfig: IconConfig = IconData.iconConfig;
  constructor(
    private http: HttpClient
  ) {
  }

  public fetchIconCategory(): Observable<unknown> {
    return this.http.get(this.iconConfig?.iconCategoryURL);
  }

  public fetchIconList(request: PaginationRequest): Observable<unknown> {
    let params: any = {
      pageNo: request?.pageNo ?? '',
      pageSize: request?.pageSize ?? '',
      sortBy: request?.sortBy ?? '',
      sortOrder: request?.sortOrder ?? '',

    }
    if (request?.search) {
      params = {
        ...params,
        search: request?.search
      }
    }
    let queryParams = new HttpParams().appendAll(params);
    return this.http.get(this.iconConfig?.iconListURL, {
      params: queryParams
    });
  }

}