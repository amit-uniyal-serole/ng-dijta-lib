import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SUB_MENU_TYPE } from '../../model';
// import { Menu, SubMenu, SUB_MENU_TYPE } from '../../model';
import { FlexMenuAction, Menu, SubMenu } from '../../model/menu';
import { FlexMenuService } from '../../service/flex-menu.service';

enum FlexMenuEnum {
  EASY_IN_OUT_400MS = '400ms ease-in-out',
  IN = 'in',
  OUT = 'out',
}
@Component({
  selector: 'dx-flex-menu',
  templateUrl: './dx-flex-menu.component.html',
  animations: [
    trigger('slideInOut', [
      state(
        FlexMenuEnum.IN,
        style({
          height: '*',
          width: '240px',
        })
      ),
      state(
        FlexMenuEnum.OUT,
        style({
          width: '0px', // new change
        })
      ),
      transition('in => out', animate(FlexMenuEnum.EASY_IN_OUT_400MS)),
      transition('out => in', animate(FlexMenuEnum.EASY_IN_OUT_400MS)),
    ]),
    trigger('slideInOutTwo', [
      state(
        FlexMenuEnum.IN,
        style({
          opacity: 1,
        })
      ),
      state(
        FlexMenuEnum.OUT,
        style({
          opacity: 0,
        })
      ),
      transition('in => out', animate(FlexMenuEnum.EASY_IN_OUT_400MS)),
      transition('out => in', animate(FlexMenuEnum.EASY_IN_OUT_400MS)),
    ]),
    trigger('rotatedState', [
      state('false', style({ transform: 'rotate(45deg)' })),
      state(
        'true',
        style({ transform: 'rotate(0deg)', color: 'var(--primary-base)' })
      ),
      transition('true => false', animate('200ms ease-out')),
      transition('false => true', animate('200ms ease-in')),
    ]),
    trigger('menuItems', [
      state('menuItemVisibilty',
        style({
          opacity: 1,
        })
      ),
      transition('void => menuItemVisibilty', [
        style({
          opacity: 0,
        }),
        animate('500ms ease-in')
      ]),
    ])
  ],
  host: {
    '(window:resize)': 'onResize($event)',
  },
})
export class DxFlexMenuComponent implements OnChanges {
  @HostBinding('class.position-static')
  @Input() logo: any;
  @Input() subMenu!: SUB_MENU_TYPE;
  @Input('menu') flexMenuList: Menu[] = [];
  @Input() isMenusLoading: boolean = true;
  @Output() sidebarToggle: EventEmitter<FlexMenuAction> =
    new EventEmitter<FlexMenuAction>();
  @Output() onMenuPin: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() disableDispalyConditions: boolean = true;;
  currentRoute = '';
  activeMenu = '';
  submenuMenu: string | undefined = '';
  subMenuList: SubMenu[] = [];
  // flex menu
  hiddenMenus: Menu[] = [];

  breakHeight: number[] = [];
  maximize = true;
  menuListClone: Menu[] = [];
  activeItem!: Menu | undefined;
  replacedItemIndex!: number | undefined;

  originMenuList: Menu[] = [];
  initialFlexMenuList: Menu[] = []; // THIS WILL HAVE ORIGINAL MENU LIST
  menuItemsListToogle: string = 'menuItemVisibilty';
  constructor(
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    public readonly flexMenuService: FlexMenuService,
    private readonly route: ActivatedRoute
  ) { }

  /**
   * @description Detect every input change
   * @param changes SimpleChanges
   */
  ngOnChanges(changes: SimpleChanges): void {

    if (changes?.isMenusLoading?.previousValue !== changes?.isMenusLoading?.currentValue) {
      this.isMenusLoading = changes?.isMenusLoading?.currentValue;
      this.updateFlexMenus();
    }

    if (
      changes?.flexMenuList?.previousValue !==
      changes?.flexMenuList?.currentValue && changes?.flexMenuList?.currentValue && changes?.flexMenuList?.previousValue
    ) {
      this.initialFlexMenuList = this.flexMenuList;
      this.updateFlexMenus();

      const childRoutesMenu: Menu | undefined = this.flexMenuList?.find(menu => this.findChildRoute(menu?.children ?? [], this.router?.url));
      if (childRoutesMenu?.children && childRoutesMenu?.children?.length) {
        setTimeout(() => {
          this.onMenu(childRoutesMenu)
        }, 100)
      }
    }

    if (changes?.subMenu?.previousValue !== changes?.subMenu?.currentValue) {
      this.subMenu = this.subMenu;
    }
  }

