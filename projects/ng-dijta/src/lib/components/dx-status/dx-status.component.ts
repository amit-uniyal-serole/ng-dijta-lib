import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { KeyValueModel } from '../../core/UI/model/keyValue';

@Component({
  selector: 'dx-status',
  template: ` <ng-container *ngIf="!isBusy; else dxStatusLoaderRef">
      <!-- Making Status as a link to trigger method from Parent and perform any task like open Popup -->
      <ng-container *ngIf="link; else text">
        <a
          dxStatusChip
          [link]="link"
          [status]="status"
          [color]="color"
          [statusList]="statusList"
          (click)="statusClick()"
        ></a>
      </ng-container>
      <ng-template #text>
        <span
          dxStatusChip
          [status]="status"
          [color]="color"
          [statusList]="statusList"
        ></span>
      </ng-template>
    </ng-container>
    <ng-template #dxStatusLoaderRef>
      <dx-skeleton-loader [theme]="loaderTheme"></dx-skeleton-loader>
    </ng-template>`,
})
export class DxStatusComponent implements OnChanges {
  @Input() status: string | undefined;
  @Input() statusList: KeyValueModel[] | undefined;
  @Input() color: string | undefined;
  @Input() isBusy: boolean | undefined = false;
  @Input() link: boolean = false;
  @Output() onStatusClick: EventEmitter<any> = new EventEmitter<any>()
  loaderTheme = {
    width: '100px',
    height: '20px',
    'border-radius': '20px',
    margin: '3px',
  };
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['status']?.previousValue !== changes['status']?.currentValue) {
      this.status = changes['status']?.currentValue;
    }
    if (
      changes['statusList']?.previousValue !==
      changes['statusList']?.currentValue
    ) {
      this.statusList = changes['statusList']?.currentValue;
    }
    if (changes['color']?.previousValue !== changes['color']?.currentValue) {
      this.color = changes['color']?.currentValue;
    }
    if (changes['isBusy']?.previousValue !== changes['isBusy']?.currentValue) {
      this.isBusy = changes['isBusy']?.currentValue;
    }
  }
  
  // Emitting Method to Parent to trigger any method of Parent as per requirement
  statusClick() {
    this.onStatusClick.emit();
  }
}
