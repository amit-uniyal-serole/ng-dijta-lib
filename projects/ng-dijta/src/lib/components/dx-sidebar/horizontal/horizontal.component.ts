import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { DxMenuItemComponent } from './menu-item.component';
import { Menu } from '../model/model';
import { Observable } from 'rxjs';
import { DynamicDatabase } from '../dynamic-database.service';

@Component({
    selector: 'dx-horizontal',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
       <div class="container-fluid primary_light menu-scroll w-100">
            <div class="horizontal p-2 primary_light gap-1">
                @for (menu of menus; track $index) {
                    @if(menu?.children && menu?.children.length > 0) {
                        <a role="button" mat-botton class="p-2 primary_on_light nav-item rounded text-decoration-none" [matMenuTriggerFor]="childComponentMenu?.childMenu"
                        [disabled]="menu.disabled" aria-current="page" routerLinkActive='menu_active'>
                            <div class="gap-1 justify-content-center  nav-link d-flex align-items-center active">
                                <mat-icon *ngIf="menu?.icon" aria-hidden="false" [attr.aria-label]="menu?.label | transloco" [fontIcon]="menu?.icon"></mat-icon>
                                <p class="m-0 body fw-medium"> {{menu?.label | transloco}}</p>
                            </div>
                        </a>
                        <dx-menu-item [items]="menu.children"></dx-menu-item>
                    } @else {
                        <a role="link" mat-button style="--mdc-outlined-button-outline-color:var(--primary-on-light)" class="nav-item rounded text-decoration-none" [routerLink]='menu?.route?.path' aria-current="page" routerLinkActive='menu_active'>
                            <div class="nav-link primary_on_light justify-content-center d-flex align-items-center active">
                                <mat-icon *ngIf="menu?.icon" aria-hidden="false" [attr.aria-label]="menu?.label | transloco" [fontIcon]="menu?.icon"></mat-icon>
                                <p class="m-0 body fw-medium"> {{menu?.label | transloco}}</p>
                            </div>
                        </a>
                    }
                
                }
            </div>
       </div>
    `

})
export class DxHorizontalComponent {
    show: boolean = false;
    @Input('menu') menus: Menu[] = [];
    @ViewChild(DxMenuItemComponent) childComponentMenu!: DxMenuItemComponent;

    currentUrl$!: Observable<string>;
    constructor(private dynamicDatabase: DynamicDatabase) { }
    ngOnInit(): void {
        this.currentUrl$ = this.dynamicDatabase.currentUrl
    }
}