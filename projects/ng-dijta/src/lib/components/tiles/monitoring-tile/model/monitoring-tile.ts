export interface MFooter {
    icon?: string;
    iconClr?: string;
    count?: number;
    countClr?: string;
    description?: string;
}

export interface MHeader {
    title?: string;
    titleClr?: string;
    subTitle?: string;
    subTitleClr?: string;
    oneLineTitle?: string;
}

export interface MonitoringTileDto {
    header?: MHeader;
    footer?: MFooter;
}