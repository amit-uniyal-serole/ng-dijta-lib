import { NumberFormatVariant } from "../../../core/UI/constant/currency-default";
import { GroupAction } from "../../dx-card";
import { DxDetailsCardContent } from "../../dx-card/model/dx-details-card.model";
import { LookupApiConfig } from "../../dx-lookup";

export type ColumnVariants = 'standard';

export interface KanbanViewModel {
    name: string;
    columns: KanbanViewColumnsModel[];
}
export interface KanbanViewColumnsModel {
    name: string;
    id: string;
    color?: string;
    sequence: number;
    variant: ColumnVariants;
    apiConfig?: LookupApiConfig<any>
    totalAmountUrl?: {
        currencyFormat?: {
            decimal?: number;
            currencyCode?: string;
            appCurrencyConfig?: NumberFormatVariant
        };
        config: LookupApiConfig<any>
    };
    content: KanbanViewColumnContent[];
}
export interface KanbanViewColumnContent {
    id: number;
    sequence: number;
    header?: KanbanViewContentHeader;
    data?: DxDetailsCardContent[];

    footer?: KanbanViewContentFooter;
    original?: any
}

export interface KanbanViewContentHeader {
    title?: string;
    actions?: KanbanViewContentHeaderAction[],
    actionGroup?: GroupAction;
}
export interface KanbanViewContentHeaderAction {
    label: string;
    type: string;
    icon?: string;
    iconColor?: string;
    textColor?: string;
}
export interface KanbanViewContentFooter {
    title?: string;
    content?: DxDetailsCardContent
}

export interface KanbanBoardColumnChangeModel {
    transferedTo: string;
    data: KanbanViewColumnContent;
}

export interface KanbanBoardSequenceChangeModel {
    currentColumnId: string;
    data: KanbanViewColumnContent[];
}

export interface KanbanCardActionEvent {
    type: string;
    data: KanbanViewColumnContent;
}