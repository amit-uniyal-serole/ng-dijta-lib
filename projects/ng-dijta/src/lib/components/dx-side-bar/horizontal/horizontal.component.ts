import { ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { DxMenuItemComponent } from './menu-item.component';
import { Menu } from '../model';
import { Observable } from 'rxjs';
import { DynamicDatabase } from '../dynamic-database.service';

@Component({
    selector: 'dx-horizontal',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <mat-toolbar class="menu-bar" >
            <span *ngFor="let item of menu">
            <!-- Handle branch node buttons here -->
            <span *ngIf="item.children && item.children.length > 0" >
                <button mat-button [matMenuTriggerFor]="childComponentMenu?.childMenu"
                [disabled]="item.disabled">
                    <mat-icon>{{item.icon}}</mat-icon>
                        {{item.label | transloco}}
                    </button>
                <dx-menu-item [items]="item.children"></dx-menu-item>
            </span>
            <!-- Leaf node buttons here -->
            <span *ngIf="!item.children || item.children.length === 0">
                <button mat-button [class.active-menu]="(currentUrl$ | async) === item?.route?.path"  [routerLink]="item?.route?.path">
                <mat-icon>{{item.icon}}</mat-icon>
                {{item.label | transloco}}
                </button>
            </span>
            </span>
        </mat-toolbar>
    `,
    styles: [`
        .active-menu {
          background: var(--primary-light);
          color: var(--primary-on-base);
        }
        .menu-bar {
            background: var(--primary-base);
            color: var(--primary-on-base);
        }
    `]
})
export class DxHorizontalComponent {
    show: boolean = false;
    @Input() menu: Menu[] = [];
    @ViewChild(DxMenuItemComponent) childComponentMenu!: DxMenuItemComponent;

    currentUrl$!: Observable<string>;
    constructor(private dynamicDatabase: DynamicDatabase) { }
    ngOnInit(): void {
        this.currentUrl$ = this.dynamicDatabase.currentUrl
    }
}