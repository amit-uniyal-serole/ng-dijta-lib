import { Params } from "@angular/router";
import { DisplayPopoverConfig } from "../../dx-card/model/dx-details-card.model";
import { NgDxAvatarSettings } from "../../dx-avatar/model/avatar";

export type TableLookup<T> = {
    [K in keyof T]?: TableLookupDataModel<T[K]>;
}
export interface TableLookupDataModel<T> {
    displayValue: string;
    path?: string;
    params?: Params;
    data?: any;
    displayPopoverConfig?: DisplayPopoverConfig;
    avatar?: NgDxAvatarSettings;
}