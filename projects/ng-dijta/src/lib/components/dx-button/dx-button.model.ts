import { DxPermission } from "../../core/UI/model/ui-permission";
import { ConditionClass } from "../../directive";
import { Actions } from "../dx-popover/model/popover.model";

export type Type = 'normal' | 'raised' | 'stroked' | 'flat' | 'icon' | 'fab' | 'mini-fab';
export type Color = 'primary' | 'accent' | 'warn' | '';
export type ButtonClasses = 'dxBtn' | 'secondary-btn' | 'dxIconClass' | 'text';
export type ButtonLoaderType = 'semi-circle' | 'arc' | 'dual-arc' | 'pulse' | 'refresh';
export declare interface DxButtonOptions {
  type: Type,
  color: Color,
  buttonText: string;
  class?: string;
  icon?: string;
  disabled?: boolean;
}

export interface MultiActionDropDown {
  show?: boolean
  disable?: boolean,
  label?: string;
  isOnlyDropdown?: boolean;
  permission?: DxPermission;
  menuList: MultiActionMenuList[]
}
export interface MultiActionMenuList {
  id?: string;
  label: string;
  event: string;
  show?: boolean;
  icon?: string;
  disable?: boolean;
  src?: string;
  color?: string;
  confirmationPopover?: ConfirmationPopover;
  classCondition?: ConditionClass;
  permission?: DxPermission;
  btnType?: ButtonClasses;
}
export interface CustomLabelColor {
  color: string
}

export interface ConfirmationPopover {
  isShow: boolean;
  header?: Header;
  popoverPlacement?: 'top' | 'topLeft' | 'topRight' | 'leftTop' | 'left' | 'leftBottom' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft'
  | 'bottom' | 'bottomRight';
  content: {
    message: string;
  }
  actions: Actions;
}

export interface Header {
  title?: string;
  closeIcon?: boolean;
  icon?: Icon;
}

export interface Icon {
  isShow: boolean;
  icon?: string;
  color?: string; // Note: iconColor should be given in hexadecimal value
  // ex- iconColor = #ffffff
}
