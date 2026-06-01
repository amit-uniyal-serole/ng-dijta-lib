import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupApiConfig } from '../model/dx-lookup-interface';
@Injectable({
  providedIn: 'root'
})
export class LookupModalService<T> {
  constructor(private readonly http: HttpClient) { }

  public getLookupServiceRequest(
    config: LookupApiConfig<T>,
  ): Observable<any> {

    return this.http.request(
      config?.method,
      config?.api,
      {
        body: config?.body,
        responseType: config?.responseType ?? 'json',
        params: {
          ...config?.paginationRequest,
          ...config?.params
        } as HttpParams,
        headers: new HttpHeaders({
          ...config?.headers
        }),
      }
    )
  }
}
