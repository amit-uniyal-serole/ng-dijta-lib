import moment from 'moment';
import { StringUtil } from './string.util';
export type DATE_FORMAT =
  | 'YYYY-MM-DD'
  | 'DD-MM-YYYY'
  | 'MM-DD-YYYY'
  | 'MMMM Do YYYY';
export interface CustomDateInterface {
  month: string | undefined;
  day: string;
  year: string;
}

export class DateUtil {
  static DEFAULT_DATE: CustomDateInterface = {
    year: 'YYYY',
    month: 'MM',
    day: 'DD',
  };
  static convertDateToCustomFormat(date: string | Date): string | undefined {
    if (!date) {
      return undefined;
    }
    const convertDate: CustomDateInterface = DateUtil.getCustomDateFormat(
      new Date(date)
    );
    return `${String(convertDate.day)}-${String(convertDate.month)}-${String(convertDate.year)}`;
  }
  static getCustomDateFormat(date: Date): CustomDateInterface {
    if (!date) {
      return DateUtil.DEFAULT_DATE;
    }
    return {
      day: DateUtil.covertToDigit(
        StringUtil.toNumberString(Number(DateUtil.getDay(date))) as string
      ) as string,
      month: DateUtil.covertToDigit(
        StringUtil.toNumberString(Number(DateUtil.getMonth(date))) as string
      ),
      year: StringUtil.toNumberString(DateUtil.getYear(date)) as string,
    };
  }

  static covertToDigit(day: string): string | undefined {
    if (day?.length <= 1) {
      return `0${day}`;
    }
    return day;
  }

  static getDay(date: Date): number | undefined {
    return date.getDate();
  }

  static getMonth(date: Date): number | undefined {
    return date.getMonth() + 1 ?? 0;
  }

  static getYear(date: Date): number {
    return date.getFullYear() ?? 0;
  }

  static format(
    date: Date | string,
    format: DATE_FORMAT = 'DD-MM-YYYY'
  ): string | undefined {
    if (!date) {
      return undefined;
    }
    return moment(date).format(format);
  }
  static fromNow(date: Date | string): string | undefined {
    if (!date) {
      return undefined;
    }
    return moment(date).fromNow();
  }
}
