import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicDatabase } from '../dynamic-database.service';
import { Menu } from '../model';

@Component({
    selector: 'dx-menu-item',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <mat-menu #childMenu="matMenu" [overlapTrigger]="false">
        <span *ngFor="let child of items">
            <!-- Handle branch node menu items -->
            <span *ngIf="child.children && child.children.length > 0">
            <button mat-menu-item color="primary" [matMenuTriggerFor]="menu.childMenu">
                <mat-icon>{{child.icon}}</mat-icon>
                <span>{{child.label | transloco}}</span>
            </button>
                <dx-menu-item #menu [items]="child.children"></dx-menu-item>
            </span>
            <!-- Handle leaf node menu items -->
            <span *ngIf="!child.children || child.children.length === 0">
            <button mat-menu-item [class.active-menu]="(currentUrl$ | async) === child?.route?.path" [routerLink]="child.route?.path">
                <mat-icon>{{child.icon}}</mat-icon>
                <span>{{child.label | transloco}}</span>
            </button>
            </span>
        </span>
    </mat-menu>
    
    `
})
export class DxMenuItemComponent implements OnInit {
    @Input() items: Menu[] = [];
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