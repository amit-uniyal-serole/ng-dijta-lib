import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import { formatInTimeZone, utcToZonedTime } from 'date-fns-tz';
import { formatDistanceToNow, getDate } from 'date-fns';
import { DX_DATE_FORMAT } from '../../../core/UI/constant/currency-default';

import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../../core/UI/service/input/ui-component.config';

@Injectable()
export class DxDateService {
  constructor(
    @Inject(LOCALE_ID) public locale: string,
    @Optional()
    @Inject(UI_COMPONENT_CONFIG)
    public config: UIConfigWrapper
  ) { }

  transform(
    value: string | number | Date,
    format?: string | undefined,
    timezone: string | undefined = this.getTimezone()
  ): string {
    if (!format) {
      format = this.getDateFormat();
    }
    if (!timezone) {
      timezone = this.getTimezone();
    }
    const date = this.toDate(this.checkZisPersent(value));
    return formatInTimeZone(date, timezone, this.toDateFnsFormat(format));
  }

  private getDateFormat(): DX_DATE_FORMAT {
    return this.config?.value?.dateFormat ? this.config?.value?.dateFormat : 'DD/MM/YYYY';
  }

  getTimezone(): string {
    return this.config?.value?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  getDateToFormat(value: string | number | Date | undefined, format: string): string {
    const date = this.toDate(this.checkZisPersent(value));
    return formatInTimeZone(date, this.getTimezone(), this.toDateFnsFormat(format));
  }

  getDate(value: string | number | Date | undefined): number {
    const date = this.toDate(this.checkZisPersent(value));
    return getDate(utcToZonedTime(date, this.getTimezone()));
  }

  getTimeToNow(value: string | number | Date | undefined): string {
    const date = this.toDate(this.checkZisPersent(value));
    return formatDistanceToNow(utcToZonedTime(date, this.getTimezone()), { addSuffix: true });
  }

  private toDate(value: Date | string | number | undefined): Date {
    if (!value) return new Date();
    return new Date(value);
  }

  private checkZisPersent(data: Date | number | string | undefined): Date | string | number | undefined {
    if (typeof data === 'string') {
      const endsWithZ = data.endsWith('Z');
      return endsWithZ ? data : `${data}Z`;
    }
    return data;
  }

  /**
   * Converts moment-style format tokens to date-fns tokens.
   * Only maps tokens used in this codebase — extend if new formats are added.
   */
  private toDateFnsFormat(momentFormat: string): string {
    return momentFormat
      .replace(/YYYY/g, 'yyyy')
      .replace(/DD/g, 'dd')
      .replace(/Do/g, 'do');
  }
}
