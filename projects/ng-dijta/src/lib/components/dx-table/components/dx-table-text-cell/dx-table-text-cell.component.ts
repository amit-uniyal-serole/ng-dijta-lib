import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { StringUtil } from '../../../../utils/string/string.utils';
import { DxTableColumn } from '../../interfaces/dx-table.interface';
import { Link, LinkType, ReasonType, StatusReasons, Tooltip } from '../../interfaces/dx-additional.interface';
import { NgDxAvatarSettings } from '../../../dx-avatar/model/avatar';
import { Params } from '@angular/router';
import { FlexTableCellComponent } from '../../ngx-table/flex-table-cell/flex-table-cell.component';
interface BgClass {
  color: string;
  opacity: string;
  fontWeight: string;
  ['background-color']: string;
}
@Component({
  selector: 'dx-table-text-cell',
  templateUrl: './dx-table-text-cell.component.html',
  styleUrls: ['./dx-table-text-cell.component.scss'],
})
export class DxTableTextCellComponent<T> extends FlexTableCellComponent<any> implements OnChanges {

  @Input() color!: string;
  @Input() column!: DxTableColumn<T>;
  @Input() avatarSrc!: string;
  @Input() reason?: StatusReasons<T> | undefined;
  @Input() reasons: ReasonType<T> | undefined;
  @Input() isCanvasCard: boolean = false;
  @Input() link: LinkType<T> | undefined;
  @Input() toolTip: Tooltip<T> | undefined;
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  avatarSettings: NgDxAvatarSettings = {
    "initialsSize": 2,
    "size": 37
  }
  copyText: string = 'Click to copy';
  static readonly DEFAULT_TEXT: string = '';

  text: string = DxTableTextCellComponent.DEFAULT_TEXT;

  private _data!: string | number;
  private _defaultText: string = DxTableTextCellComponent.DEFAULT_TEXT;

  ngOnChanges(): void {
    this.getReasons();
  }

  @Input()
  set data(val: string | number) {
    if (this._data !== val) {
      this._data = val;
      this.updateText();

    }
  }

  get data(): string | number {
    return this._data;
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
    const tmp: string =
      !this.data
        ? this.defaultText
        : String(this.data);

    this.text = StringUtil.isBlank(tmp) ? this.defaultText : tmp;
  }

  showBackgroundColor(column: boolean, color: string): BgClass | undefined {
    if (column == true && color) {
      let ngclass: BgClass = {
        color: color,
        opacity: '0.9',
        'background-color': `${color + '38'}`,
        fontWeight: 'bold',
      };
      return ngclass;
    } else {
      return undefined;
    }
  }
  onClickCopy(): void {
    this.copyText = 'Copied';
  }
  changeText(): void {
    this.copyText = 'Click to copy';
  }

  getReasons(): void {
    if (this.reasons) {
      this.reason = this.reasons[this.column.field];
    }
  }

  prepareExtranalLink(data: Link<T>): string {
    return `${data?.path}` + this.prepareQueryParams(data?.params);
  }
  private prepareQueryParams(params: Params | undefined): string {
    let queryParams = '';
    if (params) {
      Object.keys(params).forEach((key: string, index: number) => {
        const prepare = `${key}=${params[key]}`;
        if (index === 0) {
          queryParams = queryParams.concat('?');
        }
        queryParams = queryParams.concat(prepare);
      })
    }
    return queryParams;
  }

}
