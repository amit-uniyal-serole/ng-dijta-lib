import {
    Directive,
    ElementRef,
    Input,
    forwardRef,
    HostListener
} from '@angular/core';
import {
    ControlValueAccessor,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { NumberFormatService } from '../../service/number-format/number-format.service';
import { NumberFormatVariant } from '../../core/UI/constant/currency-default';

@Directive({
    selector: '[localizedNumberFormat]',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => LocalizedNumberFormatDirective),
            multi: true
        }
    ]
})
export class LocalizedNumberFormatDirective implements ControlValueAccessor {
    @Input('localizedNumberFormat') formatVariant!: NumberFormatVariant;
    @Input() decimalPlaces: number = 0;

    private onChange = (_: any) => { };
    private onTouched = () => { };
    private lastRawValue: number | null = null;

    constructor(
        private el: ElementRef<HTMLInputElement>,
        private formatter: NumberFormatService
    ) { }

    @HostListener('input', ['$event.target.value'])
    onInput(value: string): void {
        const parsed = this.formatter?.parse(value, this.formatVariant);
        this.lastRawValue = parsed;
        this.onChange(parsed); // Keep model updated with raw value
    }

    @HostListener('blur')
    onBlur(): void {
        this.onTouched();
        if (this.lastRawValue !== null) {
            const formatted = this.formatter?.format(this.lastRawValue, this.formatVariant, this.decimalPlaces);
            this.setValue(formatted);
        }
    }


    writeValue(obj: any): void {
        this.lastRawValue = obj;
        const formatted = obj != null
            ? this.formatter.format(+obj, this.formatVariant, this.decimalPlaces)
            : '';
        this.setValue(formatted);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.el.nativeElement.disabled = isDisabled;
    }

    private setValue(value: string) {
        this.el.nativeElement.value = value;
    }
}
