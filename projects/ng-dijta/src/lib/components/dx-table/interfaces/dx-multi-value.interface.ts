import { KeyValueModel } from "../../../core/UI/model/keyValue";


export type TableDropdown<T> = {
    [K in keyof T]?: TableKeyValueModel<T[K]>[];
}
export interface TableKeyValueModel<T> extends KeyValueModel {

}