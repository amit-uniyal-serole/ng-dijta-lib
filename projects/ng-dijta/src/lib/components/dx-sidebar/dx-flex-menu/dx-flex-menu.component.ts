import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  signal,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { SUB_MENU_TYPE } from '../model/model';
import { FlexMenuAction, Menu, SubMenu } from '../model/menu';
import { FlexMenuService } from './service/flex-menu.service';
import { SIDEBAR_MENU_ENUM, SIDEBAR_MENU_VISIBILITY, SIDEBAR_ROTATE, SIDEBAR_SIDE_IN_OUT, SIDEBAR_SIDE_IN_OUT_OPACITY, SLIDING_WINDOW } from '../animation/sidebar';
import { SkeletonLoaderModel } from '../../dx-skeleton-loader';


@Component({
  selector: 'dx-flex-menu',
  templateUrl: './dx-flex-menu.component.html',
  animations: [
    SIDEBAR_SIDE_IN_OUT,
    SIDEBAR_SIDE_IN_OUT_OPACITY,
    SIDEBAR_ROTATE,
    SIDEBAR_MENU_VISIBILITY,
    SLIDING_WINDOW
  ],
})
export class DxFlexMenuComponent implements OnChanges, OnDestroy {
  @HostBinding('class.position-static')
  @Input() logo: any;
  @Input() subMenu!: SUB_MENU_TYPE;
  @Input('menu') flexMenuList: Menu[] = [];
  @Input() width?: number;
  @Input() isMenusLoading = true;
  @Input() disableDispalyConditions: boolean = true;
  @Output() sidebarToggle = new EventEmitter<FlexMenuAction>();
  @Output() onMenuPin = new EventEmitter<boolean>();

  activeMenu = signal<string>('');
  submenuMenu = signal<string | undefined>(undefined);
  subMenuList = signal<SubMenu[]>([]);
  hiddenMenus = signal<Menu[]>([]);
  activeItem = signal<Menu | undefined>(undefined);
  replacedItemIndex = signal<number | undefined>(undefined);

  breakHeight = signal<number[]>([]);
  maximize = signal<boolean>(true);
  menuListClone = signal<Menu[]>([]);
  initialFlexMenuList = signal<Menu[]>([]);
  bottonMenusToggle = signal<string>('menuItemVisibility');

  checkBoxLoader: SkeletonLoaderModel = {
    width: '55px',
    height: '55px',
    'background-color': 'var(--primary-dark)',
  };

