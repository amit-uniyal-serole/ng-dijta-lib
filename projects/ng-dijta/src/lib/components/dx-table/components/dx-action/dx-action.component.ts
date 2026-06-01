import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Skeleton, SkeletonLoaderModel } from '../../../dx-skeleton-loader';
import { DxTableData } from '../../interfaces/dx-additional.interface';
import { DxTableColumn, OnAction, actionType } from '../../interfaces/dx-table.interface';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopover } from '../../../dx-button/dx-button.model';
import { DxConfirmComponent } from '../../../dx-confirm/dx-confirm.component';

@Component({
  selector: 'dx-action',
  templateUrl: './dx-action.component.html',
  styleUrls: ['./dx-action.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DxActionComponent<T> implements OnInit {
  @Input() data!: DxTableData<T>;
  @Input() selectedData!: DxTableData<T>;
  @Input() columns!: DxTableColumn<T>;
  @Input() isBusy!: boolean
  @Output() onExpand: EventEmitter<DxTableData<T>> = new EventEmitter<DxTableData<T>>();
  @Output() onExternalAction: EventEmitter<OnAction<DxTableData<T>>> = new EventEmitter<OnAction<DxTableData<T>>>()
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;
  showMenu: boolean = false;
  iconSkeleton: SkeletonLoaderModel = Skeleton.Icon
  allowAction: Array<actionType> | undefined = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.allowAction = this.columns?.actionType ?? [];
  }

  expand(data?: DxTableData<T>): void {
    this.onExpand.emit(data);
    this.onActionClick('expand')
  }

  onActionClick(type: actionType, popupConfig?: ConfirmationPopover): void {
    if (popupConfig?.isShow) {
      const dialogRef = this.dialog.open(DxConfirmComponent, {
        panelClass: ['lookout-modal-box'],
        data: popupConfig,
        id: 'confirm-dialog'
      });
      dialogRef.afterClosed().subscribe(isConfirmed => {
        if (isConfirmed) {
          this.onExternalAction.emit({
            type: type,
            data: this.data
          })
        }
      });
    } else {
      this.onExternalAction.emit({
        type: type,
        data: this.data
      })
    }
  }

}
