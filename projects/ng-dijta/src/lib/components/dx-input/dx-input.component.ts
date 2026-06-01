import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
import { getCurrencySymbol, getLocaleCurrencyCode } from "@angular/common";
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
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
  forwardRef
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { KeyValueModel } from '../../core/UI/model/keyValue';

import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../core/UI/service/input/ui-component.config';
import { MentionConfig } from "../../directive/mentions/dx-mention-config";

export type INPUT_TYPE = 'text' | 'number';


@Component({
  selector: "dx-input",
  templateUrl: "./dx-input.component.html",
  styleUrls: ["./dx-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxInputComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputComponent implements ControlValueAccessor, OnInit, Validator, OnChanges {
  static nextId = 0;
  @Output() onClickOption: EventEmitter<KeyValueModel> =
    new EventEmitter<KeyValueModel>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() onEnter: EventEmitter<void> = new EventEmitter<void>();
  @Output() onInputChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() type: INPUT_TYPE = "text";
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() isCurrency: boolean = false;
  @Input() isAutoComplete: boolean = false;
  @Input() options!: KeyValueModel[];
  @Input() outline: "floating" | "none-floating" | "outer-label" =
    "none-floating";
  @Input() currencyFormat: "wide" | "narrow" = "narrow";
  @Input() currencyPosition: "left" | "right" = "left";
  @Input() readonly: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  @Input() mentionConfigData!: MentionConfig
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  @Input() noneBorder: boolean = false;

  @Input() mask: string | undefined;

  @Input() maskingPatterns;

  @HostBinding()
  @Input() id = `dx-input-${DxInputComponent.nextId++}`;

  // To set minimum length of input
  @Input() minLength!: number;

  // To set maximum length of input
  @Input() maxLength!: number;
  @Input() tabIndex!: number;

  // To get required 
  @Input()
  get required(): boolean {
    return this._required ?? false;
  }
  // To apply trim on input value
  @Input() applyTrim: boolean = false;
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;

  ctrRequired: boolean | undefined;

  autocomplete: boolean = true;
  filteredOptions!: Observable<KeyValueModel[]>;
  searchCtrl: FormControl = new FormControl();
  value: string = "";
  currencySymbol = "";
  @Input() labelPosition: 'left' | 'top' = 'top';
  private _validatorOnChange: (() => void) | undefined;
  control: FormControl = new FormControl();
  @HostListener("focusout", ["$event.target"]) onFocusout() {
    this.onTouched();
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef
  ) {
    this.outline = config?.value?.outline ?? "none-floating";
    this.currencySymbol = getCurrencySymbol(
      getLocaleCurrencyCode(locale)!,
      this.currencyFormat,
      locale
    );
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.control.markAsUntouched();
        this.ctrRequired = this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.mentionConfigData?.currentValue !== changes?.mentionConfigData?.previousValue) {
      this.mentionConfigData = changes?.mentionConfigData?.currentValue
    }
  }

  ngOnInit() {
    if (this.minLength) {
      this.control?.addValidators(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      this.control?.addValidators(Validators.maxLength(this.maxLength));
    }
    this.control?.updateValueAndValidity();
  }

  onInputChangeEvent(event: any): void {
    this.onInputChange.emit(event.target?.value)
  }

  inputChange(event: string): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.onTouched();
    this.value = value;
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
    if (this.onTouched) {
      this.onTouched(value);
    }
  }

  onSelectOption(data: KeyValueModel): void {
    this.onClickOption?.emit(data);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.ctrRequired) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    if (!control.hasValidator(Validators.required)) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges();
    }
    return null;
  }

}