  findChildRoute(arr: SubMenu[], path: string): SubMenu | undefined {
    for (let obj of arr) {
      if (obj?.route?.path === path) {
        return obj;
      }
      if (obj?.children) {
        let result: SubMenu | undefined = this.findChildRoute(obj?.children, path);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  };

  updateFlexMenus(): void {
    this.originMenuList = this.flexMenuList;
    if (this.flexMenuList && this.flexMenuList.length > 0) {
      this.flexMenuList = this.flexMenuList?.map(
        (menuItem: Menu, i: number) => {
          return {
            ...menuItem,
            order: menuItem?.order ?? i + 1,
          };
        }
      );
      this.menuListClone = this.flexMenuList?.slice();
      setTimeout(() => {
        this.getActiveRouter();
      }, 100);
      this.getFlexMenuElements();
    }
  }

  /**
   * @description Get All Flex Menu Items from DOM
   */
  getFlexMenuElements(): void {
    // get flex menu elements
    const flexMenuItems: HTMLElement | null =
      document.getElementById('dx-flex-menu-items');
    let totalSpace = 0;
    setTimeout(() => {
      // loop over all elements and set sum of heights for each flex menu  element
      if (flexMenuItems?.children) {
        for (var i = 0; i < flexMenuItems?.children?.length; i++) {
          totalSpace += flexMenuItems?.children[i]?.clientHeight;
          this.breakHeight.push(totalSpace);
        }
      }
      // call calculation method
      if (this.breakHeight?.length > 3) {
        this.checkCalculcation();
      }
    }, 0);
  }

  /**
   * @description Detect screen resize
   * @param event Event
   */
  onResize(event: Event): void {
    this.menuItemsListToogle = 'unknown-state'
    // call calculation method
    this.checkCalculcation();
  }

  /**
   * @description Calculation based on each element height & total available screen height
   */
  checkCalculcation(): void {
    // get current space of parent element of flex menu
    var availableSpace: number | undefined =
      document?.getElementById('flex-menu-wrapper')?.offsetHeight;

    // get needed space for all elements in flex menu parent element + last height of visible elements from breakheight array
    var totalNeededSpace =
      this.breakHeight[this.flexMenuList?.length - 1] + 300;

    // if we need more space than we have - hide last element
    if (availableSpace && totalNeededSpace > availableSpace) {
      // check last menu is active
      if (this.flexMenuList[this.flexMenuList?.length - 1]?.active) {
        this.activeItem = this.flexMenuList[this.flexMenuList?.length - 1];
      }
      // push last elemen from menu to hiddenMenus
      let lastElement: Menu = this.flexMenuList[this.flexMenuList?.length - 1];
      lastElement = {
        ...lastElement,
        active: false,
      };
      this.hiddenMenus?.push(lastElement);

      // remove that last element from menu
      this.filterMenu();

      // apply changes
      this.cdr?.detectChanges();

      // call this method to recalculate for rest of nav elements
      this.checkCalculcation();
    } else {
      // if we have elements in hidden flex menu
      if (this.hiddenMenus?.length > 0) {
        // push last element from hidden menu to main menu
        this.flexMenuList?.push(this.hiddenMenus[this.hiddenMenus.length - 1]);
        if (
          this.hiddenMenus[this.hiddenMenus.length - 1]?.code ===
          this.activeItem?.code
        ) {
          this.updateActiveMenu(this.activeItem);
        }
        if (
          this.replacedItemIndex &&
          this.flexMenuList?.length > this.replacedItemIndex
        ) {
          this.flexMenuList?.push(this.menuListClone[this.replacedItemIndex]);
          this.replacedItemIndex = undefined;
        }
        // remove element from hidden menu
        this.hiddenMenus = this.hiddenMenus.filter(
          (item: Menu) => item !== this.hiddenMenus[this.hiddenMenus.length - 1]
        );
      }
      // apply changes
      this.cdr.detectChanges();
    }
    const foundSameMenuItem: Menu | undefined = this.findActiveMenu(
      this.activeItem
    );

    if (foundSameMenuItem) {
      this.activeItem = undefined;
    }
    this.setMoreList();
  }

  /**
   * @description On Click Menu Item
   * @param menu Menu
   * @param mouserOver boolean
   */
  onMenu(menu: Menu, mouserOver = false): void {
    this.menuItemsListToogle = 'unknown-state';
    //this.activeItem = undefined;
    if (!menu?.isToggleChildMenu) {
      this.updateActiveMenu(menu);
      if (!menu?.active) {
        const ismenuAvailable: Menu | undefined = this.findActiveMenu(menu);
        if (!ismenuAvailable) {
          if (!this.activeItem) {
            this.replacedItemIndex = this.menuListClone?.findIndex(
              (listItem: Menu) =>
                listItem?.code ===
                this.flexMenuList[this.flexMenuList?.length - 1]?.code
            );
            this.filterMenu();
            menu = {
              ...menu,
              active: true,
            };
          }
          this.activeItem = menu;
        }
        this.setMoreList();
      }
      if (menu?.children && menu?.children?.length > 0) {
        this.subMenuList = menu?.children;
        this.subMenu = FlexMenuEnum.IN;
        this.submenuMenu = this.subMenuList[0]?.code;
        if (this.subMenuList[0]?.route?.path) {
          this.router?.navigate([this.subMenuList[0]?.route?.path]);
        }
      } else {
        this.subMenuList = [];
        this.subMenu = FlexMenuEnum.OUT;
        this.submenuMenu = '';
      }
      this.sidebarToggle.emit({
        state: this.subMenu,
        mouseOver: mouserOver,
      });
      this.activeMenu = menu.code ?? '';

    } else {
      // Bottom Menu Child Toggle Implementation
      this.menuItemsListToogle = 'menuItemVisibilty'
      this.hiddenMenus = [];
      this.activeItem = undefined;
      this.flexMenuList = menu?.resetMenu ? this.initialFlexMenuList : (menu?.children as Menu[]);
      this.updateFlexMenus();

      if (menu?.resetMenu) {
        this.subMenuList = [];
        this.subMenu = FlexMenuEnum.OUT;
        this.submenuMenu = '';
        this.activeMenu = '';
        this.sidebarToggle.emit({
          state: this.subMenu,
          mouseOver: mouserOver,
        });
      };
      this.checkCalculcation();
    }
  }

  /**
   * @description On click SubMenu on sidepanel
   * @param code SubMenu
   */
  onSubMenu(code: SubMenu): void {
    this.submenuMenu = code.code ?? '';
  }

  /**
   * @description Get Active router on Page Load
   */
  getActiveRouter(): void {
    //changed from menuListClone to flexMenuList
    this.flexMenuList?.forEach((m: Menu) => {
      // add active menu on load
      if (
        this.router?.url?.includes(m?.route?.path as string) &&
        !m?.children?.length
      ) {
        this.onPageLoadActiveItem(m);
      }
      if (m?.children && m?.children?.length) {
        m?.children?.forEach((c: SubMenu) => {
          if (this.router?.url?.includes(c?.route?.path as string)) {
            this.onPageLoadActiveItem(m);
            this.activeMenu = c.parentId ?? '';
            this.subMenuList = m.children ?? [];
            this.submenuMenu = c.code ?? '';
            //this.toggle(true);
            this.setMoreList();
          }
        });
      }
    });
  }

  /**
   * @description Toogle Menu
   * @param maximize boolean
   */
  toggle(maximize = false): void {
    this.subMenu =
      this.subMenu === FlexMenuEnum.OUT && this.subMenuList?.length
        ? FlexMenuEnum.IN
        : FlexMenuEnum.OUT;
    this.sidebarToggle.emit({
      state: this.subMenu,
      mouseOver: !maximize,
    });
  }

  /**
   * @description Display in sorted order
   * @param menuList Menu[]
   * @returns Menu[]
   */
  public sortedMenu(menuList: Menu[] | undefined): Menu[] | undefined {
    return menuList?.sort((a: Menu, b: Menu) => {
      if (a?.order && b?.order) {
        return a?.order - b?.order;
      }
      return 0;
    }).filter((val: Menu) => val?.position !== 'bottom');
  }

  /**
   * @description Active Menu on page load
   * @param src Menu
   */
  private onPageLoadActiveItem(src: Menu): void {
    this.updateActiveMenu(src);
    this.activeItem = this.findActiveMenu(src) ? undefined : src;
  }

  /**
   * @description Update Active Menu
   * @param src Menu
   */
  private updateActiveMenu(src: Menu | undefined): void {
    this.flexMenuList = this.flexMenuList?.map((menuItem: Menu) => {
      return {
        ...menuItem,
        active: menuItem?.code === src?.code,
      };
    });
  }

  /**
   * @description Filter Last  Menu Item
   */
  private filterMenu(): void {
    this.flexMenuList = this.flexMenuList?.filter(
      (item: Menu) => item !== this.flexMenuList[this.flexMenuList?.length - 1]
    );
  }

  /**
   * @description Find Active Menu available in Flex Menu list
   * @param src Menu
   * @returns Menu
   */
  private findActiveMenu(src: Menu | undefined): Menu | undefined {
    return this.flexMenuList?.find(
      (menuItem: Menu) => menuItem?.code === src?.code
    );
  }

  /**
   * @description Set More Menu list
   */
  private setMoreList(): void {
    this.flexMenuService.setMenu(
      this.menuListClone,
      this.flexMenuList,
      this.activeItem
    );
  }

  /**
   * @description Open panel on Hover
   * @param isActive boolean
   */
  public onMouseOver(isActive: boolean): void {
    if (!this.maximize) {
      if (isActive) {
        this.subMenu = FlexMenuEnum.IN;
        this.sidebarToggle.emit({
          state: FlexMenuEnum.IN,
          mouseOver: true,
        });
      } else {
        this.subMenu = FlexMenuEnum.OUT;
      }
    }
  }
  getBottomPosition(): Menu[] {
    return this.originMenuList.filter((menu: Menu) => menu.position === 'bottom')
  }
}
