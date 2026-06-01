import { Direction, Directionality } from '@angular/cdk/bidi';
import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    OnDestroy,
    OnInit,
    Optional,
    QueryList,
    ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DxLayoutSiderComponent } from './sider.component';

@Component({
    selector: 'dx-layout',
    exportAs: 'dxLayout',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    preserveWhitespaces: false,
    template: ` <ng-content></ng-content> `,
    host: {
        class: 'dx-layout',
        '[class.dx-layout-rtl]': `dir === 'rtl'`,
        '[class.dx-layout-has-sider]': 'listOfNzSiderComponent.length > 0'
    }
})
export class DxLayoutComponent implements OnDestroy, OnInit {
    @ContentChildren(DxLayoutSiderComponent) listOfNzSiderComponent!: QueryList<DxLayoutSiderComponent>;

    dir: Direction = 'ltr';
    private destroy$ = new Subject<void>();

    constructor(@Optional() private directionality: Directionality) { }
    ngOnInit(): void {
        this.dir = this.directionality.value;
        this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
            this.dir = direction;
        });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}