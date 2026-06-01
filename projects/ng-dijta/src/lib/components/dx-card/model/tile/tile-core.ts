export interface TileHeader {
    headerIcon?: string;
    headerTitle?: string;
    headerSubTitle?: string;
}

export interface TileFooter {
    footerTitle?: string;
    footerTitleColor?: string;
    footerTitleType?: 'currency' | 'number';
    footerTitlePrefix?: string;
    footerTitleSuffix?: string;
    navigation?: string;
    openNewTab?: boolean;
}