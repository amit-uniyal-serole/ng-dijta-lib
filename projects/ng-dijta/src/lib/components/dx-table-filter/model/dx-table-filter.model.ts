import { KeyValueModel } from "../../../core/UI/model/keyValue";

export type FIELD_TYPE = 'input' | 'number' | 'select' | 'date' ;
export type FIELD_WIDTH = 'col-md-4'|'col-md-6' |'col-md-8' | 'col-md-12'
export interface DxTableFilterSettings {
  label?: string;
  name: string;
  error?: string;
  type: FIELD_TYPE;
  multiselect?: boolean;
  options?: KeyValueModel[];
  width?:FIELD_WIDTH,
  defaultValue?:string
}
