import { CurrencyConfig } from "../../../core";
import { DxTableNgDxAvatar, NgDxAvatarSettings } from "../../dx-avatar/model/avatar";
import { BulkActions, DateSetting, MenuAction, MultiActionButtonSettings } from "../../dx-table"
type CANVAS_VIEW_TYPES = 'canvas-1' | 'canvas-2' | 'canvas-3'
type ALIGN_SUBTITLE = 'right' | 'bottom';
type valueType = 'text' | 'date' | 'currency'

export interface DxCanvasSetting {
    viewType?: CANVAS_VIEW_TYPES,
    toggleStickySettings?: boolean,
    pagination?: boolean;
    paginationFirstLastButtons?: boolean
    multiSelect?: boolean; //show checkbox
    totalItems?: number;
    pageSize?: number;
    leftActions?: MenuAction[];
    rightActions?: MenuAction[];
    bulkActions?: BulkActions
    multiActionButtonSettings?: MultiActionButtonSettings,
    leftSectionAvatar?: NgDxAvatarSettings,
    rightSectionAvatar?: NgDxAvatarSettings,
    leftDropDown?: BulkActions,
    paginatorMultiSelect?: boolean
}

export interface DxCanvasData<T> {
    id?: number,
    card?: {
        data?: T,
        isSticky?: boolean,
        left?: {
            class?: string[],
            avatar?: DxTableNgDxAvatar
        },
        center?: DxCanvasCenterContent,
        right?: DxCanvasRightSection
    }
}
export interface DxCanvasCenterContent {
    title?: string,
    badge?: string,
    subTitle?: SubTitle,
    body?: DxCanvasContent,
    footer?: DxCanvasContent
}
export interface SubTitle {
    valueTt: string,
    align?: ALIGN_SUBTITLE,
}
export interface LabelValuesPairs {
    labelTt?: string,
    valueTt?: string | Date,
    type: valueType,
    icon?: string,
    color?: string,
    settings?: CanvasDataSettings,
}
export interface DxCanvasContent {
    hideLabel?: boolean,
    hideSeparator?: boolean,
    source?: LabelValuesPairs[]
}

export interface DxCanvasRightSection {
    title?: RightSectionValue,
    body?: {
        avatar?: DxTableNgDxAvatar,
        content?: string,
        footer?: RightSectionValue,
        icon?: string
    }
}
export interface RightSectionValue {
    valueTt?: string | Date,
    type: valueType,
    icon?: string,
    color?: string,
    settings?: CanvasDataSettings,
}
export interface IconColor {
    color: string
}
export interface CanvasDataSettings {
    currency?: CurrencyConfig;
    date?: DateSetting;
}