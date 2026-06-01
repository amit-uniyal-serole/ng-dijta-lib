import { Component, Input } from "@angular/core";
import { Menu } from "../../dx-side-bar";
enum FIX_SIZE {
    IN = 240,
    OUT = 0,
    DEFAULT = 76
}
@Component({
    selector: 'dx-horizontal-content',
    template: `
        <dx-layout-content>
            <div style="width: 100%;">
                <div class="position-fixed w-100 horizontal-z">
                    <dx-horizontal [menu]="menu"></dx-horizontal>
                </div>
                <div class="inner-content main-container">
                    <ng-content></ng-content>
                </div>
            </div>
        </dx-layout-content>
    `,
    styles: [
        `
            .horizontal-z {
                z-index: 99;
            }
            .main-container {
                padding-top: 4rem;
            }
        `
    ]
})
export class HorizontalContentComponent {
    @Input() menu: Menu[] = [];
    size: number = FIX_SIZE.DEFAULT;
}