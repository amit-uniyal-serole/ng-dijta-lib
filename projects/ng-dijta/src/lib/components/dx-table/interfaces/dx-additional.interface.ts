import { Params } from '@angular/router';
import { BulkActions, MenuAction } from './dx-table.interface';
import { TableDropdown } from './dx-multi-value.interface';
import { TableLookup } from './dx-table-lookup.interface';
import { Avatar, DxTableNgDxAvatar } from '../../dx-avatar/model/avatar';

export interface ImageSizeUrl {
  sm?: string;
  md?: string;
  lg?: string;
  original?: string;
}
export interface FileCellDto {
  fileName?: string;
  fileOriginalName?: string;
  contentId?: string;
  mimeType?: string;
  size?: number;
  createdBy?: string;
  downloadUrl?: string;
  imageSizeUrl?: ImageSizeUrl;
  displayUrl?: string;
}
export interface FileStorageDto {
  recordFile?: FileCellDto,
  otherImages?: FileCellDto[];
}
export interface DxAddition {
  avatar?: Avatar[];
  select?: DxSelect;
}

export interface DxSelect {
  option: DxOption[];
}
export interface DxOption {
  label: string;
  value?: string | number;
}
export interface DxTableData<T> {
  data: T;
  input?: InputSetting;
  selectSetting?: SelectSetting;
  multiCheckbox?: CheckboxSetting;
  multiRadioButton?: RadioButtonSetting;
  /**
   * @description To show multiple avatars pass avatar_group in avatar settings
   */
  ngDxAvatar?: DxTableNgDxAvatar[];
  multiChip?: NgDxMultiChip[];
  link?: LinkType<T>;
  tooltip?: TooltipType<T>
  menu?: BulkActions;
  button?: BulkActions;
  contextMenuSetting?: ContextMenuSetting;
  toggle?: SlideToggleSettings;
  isEditable?: boolean;
  isRowDelete?: boolean;
  progressBar?: ProgressBar;
  styleTableRowBg?: StyleRowBg;
  statusReasons?: ReasonType<T>;
  dropdown?: TableDropdown<T>;
  lookup?: TableLookup<T>;
  dxFiles?: FileStorageDto;
  disabled?: {
    isDisabled?: boolean;
    message?: string;
  },
  isEdit?: boolean;
  currency?: CurrencyType<T>;
}

export type CurrencyType<T> = {
  [K in keyof T]?: CurrencySetting
}

export class CurrencySetting {
  iconColor?: string;
  info?: string;
  icon?: string;
  infoColor?: string;
}

export interface iconData<T> {
  data: DxTableData<T>,
  type: string
}

export interface StatusReasons<T> {
  message?: string;
  color?: string;
  icon?: string;
}

export interface StyleRowBg {
  isHighLightRow?: boolean;
}

export interface ProgressBar {
  color?: string;
  show?: boolean;
}
export interface InputSetting {
  isNotvisibilty?: boolean;
  disable?: boolean;
  readonly?: boolean;
  type: 'text' | 'number';
  hidenFields?: string[];
  displayOnly?: boolean;
}
export interface SlideToggleSettings {
  disable?: boolean;
  checked?: boolean;
  label?: string;
}
export interface CheckboxSetting {
  disable?: boolean;
  checked?: boolean;
  message?: string;
}

export interface RadioButtonSetting {
  disable?: boolean;
}

export interface SelectSetting {
  disable?: boolean;
  option?: DxOption[];
}
export interface NgDxMultiChip {
  name?: string;
  bgColor?: string;
  src?: string;
  icon?: string;
  color?: string;
  toolTip?: string;
  iconClass?: 'material-icons-outlined' | 'material-icons' | 'material-icons-round' | 'material-icons-sharp' | 'material-icons-two-tone'
}
export interface Tooltip<T> {
  message: string;
  bgColor?: string;
  txtColor?: string;
}
export type LinkType<T> = {
  [K in keyof T]?: Link<T[K]>
}
export type TooltipType<T> = {
  [K in keyof T]?: Tooltip<T[K]>
}
export type ReasonType<T> = {
  [K in keyof T]?: StatusReasons<T[K]>
}
export interface Link<T> {
  displayLabel?: string;
  path?: string;
  type?: 'external' | 'internal';
  params?: Params;
  openInNewTab?: boolean;
}

export interface DxTableMenuAction<T> {
  data?: DxTableData<T>;
  event?: MenuAction;
}

export interface ContextMenuSetting {
  label?: string;
  class?: string;
  id?: number;
  dropDown?: {
    label?: string;
    defaultLabel?: boolean;
  };
  color?: string;
  hide?: boolean;
}

export interface ContextMenuServiceSetting {
  data?: any;
  url?: string;
  method?: string;
}

export interface DxTableRowEdit<T> {
  data?: DxTableData<T>;
  type?: string;
}
