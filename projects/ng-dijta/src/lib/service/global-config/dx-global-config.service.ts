import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { DxDijtaGlobalConfig, DxGlobalConfigDetails, DxGlobalTableConfigDetails } from '../../interface/config.detail.model';

export interface OrgInfo {
  pkId?: number
  createdAt?: string
  createdBy?: number
  changedAt?: string
  changedBy?: number
  tenantId?: number
  identifierTt?: string
  name?: string
  timeZone?: string
  currency?: string
  displayNameInHeader?: boolean
  dateFormat?: string
  timeFormat?: string
  country?: string
  preferredPageSize?: number
}

export interface UserInfo {
  pkId?: number
  createdAt?: string
  createdBy?: number
  changedAt?: string
  changedBy?: number
  userName?: string
  userId?: number
  email?: string
  defaultLaunchpadId?: number
  timeZone?: string
  preferredPageSize?: number
}
export interface OrgUserInfo { orgDetails?: OrgInfo, userDetails?: UserInfo }

@Injectable({
  providedIn: 'root'
})
export class DxGlobalConfigService {

  private readonly tenantDetails$: BehaviorSubject<OrgUserInfo | null> = new BehaviorSubject<OrgUserInfo | null>(null);
  private readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false); // Track loading state
  constructor(private readonly http: HttpClient) { }

  globalConfigState = signal<DxGlobalConfigDetails>({
    config: {
      tableConfig: {
        orgConfig: undefined,
        userConfig: undefined,
        defaultConfig: {
          pageSize: 10
        }
      }
    }
  });
  isGlobalConfigError: boolean = false;
  isReturnDefaultConfig: boolean = false;
  //Selectors 
  getOrgConfig = computed(() => this.globalConfigState().config?.tableConfig?.orgConfig);
  getUserConfig = computed(() => this.globalConfigState().config?.tableConfig?.userConfig);
  getDefaultConfig = computed(() => this.globalConfigState().config?.tableConfig?.defaultConfig);
  getFullConfig = computed(() => this.globalConfigState().config);

  //**Table Config
  public setOrgConfig(orgConfig: any): void {
    this.updateTableState(orgConfig, 'orgConfig');
  }

  public setUserConfig(userConfig: DxGlobalTableConfigDetails): void {
    this.updateTableState(userConfig, 'userConfig');
  }

  public setDefaultConfig(defaultConfig: DxGlobalTableConfigDetails): void {
    this.updateTableState(defaultConfig, 'defaultConfig');
  }

  private updateTableState(config: DxGlobalTableConfigDetails, key: string): void {
    this.globalConfigState.update(state => ({
      ...state,
      config: {
        ...state.config,
        tableConfig: {
          ...state.config.tableConfig,
          [key]: config
        }
      }
    }))
  }
  //*

  public loadTenantDetails(api: string): void {
    this.isReturnDefaultConfig = false;
    this.isGlobalConfigError = false;
    this.isLoading$.next(true);
    this.http.get(api)
      ?.pipe(
        tap((userOrgInfo: OrgUserInfo) => {
          this.isReturnDefaultConfig = false;
          this.setOrgConfig({
            ...userOrgInfo?.orgDetails,
            pageSize: userOrgInfo?.orgDetails?.preferredPageSize
          });
          this.setUserConfig({
            ...userOrgInfo?.userDetails,
            pageSize: userOrgInfo?.userDetails?.preferredPageSize
          });
          this.tenantDetails$.next(userOrgInfo)
        }),
        catchError(() => {
          this.isReturnDefaultConfig = true;
          this.isGlobalConfigError = true;
          this.tenantDetails$.next({
            orgDetails: {},
            userDetails: {}
          })
          return of([]);
        })
      ).subscribe({
        next: () => {
          this.isLoading$.next(false);
        },
        error: () => {
          this.isLoading$.next(false);
        }
      });
  }

  async getConfigDetails(): Promise<DxDijtaGlobalConfig> {
    if (this.tenantDetails$.value === null && this.isGlobalConfigError === false && this.isReturnDefaultConfig === false) {
      await new Promise<void>((resolve) => {
        const subscription = this.tenantDetails$.subscribe(response => {
          if (response) {
            subscription.unsubscribe();
            resolve();
          }
        })
      })
    }
    return this.getFullConfig();
  }

  public getPageSize(): number | undefined {
    return this.getUserConfig()?.pageSize 
      ?? this.getOrgConfig()?.pageSize
      ?? this.getDefaultConfig()?.pageSize;
  }


}
