import { Component, Input } from '@angular/core';
import { DateUtil } from '../../../../utils/date/date.util';
import moment from 'moment';

@Component({
  selector: 'dx-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {

  static readonly DEFAULT_FORMAT: string = DateUtil.DEFAULT_DISPLAY_FORMAT;
  static readonly DEFAULT_TEXT: string = '-';

  text: string = DateComponent.DEFAULT_TEXT;

  private _date!: Date | string;
  private _format: string = DateComponent.DEFAULT_FORMAT;
  private _defaultText: string = DateComponent.DEFAULT_TEXT;

  @Input()
  set date(val: string | Date) {
    
      if (this._date !== val) {
          this._date = val;
          this.updateText();
      }
  }

  get date(): string | Date {
      return this._date;
  }

  @Input()
  set format(val: string) {
      if (this._format !== val) {
          this._format = val;
          this.updateText();
      }
  }

  get format(): string {
      return this._format;
  }

  @Input()
  set defaultText(val: string) {
      if (this._defaultText !== val) {
          this._defaultText = val;
          this.updateText();
      }
  }

  get defaultText(): string {
      return this._defaultText;
  }

  private updateText(): void {
      const tmpFormat: string = this.format
          ? this.format
          : DateComponent.DEFAULT_FORMAT;
      this.text = this.date
          ? moment(this.date)
              .format(tmpFormat)
          : this.defaultText;
  }

}
