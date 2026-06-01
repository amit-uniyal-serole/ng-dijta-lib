import { DxPermission } from "../../core";

export type MENU =
    | 'HOME'
    | 'PAYMENT'
    | 'QUOTE'
    | 'POLICY'
    | 'OPERATIONS'
    | 'REPORTS'
    | 'SETTINGS'
    | 'USER'
    | 'AGENTPROFILE'
    | 'AGENTDASHBOARD';
export type SUB_MENU =
    | 'PAYFORT'
    | 'COLLECTION'
    | 'QUOTE'
    | 'UNDERWRITING'
    | 'CANCELLATION'
    | 'ENQUIRY'
    | 'BRANCH'
    | 'AGENT'
    | 'CHANNEL'
    | 'REPORTS'
    | 'POLICYREPORTS'
    | 'ISSUANCEREPORTS'
    | 'PRODUCT'
    | 'PRODUCTCATEGORY'
    | 'GROUP'
    | 'ADDPAYMENT'
    | 'VERIFYPAYMENT'
    | 'PAYINSLIP'
    | 'PAYMENTMETHODS';

export type SUB_MENU_TYPE = 'out' | 'in';
export interface Menu {
    label?: string;
    code?: string;
    active?: boolean;
    order?: number;
    route?: MenuRouter;
    icon?: string;
    disabled?: boolean;
    position?: 'bottom';
    children?: SubMenu[];
    isToggleChildMenu?: boolean;
    resetMenu?: boolean;
    permission?: DxPermission;

}

export interface MenuRouter {
    path?: string;
    param?: { [key: string]: string | number };
}

export interface SubMenu extends Menu {
    parentId?: string;
    parentName?: string;
}

// Original

export interface OriginalMenu {
    menu: string;
    submenu: Submenu[];
    menuLabel: string;
    menuIcon: string;
}

export interface Submenu {
    subMenuName: string;
    path: string;
    subMenuLabel: string;
    subMenuIcon: string;
    actions: string[];
}

export interface ActivePage {
    parentCode?: string;
    childCode?: string;
}

export interface Breadcrumb {
    title?: string;
    active?: boolean;
    routerLink?: string;
}

export interface ActiveMenu {
    menu: MENU;
    subMenu?: SUB_MENU;
}

