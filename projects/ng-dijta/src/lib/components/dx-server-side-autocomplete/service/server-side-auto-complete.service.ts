import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LookupApiConfig } from '../../dx-lookup';

@Injectable({
  providedIn: 'root'
})
export class ServerSideAutoCompleteService {

  constructor(private readonly http: HttpClient) { }

  public request(
    config: LookupApiConfig<any>,
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
