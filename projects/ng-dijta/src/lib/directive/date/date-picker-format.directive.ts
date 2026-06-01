
import { Directive, Inject, Input, Optional } from "@angular/core";
import { NgControl, NgModel } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { CustomDateFormat, DateDisplay, DateParse } from "./custom-date-format";

@Directive({
    selector: "[datePickerFormat]",
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
        },
        {
            provide: MAT_DATE_FORMATS,
            useClass: CustomDateFormat,
        }
    ]
})
export class DatePickerFormatDirective {
    @Input() public configDateParse: DateParse | undefined;
    @Input() public configDateDisplay: DateDisplay | undefined;

    @Input("datePickerFormat")
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
        @Inject(MAT_DATE_FORMATS) public matDateFormat: CustomDateFormat,
        @Optional() private ngModel: NgModel,
        @Optional() private ngControl: NgControl
    ) { }
}