import { NgModule } from "@angular/core";
import { DxTooltipListPipe } from "./tooltip/dx-tooltip-list.pipe";

@NgModule({
    declarations: [DxTooltipListPipe],
    exports: [DxTooltipListPipe],
})
export class DxPipeModule { }