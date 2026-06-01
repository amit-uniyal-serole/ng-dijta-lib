import {
    Directive,
    ElementRef,
    HostListener,
    Input,
    Renderer2,
    forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DxCurrencyService } from '../dx-currency';

@Directive({
    selector: '[appNumberInput]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NumberInputDirective),
            multi: true,
        },
    ],
})
export class NumberInputDirective implements ControlValueAccessor {
    private onChange: any;
    private onTouched: any;

    @Input()
    set value(value: number | undefined) {
        this._value = value;
        if (value) {
            this.convertValue(value);
        }
    }

    get value(): number | undefined {
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
        private readonly renderer: Renderer2
    ) { }
    @HostListener('change', ['$event'])
    onInput(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.convertValue(inputElement.value);
    }

    writeValue(value: string | number): void {
        this.el.nativeElement.value = value || ''; // Set the input value
        this.valueManipulation(value);
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
        this.valueManipulation(newValue);
        this.onChange(newValue ? Number(newValue) : null); // Update the form control value
    }

    private valueManipulation(value: string | number | null) {
        if (value && value !== "") {
            let formattedValue: string | number = value;
            if (this.seprater) {
                const digitInfo = `1.${this._maxDigits}-${this._maxDigits}`;
                formattedValue = this.dxCurrencyService.transformNumber(value, this._maxDigits ? digitInfo : undefined);
            }
            this.renderer.setProperty(this.el.nativeElement, 'value', formattedValue);
        }
    }
}
