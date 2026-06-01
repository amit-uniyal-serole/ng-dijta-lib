import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { Ability, AbilityBuilder } from '@casl/ability';
 
export interface PermissionInterface {
    module: string;
    permission: string[];
}
 
@Injectable({
    providedIn: 'root',
})
export class DxPermissionsService {
    private readonly permissions$ = new BehaviorSubject<PermissionInterface[] | null>(null);
    private readonly isLoading$ = new BehaviorSubject<boolean>(false); // Track loading state
 
    constructor(private readonly http: HttpClient, readonly ability: Ability) { }
 
    loadPermissions(apiUrl: string, arg?: any): void {
        this.isLoading$.next(true); // Start loading
        this.http.get<PermissionInterface[]>(apiUrl)
            .pipe(
                tap((permissions) => {
                    this.permissions$.next(permissions);
                    this.updateAbility(permissions, arg);
                    this.isLoading$.next(false); // Stop loading
                })
            )
            .subscribe({
                next: (value) => {
                    this.isLoading$.next(false)
                },
                error: () => {
                    this.isLoading$.next(false)
                } // Stop loading on error
            });
    }
 
 
    public updateAbility(permissions: PermissionInterface[], _arg: any): void {
        const { can, rules } = new AbilityBuilder(Ability);
        permissions.forEach((permission: PermissionInterface) => can(permission?.permission ?? [], permission.module));
        this.ability.update([...this.ability.rules, ...rules]);
    }
 
    isLoading(): Observable<boolean> {
        return this.isLoading$.asObservable();
    }
 
    async hasPermission(apiName: string, permission: string): Promise<boolean> {
        if (this.permissions$.value === null) {
            await this.waitForPermissions();
        }
        return this.ability.can(permission, apiName);
    }
 
    uploadLoader(loader: boolean): void {
        this.isLoading$.next(loader)
    }
 
    hasPermission$(apiName: string, permission: string): Observable<boolean> {
        return this.permissions$.pipe(
            filter((permissions) => permissions !== null),
            map(() => this.ability.can(permission, apiName))
        );
    }
 
    private waitForPermissions(): Promise<void> {
        return new Promise((resolve) => {
            const subscription = this.permissions$.subscribe((permissions) => {
                if (permissions !== null) {
                    subscription.unsubscribe();
                    resolve();
                }
            });
        });
    }
}