import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InlineDropdownDataService {

  constructor(private http: HttpClient) {}

  getTableContextMenuData(data: any): Observable<any> {
    return this.http.request(
      data?.method, 
      data?.url, 
      {
        body:data?.data,
        responseType: 'json',
      }      
    )
  }
}
