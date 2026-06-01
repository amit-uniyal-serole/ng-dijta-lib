import { Observable } from 'rxjs';
import { CurrencyConfig, DX_DATE_FORMAT, DX_TIME_FORMAT } from '../../../core/UI/constant/currency-default';
import { KeyValueModel } from '../../../core/UI/model/keyValue';
import { DxPermission } from '../../../core/UI/model/ui-permission';
import { ConditionClass } from '../../../directive';
import { AvatarSetting, NgDxAvatarSettings } from '../../dx-avatar/model/avatar';
import {
  ButtonClasses,
  ConfirmationPopover,
  MultiActionDropDown,
} from '../../dx-button/dx-button.model';
import { DROPDOWN_PANEL_WIDTH } from '../components/dx-bulk-actions/dx-bulk-actions.component';
import { ContextMenuServiceSetting } from './dx-additional.interface';
import { Type } from '@angular/core';
export type DxTableColumnType =
  | 'custom'
  | 'currency'
  | 'date'
  | 'datetime'
  | 'number'
  | 'text'
  | 'email'
  | 'contact'
  | 'checkbox'
  | 'action'
  | 'avatar'
  | 'avatar_group'
  | 'input'
  | 'select'
  | 'multi_chip'
  | 'icon-text'
  | 'link'
  | 'menu'
  | 'context-menu'
  | 'service_data'
  | 'slide-toggle'
  | 'button'
  | 'inline-dropdown'
  | 'edit-row'
  | 'percentage'
  | 'dropdown'
  | 'filled_dropdown'
  | 'tag'
  | 'URL'
  | 'html'
  | 'lookup'
  | 'file'
  | 'ONLY_HTML'
  | 'flat-action';

export type FilterType = 'filter' | 'pagination' | 'setting' | 'export';

export type actionType = 'edit' | 'delete' | 'expand' | 'next' | 'menu';
export type iconViewType = 'button';
export type MENU_POSITION = 'right-to-left' | 'left-to-right';
export type LINK_TARGET_TYPE = '_blank' | '_self';
export type BULK_ACTION_FILTER_TYPE = 'local-filter' | 'server-filter';
export interface DxTableColumn<T> {
  title: string;
  field: keyof T;
  type: DxTableColumnType;
  class?: string | Array<string>;
  icon?: string;
  sortable?: boolean;
  columnDef: string;
  setting?: TableSetting;
  actionType?: Array<actionType>;
  weight?: number;
  backgroundClass?: boolean;
  footer?: Footer;
  noSpace?: boolean;
  sticky?: 'start' | 'end';
  progressBar?: boolean;
  copyText?: boolean;
  menuOptions?: MenuOptions[];
  multiChipIconsLimit?: number;
  avatarType?: 'avatar_with_text' | 'avatar_without_text';
  avatarSrc?: keyof T;
  contextMenuSettings?: ContextMenuServiceSetting;
  selectSetting?: keyof T;
  inlineDropdownSetting?: keyof T;
  width?: string;
  iconTextSetting?: keyof T;
  multiChipSetting?: keyof T;
  confirmationPopover?: ConfirmationPopover;
  compares?: boolean;
  textOverlap?: boolean;
  isNestedCol?: boolean;
  footerCalculate?: (column: DxTableColumn<T>, row: any) => string;
  htmlView?: boolean;
  options?: Observable<KeyValueModel[]>;
  component?: Type<any>; // Dynamic component
}
export interface Footer {
  title?: string;
  /**
   * @description apply this field to number column
   */
  showAsFooterValue?: boolean;
}
export interface DxTableHeaderEvent<T> {
  ascending: boolean;
  column: DxTableColumn<T>;
}

export interface TableSetting {
  currency?: CurrencyConfig;
  date?: DateSetting;
  avatar?: AvatarSetting;
  avatarSettings?: NgDxAvatarSettings;
  linkSettings?: LinkSettings;
  dropdown?: {
    blinking?: boolean;
  }
}

export interface DateSetting {
  timeFormat?: DX_TIME_FORMAT;
  format?: DX_DATE_FORMAT;
  timezone?: string;
  dateAgo?: boolean;
}

export interface OnAction<T> {
  type?: actionType;
  data?: T;
}

