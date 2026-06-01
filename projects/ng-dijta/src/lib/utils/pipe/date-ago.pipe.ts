import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

@Pipe({
  name: 'dateAgo',
})
export class DateAgoPipe implements PipeTransform {
  transform(value: string | number | Date | undefined, timezone: string): string | null {
    if (!value) {
      return '-';
    }
    if (!timezone) {
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }
    return this.getDateTimeValue(value, timezone);
  }

  getDateTimeValue(value: string | number | Date, timezone: string): string {
    const date = new Date(value);
    const zonedDate = utcToZonedTime(date, timezone);
    return formatDistanceToNow(zonedDate, { addSuffix: true });
  }
}
