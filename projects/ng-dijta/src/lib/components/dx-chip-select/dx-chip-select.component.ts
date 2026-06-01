import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  HostListener,
  Inject,
  Injector,
  Input,
  LOCALE_ID,
  OnChanges,
  Optional,
  SimpleChanges,
  ViewEncapsulation,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NgControl,
  NG_VALUE_ACCESSOR,
  Validators,
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  UI_COMPONENT_CONFIG,
  UIConfigWrapper,
} from '../../core/UI/service/input/ui-component.config';
import { KeyValueModel } from '../../core/UI/model/keyValue';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';


@Component({
  selector: 'dx-chip-select',
  templateUrl: './dx-chip-select.component.html',
  styleUrls: ['./dx-chip-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DxChipSelectComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DxChipSelectComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class DxChipSelectComponent
  implements ControlValueAccessor, OnChanges, Validator, OnDestroy {
  @Input() options!: KeyValueModel[];
  @Input() multiSelect: boolean = false;
  @Input() noneLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() viewOnly: boolean = false;
  @Input() readonly: boolean = false;
  @Input() multi: boolean = false;
  @Input() name: string | undefined;
  @Input() outline: 'floating' | 'none-floating' | 'outer-label' = 'none-floating';
  @Input() labelPosition: 'left' | 'top' = 'top';
  @Input() tabIndex: number | undefined;
  @Input() outerLabelErrorType: 'astrict-error' | 'filled-error' = 'filled-error';
  static nextId = 0;
  @HostBinding()
  id = `dx-input-chip-${DxChipSelectComponent.nextId++}`;
  value: string = '';

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

  subscriptions: Subscription | undefined;

  @HostListener('focusout', ['$event.target'])
  onFocusout() {
    this.onTouched();
  }

  constructor(
    public injector: Injector,
    private readonly cd: ChangeDetectorRef,
    @Optional() @Inject(UI_COMPONENT_CONFIG) config: UIConfigWrapper,
    @Optional() @Inject(LOCALE_ID) public locale: string,
    readonly sanitizer: DomSanitizer
  ) { }


  onChange: Function = () => { };
  onTouched: Function = () => { };

  inputChange(event: string[]): void {
    if (Array.isArray(event)) {
      this.value = event.join(",");
      this.onChange(this.value);
    }
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
    if (changes?.disabled?.currentValue !== changes?.disabled?.previousValue) {
      if (changes.disabled.currentValue) {
        this.control?.disable();
        this.cd.detectChanges();
      } else {
        this.control?.enable();
        this.cd.detectChanges();
      }
    }
  }

  writeValue(value: string[]): void {
    if (Array.isArray(value)) {
      this.value = value.join(",");
      this.onChange(this.value);
    } else {
      this.value = '';
      this.onChange(this.value);
    }
    if (value) {
      this.onChange(value);
    }
  }

  registerOnChange(fn: Function): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
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

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe()
  }

}
