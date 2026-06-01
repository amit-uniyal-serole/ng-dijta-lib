import { Params } from "@angular/router";


  export interface DxNavigationMenu {
    title: string;
    children?: NavigationMenuChildren[];
  }
  export interface NavigationMenuChildren {
    label: string;
    path?: MenuLink;
    id?: string;
    //data?: T;
    disabled?:boolean;
  }
  export interface MenuLink {
    routerLink?: string;
    params?: Params;
  }
  
  // config
  export interface NavigationMenuConfig {
    expandMenu?: boolean;
    showTooltip?: boolean;
    tooltipPosition?: TOOLTIP_POSTION;
    hideArrows?: boolean;
  }
  export type TOOLTIP_POSTION = 'above' | 'below' | 'left' | 'right';