import { NgModule } from "@angular/core";
import { Lib403Component } from "./page/403.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        Lib403Component
    ],
    imports: [
        CommonModule
    ],
    exports: [
        Lib403Component
    ]
})
export class DxStandardPageModule { }