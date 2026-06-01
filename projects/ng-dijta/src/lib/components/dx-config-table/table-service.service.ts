import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DxTableConfig } from './public-api';

@Injectable({
  providedIn: 'root'
})
export class TableServiceService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getTableData(url: string): Observable<any> {
    return this.httpClient.get(url);
  }
  getTableConfig(url: string): Observable<DxTableConfig<any>> {
    return this.httpClient.get<DxTableConfig<any>>(url);
  }
}
