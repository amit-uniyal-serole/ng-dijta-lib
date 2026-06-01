import { Component, Input } from "@angular/core";
import { Menu } from "../../dx-sidebar";

@Component({
    selector: 'dx-horizontal-content',
    template: `
        <div style="width: 100%;">
            <div class="w-100 horizontal-z">
                <dx-horizontal [menu]="menu"></dx-horizontal>
            </div>
            <div class="overflow-auto" scrollHeight>
                <div class="p-2">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `
})
export class HorizontalContentComponent {
    @Input() menu: Menu[] = [];
}