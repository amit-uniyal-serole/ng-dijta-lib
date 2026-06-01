import { Inject, Injectable, LOCALE_ID, Optional } from '@angular/core';
import moment from 'moment-timezone';
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
      format = this.getDateFormat()
    }
    if (!timezone) {
      timezone = this.getTimezone()
    }

    return moment(this.checkZisPersent(value)).tz(timezone).format(format);
  }

  private getDateFormat(): DX_DATE_FORMAT {
    return this.config?.value?.dateFormat ? this.config?.value?.dateFormat : 'DD/MM/YYYY';
  }
  getTimezone(): string {
    return this.config?.value?.timezone && this.config?.value?.timezone !== "" ? this.config?.value?.timezone : Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  getDateToFormat(value: string | number | Date | undefined, format: string): string {
    return moment(this.checkZisPersent(value)).tz(this.getTimezone()).format(format);
  }
  getDate(value: string | number | Date | undefined): number {
    return moment(this.checkZisPersent(value)).tz(this.getTimezone()).date();
  }
  getTimeToNow(value: string | number | Date | undefined): string {
    return moment(this.checkZisPersent(value)).tz(this.getTimezone()).fromNow();
  }

  private checkZisPersent(data: Date | number | string | undefined): Date | string | number | undefined {
    if (typeof data === 'string') {
      const endsWithZ = data.endsWith("Z");
      return endsWithZ ? data : `${data}Z`
    }
    return data;
  }
}
