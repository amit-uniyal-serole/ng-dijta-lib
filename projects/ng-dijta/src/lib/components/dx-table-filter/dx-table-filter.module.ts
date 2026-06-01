import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DxButtonModule } from '../dx-button';
import { DxDatepickerModule } from '../dx-datepicker/dx-datepicker.module';
import { DxInputModule } from '../dx-input/dx-input.module';
import { DxSelectModule } from '../dx-select/dx-select.module';
import { DxTableFilterComponent } from './dx-table-filter.component';
import { TranslocoModule } from '@jsverse/transloco';
@NgModule({
    declarations: [DxTableFilterComponent],
    imports: [
        CommonModule,
        DxButtonModule,
        DxInputModule,
        DxDatepickerModule,
        DxSelectModule,
        ReactiveFormsModule,
        TranslocoModule
    ],
    exports: [DxTableFilterComponent]
})
export class DxTableFilterModule { }
