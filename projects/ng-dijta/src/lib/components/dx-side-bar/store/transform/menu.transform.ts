

import { Menu, MenuModule, SubMenu, SubMenuModule } from '../../model/menu';

export class MenuTransform {


  static transform(src: MenuModule[]): Menu[] {
    return [
      ...src?.map((menu: MenuModule) => {
        return {
          label: menu.menuLabel,
          icon: menu.menuIcon,
          code: menu.menu,
          order: menu?.order,
          position: menu?.position,
          children: MenuTransform.subMenuTransform(menu, menu?.submenu!),
          route: {
            path: menu?.path,
            param: undefined,
          },
        };
      }),
    ].sort(
      (a: Menu, b: Menu) => Number(a?.order) - Number(b?.order));
  }
  static subMenuTransform(
    parentSrc: MenuModule,
    child: SubMenuModule[]
  ): SubMenu[] {
    let subPayment: SubMenu[] | any | undefined = child?.map((ch: SubMenuModule) => {
      return {
        parentId: parentSrc?.menu,
        parentName: parentSrc?.menuLabel,
        label: ch?.subMenuLabel,
        icon: ch?.subMenuIcon,
        code: ch?.subMenuName,
        order: ch?.order,
        route: {
          path: ch?.path,
        },
      };
    });
    return subPayment?.sort(
      (a: SubMenu, b: SubMenu) => Number(a?.order) - Number(b?.order));;
  }
}
