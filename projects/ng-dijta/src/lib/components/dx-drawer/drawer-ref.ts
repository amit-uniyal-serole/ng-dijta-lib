import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DxSafeAny } from '../../core/outlet/type/any';
import { DxDrawerPlacement } from './drawer-options';

export abstract class DxDrawerRef<T = DxSafeAny, R = DxSafeAny> {
    abstract afterClose: Observable<R>;
    abstract afterOpen: Observable<void>;
    abstract close(result?: R): void;
    abstract open(): void;
    abstract getContentComponent(): T | null;

    abstract dxClosable?: boolean;
    abstract dxNoAnimation?: boolean;
    abstract dxMaskClosable?: boolean;
    abstract dxKeyboard?: boolean;
    abstract dxMask?: boolean;
    abstract dxTitle?: string | TemplateRef<{}>;
    abstract dxPlacement?: DxDrawerPlacement;
    abstract dxMaskStyle?: object;
    abstract dxBodyStyle?: object;
    abstract dxWrapClassName?: string;
    abstract dxWidth?: number | string;
    abstract dxHeight?: number | string;
    abstract dxZIndex?: number | string;
    abstract dxOffsetX?: number | string;
    abstract dxOffsetY?: number | string;
}