import { Component, EventEmitter, Input, Output, ViewEncapsulation } from "@angular/core";
import { BulkActions, MenuAction } from "../../interfaces/dx-table.interface";
import { ConditionClass } from '../../../../directive/condition-class/condition-class';
import { ConfirmationPopover, DxConfirmComponent } from "../../../dx-button";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'dx-flat-action',
    templateUrl: './dx-flat-action.component.html',
    styleUrls: ['./dx-flat-action.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DxFlatActionComponent<T> {
    @Input() data!: T;
    @Input() condition!: ConditionClass;
    @Input() menu!: BulkActions;
    @Output() onClickBulkMenuAction: EventEmitter<MenuAction> =
        new EventEmitter<MenuAction>();

    constructor(private dialog: MatDialog) { }


    bulkActionMenuClick(event: MenuAction, popupConfig: ConfirmationPopover) {
        if (popupConfig?.isShow) {
            const dialogRef = this.dialog.open(DxConfirmComponent, {
                panelClass: ['lookout-modal-box'],
                width: '30%',
                data: popupConfig,
                id: 'confirm-dialog'
            });
            dialogRef.afterClosed().subscribe(isConfirmed => {
                if (isConfirmed) {
                    this.onClickBulkMenuAction.emit(event);
                }
            });
        } else {
            this.onClickBulkMenuAction.emit(event);
        }
    }
}