import moment from 'moment';

export type DATE_FORMAT = 'YYYY-MM-DD' | 'YYYY/MM/DD' | 'YYYY/MM/dd' | 'MMMM YYYY' | 'DD/MM/YYYY' | 'YYYY/MM/DD HH:mm:ss' | 'DD-MM-YYYY' | 'MMMM d, y'

export class DateUtil {
    static readonly DEFAULT_ISO_FORMAT: string = 'YYYY-MM-DD';
    static readonly DEFAULT_DISPLAY_FORMAT: string = 'YYYY/MM/DD';
    static readonly DEFAULT_PIPE_DISPLAY_FORMAT: string = 'YYYY/MM/dd';
    static readonly MONTH_YEAR_FORMAT: string = 'MMMM YYYY';
    static readonly DAY_MONTH_YEAR_FORMAT: string = 'DD/MM/YYYY';
    static readonly DEFAULT_FORMAT: string = 'DD-MM-YYYY';
    static readonly DEFAULT_SHORT_FORMAT: string = 'MMMM d, y';
    static readonly DEFAULT_DISPLAY_WITH_TIME_FORMAT: string = `${DateUtil.DEFAULT_DISPLAY_FORMAT} HH:mm:ss`;

    /**
     * Converts a date to a string date format.
     * @param date Date to format
     * @param format Date format based on momentjs's date format fields.
     *               If undefined, the ISO date will be used
     */
    static format(date: Date | string | moment.Moment | undefined, format: string = DateUtil.DEFAULT_ISO_FORMAT): string | undefined {
        return (date)
            ? moment(date)
                .format(format)
            : undefined;
    }

    static toMoment(value?: string | Date): moment.Moment {
        return moment(value);
    }


}
