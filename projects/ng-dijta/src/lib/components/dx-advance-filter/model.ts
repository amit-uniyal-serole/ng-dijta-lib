import { KeyValueModel } from "../../core";

export interface FilterData {
    columns: Columns[]
}
export interface Columns {
    keyTt: string;
    valueTt: string;
    conditions: Conditions[]

}
export interface Conditions {
    keyTt: string;
    valueTt: string;
}
export interface FilterButtons {
    primaryBtn: BtnSettings
    secondaryBtn: BtnSettings
}
export interface BtnSettings {
    show: boolean,
    title: string
}
export interface DxAdvanceFilterModel {
    column: KeyValueModel[];
    conditions: KeyValueModel[]
}
export interface OnClickAddNewButton {

    actionType: string | number
    isAddNew: boolean

};