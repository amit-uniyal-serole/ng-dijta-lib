import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, filter, take } from "rxjs";
import { HttpModalService } from "../http/http.service";
import { HttpApiConfig } from "../http/model/http-payload";

@Injectable({
    providedIn: 'root'
  })
  export class DxGlobalAppConfigService<T> {
    private configSubject = new BehaviorSubject<any | null>(null);
    private config$ = this.configSubject.asObservable();
  
    constructor(private httpModalService: HttpModalService ) {}
  
    // Fetch config only if not already loaded
    loadConfig(config: HttpApiConfig): Observable<T> {
      if (!this.configSubject.value) {
        this.httpModalService.getLookupServiceRequest(config).subscribe(config => {
          this.configSubject.next(config);
        });
      }
      return this.config$.pipe(filter(config => !!config), take(1));
    }
  
    getConfig(): Observable<T> {
      return this.config$.pipe(filter(config => !!config), take(1));
    }
  }
  