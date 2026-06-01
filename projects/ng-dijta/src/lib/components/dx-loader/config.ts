import { InjectionToken } from "@angular/core";
import { LOADERS_TYPE } from "./dx-loader.enum";



export interface DxLoaderConfig {
  type?: LOADERS_TYPE;
}

export const DX_SPINNER_CONFIG = new InjectionToken<DxLoaderConfig>(
  "DX_SPINNER_CONFIG"
);
