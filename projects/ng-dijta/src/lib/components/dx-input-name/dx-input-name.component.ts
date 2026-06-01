import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  ViewEncapsulation,
  forwardRef
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validator, Validators } from '@angular/forms';
import {
  UIConfigWrapper,
  UI_COMPONENT_CONFIG
} from '../../core/UI/service/input/ui-component.config';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'dx-input-name',
  templateUrl: './dx-input-name.component.html',
  styleUrls: ['./dx-input-name.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxInputNameComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxInputNameComponent),
      multi: true
    }
  ],
})
export class DxInputNameComponent
  implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() mask: string = '';
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() placeholder: string = 'Name';
  @Input() pattern!: string;
  @Input() icon: string = 'account_circle';
  value: string = '';
  control: FormControl = new FormControl();
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';

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
    @Inject(LOCALE_ID) public locale: string,
    public injector: Injector,
    private readonly cd: ChangeDetectorRef
  ) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }

  ngOnInit(): void {
    if (this.control) {
      this.control?.addValidators(Validators.pattern(/^[a-zA-ZÀ-ÿ-. ]{2,}$/));
    }
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
  ngOnChanges(): void {
    this.cd?.detectChanges();
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
