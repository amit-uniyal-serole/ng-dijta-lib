import { Component, Input } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Link } from '../../interfaces/dx-additional.interface';
import { DxTableColumn } from '../../interfaces/dx-table.interface';

@Component({
  selector: 'dx-link',
  templateUrl: './dx-link.component.html',
  styleUrls: ['./dx-link.component.scss']
})
export class DxLinkComponent<T> {
  @Input() data!: Link<T>;
  @Input() column!: DxTableColumn<T>;
  target!: string;
  constructor(private readonly router: Router) { }
  ngOnInit(): void {
    this.target = this.column?.setting?.linkSettings?.target ?? '_blank'
  }
  onClickLink(data: Link<T>): void {
    if (data?.type === 'internal') {
      this.router?.navigate([data?.path], {
        queryParams: data?.params
      })
    } else {
      window.open(data?.path, data?.openInNewTab ? '_blank' : '_self');
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