// Table Setting..
export interface DxTableSetting {
  pagination?: boolean;
  paginationFirstLastButtons?: boolean;
  multiSelectWithLabel?: string;
  pageIndex?: number;
  colArrange?: boolean;
  rowArrange?: boolean;
  multiSelect?: boolean;
  resize?: boolean;
  totalItems?: number;
  pageSize?: number;
  singleRowSelect?: boolean;
  multiRowSelect?: boolean;
  leftActions?: MenuAction[];
  rightActions?: MenuAction[];
  bulkActions?: BulkActions;
  multiActionButtonSettings?: MultiActionButtonSettings;
  leftDropDown?: BulkActions;
  paginatorMultiSelect?: boolean;
  isHidePageSizeSelection?: boolean;
  enableRowClick?: boolean;
  enableUI?: boolean;
  tabConfig?: {
    type?: 'tabs' | 'pills' | 'options' | 'wrapped' | 'slider';
    scrollMode?: boolean | 'normal' | 'auto';
    activeTab?: boolean | string;
    tabs?: DxPaginationTab[];
  };
}

export interface DxPaginationTab {
  event: string;
  tabName?: string;
  tabID?: string;
  disable?: boolean;
}

export interface BulkActions {
  type?: 'mini-btn' | 'btn' | string;
  show?: boolean;
  label?: string;
  disable?: boolean;
  icon?: string;

  menuPosition?: MENU_POSITION;
  itemLabelAsMenuLabel?: boolean;
  dropDownPanelWidth?: DROPDOWN_PANEL_WIDTH;
  hideMenuToolTip?: boolean;
  viewType?: iconViewType;
  multiActionButtonSettings?: MultiActionButtonSettings;
  /**
   * @description Based on ViewType as button, rectangular style will be applied
   */
  isRectangularBtn?: boolean;
  actions?: MenuAction[];
  groups?: BulkActionGroups[];
  createNewAction?: CreateNewAction;
  filter?: BULK_ACTION_FILTER_TYPE;
  loading?: boolean;
  searchByGroup?: boolean;
  defaultIcon?: boolean;
  classCondition?: ConditionClass;
  permission?: DxPermission;
  toolTipMessage?: string;

}
export interface CreateNewAction {
  label?: string;
  isShow?: boolean;
}
export interface MenuAction {
  id?: string;
  show?: boolean;
  btnType?: 'external_link' | 'system_link' | string;
  label?: string;
  type: string;
  disable?: boolean;
  icon?: string;
  active?: boolean;
  viewType?: iconViewType;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  /**
   * @description applicable for bulk actions
   */
  color?: string;
  /**
   * @description applicable for PageSize List
   */
  defaultPageSize?: boolean;
  subMenu?: BulkActionSubMenu[];
  confirmationPopover?: ConfirmationPopover;
  classCondition?: ConditionClass;
  permission?: DxPermission;
  isBorderTop?: boolean;
  info?: string;
  infoColor?: string;
  buttonType?: ButtonClasses;
  onlyBorder?: boolean;
  src?: string;
}
export interface BulkActionSubMenu {
  type: string;
  label: string;
  name?: string; // used in list view to store the view name
  icon?: string;
  color?: string;
  uniqueAction?: 'checkbox';
  checked?: boolean;
  disable?: boolean;
  info?: string;
  hide?: boolean;
  isBorderTop?: boolean;
  permission?: DxPermission
}
export interface SubmenuActionModel {
  parentMenuType: string;
  subMenuType: string
  name?: string;
}
export interface BulkActionGroups {
  title?: string;
  errorMessage?: string;
  actions?: MenuAction[];
}
export interface DxFilter {
  type: string; //FilterType
}

export interface MenuOptions {
  label: string;
  event: string;
  disable?: boolean;
  icon?: string;
  confirmationPopover?: ConfirmationPopover;
}
export interface MultiActionButtonSettings {
  show?: boolean;
  type: string;
  title?: string;
  disabled?: boolean;
  src?: string;
  class?: ButtonClasses;
  icon?: string;
  confirmationPopover?: ConfirmationPopover;
  multiActionDropDown?: MultiActionDropDown;
  classCondition?: ConditionClass;
  permission?: DxPermission
}
export interface LinkSettings {
  target: LINK_TARGET_TYPE;
}


export interface SelectedRowsConfig<T> {
  key: keyof T
  value: NonNullable<T>[keyof T] | undefined;
}

export interface SelectedCheckboxConfig<T> {
  key: keyof T
  value: NonNullable<T>[keyof T][];
}

export interface InlineDropDownServiceSetting {
  data?: any;
  url?: string;
  method?: string;
  dataTransform?: any;
  key?: string;
  id?: string;
  assignTo?: string[];
  extraOption?: {
    options: KeyValueModel[],
    position: 'first' | 'last'
  };
}
