import { BooleanInput, coerceBooleanProperty } from "@angular/cdk/coercion";
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
  Optional,
  Output,
  Self,
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
import { KeyValueModel } from '../../core/UI/model/keyValue';

import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG,
} from '../../core/UI/service/input/ui-component.config';
import { MentionConfig } from "../../directive/mentions/dx-mention-config";
import { Subscription } from "rxjs";

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
export class DxInputComponent implements ControlValueAccessor, Validator {
  @Output() onClickOption: EventEmitter<KeyValueModel> =
    new EventEmitter<KeyValueModel>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Output() onEnter: EventEmitter<void> = new EventEmitter<void>();
  @Output() onInputChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() type: INPUT_TYPE = "text";
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
  @Input() mentionConfigData!: MentionConfig;
  @Input() noErrorSpace: boolean = false;
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  @Input() noneBorder: boolean = false;
  static nextId: number = 0;
  // Mask
  @Input() mask: string | undefined;
  @Input() maskingPatterns;
  @Input() dropSpecialCharacters: boolean = false;
  @Input() prefix: string | undefined;
  @Input() specialCharacters: string[] = []



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

  @Input() value: string | undefined;
  @Input() labelPosition: 'left' | 'top' = 'top';
  @HostListener("focusout", ["$event.target"]) onFocusout() {
    this.onTouched();
  }
  control: FormControl = new FormControl();

  @Input() disabled: boolean = false;

  // Internal state for disabled set by ControlValueAccessor (via formControl.disable())
  private _cvaDisabled: boolean = false;

  // Combined disabled state (either @Input or CVA disabled)
  get isDisabled(): boolean {
    return this.disabled || this._cvaDisabled;
  }

  filterSubscription!: Subscription;
  onChange: Function = () => { };
  onTouched: Function = () => { };
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Inject(LOCALE_ID) public locale: string,
    private readonly cd: ChangeDetectorRef,
    private injector: Injector,
  ) {
    this.outline = config?.value?.outline ?? "none-floating";
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.mentionConfigData?.currentValue !== changes?.mentionConfigData?.previousValue) {
      this.mentionConfigData = changes?.mentionConfigData?.currentValue
    }
  }
  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);

    if (ngControl?.control instanceof FormControl) {
      setTimeout(() => {
      this.control = ngControl.control as FormControl;
      this.control?.markAsUntouched();
      this.ctrRequired = this.control?.hasValidator(Validators.required);
      this.cd.detectChanges();
      });
    } else {
      // fallback if not bound to form control
      this.control = new FormControl();
    }
  }

  ngOnDestroy(): void {
    if (this.filterSubscription) {
      this.filterSubscription?.unsubscribe();
    }
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

  onSelectOption(data: KeyValueModel): void {
    this.onClickOption?.emit(data);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.ctrRequired) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges()
      this.cd.detectChanges();
    }
    if (!control.hasValidator(Validators.required)) {
      this.ctrRequired = control.hasValidator(Validators.required);
      this.cd.detectChanges()
      this.cd.detectChanges();
    }
    return null;
  }

}
