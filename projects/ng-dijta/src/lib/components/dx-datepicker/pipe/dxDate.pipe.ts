import { Pipe, PipeTransform } from '@angular/core';
import { DxDateService } from '../service/dx-date.service';

@Pipe({
  name: 'dxdate',
})
export class DxDatePipe implements PipeTransform {
  constructor(private readonly dxDateService: DxDateService) { }

  transform(
    value: string | number | Date | undefined,
    format?: string,
    timezone?: string | undefined
  ): string | null {
    if (value === '-Z') {
      return '-'
    }
    if (!value) {
      return ''
    }
    return this.dxDateService.transform(value, format, timezone);
  }
}
