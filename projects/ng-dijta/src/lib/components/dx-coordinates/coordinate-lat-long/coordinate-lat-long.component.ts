import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Injector, Input, OnInit, Optional, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, Validator, FormControl, NgControl, Validators, AbstractControl, ValidationErrors, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UI_COMPONENT_CONFIG, UIConfigWrapper } from '../../../core';
import { TransformationType } from '../directives/coordinates-directive/transformation-type.enum';
import { Direction } from '../directives/coordinates-directive/direction.enum';
import { CoordinateLatLong } from '../model/coordinate';
@Component({
  selector: 'dx-latlong-input',
  templateUrl: './coordinate-lat-long.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CoordinateLatLongComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CoordinateLatLongComponent),
      multi: true
    }
  ]
})
export class CoordinateLatLongComponent implements OnInit, ControlValueAccessor, Validator {

  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
  @Input() disabled: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() tabIndex: number | undefined;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() labelPosition: 'left' | 'top' = 'top';

  // To set outer label error view
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  // Pass tooltips info to input
  @Input() tooltip: string | undefined;

  // To hold coordinate directions
  @Input() direction: Direction | undefined = 1;

  // To hold coordinate formats
  @Input() coordinateFormat: 'DD' | 'DMS' = 'DMS'

  // To hold input value
  value: CoordinateLatLong | undefined;

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

  control: FormControl = new FormControl();

  // To hold transformation type
  transformationType = TransformationType;

  constructor(
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Optional() public injector: Injector,
    private readonly cd: ChangeDetectorRef) {
    this.outline = config?.value?.outline ?? 'none-floating';
  }
  onChange: Function = () => { };
  onTouched: Function = () => { };

  ngOnInit() {
  }

  // To bind component with controller
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

  inputChange(event: CoordinateLatLong | undefined): void {
    this.value = event;
    this.onChange(this.value);
  }

  writeValue(value: CoordinateLatLong): void {
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
