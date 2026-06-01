import { CurrencyConfig, DX_TIME_FORMAT, NumberFormatVariant } from "../../constant/currency-default";
import { DX_DATE_FORMAT } from '../../constant/currency-default';



export interface UiConfig {
    outline?: 'floating' | 'none-floating' | 'outer-label';
    currency?: CurrencyConfig;
    locale?: string;
    dateFormat?: DX_DATE_FORMAT;
    timeFormat?: DX_TIME_FORMAT;
    timezone?: string;
    country?: string;
    appCurrencyConfig?: NumberFormatVariant;
}