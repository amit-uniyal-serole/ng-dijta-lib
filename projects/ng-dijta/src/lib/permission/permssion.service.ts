import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, firstValueFrom, debounceTime } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import {
  Ability,
  AbilityBuilder,
  createMongoAbility,
  MongoAbility,
  MongoQuery,
  PureAbility,
} from '@casl/ability';

export interface PermissionInterface {
  module: string;
  permission: string[];
}

export interface PermissionCheck {
  subject: string;     // e.g. module or API name
  actions: string[];   // e.g. ['view', 'edit']
}

type AppAbility = MongoAbility<[string, string], MongoQuery>;

@Injectable({
  providedIn: 'root',
})
export class DxPermissionsService {
  private readonly permissions$ = new BehaviorSubject<PermissionInterface[] | null>(null);
  private readonly isLoading$ = new BehaviorSubject<boolean>(false);

  // ✅ Inject the global singleton Ability instance provided in your AppModule
  // private readonly ability = inject<PureAbility>(PureAbility);

  constructor(private readonly http: HttpClient, readonly ability: PureAbility) {}

  /**
   * 🔹 Load permissions from API and update CASL ability.
   */
  loadPermissions(apiUrl: string, arg?: any): void {
    this.isLoading$.next(true);

    this.http
      .get<PermissionInterface[]>(apiUrl)
      .pipe(
        tap((permissions) => this.setPermissions(permissions, arg)),
        tap(() => this.isLoading$.next(false))
      )
      .subscribe({
        error: () => this.isLoading$.next(false),
      });
  }

  /**
   * 🔹 Manually update permissions (without API call).
   */
  updatePermissionsManually(permissions: PermissionInterface[], arg?: any): void {
    this.setPermissions(permissions, arg);
  }

  /**
   * 🔸 Internal method — updates observable + ability rules.
   */
  private setPermissions(permissions: PermissionInterface[], _arg?: any): void {
    if (!Array.isArray(permissions)) return;
    this.permissions$.next(permissions);
    this.updateAbility(permissions);
  }

  /**
   * ⚙️ Build CASL rules & update the injected ability.
   */
  updateAbility(permissions: PermissionInterface[]): void {
    const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility);

    for (const permission of permissions) {
      if (permission?.module && Array.isArray(permission.permission) && permission.permission.length) {
        can(permission.permission, permission.module);
      }
    }

    // ✅ Fires CASL's 'update' event on the injected instance
    this.ability.update(rules);
  }

  /**
   * 🔍 Async single permission check.
   */
  async hasPermission(apiName: string, permission: string): Promise<boolean> {
    if (!this.permissions$.value) {
      await this.waitForPermissions();
    }
    return this.ability.can(permission, apiName);
  }

  /**
   * 🔁 Reactive single permission check.
   */
  hasPermission$(apiName: string, permission: string): Observable<boolean> {
    return combineLatest([this.permissions$, this.abilityEvents$()]).pipe(
      filter(([permissions]) => !!permissions),
      map(() => this.ability.can(permission, apiName))
    );
  }

  /**
   * ✅ Multi-permission check (sync).
   */
  hasAllPermissions(pairs: PermissionCheck[]): boolean {
    if (!pairs?.length) return true;
    return pairs.every(pair =>
      pair.actions.every(action => this.ability.can(action, pair.subject))
    );
  }

  /**
   * ✅ Multi-permission check (reactive).
   */
  hasAllPermissions$(pairs: PermissionCheck[]): Observable<boolean> {
    return this.abilityEvents$().pipe(
    debounceTime(100),
      map(() => {
        return this.hasAllPermissions(pairs)
      })
    );
  }

  /**
   * 🧠 Reactive stream that emits on every CASL ability update.
   */
  private abilityEvents$(): Observable<any> {
    return new Observable((observer) => {
      const unsubscribe = this.ability.on('update', (event) => {
        observer.next(event);
      });
      return () => unsubscribe();
    }).pipe(startWith(true));
  }

  /**
   * 🕹 Manual control for loader.
   */
  uploadLoader(loader: boolean): void {
    this.isLoading$.next(loader);
  }

  /**
   * 🧾 Observable for loading state.
   */
  isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  /**
   * ⏳ Wait until permissions are loaded.
   */
  private waitForPermissions(): Promise<void> {
    return firstValueFrom(
      this.permissions$.pipe(filter((permissions): permissions is PermissionInterface[] => permissions !== null))
    ).then(() => undefined);
  }

  /**
   * 📤 Snapshot helpers.
   */
  getCurrentPermissions(): PermissionInterface[] | null {
    return this.permissions$.value;
  }

  getAbility(): PureAbility {
    return this.ability;
  }
}
