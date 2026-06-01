import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateAgo',
})
export class DateAgoPipe implements PipeTransform {
  transform(value: string | number | Date | undefined,
    timezone: string): string | null {
    if (!value) {
      return '-'
    }
    if (!timezone) {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    if (value) {
      value = this.getDateTimeValue(value, timezone);
    }
    return value.toString();
  }

  getDateTimeValue(value: string | number | Date, timezone: string) {
    return moment(value).tz(timezone).fromNow()
  }
}
