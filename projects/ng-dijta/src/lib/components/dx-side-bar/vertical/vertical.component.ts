import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DynamicDatabase } from '../dynamic-database.service';
import { Menu } from '../model';
@Component({
    selector: 'dx-vertical',
    preserveWhitespaces: false,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <dx-menu-list-item *ngFor="let item of menu" [item]="item"></dx-menu-list-item>
    `
})
export class DxVerticalComponent implements OnInit {
    show: boolean = false;
    @Input() menu: Menu[] = [];

    constructor(
        private router: Router,
        private actived: ActivatedRoute,
        private dynamicDatabase: DynamicDatabase) { }

    ngOnInit(): void {
        this.dynamicDatabase.setUrl(this.router.url)
        this.router.events.subscribe((x) => {
            if (x instanceof NavigationEnd) {
                this.dynamicDatabase.setUrl((x as NavigationEnd).url);
                // const parent: Menu | undefined = this.menu.find(product => product?.children?.some(item => item.route?.path === (x as NavigationEnd).url));
                // if (parent && parent?.label) {
                //     this.dynamicDatabase.setParentUrl(parent?.label)
                // }
            }
        })
    }
}