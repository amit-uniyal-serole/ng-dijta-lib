
import { NgDxAvatarSettings } from '../../dx-avatar/model/avatar';
import { ButtonLoaderType, ConfirmationPopover, MultiActionDropDown, MultiActionMenuList } from '../../dx-button/dx-button.model';

import { MultiActionButtonSettings } from '../../dx-table/interfaces/dx-table.interface';
export type DX_CARD_TYPE = 'basic';
export interface DxCardConfig {
  cardConfig?: CardConfig;
  basicCardConfig?: BasicVariant;
}
export interface CardConfig {
  type?: DX_CARD_TYPE;
};
export interface BasicVariant {
  profile?: CardProfileSetting;
  description?: CardDescription;
  contentListing?: CardContentListing[];
  tiles?: CardTileDetails[];
  actions?: MultiActionButtonSettings;
  actionGroup?: GroupAction;
}
export interface GroupAction {
  actions?:MultiActionMenuList[];
  subActions: MultiActionMenuList[];
}
export interface CardProfileSetting {
  src?: string | undefined;
  show?: boolean;
  name?: string;
  icon?: string;
  settings?: NgDxAvatarSettings;
}
export interface CardTileDetails {
  title?: string;
  subtitle?: string;
  bgColor?: string;
  txtColor?: string;
}

export interface CardDescription {
  title?: CardTitle;
  subtitle?: Subtitle;
  maxTitleWidth?: boolean;
}

export interface CardTitle {
  name?: string;
  badge?: string;
  badgeColor?: string;
}

export interface Subtitle {
  label?: string;
  value?: string;
}
export interface CardContentListing {
  icon?: string;
  label?: string;
  value?: string;
}

export interface DxCardAccordianAction {
  icon?: string;
  type: string;
  label?: string;
  tooltip?: string;
  color?: string;
  buttonType?: 'dx-button' | 'default',
  dxButtonConfig?: {
    class?: 'secondary' | 'primary',
    disabled?: boolean;
    src?: string;
    multiActionDropDown?: MultiActionDropDown;
    size?: 'default' | 'small' | 'big';
    confirmationPopover?: ConfirmationPopover;
    isLoading?: boolean;
    loaderType?: ButtonLoaderType;
  }
}
