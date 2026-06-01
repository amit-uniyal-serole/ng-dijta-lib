import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  OnInit,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
  ChangeDetectorRef,
  Injector,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR, Validators, AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG
} from '../../core/UI/service/input/ui-component.config';

@Component({
  selector: 'dx-input-email',
  templateUrl: './dx-input-email.component.html',
  styleUrls: ['./dx-input-email.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputEmailComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxInputEmailComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxInputEmailComponent
  implements OnInit, ControlValueAccessor, Validator {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() mask: string = '';
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() placeholder: string = 'Email';
  @Input() pattern!: string;
  @Input() icon: string = 'mail';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() tabIndex:number | undefined;  
  _EMAIL_REGEXP = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  value: string = '';

  control: FormControl = new FormControl();
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;
  private _id: string | undefined;
  @Input() set id(value:string | undefined){
    this._id=value;
  };

  get id():string | undefined{
    return this._id
  }

  // To set minimum length of input
  @Input() minLength!: number;

  // To set maximum length of input
  @Input() maxLength!: number;

  // To get required 
  @Input()
  get required(): boolean {
    return this._required ?? false;
  }
  // To set required 
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;

  ctrRequired: boolean | undefined;

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  onChange: Function = () => { };
  onTouched: Function = () => { };
  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Optional() @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef,
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }

  ngOnInit(): void {
    if (this.minLength) {
      this.control?.addValidators(Validators.minLength(this.minLength));
    }
    if (this.maxLength) {
      this.control?.addValidators(Validators.maxLength(this.maxLength));
    }
    this.control?.addValidators(Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/))
    this.control?.updateValueAndValidity();
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

  public get invalid(): boolean {
    return this.control ? this.control.invalid! : false;
  }

  public get showError(): boolean {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;

    return this.invalid ? (dirty || touched)! : false;
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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onBlur(value: FocusEvent): void {
    this.blur.emit(value);
    if (this.onTouched) {
      this.onTouched(value);
    }
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
