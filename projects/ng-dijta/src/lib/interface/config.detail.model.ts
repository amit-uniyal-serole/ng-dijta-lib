import { OrgInfo, UserInfo } from "../service/global-config/dx-global-config.service";

export interface DxGlobalConfigDetails {
    config: DxDijtaGlobalConfig
}
export interface DxDijtaGlobalConfig {
    tableConfig?: DxGlobalTableConfig;
}
export interface DxGlobalTableConfig {
    orgConfig?: DxGlobalTableConfigDetails;
    userConfig?: DxGlobalTableConfigDetails;
    defaultConfig?: DxGlobalTableConfigDetails;
}

export interface DxGlobalTableConfigDetails extends OrgInfo, UserInfo {
    pageSize?: number;
}