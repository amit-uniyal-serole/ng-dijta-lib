import { Params } from '@angular/router';
import { CurrencyConfig } from '../../../core/UI/constant/currency-default';
import { KeyValueModel } from '../../../core/UI/model/keyValue';
import { DATE_FORMAT } from '../../../utils/date.util';
import { AdapterDataModel } from '../../dx-image-upload/model/dx-image-upload.model';
import { Actions } from '../../dx-popover/model/popover.model';
import { AvatarStatus, NgDxAvatarSettings } from '../../dx-avatar/model/avatar';
import { CurrencySetting, Link } from '../../dx-table/interfaces/dx-additional.interface';

export type CARD_COLUMN_TYPE =
  | 'col-md-12'
  | 'col-md-6'
  | 'col-md-4'
  | 'col-md-3';
export type CARD_DATA_TYPE = 'text' | 'date' | 'contact' | 'currency' | 'URL' | 'Email' | 'datetime' | 'Check Box' | 'User' | 'Popover' | 'dropdown' | 'HTML' | 'image' | 'ONLY_HTML';
export type CARD_LABEL_ALIGNMENT = 'left' | 'right';
export interface DxDetailsCard {
  col?: CARD_COLUMN_TYPE;
  cards?: DxCardData[];
}
export interface DxCardData {
  title?: string;
  col?: CARD_COLUMN_TYPE;
  labelAlignment?: CARD_LABEL_ALIGNMENT;
  content?: DxDetailsCardContent[];
  enableTextCopy?: boolean;
}

export interface HeaderData {
  closeIcon?: boolean
  showDetailIcon?: boolean;
  title: string;
  subtitle?: string;
  src?: string;
  avatarSettings?: NgDxAvatarSettings;
}

export interface DxDetailsCardContent {
  label?: string;
  value?: string | number | Date | boolean | any[];
  type: CARD_DATA_TYPE;
  fieldName?: string;
  settings?: DxDetailsCardDataSettings;
  avatar?: DetailsCardAvatar;
  isStatus?: boolean;
  color?: string;
  icon?: string;
  variant?: string;
  checkBoxConfig?: CheckBoxConfig;
  displayPopoverConfig?: DisplayPopoverConfig;
  data?: any;
  path?: string;
  params?: Params;
  adapterData?: AdapterDataModel;
  textOverlap?: boolean;
  link?: Link<any>;
  currencySettings?: CurrencySetting;
}

export interface DisplayPopoverConfig {
  isShow: boolean;
  popover: Popover;
  variantType?: 'basicVariant';
  header: HeaderData;
  content?: Content[] | string;
  actions?: Actions;
  data?: any;
}

export interface Popover {
  placement?: 'top' | 'topLeft' | 'topRight' | 'leftTop' | 'left' | 'leftBottom' | 'rightTop' | 'right' | 'rightBottom' | 'bottomLeft'
  | 'bottom' | 'bottomRight';
  trigger: 'click' | 'hover';
}

export interface Content {
  label: string;
  value: string;
}

export interface CheckBoxConfig {
  hideCheckBox?: boolean;
  disable?: boolean;
  displayLabel?: boolean;
  trueAs?: string;
  falseAs?: string;
}

export interface DxDetailsCardDataSettings {
  date?: CardDateSettings;
  currency?: CurrencyConfig;
  dropdown?: KeyValueModel[]
}
export interface CardDateSettings {
  format?: DATE_FORMAT;
  locale?: string;
}

export interface CardTextBg {
  color: string;
  opacity: string;
  fontWeight: string;
  ['background-color']: string;
}

export interface DetailsCardAvatar {
  name?: string;
  src?: string;
  avatarStatus?: AvatarStatus;
  avatarSettings?: NgDxAvatarSettings;
  enableTooltip?: boolean;
}
