import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableLookupDataModel } from '../../interfaces/dx-table-lookup.interface';
import { Router } from '@angular/router';
import { DxTableColumn } from '../../interfaces/dx-table.interface';
import { NgDxAvatarSettings } from '../../../dx-avatar/model/avatar';


@Component({
  selector: 'dx-table-lookup',
  templateUrl: './dx-table-lookup.component.html',
  styles: [
    `
    .text-with-icon {
      display: flex;
      align-items: center;   
    } 
    .text-with-icon ndx-avatar {
        margin-right:3px;
      }
      .text-with-icon a {
        text-decoration: none; 
      }
    .path-color{
      color:#0d6efd;
    }
    `
  ]
})
export class DxTableLookupComponent<T> implements OnChanges {
  @Input() data: TableLookupDataModel<T> | undefined;
  @Input() column!: DxTableColumn<T>;
  @Output() onLookupLink: EventEmitter<any> = new EventEmitter<any>();
  avatarSettings: NgDxAvatarSettings | undefined;
  constructor(private readonly router: Router) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.previousValue !== changes['data']?.currentValue) {
      this.avatarSettings = this.data?.avatar ?? {
        "initialsSize": 2,
        "size": 37
      };
      this.data = changes['data']?.currentValue;
    }
  }

  onClickOpenIcon(content: TableLookupDataModel<T>): void {
    this.router.navigate([this.data?.path], {
      queryParams: this.data?.params
    })
  }

  onClickLookupLink(data: TableLookupDataModel<T>): void {
    this.onLookupLink.emit(data)
  }
}