  constructor(
    private readonly router: Router,
    public readonly flexMenuService: FlexMenuService,
    private readonly renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['flexMenuList']?.currentValue !== changes['flexMenuList']?.previousValue) {
      this.initialFlexMenuList.set(this.flexMenuList);
      this.updateFlexMenus();
    }
  }

  private updateFlexMenus(): void {
    if (this.flexMenuList?.length > 0) {
      const updatedList: Menu[] = this.flexMenuList.map((menuItem: Menu, i: number) => ({
        ...menuItem,
        order: menuItem.order ?? i + 1,
      }));

      this.flexMenuList = updatedList;
      this.menuListClone.set([...updatedList]);
      setTimeout(() => this.getActiveRouter(), 100);
      this.getFlexMenuElements();
    }
  }

  private getFlexMenuElements(): void {
    const flexMenuItems: HTMLElement | null = document.getElementById('dx-flex-menu-items');
    let totalSpace = 0;
    setTimeout(() => {
      const heights: number[] = Array.from(flexMenuItems?.children || []).map((child: Element) => {
        totalSpace += (child as HTMLElement).clientHeight;
        return totalSpace;
      });
      this.breakHeight.set(heights);

      if (heights.length > 3) {
        this.checkCalculcation();
      }

    }, 0);
  }

  onResize(): void {
    this.bottonMenusToggle.set('unknown-state');
    this.checkCalculcation();
  }

  private checkCalculcation(): void {
    if (document.getElementById('flex-menu-wrapper')) {
      let height: number | undefined = document.getElementById('flex-menu-wrapper')?.offsetHeight;
      let availableSpace: number | undefined = (height && height !== 0 ? height : 500);
      this.flexMenuList = this.menuListClone().filter(() => {
        if (availableSpace) {
          availableSpace = availableSpace - 75;
        }
        return ((availableSpace ?? 0) > 0);
      });
      if (availableSpace <= 0) {
        this.hideLastMenuItem();

        this.syncActiveMenuState();

      }
      this.setMoreList();
    }


  }

  private hideLastMenuItem(): void {
    const lastElement: Menu = { ...this.flexMenuList.pop()!, active: false };
    this.hiddenMenus.update((hiddenMenus: Menu[]) => [...hiddenMenus, lastElement]);
    this.filterMenu();
  }


  private syncActiveMenuState(): void {
    const foundSameMenuItem = this.findActiveMenu(this.activeItem());
    if (foundSameMenuItem) {
      this.activeItem.set(undefined);
    }
  }

  onMenu(menu: Menu, mouseOver = false): void {
    this.bottonMenusToggle.set('unknown-state');


    if (!menu.isToggleChildMenu) {
      this.updateActiveMenu(menu);
      if (!menu.active) {
        const isMenuAvailable = this.findActiveMenu(menu);
        if (!isMenuAvailable) {
          this.activeItem.set(menu);
          this.replacedItemIndex.set(this.menuListClone().findIndex(listItem =>
            listItem.code === this.flexMenuList[this.flexMenuList.length - 1]?.code
          ));
        }
      }
      if (menu.children?.length) {

        // if (this.subMenu === SIDEBAR_MENU_ENUM.OUT) {
        //   this.toggle(this.maximize())
        // }

        this.subMenuList.set(menu.children);
        this.subMenu = SIDEBAR_MENU_ENUM.IN;
        this.submenuMenu.set(this.subMenuList()[0]?.code ?? '');
        this.addOverlayClass();
        if (this.subMenuList()[0]?.route?.path) {
          this.router.navigate([this.subMenuList()[0]?.route?.path]);
        }
      } else {
        this.subMenuList.set([]);
        this.subMenu = SIDEBAR_MENU_ENUM.OUT;
        this.submenuMenu.set('');
      }

      // this.sidebarToggle.emit({ state: this.subMenu, mouseOver });
      this.activeMenu.set(menu.code ?? '');
    } else {
      this.toggleBottomMenu(menu);
    }
  }

  private toggleBottomMenu(menu: Menu): void {
    this.bottonMenusToggle.set('menuItemVisibility');
    this.hiddenMenus.set([]);
    this.activeItem.set(undefined);
    this.flexMenuList = menu.resetMenu ? this.initialFlexMenuList() : menu.children ?? [];
    this.updateFlexMenus();

    if (menu.resetMenu) {
      this.subMenuList.set([]);
      this.subMenu = SIDEBAR_MENU_ENUM.OUT;
      this.submenuMenu.set('');
      this.activeMenu.set('');
      this.sidebarToggle.emit({ state: this.subMenu, mouseOver: false });
    }

    this.checkCalculcation();
  }

  private getActiveRouter(): void {
    this.flexMenuList.forEach((m: Menu) => {
      if (this.router.url.includes(m.route?.path as string) && !m.children?.length) {
        this.onPageLoadActiveItem(m);
      }
      m.children?.forEach((c: SubMenu) => {
        if (this.router.url.includes(c.route?.path as string)) {
          this.onPageLoadActiveItem(m);
          this.activeMenu.set(c.parentId ?? '');
          this.subMenuList.set(m.children ?? []);
          this.submenuMenu.set(c.code ?? '');
          this.setMoreList();
        }
      });
    });
  }

  private onPageLoadActiveItem(menu: Menu): void {
    this.updateActiveMenu(menu);
    this.activeItem.set(this.findActiveMenu(menu) ? undefined : menu);
  }

  private updateActiveMenu(src: Menu | undefined): void {
    this.flexMenuList = this.flexMenuList.map(menuItem => ({
      ...menuItem,
      active: menuItem.code === src?.code,
    }));
  }

  private filterMenu(): void {
    this.flexMenuList = this.flexMenuList.filter(item =>
      item !== this.flexMenuList[this.flexMenuList.length - 1]
    );
  }

  private findActiveMenu(src: Menu | undefined): Menu | undefined {
    return this.flexMenuList.find(menuItem => menuItem.code === src?.code);
  }

  private setMoreList(): void {
    this.flexMenuService.setMenu(this.menuListClone(), this.flexMenuList, this.activeItem());
  }

  /**
 * @description Toogle Menu
 * @param maximize boolean
 */
  toggle(maximize = false): void {
    // this.maximize.set(!maximize)
    this.subMenu =
      this.subMenu === SIDEBAR_MENU_ENUM.OUT
        ? SIDEBAR_MENU_ENUM.IN
        : SIDEBAR_MENU_ENUM.OUT;
    // this.sidebarToggle.emit({
    //   state: this.subMenu,
    //   mouseOver: !maximize,
    // });
  }


  public onMouseOver(isActive: boolean): void {

    if (!this.maximize()) {
      this.subMenu = isActive ? SIDEBAR_MENU_ENUM.IN : SIDEBAR_MENU_ENUM.OUT;
      this.sidebarToggle.emit({ state: this.subMenu, mouseOver: isActive });
      this.addOverlayClass();
    }
  }

  private addOverlayClass(): void {
    if (this.subMenu === 'in') {
      this.renderer.addClass(document.body, 'overlay-active');
    } else {
      this.renderer.removeClass(document.body, 'dx-overlay');
    }
  }

  // Ensure the overlay class is removed when the component is destroyed
  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'dx-overlay');
  }
}
