
import { Directive, Inject, Input, Optional } from "@angular/core";
import { NgControl, NgModel } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter } from "@angular/material/core";
import { CustomDateFormat, DateDisplay, DateParse } from "./custom-date-format";
import { NGX_MAT_DATE_FORMATS } from "../../core/datetime-picker";

@Directive({
    selector: "[datetimePickerFormat]",
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter
        },
        {
            provide: NGX_MAT_DATE_FORMATS,
            useClass: CustomDateFormat,
        }
    ]
})
export class DateTimePickerFormatDirective {
    @Input() public configDateParse: DateParse | undefined;
    @Input() public configDateDisplay: DateDisplay | undefined;

    @Input("datetimePickerFormat")
    set datePickerFormat(format: string) {
        if (this.configDateParse) {
            this.matDateFormat.updateDateFormat(
                this.configDateParse,
                this.configDateDisplay
            );
        } else {
            this.matDateFormat.updateDateFormat({ dateInput: format });
        }
        if (this.ngControl) {
            const value = this.ngControl.value;
            this.ngControl.valueAccessor?.writeValue(value);
        } else {
            const value = this.ngModel.value;
            this.ngModel.valueAccessor?.writeValue(value);
        }


    }

    constructor(
        @Inject(NGX_MAT_DATE_FORMATS) public matDateFormat: CustomDateFormat,
        @Optional() private ngModel: NgModel,
        @Optional() private ngControl: NgControl
    ) { }
}