import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DxCurrencyService } from '../../../dx-currency';
import { Link, LinkType } from '../../interfaces/dx-additional.interface';
import { Params } from '@angular/router';

@Component({
  selector: 'dx-number-cell',
  templateUrl: './dx-number-cell.component.html',
  styleUrls: ['./dx-number-cell.component.css']
})
export class DxNumberCellComponent implements OnChanges, OnInit {
  @Input() data: number | undefined;
  val: string | undefined;
  @Input() link: LinkType<any> | undefined;
  constructor(
    private readonly dxCurrencyService: DxCurrencyService
  ) {
  }

  ngOnInit(): void {
    if (this.data || this.data === 0)
      this.val = this.dxCurrencyService.transformNumber(this.data);
  }

  ngOnChanges(): void {

    if (this.data || this.data === 0)
      this.val = this.dxCurrencyService.transformNumber(this.data);
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
