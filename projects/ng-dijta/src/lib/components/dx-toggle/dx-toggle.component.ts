import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, ContentChild, EventEmitter, forwardRef, HostBinding, Injector, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validators } from '@angular/forms';
import { DxLabelDirective } from '../../directive';


@Component({
  selector: 'dx-toggle',
  templateUrl: './dx-toggle.component.html',
  styleUrls: ['./dx-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxToggleComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxToggleComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class DxToggleComponent implements ControlValueAccessor,Validators {
  @ContentChild(DxLabelDirective) labelDirective?:DxLabelDirective;
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() labelTouchSensitive: boolean = true;
  @Input() tabIndex!: number;
  value: boolean = false;
  @Input() labelPosition: 'before' | 'after' = 'after';
  static nextId = 0;
  @HostBinding()
  @Input() id = `dx-toggle-${DxToggleComponent.nextId++}`;

  // Functions provided by Angular forms
  private onChangeFn: (_: any) => void = () => { };
  private onTouchedFn: () => void = () => { };
  checked = false;

  @Input()
  get required(): boolean {
    return this._required ?? false;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  protected _required: boolean | undefined;

  // Form control instance  
  control: FormControl = new FormControl();
  ctrRequired: boolean = false;
  constructor(
    private readonly cd: ChangeDetectorRef,
    public injector: Injector
  ) { }

  ngAfterViewInit(): void {
    const ngControl: NgControl | null = this.injector.get(NgControl, null);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.ctrRequired = this.control.hasValidator(Validators.required);
        this.cd.detectChanges();
      });
    }
  }


  inputChange(event: boolean): void {    
    this.value = event;
    this.onChangeFn(this.value);
    this.onTouchedFn();
  }

  writeValue(value: boolean): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  get invalid(): boolean {    
    return this.control?.touched && this.control?.invalid;
  }


  validate(control: AbstractControl): ValidationErrors | null {
    // Reactive form required
    if (control?.validator) {
      const validator = control?.validator({} as AbstractControl);
      const isRequired = validator?.['required'] ?? this.required;
      if (isRequired) {
        this.required = isRequired;
        if (!this.value) return { required: true };
      }
    }

    // Template-driven required
    if (this.required && !this.value) {
      return { required: true };
    }
    return null;
  }

}
