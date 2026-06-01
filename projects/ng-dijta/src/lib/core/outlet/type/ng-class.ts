import { DxSafeAny } from './any';

export type NgClassType = string | string[] | Set<string> | NgClassInterface;

export interface NgClassInterface {
    [klass: string]: DxSafeAny;
}

export interface NgStyleInterface {
    [klass: string]: DxSafeAny;
}
