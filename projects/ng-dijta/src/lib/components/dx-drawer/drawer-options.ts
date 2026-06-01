import { Direction } from '@angular/cdk/bidi';
import { TemplateRef, Type } from '@angular/core';
import { DxSafeAny } from '../../core/outlet/type/any';


import { DxDrawerRef } from './drawer-ref';

export const DRAWER_DEFAULT_SIZE = 378;
export const DRAWER_LARGE_SIZE = 736;
export type DxDrawerPlacement = 'left' | 'right' | 'top' | 'bottom';
export type DxDrawerSize = 'default' | 'large';

export interface DxDrawerOptionsOfComponent<T = DxSafeAny, D = DxSafeAny> {
    dxClosable?: boolean;
    dxMaskClosable?: boolean;
    dxCloseOnNavigation?: boolean;
    dxDirection?: Direction;
    dxMask?: boolean;
    dxKeyboard?: boolean;
    dxNoAnimation?: boolean;
    dxTitle?: string | TemplateRef<{}>;
    dxExtra?: string | TemplateRef<{}>;
    dxFooter?: string | TemplateRef<{}>;
    dxContent?: TemplateRef<{ $implicit: D; drawerRef: DxDrawerRef }> | Type<T>;
    dxContentParams?: Partial<T & D>;
    dxMaskStyle?: object;
    dxBodyStyle?: object;
    dxWrapClassName?: string;
    dxSize?: DxDrawerSize;
    dxWidth?: number | string;
    dxHeight?: number | string;
    dxPlacement?: DxDrawerPlacement;
    dxZIndex?: number;
    dxOffsetX?: number;
    dxOffsetY?: number;
}

export interface DxDrawerOptions<T = DxSafeAny, D = DxSafeAny> extends DxDrawerOptionsOfComponent<T, D> {
    nzOnCancel?(): Promise<DxSafeAny>;
}