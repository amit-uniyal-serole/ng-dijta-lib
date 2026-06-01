import { Component, Input } from '@angular/core';
import { StringUtil } from '../../../../utils/string/string.utils';
import { NgDxAvatarSettings } from '../../../dx-avatar/model/avatar';
import { CardTextBg, DetailsCardAvatar } from '../../model/dx-details-card.model';
import { Link } from '../../../dx-table/interfaces/dx-additional.interface';
import { Params } from '@angular/router';
@Component({
  selector: 'dx-card-text',
  templateUrl: './dx-card-text.component.html',
  styleUrls: ['./dx-card-text.component.scss'],
})
export class DxCardTextComponent {
  @Input() color!: string;
  @Input() avatar!: DetailsCardAvatar;
  @Input() isStatus: boolean = false;
  @Input() enableTextCopy: boolean = false;
  @Input() icon!: string;
  @Input() highLightData: boolean = false;
  @Input() link: Link<any> | undefined;
  clickToCopy: string = 'Click to copy';
  avatarSettings: NgDxAvatarSettings = {
    initialsSize: 2,
    size: 40,
  };
  static readonly DEFAULT_TEXT: string = '-';

  text: string = DxCardTextComponent.DEFAULT_TEXT;

  private _data!: string | number;
  private _defaultText: string = DxCardTextComponent.DEFAULT_TEXT;

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
    const tmp: string = this.data === undefined || this.data === null ? this.defaultText : String(this.data);
    this.text = StringUtil.isBlank(tmp) ? this.defaultText : tmp;

  }

  showBackgroundColor(column: boolean, color: string): CardTextBg | undefined {
    if (column == true && color) {
      let ngclass: CardTextBg = {
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
    this.clickToCopy = 'Copied';
  }
  changeText(): void {
    this.clickToCopy = 'Click to copy';
  }

  prepareExtranalLink(data: Link<any>): string {
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
