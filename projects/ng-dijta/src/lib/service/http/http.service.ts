import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpApiConfig } from './model/http-payload';

@Injectable({
  providedIn: 'root'
})
export class HttpModalService {
  constructor(private readonly http: HttpClient) { }

  public getLookupServiceRequest(
    config: HttpApiConfig,
  ): Observable<any> {

    return this.http.request(
      config?.method,
      config?.api,
      {
        body: config?.body,
        responseType: 'json',
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
