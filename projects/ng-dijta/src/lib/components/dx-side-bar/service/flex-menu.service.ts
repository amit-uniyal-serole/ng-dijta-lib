import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Menu } from '../model';

@Injectable({
  providedIn: 'root',
})
export class FlexMenuService {
  private readonly orginalMenuList: BehaviorSubject<Menu[]> =
    new BehaviorSubject<Menu[]>([]);
  filteredMenus = this.orginalMenuList.asObservable();

  setMenu(
    orginalList: Menu[],
    menuItemsOnSideBar: Menu[],
    activeMenu: Menu | undefined
  ) {
    const filtedMenu = orginalList
      ?.filter((orgMenu: Menu) => {
        return !menuItemsOnSideBar?.some(
          (menuItem: Menu) => menuItem?.code === orgMenu?.code
        );
      })
      ?.sort((a: Menu, b: Menu) => {
        if (a?.order && b?.order) {
          return a?.order - b?.order;
        }
        return 0;
      })
      ?.filter((finaleMenuItem: Menu) => finaleMenuItem?.code !== activeMenu?.code).filter(val => val.position !== 'bottom');
    this.orginalMenuList.next(filtedMenu);
  }
}
