import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators, AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../core/UI/service/input/ui-component.config';
import { DxCurrencyService } from './service/dx-currency.service';
import { Subscription } from 'rxjs';
import { NumberFormatVariant } from '../../core/UI/constant/currency-default';
@Component({
  selector: 'dx-input-currency',
  template: `
    <div
      class="ngdx-field-wrapper"
      [class.none-label]="noneLabel"
      [ngClass]="outline"
      [class.display-view]="viewOnly"
      [class.dx-disable]="isDisabled"
      [class.left-align-label]="labelPosition === 'left'"
      [class.required]="required || ctrRequired" 
      [class]="outerLabelErrorType"
      [class.none-border]="noneBorder">
      <mat-label class="dx-outer-label" *ngIf="outline === 'outer-label'">
          <ng-content select="[dxLabel]"></ng-content>
          <span *ngIf="required || ctrRequired" class="astrict">*</span>
      </mat-label>
      <mat-form-field appearance="outline" floatLabel="always">
        <mat-label *ngIf="outline !== 'outer-label'">
            <ng-content select="dx-label"></ng-content>
        </mat-label>
        <span matPrefix>
          <ng-content select="dx-prefix"></ng-content>
        </span>
        <span matTextPrefix *ngIf="currencySymbol">
          {{ currencySymbol }}
        </span>
        @if(appCurrencyConfig) {
          <input
            type="text"
            [id]="id"
            matInput
            [decimalPlaces]="decimalPlaces"
            [formControl]="control"
            [localizedNumberFormat]="appCurrencyConfig"
            (ngModelChange)="inputChange($event)"
            (blur)="onBlur($event)"
            [readonly]="readonly || viewOnly || isDisabled"
            [tabIndex]="tabIndex"
            [minlength]="minLength"
            [maxlength]="maxLength"
            [placeholder]="tooltip"
            (keypress)="onlyNumberKey($event)"
            [required]="required || ctrRequired"
            appNumericOnly
          />
        } @else {
          <input
            type="text"
            [id]="id"
            [type]="type"
            matInput
            [formControl]="control"
            numberInput
            (ngModelChange)="inputChange($event)"
            (blur)="onBlur($event)"
            [readonly]="readonly || viewOnly || isDisabled"
            [tabIndex]="tabIndex"
            (keyup)="onKey()"
            [minlength]="minLength"
            [maxlength]="maxLength"
            [placeholder]="tooltip"
            [maxDigits]="precision" 
            (keypress)="onlyNumberKey($event)"
            [required]="required || ctrRequired"
            [seprater]="seprater"
            appNumericOnly
          />
        }
          
        
        <span matSuffix>
          <ng-container *ngIf="standard && !currencySymbol; else non_standard_input_icon">
            <span class="currency-prefix">{{ symbol }}</span>
          </ng-container>
          <ng-template #non_standard_input_icon>

          </ng-template>
          <ng-content select="dx-suffix"></ng-content>
        </span>
        <mat-hint>
          <ng-content select="dx-hint"> </ng-content>
        </mat-hint>
        <mat-error>
          <ng-content select="dx-error"></ng-content>
        </mat-error>
      </mat-form-field>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputCurrencyComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxInputCurrencyComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputCurrencyComponent
  implements OnChanges, ControlValueAccessor, OnInit, Validator {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() appCurrencyConfig?: NumberFormatVariant;
  @Input() currencySymbol?: NumberFormatVariant;
  @Input() decimalPlaces?: number;
  @Input() noneLabel = false;
  @Input() readonly = false;
  @Input() viewOnly: boolean = false;
  @Input() noneBorder: boolean = false;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' =
    'outer-label';
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() tabIndex: number | undefined;
  @Input() labelPosition: 'left' | 'top' = 'top';
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-input-currency-${DxInputCurrencyComponent.nextId++}`;

  // To set minimum length of input
  @Input() minLength!: number;

  // To set maximum length of input
  @Input() maxLength!: number;

  @Input() seprater = true;

  // To get required 
  @Input()
  get required(): boolean {
    return this._required ?? false;
  }
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.cd.detectChanges();
  }
  protected _required: boolean | undefined;

  @Input() precision: number | undefined = 0;

  value = '';
  symbol = '';
  ctrRequired: boolean | undefined;
  @Input() standard = true;
  type: string = 'text';
  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
    this.type = 'text';
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };
  control: FormControl = new FormControl();

  @Input() disabled: boolean = false;

  // Internal state for disabled set by ControlValueAccessor (via formControl.disable())
  private _cvaDisabled: boolean = false;

  // Combined disabled state (either @Input or CVA disabled)
  get isDisabled(): boolean {
    return this.disabled || this._cvaDisabled;
  }

  filterSubscription!: Subscription;
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef,
    private readonly dxCurrencyService: DxCurrencyService
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
    this.symbol = this.dxCurrencyService.getDisplayType();
  }

  ngOnInit(): void {
    if (this.minLength) {
      this.control?.addValidators(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      this.control?.addValidators(Validators.maxLength(this.maxLength));
    }
    this.control?.updateValueAndValidity();
  }
  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    if (ngControl?.control instanceof FormControl) {
      this.control = ngControl.control;
      this.ctrRequired = this.control.hasValidator(Validators.required);
      this.cd.detectChanges();
    } else {
      // fallback if not bound to form control
      this.control = new FormControl();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cd?.detectChanges();
    this.standard = this.standard ? !this.viewOnly : false;
  }

  inputChange(event: string): void {

    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.onTouched();
    this.value = this.control.value;
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  // Method called by the form when the control's disabled state changes
  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled = isDisabled;
  }


  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
    if (this.onTouched) {
      this.onTouched(value);
    }
  }
  onlyNumberKey(evt: KeyboardEvent): boolean {
    // Allow digits 0-9, +, -, ',', '.', and the K/M/B/T/k/m/b/t shortcuts
    // used by the compact-notation feature in `onKey()`.
    const key = evt.key;
    if (/^[0-9+\-.,KMBTkmbt]$/.test(key)) {
      return true;
    }
    // Control-style keys (Backspace, Tab, Arrow, Delete, …) have multi-char `key`
    // values and should never be blocked.
    if (key && key.length > 1) {
      return true;
    }
    return false;
  }

  onKey(): void {
    if (this.control.value) {
      const s = this.control.value;
      const r = /\d+/;
      switch (this.control.value) {
        case 'K':
          this.control?.setValue(this.convertTo(s.match(r) ? Number(s.match(r)[0]) : 0, 'K'));
          break;
        case 'M':
          this.control?.setValue(this.convertTo(s.match(r) ? Number(s.match(r)[0]) : 0, 'M'));
          break;
        case 'B':
          this.control?.setValue(this.convertTo(s.match(r) ? Number(s.match(r)[0]) : 0, 'B'));
          break;
        case 'T':
          this.control?.setValue(this.convertTo(s.match(r) ? Number(s.match(r)[0]) : 0, 'T'));
          break;
      }
    }
  }

  private convertTo(val: number, type: 'K' | 'M' | 'B' | 'T'): number {
    if (type === 'K') {
      return val * 1000;
    }
    if (type === 'M') {
      return val * Math.pow(10, 6);
    }
    if (type === 'B') {
      return val * Math.pow(10, 9);
    }
    if (type === 'T') {
      return val * Math.pow(10, 12);
    }
    if (type === 'Q') {
      return val * Math.pow(10, 15);
    }
    return val;
  }
  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription?.unsubscribe();
    }
  }
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.ctrRequired) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
      this.cd.detectChanges();
    }
    if (!control.hasValidator(Validators.required)) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
      this.cd.detectChanges();
    }
    return null;
  }
}
