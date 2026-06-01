import { Injectable } from '@angular/core';
import { NumberFormatVariant } from '../../core/UI/constant/currency-default';


@Injectable({ providedIn: 'root' })
export class NumberFormatService {

    format(value: number | string, format: NumberFormatVariant, decimalPlaces: number = 0): string {

        if (value == null) return '';

        // If value is string and a valid number, convert it
        if (typeof value === 'string') {
            const parsed = parseFloat(value.replace(/,/g, '')); // remove any commas
            if (isNaN(parsed)) return '';
            value = parsed;
        }

        if (typeof value !== 'number' || isNaN(value)) return '';

        const decimalChar = format.decimalSeparator === 'Comma' ? ',' : '.';
        const separator = this.separatorChar(format.thousand_separator);

        const [intPart, decimalPart = ''] = value.toFixed(decimalPlaces).split('.');

        let formattedInt = '';

        if (format.numeralSystem === 'indian') {
            const lastThree = intPart.slice(-3);
            const rest = intPart.slice(0, -3);
            const indianFormatted = rest.replace(/(\d)(?=(\d{2})+(?!\d))/g, `$1${separator}`);
            formattedInt = rest ? `${indianFormatted}${separator}${lastThree}` : lastThree;
        } else {
            formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        }

        return decimalPlaces > 0
            ? `${formattedInt}${decimalChar}${decimalPart}`
            : formattedInt;
    }


    parse(formatted: string, format: NumberFormatVariant): number | null {
        if (!formatted) return null;

        const separator = this.separatorChar(format.thousand_separator);
        const regex = new RegExp(`\\${separator}`, 'g');
        let cleaned = formatted.replace(regex, '');

        if (format.decimalSeparator === 'Comma') {
            cleaned = cleaned.replace(/,/g, '.');
        }

        const result = parseFloat(cleaned);
        return isNaN(result) ? null : result;
    }

    private separatorChar(type: string): string {
        switch (type) {
            case 'Comma': return ',';
            case 'Period': return '.';
            case 'Space': return ' ';
            default: return ',';
        }
    }
}
