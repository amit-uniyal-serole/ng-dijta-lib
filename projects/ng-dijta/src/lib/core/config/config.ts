import { Direction } from '@angular/cdk/bidi';
import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { DxSafeAny } from '../outlet/type/any';


export interface DxConfig {
    drawer?: DrawerConfig;
    spin?: SpinConfig;
    popconfirm?: PopConfirmConfig;
    popover?: PopoverConfig;
    empty?: EmptyConfig;
}
export interface SpinConfig {
    nzIndicator?: TemplateRef<DxSafeAny>;
}

export interface DrawerConfig {
    nzMask?: boolean;
    nzMaskClosable?: boolean;
    nzCloseOnNavigation?: boolean;
    nzDirection?: Direction;
}
export interface PopConfirmConfig {
    nzPopconfirmBackdrop?: boolean;
    nzAutofocus?: null | 'ok' | 'cancel';
}
export interface PopoverConfig {
    nzPopoverBackdrop?: boolean;
}

export type DxConfigKey = keyof DxConfig;

export interface EmptyConfig {
    nzDefaultEmptyContent?: Type<DxSafeAny> | TemplateRef<string> | string | undefined;
}
/**
 * User should provide an object implements this interface to set global configurations.
 */
export const NZ_CONFIG = new InjectionToken<DxConfig>('nz-config');
