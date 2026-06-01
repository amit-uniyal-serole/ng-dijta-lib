import { Component, Input } from "@angular/core";
import { Menu } from "../../dx-side-bar";
enum FIX_SIZE {
    IN = 240,
    OUT = 0,
    DEFAULT = 250
}
@Component({
    selector: 'dx-vertical-content',
    template: `
        <dx-layout-content>
            <div style="display: flex;height: 100vh;">
                <dx-layout-sider [nzWidth]="size" nzTheme="light">
                    <div class="side">
                        <dx-vertical [menu]="menu" [style.width]="size + 'px'"></dx-vertical>
                    </div>
                </dx-layout-sider>
                <div class="inner-content">
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