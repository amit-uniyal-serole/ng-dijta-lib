
export interface DefaultDualListFormat {
  direction?: 'left-to-right' | 'right-to-left';
  draggable?: boolean;
  locale?: undefined;
}

export interface DualListConfig {
  /**
   * @description mandatory if we are passing array of objects
   */
  key: string;
  /**
   * @description pass field name or fuction which return string
   */
  display: any;
  /**
   * @description Define height for  transfer list
   */
  height?: string;
  /**
   * @description hide and show filters
   */
  filter?: boolean;
  /**
   * @description sort
   */
  sort?: boolean;
  /**
   * @description disable complete transfer functionality
   */
  disabled?: boolean;
  /**
   * @description direction,draggable and locale
   */
  format?: DefaultDualListFormat;
  /**
   * @description show avatar for text
   */
  showAvatar?: boolean;
  /**
   * @description available title
   */
  availableListTitle?: string;
  /**
   * @description confirmed title
   */
  confirmedListTitle?: string;
  /**
   * @description enable bulk transfer buttons
   */
  enableBulkTransfer?: boolean;

  hideDefaulLabel?: boolean;

  subtitleAsEmailFg?: boolean;

  serverFilter?: boolean;

  enableSingleItemSort?:boolean;

  enableColumnPinning?: boolean;
}

export interface DxListBoxAdditionalFeatures {
  subtitle?: string;
  src?: string;
  icon?: string;
}
