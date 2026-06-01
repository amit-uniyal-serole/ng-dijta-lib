import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzBreakpointService, siderResponsiveMap } from '../../../utils/types/breakpoint';
import { Menu, SUB_MENU_TYPE } from '../../dx-side-bar';
import { FlexMenuAction } from '../../dx-side-bar/model/menu';
import { LayoutServiceService } from '../layout-service.service';
export enum FIX_SIZE {
  IN = 240,
  OUT = 0,
  DEFAULT = 76,
  MAX = 316,
}
@Component({
  selector: 'dx-compact-content',
  template: `
    <dx-layout-content>
        <dx-layout-sider [nzWidth]="(isHideSideBar$ | async) && !(menuToogle$ | async) ? 0 : size" nzTheme="light">
          <div class="side" [ngStyle]="{'display': size === 0 || ((isHideSideBar$ | async) && !(menuToogle$ | async)) ? 'none' : 'block'}">
            <dx-side-bar *ngIf="!flexMenu" [menu]="menu"></dx-side-bar>
            <dx-flex-menu
              *ngIf="flexMenu"
              [menu]="menu"
              [subMenu]="menuState"
              [isMenusLoading]="isMenusLoading"
              (sidebarToggle)="onToggle($event)"
              [disableDispalyConditions]="disableDispalyConditions"
            ></dx-flex-menu>
          </div>
        </dx-layout-sider>
        <div class="inner-content-area" [ngStyle]="{'padding-left.px': size}">
          <ng-content></ng-content>
        </div>
    </dx-layout-content>
  `,
})
export class CompactContentComponent implements OnChanges, OnInit {
  @Input() menu: Menu[] = [];
  @Input() flexMenu!: boolean;
  @Input() isMenusLoading!: boolean;
  @Input() disableDispalyConditions: boolean = true;
  private destroy$ = new Subject<void>();
  /**
   * @default false
   * @description On page load expand/close sub menu, If any children menu exists
   */
  @Input() expandMenu: boolean = false;
  menuState!: SUB_MENU_TYPE;
  size: number = FIX_SIZE.DEFAULT;
  smallSize: boolean = false;
  isHideSideBar$: Observable<boolean> = of(false);
  menuToogle$!: Observable<boolean>;
  constructor(
    private breakpointService: NzBreakpointService,
    private layoutServiceService: LayoutServiceService) { }
  ngOnInit(): void {
    this.breakpointService
      .subscribe(siderResponsiveMap, true)
      .pipe(takeUntil(this.destroy$))
      .subscribe(map => {
        this.smallSize = map.xs;
        if (map.xs) {
          this.size = 0;
        } else {
          this.size = FIX_SIZE.DEFAULT;
        }
      });
    this.onToggleChange();
    this.isHideSideBar$ = this.layoutServiceService.onHideSideBar;
    this.menuToogle$ = this.layoutServiceService.onMenuToggle
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes?.['expandMenu']?.previousValue !=
      changes?.['expandMenu']?.currentValue
    ) {
      this.expandMenu = this.expandMenu;
      this.menuState = this.expandMenu ? 'in' : 'out';
    }
    if (
      changes?.['isMenusLoading']?.previousValue !==
      changes?.['isMenusLoading']?.currentValue
    ) {
      this.isMenusLoading = this.isMenusLoading;
    }

  }

  onToggleChange(): void {
    this.layoutServiceService.onMenuToggle.pipe(takeUntil(this.destroy$)).subscribe(val => {
      if (this.smallSize) {
        if (val) {
          this.size = FIX_SIZE.DEFAULT;
        } else {
          this.size = 0;
        }
      }

    })
  }

  onToggle(event: FlexMenuAction): void {
    if (event?.state === 'in' && !event?.mouseOver) {
      this.size = FIX_SIZE.MAX;
    } else {
      this.size = FIX_SIZE.DEFAULT;
    }
  }
}
