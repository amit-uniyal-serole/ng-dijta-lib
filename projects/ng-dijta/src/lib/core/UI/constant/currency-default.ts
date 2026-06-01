export type DisplayDigitsType = 'code' | 'symbol' | 'symbol-narrow';
export type DX_DATE_FORMAT = 'DD/MM/YYYY' | 'YYYY/MM/DD' | 'DD-MM-YYYY' | 'dd/MM/yyyy | YYYY-MM-DD' | 'YYYY/MM/DD' | 'YYYY/MM/dd' | 'MMMM YYYY' | 'MMMM d, y';
export type DX_TIME_FORMAT = 'h:mm:ss a' | 'h:mm:ss' | 'HH:mm:ss a' | 'hh:mm:ss a' | 'HH:mm:ss' | 'HH:mm' | 'hh:mm' | 'HH:mm:ss ZZ';

export class CurrencyDefault {
    static readonly DEFAULT_CURRENCY_CODE: string = '$ ';
    static readonly DEFAULT_DISPLAY: DisplayDigitsType = 'symbol';
    static readonly DEFAULT_DIGITS_INFO: string = '1.0-0';
    static readonly DEFAULT_LOCALE: string = 'en_US'
}
export interface CurrencyConfig {
    currencyCode?: string,
    display?: DisplayDigitsType | string,
    digitsInfo?: string,
    standard?: boolean;
}
export class DateDefault {
    static readonly DEFAULT_DATE_PICKER_FORMAT: string = 'YYYY/MM/DD';
    static readonly DEFAULT_TIME_PICKER_FORMAT: string = 'h:mm:ss a';
}



export interface NumberFormatVariant {
    decimalSeparator: 'Period' | 'Comma';
    numeralSystem: 'international' | 'indian';
    thousand_separator: 'Comma' | 'Period' | 'Space';
    locale?: string;
    compactNumberNotations?: boolean; // Added temporary so it will not impact other
}
