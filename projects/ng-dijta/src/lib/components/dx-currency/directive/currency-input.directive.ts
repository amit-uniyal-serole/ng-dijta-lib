
import { Directive, HostListener, ElementRef, OnInit, Input, ChangeDetectorRef } from "@angular/core";
import { DxCurrencyService } from "../service/dx-currency.service";

@Directive({ selector: "[currencyInput]" })
export class DxCurrencyInputDirective implements OnInit {

    // build the regex based on max pre decimal digits allowed
    private regexString(max?: number) {
        const maxStr = max ? `{0,${max}}` : `+`;
        return `^(\\d${maxStr}(\\.\\d{0,2})?|\\.\\d{0,2})$`
    }
    private digitRegex!: RegExp;
    private setRegex(maxDigits?: number) {
        this.digitRegex = new RegExp(this.regexString(maxDigits), 'g')
    }
    @Input()
    set maxDigits(maxDigits: number) {
        this._maxDigits = maxDigits;
    }

    get maxDigits(): number {
        return this._maxDigits ?? 0;
    }

    @Input()
    set seprater(seprater: boolean) {
        this._seprater = seprater;
    }

    get seprater(): boolean {
        return this._seprater ?? true;
    }

    protected _seprater = true;

    protected _maxDigits: number = 0;

    private el: HTMLInputElement;

    constructor(
        private readonly elementRef: ElementRef,
        private readonly dxCurrencyService: DxCurrencyService,
        private readonly cd: ChangeDetectorRef
    ) {
        this.el = this.elementRef.nativeElement;
        this.setRegex();
    }
    ngOnInit() {
        setTimeout(() => {
            this.formatCurrency()
            this.cd.detectChanges();
        });
    }

    @HostListener("focus", ["$event.target.value"])
    onFocus(value) {
        // on focus remove currency formatting
        this.el.value = value.replace(/[^0-9.]+/g, '')
        this.el.select();

    }

    @HostListener("blur", ["$event.target.value"])
    onBlur(value) {
        this.formatCurrency()
    }

    @HostListener("keydown.control.z", ["$event.target.value"])
    onUndo(value) {
        this.el.value = '';
    }

    // variable to store last valid input
    private lastValid = '';
    @HostListener('input', ['$event'])
    onInput(event) {
        // on input, run regex to only allow certain characters and format
        const cleanValue = (event.target.value.match(this.digitRegex) || []).join('');

        if (cleanValue || !event.target.value) {
            this.lastValid = cleanValue
        }
        // this.el.value = cleanValue || this.lastValid
    }

    private formatCurrency(): void {
        if (this.seprater) {
            if (this.el.value) {
                const formattedValue = this.dxCurrencyService.transformNumber(this.el.value, `1.${this._maxDigits}-${this._maxDigits}`);
                this.el.value = formattedValue
            } else {
                this.el.value = '';
            }
        }

    }
}
