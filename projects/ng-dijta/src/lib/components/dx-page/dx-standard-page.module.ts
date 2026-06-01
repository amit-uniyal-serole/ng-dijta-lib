import { NgModule } from "@angular/core";
import { Lib403Component } from "./page/403.component";
import { CommonModule, NgIf } from "@angular/common";
import { TranslocoModule } from "@jsverse/transloco";

@NgModule({
    declarations: [
        Lib403Component
    ],
    imports: [
        CommonModule,
        NgIf,
        TranslocoModule
    ],
    exports: [
        Lib403Component
    ]
})
export class DxStandardPageModule { }