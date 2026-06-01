import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild, ViewEncapsulation } from "@angular/core";
import { GroupAction } from "../../model/dx-card.model";
import { MatMenuTrigger } from "@angular/material/menu";
import { MultiActionMenuList } from "../../../dx-button/dx-button.model";
import { Observable, of, Subscription } from "rxjs";
import { DxPermissionsService, PermissionCheck } from "../../../../permission/permssion.service";

@Component({
    selector:'dx-group-action',
    templateUrl: "./dx-group-action.component.html",
    styleUrls: ["./dx-group-action.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class DxGroupAction implements OnInit {
    dxPermissionsService = inject(DxPermissionsService)
    @Input() actionGroup?: GroupAction;
    @Input() size: 'small' | string | undefined  = undefined;
    @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
    @Output() onClickCardAction: EventEmitter<string> =
        new EventEmitter<string>();
    showMenuButton = false;
    showMore: Observable<boolean> = of(true);
    isNoPermissionAction: boolean = false;
   
    ngOnInit(): void {
    const pairs: PermissionCheck[] = (this.actionGroup?.subActions ?? []).map((permission) => {
        const apiName: string = permission.permission?.apiName ?? '';
        const action: string =  permission.permission?.permission ?? '';
        return {
            subject:  apiName,
            actions: [action]
        }
    }) ?? [];
    this.isNoPermissionAction = (this.actionGroup?.subActions ?? []).some((permission) => !permission?.permission)
    this.showMore = this.dxPermissionsService.hasAllPermissions$(pairs);
    }
    closeMenu() {
        if(this.menuTrigger) {
            this.menuTrigger.closeMenu();
        }
    }

    close(event: MultiActionMenuList): void {
        this.closeMenu();
        this.onClickCardAction.emit(event.event);
    }
}