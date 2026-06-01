import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzBreakpointService, siderResponsiveMap } from '../../../utils/types/breakpoint';
import { LayoutServiceService } from '../layout-service.service';
import { Menu, SUB_MENU_TYPE } from '../../dx-sidebar';
import { FlexMenuAction } from '../../dx-sidebar/model/menu';
export enum FIX_SIZE {
  IN = 240,
  OUT = 0,
  DEFAULT = 75,
  MAX = 316,
}
@Component({
  selector: 'dx-compact-content',
  template: `
      <dx-layout-sider [nzWidth]="(isHideSideBar$ | async) && !(menuToogle$ | async) ? 0 : size" nzTheme="light">
          <div class="side" [ngStyle]="{'display': size === 0 || ((isHideSideBar$ | async) && !(menuToogle$ | async)) ? 'none' : 'block'}">
            <dx-flex-menu  
              [menu]="menu"
              [subMenu]="menuState"
              [isMenusLoading]="isMenusLoading"
              [width]="size"
              (sidebarToggle)="onToggle($event)"
            [disableDispalyConditions]="disableDispalyConditions"
            ></dx-flex-menu>
          </div>
        </dx-layout-sider>
        <div class="inner-content-area" scrollHeight [ngStyle]="{'padding-left.px': size}" [class.overflow-hidden]="(overflowEnable$ | async)">
            <ng-content></ng-content>
        </div>
  `,
  styles: [`
    .side {
      background-color: var(--primary-base, #00828e);
      color: var(--primary-on-base, #fff);
    }  
  `]
})
export class CompactContentComponent implements OnChanges, OnInit {
  @Input() menu: Menu[] = [];
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
  overflowEnable$: Observable<boolean> = of(false);
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
    this.overflowEnable$ = this.layoutServiceService.overflowEnable;
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
