import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicDatabase } from '../dynamic-database.service';
import { Menu } from '../model/model';

@Component({
    selector: 'dx-menu-item',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-menu #childMenu="matMenu" [overlapTrigger]="false">
        @for (menu of menus; track $index) {
            @if (menu.children && menu.children.length > 0) {
                <a role="button" mat-menu-item [matMenuTriggerFor]="menuItemPanel.childMenu">
                    <mat-icon  aria-hidden="false" [attr.aria-label]="menu?.label | transloco" [fontIcon]="menu?.icon"></mat-icon>
                    <p class="m-0 paragraph text-break fw-medium "> {{menu?.label | transloco}}</p>
                </a>
              
                <dx-menu-item #menuItemPanel [items]="menu.children"></dx-menu-item>
            } @else {
                <a role="link" mat-menu-item [class.active-menu]="(currentUrl$ | async) === menu?.route?.path" [routerLink]="menu.route?.path">
                    <mat-icon  aria-hidden="false" [attr.aria-label]="menu?.label | transloco" [fontIcon]="menu?.icon"></mat-icon>
                    <p class="m-0 paragraph text-break fw-medium"> {{menu?.label | transloco}}</p>
                </a>
            }
        }
    </mat-menu>
    
    `
})
export class DxMenuItemComponent implements OnInit {
    @Input('items') menus: Menu[] = [];
    @ViewChild('childMenu', { static: true }) public childMenu;
    show: boolean = false;
    currentUrl$!: Observable<string>;
    constructor(private dynamicDatabase: DynamicDatabase) { }
    ngOnInit(): void {
        this.currentUrl$ = this.dynamicDatabase.currentUrl
        setTimeout(() => {
            this.show = true
        });
    }

}