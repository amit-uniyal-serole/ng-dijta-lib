
import { Directive, HostListener, ElementRef, Input, Renderer2, forwardRef } from "@angular/core";
import { DxCurrencyService } from "../service/dx-currency.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Directive({
    selector: "[numberInput]",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DxNumberInputDirective),
            multi: true,
        },
    ],
})
export class DxNumberInputDirective implements ControlValueAccessor {
    private onChange: any;
    private onTouched: any;

    @Input()
    set orgvalue(value: number | undefined) {
        this._value = value;
        if (value || value === 0) {
            this.convertValue(value);
        }
    }

    get orgvalue(): number | undefined {
        return this._value;
    }

    protected _value: number | undefined;

    @Input()
    set maxDigits(maxDigits: number) {
        this._maxDigits = maxDigits;
    }

    get maxDigits(): number {
        return this._maxDigits ?? 0;
    }

    protected _maxDigits: number = 0;

    @Input()
    set seprater(seprater: boolean) {
        this._seprater = seprater;
    }

    get seprater(): boolean {
        return this._seprater ?? true;
    }

    protected _seprater = true;

    constructor(
        private el: ElementRef,
        private readonly dxCurrencyService: DxCurrencyService,
        private readonly renderer: Renderer2,
    ) { }
    @HostListener('change', ['$event'])
    onInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.convertValue(inputElement.value)
    }

    @HostListener('focusout', ['$event'])
    onfocusout(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const newValue = this.dxCurrencyService.transformNumberWithoutFormat(inputElement.value, this._maxDigits);
        this.valueManipulation(newValue, this.seprater);
    }
    @HostListener('focusin', ['$event'])
    onfocusin(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const newValue = this.dxCurrencyService.transformNumberWithoutFormat(inputElement.value, this._maxDigits);
        this.valueManipulation(newValue, false);
    }

    writeValue(value: any) {
        this.el.nativeElement.value = value || ''; // Set the input value
        this.valueManipulation(value, this.seprater);
    }

    registerOnChange(fn: any) {
        this.onChange = fn; // Save the callback for value updates
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn; // Save the callback for touch events
    }

    setDisabledState(isDisabled: boolean) {
        this.el.nativeElement.disabled = isDisabled;
    }

    private convertValue(value: string | number): void {
        const newValue = value || value === 0 ? this.dxCurrencyService.transformNumberWithoutFormat(value, this._maxDigits) : null;
        this.valueManipulation(newValue, this.seprater);
        this.onChange(newValue ? Number(newValue) : null); // Update the form control value
    }

    private valueManipulation(value: string | number | null, seprater: boolean): void {
        if ((value || value === 0) && value !== "") {
            let formattedValue: string;
            if (seprater) {
                const digitsInfo = `1.${this._maxDigits}-${this._maxDigits}`;
                formattedValue = this.dxCurrencyService.transformNumber(value, this._maxDigits ? digitsInfo : undefined);
            } else {
                formattedValue = this.dxCurrencyService.transformNumberWithoutFormat(value, this._maxDigits);
            }

            this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
        }
    }
}
