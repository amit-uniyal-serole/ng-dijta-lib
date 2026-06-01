import { InjectionToken, TemplateRef, Type } from '@angular/core';
import { DxSafeAny } from '../../core/outlet/type/any';

export type DxEmptySize = 'normal' | 'small' | '';

export type DxEmptyCustomContent = Type<DxSafeAny> | TemplateRef<DxSafeAny> | string;

export const DX_EMPTY_COMPONENT_NAME = new InjectionToken<string>('dx-empty-component-name');
