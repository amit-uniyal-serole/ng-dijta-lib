import { Component } from "@angular/core";
import { MultiActionDropDown, MultiActionMenuList } from "projects/ng-dijta/src/public-api";

@Component({
    selector: 'app-button',
    templateUrl: './button.html',
})
export class Button {
    multiActionDropDown:MultiActionDropDown = {
        show: true,
        label: 'Actions',
        isOnlyDropdown: false,
        menuList: [
            {
                label: 'Action 1',
                event: 'action1',
                show: true
            }
        ] as MultiActionMenuList[]
    }
}