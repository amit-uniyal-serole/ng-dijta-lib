import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatService } from '../service/number-format/number-format.service';
import { NumberFormatVariant } from '../core/UI/constant/currency-default';
@Pipe({
    name: 'localizedNumber',
    standalone: true
})
export class LocalizedNumberPipe implements PipeTransform {
    constructor(private formatter: NumberFormatService) { }

    transform(value: number, format: NumberFormatVariant, decimalPlaces: number = 0): string {
        return this.formatter.format(value, format, decimalPlaces);
    }
}
