import { Component, Input } from "@angular/core";
import { Menu } from "../../dx-sidebar";
enum FIX_SIZE {
    IN = 240,
    OUT = 0,
    DEFAULT = 250
}
@Component({
    selector: 'dx-vertical-content',
    template: `
        <dx-layout-content>
            <div style="display: flex">
                <dx-layout-sider [nzWidth]="size" nzTheme="light">
                    <div class="overflow-auto w-100" scrollHeight>
                        <dx-vertical [menu]="menu" [style.width]="size + 'px'"></dx-vertical>
                    </div>
                </dx-layout-sider>
                <div class="overflow-auto" scrollHeight>
                    <ng-content></ng-content>
                </div>
            </div>
        </dx-layout-content>
    `,
    styles: [
        `
        .main-container {
            padding-top: 5rem;
        }
        `
    ]
})
export class VerticalContentComponent {
    @Input() menu: Menu[] = [];
    size: number = FIX_SIZE.DEFAULT;
}